-- This removes the ZeOpto, SAP, and generic placeholder videos and blogs 
-- that were seeded during the 20260528_insights_cms_architecture migration.

DELETE FROM public.youtube_videos 
WHERE slug IN (
  'career-guidance-session-1', 
  'sap-consulting-insights', 
  'future-of-work'
);

DELETE FROM public.blog_posts 
WHERE slug IN (
  'sap-career-viable', 
  'amrapali-workshop', 
  'sap-fico-training', 
  'sap-mm-training', 
  'sap-training-noida', 
  'graphic-era-workshop', 
  'sap-classes-noida'
);
