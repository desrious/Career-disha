export type CmsOffer = {
  badge: string;
  title: string;
  description: string;
  originalPrice: string;
  offerPrice: string;
  note: string;
  cta: string;
  visible: boolean;
  show_countdown?: boolean;
  valid_upto?: string; // ISO datetime string
};

export type CmsTestimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
};

export type CmsCounsellor = {
  id: string;
  name: string;
  title: string;
  image: string;
  quote: string;
  bullets: string[];
  accent: string;
};

export type CmsExpertAdvice = {
  heading: string;
  services: string[];
  successMessage: string;
};

export type CmsContact = {
  phones: string[];
  email: string;
  website: string;
  address: string;
  whatsapp: string;
  mapQuery: string;
  socials: {
    facebook: string;
    instagram: string;
    linkedin: string;
    whatsapp: string;
    youtube: string;
  };
};

export type CmsFooter = {
  brand: string;
  description: string;
  copyright: string;
  exploreLinks: string[];
  legalLinks: string[];
};

export type CmsInsightBlog = {
  id: string;
  slug?: string;
  title: string;
  content: string;
  date: string;
  image: string;
  excerpt?: string;
  category?: string;
  link?: string;
  seoTitle?: string;
  seoDescription?: string;
  isPublished?: boolean;
  publishedAt?: string;
};

export type CmsInsightVideo = {
  id: string;
  slug?: string;
  youtubeId: string;
  title: string;
  description?: string;
  thumbnail?: string;
  seoTitle?: string;
  seoDescription?: string;
  isPublished?: boolean;
  publishedAt?: string;
};

export type CmsInsights = {
  id?: string;
  slug?: string;
  heroTitle: string;
  heroDescription: string;
  content?: string;
  image?: string;
  thumbnail?: string;
  seoTitle?: string;
  seoDescription?: string;
  isPublished?: boolean;
  publishedAt?: string;
  blogs: CmsInsightBlog[];
  videos: CmsInsightVideo[];
};

export type CmsPartnerStat = {
  value: string;
  label: string;
};

export type CmsPartnerHero = {
  badge: string;
  heading: string;
  highlight: string;
  description: string;
  stats: CmsPartnerStat[];
  programs: string[];
};

export type CmsPartnerService = {
  id: string;
  title: string;
  description: string;
  highlight: string;
  badge: string;
  accentColor: string;
};

export type CmsPartnerPath = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  stat: string;
  statLabel: string;
  color: string;
};

export type CmsPartnerCTA = {
  heading: string;
  description: string;
  whatsappUrl: string;
  emailAddress: string;
};

export type CmsPartnerWhy = {
  id: string;
  title: string;
  description: string;
  color: string;
};

export type CmsPartner = {
  hero: CmsPartnerHero;
  services: CmsPartnerService[];
  paths: CmsPartnerPath[];
  whyPartner: CmsPartnerWhy[];
  cta: CmsPartnerCTA;
};

export type CmsBrochure = {
  content: string; // HTML content or rich text for the brochure page
  pdfUrl: string;
};

export type SampleReportSlug = 'career-snapshot' | 'career-insight' | 'career-master-blueprint';

export type SampleReport = {
  id?: string;
  slug: SampleReportSlug;
  title: string;
  subtitle: string;
  page_count: string;
  pdf_path: string;
  is_active: boolean;
  updated_at?: string;
};

export type CmsData = {
  offer: CmsOffer;
  testimonials: CmsTestimonial[];
  counsellors: CmsCounsellor[];
  expertAdvice: CmsExpertAdvice;
  contact: CmsContact;
  footer: CmsFooter;
  insights: CmsInsights;
  partner: CmsPartner;
  brochure: CmsBrochure;
};

export type ExpertAdviceInquiry = {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  countrycode?: string;
  dialcode?: string;
  countryname?: string;
  service: string;
  message?: string;
  created_at?: string;
};

export type PartnerInquiry = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  countrycode?: string;
  dialcode?: string;
  countryname?: string;
  interested_in: string;
  created_at?: string;
};

export type BrochureInquiry = {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  countrycode?: string;
  dialcode?: string;
  countryname?: string;
  query?: string;
  created_at?: string;
};

export const CMS_STORAGE_KEY = 'careerDishaCmsData_v2';
export const CMS_UPDATED_EVENT = 'careerDishaCmsUpdated';
export const CMS_UPDATED_AT_KEY = 'careerDishaCmsUpdatedAt';
export const ADMIN_SESSION_STORAGE_KEY = 'careerDishaAdminSessionToken';
export const SAMPLE_REPORTS_STORAGE_KEY = 'careerDishaSampleReports_v1';
export const SAMPLE_REPORTS_UPDATED_EVENT = 'careerDishaSampleReportsUpdated';
export const SAMPLE_REPORT_BUCKET = 'sample-reports';
export const INSIGHTS_MEDIA_BUCKET = 'insights-media';
const CMS_ROW_ID = 'site';
const INSIGHTS_PAGE_SLUG = 'insights-page';

export const SAMPLE_REPORT_ORDER: SampleReportSlug[] = [
  'career-snapshot',
  'career-insight',
  'career-master-blueprint',
];

export const defaultSampleReports: SampleReport[] = [
  {
    slug: 'career-snapshot',
    title: 'Career Snapshot',
    page_count: '10 Pages',
    subtitle: 'Know Your Strengths & Best Career Direction',
    pdf_path: '',
    is_active: true,
  },
  {
    slug: 'career-insight',
    title: 'Career Insight Report',
    page_count: '22 Pages',
    subtitle: 'Personalized Guidance for Better Career Decisions',
    pdf_path: '',
    is_active: true,
  },
  {
    slug: 'career-master-blueprint',
    title: 'Career Master Blueprint',
    page_count: '36 Pages',
    subtitle: 'Complete Career Planning for Long-Term Success',
    pdf_path: '',
    is_active: true,
  },
];

