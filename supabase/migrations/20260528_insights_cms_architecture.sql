create extension if not exists pgcrypto with schema extensions;

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

create or replace function public.cms_touch_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

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

create table if not exists public.insights (
  id uuid primary key default extensions.gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  content text not null default '',
  image_url text not null default '',
  thumbnail_url text not null default '',
  is_published boolean not null default true,
  published_at timestamptz,
  seo_title text not null default '',
  seo_description text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint insights_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint insights_title_not_blank check (length(trim(title)) > 0),
  constraint insights_seo_title_len check (length(seo_title) <= 180),
  constraint insights_seo_description_len check (length(seo_description) <= 320)
);

create table if not exists public.blog_posts (
  id uuid primary key default extensions.gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  category text not null default 'Career Advice',
  display_date text not null default '',
  read_more_url text not null default '',
  image_url text not null default '',
  thumbnail_url text not null default '',
  is_published boolean not null default true,
  published_at timestamptz,
  seo_title text not null default '',
  seo_description text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blog_posts_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint blog_posts_title_not_blank check (length(trim(title)) > 0),
  constraint blog_posts_category_not_blank check (length(trim(category)) > 0),
  constraint blog_posts_seo_title_len check (length(seo_title) <= 180),
  constraint blog_posts_seo_description_len check (length(seo_description) <= 320)
);

create table if not exists public.youtube_videos (
  id uuid primary key default extensions.gen_random_uuid(),
  slug text not null unique,
  youtube_id text not null,
  title text not null,
  description text not null default '',
  thumbnail_url text not null default '',
  is_published boolean not null default true,
  published_at timestamptz,
  seo_title text not null default '',
  seo_description text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint youtube_videos_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint youtube_videos_youtube_id_format check (youtube_id ~ '^[A-Za-z0-9_-]{6,32}$'),
  constraint youtube_videos_title_not_blank check (length(trim(title)) > 0),
  constraint youtube_videos_seo_title_len check (length(seo_title) <= 180),
  constraint youtube_videos_seo_description_len check (length(seo_description) <= 320)
);

create index if not exists insights_published_idx on public.insights (is_published, sort_order, published_at desc);
create index if not exists insights_updated_at_idx on public.insights (updated_at desc);
create index if not exists blog_posts_published_idx on public.blog_posts (is_published, sort_order, published_at desc);
create index if not exists blog_posts_category_idx on public.blog_posts (category);
create index if not exists blog_posts_updated_at_idx on public.blog_posts (updated_at desc);
create index if not exists youtube_videos_published_idx on public.youtube_videos (is_published, sort_order, published_at desc);
create index if not exists youtube_videos_updated_at_idx on public.youtube_videos (updated_at desc);

drop trigger if exists insights_touch_updated_at on public.insights;
create trigger insights_touch_updated_at
before update on public.insights
for each row execute function public.cms_touch_updated_at();

drop trigger if exists blog_posts_touch_updated_at on public.blog_posts;
create trigger blog_posts_touch_updated_at
before update on public.blog_posts
for each row execute function public.cms_touch_updated_at();

drop trigger if exists youtube_videos_touch_updated_at on public.youtube_videos;
create trigger youtube_videos_touch_updated_at
before update on public.youtube_videos
for each row execute function public.cms_touch_updated_at();

alter table public.insights enable row level security;
alter table public.blog_posts enable row level security;
alter table public.youtube_videos enable row level security;

drop policy if exists "Public can read published insights" on public.insights;
create policy "Public can read published insights"
on public.insights
for select
to anon
using (is_published = true);

drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts"
on public.blog_posts
for select
to anon
using (is_published = true);

drop policy if exists "Public can read published youtube videos" on public.youtube_videos;
create policy "Public can read published youtube videos"
on public.youtube_videos
for select
to anon
using (is_published = true);

revoke all on public.insights from anon, authenticated;
revoke all on public.blog_posts from anon, authenticated;
revoke all on public.youtube_videos from anon, authenticated;
grant select on public.insights to anon;
grant select on public.blog_posts to anon;
grant select on public.youtube_videos to anon;

