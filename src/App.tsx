/**
 * App.tsx — Application shell and router.
 *
 * - `App` handles CMS data loading, splash screen, and admin route detection.
 * - `MainApp` manages view-based routing and composes the landing page from
 *   modular section components located in `components/landing/`.
 */
import { lazy, Suspense, useState, useEffect } from 'react';
import About from './components/About';
import Admin from './components/Admin';
import Insights from './components/Insights';
import SplashScreen from './components/SplashScreen';
import ContactUs from './components/ContactUs';
import ServicePage from './components/ServicePage';
import PartnerPage from './components/PartnerPage';
import InquiryModal from './components/InquiryModal';
import FollowCursor from './components/FollowCursor';
import ComparisonSection from './components/ComparisonSection';
import BrochurePage from './components/BrochurePage';
import TermsPage from './components/TermsPage';
import PrivacyPage from './components/PrivacyPage';
import RefundPage from './components/RefundPage';

// Landing page sections
import Header from './components/landing/Header';
import HeroSection from './components/landing/HeroSection';
import HowItWorks from './components/landing/HowItWorks';
import BrandRibbons from './components/landing/BrandRibbons';
import OfferSection from './components/landing/OfferSection';
import TailoredGuidance from './components/landing/TailoredGuidance';
import Methodology from './components/landing/Methodology';
import WhyCareerDisha from './components/landing/WhyCareerDisha';
import Testimonials from './components/landing/Testimonials';
import FinalCTA from './components/landing/FinalCTA';
import Visionaries from './components/landing/Visionaries';
import Counsellors from './components/landing/Counsellors';
import LandingFooter from './components/landing/LandingFooter';
import WhatsAppFAB from './components/shared/WhatsAppFAB';
import SampleReportsFAB from './components/shared/SampleReportsFAB';

import {
  CMS_STORAGE_KEY,
  CMS_UPDATED_EVENT,
  CmsData,
  SAMPLE_REPORTS_STORAGE_KEY,
  SAMPLE_REPORTS_UPDATED_EVENT,
  SampleReport,
  loadCmsData,
  loadCmsDataSync,
  loadSampleReports,
  loadSampleReportsSync,
} from './data/cms';
import { highSchoolData, plusTwoData, graduatesData, workingProfessionalData } from './data/servicePageData';

const SampleReportPage = lazy(() => import('./components/SampleReportPage'));

type ViewType = 'landing' | 'about' | 'insights' | 'blog' | 'contact-us' | 'partner' | 'brochure' | 'high-school' | 'plus-two' | 'graduates' | 'working-professional' | 'terms' | 'privacy' | 'refund' | 'sample-report';

const validViews: ViewType[] = ['landing', 'about', 'insights', 'blog', 'contact-us', 'partner', 'brochure', 'high-school', 'plus-two', 'graduates', 'working-professional', 'terms', 'privacy', 'refund', 'sample-report'];

function readRoute(): { view: ViewType; sampleReportSlug?: string; blogSlug?: string } {
  const normalizedPath = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  const [firstSegment, secondSegment] = normalizedPath.split('/');

  if (firstSegment === 'sample-report' && secondSegment) {
    return { view: 'sample-report', sampleReportSlug: secondSegment };
  }

  if (firstSegment === 'insights' && secondSegment) {
    return { view: 'blog', blogSlug: secondSegment };
  }

  return {
    view: validViews.includes(normalizedPath as ViewType) ? (normalizedPath as ViewType) : 'landing',
  };
}