export const defaultCmsData: CmsData = {
  brochure: {
    content: '',
    pdfUrl: '',
  },
  offer: {
    badge: 'Save Rs 700',
    title: 'Limited Time Early Bird Offer',
    description: "Grab this exclusive deal before it's gone! Give your career a head start at an unbeatable price.",
    originalPrice: 'Rs 1200',
    offerPrice: 'Rs 500',
    note: '* Offer valid for a limited time only',
    cta: 'Claim Offer Now',
    visible: true,
  },
  testimonials: [
    {
      id: 'prateek-sharma',
      name: 'Prateek Sharma',
      role: 'College Student',
      quote: "The most clear career path guidance I've ever received. Their career planning helped me choose the right career by showing exact courses and internships needed to transition into AI Research.",
      image: 'https://images.unsplash.com/photo-1618698544970-d021c33fca40?w=200&h=200&fit=crop',
      rating: 5,
    },
    {
      id: 'rohan-desai',
      name: 'Rohan Desai',
      role: 'High School Student',
      quote: 'Choosing a stream after 10th was a nightmare until I did the Careerदिशा assessment. It validated my love for design over medicine.',
      image: 'https://images.unsplash.com/photo-1603570388466-eb4eb5acdd8a?w=200&h=200&fit=crop',
      rating: 5,
    },
  ],
  counsellors: [
    {
      id: 'nishtha-vyas',
      name: 'Nishtha Vyas',
      title: 'Senior Career Counsellor',
      image: '/NishthaVyas.jpg',
      quote: 'Empowering students through data-driven insights and strategic foresight to navigate global career paths.',
      accent: 'border-primary/30 text-blue-300',
      bullets: [
        'Experience: 10 years in career development & mentorship',
        'Specialization: Emerging industry trends & career architecture',
        'Strategy: Global job market expertise for future-ready decisions',
        'Approach: Building clarity through high-impact guidance',
      ],
    },
    {
      id: 'milli-tewari',
      name: 'Milli Tewari',
      title: 'Lead Career Strategist',
      image: '/MilliTewari.jpg',
      quote: 'Building agile and future-proof career paths through personalized strategy and market intelligence.',
      accent: 'border-secondary/30 text-green-300',
      bullets: [
        'Experience: 8 years in career strategy & mentorship',
        'Core Focus: Modern industry shifts & global job markets',
        'Methodology: Simplifying complex trends into actionable plans',
        'Goal: Strategic mindset for long-term excellence',
      ],
    },
    {
      id: 'shruti-bhardwaj',
      name: 'Shruti Bhardwaj',
      title: 'Career Development Specialist',
      image: '/Shruti_bhardwaj.jpg',
      quote: 'Dedicated to bridging the gap between academic potential and professional success through personalized mentorship.',
      accent: 'border-accent/30 text-amber-300',
      bullets: [
        'Experience: 3 years in student career counseling & skill development',
        'Focus: Discovering core strengths & aligning career paths',
        'Approach: Relatable one-on-one guidance for early-career transitions',
        'Commitment: Building a strong foundation for professional entry',
      ],
    },
    {
      id: 'anjali-bhardwaj',
      name: 'Dr. Anjali Bhardwaj',
      title: 'Senior Counselling Psychologist',
      image: '/Anjali_Bhardwaj.png',
      quote: 'Integrating psychological insights with career guidance to empower individuals with mental resilience and emotional clarity.',
      accent: 'border-purple-500/30 text-purple-300',
      bullets: [
        'Experience: 15 years in clinical counselling, behavioural therapy & wellness',
        'Specialization: Psychometric assessments, personality mapping & stress management',
        'Methodology: Scientific psychological frameworks & empathetic listening',
        'Focus: Overcoming internal barriers, anxiety, & decision-making blocks',
      ],
    },
  ],
  expertAdvice: {
    heading: 'Expert Advice',
    services: ['Career Counselling', 'Become a Partner'],
    successMessage: 'An expert will get in contact with you shortly.',
  },
  contact: {
    phones: ['+91-9289191164', '+91-9289191165'],
    email: 'hr@zeopto.com',
    website: 'https://ZeOpto.com',
    address: 'B-102, 1st Floor, Sector 6, Noida, 201301',
    whatsapp: 'https://wa.me/919953280036',
    mapQuery: 'B-102, 1st Floor, Sector 6, Noida, 201301',
    socials: {
      facebook: 'https://www.facebook.com/ZeOptoitservices',
      instagram: 'https://www.instagram.com/ZeOptoitservices/?igsh=MTBkYThwNG8wY2F5ZA%3D%3D#',
      linkedin: 'https://www.linkedin.com/company/ZeOpto-it-services/?viewAsMember=true',
      whatsapp: 'https://www.whatsapp.com/channel/0029Vb5aVHkDzgT8eqtO4p3n',
      youtube: 'https://youtube.com/@ZeOpto?si=k0Oijwu3wG1AhtNR',
    },
  },
  footer: {
    brand: 'Careerदिशा',
    description: 'Delivering expert career counselling and career planning to guide the next generation in choosing the right career.',
    copyright: 'Careerदिशा - Powered by ZeOpto',
    exploreLinks: ['Resources', 'Career Blog', 'Support', 'Contact Us'],
    legalLinks: ['Privacy', 'Terms'],
  },
  insights: {
    heroTitle: 'Insights',
    heroDescription: 'Stay updated with the latest industry trends, expert mentorship sessions, and career guidance from the visionaries at Careerदिशा.',
    videos: [
      { id: 'career-guidance-session-1', youtubeId: '2RBDdsniaHw', title: 'Career Guidance Session 1' },
      { id: 'sap-consulting-insights', youtubeId: 'U2QHNZmi-XY', title: 'SAP Consulting Insights' },
      { id: 'future-of-work', youtubeId: 'zkBlpi7JYnw', title: 'Future of Work' },
    ],
    blogs: [
      {
        id: 'sap-career-viable',
        title: 'Is adopting career in SAP is viable Opt...',
        content: 'Use this space to publish the full article content from the admin panel. Add paragraphs, headings, and lists to create a readable internal blog page.',
        date: '7-Sep-2025',
        image: 'https://www.zeopto.com/img/ChatGPT%20Image%20Sep%207,%202025,%2012_54_10%20PM.png',
      },
      {
        id: 'amrapali-workshop',
        title: 'ZeOpto Workshop at Amrapali University -...',
        content: 'Use this space to publish the full article content from the admin panel. Add workshop highlights, outcomes, and next steps for readers.',
        date: '30-Sep-2025',
        image: 'https://www.zeopto.com/img/Amrapali%20Workshop.png',
      },
      {
        id: 'sap-fico-training',
        title: 'Best SAP FICO Training Institute | ZeOpt...',
        content: 'Use this space to publish the full article content from the admin panel. Include practical guidance, headings, and bullet lists.',
        date: '6-Nov-2025',
        image: 'https://www.zeopto.com/img/SAP%20FICO%20Training%20(1).png',
      },
      {
        id: 'sap-mm-training',
        title: 'Best SAP MM Training Institute in Noida ...',
        content: 'Use this space to publish the full article content from the admin panel. Explain the topic clearly with sections and examples.',
        date: '16-Nov-2025',
        image: 'https://www.zeopto.com/img/SAP%20MM%20Training%20ZeOpto.png',
      },
      {
        id: 'sap-training-noida',
        title: 'Best SAP Training Institute in Noida | Z...',
        content: 'Use this space to publish the full article content from the admin panel. Keep the post helpful, structured, and easy to scan.',
        date: '15-Dec-2025',
        image: 'https://www.zeopto.com/img/Thumbnail%20.png',
      },
      {
        id: 'graphic-era-workshop',
        title: 'ZeOpto Workshop at Graphic Era Universit...',
        content: 'Use this space to publish the full article content from the admin panel. Add event details, learning outcomes, and student takeaways.',
        date: '5-Feb-2026',
        image: 'https://www.zeopto.com/img/Untitled%20design%20(59).png',
      },
      {
        id: 'sap-classes-noida',
        title: 'SAP Classes in Noida...',
        content: 'Use this space to publish the full article content from the admin panel. Add complete information through the admin blog editor.',
        date: '5-Feb-2026',
        image: 'https://www.zeopto.com/img/Best%20SAP%20CLasses%20in%20Noida.png',
      },
    ],
  },
  partner: {
    hero: {
      badge: "India's Most Trusted Career Tech Partner Program",
      heading: 'Become',
      highlight: 'Careerदिशा',
      description: 'Your growth partner in Career Counselling, Career Tech & the Global Education ecosystem. World-class career guidance technology built for partners.',
      stats: [
        { value: '10K+', label: 'Active Partners' },
        { value: '50+', label: 'Locations' },
        { value: '4', label: 'Partner Programs' },
      ],
      programs: [
        'Career Counsellor Course',
        'School Careerदिशा Labs',
        'Corporate Assessments',
        'Co-branded Technology',
      ],
    },
    services: [
      { id: 'career-counsellor', title: 'Career Counsellor Course', description: 'Get internationally certified as a Career Analyst. Comprehensive training covering psychometric assessments, counselling frameworks, and business setup to launch your practice.', highlight: '500+ Certified Annually', badge: 'High Demand', accentColor: 'bg-blue-600' },
      { id: 'school-labs', title: 'School Careerदिशा Labs', description: 'Transform schools with dedicated AI-powered career guidance labs. A CSR-eligible initiative that embeds career planning directly into the academic ecosystem.', highlight: 'CSR Project', badge: 'Social Impact', accentColor: 'bg-emerald-600' },
      { id: 'corporate', title: 'Corporate Assessments', description: 'Offer workforce evaluation solutions to enterprises through our HR Miles platform. Ideal for recruitment screening, competency mapping, and leadership development.', highlight: 'B2B Enterprise Focus', badge: 'HR Miles', accentColor: 'bg-red-500' },
      { id: 'cobranded', title: 'Co-branded Technology', description: 'Leverage our world-class career assessment platform with your institutional branding. A ready-to-deploy solution for counselling centres and educational institutions.', highlight: '24hr Deployment', badge: 'Tech Partner', accentColor: 'bg-[#fba70c]' },
    ],
    paths: [
      { id: 'schools', title: 'Schools', subtitle: 'K-12 Institutions', description: 'Transform your school into a career-ready institution. Our Careerदिशा Labs integrate seamlessly into your academic structure, providing students with AI-powered career assessments starting from Class 8.', benefits: ['AI-powered career labs for students', 'Teacher training & certification', 'Parent engagement workshops', 'Annual career readiness reports', 'CSR project eligibility'], stat: '200+ Schools', statLabel: 'Already Partnered', color: 'blue' },
      { id: 'individuals', title: 'Individuals', subtitle: 'Career Counsellors & Coaches', description: 'Launch or scale your career counselling practice with our globally recognized certification program. Get access to world-class assessment technology, training modules, and a ready-to-use business model.', benefits: ['Certified Career Analyst (CCA) credential', 'Full assessment technology access', 'Business setup & marketing support', 'Client management dashboard', 'Community of 500+ counsellors'], stat: 'CCA Certified', statLabel: 'Global Recognition', color: 'amber' },
      { id: 'corporates', title: 'Corporates', subtitle: 'HR & Talent Teams', description: 'Elevate your HR function with data-driven competency assessments. Our HR Miles program helps you hire better, develop smarter, and retain longer through psychometric-backed evaluation frameworks.', benefits: ['Pre-hiring competency assessments', 'Employee development mapping', 'Leadership potential identification', 'Team dynamics analysis', 'Custom report branding'], stat: 'B2B Focus', statLabel: 'Enterprise Ready', color: 'red' },
      { id: 'institutions', title: 'Institutions', subtitle: 'Universities & Training Centers', description: 'Embed career guidance into your curriculum. Our co-branded technology platform lets you offer premium career assessments under your institutional brand, enhancing student outcomes and placement rates.', benefits: ['Co-branded assessment platform', 'White-label options available', 'Placement readiness programs', 'Faculty development modules', 'Student engagement analytics'], stat: '24hr Setup', statLabel: 'Quick Deployment', color: 'emerald' },
    ],
    whyPartner: [
      { id: 'training', title: 'Training & Certification', description: 'Structured learning pathways with globally recognized credentials to build your professional credibility.', color: 'bg-blue-600' },
      { id: 'tech', title: 'Assessment Technology', description: 'AI-powered psychometric tools, dashboards, reports, and career planning systems — all in one platform.', color: 'bg-[#fba70c]' },
      { id: 'support', title: 'Dedicated Support', description: 'Step-by-step partner guidance, technical onboarding, and ongoing assistance to ensure your success.', color: 'bg-emerald-600' },
      { id: 'launch', title: 'Launch Ecosystem', description: 'Marketing collateral, lead generation support, and operational resources to help you start and scale fast.', color: 'bg-red-500' },
    ],
    cta: {
      heading: 'Ready to Transform Careers at Scale?',
      description: 'Join the Careerदिशा partner ecosystem today. Get the technology, training, and brand support you need to make a real impact.',
      whatsappUrl: 'https://wa.me/919289191164?text=Hi%2C%20I%20am%20interested%20in%20the%20Career%20Disha%20Partner%20Program',
      emailAddress: 'hr@zeopto.com',
    },
  },
};

const supabaseEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {};
const SUPABASE_URL = supabaseEnv.NEXT_PUBLIC_SUPABASE_URL ?? supabaseEnv.VITE_SUPABASE_URL ?? '';
const SUPABASE_KEY = supabaseEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? supabaseEnv.VITE_SUPABASE_PUBLISHABLE_KEY ?? '';

export class SupabaseCmsError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'SupabaseCmsError';
    this.status = status;
  }
}

function hasSupabaseConfig() {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

function redactSessionToken(token: string | null | undefined) {
  if (!token) return 'missing';
  if (token.length <= 12) return 'redacted';
  return `${token.slice(0, 8)}...${token.slice(-4)}`;
}

function cmsLog(event: string, details?: unknown) {
  console.info(`[Career Disha CMS] ${event}`, details ?? '');
}

function cmsWarn(event: string, details?: unknown) {
  console.warn(`[Career Disha CMS] ${event}`, details ?? '');
}

function cmsError(event: string, details?: unknown) {
  console.error(`[Career Disha CMS] ${event}`, details ?? '');
}

function getAdminSessionToken() {
  const sessionToken = window.sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
  cmsLog('admin session token read', { token: redactSessionToken(sessionToken) });
  if (!sessionToken) {
    throw new SupabaseCmsError('Admin session missing', 401);
  }
  return sessionToken;
}

function persistCmsData(data: CmsData) {
  window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
  window.localStorage.setItem(CMS_UPDATED_AT_KEY, String(Date.now()));
  window.dispatchEvent(new CustomEvent(CMS_UPDATED_EVENT, { detail: data }));
}

function slugify(value: string, fallback: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');

  return slug || fallback;
}

function isUuid(value: string | undefined) {
  return Boolean(value && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value));
}

