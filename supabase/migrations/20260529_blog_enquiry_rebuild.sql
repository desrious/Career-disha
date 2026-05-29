create extension if not exists pgcrypto with schema extensions;

create or replace function public.cms_slugify(p_value text, p_fallback text default 'content')
returns text
language sql
immutable
as $$
  select coalesce(
    nullif(
      trim(both '-' from regexp_replace(
        regexp_replace(lower(coalesce(p_value, p_fallback)), '[^a-z0-9]+', '-', 'g'),
        '-+', '-', 'g'
      )),
      ''
    ),
    p_fallback
  );
$$;

create or replace function public.assert_admin_session(p_session_token uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_admin_id uuid;
begin
  delete from public.admin_sessions
  where public.admin_sessions.expires_at <= now();

  select public.admin_sessions.admin_user_id
  into v_admin_id
  from public.admin_sessions
  join public.admin_users on public.admin_users.id = public.admin_sessions.admin_user_id
  where public.admin_sessions.session_token = p_session_token
    and public.admin_sessions.expires_at > now()
    and public.admin_users.is_active = true
  limit 1;

  if v_admin_id is null then
    raise exception 'Invalid admin session' using errcode = '28000';
  end if;

  return v_admin_id;
end;
$$;

create table if not exists public.blog_posts (
  id uuid primary key default extensions.gen_random_uuid(),
  title text not null,
  content text not null default '',
  image_url text not null default '',
  slug text not null unique,
  created_at timestamptz not null default now(),
  constraint blog_posts_title_not_blank check (length(trim(title)) > 0),
  constraint blog_posts_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

alter table public.blog_posts add column if not exists title text;
alter table public.blog_posts add column if not exists content text not null default '';
alter table public.blog_posts add column if not exists image_url text not null default '';
alter table public.blog_posts add column if not exists slug text;
alter table public.blog_posts add column if not exists created_at timestamptz not null default now();
alter table public.blog_posts add column if not exists excerpt text;
alter table public.blog_posts add column if not exists thumbnail_url text;

update public.blog_posts
set
  content = coalesce(nullif(content, ''), nullif(excerpt, ''), ''),
  image_url = coalesce(nullif(image_url, ''), nullif(thumbnail_url, ''), '/CareerDishaLogo.png')
where true;

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

update public.blog_posts
set slug = public.unique_blog_slug(title, id)
where slug is null or trim(slug) = '';

alter table public.blog_posts alter column title set not null;
alter table public.blog_posts alter column slug set not null;
alter table public.blog_posts add constraint blog_posts_slug_unique unique (slug);

alter table public.blog_posts drop column if exists excerpt;
alter table public.blog_posts drop column if exists category;
alter table public.blog_posts drop column if exists display_date;
alter table public.blog_posts drop column if exists read_more_url;
alter table public.blog_posts drop column if exists thumbnail_url;
alter table public.blog_posts drop column if exists is_published cascade;
alter table public.blog_posts drop column if exists published_at;
alter table public.blog_posts drop column if exists seo_title;
alter table public.blog_posts drop column if exists seo_description;
alter table public.blog_posts drop column if exists sort_order;
alter table public.blog_posts drop column if exists updated_at;

create index if not exists blog_posts_created_at_idx on public.blog_posts (created_at desc);

alter table public.blog_posts enable row level security;

drop policy if exists "Public can read published blog posts" on public.blog_posts;
drop policy if exists "Public can read blog posts" on public.blog_posts;
create policy "Public can read blog posts"
on public.blog_posts
for select
to anon
using (true);

revoke all on public.blog_posts from anon, authenticated;
grant select on public.blog_posts to anon;

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

create or replace function public.delete_blog_post(p_session_token uuid, p_blog_post_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.assert_admin_session(p_session_token);
  delete from public.blog_posts where id = p_blog_post_id;
end;
$$;

create or replace function public.list_blog_posts(p_session_token uuid)
returns setof public.blog_posts
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.assert_admin_session(p_session_token);
  return query select * from public.blog_posts order by created_at desc;
end;
$$;

create or replace function public.save_insights_cms(p_session_token uuid, p_payload jsonb)
returns table(data jsonb)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_insight jsonb := coalesce(p_payload -> 'insight', '{}'::jsonb);
  v_blogs jsonb := coalesce(p_payload -> 'blogs', '[]'::jsonb);
  v_videos jsonb := coalesce(p_payload -> 'videos', '[]'::jsonb);
  v_blog jsonb;
  v_video jsonb;
  v_blog_ids uuid[] := array[]::uuid[];
  v_video_slugs text[] := array[]::text[];
  v_saved_blog public.blog_posts%rowtype;
  v_saved_insight jsonb := v_insight;
begin
  perform public.assert_admin_session(p_session_token);

  if jsonb_typeof(v_blogs) <> 'array' then
    raise exception 'blogs must be an array' using errcode = '22023';
  end if;

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
  where jsonb_array_length(v_blogs) = 0
    or not (id = any(v_blog_ids));

  if jsonb_typeof(v_videos) = 'array' then
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
    where jsonb_array_length(v_videos) = 0
      or not (slug = any(v_video_slugs));
  end if;

  return query
  select jsonb_build_object(
    'insight', v_saved_insight,
    'blogs', coalesce((select jsonb_agg(to_jsonb(bp) order by bp.created_at desc) from public.blog_posts bp), '[]'::jsonb),
    'videos', coalesce((select jsonb_agg(to_jsonb(yv) order by yv.sort_order asc, yv.updated_at desc) from public.youtube_videos yv), '[]'::jsonb)
  );
end;
$$;

alter table public.expert_advice_inquiries add column if not exists "countryCode" text;
alter table public.expert_advice_inquiries add column if not exists "dialCode" text;
alter table public.expert_advice_inquiries add column if not exists "countryName" text;
alter table public.partner_inquiries add column if not exists "countryCode" text;
alter table public.partner_inquiries add column if not exists "dialCode" text;
alter table public.partner_inquiries add column if not exists "countryName" text;
alter table public.brochure_inquiries add column if not exists "countryCode" text;
alter table public.brochure_inquiries add column if not exists "dialCode" text;
alter table public.brochure_inquiries add column if not exists "countryName" text;

alter table public.expert_advice_inquiries enable row level security;
alter table public.partner_inquiries enable row level security;
alter table public.brochure_inquiries enable row level security;

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

revoke all on public.expert_advice_inquiries from anon, authenticated;
revoke all on public.partner_inquiries from anon, authenticated;
revoke all on public.brochure_inquiries from anon, authenticated;
grant insert on public.expert_advice_inquiries to anon;
grant insert on public.partner_inquiries to anon;
grant insert on public.brochure_inquiries to anon;

grant execute on function public.assert_admin_session(uuid) to anon;
grant execute on function public.save_blog_post(uuid, uuid, text, text, text) to anon;
grant execute on function public.delete_blog_post(uuid, uuid) to anon;
grant execute on function public.list_blog_posts(uuid) to anon;
grant execute on function public.save_insights_cms(uuid, jsonb) to anon;
