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
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  link: string;
};

export type CmsInsightVideo = {
  id: string;
  youtubeId: string;
  title: string;
};

export type CmsInsights = {
  heroTitle: string;
  heroDescription: string;
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
  countryCode?: string;
  dialCode?: string;
  countryName?: string;
  service: string;
  message?: string;
  created_at?: string;
};

export type PartnerInquiry = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  countryCode?: string;
  dialCode?: string;
  countryName?: string;
  interested_in: string;
  created_at?: string;
};

export type BrochureInquiry = {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  countryCode?: string;
  dialCode?: string;
  countryName?: string;
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
const CMS_ROW_ID = 'site';

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
        excerpt: 'Is Adopting a Career in SAP for Fresher Graduates a Viable Option? In toda...',
        date: '7-Sep-2025',
        category: 'Career Advice',
        image: 'https://www.zeopto.com/img/ChatGPT%20Image%20Sep%207,%202025,%2012_54_10%20PM.png',
        link: 'https://ZeOpto.com/blog-details.php?slug=is-adopting-career-in-sap-is-viable-option-',
      },
      {
        id: 'amrapali-workshop',
        title: 'ZeOpto Workshop at Amrapali University -...',
        excerpt: 'Learning is always special when it connects with real-world opportunities. Our recent SAP Worksho...',
        date: '30-Sep-2025',
        category: 'Workshop',
        image: 'https://www.zeopto.com/img/Amrapali%20Workshop.png',
        link: 'https://ZeOpto.com/blog-details.php?slug=ZeOpto-workshop-at-amrapali-university---a-journey-of-learning-growth',
      },
      {
        id: 'sap-fico-training',
        title: 'Best SAP FICO Training Institute | ZeOpt...',
        excerpt: 'SAP FICO Training. Choosing the right SAP FICO training institute in Noida can shape your ca...',
        date: '6-Nov-2025',
        category: 'Training',
        image: 'https://www.zeopto.com/img/SAP%20FICO%20Training%20(1).png',
        link: 'https://ZeOpto.com/blog-details.php?slug=best-sap-fico-training-institute-ZeOpto',
      },
      {
        id: 'sap-mm-training',
        title: 'Best SAP MM Training Institute in Noida ...',
        excerpt: 'SAP MM is one of the most important modules in the SAP system and is widely used in industries th...',
        date: '16-Nov-2025',
        category: 'Training',
        image: 'https://www.zeopto.com/img/SAP%20MM%20Training%20ZeOpto.png',
        link: 'https://ZeOpto.com/blog-details.php?slug=best-sap-mm-training-institute-in-noida-ZeOpto',
      },
      {
        id: 'sap-training-noida',
        title: 'Best SAP Training Institute in Noida | Z...',
        excerpt: 'Best SAP Training Institute in Noida. SAP is one of the most widely used business software...',
        date: '15-Dec-2025',
        category: 'Education',
        image: 'https://www.zeopto.com/img/Thumbnail%20.png',
        link: 'https://ZeOpto.com/blog-details.php?slug=best-sap-training-institute-in-noida-ZeOpto',
      },
      {
        id: 'graphic-era-workshop',
        title: 'ZeOpto Workshop at Graphic Era Universit...',
        excerpt: 'ZeOpto Workshop at Graphic Era University - Industry-Focused Learning Experience...',
        date: '5-Feb-2026',
        category: 'Workshop',
        image: 'https://www.zeopto.com/img/Untitled%20design%20(59).png',
        link: 'https://ZeOpto.com/blog-details.php?slug=ZeOpto-workshop-at-graphic-era-university-empowering-students-with-industry-ready-it-sap-skills',
      },
      {
        id: 'sap-classes-noida',
        title: 'SAP Classes in Noida...',
        excerpt: 'SAP Classes in Noida: Learn SAP with Practical Training at ZeOpto. Today, com...',
        date: '5-Feb-2026',
        category: 'Training',
        image: 'https://www.zeopto.com/img/Best%20SAP%20CLasses%20in%20Noida.png',
        link: 'https://ZeOpto.com/blog-details.php?slug=sap-classes-in-noida',
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

async function supabaseRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!hasSupabaseConfig()) {
    throw new Error('Supabase URL or publishable key is missing.');
  }

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
    throw new SupabaseCmsError(detail || `Supabase request failed with ${response.status}`, response.status);
  }

  if (response.status === 204) return undefined as T;

  const text = await response.text();
  if (!text) return undefined as T;
  return JSON.parse(text) as T;
}

