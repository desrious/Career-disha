// ─── App-wide Constants ───────────────────────────────────────
// Centralized values used across the entire application.
// When the backend is integrated, API endpoints and dynamic config
// will supplement these, but branding/contact info stays here.

export const APP_NAME = 'Careerदिशा';
export const APP_NAME_EN = 'Career Disha';
export const APP_TAGLINE = 'Confusion Se Clarity Tak';
export const COMPANY_NAME = 'ZeOpto';
export const COPYRIGHT_YEAR = new Date().getFullYear();
export const COPYRIGHT_TEXT = `© ${COPYRIGHT_YEAR} ${APP_NAME} — Powered by ${COMPANY_NAME}`;

export const LOGO_URL = '/CareerDishaLogo.png';

// ─── Contact Info ─────────────────────────────────────────────
export const CONTACT = {
  phone: ['+91-9289191164', '+91-9289191165'],
  email: 'hr@ZeOpto.com',
  website: 'https://ZeOpto.com',
  address:
    'Offices B-02, A-28, Near Noida Sector 16 Metro Station, Block A, Sector 4, Noida, UP-201301',
} as const;

// ─── Social Links ─────────────────────────────────────────────
export const SOCIALS = {
  facebook: 'https://www.facebook.com/ZeOptoitservices',
  instagram:
    'https://www.instagram.com/ZeOptoitservices/?igsh=MTBkYThwNG8wY2F5ZA%3D%3D#',
  linkedin:
    'https://www.linkedin.com/company/ZeOpto-it-services/?viewAsMember=true',
  whatsapp:
    'https://www.whatsapp.com/channel/0029Vb5aVHkDzgT8eqtO4p3n',
  youtube: 'https://youtube.com/@ZeOpto?si=k0Oijwu3wG1AhtNR',
} as const;

// ─── Founder Profiles ─────────────────────────────────────────
export const FOUNDERS = {
  gunjan: {
    name: 'Mr. Gunjan Tewari',
    title: 'Founder & Director',
    image: '/GunjanSir.jpeg',
    linkedin: 'https://in.linkedin.com/in/gunjantewari',
    description:
      'With over two decades of extensive experience in the IT sector, he has dedicated the last 8 years to comprehensive IT and career counselling. He brings a strategic vision to the platform, mentoring students and professionals to navigate their career paths efficiently.',
    bullets: [
      'Founder & Director',
      'Certified AI Generalist',
      'IT Career Strategist & Mentor',
    ],
  },
  abhijit: {
    name: 'Mr. Abhijit Vyas',
    title: 'Co-founder & Director',
    image: '/AbhijeetSir.jpeg',
    linkedin: 'https://in.linkedin.com/in/abhijit-vyas-696640216',
    description:
      'With 18+ years of dedicated expertise in the IT sector and training, he has spent the last 8 years actively mentoring and counselling individuals. He ensures Careerदिशा\'s guidance remains firmly aligned with the dynamic, real-world needs of the industry.',
    bullets: [
      'Co-founder & Director',
      'Certified AI Generalist',
      'Technical Advisor & Mentor',
      'IT Project Manager',
    ],
  },
} as const;
