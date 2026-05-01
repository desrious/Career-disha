import { useState, useEffect } from 'react';
import {
  ArrowRight,
  HelpCircle,
  Brain,
  Route,
  School,
  Code,
  TrendingUp,
  Award,
  Bot,
  ShieldCheck,
  Star,
  ChevronLeft,
  ChevronRight,
  Send,
  Globe,
  Users,
  Share2,
  Phone,
  Mail,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import About from './components/About';
import Admin from './components/Admin';
import Insights from './components/Insights';
import SplashScreen from './components/SplashScreen';
import ContactUs from './components/ContactUs';
import ServicePage from './components/ServicePage';
import InquiryModal from './components/InquiryModal';
import FollowCursor from './components/FollowCursor';
import ComparisonSection from './components/ComparisonSection';
import ProfileCard from './components/ProfileCard';
import { CMS_STORAGE_KEY, CMS_UPDATED_EVENT, CmsData, loadCmsData, loadCmsDataSync } from './data/cms';
import { LOGO_URL, COPYRIGHT_TEXT, CONTACT, SOCIALS, FOUNDERS } from './data/constants';
import { highSchoolData, plusTwoData, graduatesData, workingProfessionalData } from './data/servicePageData';

type ViewType = 'landing' | 'about' | 'insights' | 'contact-us' | 'high-school' | 'plus-two' | 'graduates' | 'working-professional';

function MainApp({ cmsData }: { cmsData: CmsData }) {
  const [view, setView] = useState<ViewType>('landing');
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const heroImages = [
    "/landing_page_img1.png",
    "/landing_page_img2.png",
    "/landing_page_img3.png"
  ];
  const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0);
  const priyaImg = "https://randomuser.me/api/portraits/women/44.jpg";
  const rohanImg = "https://randomuser.me/api/portraits/men/46.jpg";

  const heroPhrases = [
    { line1: "Find your career ", key1: "direction.", line2: "Build your ", key2: "career." },
    { line1: "Choose the right ", key1: "career.", line2: "Design your ", key2: "destiny." },
    { line1: "Discover your ", key1: "spark.", line2: "Launch your ", key2: "path." },
    { line1: "Map your career ", key1: "path.", line2: "Own your ", key2: "success." },
    { line1: "Define your ", key1: "purpose.", line2: "Elevate your ", key2: "journey." },
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    // Preload hero images for smooth transition
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (view !== 'landing') return;
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % heroPhrases.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [view]);

  useEffect(() => {
    if (view !== 'landing') return;
    const imgInterval = setInterval(() => {
      setCurrentHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 40000);
    return () => clearInterval(imgInterval);
  }, [view]);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  // ─── Non-landing views ────────────────────────────────────
  if (view === 'about') return <About onBack={() => setView('landing')} />;
  if (view === 'insights') return <Insights onBack={() => setView('landing')} insights={cmsData.insights} />;
  if (view === 'contact-us') return <ContactUs onBack={() => setView('landing')} />;
  if (view === 'high-school') return <ServicePage data={highSchoolData} onBack={() => setView('landing')} />;
  if (view === 'plus-two') return <ServicePage data={plusTwoData} onBack={() => setView('landing')} />;
  if (view === 'graduates') return <ServicePage data={graduatesData} onBack={() => setView('landing')} />;
  if (view === 'working-professional') return <ServicePage data={workingProfessionalData} onBack={() => setView('landing')} />;

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-fixed">
      <FollowCursor color="#fba70c" zIndex={9999} />
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex flex-col bg-slate-50/80 backdrop-blur-md border-b border-slate-100">
        {/* Top Info Bar */}
        <div className="w-full bg-slate-900 text-white py-1.5 px-6 flex justify-center md:justify-end gap-6 text-[10px] sm:text-xs font-semibold tracking-wider">
           <a href="tel:+919289191164" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone size={12} /> +91-9289191164
           </a>
           <a href="mailto:hr@ZeOpto.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail size={12} /> hr@ZeOpto.com
           </a>
           <a href="https://ZeOpto.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Globe size={12} /> Visit ZeOpto
           </a>
        </div>
        <nav className="flex justify-between items-center px-4 h-24 max-w-full">
            <div className="flex items-center gap-2">
              <img 
                alt="CareerDisha Logo" 
                className="h-16 md:h-20 w-auto object-contain" 
              src={LOGO_URL} 
              referrerPolicy="no-referrer" 
            />
            <span className="text-xl font-extrabold text-blue-700 tracking-tighter font-headline">Career Disha</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-primary border-b-2 border-primary font-headline tracking-tight font-semibold hover:opacity-80 transition-opacity duration-300" href="#">Home</a>
            <button 
              onClick={() => setView('about')}
              className="text-on-surface-variant hover:text-primary font-headline tracking-tight font-semibold hover:opacity-80 transition-opacity duration-300"
            >
              About Us
            </button>
            <div className="relative group py-4">
              <span className="text-on-surface-variant hover:text-primary font-headline tracking-tight font-semibold hover:opacity-80 transition-opacity duration-300 cursor-pointer flex items-center gap-1">
                Programs
              </span>
              <div className="absolute left-0 top-full w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden flex flex-col py-2">
                  <button onClick={() => setView('high-school')} className="text-left px-5 py-3 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors">Career Counselling for High School (9th & 10th)</button>
                  <button onClick={() => setView('plus-two')} className="text-left px-5 py-3 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors">Career Counselling for Plus-two(11th & 12th)</button>
                  <button onClick={() => setView('graduates')} className="text-left px-5 py-3 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors">Career Counselling for Graduates</button>
                  <button onClick={() => setView('working-professional')} className="text-left px-5 py-3 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors">Career Counselling for Working Professional</button>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setView('insights')}
              className="text-on-surface-variant hover:text-primary font-headline tracking-tight font-semibold hover:opacity-80 transition-opacity duration-300"
            >
              Insights
            </button>
            <a className="text-on-surface-variant hover:text-primary font-headline tracking-tight font-semibold hover:opacity-80 transition-opacity duration-300" href="#testimonials">Testimonials</a>
            <a 
              className="text-on-surface-variant hover:text-primary font-headline tracking-tight font-semibold hover:opacity-80 transition-opacity duration-300" 
              href="/brochure.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Download Brochure
            </a>
            <button 
              onClick={() => setView('contact-us')}
              className="text-on-surface-variant hover:text-primary font-headline tracking-tight font-semibold hover:opacity-80 transition-opacity duration-300"
            >
              Partner With Us
            </button>
            <button 
              onClick={() => setView('contact-us')}
              className="text-on-surface-variant hover:text-primary font-headline tracking-tight font-semibold hover:opacity-80 transition-opacity duration-300"
            >
              Contact Us
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowInquiryModal(true)}
              className="group flex h-10 items-center justify-center gap-2 rounded-full bg-[#fba70c] pl-3 pr-4 transition-all duration-300 ease-in-out hover:bg-[#d97706] hover:pl-2 text-white font-semibold font-headline animate-elegant-zoom shadow-md hover:shadow-lg active:bg-[#b45309]"
            >
              <span className="rounded-full bg-white p-1 text-sm transition-colors duration-300 group-hover:bg-white flex items-center justify-center">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="-translate-x-[200%] text-[0px] transition-all duration-300 group-hover:translate-x-0 group-hover:text-lg group-hover:text-[#d97706] group-active:-rotate-45" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
              <span>Expert Advice</span>
            </button>
          </div>
        </nav>
      </header>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[700px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 hero-overlay z-10 backdrop-blur-[2px] bg-black/30"></div>
            <AnimatePresence mode="popLayout">
              <motion.img 
                key={heroImages[currentHeroImageIndex]}
                src={heroImages[currentHeroImageIndex]}
                alt="Empowering Career Vision"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </AnimatePresence>
          </div>
          <div className="relative z-20 max-w-7xl mx-auto px-8 w-full">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.2 }
                }
              }}
              className="max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-10 rounded-3xl shadow-2xl relative lg:-left-8 xl:-left-12"
            >
              <div className="h-[240px] md:h-[190px] relative w-full overflow-visible">
                <AnimatePresence mode="popLayout">
                  <motion.h1 
                    key={currentPhraseIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute top-0 left-0 w-full text-6xl md:text-7xl font-extrabold text-on-surface leading-tight mb-6 tracking-tight drop-shadow-lg"
                  >
                    <span className="whitespace-nowrap block mb-2">
                      {heroPhrases[currentPhraseIndex].line1}
                      <span className="relative inline-block ml-1">
                        <span className="relative z-10 text-white">{heroPhrases[currentPhraseIndex].key1}</span>
                        <motion.span initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }} className="absolute bottom-2 left-0 h-4 md:h-5 bg-primary/60 -rotate-2 z-0 origin-left rounded-md w-full"></motion.span>
                      </span>
                    </span>
                    <span className="whitespace-nowrap block">
                      <span className="bg-gradient-to-r from-primary via-blue-500 to-tertiary-fixed bg-clip-text text-transparent animate-gradient-x drop-shadow-md">
                        {heroPhrases[currentPhraseIndex].line2}
                      </span>
                      <span className="relative inline-block ml-1">
                        <span className="relative z-10 text-white drop-shadow-md">{heroPhrases[currentPhraseIndex].key2}</span>
                        <motion.span initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }} className="absolute bottom-2 left-0 h-4 md:h-5 bg-blue-400/80 rotate-1 z-0 origin-left rounded-md w-full"></motion.span>
                      </span>
                    </span>
                  </motion.h1>
                </AnimatePresence>
              </div>
              <motion.p 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                className="text-base md:text-lg mb-8 leading-relaxed font-medium text-white/90 drop-shadow-md w-full md:whitespace-nowrap"
              >
                Confused about your career? Get personalized professional career guidance <br className="hidden md:block" />
                and career counselling designed for the next generation of leaders to choose the right career.
              </motion.p>
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <motion.button 
                    onClick={() => alert("Feature coming soon!")}
                    whileHover={{ x: 4, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="group bg-yellow-400 text-black border-2 border-black rounded-full font-bold text-lg px-8 py-4 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[-8px_8px_0_0_rgba(255,255,255,1)]"
                  >
                    START ASSESSMENT
                    <motion.div
                      animate={{ x: [0, 6, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-5 h-5 text-red-500 transition-colors" />
                    </motion.div>
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          {/* Floating Decorative Element */}
          <motion.div 
            animate={{ 
              y: [-10, 10, -10],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute right-[5%] top-[20%] hidden xl:block w-32 h-32 blur-[60px] bg-primary rounded-full opacity-60 pointer-events-none"
          />
          <motion.div 
            animate={{ 
              y: [10, -10, 10],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute left-[40%] bottom-[10%] hidden xl:block w-40 h-40 blur-[80px] bg-tertiary rounded-full opacity-40 pointer-events-none"
          />
        </section>

        {/* How it Works Section */}
        <section className="relative pt-16 pb-24 bg-surface px-8 border-b border-slate-100 overflow-hidden" id="how-it-works">
          {/* Confusion to Clarity Background Image */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20">
            <img 
              src="/confusiontoclarity.png" 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-4">From Career Confusion to Clarity</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto font-medium">Three simple steps of career planning to unlock your professional potential and choose the right career.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {[
                {
                  icon: <HelpCircle className="w-10 h-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />,
                  title: "Assessment",
                  desc: "Take our gold-standard psychometric test to uncover your hidden strengths and interests.",
                  bg: "bg-primary/10 text-primary",
                  bgHover: "group-hover:bg-primary group-hover:text-white group-hover:shadow-lg"
                },
                {
                  icon: <Brain className="w-10 h-10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" />,
                  title: "AI Analysis (feature soon to get added)",
                  desc: "Receive deep mentor insights as our AI maps your profile against 500+ modern career paths.",
                  bg: "bg-secondary/10 text-secondary",
                  bgHover: "group-hover:bg-secondary group-hover:text-white group-hover:shadow-lg"
                },
                {
                  icon: <Route className="w-10 h-10 group-hover:scale-110 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />,
                  title: "Roadmap (feature soon to get added)",
                  desc: "Get an actionable, step-by-step path including skill requirements and college recommendations.",
                  bg: "bg-balance/20 text-balance",
                  bgHover: "group-hover:bg-balance group-hover:shadow-lg"
                }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                  className="relative text-center group cursor-default"
                >
                  <div className={`w-20 h-20 ${step.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${step.bgHover}`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-primary">{step.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed px-4">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative h-[200px] md:h-[250px] bg-transparent overflow-hidden flex flex-col justify-center my-4 z-20">
              <div className="absolute inset-0 flex justify-center items-center">
                
                {/* Ribbon 1 - Criss Cross (Top Left to Bottom Right) */}
                <div className="absolute w-[150vw] left-[-25vw] bg-white h-[4.5rem] md:h-[5.5rem] flex items-center border-y-[3px] border-black rotate-[6deg] z-10 shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
                  <div className="flex whitespace-nowrap animate-marquee items-center h-full">
                    {[...Array(12)].map((_, i) => (
                        <div className="flex items-center space-x-3 mx-4 shrink-0 h-full" key={i}>
                          <img src="/CareerDishaLogo.png" alt="Logo" className="h-7 md:h-9 w-auto object-contain" />
                          <span className="text-2xl md:text-[2rem] font-bold text-black tracking-tight font-sans uppercase mt-1">CAREER DISHA</span>
                        </div>
                      ))}
                  </div>
                </div>
    
                {/* Ribbon 2 - Criss Cross (Bottom Left to Top Right) */}
                <div className="absolute w-[150vw] left-[-25vw] bg-white h-[4.5rem] md:h-[5.5rem] flex items-center border-y-[3px] border-black rotate-[-6deg] z-20 shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
                  <div className="flex whitespace-nowrap animate-marquee-reverse items-center h-full">
                    {[...Array(12)].map((_, i) => (
                      <div className="flex items-center space-x-3 mx-4 shrink-0 h-full" key={i}>
                          <img src="/CareerDishaLogo.png" alt="Logo" className="h-7 md:h-9 w-auto object-contain" />
                          <span className="text-2xl md:text-[2rem] font-bold text-black tracking-tight font-sans uppercase mt-1">CAREER DISHA</span>
                        </div>
                      ))}
                    </div>
                  </div>
              </div>
            </section>
  
            {/* Early Bird Promo Section */}
            {cmsData.offer.visible && (
            <section className="py-12 px-6 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="max-w-5xl mx-auto rounded-[2.5rem] bg-gradient-to-br from-indigo-50/90 to-white/95 border border-indigo-100 shadow-[0_20px_60px_-15px_rgba(79,70,229,0.15)] overflow-hidden relative"
              >
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#fba70c]/20 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12">
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                      <Star size={14} className="fill-red-600" />
                      {cmsData.offer.badge}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-headline mb-3">
                      {cmsData.offer.title}
                    </h2>
                    <p className="text-lg text-slate-600 font-medium">
                      {cmsData.offer.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center md:items-end shrink-0">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-2xl text-slate-400 font-bold line-through decoration-red-400/50 decoration-2">
                        {cmsData.offer.originalPrice}
                      </span>
                      <span className="text-5xl font-black text-[#fba70c] drop-shadow-sm">
                        {cmsData.offer.offerPrice}
                      </span>
                    </div>
                    <button 
                      onClick={() => setShowInquiryModal(true)}
                      className="w-full md:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold font-headline text-[1.1rem] shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
                    >
                      {cmsData.offer.cta}
                    </button>
                    <p className="text-xs text-slate-400 font-medium mt-3 text-center md:text-right">
                      {cmsData.offer.note}
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>
            )}

            {/* Tailored Guidance For You */}
        <section className="py-24 px-6 relative overflow-hidden" id="about">
          {/* Blurred Background Image Container */}
          <div 
            className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
            style={{ 
              backgroundImage: "url('/TailoredGuidance.png')",
              maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent), linear-gradient(to bottom, transparent, black 10%, black 75%, transparent)",
              maskComposite: "intersect",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent), linear-gradient(to bottom, transparent, black 10%, black 75%, transparent)",
              WebkitMaskComposite: "source-in"
            }}
          >
            <div className="absolute inset-0 bg-surface-container-low/70 backdrop-blur-[2px]"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-4">Tailored Guidance For You</h2>
              <div className="h-1 w-20 bg-secondary mx-auto rounded-full mb-6"></div>
              <p className="text-on-surface-variant max-w-2xl mx-auto font-medium">Whether you're starting out or scaling up, we provide the roadmap to your unique potential.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <School className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />,
                  title: "School Students",
                  desc: "Choosing a stream after 10th or 12th is the first big crossroads. We help you navigate Science, Commerce, and Arts with deep-dive personality insights.",
                  features: ["Stream Selection", "Aptitude Analysis"],
                  themeMap: {
                    bgDecor: "bg-primary/5",
                    bgDecorHover: "group-hover:bg-primary/10",
                    iconBg: "bg-primary/10",
                    iconText: "text-primary",
                    iconBgHover: "group-hover:bg-primary",
                    iconTextHover: "group-hover:text-white",
                    titleHover: "group-hover:text-primary",
                  }
                },
                {
                  icon: <Code className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />,
                  title: "College Learners",
                  desc: "Bridge the gap between your degree and the industry. We provide skill-specific roadmaps and internship strategies to get you job-ready.",
                  features: ["Internship Strategy", "Skill Gap Mapping"],
                  themeMap: {
                    bgDecor: "bg-secondary/5",
                    bgDecorHover: "group-hover:bg-secondary/10",
                    iconBg: "bg-secondary/10",
                    iconText: "text-secondary",
                    iconBgHover: "group-hover:bg-secondary",
                    iconTextHover: "group-hover:text-white",
                    titleHover: "group-hover:text-secondary",
                  }
                },
                {
                  icon: <TrendingUp className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />,
                  title: "Working Professionals",
                  desc: "Ready for a change? We analyze your transferable skills and provide a step-by-step blueprint for a successful career pivot into tech, management, or design.",
                  features: ["Career Pivoting", "Executive Mentorship"],
                  themeMap: {
                    bgDecor: "bg-red-500/5",
                    bgDecorHover: "group-hover:bg-red-500/10",
                    iconBg: "bg-red-500/10",
                    iconText: "text-red-500",
                    iconBgHover: "group-hover:bg-red-50",
                    iconTextHover: "group-hover:text-red-600",
                    titleHover: "group-hover:text-red-600",
                  }
                }
              ].map((card, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-slate-200"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 ${card.themeMap.bgDecor} rounded-bl-[100px] -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-[1.5] ${card.themeMap.bgDecorHover}`}></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  
                  <div className={`w-14 h-14 ${card.themeMap.iconBg} ${card.themeMap.iconText} rounded-xl flex items-center justify-center mb-8 relative z-10 transition-colors duration-300 ${card.themeMap.iconBgHover} ${card.themeMap.iconTextHover}`}>
                    {card.icon}
                  </div>
                  
                  <h3 className={`text-2xl font-extrabold mb-4 relative z-10 transition-colors duration-300 ${card.themeMap.titleHover}`}>{card.title}</h3>
                  <p className="text-slate-500 mb-8 leading-relaxed relative z-10">{card.desc}</p>
                  
                  <ul className="space-y-3 mb-10 relative z-10">
                    {card.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <ShieldCheck className="w-5 h-5 text-secondary group-hover:text-primary transition-colors duration-300" /> {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => alert("Feature coming soon!")}
                    className="relative z-10 text-primary font-bold flex items-center gap-2 transition-all cursor-pointer mt-auto group/btn hover:text-accent"
                  >
                    Start your Journey <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-24 px-8 mt-12 relative overflow-hidden">
          {/* Faded Background Image Container */}
          <div 
            className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat pointer-events-none"
            style={{ 
              backgroundImage: "url('/PsychologicalJourney.png')",
              maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent), linear-gradient(to bottom, transparent, black 10%, black 75%, transparent)",
              maskComposite: "intersect",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent), linear-gradient(to bottom, transparent, black 10%, black 75%, transparent)",
              WebkitMaskComposite: "source-in"
            }}
          >
            <div className="absolute inset-0 bg-surface/40 backdrop-blur-[2px]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-4">
              <div className="max-w-xl">
                <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Our Methodology</span>
                <h2 className="text-4xl md:text-5xl font-extrabold">The Psychological Journey</h2>
              </div>
              <p className="text-on-surface-variant max-w-sm font-medium mb-1">We move you from confusion to confidence through three core scientific stages.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative mt-16">
              {/* Connecting Line (Desktop only) */}
              <div className="hidden md:block absolute top-[2rem] left-1/6 right-1/6 h-[2px] bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 -z-10"></div>
              
              {[
                {
                  icon: <HelpCircle className="w-8 h-8" />,
                  title: "Assessment",
                  desc: "Identify your core strengths, interests, and subconscious personality drivers via our gold-standard survey.",
                  color: "bg-primary shadow-primary/20",
                  textColor: "text-white",
                  delay: 0.1
                },
                {
                  icon: <Brain className="w-8 h-8" />,
                  title: "AI Analysis (feature soon to get added)",
                  desc: "Our advanced models process 500+ data points to match your unique profile against global industry trends.",
                  color: "bg-secondary shadow-secondary/20",
                  textColor: "text-white",
                  delay: 0.3
                },
                {
                  icon: <Route className="w-8 h-8" />,
                  title: "Personalized Actionable Roadmaps (feature soon to get added)",
                  desc: "Receive a comprehensive, multi-year blueprint tailored to your psychology. Our roadmaps include specific skill acquisition paths, verified college recommendations, and direct connections to industry mentors.",
                  color: "bg-accent shadow-accent/20",
                  textColor: "text-slate-900",
                  isSpecial: true,
                  delay: 0.5
                }
              ].map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: step.delay, type: "spring", stiffness: 100 }}
                  className={`relative text-center group ${step.isSpecial ? 'p-6 rounded-3xl bg-accent/5 border-2 border-accent/20 shadow-xl mt-[-1.5rem]' : ''}`}
                >
                  {step.isSpecial && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm"
                    >
                      Core Platform Feature
                    </motion.div>
                  )}
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring" }}
                    className={`w-16 h-16 ${step.color} ${step.textColor} rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl relative z-10`}
                  >
                    {step.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className={`text-on-surface-variant leading-relaxed ${step.isSpecial ? 'px-2 text-sm font-medium' : 'px-4'}`}>
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why CareerDisha Bento Grid */}
        <section className="py-32 bg-slate-200">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-20 flex flex-col items-center">
              <img src={LOGO_URL} alt="Career Disha Logo" className="h-16 md:h-20 mb-6 object-contain" referrerPolicy="no-referrer" />
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Why Choose Our Career Guidance</h2>
              <p className="max-w-2xl mx-auto text-on-surface-variant text-lg">We combine human psychology with advanced intelligence to provide career counselling and professional career guidance that actually helps you choose the right career.</p>            </div>            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 0.98 }}
                className="md:col-span-7 bg-primary-container p-12 rounded-[2rem] flex flex-col justify-between text-on-primary-container relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <motion.div whileHover={{ rotate: 10, scale: 1.1 }}><Award className="w-12 h-12 mb-6" /></motion.div>
                  <h3 className="text-3xl font-bold mb-4">Psychologically Grounded</h3>
                  <p className="text-on-primary-container/80 text-lg max-w-md">Our assessments aren't just tests; they are deep-dives into personality frameworks used by top career psychologists globally.</p>
                </div>
                <div className="absolute right-[-50px] bottom-[-50px] opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <ShieldCheck className="w-[300px] h-[300px]" />
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="md:col-span-5 bg-secondary-container p-12 rounded-[2rem] flex flex-col justify-center text-on-secondary-container group"
              >
                <div className="bg-white/20 p-4 rounded-2xl w-fit mb-6 transition-transform group-hover:-rotate-6 group-hover:scale-110 duration-300">
                  <Bot className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Expert Career Advice <span className="text-sm font-normal opacity-75">(features soon to expand)</span></h3>
                <p className="text-on-secondary-container/80 text-lg">24/7 access to career advice for students that helps decode complex career path guidance based on your unique profile.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                className="md:col-span-5 bg-tertiary-fixed p-12 rounded-[2rem] flex flex-col justify-center text-on-tertiary-fixed group"
              >
                <h3 className="text-3xl font-bold mb-4 flex items-center gap-3 flex-wrap">
                  Actionable Career Plans <span className="text-lg font-medium opacity-80">(soon to expand)</span>
                  <Route className="w-8 h-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                </h3>
                <p className="text-on-tertiary-fixed-variant text-lg">No generic career advice. We provide structured career planning, targeted dates, links to courses, and specific jobs to aim for.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="md:col-span-7 bg-indigo-50 border border-indigo-100 p-12 rounded-[2rem] flex flex-col justify-center relative overflow-hidden"
              >
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-4">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-14 h-14 rounded-full border-4 border-white bg-indigo-200"></motion.div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="w-14 h-14 rounded-full border-4 border-white bg-indigo-300"></motion.div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} className="w-14 h-14 rounded-full border-4 border-white bg-indigo-400"></motion.div>
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-indigo-900">15,000+</p>
                    <p className="text-indigo-700 text-lg font-semibold mt-1">Careers transformed this year</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative py-24 px-8 overflow-hidden" id="testimonials">
          {/* Decorative Gradients & Soft Fading Background */}
          <div 
            className="absolute inset-0 pointer-events-none shadow-inner"
            style={{ 
              maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)", 
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" 
            }}
          >
            <div className="absolute inset-0 bg-slate-50"></div>
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/40 blur-[100px]"></div>
            <div className="absolute bottom-[0%] -right-[10%] w-[60%] h-[60%] rounded-full bg-yellow-400/40 blur-[100px]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface">What our Lumineers say</h2>
            </div>
            <div className="relative group">
              <button 
                onClick={() => {
                  const container = document.getElementById('testimonials-container');
                  if (container) container.scrollBy({ left: -400, behavior: 'smooth' });
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-10 w-12 h-12 rounded-full border border-slate-200 bg-white shadow-md flex items-center justify-center hover:bg-slate-50 hover:scale-105 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-slate-600" />
              </button>

              <div id="testimonials-container" className="flex gap-8 overflow-x-auto pb-10 pt-4 no-scrollbar snap-x scroll-smooth px-4">
                {/* Testimonial 1 */}
                <div className="min-w-[320px] md:min-w-[400px] bg-white/60 backdrop-blur-lg p-10 rounded-3xl snap-center shadow-sm border border-white/50 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className="flex gap-1 text-accent mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-lg italic mb-10 leading-relaxed drop-shadow-sm">"The most clear career path guidance I've ever received. Their career planning helped me choose the right career by showing exact courses and internships needed to transition into AI Research."</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white">
                      <img 
                        alt="Priya Sharma" 
                        src={priyaImg}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface">Priya Sharma</h4>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">College Student</p>
                    </div>
                  </div>
                </div>
                {/* Testimonial 2 */}
                <div className="min-w-[320px] md:min-w-[400px] bg-white/60 backdrop-blur-lg p-10 rounded-3xl snap-center shadow-sm border border-white/50 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className="flex gap-1 text-accent mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-lg italic mb-10 leading-relaxed drop-shadow-sm">"Choosing a stream after 10th was a nightmare until I did the Career Disha assessment. It validated my love for design over medicine."</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white">
                      <img 
                        alt="Rohan Desai" 
                        src={rohanImg}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface">Rohan Desai</h4>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">High School Student</p>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  const container = document.getElementById('testimonials-container');
                  if (container) container.scrollBy({ left: 400, behavior: 'smooth' });
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-10 w-12 h-12 rounded-full border border-slate-200 bg-white shadow-md flex items-center justify-center hover:bg-slate-50 hover:scale-105 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-slate-600" />
              </button>
            </div>
          </div>
        </section>

        {/* Comparison Section (CareerDisha vs Others) */}
        <ComparisonSection />

        {/* Final CTA Section */}
        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto rounded-[3rem] bg-slate-900 overflow-hidden relative">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-96 h-96 bg-primary blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>
            </div>
            <div className="relative z-10 px-8 py-20 text-center">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Ready to find your career direction?</h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12">Join 15,000+ others who have engaged with our professional career guidance and found their calling with Career Disha's unique psychological approach to career planning.</p>
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <button 
                  onClick={() => alert("Feature coming soon!")}
                  className="bg-accent hover:bg-accent/90 text-slate-900 font-extrabold text-lg px-12 py-5 rounded-full shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all hover:scale-105 active:scale-95"
                >
                  START ASSESSMENT NOW
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Visionaries / Founder Section */}
        <section className="relative py-24 px-8 bg-surface overflow-hidden">
          {/* Background Image with fading edges and translucent effect */}
          <div 
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage: "url('/MeetTheVisionaries.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.8,
              maskImage: "radial-gradient(ellipse at center, black 50%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 50%, transparent 100%)"
            }}
          ></div>
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-4">Meet the Visionaries Behind the Platform</h2>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6"></div>
              <p className="text-on-surface-variant max-w-2xl mx-auto font-medium">The experts ensuring you receive unmatched value and professional career guidance.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProfileCard
                name="Mr. Gunjan Tewari"
                title="Founder & Director"
                image="/GunjanSir.jpeg"
                color="primary"
                description="With over two decades of extensive experience in the IT sector, he has dedicated the last 8 years to comprehensive IT and career counselling. He brings a strategic vision to the platform, mentoring students and professionals to navigate their career paths efficiently."
                bullets={[
                  "Founder & Director",
                  "Certified AI Generalist",
                  "IT Career Strategist & Mentor"
                ]}
                linkedinUrl="https://in.linkedin.com/in/gunjantewari"
                onContactClick={() => setView('contact-us')}
              />

              <ProfileCard
                name="Mr. Abhijit Vyas"
                title="Co-founder & Director"
                image="/AbhijeetSir.jpeg"
                color="secondary"
                description="With 18+ years of dedicated expertise in the IT sector and training, he has spent the last 8 years actively mentoring and counselling individuals. He ensures Careerदिशा's guidance remains firmly aligned with the dynamic, real-world needs of the industry."
                bullets={[
                  "Co-founder & Director",
                  "Certified AI Generalist",
                  "Technical Advisor & Mentor",
                  "IT Project Manager"
                ]}
                linkedinUrl="https://in.linkedin.com/in/abhijit-vyas-696640216"
                onContactClick={() => setView('contact-us')}
              />
            </div>
          </div>
        </section>

        {/* Meet Our Counsellors Section */}
        <section className="relative py-24 px-8 bg-slate-50 overflow-hidden" id="counsellors">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Expert Guidance</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-4">Meet Our Counsellors</h2>
              <div className="h-1 w-20 bg-secondary mx-auto rounded-full mb-6"></div>
              <p className="text-on-surface-variant max-w-2xl mx-auto font-medium">Our dedicated team of career counsellors brings years of expertise to guide you towards the right path.</p>
            </div>

            {/* Scrolling container */}
            <div className="relative">
              {/* Gradient fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

              <div className="overflow-hidden">
                <div className="flex gap-8 animate-scroll-cards hover:[animation-play-state:paused]" style={{ width: 'max-content' }}>
                  {/* Duplicate cards for seamless loop */}
                  {[...Array(2)].map((_, setIndex) => (
                    <div key={setIndex} className="flex gap-8 shrink-0">
                      {/* Nishtha Vyas */}
                      <div className="w-[420px] bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-shadow duration-300 shrink-0 group">
                        <div className="relative h-72 overflow-hidden">
                          <img
                            src="/NishthaVyas.jpg"
                            alt="Nishtha Vyas"
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                          <div className="absolute bottom-4 left-6 right-6">
                            <h3 className="text-2xl font-bold text-white mb-1">Nishtha Vyas</h3>
                            <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider">Senior Career Counsellor</p>
                          </div>
                        </div>
                        <div className="p-6">
                          <p className="text-slate-600 italic text-sm mb-5 leading-relaxed border-l-4 border-primary/30 pl-4">
                            "Empowering students through data-driven insights and strategic foresight to navigate global career paths."
                          </p>
                          <ul className="space-y-2.5 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
                              <span className="text-slate-700"><strong className="text-slate-900">Experience:</strong> 10 years in career development & mentorship</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0"></span>
                              <span className="text-slate-700"><strong className="text-slate-900">Specialization:</strong> Emerging industry trends & career architecture</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0"></span>
                              <span className="text-slate-700"><strong className="text-slate-900">Strategy:</strong> Global job market expertise for future-ready decisions</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                              <span className="text-slate-700"><strong className="text-slate-900">Approach:</strong> Building clarity through high-impact guidance</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Milli Tewari */}
                      <div className="w-[420px] bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-shadow duration-300 shrink-0 group">
                        <div className="relative h-72 overflow-hidden">
                          <img
                            src="/MilliTewari.jpg"
                            alt="Milli Tewari"
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                          <div className="absolute bottom-4 left-6 right-6">
                            <h3 className="text-2xl font-bold text-white mb-1">Milli Tewari</h3>
                            <p className="text-sm font-semibold text-green-300 uppercase tracking-wider">Lead Career Strategist</p>
                          </div>
                        </div>
                        <div className="p-6">
                          <p className="text-slate-600 italic text-sm mb-5 leading-relaxed border-l-4 border-secondary/30 pl-4">
                            "Building agile and future-proof career paths through personalized strategy and market intelligence."
                          </p>
                          <ul className="space-y-2.5 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
                              <span className="text-slate-700"><strong className="text-slate-900">Experience:</strong> 8 years in career strategy & mentorship</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0"></span>
                              <span className="text-slate-700"><strong className="text-slate-900">Core Focus:</strong> Modern industry shifts & global job markets</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0"></span>
                              <span className="text-slate-700"><strong className="text-slate-900">Methodology:</strong> Simplifying complex trends into actionable plans</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                              <span className="text-slate-700"><strong className="text-slate-900">Goal:</strong> Strategic mindset for long-term excellence</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Shruti Bhardwaj */}
                      <div className="w-[420px] bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-shadow duration-300 shrink-0 group">
                        <div className="relative h-72 overflow-hidden">
                          <img
                            src="/ShrutiBhardwaj.jpg"
                            alt="Shruti Bhardwaj"
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                          <div className="absolute bottom-4 left-6 right-6">
                            <h3 className="text-2xl font-bold text-white mb-1">Shruti Bhardwaj</h3>
                            <p className="text-sm font-semibold text-amber-300 uppercase tracking-wider">Career Development Specialist</p>
                          </div>
                        </div>
                        <div className="p-6">
                          <p className="text-slate-600 italic text-sm mb-5 leading-relaxed border-l-4 border-accent/30 pl-4">
                            "Dedicated to bridging the gap between academic potential and professional success through personalized mentorship."
                          </p>
                          <ul className="space-y-2.5 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
                              <span className="text-slate-700"><strong className="text-slate-900">Experience:</strong> 3 years in student career counseling & skill development</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0"></span>
                              <span className="text-slate-700"><strong className="text-slate-900">Focus:</strong> Discovering core strengths & aligning career paths</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0"></span>
                              <span className="text-slate-700"><strong className="text-slate-900">Approach:</strong> Relatable one-on-one guidance for early-career transitions</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                              <span className="text-slate-700"><strong className="text-slate-900">Commitment:</strong> Building a strong foundation for professional entry</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 w-full py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <span className="font-headline font-bold text-white text-xl flex items-center gap-2">
              <img 
                  alt="CareerDisha Logo" 
                  className="h-10 md:h-12 w-auto brightness-0 invert" 
                src={LOGO_URL}
                referrerPolicy="no-referrer"
              />
              Career Disha
              </span>
              <p className="text-slate-400 text-sm leading-relaxed mb-1">Offices B-02, A-28, Near Noida Sector 16 Metro Station, Block A, Sector 4, Noida, UP-201301</p>
              <p className="text-slate-400 text-sm leading-relaxed">Delivering expert career counselling and career planning to guide the next generation in choosing the right career.</p>
              
              <div className="flex items-center justify-start gap-3 pt-4 flex-wrap">
                <a href="https://www.facebook.com/ZeOptoitservices" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 bg-slate-800 rounded-full shadow-sm border border-slate-700 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook w-5 h-5" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://www.instagram.com/ZeOptoitservices/?igsh=MTBkYThwNG8wY2F5ZA%3D%3D#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 bg-slate-800 rounded-full shadow-sm border border-slate-700 flex items-center justify-center text-pink-400 hover:bg-pink-600 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram w-5 h-5" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                </a>
                <a href="https://www.linkedin.com/company/ZeOpto-it-services/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 bg-slate-800 rounded-full shadow-sm border border-slate-700 flex items-center justify-center text-blue-400 hover:bg-blue-700 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin w-5 h-5" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="https://www.whatsapp.com/channel/0029Vb5aVHkDzgT8eqtO4p3n" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 bg-slate-800 rounded-full shadow-sm border border-slate-700 flex items-center justify-center text-green-400 hover:bg-green-500 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle w-5 h-5" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path></svg>
                </a>
                <a href="https://youtube.com/@ZeOpto?si=k0Oijwu3wG1AhtNR" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 bg-slate-800 rounded-full shadow-sm border border-slate-700 flex items-center justify-center text-red-500 hover:bg-red-600 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube w-5 h-5" aria-hidden="true"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-xs uppercase tracking-widest font-bold text-slate-100">Explore</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setView('insights')} className="text-slate-400 text-sm hover:text-primary transition-colors text-left w-full">Resources</button></li>
              <li><button onClick={() => setView('insights')} className="text-slate-400 text-sm hover:text-primary transition-colors text-left w-full">Career Blog</button></li>
              <li><button onClick={() => setView('contact-us')} className="text-slate-400 text-sm hover:text-primary transition-colors text-left w-full">Support</button></li>
              <li><button onClick={() => setView('contact-us')} className="text-slate-400 text-sm hover:text-primary transition-colors text-left w-full">Contact Us</button></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-slate-100">Legal</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setView('about')} className="text-slate-400 text-sm hover:text-primary transition-colors text-left w-full">Privacy</button></li>
              <li><button onClick={() => setView('about')} className="text-slate-400 text-sm hover:text-primary transition-colors text-left w-full">Terms</button></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-slate-100">Newsletter</h4>
            <div className="flex gap-2">
              <input 
                className="bg-slate-800 border-none rounded-lg p-2 text-sm w-full text-white placeholder-slate-400 focus:ring-2 focus:ring-primary outline-none" 
                placeholder="Email address" 
                type="email"
              />
              <button className="bg-primary text-white p-2 rounded-lg hover:opacity-90 transition-opacity">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs uppercase tracking-widest text-slate-500">{COPYRIGHT_TEXT}</p>
          <div className="flex gap-6">
            <Globe className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" onClick={() => window.open('https://zeopto.com/', '_blank')} />
            <Users className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" onClick={() => window.open('https://linkedin.com/company/zeopto', '_blank')} />
            <Share2 className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Careerदिशा',
                  text: 'Check out Careerदिशा - AI-powered career guidance!',
                  url: window.location.href,
                });
              }
            }} />
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Icon */}
      <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-1">
        <a 
          href="https://wa.me/919953280036" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:scale-105 transition-transform duration-300 bg-white rounded-full p-2 shadow-lg"
          title="WhatsApp Chat"
        >
          <img 
            src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png" 
            alt="WhatsApp Icon" 
            className="w-16 h-16 object-contain"
          />
        </a>
        <a 
          href="https://www.flaticon.com/free-icons/whatsapp" 
          title="whatsapp icons" 
          className="text-[10px] text-slate-400 opacity-50 hover:opacity-100"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Whatsapp icons created by Freepik - Flaticon
        </a>
      </div>

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
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [showSplash, setShowSplash] = useState(() => localStorage.getItem('seenSplash') !== 'true');

  useEffect(() => {
    loadCmsData().then(setCmsData);
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
    const onRouteChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', onRouteChange);
    return () => window.removeEventListener('popstate', onRouteChange);
  }, []);

  const isAdminRoute = pathname === '/admin' || pathname === '/admin/';

  if (isAdminRoute) {
    return <Admin data={cmsData} onDataChange={setCmsData} />;
  }

  if (!showSplash) return <MainApp cmsData={cmsData} />;

  return (
    <>
      <SplashScreen onFinish={() => {
        localStorage.setItem('seenSplash', 'true');
        setShowSplash(false);
      }} />
      <MainApp cmsData={cmsData} />
    </>
  );
}

