create or replace function public.save_insight(
  p_session_token uuid,
  p_id uuid default null,
  p_slug text default null,
  p_title text default null,
  p_description text default '',
  p_content text default '',
  p_image_url text default '',
  p_thumbnail_url text default '',
  p_is_published boolean default true,
  p_published_at timestamptz default null,
  p_seo_title text default '',
  p_seo_description text default '',
  p_sort_order integer default 0
)
returns setof public.insights
language plpgsql
security definer
set search_path = public
as $$
declare
  v_slug text;
  v_published_at timestamptz;
  v_id uuid;
begin
  perform public.assert_admin_session(p_session_token);

  v_slug := public.cms_slugify(coalesce(p_slug, p_title), 'insight');
  v_published_at := case when coalesce(p_is_published, true) then coalesce(p_published_at, now()) else null end;

  if nullif(trim(coalesce(p_title, '')), '') is null then
    raise exception 'Insight title is required' using errcode = '22023';
  end if;

  if p_id is not null and exists (select 1 from public.insights where id = p_id) then
    update public.insights
    set slug = v_slug,
        title = trim(p_title),
        description = coalesce(p_description, ''),
        content = coalesce(p_content, ''),
        image_url = coalesce(p_image_url, ''),
        thumbnail_url = coalesce(p_thumbnail_url, ''),
        is_published = coalesce(p_is_published, true),
        published_at = v_published_at,
        seo_title = left(coalesce(p_seo_title, ''), 180),
        seo_description = left(coalesce(p_seo_description, ''), 320),
        sort_order = coalesce(p_sort_order, 0)
    where id = p_id
    returning id into v_id;
  else
    insert into public.insights (
      slug, title, description, content, image_url, thumbnail_url, is_published,
      published_at, seo_title, seo_description, sort_order
    )
    values (
      v_slug, trim(p_title), coalesce(p_description, ''), coalesce(p_content, ''),
      coalesce(p_image_url, ''), coalesce(p_thumbnail_url, ''), coalesce(p_is_published, true),
      v_published_at, left(coalesce(p_seo_title, ''), 180),
      left(coalesce(p_seo_description, ''), 320), coalesce(p_sort_order, 0)
    )
    on conflict (slug) do update
      set title = excluded.title,
          description = excluded.description,
          content = excluded.content,
          image_url = excluded.image_url,
          thumbnail_url = excluded.thumbnail_url,
          is_published = excluded.is_published,
          published_at = excluded.published_at,
          seo_title = excluded.seo_title,
          seo_description = excluded.seo_description,
          sort_order = excluded.sort_order
    returning id into v_id;
  end if;

  return query select * from public.insights where id = v_id;
end;
$$;

create or replace function public.save_blog_post(
  p_session_token uuid,
  p_id uuid default null,
  p_slug text default null,
  p_title text default null,
  p_excerpt text default '',
  p_content text default '',
  p_category text default 'Career Advice',
  p_display_date text default '',
  p_read_more_url text default '',
  p_image_url text default '',
  p_thumbnail_url text default '',
  p_is_published boolean default true,
  p_published_at timestamptz default null,
  p_seo_title text default '',
  p_seo_description text default '',
  p_sort_order integer default 0
)
returns setof public.blog_posts
language plpgsql
security definer
set search_path = public
as $$
declare
  v_slug text;
  v_published_at timestamptz;
  v_id uuid;
