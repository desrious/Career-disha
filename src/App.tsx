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
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Login from './components/Login';
import Register from './components/Register';
import ProfileSelection from './components/ProfileSelection';
import StudentRegistration from './components/StudentRegistration';
import RegistrationSuccess from './components/RegistrationSuccess';
import UserDashboard from './components/UserDashboard';
import ResultScreen from './components/ResultScreen';
import HighSchool from './components/HighSchool';
import PlusTwo from './components/PlusTwo';
import GraduatesService from './components/GraduatesService';
import WorkingProfessionalService from './components/WorkingProfessionalService';
import RoadmapScreen from './components/RoadmapScreen';
import About from './components/About';
import Insights from './components/Insights';
import SplashScreen from './components/SplashScreen';
import ContactUs from './components/ContactUs';
import GraduateRegistration from './components/GraduateRegistration';
import GraduateDashboard from './components/GraduateDashboard';
import ProfessionalRegistration from './components/ProfessionalRegistration';
import ProfessionalDashboard from './components/ProfessionalDashboard';
import InquiryModal from './components/InquiryModal';

function MainApp() {
  const [view, setView] = useState<'landing' | 'login' | 'register' | 'profile-selection' | 'student-registration' | 'graduate-registration' | 'professional-registration' | 'registration-success' | 'user-dashboard' | 'graduate-dashboard' | 'professional-dashboard' | 'result-screen' | 'roadmap-screen' | 'about' | 'insights' | 'contact-us' | 'high-school' | 'plus-two' | 'graduates' | 'working-professional'>('landing');
  const [registeredProfileType, setRegisteredProfileType] = useState<'student' | 'graduate' | 'professional'>('student');
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const logoUrl = "/CareerDishaLogo.png";
  const heroImgUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBILbGMXF7pnQcw4rfZtCsvSBUuU4l3DJA2Fk6nbdhh5exCN0h51h8ZFQQx6QGvWeOLUIJ2ZWQmVbcd3qzk9zo_9MQrsPqLfsNFeaQAXwRsnljGXLInA_nIKRE21J-ENWSktG3m1XMxdLGi7ViU-1OHfCsQpXwvppVK6C10vqOMNlNMUQnWDBlycRn9k6Y2lcKEYtO338CWin-5dcnOUSsBzDUAOC-oSG82a7QDhQ6lkZvlCHOKPZ8P8QBF0OzNK4dlVNg3hJwiiFPk";
  const sarahImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuDVeyWio2pNOejqEPAK_TS8F7OIFAHwg0xtTt4KMA8S5Sb7ok852t9qhPcqybzRV3UaMWqcjrWKEYuZrWpfheQAyHB8CDmWfUyXSx34IVg-kgjS4-f4VG95lMf1c_Vps_MyHKOgxLtzwaEOvRBqcvNd1FPVlEp625IvIhHYocf2x7oEwLWLqOp-QuowzOyvENU629eH3nJNw7QU4I61KDISzb6VL1rOsKqSj_9_xOHxDFpnc_HKe-fVBuGozQBUCTots0TE0H-t2i_M";
  const rahulImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuALOvZRGXBqLA1LNWl-Yy-hh7feizVUN8D0NXYrxF6ppKO-xGkNBQEKNqjHNleuDZJoT3JvluCqLhzhwbqkOEcyQEAOMinjEFJaLf82KBlOFo9AzDg4VBE8HsM_fX33BeSNZBTFIHJmvC7CkFqOtb-eyVlqhkBhcWYYldm8C5h-5ZAExEzz1c300cdTaFCRiTsR906wbFt9NZDK1MnG5HnaIBKT43--qMq9puLfuDuhgizkPnbvT3V7Lub4GYPShtSUo2LjMymTRO9V";

  const heroPhrases = [
    { line1: "Find your ", key1: "direction.", line2: "Build your ", key2: "future." },
    { line1: "Unlock your ", key1: "potential.", line2: "Design your ", key2: "destiny." },
    { line1: "Discover your ", key1: "spark.", line2: "Launch your ", key2: "career." },
    { line1: "Map your ", key1: "path.", line2: "Own your ", key2: "success." },
    { line1: "Define your ", key1: "purpose.", line2: "Elevate your ", key2: "journey." },
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    if (view !== 'landing') return;
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % heroPhrases.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [view]);

  if (view === 'login') {
    return (
      <Login 
        onBack={() => setView('landing')} 
        onRegister={() => setView('register')}
        onLogin={() => setView('user-dashboard')}
      />
    );
  }

  if (view === 'register') {
    return (
      <Register 
        onClose={() => setView('landing')} 
        onStart={() => setView('profile-selection')}
      />
    );
  }

  if (view === 'profile-selection') {
    return (
      <ProfileSelection 
        onStartStudent={() => setView('student-registration')} 
        onStartGraduate={() => setView('graduate-registration')} 
        onStartProfessional={() => setView('professional-registration')}
      />
    );
  }

  if (view === 'professional-registration') {
    return (
      <ProfessionalRegistration 
        onBack={() => setView('profile-selection')}
        onComplete={() => {
          setRegisteredProfileType('professional');
          setView('registration-success');
        }}
      />
    );
  }

  if (view === 'graduate-registration') {
    return (
      <GraduateRegistration 
        onBack={() => setView('profile-selection')}
        onComplete={() => {
          setRegisteredProfileType('graduate');
          setView('registration-success');
        }}
      />
    );
  }

  if (view === 'student-registration') {
    return (
      <StudentRegistration 
        onBack={() => setView('profile-selection')}
        onComplete={() => {
          setRegisteredProfileType('student');
          setView('registration-success');
        }}
      />
    );
  }

  if (view === 'registration-success') {
    return (
      <RegistrationSuccess 
        onGoToDashboard={() => {
          if (registeredProfileType === 'student') setView('user-dashboard');
          else if (registeredProfileType === 'graduate') setView('graduate-dashboard');
          else if (registeredProfileType === 'professional') setView('professional-dashboard');
          else setView('user-dashboard');
        }}
      />
    );
  }

  if (view === 'user-dashboard') {
    return (
      <UserDashboard 
        onGoToResults={() => setView('result-screen')}
        onGoToRoadmap={() => setView('roadmap-screen')}
      />
    );
  }
  
  if (view === 'graduate-dashboard') {
    return (
      <GraduateDashboard 
        onGoToResults={() => setView('result-screen')}
        onGoToRoadmap={() => setView('roadmap-screen')}
      />
    );
  }

  if (view === 'professional-dashboard') {
    return (
      <ProfessionalDashboard 
        onGoToResults={() => setView('result-screen')}
        onGoToRoadmap={() => setView('roadmap-screen')}
      />
    );
  }

  if (view === 'result-screen') {
    return (
      <ResultScreen 
        onGoToRoadmap={() => setView('roadmap-screen')}
        onGoToDashboard={() => setView('user-dashboard')}
        onGoToResults={() => setView('result-screen')}
      />
    );
  }

  if (view === 'roadmap-screen') {
    return (
      <RoadmapScreen 
        onGoToDashboard={() => setView('user-dashboard')}
        onGoToResults={() => setView('result-screen')}
      />
    );
  }

  if (view === 'about') {
    return (
      <About onBack={() => setView('landing')} />
    );
  }

  if (view === 'insights') {
    return (
      <Insights 
        onBack={() => setView('landing')} 
        onGoToDashboard={() => setView('user-dashboard')}
        onGoToRoadmap={() => setView('roadmap-screen')}
        onGoToResults={() => setView('result-screen')}
      />
    );
  }

  if (view === 'contact-us') {
    return (
      <ContactUs onBack={() => setView('landing')} />
    );
  }

  if (view === 'high-school') {
    return <HighSchool onBack={() => setView('landing')} />;
  }

  if (view === 'plus-two') {
    return <PlusTwo onBack={() => setView('landing')} />;
  }

  if (view === 'graduates') {
    return <GraduatesService onBack={() => setView('landing')} />;
  }

  if (view === 'working-professional') {
    return <WorkingProfessionalService onBack={() => setView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-fixed">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex flex-col bg-slate-50/80 backdrop-blur-md border-b border-slate-100">
        {/* Top Info Bar */}
        <div className="w-full bg-slate-900 text-white py-1.5 px-6 flex justify-center md:justify-end gap-6 text-[10px] sm:text-xs font-semibold tracking-wider">
           <a href="tel:+919953280036" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone size={12} /> +91-9953280036
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
              src={logoUrl} 
              referrerPolicy="no-referrer" 
            />
            <span className="text-xl font-extrabold text-blue-700 tracking-tighter font-headline">Career Disha</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-primary border-b-2 border-primary font-headline tracking-tight font-semibold hover:opacity-80 transition-opacity duration-300" href="#">Home</a>
            <button 
              onClick={() => setView('insights')}
              className="text-on-surface-variant hover:text-primary font-headline tracking-tight font-semibold hover:opacity-80 transition-opacity duration-300"
            >
              Insights
            </button>
            <div className="relative group py-4">
              <span className="text-on-surface-variant hover:text-primary font-headline tracking-tight font-semibold hover:opacity-80 transition-opacity duration-300 cursor-pointer flex items-center gap-1">
                Services
              </span>
              <div className="absolute left-0 top-full w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden flex flex-col py-2">
                  <button onClick={() => setView('high-school')} className="text-left px-5 py-3 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors">High School (9th & 10th)</button>
                  <button onClick={() => setView('plus-two')} className="text-left px-5 py-3 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors">Plus-two(11th & 12th)</button>
                  <button onClick={() => setView('graduates')} className="text-left px-5 py-3 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors">Graduates</button>
                  <button onClick={() => setView('working-professional')} className="text-left px-5 py-3 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors">Working Professional</button>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setView('about')}
              className="text-on-surface-variant hover:text-primary font-headline tracking-tight font-semibold hover:opacity-80 transition-opacity duration-300"
            >
              About
            </button>
            <a className="text-on-surface-variant hover:text-primary font-headline tracking-tight font-semibold hover:opacity-80 transition-opacity duration-300" href="#testimonials">Testimonials</a>
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
              className="text-white font-semibold px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all font-headline"
              style={{ backgroundColor: '#fba70c' }}
            >
              Inquiry
            </button>
          </div>
        </nav>
      </header>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[700px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 hero-overlay z-10 backdrop-blur-[2px]"></div>
            <img 
              className="w-full h-full object-cover" 
              src={heroImgUrl}
              alt="Modern office space"
              referrerPolicy="no-referrer"
            />
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
              className="max-w-2xl"
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
                className="text-xl mb-10 leading-relaxed font-semibold text-white/90 drop-shadow-md"
              >
                Move from confusion to clarity with AI-powered career guidance designed for the next generation of leaders.
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
        <section className="py-24 bg-surface px-8 border-b border-slate-100" id="how-it-works">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-4">From Confusion to Clarity</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto font-medium">Three simple steps to unlock your professional potential.</p>
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
          <section className="relative h-[350px] md:h-[450px] bg-transparent overflow-hidden flex flex-col justify-center">
              <div className="absolute inset-0 flex justify-center items-center mt-8">
                
                {/* Ribbon 1 - Criss Cross (Top Left to Bottom Right) */}
                <div className="absolute w-[150vw] left-[-25vw] bg-white h-[4.5rem] md:h-[5.5rem] flex items-center border-y-[3px] border-black rotate-[6deg] z-10 shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
                  <div className="flex whitespace-nowrap animate-marquee items-center h-full">
                    {[...Array(12)].map((_, i) => (
                        <div className="flex items-center space-x-3 mx-4 shrink-0 h-full" key={i}>
                          <img src={logoUrl} alt="Logo" className="h-7 md:h-9 w-auto object-contain brightness-0" referrerPolicy="no-referrer" />
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
                          <img src={logoUrl} alt="Logo" className="h-7 md:h-9 w-auto object-contain brightness-0" referrerPolicy="no-referrer" />
                          <span className="text-2xl md:text-[2rem] font-bold text-black tracking-tight font-sans uppercase mt-1">CAREER DISHA</span>
                        </div>
                      ))}
                    </div>
                  </div>
              </div>
            </section>
  
            {/* Tailored Guidance For You */}
        <section className="py-24 px-6 bg-surface-container-low" id="about">
          <div className="max-w-7xl mx-auto">
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
        <section className="py-24 bg-surface px-8">
          <div className="max-w-7xl mx-auto">
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
        <section className="py-32 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Why Career Disha</h2>
              <p className="max-w-2xl mx-auto text-on-surface-variant text-lg">We combine human psychology with advanced intelligence to provide guidance that actually works.</p>            </div>            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
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
                <h3 className="text-3xl font-bold mb-4">AI Mentor <span className="text-sm font-normal opacity-75">(feature soon to get added)</span></h3>
                <p className="text-on-secondary-container/80 text-lg">24/7 access to an AI counselor that knows your profile inside out and provides instant advice on your career queries.</p>
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
                  Actionable Roadmaps <span className="text-lg font-medium opacity-80">(feature unlocks soon)</span>
                  <Route className="w-8 h-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                </h3>
                <p className="text-on-tertiary-fixed-variant text-lg">No generic advice. We give you dates, links to courses, and specific job titles to aim for.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="md:col-span-7 bg-surface-container-high p-12 rounded-[2rem] flex flex-col justify-center relative overflow-hidden"
              >
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-4">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-14 h-14 rounded-full border-4 border-white bg-slate-300"></motion.div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="w-14 h-14 rounded-full border-4 border-white bg-slate-400"></motion.div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} className="w-14 h-14 rounded-full border-4 border-white bg-slate-500"></motion.div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">15,000+</p>
                    <p className="text-on-surface-variant font-medium">Careers transformed this year</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-surface px-8 overflow-hidden" id="testimonials">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold">What our Lumineers say</h2>
              <div className="flex gap-2">
                <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white transition-colors">
                  <ChevronLeft className="w-6 h-6 text-slate-600" />
                </button>
                <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white transition-colors">
                  <ChevronRight className="w-6 h-6 text-slate-600" />
                </button>
              </div>
            </div>
            <div className="flex gap-8 overflow-x-auto pb-10 no-scrollbar snap-x">
              {/* Testimonial 1 */}
              <div className="min-w-[320px] md:min-w-[400px] bg-white p-10 rounded-3xl snap-center shadow-sm border border-slate-100">
                <div className="flex gap-1 text-accent mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent" />
                  ))}
                </div>
                <p className="text-slate-600 text-lg italic mb-10 leading-relaxed">"The most clear roadmap I've ever seen. I knew exactly which course to take and which internships to apply for to transition into AI Research."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                    <img 
                      alt="Sarah Johnson" 
                      src={sarahImg}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">Sarah Johnson</h4>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">College Student</p>
                  </div>
                </div>
              </div>
              {/* Testimonial 2 */}
              <div className="min-w-[320px] md:min-w-[400px] bg-white p-10 rounded-3xl snap-center shadow-sm border border-slate-100">
                <div className="flex gap-1 text-accent mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent" />
                  ))}
                </div>
                <p className="text-slate-600 text-lg italic mb-10 leading-relaxed">"Choosing a stream after 10th was a nightmare until I did the Career Disha assessment. It validated my love for design over medicine."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                    <img 
                      alt="Rahul Kapoor" 
                      src={rahulImg}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">Rahul Kapoor</h4>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">High School Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto rounded-[3rem] bg-slate-900 overflow-hidden relative">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-96 h-96 bg-primary blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>
            </div>
            <div className="relative z-10 px-8 py-20 text-center">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Ready to illuminate your path?</h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12">Join 15,000+ others who have found their calling with Career Disha's unique psychological approach.</p>
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
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 w-full py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <span className="font-headline font-bold text-slate-800 text-xl flex items-center gap-2">
              <img 
                  alt="CareerDisha Logo" 
                  className="h-10 md:h-12 w-auto" 
                src={logoUrl}
                referrerPolicy="no-referrer"
              />
              Career Disha
              </span>
              <p className="text-slate-500 text-sm leading-relaxed">Guiding the next generation through the maze of career choices with precision and empathy.</p>
              
              <div className="flex items-center justify-start gap-3 pt-4 flex-wrap">
                <a href="https://www.facebook.com/ZeOptoitservices" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook w-5 h-5" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://www.instagram.com/ZeOptoitservices/?igsh=MTBkYThwNG8wY2F5ZA%3D%3D#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram w-5 h-5" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                </a>
                <a href="https://www.linkedin.com/company/ZeOpto-it-services/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-blue-700 hover:bg-blue-700 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin w-5 h-5" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="https://www.whatsapp.com/channel/0029Vb5aVHkDzgT8eqtO4p3n" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle w-5 h-5" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path></svg>
                </a>
                <a href="https://youtube.com/@ZeOpto?si=k0Oijwu3wG1AhtNR" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube w-5 h-5" aria-hidden="true"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-xs uppercase tracking-widest font-bold text-slate-900">Explore</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setView('insights')} className="text-slate-500 text-sm hover:text-primary transition-colors text-left w-full">Resources</button></li>
              <li><button onClick={() => setView('insights')} className="text-slate-500 text-sm hover:text-primary transition-colors text-left w-full">Career Blog</button></li>
              <li><button onClick={() => setView('contact-us')} className="text-slate-500 text-sm hover:text-primary transition-colors text-left w-full">Support</button></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-slate-900">Legal</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setView('about')} className="text-slate-500 text-sm hover:text-primary transition-colors text-left w-full">Privacy</button></li>
              <li><button onClick={() => setView('about')} className="text-slate-500 text-sm hover:text-primary transition-colors text-left w-full">Terms</button></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-slate-900">Newsletter</h4>
            <div className="flex gap-2">
              <input 
                className="bg-white border-none rounded-lg p-2 text-sm w-full focus:ring-2 focus:ring-primary outline-none" 
                placeholder="Email address" 
                type="email"
              />
              <button className="bg-primary text-on-primary p-2 rounded-lg hover:opacity-90 transition-opacity">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs uppercase tracking-widest text-slate-500">© The Luminary Guide. All rights reserved.</p>
          <div className="flex gap-6">
            <Globe className="w-5 h-5 text-slate-400 hover:text-primary cursor-pointer transition-colors" onClick={() => window.open('https://zeopto.com/', '_blank')} />
            <Users className="w-5 h-5 text-slate-400 hover:text-primary cursor-pointer transition-colors" onClick={() => window.open('https://linkedin.com/company/zeopto', '_blank')} />
            <Share2 className="w-5 h-5 text-slate-400 hover:text-primary cursor-pointer transition-colors" onClick={() => {
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
        <InquiryModal onClose={() => setShowInquiryModal(false)} />
      )}
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(() => localStorage.getItem('seenSplash') !== 'true');

  if (!showSplash) return <MainApp />;

  return (
    <>
      <SplashScreen onFinish={() => {
        localStorage.setItem('seenSplash', 'true');
        setShowSplash(false);
      }} />
      <MainApp />
    </>
  );
}



