function safePublishedAt(value: string | undefined) {
  if (!value) return null;
  const time = new Date(value).getTime();
  return Number.isFinite(time) ? new Date(time).toISOString() : null;
}

function formatPublishedDate(value: string | null | undefined) {
  if (!value) return new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function publicStorageUrl(bucket: string, objectPath: string) {
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${objectPath}`;
}

export type SupabaseConnectionStatus = {
  frontend: boolean;
  backend: boolean;
  message: string;
};

export type AdminSession = {
  session_token: string;
  expires_at: string;
  username: string;
};

type InsightRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  image_url: string;
  thumbnail_url: string;
  is_published: boolean;
  published_at: string | null;
  seo_title: string;
  seo_description: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  excerpt?: string;
  category?: string;
  display_date?: string;
  read_more_url?: string;
  thumbnail_url?: string;
  is_published?: boolean;
  published_at?: string | null;
  seo_title?: string;
  seo_description?: string;
  sort_order?: number;
  updated_at?: string;
};

type YoutubeVideoRow = {
  id: string;
  slug: string;
  youtube_id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  is_published: boolean;
  published_at: string | null;
  seo_title: string;
  seo_description: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

type InsightsCmsRpcResponse = {
  insight: InsightRow | null;
  blogs: BlogPostRow[];
  videos: YoutubeVideoRow[];
};

type InsightsCmsPayload = {
  insight: Record<string, unknown>;
  blogs: Record<string, unknown>[];
  videos: Record<string, unknown>[];
};

async function supabaseRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!hasSupabaseConfig()) {
    throw new Error('Supabase URL or publishable key is missing.');
  }

  cmsLog('REST request', { path, method: init.method ?? 'GET' });

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const detail = await response.text();
    cmsError('REST request failed', { path, status: response.status, detail });
    throw new SupabaseCmsError(detail || `Supabase request failed with ${response.status}`, response.status);
  }

  if (response.status === 204) return undefined as T;

  const text = await response.text();
  if (!text) return undefined as T;
  const parsed = JSON.parse(text) as T;
  cmsLog('REST response', { path, status: response.status, result: parsed });
  return parsed;
}

async function supabaseRpc<T>(fn: string, body: Record<string, unknown>) {
  const safeBody = {
    ...body,
    p_session_token: typeof body.p_session_token === 'string' ? redactSessionToken(body.p_session_token) : body.p_session_token,
  };
  cmsLog('RPC request', { fn, payload: safeBody });

  const result = await supabaseRequest<T>(`rpc/${fn}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  cmsLog('RPC response', { fn, result });
  return result;
}

async function supabaseStorageRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!hasSupabaseConfig()) {
    throw new Error('Supabase URL or publishable key is missing.');
  }

  cmsLog('Storage request', { path, method: init.method ?? 'GET' });

  const response = await fetch(`${SUPABASE_URL}/storage/v1/${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const detail = await response.text();
    cmsError('Storage request failed', { path, status: response.status, detail });
    throw new SupabaseCmsError(detail || `Supabase storage request failed with ${response.status}`, response.status);
  }

  if (response.status === 204) return undefined as T;

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return (await response.json()) as T;
  }

  return (await response.arrayBuffer()) as T;
}

function normalizeSampleReports(rows: Partial<SampleReport>[] = []) {
  const rowMap = new Map(rows.map((row) => [row.slug, row]));

  return defaultSampleReports.map((fallback) => {
    const row = rowMap.get(fallback.slug);
    return {
      ...fallback,
      ...row,
      slug: fallback.slug,
      title: row?.title || fallback.title,
      subtitle: row?.subtitle || fallback.subtitle,
      page_count: row?.page_count || fallback.page_count,
      pdf_path: row?.pdf_path || '',
      is_active: row?.is_active ?? fallback.is_active,
    };
  });
}

export function loadSampleReportsSync(): SampleReport[] {
  if (typeof window === 'undefined') return defaultSampleReports;

  try {
    const stored = window.localStorage.getItem(SAMPLE_REPORTS_STORAGE_KEY);
    if (!stored) return defaultSampleReports;
    return normalizeSampleReports(JSON.parse(stored) as Partial<SampleReport>[]);
  } catch {
    return defaultSampleReports;
  }
}

export async function loadSampleReports(): Promise<SampleReport[]> {
  const fallback = loadSampleReportsSync();

  try {
    const rows = await supabaseRequest<SampleReport[]>(
      'sample_reports?select=id,slug,title,subtitle,page_count,pdf_path,is_active,updated_at',
    );
    const reports = normalizeSampleReports(rows);
    window.localStorage.setItem(SAMPLE_REPORTS_STORAGE_KEY, JSON.stringify(reports));
    return reports;
  } catch (error) {
    cmsWarn('Using local sample reports because Supabase load failed.', error);
    return fallback;
  }
}

export async function saveSampleReport(report: SampleReport) {
  const sessionToken = getAdminSessionToken();

  const savedRows = await supabaseRpc<SampleReport[]>('save_sample_report', {
    p_session_token: sessionToken,
    p_slug: report.slug,
    p_title: report.title,
    p_subtitle: report.subtitle,
    p_page_count: report.page_count,
    p_pdf_path: report.pdf_path,
    p_is_active: report.is_active,
  });

  const saved = savedRows[0] ?? report;
  const nextReports = normalizeSampleReports(
    loadSampleReportsSync().map((item) => (item.slug === saved.slug ? saved : item)),
  );
  window.localStorage.setItem(SAMPLE_REPORTS_STORAGE_KEY, JSON.stringify(nextReports));
  window.dispatchEvent(new CustomEvent(SAMPLE_REPORTS_UPDATED_EVENT, { detail: nextReports }));

  return saved;
}

function objectPathFromPdfPath(pdfPath: string) {
  return pdfPath.replace(/^sample-reports\//, '').replace(/^\/+/, '');
}

export function buildSampleReportPdfPath(slug: SampleReportSlug) {
  return `${SAMPLE_REPORT_BUCKET}/${slug}.pdf`;
}

export async function uploadSampleReportPdf(
  slug: SampleReportSlug,
  file: File,
  onProgress?: (progress: number) => void,
) {
  if (!hasSupabaseConfig()) {
    throw new Error('Supabase URL or publishable key is missing.');
  }

  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    throw new Error('Only PDF files can be uploaded.');
  }

  const sessionToken = getAdminSessionToken();
  const objectPath = `${slug}.pdf`;
  cmsLog('Sample report PDF upload starting', {
    bucket: SAMPLE_REPORT_BUCKET,
    objectPath,
    size: file.size,
    sessionToken: redactSessionToken(sessionToken),
  });

  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${SUPABASE_URL}/storage/v1/object/${SAMPLE_REPORT_BUCKET}/${objectPath}`);
    xhr.setRequestHeader('apikey', SUPABASE_KEY);
    xhr.setRequestHeader('Authorization', `Bearer ${SUPABASE_KEY}`);
    xhr.setRequestHeader('x-admin-session-token', sessionToken);
    xhr.setRequestHeader('Content-Type', 'application/pdf');
    xhr.setRequestHeader('x-upsert', 'true');

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        cmsLog('Sample report PDF upload complete', { bucket: SAMPLE_REPORT_BUCKET, objectPath });
        onProgress?.(100);
        resolve();
        return;
      }
      cmsError('Sample report PDF upload rejected', { status: xhr.status, response: xhr.responseText });
      reject(new SupabaseCmsError(xhr.responseText || `Upload failed with ${xhr.status}`, xhr.status));
    };

    xhr.onerror = () => {
      cmsError('Sample report PDF upload network failure', { bucket: SAMPLE_REPORT_BUCKET, objectPath });
      reject(new Error('Unable to upload PDF to Supabase Storage.'));
    };
    xhr.send(file);
  });

  return buildSampleReportPdfPath(slug);
}