begin
  perform public.assert_admin_session(p_session_token);

  v_slug := public.cms_slugify(coalesce(p_slug, p_title), 'blog-post');
  v_published_at := case when coalesce(p_is_published, true) then coalesce(p_published_at, now()) else null end;

  if nullif(trim(coalesce(p_title, '')), '') is null then
    raise exception 'Blog title is required' using errcode = '22023';
  end if;

  if p_id is not null and exists (select 1 from public.blog_posts where id = p_id) then
    update public.blog_posts
    set slug = v_slug,
        title = trim(p_title),
        excerpt = coalesce(p_excerpt, ''),
        content = coalesce(p_content, ''),
        category = coalesce(nullif(trim(p_category), ''), 'Career Advice'),
        display_date = coalesce(p_display_date, ''),
        read_more_url = coalesce(p_read_more_url, ''),
        image_url = coalesce(p_image_url, ''),
        thumbnail_url = coalesce(p_thumbnail_url, ''),
        is_published = coalesce(p_is_published, true),
        published_at = v_published_at,
        seo_title = left(coalesce(p_seo_title, ''), 180),
        seo_description = left(coalesce(p_seo_description, ''), 320),
        sort_order = coalesce(p_sort_order, 0)
    where id = p_id
    returning id into v_id;
  else
    insert into public.blog_posts (
      slug, title, excerpt, content, category, display_date, read_more_url,
      image_url, thumbnail_url, is_published, published_at, seo_title, seo_description, sort_order
    )
    values (
      v_slug, trim(p_title), coalesce(p_excerpt, ''), coalesce(p_content, ''),
      coalesce(nullif(trim(p_category), ''), 'Career Advice'), coalesce(p_display_date, ''),
      coalesce(p_read_more_url, ''), coalesce(p_image_url, ''), coalesce(p_thumbnail_url, ''),
      coalesce(p_is_published, true), v_published_at, left(coalesce(p_seo_title, ''), 180),
      left(coalesce(p_seo_description, ''), 320), coalesce(p_sort_order, 0)
    )
    on conflict (slug) do update
      set title = excluded.title,
          excerpt = excluded.excerpt,
          content = excluded.content,
          category = excluded.category,
          display_date = excluded.display_date,
          read_more_url = excluded.read_more_url,
          image_url = excluded.image_url,
          thumbnail_url = excluded.thumbnail_url,
          is_published = excluded.is_published,
          published_at = excluded.published_at,
          seo_title = excluded.seo_title,
          seo_description = excluded.seo_description,
          sort_order = excluded.sort_order
    returning id into v_id;
  end if;

  return query select * from public.blog_posts where id = v_id;
end;
$$;

create or replace function public.save_youtube_video(
  p_session_token uuid,
  p_id uuid default null,
  p_slug text default null,
  p_youtube_id text default null,
  p_title text default null,
  p_description text default '',
  p_thumbnail_url text default '',
  p_is_published boolean default true,
  p_published_at timestamptz default null,
  p_seo_title text default '',
  p_seo_description text default '',
  p_sort_order integer default 0
)
returns setof public.youtube_videos
language plpgsql
security definer
set search_path = public
as $$
declare
  v_slug text;
  v_published_at timestamptz;
  v_id uuid;
begin
  perform public.assert_admin_session(p_session_token);

  v_slug := public.cms_slugify(coalesce(p_slug, p_title, p_youtube_id), 'youtube-video');
  v_published_at := case when coalesce(p_is_published, true) then coalesce(p_published_at, now()) else null end;

  if nullif(trim(coalesce(p_title, '')), '') is null then
    raise exception 'Video title is required' using errcode = '22023';
  end if;

  if nullif(trim(coalesce(p_youtube_id, '')), '') is null then
    raise exception 'YouTube ID is required' using errcode = '22023';
  end if;

  if p_id is not null and exists (select 1 from public.youtube_videos where id = p_id) then
    update public.youtube_videos
    set slug = v_slug,
        youtube_id = trim(p_youtube_id),
        title = trim(p_title),
        description = coalesce(p_description, ''),
        thumbnail_url = coalesce(p_thumbnail_url, ''),
        is_published = coalesce(p_is_published, true),
        published_at = v_published_at,
        seo_title = left(coalesce(p_seo_title, ''), 180),
        seo_description = left(coalesce(p_seo_description, ''), 320),
        sort_order = coalesce(p_sort_order, 0)
    where id = p_id
    returning id into v_id;
  else
    insert into public.youtube_videos (
      slug, youtube_id, title, description, thumbnail_url, is_published,
      published_at, seo_title, seo_description, sort_order
    )
    values (
      v_slug, trim(p_youtube_id), trim(p_title), coalesce(p_description, ''),
      coalesce(p_thumbnail_url, ''), coalesce(p_is_published, true), v_published_at,
      left(coalesce(p_seo_title, ''), 180), left(coalesce(p_seo_description, ''), 320),
      coalesce(p_sort_order, 0)
    )
    on conflict (slug) do update
      set youtube_id = excluded.youtube_id,
          title = excluded.title,
          description = excluded.description,
          thumbnail_url = excluded.thumbnail_url,
          is_published = excluded.is_published,
          published_at = excluded.published_at,
          seo_title = excluded.seo_title,
          seo_description = excluded.seo_description,
          sort_order = excluded.sort_order
    returning id into v_id;
  end if;

  return query select * from public.youtube_videos where id = v_id;
