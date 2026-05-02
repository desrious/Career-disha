// ─── Service Page Data ────────────────────────────────────────
// Each object drives a single instance of the ServicePage template.
// When the backend arrives, these can come from a CMS or API.

import { Target, Map, UserCheck } from 'lucide-react';
import type { ComponentType } from 'react';

export interface ProblemCard {
  icon: ComponentType<{ className?: string }>;
  iconColor: string;
  bgColor: string;
  title: string;
  desc: string;
}

export interface OfferItem {
  title: string;
  desc: string;
}

export interface ServicePageData {
  badge: string;
  pageTitle: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  ctaText: string;
  problemHeading: string;
  problemSubtext: string;
  problems: ProblemCard[];
  offerHeading: string;
  offerSubtext: string;
  offers: OfferItem[];
  recommendLabel: string;
  recommendValue: string;
  benefitsHeading: string;
  bgConfused?: string;
  bgConfident?: string;
}

// ─── Shared problem cards (2 & 3 are identical across all) ───
const sharedProblems: ProblemCard[] = [
  {
    icon: Map,
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-50',
    title: 'Lack of Awareness',
    desc: 'Many emerging careers and contemporary pathways remain unknown, limiting students\' creative and professional potential.',
  },
  {
    icon: UserCheck,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-50',
    title: 'Peer & Parent Pressure',
    desc: 'Choosing what friends are doing or what parents suggest without aligning it with personal aptitude and interests is not a viable option.',
  },
];

// ─── High School (9th & 10th) ────────────────────────────────
export const highSchoolData: ServicePageData = {
  badge: 'Careerदिशा for High School',
  pageTitle: 'Career Counselling for High School (9th & 10th)',
  heroTitle: 'Explore ',
  heroHighlight: 'Career Options After 10th',
  heroDescription:
    'Confused about your career? Help students of class 9th and 10th understand their interests and explore the best career choices for students. Get expert stream selection guidance with confidence.',
  ctaText: 'Get Stream Selection Guidance',
  problemHeading: "Don't Know What Career To Choose?",
  problemSubtext:
    'Students at this stage often feel overwhelmed and confused. If you have no clarity in career path, this is the first step.',
  problems: [
    {
      icon: Target,
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50',
      title: 'Stream Selection Guidance',
      desc: "Which science commerce arts career options fit you best? It's a big decision that dictates future career paths, and guessing isn't a viable strategy.",
    },
    ...sharedProblems,
  ],
  offerHeading: 'How To Choose A Career',
  offerSubtext:
    'A structured, scientific approach to help students discover the best career choices for students as they navigate their first major academic crossroad.',
  offers: [
    { title: 'Pre-counselling sessions', desc: 'Initial consultation to understand your career aspirations and set expectations.' },
    { title: 'Career Discovery Assessment', desc: 'Identify innate traits and potential pathways.' },
    { title: 'Interest & Aptitude Analysis', desc: 'Understand what you truly enjoy and excel at.' },
    { title: 'Stream Selection Guidance', desc: 'Data-driven recommendations for 11th & 12th.' },
    { title: 'Personalized Career Report', desc: 'A comprehensive roadmap outlining optimal options.' },
  ],
  recommendLabel: 'Recommended Stream',
  recommendValue: 'Science (PCM)',
  benefitsHeading: 'Why Choose Careerदिशा Early?',
};

// ─── Plus Two (11th & 12th) ──────────────────────────────────
export const plusTwoData: ServicePageData = {
  badge: 'Careerदिशा for Plus Two (11th & 12th)',
  pageTitle: 'Career Counselling for Plus-two (11th & 12th)',
  heroTitle: 'Discover ',
  heroHighlight: 'Career Options After 12th',
  heroDescription:
    'Facing career confusion after 12th? Help students of class 11th and 12th find out what career is right for me, and explore the best career choices for students before college.',
  ctaText: 'Explore Best Career Choices For Students',
  problemHeading: 'Career Confusion After 12th?',
  problemSubtext:
    "Students at this stage often don't know what career to choose. Does this sound familiar? Let us help you eliminate the guesswork.",
  problems: [
    {
      icon: Target,
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50',
      title: 'Finding Your Ideal Pathway',
      desc: 'Which career options after 12th suit you? Choosing an Engineering, Medical, Commerce, or Humanities path takes structured planning.',
    },
    ...sharedProblems,
  ],
  offerHeading: 'What Careerदिशा Offers',
  offerSubtext:
    'A structured, scientific approach to help students navigate their first major academic crossroad.',
  offers: [
    { title: 'Pre-counselling sessions', desc: 'Initial consultation to understand your career aspirations and set expectations.' },
    { title: 'Career Discovery Assessment', desc: 'Identify innate traits and potential pathways.' },
    { title: 'Interest & Aptitude Analysis', desc: 'Understand what you truly enjoy and excel at.' },
    { title: 'College & Path Selection', desc: 'Data-driven recommendations for higher education.' },
    { title: 'Personalized Career Report', desc: 'A comprehensive roadmap outlining optimal options.' },
  ],
  recommendLabel: 'Recommended Courses',
  recommendValue: 'B.Tech / B.E. (CS)',
  benefitsHeading: 'Why Choose Careerदिशा Early?',
};