function fileExtension(file: File) {
  const nameExtension = file.name.split('.').pop()?.toLowerCase();
  if (nameExtension) return nameExtension === 'jpg' ? 'jpeg' : nameExtension;
  if (file.type === 'image/jpeg') return 'jpeg';
  if (file.type === 'image/png') return 'png';
  if (file.type === 'image/webp') return 'webp';
  if (file.type === 'image/gif') return 'gif';
  return '';
}

function validateInsightImage(file: File) {
  const extension = fileExtension(file);
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const allowedExtensions = ['jpeg', 'jpg', 'png', 'webp', 'gif'];

  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Image is too large. Maximum upload size is 5MB.');
  }

  if (file.type && !allowedTypes.includes(file.type)) {
    throw new Error('Only JPG, PNG, WebP, or GIF images can be uploaded.');
  }

  if (!allowedExtensions.includes(extension)) {
    throw new Error('Only JPG, PNG, WebP, or GIF images can be uploaded.');
  }

  return extension === 'jpeg' ? 'jpg' : extension;
}

export async function uploadInsightMediaFile(file: File, folder = 'blogs', onProgress?: (progress: number) => void) {
  if (!hasSupabaseConfig()) {
    throw new Error('Supabase URL or publishable key is missing.');
  }

  const sessionToken = getAdminSessionToken();
  const extension = validateInsightImage(file);
  const safeName = slugify(file.name.replace(/\.[^.]+$/, ''), 'image');
  const objectPath = `${slugify(folder, 'uploads')}/${Date.now()}-${crypto.randomUUID()}-${safeName}.${extension}`;
  const contentType = file.type || (extension === 'jpg' ? 'image/jpeg' : `image/${extension}`);

  cmsLog('Storage upload starting', {
    bucket: INSIGHTS_MEDIA_BUCKET,
    objectPath,
    contentType,
    size: file.size,
    sessionToken: redactSessionToken(sessionToken),
  });

  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${SUPABASE_URL}/storage/v1/object/${INSIGHTS_MEDIA_BUCKET}/${objectPath}`);
    xhr.setRequestHeader('apikey', SUPABASE_KEY);
    xhr.setRequestHeader('Authorization', `Bearer ${SUPABASE_KEY}`);
    xhr.setRequestHeader('x-admin-session-token', sessionToken);
    xhr.setRequestHeader('Content-Type', contentType);
    xhr.setRequestHeader('x-upsert', 'true');

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        cmsLog('Storage upload complete', { bucket: INSIGHTS_MEDIA_BUCKET, objectPath, response: xhr.responseText });
        onProgress?.(100);
        resolve();
        return;
      }

      cmsError('Storage upload rejected', {
        bucket: INSIGHTS_MEDIA_BUCKET,
        objectPath,
        status: xhr.status,
        response: xhr.responseText,
      });
      reject(new SupabaseCmsError(xhr.responseText || `Upload failed with ${xhr.status}`, xhr.status));
    };

    xhr.onerror = () => {
      cmsError('Storage upload network failure', { bucket: INSIGHTS_MEDIA_BUCKET, objectPath });
      reject(new Error('Unable to upload image to Supabase Storage.'));
    };

    xhr.send(file);
  });

  const url = publicStorageUrl(INSIGHTS_MEDIA_BUCKET, objectPath);
  cmsLog('Storage public URL generated', { url });
  return url;
}

export async function removeSampleReportPdf(pdfPath: string) {
  const objectPath = objectPathFromPdfPath(pdfPath);
  if (!objectPath) return;
  const sessionToken = getAdminSessionToken();

  await supabaseStorageRequest(`object/${SAMPLE_REPORT_BUCKET}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-session-token': sessionToken,
    },
    body: JSON.stringify({ prefixes: [objectPath] }),
  });
}

