create or replace function public.is_valid_admin_session(p_session_token uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_sessions
    join public.admin_users on public.admin_users.id = public.admin_sessions.admin_user_id
    where public.admin_sessions.session_token = p_session_token
      and public.admin_sessions.expires_at > now()
      and public.admin_users.is_active = true
  );
$$;

create or replace function public.unique_blog_slug(p_title text, p_id uuid default null)
returns text
language plpgsql
set search_path = public
as $$
declare
  v_base text := public.cms_slugify(p_title, 'blog-post');
  v_slug text := v_base;
  v_index integer := 2;
begin
  while exists (
    select 1
    from public.blog_posts
    where public.blog_posts.slug = v_slug
      and (p_id is null or public.blog_posts.id <> p_id)
  ) loop
    v_slug := v_base || '-' || v_index;
    v_index := v_index + 1;
  end loop;

  return v_slug;
end;
$$;

create or replace function public.save_blog_post(
  p_session_token uuid,
  p_id uuid default null,
  p_title text default null,
  p_content text default '',
  p_image_url text default ''
)
returns setof public.blog_posts
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_slug text;
begin
  perform public.assert_admin_session(p_session_token);

  if nullif(trim(coalesce(p_title, '')), '') is null then
    raise exception 'Blog title is required' using errcode = '22023';
  end if;

  v_slug := public.unique_blog_slug(p_title, p_id);

  if p_id is not null and exists (select 1 from public.blog_posts where id = p_id) then
    update public.blog_posts
    set title = trim(p_title),
        content = coalesce(p_content, ''),
        image_url = coalesce(p_image_url, ''),
        slug = v_slug
    where id = p_id
    returning id into v_id;
  else
    insert into public.blog_posts (title, content, image_url, slug)
    values (trim(p_title), coalesce(p_content, ''), coalesce(p_image_url, ''), v_slug)
    returning id into v_id;
  end if;

  return query select * from public.blog_posts where id = v_id;
end;
$$;

drop function if exists public.save_blog_post(
  uuid, uuid, text, text, text, text, text, text, text, text, text, boolean, timestamptz, text, text, integer
);

create or replace function public.save_insights_cms(p_session_token uuid, p_payload jsonb)
returns table(data jsonb)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_insight jsonb;
  v_blogs jsonb;
  v_videos jsonb;
  v_blog jsonb;
  v_video jsonb;
  v_blog_ids uuid[] := array[]::uuid[];
  v_video_slugs text[] := array[]::text[];
  v_saved_blog public.blog_posts%rowtype;
  v_saved_insight jsonb;
  v_delete_missing_blogs boolean := coalesce((p_payload ->> 'delete_missing_blogs')::boolean, true);
  v_delete_missing_videos boolean := coalesce((p_payload ->> 'delete_missing_videos')::boolean, true);
  v_allow_empty_blog_delete boolean := coalesce((p_payload ->> 'allow_empty_blog_delete')::boolean, false);
  v_allow_empty_video_delete boolean := coalesce((p_payload ->> 'allow_empty_video_delete')::boolean, false);