end;
$$;

create or replace function public.delete_insight(p_session_token uuid, p_insight_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.assert_admin_session(p_session_token);
  delete from public.insights where id = p_insight_id;
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

create or replace function public.delete_youtube_video(p_session_token uuid, p_youtube_video_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.assert_admin_session(p_session_token);
  delete from public.youtube_videos where id = p_youtube_video_id;
end;
$$;

create or replace function public.list_insights(p_session_token uuid)
returns setof public.insights
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.assert_admin_session(p_session_token);
  return query select * from public.insights order by sort_order asc, updated_at desc;
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
  return query select * from public.blog_posts order by sort_order asc, updated_at desc;
end;
$$;

create or replace function public.list_youtube_videos(p_session_token uuid)
returns setof public.youtube_videos
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.assert_admin_session(p_session_token);
  return query select * from public.youtube_videos order by sort_order asc, updated_at desc;
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
  v_blog_slugs text[] := array[]::text[];
  v_video_slugs text[] := array[]::text[];
  v_saved_insight public.insights%rowtype;
begin
  perform public.assert_admin_session(p_session_token);

  if jsonb_typeof(v_blogs) <> 'array' then
    raise exception 'blogs must be an array' using errcode = '22023';
  end if;

  if jsonb_typeof(v_videos) <> 'array' then
    raise exception 'videos must be an array' using errcode = '22023';
  end if;

  select *
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
  )
  limit 1;

  for v_blog in select * from jsonb_array_elements(v_blogs)
  loop
    v_blog_slugs := array_append(
      v_blog_slugs,
      public.cms_slugify(coalesce(v_blog ->> 'slug', v_blog ->> 'title'), 'blog-post')
    );

    perform public.save_blog_post(
      p_session_token,
      nullif(v_blog ->> 'id', '')::uuid,
      v_blog ->> 'slug',
      v_blog ->> 'title',
      coalesce(v_blog ->> 'excerpt', ''),
      coalesce(v_blog ->> 'content', ''),
      coalesce(v_blog ->> 'category', 'Career Advice'),
      coalesce(v_blog ->> 'display_date', ''),
      coalesce(v_blog ->> 'read_more_url', ''),
      coalesce(v_blog ->> 'image_url', ''),
      coalesce(v_blog ->> 'thumbnail_url', ''),
      coalesce((v_blog ->> 'is_published')::boolean, true),
      nullif(v_blog ->> 'published_at', '')::timestamptz,
      coalesce(v_blog ->> 'seo_title', ''),
      coalesce(v_blog ->> 'seo_description', ''),
      coalesce((v_blog ->> 'sort_order')::integer, 0)
    );
  end loop;

  delete from public.blog_posts
  where not (slug = any(v_blog_slugs));

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
  where not (slug = any(v_video_slugs));

  return query
  select jsonb_build_object(
    'insight', to_jsonb(v_saved_insight),
    'blogs', coalesce((select jsonb_agg(to_jsonb(bp) order by bp.sort_order asc, bp.updated_at desc) from public.blog_posts bp), '[]'::jsonb),
    'videos', coalesce((select jsonb_agg(to_jsonb(yv) order by yv.sort_order asc, yv.updated_at desc) from public.youtube_videos yv), '[]'::jsonb)
  );
end;
$$;

insert into public.insights (slug, title, description, is_published, published_at, sort_order)
values ('insights-page', 'Insights', 'Stay updated with the latest industry trends, expert mentorship sessions, and career guidance from Career Disha.', true, now(), 0)
on conflict (slug) do nothing;

insert into public.youtube_videos (slug, youtube_id, title, is_published, published_at, sort_order)
values
  ('career-guidance-session-1', '2RBDdsniaHw', 'Career Guidance Session 1', true, now(), 0),
  ('sap-consulting-insights', 'U2QHNZmi-XY', 'SAP Consulting Insights', true, now(), 1),
  ('future-of-work', 'zkBlpi7JYnw', 'Future of Work', true, now(), 2)
on conflict (slug) do nothing;

insert into public.blog_posts (
  slug, title, excerpt, category, display_date, read_more_url, image_url, thumbnail_url,
  is_published, published_at, sort_order
)
values
  (
    'sap-career-viable',
    'Is adopting career in SAP is viable Opt...',
    'Is Adopting a Career in SAP for Fresher Graduates a Viable Option? In toda...',
    'Career Advice',
    '7-Sep-2025',
    'https://ZeOpto.com/blog-details.php?slug=is-adopting-career-in-sap-is-viable-option-',
    'https://www.zeopto.com/img/ChatGPT%20Image%20Sep%207,%202025,%2012_54_10%20PM.png',
    'https://www.zeopto.com/img/ChatGPT%20Image%20Sep%207,%202025,%2012_54_10%20PM.png',
    true,
    now(),
    0
  ),
  (
    'amrapali-workshop',
    'ZeOpto Workshop at Amrapali University -...',
    'Learning is always special when it connects with real-world opportunities. Our recent SAP Worksho...',
    'Workshop',
    '30-Sep-2025',
    'https://ZeOpto.com/blog-details.php?slug=ZeOpto-workshop-at-amrapali-university---a-journey-of-learning-growth',
    'https://www.zeopto.com/img/Amrapali%20Workshop.png',
    'https://www.zeopto.com/img/Amrapali%20Workshop.png',
    true,
    now(),
    1
  ),
  (
    'sap-fico-training',
    'Best SAP FICO Training Institute | ZeOpt...',
    'SAP FICO Training. Choosing the right SAP FICO training institute in Noida can shape your ca...',
    'Training',
    '6-Nov-2025',
    'https://ZeOpto.com/blog-details.php?slug=best-sap-fico-training-institute-ZeOpto',
    'https://www.zeopto.com/img/SAP%20FICO%20Training%20(1).png',
    'https://www.zeopto.com/img/SAP%20FICO%20Training%20(1).png',
    true,
    now(),
    2
  ),
  (
    'sap-mm-training',
    'Best SAP MM Training Institute in Noida ...',
    'SAP MM is one of the most important modules in the SAP system and is widely used in industries th...',
    'Training',
    '16-Nov-2025',
    'https://ZeOpto.com/blog-details.php?slug=best-sap-mm-training-institute-in-noida-ZeOpto',
    'https://www.zeopto.com/img/SAP%20MM%20Training%20ZeOpto.png',
    'https://www.zeopto.com/img/SAP%20MM%20Training%20ZeOpto.png',
    true,
    now(),
    3
  ),
  (
    'sap-training-noida',
    'Best SAP Training Institute in Noida | Z...',
    'Best SAP Training Institute in Noida. SAP is one of the most widely used business software...',
    'Education',
    '15-Dec-2025',
    'https://ZeOpto.com/blog-details.php?slug=best-sap-training-institute-in-noida-ZeOpto',
    'https://www.zeopto.com/img/Thumbnail%20.png',
    'https://www.zeopto.com/img/Thumbnail%20.png',
    true,
    now(),
    4
  ),
  (
    'graphic-era-workshop',
    'ZeOpto Workshop at Graphic Era Universit...',
    'ZeOpto Workshop at Graphic Era University - Industry-Focused Learning Experience...',
    'Workshop',
    '5-Feb-2026',
    'https://ZeOpto.com/blog-details.php?slug=ZeOpto-workshop-at-graphic-era-university-empowering-students-with-industry-ready-it-sap-skills',
    'https://www.zeopto.com/img/Untitled%20design%20(59).png',
    'https://www.zeopto.com/img/Untitled%20design%20(59).png',
    true,
    now(),
    5
  ),
  (
    'sap-classes-noida',
    'SAP Classes in Noida...',
    'SAP Classes in Noida: Learn SAP with Practical Training at ZeOpto. Today, com...',
    'Training',
    '5-Feb-2026',
    'https://ZeOpto.com/blog-details.php?slug=sap-classes-in-noida',
    'https://www.zeopto.com/img/Best%20SAP%20CLasses%20in%20Noida.png',
    'https://www.zeopto.com/img/Best%20SAP%20CLasses%20in%20Noida.png',
    true,
    now(),
    6
  )
on conflict (slug) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'insights-media',
  'insights-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read insights media" on storage.objects;
create policy "Public can read insights media"
on storage.objects
for select
to anon
using (bucket_id = 'insights-media');

drop policy if exists "Admin session can upload insights media" on storage.objects;
create policy "Admin session can upload insights media"
on storage.objects
for insert
to anon
with check (
  bucket_id = 'insights-media'
  and lower((storage.extension(name))) in ('jpg', 'jpeg', 'png', 'webp', 'gif')
  and public.is_valid_admin_session(
    nullif((nullif(current_setting('request.headers', true), '')::json ->> 'x-admin-session-token'), '')::uuid
  )
);

drop policy if exists "Admin session can replace insights media" on storage.objects;
create policy "Admin session can replace insights media"
on storage.objects
for update
to anon
using (
  bucket_id = 'insights-media'
  and public.is_valid_admin_session(
    nullif((nullif(current_setting('request.headers', true), '')::json ->> 'x-admin-session-token'), '')::uuid
  )
)
with check (
  bucket_id = 'insights-media'
  and lower((storage.extension(name))) in ('jpg', 'jpeg', 'png', 'webp', 'gif')
  and public.is_valid_admin_session(
    nullif((nullif(current_setting('request.headers', true), '')::json ->> 'x-admin-session-token'), '')::uuid
  )
);

drop policy if exists "Admin session can delete insights media" on storage.objects;
create policy "Admin session can delete insights media"
on storage.objects
for delete
to anon
using (
  bucket_id = 'insights-media'
  and public.is_valid_admin_session(
    nullif((nullif(current_setting('request.headers', true), '')::json ->> 'x-admin-session-token'), '')::uuid
  )
);

grant execute on function public.assert_admin_session(uuid) to anon;
grant execute on function public.is_valid_admin_session(uuid) to anon;
grant execute on function public.save_insight(uuid, uuid, text, text, text, text, text, text, boolean, timestamptz, text, text, integer) to anon;
grant execute on function public.save_blog_post(uuid, uuid, text, text, text, text, text, text, text, text, text, boolean, timestamptz, text, text, integer) to anon;
grant execute on function public.save_youtube_video(uuid, uuid, text, text, text, text, text, boolean, timestamptz, text, text, integer) to anon;
grant execute on function public.delete_insight(uuid, uuid) to anon;
grant execute on function public.delete_blog_post(uuid, uuid) to anon;
grant execute on function public.delete_youtube_video(uuid, uuid) to anon;
grant execute on function public.list_insights(uuid) to anon;
grant execute on function public.list_blog_posts(uuid) to anon;
grant execute on function public.list_youtube_videos(uuid) to anon;
grant execute on function public.save_insights_cms(uuid, jsonb) to anon;

drop policy if exists "Public can read brochure inquiries" on public.brochure_inquiries;
drop policy if exists "Public can delete brochure inquiries" on public.brochure_inquiries;
drop function if exists public.delete_all_brochure_inquiries();

alter table public.brochure_inquiries enable row level security;
revoke all on public.brochure_inquiries from anon, authenticated;
grant insert on public.brochure_inquiries to anon;

create or replace function public.list_brochure_inquiries(p_session_token uuid)
returns setof public.brochure_inquiries
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.assert_admin_session(p_session_token);
  return query
  select *
  from public.brochure_inquiries
  order by public.brochure_inquiries.created_at desc;
end;
$$;

create or replace function public.delete_brochure_inquiry(p_session_token uuid, p_inquiry_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.assert_admin_session(p_session_token);
  delete from public.brochure_inquiries
  where public.brochure_inquiries.id = p_inquiry_id;
end;
$$;

create or replace function public.delete_all_brochure_inquiries(p_session_token uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.assert_admin_session(p_session_token);
  delete from public.brochure_inquiries;
end;
$$;

drop policy if exists "Anon can upload sample report PDFs" on storage.objects;
drop policy if exists "Anon can replace sample report PDFs" on storage.objects;
drop policy if exists "Anon can delete sample report PDFs" on storage.objects;

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

grant execute on function public.list_brochure_inquiries(uuid) to anon;
grant execute on function public.delete_brochure_inquiry(uuid, uuid) to anon;
grant execute on function public.delete_all_brochure_inquiries(uuid) to anon;