export async function fetchSampleReportPdfBytes(report: SampleReport) {
  if (!report.pdf_path) {
    throw new Error('No PDF has been uploaded for this sample report.');
  }

  if (report.pdf_path.startsWith('data:application/pdf')) {
    const response = await fetch(report.pdf_path);
    return new Uint8Array(await response.arrayBuffer());
  }

  if (/^https?:\/\//i.test(report.pdf_path)) {
    const response = await fetch(report.pdf_path, { cache: 'no-store' });
    if (!response.ok) throw new Error('Unable to load sample report PDF.');
    return new Uint8Array(await response.arrayBuffer());
  }

  const objectPath = objectPathFromPdfPath(report.pdf_path);
  const buffer = await supabaseStorageRequest<ArrayBuffer>(`object/${SAMPLE_REPORT_BUCKET}/${objectPath}`);
  return new Uint8Array(buffer);
}

function insightRowToCms(row: InsightRow | null | undefined, fallback: CmsInsights): CmsInsights {
  if (!row) return fallback;

  return {
    ...fallback,
    id: row.id,
    slug: row.slug,
    heroTitle: row.title || fallback.heroTitle,
    heroDescription: row.description || fallback.heroDescription,
    content: row.content,
    image: row.image_url,
    thumbnail: row.thumbnail_url,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    isPublished: row.is_published,
    publishedAt: row.published_at ?? undefined,
  };
}

function blogRowToCms(row: BlogPostRow): CmsInsightBlog {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || '',
    content: row.content || '',
    date: row.display_date || formatPublishedDate(row.created_at || row.published_at),
    category: row.category || '',
    image: row.image_url || row.thumbnail_url || '/CareerDishaLogo.png',
    link: '',
    seoTitle: row.seo_title || '',
    seoDescription: row.seo_description || '',
    isPublished: row.is_published ?? true,
    publishedAt: row.published_at ?? undefined,
  };
}

function videoRowToCms(row: YoutubeVideoRow): CmsInsightVideo {
  return {
    id: row.slug || row.id,
    slug: row.slug,
    youtubeId: row.youtube_id,
    title: row.title,
    description: row.description,
    thumbnail: row.thumbnail_url,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    isPublished: row.is_published,
    publishedAt: row.published_at ?? undefined,
  };
}

function insightsRpcResponseToCms(response: InsightsCmsRpcResponse | null | undefined, fallback: CmsInsights) {
  if (!response) return fallback;
  const page = insightRowToCms(response.insight, fallback);

  return {
    ...page,
    blogs: Array.isArray(response.blogs) ? response.blogs.map(blogRowToCms) : fallback.blogs,
    videos: Array.isArray(response.videos) ? response.videos.map(videoRowToCms) : fallback.videos,
  };
}

function buildInsightsPayload(insights: CmsInsights): InsightsCmsPayload {
  const blogSlugCounts = new Map<string, number>();

  return {
    insight: {
      id: isUuid(insights.id) ? insights.id : null,
      slug: insights.slug || INSIGHTS_PAGE_SLUG,
      title: insights.heroTitle,
      description: insights.heroDescription,
      content: insights.content || '',
      image_url: insights.image || '',
      thumbnail_url: insights.thumbnail || '',
      is_published: insights.isPublished ?? true,
      published_at: safePublishedAt(insights.publishedAt),
      seo_title: insights.seoTitle || '',
      seo_description: insights.seoDescription || '',
      sort_order: 0,
    },
    blogs: insights.blogs.map((blog, index) => {
      const baseSlug = slugify(blog.title, `blog-${index + 1}`);
      const nextCount = (blogSlugCounts.get(baseSlug) ?? 0) + 1;
      blogSlugCounts.set(baseSlug, nextCount);
      const slug = nextCount === 1 ? baseSlug : `${baseSlug}-${nextCount}`;
      return {
        id: isUuid(blog.id) ? blog.id : null,
        slug,
        title: blog.title,
        excerpt: '',
        content: blog.content || '',
        category: '',
        display_date: '',
        read_more_url: '',
        image_url: blog.image,
        thumbnail_url: blog.image,
        is_published: blog.isPublished ?? true,
        published_at: safePublishedAt(blog.publishedAt) || new Date().toISOString(),
        seo_title: blog.seoTitle || '',
        seo_description: blog.seoDescription || '',
        sort_order: index,
      };
    }),
    videos: insights.videos.map((video, index) => {
      const slug = slugify(video.slug || video.id || video.title || video.youtubeId, `video-${index + 1}`);
      return {
        id: isUuid(video.id) ? video.id : null,
        slug,
        youtube_id: video.youtubeId.trim(),
        title: video.title,
        description: video.description || '',
        thumbnail_url: video.thumbnail || '',
        is_published: video.isPublished ?? true,
        published_at: safePublishedAt(video.publishedAt),
        seo_title: video.seoTitle || '',
        seo_description: video.seoDescription || '',
        sort_order: index,
      };
    }),
  };
}

