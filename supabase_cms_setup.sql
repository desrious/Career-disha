-- Legacy bootstrap helper only.
-- Authoritative production schema is the ordered migration set in supabase/migrations.
-- For current CMS architecture and drift notes, see docs/cms-architecture.md.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.cms_settings (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.expert_advice_inquiries (
  id uuid primary key default extensions.gen_random_uuid(),
  name text not null,
  email text not null,
  mobile text not null,
  "countryCode" text,
  "dialCode" text,
  "countryName" text,
  service text not null,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  id uuid primary key default extensions.gen_random_uuid(),
  username text not null unique,
  password_hash text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_sessions (
  id uuid primary key default extensions.gen_random_uuid(),
  admin_user_id uuid not null references public.admin_users(id) on delete cascade,
  session_token uuid not null unique default gen_random_uuid(),
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists admin_sessions_session_token_idx on public.admin_sessions(session_token);
create index if not exists admin_sessions_expires_at_idx on public.admin_sessions(expires_at);

alter table public.cms_settings enable row level security;
alter table public.expert_advice_inquiries enable row level security;
alter table public.admin_users enable row level security;
alter table public.admin_sessions enable row level security;

drop policy if exists "Public can read CMS settings" on public.cms_settings;
create policy "Public can read CMS settings"
on public.cms_settings
for select
to anon
using (true);

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

drop policy if exists "Public can read inquiries" on public.expert_advice_inquiries;
drop policy if exists "Public can upsert CMS settings" on public.cms_settings;

insert into public.cms_settings (id, data)
values ('site', '{}'::jsonb)
on conflict (id) do nothing;

insert into public.admin_users (username, password_hash)
values ('admin', extensions.crypt('admin123', extensions.gen_salt('bf')))
on conflict (username) do nothing;

create or replace function public.verify_admin_login(p_username text, p_password text)
returns table(session_token uuid, expires_at timestamptz, username text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_admin public.admin_users%rowtype;
  v_session_token uuid;
  v_expires_at timestamptz;
begin
  select *
  into v_admin
  from public.admin_users
  where public.admin_users.username = p_username
    and public.admin_users.is_active = true
    and public.admin_users.password_hash = extensions.crypt(p_password, public.admin_users.password_hash)
  limit 1;

  if not found then
    return;
  end if;

  delete from public.admin_sessions
  where public.admin_sessions.expires_at < now();

  v_session_token := extensions.gen_random_uuid();
  v_expires_at := now() + interval '12 hours';

  insert into public.admin_sessions (admin_user_id, session_token, expires_at)
  values (v_admin.id, v_session_token, v_expires_at);

  return query
  select v_session_token, v_expires_at, v_admin.username;
end;
$$;

create or replace function public.verify_admin_session(p_session_token uuid)
returns table(is_valid boolean, username text, expires_at timestamptz)
language sql
security definer
set search_path = public
as $$
  select
    true as is_valid,
    public.admin_users.username,
    public.admin_sessions.expires_at
  from public.admin_sessions
  join public.admin_users on public.admin_users.id = public.admin_sessions.admin_user_id
  where public.admin_sessions.session_token = p_session_token
    and public.admin_sessions.expires_at > now()
    and public.admin_users.is_active = true
  limit 1;
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

create or replace function public.revoke_admin_session(p_session_token uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.admin_sessions
  where public.admin_sessions.session_token = p_session_token;
end;
$$;

create or replace function public.save_cms_settings(p_session_token uuid, p_data jsonb)
returns table(updated_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_admin_id uuid;
  v_updated_at timestamptz;
begin
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

  v_updated_at := now();

  insert into public.cms_settings (id, data, updated_at)
  values ('site', p_data, v_updated_at)
  on conflict (id) do update
    set data = excluded.data,
        updated_at = excluded.updated_at;

  return query select v_updated_at;
end;
$$;

create or replace function public.list_expert_advice_inquiries(p_session_token uuid)
returns setof public.expert_advice_inquiries
language plpgsql
security definer
set search_path = public
as $$
declare
  v_admin_id uuid;
begin
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

  return query
  select *
  from public.expert_advice_inquiries
  order by public.expert_advice_inquiries.created_at desc;
end;
$$;

create or replace function public.delete_expert_advice_inquiry(p_session_token uuid, p_inquiry_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_admin_id uuid;
begin
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

  delete from public.expert_advice_inquiries
  where public.expert_advice_inquiries.id = p_inquiry_id;
end;
$$;

create or replace function public.delete_all_expert_advice_inquiries(p_session_token uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_admin_id uuid;
begin
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

  delete from public.expert_advice_inquiries;
end;
$$;

revoke all on public.admin_users from anon;
revoke all on public.admin_sessions from anon;
revoke all on public.cms_settings from anon;
revoke all on public.expert_advice_inquiries from anon;

grant select on public.cms_settings to anon;
grant insert on public.expert_advice_inquiries to anon;
grant execute on function public.verify_admin_login(text, text) to anon;
grant execute on function public.verify_admin_session(uuid) to anon;
grant execute on function public.is_valid_admin_session(uuid) to anon;
grant execute on function public.revoke_admin_session(uuid) to anon;
grant execute on function public.save_cms_settings(uuid, jsonb) to anon;
grant execute on function public.list_expert_advice_inquiries(uuid) to anon;
grant execute on function public.delete_expert_advice_inquiry(uuid, uuid) to anon;
grant execute on function public.delete_all_expert_advice_inquiries(uuid) to anon;

-- ═══════════════════════════════════════════════════════
-- Partner Inquiries
-- ═══════════════════════════════════════════════════════

create table if not exists public.partner_inquiries (
  id uuid primary key default extensions.gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  "countryCode" text,
  "dialCode" text,
  "countryName" text,
  interested_in text not null,
  created_at timestamptz not null default now()
);

alter table public.partner_inquiries enable row level security;

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

create or replace function public.list_partner_inquiries(p_session_token uuid)
returns setof public.partner_inquiries
language plpgsql
security definer
set search_path = public
as $$
declare
  v_admin_id uuid;
begin
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

  return query
  select *
  from public.partner_inquiries
  order by public.partner_inquiries.created_at desc;
end;
$$;

create or replace function public.delete_partner_inquiry(p_session_token uuid, p_inquiry_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_admin_id uuid;
begin
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

  delete from public.partner_inquiries
  where public.partner_inquiries.id = p_inquiry_id;
end;
$$;

create or replace function public.delete_all_partner_inquiries(p_session_token uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_admin_id uuid;
begin
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

  delete from public.partner_inquiries;
end;
$$;

revoke all on public.partner_inquiries from anon;
grant insert on public.partner_inquiries to anon;
grant execute on function public.list_partner_inquiries(uuid) to anon;
grant execute on function public.delete_partner_inquiry(uuid, uuid) to anon;
grant execute on function public.delete_all_partner_inquiries(uuid) to anon;

create table if not exists public.brochure_inquiries (
  id uuid primary key default extensions.gen_random_uuid(),
  name text not null,
  mobile text not null,
  email text not null,  "countryCode" text,
  "dialCode" text,
  "countryName" text,  query text,
  created_at timestamptz not null default now()
);

alter table public.brochure_inquiries enable row level security;

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

drop policy if exists "Public can read brochure inquiries" on public.brochure_inquiries;

drop policy if exists "Public can delete brochure inquiries" on public.brochure_inquiries;

drop function if exists public.delete_all_brochure_inquiries();

create or replace function public.list_brochure_inquiries(p_session_token uuid)
returns setof public.brochure_inquiries
language plpgsql
security definer
set search_path = public
as $body$
begin
  if not public.is_valid_admin_session(p_session_token) then
    raise exception 'Invalid admin session' using errcode = '28000';
  end if;
  return query
  select *
  from public.brochure_inquiries
  order by public.brochure_inquiries.created_at desc;
end;
$body$;

create or replace function public.delete_brochure_inquiry(p_session_token uuid, p_inquiry_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $body$
begin
  if not public.is_valid_admin_session(p_session_token) then
    raise exception 'Invalid admin session' using errcode = '28000';
  end if;
  delete from public.brochure_inquiries
  where public.brochure_inquiries.id = p_inquiry_id;
end;
$body$;

grant insert on public.brochure_inquiries to anon;
grant execute on function public.list_brochure_inquiries(uuid) to anon;
grant execute on function public.delete_brochure_inquiry(uuid, uuid) to anon;
drop function if exists public.delete_all_brochure_inquiries(uuid);

-- Adding phone number context columns for inquiries safely
ALTER TABLE public.expert_advice_inquiries ADD COLUMN IF NOT EXISTS countrycode text;
ALTER TABLE public.expert_advice_inquiries ADD COLUMN IF NOT EXISTS dialcode text;
ALTER TABLE public.expert_advice_inquiries ADD COLUMN IF NOT EXISTS countryname text;

ALTER TABLE public.partner_inquiries ADD COLUMN IF NOT EXISTS countrycode text;
ALTER TABLE public.partner_inquiries ADD COLUMN IF NOT EXISTS dialcode text;
ALTER TABLE public.partner_inquiries ADD COLUMN IF NOT EXISTS countryname text;

ALTER TABLE public.brochure_inquiries ADD COLUMN IF NOT EXISTS countrycode text;
ALTER TABLE public.brochure_inquiries ADD COLUMN IF NOT EXISTS dialcode text;
ALTER TABLE public.brochure_inquiries ADD COLUMN IF NOT EXISTS countryname text;

-- Sample Reports CMS metadata. PDF files are static uploads in Supabase Storage.
create table if not exists public.sample_reports (
  id uuid primary key default extensions.gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subtitle text not null,
  page_count text not null,
  pdf_path text not null default '',
  is_active boolean not null default true,
  updated_at timestamptz not null default now(),
  constraint sample_reports_slug_check check (
    slug in ('career-snapshot', 'career-insight', 'career-master-blueprint')
  )
);

alter table public.sample_reports enable row level security;

drop policy if exists "Public can read sample reports" on public.sample_reports;
create policy "Public can read sample reports"
on public.sample_reports
for select
to anon
using (true);

insert into public.sample_reports (slug, title, subtitle, page_count, pdf_path, is_active)
values
  ('career-snapshot', 'Career Snapshot', 'Know Your Strengths & Best Career Direction', '10 Pages', '', true),
  ('career-insight', 'Career Insight Report', 'Personalized Guidance for Better Career Decisions', '22 Pages', '', true),
  ('career-master-blueprint', 'Career Master Blueprint', 'Complete Career Planning for Long-Term Success', '36 Pages', '', true)
on conflict (slug) do nothing;

create or replace function public.save_sample_report(
  p_session_token uuid,
  p_slug text,
  p_title text,
  p_subtitle text,
  p_page_count text,
  p_pdf_path text,
  p_is_active boolean
)
returns setof public.sample_reports
language plpgsql
security definer
set search_path = public
as $$
declare
  v_admin_id uuid;
begin
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

  if p_slug not in ('career-snapshot', 'career-insight', 'career-master-blueprint') then
    raise exception 'Invalid sample report slug' using errcode = '22023';
  end if;

  insert into public.sample_reports (slug, title, subtitle, page_count, pdf_path, is_active, updated_at)
  values (
    p_slug,
    nullif(trim(p_title), ''),
    nullif(trim(p_subtitle), ''),
    nullif(trim(p_page_count), ''),
    coalesce(p_pdf_path, ''),
    coalesce(p_is_active, true),
    now()
  )
  on conflict (slug) do update
    set title = excluded.title,
        subtitle = excluded.subtitle,
        page_count = excluded.page_count,
        pdf_path = excluded.pdf_path,
        is_active = excluded.is_active,
        updated_at = excluded.updated_at;

  return query
  select *
  from public.sample_reports
  where public.sample_reports.slug = p_slug;
end;
$$;

revoke all on public.sample_reports from anon;
grant select on public.sample_reports to anon;
grant execute on function public.save_sample_report(uuid, text, text, text, text, text, boolean) to anon;

-- Supabase Storage bucket for manually uploaded static sample report PDFs.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('sample-reports', 'sample-reports', false, 52428800, array['application/pdf'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read sample report PDFs" on storage.objects;
create policy "Public can read sample report PDFs"
on storage.objects
for select
to anon
using (bucket_id = 'sample-reports');

drop policy if exists "Anon can upload sample report PDFs" on storage.objects;
drop policy if exists "Admin session can upload sample report PDFs" on storage.objects;
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

drop policy if exists "Anon can replace sample report PDFs" on storage.objects;
drop policy if exists "Admin session can replace sample report PDFs" on storage.objects;
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

drop policy if exists "Anon can delete sample report PDFs" on storage.objects;
drop policy if exists "Admin session can delete sample report PDFs" on storage.objects;
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
