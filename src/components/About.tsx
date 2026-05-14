import { useState, useRef, useEffect } from 'react';
import { COPYRIGHT_TEXT } from '../data/constants';
import { 
  ArrowLeft, 
  Target, 
  Rocket, 
  Lightbulb, 
  Heart, 
  Users, 
  Phone, 
  Mail, 
  CheckCircle2,
  Award,
  TrendingUp,
  Globe,
  X,
  User,
  MessageSquare,
  Send,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import ElectricBorder from './ElectricBorder';

interface AboutProps {
  onBack: () => void;
}

export default function About({ onBack }: AboutProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const logoUrl = "/CareerDishaLogo.png";

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);
  const speedRef = useRef(1.5);
  const targetSpeedRef = useRef(1.5);
  const animationRef = useRef<number | null>(null);

  const counsellorsList = [
    { name: 'Nishtha Vyas', role: 'Senior Career Counsellor', image: '/NishthaVyas.jpg', quote: '"Empowering students through data-driven insights and strategic foresight to navigate global career paths."', accentColor: 'border-primary/30', roleColor: 'text-blue-300', bullets: [{ label: 'Experience:', value: '10 years in career development & mentorship', color: 'bg-primary' }, { label: 'Specialization:', value: 'Emerging industry trends & career architecture', color: 'bg-secondary' }, { label: 'Strategy:', value: 'Global job market expertise for future-ready decisions', color: 'bg-accent' }, { label: 'Approach:', value: 'Building clarity through high-impact guidance', color: 'bg-red-500' }] },
    { name: 'Milli Tewari', role: 'Lead Career Strategist', image: '/MilliTewari.jpg', quote: '"Building agile and future-proof career paths through personalized strategy and market intelligence."', accentColor: 'border-secondary/30', roleColor: 'text-green-300', bullets: [{ label: 'Experience:', value: '8 years in career strategy & mentorship', color: 'bg-primary' }, { label: 'Core Focus:', value: 'Modern industry shifts & global job markets', color: 'bg-secondary' }, { label: 'Methodology:', value: 'Simplifying complex trends into actionable plans', color: 'bg-accent' }, { label: 'Goal:', value: 'Strategic mindset for long-term excellence', color: 'bg-red-500' }] },
    { name: 'Shruti Bhardwaj', role: 'Career Development Specialist', image: '/Shruti_bhardwaj.jpg', quote: '"Dedicated to bridging the gap between academic potential and professional success through personalized mentorship."', accentColor: 'border-accent/30', roleColor: 'text-amber-300', bullets: [{ label: 'Experience:', value: '3 years in student career counseling & skill development', color: 'bg-primary' }, { label: 'Focus:', value: 'Discovering core strengths & aligning career paths', color: 'bg-secondary' }, { label: 'Approach:', value: 'Relatable one-on-one guidance for early-career transitions', color: 'bg-accent' }, { label: 'Commitment:', value: 'Building a strong foundation for professional entry', color: 'bg-red-500' }] },
    { name: 'Dr. Anjali Bhardwaj', role: 'Senior Counselling Psychologist', image: '/Anjali_Bhardwaj.png', quote: '"Integrating psychological insights with career guidance to empower individuals with mental resilience and emotional clarity."', accentColor: 'border-purple-500/30', roleColor: 'text-purple-300', imgPosition: 'object-[50%_25%]', bullets: [{ label: 'Experience:', value: '15 years in clinical counselling, behavioural therapy, and mental wellness.', color: 'bg-primary' }, { label: 'Specialization:', value: 'Expert in psychometric assessments, personality mapping, and managing academic or career-related stress.', color: 'bg-secondary' }, { label: 'Methodology:', value: "Combining empathetic listening with scientific psychological frameworks to uncover an individual's true potential.", color: 'bg-purple-500' }, { label: 'Focus:', value: 'Dedicated to helping students and professionals overcome internal barriers, anxiety, and decision-making blocks.', color: 'bg-red-500' }, { label: 'Vision:', value: 'Committed to ensuring every individual achieves a harmonious balance between professional success and personal well-being.', color: 'bg-orange-500' }] },
  ];

  useEffect(() => {
    const animateScroll = () => {
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.05;
      scrollPosRef.current += speedRef.current;
      if (scrollRef.current) {
        const halfWidth = scrollRef.current.scrollWidth / 2;
        if (scrollPosRef.current >= halfWidth) scrollPosRef.current -= halfWidth;
        scrollRef.current.style.transform = `translateX(-${scrollPosRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animateScroll);
    };
    animationRef.current = requestAnimationFrame(animateScroll);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, []);

  const handleMouseEnter = () => { targetSpeedRef.current = 0; };
  const handleMouseLeave = () => { targetSpeedRef.current = 1.5; };

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="flex items-center gap-2 group">
              <img alt="Careerदिशा Logo" className="h-10 w-auto object-contain" src={logoUrl} referrerPolicy="no-referrer" />
            </button>
            <div className="hidden md:flex items-center gap-3 text-sm font-semibold text-slate-500 border-l border-slate-200 pl-4">
              <span className="text-primary tracking-widest uppercase text-xs font-bold">About Us</span>
            </div>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-on-surface-variant font-bold hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
        </div>
      </nav>

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center flex flex-col items-center"
        >
          <img 
            alt="Careerदिशा Logo" 
            className="h-24 md:h-28 w-auto object-contain mb-6" 
            src={logoUrl} 
            referrerPolicy="no-referrer" 
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-headline text-on-surface tracking-tight mb-6 sm:mb-8">
            About <span className="text-primary">Careerदिशा</span>
          </h1>
          <ElectricBorder color="#F4C430" speed={1} chaos={0.15} borderRadius={48} className="shadow-2xl">
            <div className="bg-slate-900 rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-8 md:p-12 text-left z-10 w-full h-full space-y-6">
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed text-left break-words">
                Careerदिशा, powered by <span className="font-bold text-blue-400">ZeOpto</span>, is built to bridge the gap between ambition and the right career path. Backed by ZeOpto's global expertise in consulting, cloud and AI-driven technology, operations optimization, and digital marketing, Careerदिशा brings together technology, mentorship, and real-world insights to guide individuals toward meaningful careers.
              </p>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed text-left break-words">
                ZeOpto has established itself as a trusted SAP services company, delivering high-performance solutions through consulting, implementation, and training. With a team of certified experts and a focus on innovation, efficiency, and quality, ZeOpto helps organizations streamline operations, reduce costs, and achieve sustainable growth. Careerदिशा extends this same expertise to students and professionals, making career guidance smarter, data-driven, and accessible.
              </p>
            </div>
          </ElectricBorder>
        </motion.section>

        {/* What We Bring */}
        <section className="mb-24">
          <h2 className="text-3xl font-extrabold font-headline mb-12 text-center">What We Bring to You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-outline-variant/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Expert-Backed Career Guidance</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed text-center break-words max-w-[320px] mx-auto">
                Careerदिशा leverages ZeOpto’s industry expertise to provide structured and practical career direction aligned with real-world demands.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-outline-variant/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Skilled & Certified Mentors</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed text-center break-words max-w-[320px] mx-auto">
                Guidance comes from experienced professionals and certified experts who understand both industry expectations and career growth pathways.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-outline-variant/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Future-Ready Skill Development</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed text-center break-words max-w-[320px] mx-auto">
                From foundational learning to advanced career insights, our approach ensures individuals are prepared for evolving industry trends and opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Vision, Mission, Ambition */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-blue-600 text-white p-6 sm:p-8 md:p-10 rounded-[2rem] sm:rounded-[2.5rem] relative overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-110 transition-transform"></div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Lightbulb className="w-6 h-6" /> Our Vision
            </h3>
            <p className="text-white/90 leading-relaxed font-medium text-center break-words max-w-[320px] mx-auto">
              To empower individuals with clarity, confidence, and the right direction, while continuing ZeOpto’s vision of becoming a trusted partner in digital transformation and career development.
            </p>
          </div>
          <div className="bg-yellow-500 text-white p-6 sm:p-8 md:p-10 rounded-[2rem] sm:rounded-[2.5rem] relative overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-110 transition-transform"></div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Target className="w-6 h-6" /> Our Mission
            </h3>
            <p className="text-white/90 leading-relaxed font-medium text-center break-words max-w-[320px] mx-auto">
              To deliver value-driven guidance and solutions that enhance both career growth for individuals and performance for organizations.
            </p>
          </div>
          <div className="bg-orange-500 text-white p-6 sm:p-8 md:p-10 rounded-[2rem] sm:rounded-[2.5rem] relative overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-110 transition-transform"></div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Rocket className="w-6 h-6" /> Our Ambition
            </h3>
            <p className="text-white/90 leading-relaxed font-medium text-center break-words max-w-[320px] mx-auto">
              To create a unified ecosystem where learning, guidance, and industry expertise come together to drive 360-degree growth for students, professionals, and businesses.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-16 sm:mb-24 bg-slate-900 text-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 md:p-12 shadow-2xl">
          <h2 className="text-3xl font-extrabold font-headline mb-12 text-center text-white">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            <div className="text-center bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-white">Growth</h4>
              <p className="text-slate-300 text-sm text-center break-words max-w-[320px] mx-auto leading-relaxed">We believe in continuous progress through learning, performance, and real-world application.</p>
            </div>
            <div className="text-center bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-yellow-400" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-white">Trust</h4>
              <p className="text-slate-300 text-sm text-center break-words max-w-[320px] mx-auto leading-relaxed">We build reliable relationships through transparency, guidance, and consistent support.</p>
            </div>
            <div className="text-center bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-orange-400" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-white">Value</h4>
              <p className="text-slate-300 text-sm text-center break-words max-w-[320px] mx-auto leading-relaxed">We focus on delivering meaningful impact that contributes to long-term success.</p>
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold font-headline mb-6">Turning Vision into Impact</h2>
            <p className="text-on-surface-variant leading-relaxed mb-8">
              At Careerदिशा, we combine ZeOpto’s deep industry expertise with a user-focused approach to career development. Our solutions are designed to provide clarity, improve decision-making, and prepare individuals for the future of work.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 font-bold text-on-surface">
                <CheckCircle2 className="w-6 h-6 text-secondary" /> Industry-aligned career strategies
              </li>
              <li className="flex items-center gap-3 font-bold text-on-surface">
                <CheckCircle2 className="w-6 h-6 text-secondary" /> Personalized and scalable guidance
              </li>
              <li className="flex items-center gap-3 font-bold text-on-surface">
                <CheckCircle2 className="w-6 h-6 text-secondary" /> Integration of learning, mentorship, and real-world insights
              </li>
            </ul>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&h=600&q=80" 
              alt="Team discussing career strategies and turning vision into impact" 
              className="rounded-[2.5rem] shadow-2xl object-cover h-[450px] w-full"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-3xl shadow-xl hidden md:block border border-outline-variant/10">
              <p className="text-4xl font-black text-primary mb-1">360°</p>
              <p className="text-xs font-bold text-outline uppercase tracking-widest">Growth Ecosystem</p>
            </div>
          </div>
        </section>

        {/* Visionaries */}
        <section className="mb-24">
          <h2 className="text-3xl font-extrabold font-headline mb-12 text-center">Meet the Visionaries Behind the Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full group">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-primary/10 rounded-xl overflow-hidden shrink-0">
                  <img src="/GunjanSir.jpeg" alt="Mr. Gunjan Tewari" className="w-full h-full object-cover object-[center_20%]" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold">Mr. Gunjan Tewari</h4>
                  <p className="text-primary font-bold text-sm uppercase tracking-widest">Founder & Director</p>
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <p className="text-on-surface-variant leading-relaxed mb-6 text-left break-words">
                  With over two decades of extensive experience in the IT sector, he has dedicated the last 8 years to comprehensive IT and career counselling. He brings a strategic vision to the platform, mentoring students and professionals to navigate their career paths efficiently.
                </p>
                <ul className="space-y-3 my-auto">
                  <li className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span>Founder & Director</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span>Certified AI Generalist</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span>IT Career Strategist & Mentor</span>
                  </li>
                </ul>
              </div>
              <div className="flex gap-3 mt-8 pt-6 border-t border-outline-variant/10">
                <button onClick={() => setIsContactModalOpen(true)} className="px-6 py-2 bg-primary text-white rounded-full font-bold hover:bg-opacity-90 transition-colors">Contact</button>
                <a href="https://in.linkedin.com/in/gunjantewari" target="_blank" rel="noopener noreferrer" className="px-6 py-2 border-2 border-primary text-primary rounded-full font-bold hover:bg-primary/5 transition-colors">LinkedIn</a>
              </div>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full group">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-yellow-500/10 rounded-xl overflow-hidden shrink-0">
                  <img src="/AbhijeetSir.jpeg" alt="Mr. Abhijit Vyas" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold">Mr. Abhijit Vyas</h4>
                  <p className="text-yellow-600 font-bold text-sm uppercase tracking-widest">Co-founder & Director</p>
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <p className="text-on-surface-variant leading-relaxed mb-6 text-left break-words">
                  With 18+ years of dedicated expertise in the IT sector and training, he has spent the last 8 years actively mentoring and counselling individuals. He ensures Careerदिशा's guidance remains firmly aligned with the dynamic, real-world needs of the industry.
                </p>
                <ul className="space-y-3 my-auto">
                  <li className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" />
                    <span>Co-founder & Director</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" />
                    <span>Certified AI Generalist</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" />
                    <span>Technical Advisor & Mentor</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" />
                    <span>IT Project Manager</span>
                  </li>
                </ul>
              </div>
              <div className="flex gap-3 mt-8 pt-6 border-t border-outline-variant/10">
                <button onClick={() => setIsContactModalOpen(true)} className="px-6 py-2 bg-yellow-500 text-white rounded-full font-bold hover:bg-opacity-90 transition-colors">Contact</button>
                <a href="https://www.linkedin.com/in/abhijit-v-696640216?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="px-6 py-2 border-2 border-yellow-500 text-yellow-600 rounded-full font-bold hover:bg-yellow-500/10 transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </section>

        {/* Our Counsellors */}
        <section className="mb-24 relative w-[100vw] max-w-[100vw] ml-[calc(50%-50vw)] px-4 md:px-12">
          <h2 className="text-3xl font-extrabold font-headline mb-12 text-center">Our Counsellors</h2>
          
          <div className="relative">
            {/* Left Fade Gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none"></div>
            
            {/* Right Fade Gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none"></div>

            <div className="overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <div ref={scrollRef} className="flex gap-4 sm:gap-6 md:gap-8" style={{ width: 'max-content' }}>
                {[...Array(2)].map((_, setIndex) => (
                  <div key={setIndex} className="flex gap-4 sm:gap-6 md:gap-8 shrink-0">
                    {counsellorsList.map((counsellor, index) => (
                      <div 
                        key={index}
                        className="w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px] bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl hover:border-slate-300 transition-all duration-300 flex flex-col shrink-0 group"
                      >
                        <div className="relative h-72 overflow-hidden shrink-0">
                          <img 
                            src={counsellor.image} 
                            alt={counsellor.name} 
                            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${counsellor.name === 'Dr. Anjali Bhardwaj' ? 'object-[50%_25%]' : 'object-top'}`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                          <div className="absolute bottom-4 left-6 right-6">
                            <h3 className="text-2xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">{counsellor.name}</h3>
                            <p className={`text-sm font-semibold uppercase tracking-wider drop-shadow-md hover:text-white transition-colors cursor-default ${counsellor.roleColor}`}>{counsellor.role}</p>
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow bg-slate-50/50 backdrop-blur-sm">
                          <p className={`text-slate-600 italic text-sm mb-5 leading-relaxed border-l-4 ${counsellor.accentColor} pl-4 relative group-hover:bg-slate-100/50 p-2 rounded-r-lg transition-colors`}>
                            {counsellor.quote}
                          </p>
                          <ul className="space-y-2.5 text-sm">
                            {counsellor.bullets.map((b, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2 hover:translate-x-1 transition-transform">
                                <span className={`w-1.5 h-1.5 rounded-full ${b.color} mt-1.5 shrink-0 shadow-sm`}></span>
                                <span className="text-slate-700"><strong className="text-slate-900 group-hover:text-primary transition-colors">{b.label}</strong> {b.value}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-slate-900 text-white p-6 sm:p-8 md:p-12 lg:p-20 rounded-[2rem] sm:rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 sm:mb-8 relative z-10">Get in Touch</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-12 relative z-10">
            Discover how Careerदिशा, powered by ZeOpto, can guide you toward the right career path and help you unlock your true potential.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8 relative z-10">
            <div className="flex items-center justify-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10">
              <Phone className="w-6 h-6 text-primary" />
              <span className="font-bold">+91-9289191164</span>
            </div>
            <a href="mailto:hr@zeopto.com" className="flex items-center justify-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <Mail className="w-6 h-6 text-secondary" />
              <span className="font-bold">hr@zeopto.com</span>
            </a>
            <a href="https://ZeOpto.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group">
              <Globe className="w-6 h-6 text-tertiary group-hover:rotate-12 transition-transform" />
              <span className="font-bold">Visit ZeOpto</span>
            </a>
          </div>
          <p className="mt-12 text-white/60 text-base md:text-lg max-w-3xl mx-auto leading-relaxed relative z-10">
            Careerदिशा empowers individuals with the right direction, backed by ZeOpto’s expertise and commitment to excellence
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 py-12 px-8 w-full">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-xs font-medium tracking-widest">
            {COPYRIGHT_TEXT}
          </p>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm shadow-2xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl pb-6"
          >
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
              <h3 className="text-2xl font-headline font-bold text-on-surface">Contact Form</h3>
              <button 
                onClick={() => setIsContactModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface p-2 rounded-full hover:bg-surface transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 pb-2 space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none border-r border-outline-variant/20 pr-4 py-2 my-1">
                  <User className="h-5 w-5 text-on-surface-variant" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full pl-16 pr-4 py-4 bg-transparent border border-outline-variant/30 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none border-r border-outline-variant/20 pr-4 py-2 my-1">
                  <Phone className="h-5 w-5 text-on-surface-variant" />
                </div>
                <input
                  type="tel"
                  placeholder="Enter your contact number"
                  className="w-full pl-16 pr-4 py-4 bg-transparent border border-outline-variant/30 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div className="relative">
                <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none border-r border-outline-variant/20 pr-4 bottom-4">
                  <MessageSquare className="h-5 w-5 text-on-surface-variant" />
                </div>
                <textarea
                  placeholder="Enter your message"
                  rows={4}
                  className="w-full pl-16 pr-4 py-4 bg-transparent border border-outline-variant/30 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                ></textarea>
              </div>
            </div>
            <div className="px-6">
              <button 
                className="w-full py-4 bg-[#1e8e52] hover:bg-[#167843] text-white rounded-xl font-bold transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 group"
                onClick={() => setIsContactModalOpen(false)}
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Submit
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}






