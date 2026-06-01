# CMS Architecture

This repository keeps production schema evolution in `supabase/migrations`.
`supabase_cms_setup.sql` is a legacy bootstrap helper and must not be treated as
the source of truth for production.

## Authoritative Model

| Entity | Database model | Frontend model | Transport |
| --- | --- | --- | --- |
| Site CMS | `cms_settings(id, data, updated_at)` | `CmsData` | REST read, `save_cms_settings` RPC write |
| Insights page | `insights` | `CmsInsights` | REST read, nested in `save_insights_cms` |
| Blog | `blog_posts(id, slug, title, content, image_url, created_at)` | `CmsInsightBlog` | REST read, nested blog payload with `id`, `title`, `content`, `image_url` |
| YouTube video | `youtube_videos` | `CmsInsightVideo` | REST read, nested video payload |
| Sample report | `sample_reports` plus `sample-reports` storage bucket | `SampleReport` | REST read, `save_sample_report` RPC, storage upload/delete |
| Inquiry | `expert_advice_inquiries`, `partner_inquiries`, `brochure_inquiries` | `ExpertAdviceInquiry`, `PartnerInquiry`, `BrochureInquiry` | REST insert, admin list/delete RPC |
| Admin auth | `admin_users`, `admin_sessions` | `AdminSession` | `verify_admin_login`, `verify_admin_session`, `revoke_admin_session` RPCs |

## Canonical Naming

Inquiry country metadata is canonical lowercase:

- `countrycode`
- `dialcode`
- `countryname`

The quoted camelCase columns from older SQL (`"countryCode"`, `"dialCode"`,
`"countryName"`) are compatibility-only. New frontend writes lowercase fields.
The 20260601 migration backfills lowercase columns from quoted camelCase columns
when those older columns exist.

## Migration Status

| File | Status | Notes |
| --- | --- | --- |
| `20260528_insights_cms_architecture.sql` | Keep | Historical migration that introduced the larger insights/blog schema. |
| `20260529_blog_enquiry_rebuild.sql` | Keep | Historical migration that simplified `blog_posts` and introduced the active 5-arg `save_blog_post`. |
| `20260601_fix_duplicate_blog_rpc.sql` | Authoritative latest | Removes obsolete overloads, hardens sync, normalizes inquiry fields, and closes old storage/inquiry policy drift. |
| `supabase_cms_setup.sql` | Legacy helper | Not authoritative. Use migrations for production and fresh environments. |

## Drift Classification

### Safe To Remove

- Root scratch files `test.ts` and `test-supa.js`.
- Unused hook `src/components/landing/useInView.ts`.
- Unused frontend wrapper `deleteAllBrochureInquiries`.
- Unused bulk SQL RPC `delete_all_brochure_inquiries(uuid)`.
- Unused direct admin RPCs for dedicated insight/blog/youtube list/delete
  operations. The active CMS write path is `save_insights_cms`.
- Unused imports, props, and constants found by `tsc --noUnusedLocals --noUnusedParameters`.

### Needs Migration

- Quoted camelCase inquiry columns. Keep for now, backfill lowercase fields, and
  drop only after production confirms no data remains exclusively in camelCase.
- Default admin credentials in existing databases. Rotate manually in production;
  do not solve with a blind migration that could lock out the live admin.

### Keep

- `admin_users` and `admin_sessions` custom auth until a planned Supabase Auth migration.
- Historical migrations. Do not rewrite applied migration history.
- Internal RPC helpers used by active RPCs or storage policies:
  `assert_admin_session`, `is_valid_admin_session`, `cms_slugify`,
  `unique_blog_slug`, `save_insight`, `save_blog_post`, `save_youtube_video`.
  These helpers are not exposed as frontend RPC calls.

## Sync Safety

`save_insights_cms` is a full-sync RPC for blogs and videos. Missing records are
deleted only when the corresponding payload array is non-empty. Empty arrays do
not delete all records unless a caller explicitly sets:

- `allow_empty_blog_delete: true`
- `allow_empty_video_delete: true`

The current frontend never sets those flags to true.

## Auth Notes

Current auth remains custom by design:

- Password hashing uses `pgcrypto`.
- Session tokens are UUIDs stored in `admin_sessions`.
- Sessions expire after 12 hours.

Known remaining weaknesses:

- No login rate limiting.
- Legacy default admin account must be rotated manually in production.
- A future Supabase Auth migration should preserve admin-only CMS RPC behavior
  behind RLS policies or Edge Functions.