begin
  perform public.assert_admin_session(p_session_token);

  if jsonb_typeof(p_payload) is distinct from 'object' then
    raise exception 'payload must be an object' using errcode = '22023';
  end if;

  if not (p_payload ? 'insight') or jsonb_typeof(p_payload -> 'insight') is distinct from 'object' then
    raise exception 'insight must be an object' using errcode = '22023';
  end if;

  if not (p_payload ? 'blogs') or jsonb_typeof(p_payload -> 'blogs') is distinct from 'array' then
    raise exception 'blogs must be an array' using errcode = '22023';
  end if;

  if not (p_payload ? 'videos') or jsonb_typeof(p_payload -> 'videos') is distinct from 'array' then
    raise exception 'videos must be an array' using errcode = '22023';
  end if;

  v_insight := p_payload -> 'insight';
  v_blogs := p_payload -> 'blogs';
  v_videos := p_payload -> 'videos';
  v_saved_insight := v_insight;

  select to_jsonb(si)
  into v_saved_insight
  from public.save_insight(
    p_session_token,
    nullif(v_insight ->> 'id', '')::uuid,
    coalesce(nullif(v_insight ->> 'slug', ''), 'insights-page'),
    coalesce(nullif(v_insight ->> 'title', ''), 'Insights'),
    coalesce(v_insight ->> 'description', ''),
    coalesce(v_insight ->> 'content', ''),
    coalesce(v_insight ->> 'image_url', ''),
    coalesce(v_insight ->> 'thumbnail_url', ''),
    coalesce((v_insight ->> 'is_published')::boolean, true),
    nullif(v_insight ->> 'published_at', '')::timestamptz,
    coalesce(v_insight ->> 'seo_title', ''),
    coalesce(v_insight ->> 'seo_description', ''),
    coalesce((v_insight ->> 'sort_order')::integer, 0)
  ) si
  limit 1;

  for v_blog in select * from jsonb_array_elements(v_blogs)
  loop
    select *
    into v_saved_blog
    from public.save_blog_post(
      p_session_token,
      nullif(v_blog ->> 'id', '')::uuid,
      v_blog ->> 'title',
      coalesce(v_blog ->> 'content', ''),
      coalesce(v_blog ->> 'image_url', '')
    )
    limit 1;

    v_blog_ids := array_append(v_blog_ids, v_saved_blog.id);
  end loop;

  delete from public.blog_posts
  where v_delete_missing_blogs
    and (jsonb_array_length(v_blogs) > 0 or v_allow_empty_blog_delete)
    and not (id = any(v_blog_ids));

  for v_video in select * from jsonb_array_elements(v_videos)
  loop
    v_video_slugs := array_append(
      v_video_slugs,
      public.cms_slugify(coalesce(v_video ->> 'slug', v_video ->> 'title', v_video ->> 'youtube_id'), 'youtube-video')
    );

    perform public.save_youtube_video(
      p_session_token,
      nullif(v_video ->> 'id', '')::uuid,
      v_video ->> 'slug',
      v_video ->> 'youtube_id',
      v_video ->> 'title',
      coalesce(v_video ->> 'description', ''),
      coalesce(v_video ->> 'thumbnail_url', ''),
      coalesce((v_video ->> 'is_published')::boolean, true),
      nullif(v_video ->> 'published_at', '')::timestamptz,
      coalesce(v_video ->> 'seo_title', ''),
      coalesce(v_video ->> 'seo_description', ''),
      coalesce((v_video ->> 'sort_order')::integer, 0)
    );
  end loop;

  delete from public.youtube_videos
  where v_delete_missing_videos
    and (jsonb_array_length(v_videos) > 0 or v_allow_empty_video_delete)
    and not (slug = any(v_video_slugs));

  return query
  select jsonb_build_object(
    'insight', v_saved_insight,
    'blogs', coalesce((select jsonb_agg(to_jsonb(bp) order by bp.created_at desc) from public.blog_posts bp), '[]'::jsonb),
    'videos', coalesce((select jsonb_agg(to_jsonb(yv) order by yv.sort_order asc, yv.updated_at desc) from public.youtube_videos yv), '[]'::jsonb)
  );
end;
$$;

alter table public.expert_advice_inquiries add column if not exists countrycode text;
alter table public.expert_advice_inquiries add column if not exists dialcode text;
alter table public.expert_advice_inquiries add column if not exists countryname text;
alter table public.partner_inquiries add column if not exists countrycode text;
alter table public.partner_inquiries add column if not exists dialcode text;
alter table public.partner_inquiries add column if not exists countryname text;
alter table public.brochure_inquiries add column if not exists countrycode text;
alter table public.brochure_inquiries add column if not exists dialcode text;
alter table public.brochure_inquiries add column if not exists countryname text;

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'expert_advice_inquiries' and column_name = 'countryCode'
  ) then
    execute 'update public.expert_advice_inquiries set countrycode = coalesce(countrycode, "countryCode"), dialcode = coalesce(dialcode, "dialCode"), countryname = coalesce(countryname, "countryName")';
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'partner_inquiries' and column_name = 'countryCode'
  ) then
    execute 'update public.partner_inquiries set countrycode = coalesce(countrycode, "countryCode"), dialcode = coalesce(dialcode, "dialCode"), countryname = coalesce(countryname, "countryName")';
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'brochure_inquiries' and column_name = 'countryCode'
  ) then
    execute 'update public.brochure_inquiries set countrycode = coalesce(countrycode, "countryCode"), dialcode = coalesce(dialcode, "dialCode"), countryname = coalesce(countryname, "countryName")';
  end if;
end $$;

drop policy if exists "Public can create inquiries" on public.expert_advice_inquiries;
create policy "Public can create inquiries"
on public.expert_advice_inquiries
for insert
to anon
with check (
  length(trim(name)) > 0
  and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  and length(trim(mobile)) > 0
  and length(trim(service)) > 0
);