async function loadPublishedInsightsFromSupabase(fallback: CmsInsights) {
  const [insightRows, blogRows, videoRows] = await Promise.all([
    supabaseRequest<InsightRow[]>(
      `insights?slug=eq.${INSIGHTS_PAGE_SLUG}&is_published=eq.true&select=id,slug,title,description,content,image_url,thumbnail_url,is_published,published_at,seo_title,seo_description,sort_order,updated_at&limit=1`,
    ),
    supabaseRequest<BlogPostRow[]>(
      'blog_posts?select=id,slug,title,content,image_url,created_at&order=created_at.desc',
    ),
    supabaseRequest<YoutubeVideoRow[]>(
      'youtube_videos?is_published=eq.true&select=id,slug,youtube_id,title,description,thumbnail_url,is_published,published_at,seo_title,seo_description,sort_order,updated_at&order=sort_order.asc',
    ),
  ]);

  if (!insightRows[0] && blogRows.length === 0 && videoRows.length === 0) {
    return fallback;
  }

  return insightsRpcResponseToCms(
    {
      insight: insightRows[0] ?? null,
      blogs: blogRows,
      videos: videoRows,
    },
    fallback,
  );
}

async function saveInsightsCms(insights: CmsInsights, sessionToken: string) {
  const payload = buildInsightsPayload(insights);
  cmsLog('saving insights payload', { payload, sessionToken: redactSessionToken(sessionToken) });

  const rows = await supabaseRpc<{ data: InsightsCmsRpcResponse }[]>('save_insights_cms', {
    p_session_token: sessionToken,
    p_payload: payload,
  });

  const saved = insightsRpcResponseToCms(rows[0]?.data, insights);
  cmsLog('saved insights content', saved);
  return saved;
}

function mergeCmsData(parsed: Partial<CmsData>): CmsData {
  const hasInsightsBlogs = Array.isArray(parsed.insights?.blogs);
  const hasInsightsVideos = Array.isArray(parsed.insights?.videos);
  const hasTestimonials = Array.isArray(parsed.testimonials);
  const hasCounsellors = Array.isArray(parsed.counsellors);
  const hasPartnerServices = Array.isArray(parsed.partner?.services);
  const hasPartnerPaths = Array.isArray(parsed.partner?.paths);
  const hasPartnerWhy = Array.isArray(parsed.partner?.whyPartner);

  return {
    ...defaultCmsData,
    ...parsed,
    brochure: { ...defaultCmsData.brochure, ...parsed.brochure },
    offer: { ...defaultCmsData.offer, ...parsed.offer },
    expertAdvice: { ...defaultCmsData.expertAdvice, ...parsed.expertAdvice },
    contact: {
      ...defaultCmsData.contact,
      ...parsed.contact,
      socials: { ...defaultCmsData.contact.socials, ...parsed.contact?.socials },
    },
    footer: { ...defaultCmsData.footer, ...parsed.footer },
    insights: {
      ...defaultCmsData.insights,
      ...parsed.insights,
      blogs: hasInsightsBlogs ? parsed.insights!.blogs! : defaultCmsData.insights.blogs,
      videos: hasInsightsVideos ? parsed.insights!.videos! : defaultCmsData.insights.videos,
    },
    testimonials: hasTestimonials ? parsed.testimonials! : defaultCmsData.testimonials,
    counsellors: hasCounsellors ? parsed.counsellors! : defaultCmsData.counsellors,
    partner: {
      ...defaultCmsData.partner,
      ...parsed.partner,
      hero: { ...defaultCmsData.partner.hero, ...parsed.partner?.hero },
      cta: { ...defaultCmsData.partner.cta, ...parsed.partner?.cta },
      services: hasPartnerServices ? parsed.partner!.services! : defaultCmsData.partner.services,
      paths: hasPartnerPaths ? parsed.partner!.paths! : defaultCmsData.partner.paths,
      whyPartner: hasPartnerWhy ? parsed.partner!.whyPartner! : defaultCmsData.partner.whyPartner,
    },
  };
}

export function loadCmsDataSync(): CmsData {
  if (typeof window === 'undefined') return defaultCmsData;

  try {
    const stored = window.localStorage.getItem(CMS_STORAGE_KEY);
    if (!stored) return defaultCmsData;
    const parsed = JSON.parse(stored) as Partial<CmsData>;
    return mergeCmsData(parsed);
  } catch {
    return defaultCmsData;
  }
}

export async function loadCmsData(): Promise<CmsData> {
  const fallback = loadCmsDataSync();

  try {
    const rows = await supabaseRequest<{ data: Partial<CmsData> }[]>(
      `cms_settings?id=eq.${CMS_ROW_ID}&select=data&limit=1`,
    );
    const remoteData = rows[0]?.data;
    const cmsBase = remoteData ? mergeCmsData(remoteData) : fallback;
    const publishedInsights = await loadPublishedInsightsFromSupabase(cmsBase.insights).catch((error) => {
      cmsWarn('Using CMS JSON insights because dedicated Insights tables could not be loaded.', error);
      return cmsBase.insights;
    });

    const merged = mergeCmsData({ ...cmsBase, insights: publishedInsights });
    persistCmsData(merged);
    return merged;
  } catch (error) {
    cmsWarn('Using local CMS data because Supabase CMS load failed.', error);
    return fallback;
  }
}