// ─── Graduates ───────────────────────────────────────────────
export const graduatesData: ServicePageData = {
  badge: 'Careerदिशा for Graduates',
  pageTitle: 'Career Counselling for Graduates',
  heroTitle: 'Discover Your ',
  heroHighlight: 'Career Development Plan',
  heroDescription:
    'Help graduating or recently graduated students gain clarity and build their career development plan. Stop feeling confused about career decisions and get proper job vs career guidance.',
  ctaText: 'Get Job Vs Career Guidance',
  problemHeading: 'The Graduates Dilemma',
  problemSubtext:
    'Students at this stage often feel overwhelmed and confused. Does this sound familiar?',
  problems: [
    {
      icon: Target,
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50',
      title: 'Choosing the Right Industry or Role',
      desc: "Job, Master's, or Business? Decoding your next major move post-graduation is critical for long-term momentum.",
    },
    ...sharedProblems,
  ],
  offerHeading: 'What Careerदिशा Offers',
  offerSubtext:
    'A structured, scientific approach to help students navigate their first major academic crossroad.',
  offers: [
    { title: 'Pre-counselling sessions', desc: 'Initial consultation to understand your career aspirations and set expectations.' },
    { title: 'Career Discovery Assessment', desc: 'Identify innate traits and potential pathways.' },
    { title: 'Interest & Aptitude Analysis', desc: 'Understand what you truly enjoy and excel at.' },
    { title: 'Stream Selection Guidance', desc: 'Data-driven recommendations for post-graduation opportunities.' },
    { title: 'Personalized Career Report', desc: 'A comprehensive roadmap outlining optimal options.' },
  ],
  recommendLabel: 'Career Path',
  recommendValue: 'Data Science & Analytics',
  benefitsHeading: 'Why Choose Careerदिशा Early?',
};

// ─── Working Professionals ───────────────────────────────────
export const workingProfessionalData: ServicePageData = {
  bgConfused: '/confused_professional.png',
  bgConfident: '/confident_professional.png',
  badge: 'Careerदिशा for Working Professionals',
  pageTitle: 'Career Counselling for Working Professionals',
  heroTitle: 'Discover Your ',
  heroHighlight: 'Path Early',
  heroDescription:
    'Help professionals align their career trajectory with their evolving interests, leverage existing skills for transitions, or ascend into leadership roles confidently.',
  ctaText: 'Start Your Career Discovery',
  problemHeading: 'The Working Professional Dilemma',
  problemSubtext:
    'Professionals at this stage often feel overwhelmed and confused. Does this sound familiar?',
  problems: [
    {
      icon: Target,
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50',
      title: 'Navigating Career Transitions',
      desc: 'Switching industries, upskilling, or seeking leadership paths? These are pivotal transitions needing clarity.',
    },
    ...sharedProblems,
  ],
  offerHeading: 'What Careerदिशा Offers',
  offerSubtext:
    'A structured, scientific approach to help professionals navigate their career transitions with data-driven precision.',
  offers: [
    { title: 'Pre-counselling sessions', desc: 'Initial consultation to understand your career aspirations and set expectations.' },
    { title: 'Career Discovery Assessment', desc: 'Identify innate traits and potential pathways.' },
    { title: 'Interest & Aptitude Analysis', desc: 'Understand what you truly enjoy and excel at.' },
    { title: 'Stream Selection Guidance', desc: 'Data-driven recommendations for advanced career moves.' },
    { title: 'Personalized Career Report', desc: 'A comprehensive roadmap outlining optimal options.' },
  ],
  recommendLabel: 'Next Role Strategy',
  recommendValue: 'Senior Product Manager',
  benefitsHeading: 'Why Choose Careerदिशा?',
};