drop policy if exists "Public can create partner inquiries" on public.partner_inquiries;
create policy "Public can create partner inquiries"
on public.partner_inquiries
for insert
to anon
with check (
  length(trim(name)) > 0
  and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  and length(trim(phone)) > 0
  and length(trim(interested_in)) > 0
);

drop policy if exists "Public can create brochure inquiries" on public.brochure_inquiries;
create policy "Public can create brochure inquiries"
on public.brochure_inquiries
for insert
to anon
with check (
  length(trim(name)) > 0
  and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  and length(trim(mobile)) > 0
);

drop policy if exists "Anon can upload sample report PDFs" on storage.objects;
drop policy if exists "Anon can replace sample report PDFs" on storage.objects;
drop policy if exists "Anon can delete sample report PDFs" on storage.objects;
drop policy if exists "Admin session can upload sample report PDFs" on storage.objects;
drop policy if exists "Admin session can replace sample report PDFs" on storage.objects;
drop policy if exists "Admin session can delete sample report PDFs" on storage.objects;

create policy "Admin session can upload sample report PDFs"
on storage.objects
for insert
to anon
with check (
  bucket_id = 'sample-reports'
  and name in ('career-snapshot.pdf', 'career-insight.pdf', 'career-master-blueprint.pdf')
  and public.is_valid_admin_session(
    nullif((nullif(current_setting('request.headers', true), '')::json ->> 'x-admin-session-token'), '')::uuid
  )
);

create policy "Admin session can replace sample report PDFs"
on storage.objects
for update
to anon
using (
  bucket_id = 'sample-reports'
  and name in ('career-snapshot.pdf', 'career-insight.pdf', 'career-master-blueprint.pdf')
  and public.is_valid_admin_session(
    nullif((nullif(current_setting('request.headers', true), '')::json ->> 'x-admin-session-token'), '')::uuid
  )
)
with check (
  bucket_id = 'sample-reports'
  and name in ('career-snapshot.pdf', 'career-insight.pdf', 'career-master-blueprint.pdf')
  and public.is_valid_admin_session(
    nullif((nullif(current_setting('request.headers', true), '')::json ->> 'x-admin-session-token'), '')::uuid
  )
);

create policy "Admin session can delete sample report PDFs"
on storage.objects
for delete
to anon
using (
  bucket_id = 'sample-reports'
  and name in ('career-snapshot.pdf', 'career-insight.pdf', 'career-master-blueprint.pdf')
  and public.is_valid_admin_session(
    nullif((nullif(current_setting('request.headers', true), '')::json ->> 'x-admin-session-token'), '')::uuid
  )
);

revoke all on public.blog_posts from anon, authenticated;
grant select on public.blog_posts to anon;

grant execute on function public.is_valid_admin_session(uuid) to anon;
grant execute on function public.save_insights_cms(uuid, jsonb) to anon;

do $$
begin
  if to_regprocedure('public.unique_blog_slug(text, uuid)') is not null then
    execute 'revoke all on function public.unique_blog_slug(text, uuid) from anon, authenticated';
  end if;

  if to_regprocedure('public.save_blog_post(uuid, uuid, text, text, text)') is not null then
    execute 'revoke all on function public.save_blog_post(uuid, uuid, text, text, text) from anon, authenticated';
  end if;

  if to_regprocedure('public.save_insight(uuid, uuid, text, text, text, text, text, text, boolean, timestamptz, text, text, integer)') is not null then
    execute 'revoke all on function public.save_insight(uuid, uuid, text, text, text, text, text, text, boolean, timestamptz, text, text, integer) from anon, authenticated';
  end if;

  if to_regprocedure('public.save_youtube_video(uuid, uuid, text, text, text, text, text, boolean, timestamptz, text, text, integer)') is not null then
    execute 'revoke all on function public.save_youtube_video(uuid, uuid, text, text, text, text, text, boolean, timestamptz, text, text, integer) from anon, authenticated';
  end if;
end $$;

drop function if exists public.delete_all_brochure_inquiries();
drop function if exists public.delete_all_brochure_inquiries(uuid);
drop function if exists public.delete_blog_post(uuid, uuid);
drop function if exists public.delete_insight(uuid, uuid);
drop function if exists public.delete_youtube_video(uuid, uuid);
drop function if exists public.list_blog_posts(uuid);
drop function if exists public.list_insights(uuid);
drop function if exists public.list_youtube_videos(uuid);
drop index if exists public.blog_posts_published_idx;
drop index if exists public.blog_posts_category_idx;
drop index if exists public.blog_posts_updated_at_idx;