async function supabaseRpc<T>(fn: string, body: Record<string, unknown>) {
  return supabaseRequest<T>(`rpc/${fn}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

async function supabaseStorageRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!hasSupabaseConfig()) {
    throw new Error('Supabase URL or publishable key is missing.');
  }

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
    console.warn('Using local sample reports because Supabase load failed.', error);
    return fallback;
  }
}

export async function saveSampleReport(report: SampleReport) {
  const sessionToken = window.sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
  if (!sessionToken) {
    throw new SupabaseCmsError('Admin session missing', 401);
  }

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

  const objectPath = `${slug}.pdf`;

  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${SUPABASE_URL}/storage/v1/object/${SAMPLE_REPORT_BUCKET}/${objectPath}`);
    xhr.setRequestHeader('apikey', SUPABASE_KEY);
    xhr.setRequestHeader('Authorization', `Bearer ${SUPABASE_KEY}`);
    xhr.setRequestHeader('Content-Type', 'application/pdf');
    xhr.setRequestHeader('x-upsert', 'true');

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress?.(100);
        resolve();
        return;
      }
      reject(new SupabaseCmsError(xhr.responseText || `Upload failed with ${xhr.status}`, xhr.status));
    };

    xhr.onerror = () => reject(new Error('Unable to upload PDF to Supabase Storage.'));
    xhr.send(file);
  });

  return buildSampleReportPdfPath(slug);
}

export async function removeSampleReportPdf(pdfPath: string) {
  const objectPath = objectPathFromPdfPath(pdfPath);
  if (!objectPath) return;

  await supabaseStorageRequest(`object/${SAMPLE_REPORT_BUCKET}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
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
    if (!remoteData) return fallback;

    const merged = mergeCmsData(remoteData);
    window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch (error) {
    console.warn('Using local CMS data because Supabase CMS load failed.', error);
    return fallback;
  }
}

export async function saveCmsData(data: CmsData) {
  const sessionToken = window.sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
  if (!sessionToken) {
    throw new SupabaseCmsError('Admin session missing', 401);
  }

  window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));

  try {
    await supabaseRpc('save_cms_settings', {
      p_session_token: sessionToken,
      p_data: data,
    });
    window.localStorage.setItem(CMS_UPDATED_AT_KEY, String(Date.now()));
    window.dispatchEvent(new CustomEvent(CMS_UPDATED_EVENT, { detail: data }));
  } catch (error) {
    console.warn('Saved CMS locally, but Supabase CMS save failed.', error);
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
    console.warn('Supabase inquiry load failed.', error);
    return [];
  }
}

export async function deleteExpertAdviceInquiry(inquiryId: string) {
  const sessionToken = window.sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
  if (!sessionToken) {
    throw new SupabaseCmsError('Admin session missing', 401);
  }

  await supabaseRpc('delete_expert_advice_inquiry', {
    p_session_token: sessionToken,
    p_inquiry_id: inquiryId,
  });
}

export async function deleteAllExpertAdviceInquiries() {
  const sessionToken = window.sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
  if (!sessionToken) {
    throw new SupabaseCmsError('Admin session missing', 401);
  }

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
    console.warn('Supabase partner inquiry load failed.', error);
    return [];
  }
}

export async function deletePartnerInquiry(inquiryId: string) {
  const sessionToken = window.sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
  if (!sessionToken) {
    throw new SupabaseCmsError('Admin session missing', 401);
  }

  await supabaseRpc('delete_partner_inquiry', {
    p_session_token: sessionToken,
    p_inquiry_id: inquiryId,
  });
}

export async function deleteAllPartnerInquiries() {
  const sessionToken = window.sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
  if (!sessionToken) {
    throw new SupabaseCmsError('Admin session missing', 401);
  }

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
    console.warn('Supabase brochure inquiry load failed.', error);
    return [];
  }
}

export async function deleteBrochureInquiry(inquiryId: string) {
  const sessionToken = window.sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
  if (!sessionToken) {
    throw new SupabaseCmsError('Admin session missing', 401);
  }

  await supabaseRpc('delete_brochure_inquiry', {
    p_session_token: sessionToken,
    p_inquiry_id: inquiryId,
  });
}

export async function deleteAllBrochureInquiries() {
  const sessionToken = window.sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
  if (!sessionToken) {
    throw new SupabaseCmsError('Admin session missing', 401);
  }

  await supabaseRpc('delete_all_brochure_inquiries', {
    p_session_token: sessionToken,
  });
}