function MainApp({ cmsData, sampleReports }: { cmsData: CmsData; sampleReports: SampleReport[] }) {
  const [route, setRoute] = useState(() => readRoute());
  const view = route.view;

  const setView = (newView: ViewType) => {
    if (newView === 'sample-report' || newView === 'blog') return;
    const newPath = newView === 'landing' ? '/' : `/${newView}`;
    window.history.pushState({}, '', newPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const setBlogView = (slug?: string) => {
    const newPath = slug ? `/insights/${slug}` : '/insights';
    window.history.pushState({}, '', newPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  useEffect(() => {
    const handlePopState = () => {
      setRoute(readRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  // ─── Non-landing views ────────────────────────────────────
  if (view === 'about') return <About onBack={() => setView('landing')} counsellors={cmsData.counsellors || []} />;
  if (view === 'insights') return <Insights onBack={() => setView('landing')} insights={cmsData.insights} onBlogSelect={setBlogView} />;
  if (view === 'blog') return <Insights onBack={() => setView('landing')} insights={cmsData.insights} blogSlug={route.blogSlug} onBlogSelect={setBlogView} />;
  if (view === 'contact-us') return <ContactUs onBack={() => setView('landing')} contact={cmsData.contact} />;
  if (view === 'partner') return <PartnerPage onBack={() => setView('landing')} data={cmsData.partner} />;
    if (view === 'brochure') return <BrochurePage onBack={() => setView('landing')} brochure={cmsData.brochure} />;
  if (view === 'high-school') return <ServicePage data={highSchoolData} onBack={() => setView('landing')} />;
  if (view === 'plus-two') return <ServicePage data={plusTwoData} onBack={() => setView('landing')} />;
  if (view === 'graduates') return <ServicePage data={graduatesData} onBack={() => setView('landing')} />;
  if (view === 'working-professional') return <ServicePage data={workingProfessionalData} onBack={() => setView('landing')} />;
  if (view === 'terms') return <TermsPage onBack={() => setView('landing')} />;
  if (view === 'privacy') return <PrivacyPage onBack={() => setView('landing')} />;
  if (view === 'refund') return <RefundPage onBack={() => setView('landing')} />;
  if (view === 'sample-report') {
    const report = sampleReports.find((item) => item.slug === route.sampleReportSlug);
    return (
      <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
        <SampleReportPage report={report} onBack={() => setView('landing')} />
      </Suspense>
    );
  }

  // ─── Landing page ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-surface selection:bg-primary-fixed">
      <FollowCursor color="#fba70c" zIndex={9999} />
      <Header
        setView={setView}
        setShowInquiryModal={setShowInquiryModal}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileProgramsOpen={mobileProgramsOpen}
        setMobileProgramsOpen={setMobileProgramsOpen}
      />

      <main className="pt-20 md:pt-24">
        <HeroSection />
        <HowItWorks />
        <BrandRibbons />
        <OfferSection offer={cmsData.offer} onCTAClick={() => setShowInquiryModal(true)} />
        <TailoredGuidance />
        <Methodology />
        <WhyCareerDisha />
        <Testimonials testimonials={cmsData.testimonials} />
        <ComparisonSection />
        <FinalCTA />
        <Visionaries />
        <Counsellors counsellors={cmsData.counsellors || []} />
      </main>

      <LandingFooter setView={setView} contact={cmsData.contact} />
      <SampleReportsFAB reports={sampleReports} />
      <WhatsAppFAB />

      {showInquiryModal && (
        <InquiryModal
          onClose={() => setShowInquiryModal(false)}
          heading={cmsData.expertAdvice.heading}
          services={cmsData.expertAdvice.services}
          successMessage={cmsData.expertAdvice.successMessage}
        />
      )}
    </div>
  );
}

export default function App() {
  const [cmsData, setCmsData] = useState<CmsData>(() => loadCmsDataSync());
  const [sampleReports, setSampleReports] = useState<SampleReport[]>(() => loadSampleReportsSync());
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [showSplash, setShowSplash] = useState(() => localStorage.getItem('seenSplash') !== 'true');

  useEffect(() => {
    loadCmsData().then(setCmsData);
    loadSampleReports().then(setSampleReports);
  }, []);

  useEffect(() => {
    const syncCmsFromStorage = () => {
      setCmsData(loadCmsDataSync());
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key === CMS_STORAGE_KEY) {
        syncCmsFromStorage();
      }
    };

    window.addEventListener(CMS_UPDATED_EVENT, syncCmsFromStorage);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(CMS_UPDATED_EVENT, syncCmsFromStorage);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  useEffect(() => {
    const syncSampleReportsFromStorage = () => {
      setSampleReports(loadSampleReportsSync());
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key === SAMPLE_REPORTS_STORAGE_KEY) {
        syncSampleReportsFromStorage();
      }
    };

    window.addEventListener(SAMPLE_REPORTS_UPDATED_EVENT, syncSampleReportsFromStorage);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(SAMPLE_REPORTS_UPDATED_EVENT, syncSampleReportsFromStorage);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  useEffect(() => {
    const onRouteChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', onRouteChange);
    return () => window.removeEventListener('popstate', onRouteChange);
  }, []);

  const isAdminRoute = pathname === '/admin' || pathname === '/admin/';

  if (isAdminRoute) {
    return <Admin data={cmsData} onDataChange={setCmsData} sampleReports={sampleReports} onSampleReportsChange={setSampleReports} />;
  }

  if (!showSplash) return <MainApp cmsData={cmsData} sampleReports={sampleReports} />;

  return (
    <>
      <SplashScreen onFinish={() => {
        localStorage.setItem('seenSplash', 'true');
        setShowSplash(false);
      }} />
      <MainApp cmsData={cmsData} sampleReports={sampleReports} />
    </>
  );
}