export async function saveCmsData(data: CmsData) {
  const sessionToken = getAdminSessionToken();

  try {
    const savedInsights = await saveInsightsCms(data.insights, sessionToken);
    const dataToPersist = mergeCmsData({ ...data, insights: savedInsights });

    await supabaseRpc('save_cms_settings', {
      p_session_token: sessionToken,
      p_data: dataToPersist,
    });

    persistCmsData(dataToPersist);
    return dataToPersist;
  } catch (error) {
    cmsError('Supabase CMS save failed. Local cache was not updated.', {
      error,
      sessionToken: redactSessionToken(sessionToken),
    });
    throw error;
  }
}

export async function saveExpertAdviceInquiry(inquiry: ExpertAdviceInquiry) {
  return supabaseRequest<ExpertAdviceInquiry[]>('expert_advice_inquiries', {
    method: 'POST',
    headers: {
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(inquiry),
  });
}

export async function loadExpertAdviceInquiries() {
  const sessionToken = window.sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
  if (!sessionToken) return [];

  try {
    return await supabaseRpc<ExpertAdviceInquiry[]>('list_expert_advice_inquiries', {
      p_session_token: sessionToken,
    });
  } catch (error) {
    cmsWarn('Supabase inquiry load failed.', error);
    return [];
  }
}

export async function deleteExpertAdviceInquiry(inquiryId: string) {
  const sessionToken = getAdminSessionToken();

  await supabaseRpc('delete_expert_advice_inquiry', {
    p_session_token: sessionToken,
    p_inquiry_id: inquiryId,
  });
}

export async function deleteAllExpertAdviceInquiries() {
  const sessionToken = getAdminSessionToken();

  await supabaseRpc('delete_all_expert_advice_inquiries', {
    p_session_token: sessionToken,
  });
}

// ─── Partner Inquiries ───────────────────────────────────────

export async function savePartnerInquiry(inquiry: PartnerInquiry) {
  return supabaseRequest<PartnerInquiry[]>('partner_inquiries', {
    method: 'POST',
    headers: {
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(inquiry),
  });
}

export async function loadPartnerInquiries() {
  const sessionToken = window.sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
  if (!sessionToken) return [];

  try {
    return await supabaseRpc<PartnerInquiry[]>('list_partner_inquiries', {
      p_session_token: sessionToken,
    });
  } catch (error) {
    cmsWarn('Supabase partner inquiry load failed.', error);
    return [];
  }
}

export async function deletePartnerInquiry(inquiryId: string) {
  const sessionToken = getAdminSessionToken();

  await supabaseRpc('delete_partner_inquiry', {
    p_session_token: sessionToken,
    p_inquiry_id: inquiryId,
  });
}

export async function deleteAllPartnerInquiries() {
  const sessionToken = getAdminSessionToken();

  await supabaseRpc('delete_all_partner_inquiries', {
    p_session_token: sessionToken,
  });
}

export async function loginAdmin(username: string, password: string) {
  const rows = await supabaseRpc<AdminSession[]>('verify_admin_login', {
    p_username: username,
    p_password: password,
  });
  return rows[0] ?? null;
}

export async function verifyAdminSession(sessionToken: string) {
  const rows = await supabaseRpc<{ is_valid: boolean; username: string; expires_at: string }[]>(
    'verify_admin_session',
    {
      p_session_token: sessionToken,
    },
  );
  return rows[0] ?? null;
}

export async function logoutAdmin(sessionToken: string) {
  await supabaseRpc('revoke_admin_session', {
    p_session_token: sessionToken,
  });
}

export async function checkSupabaseConnection(): Promise<SupabaseConnectionStatus> {
  if (!hasSupabaseConfig()) {
    return {
      frontend: false,
      backend: false,
      message: 'Supabase env missing',
    };
  }

  try {
    await Promise.all([
      supabaseRequest('cms_settings?select=id&limit=1'),
      supabaseRequest('insights?select=id&limit=1'),
      supabaseRequest('blog_posts?select=id&limit=1'),
      supabaseRequest('youtube_videos?select=id&limit=1'),
      supabaseRpc('verify_admin_login', {
        p_username: '__health_check__',
        p_password: '__health_check__',
      }),
    ]);

    return {
      frontend: true,
      backend: true,
      message: 'Supabase connected',
    };
  } catch (error) {
    if (error instanceof SupabaseCmsError && error.status === 404 && error.message.includes('PGRST202')) {
      return {
        frontend: true,
        backend: false,
        message: 'Admin RPC missing',
      };
    }

    if (error instanceof SupabaseCmsError && error.status === 404) {
      return {
        frontend: true,
        backend: false,
        message: 'Tables missing',
      };
    }

    return {
      frontend: true,
      backend: false,
      message: 'Backend unavailable',
    };
  }
}

export async function saveBrochureInquiry(inquiry: BrochureInquiry) {
  return supabaseRequest<BrochureInquiry[]>('brochure_inquiries', {
    method: 'POST',
    headers: {
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(inquiry),
  });
}

export async function loadBrochureInquiries() {
  const sessionToken = window.sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
  if (!sessionToken) return [];

  try {
    return await supabaseRpc<BrochureInquiry[]>('list_brochure_inquiries', {
      p_session_token: sessionToken,
    });
  } catch (error) {
    cmsWarn('Supabase brochure inquiry load failed.', error);
    return [];
  }
}

export async function deleteBrochureInquiry(inquiryId: string) {
  const sessionToken = getAdminSessionToken();

  await supabaseRpc('delete_brochure_inquiry', {
    p_session_token: sessionToken,
    p_inquiry_id: inquiryId,
  });
}

export async function deleteAllBrochureInquiries() {
  const sessionToken = getAdminSessionToken();

  await supabaseRpc('delete_all_brochure_inquiries', {
    p_session_token: sessionToken,
  });
}
