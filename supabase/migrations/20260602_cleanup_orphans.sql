-- Safely drop the orphaned trigger on the blog_posts table
DROP TRIGGER IF EXISTS blog_posts_touch_updated_at ON public.blog_posts;

-- Also check for any other leftover policies or objects referencing dropped columns
-- (e.g., thumbnail_url, is_published, published_at, seo_title, seo_description, sort_order, updated_at on blog_posts)

-- Ensure no old views are relying on them
