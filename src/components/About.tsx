import { useState } from 'react';
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
  Send
} from 'lucide-react';
import { motion } from 'motion/react';
import ElectricBorder from './ElectricBorder';

interface AboutProps {
  onBack: () => void;
}

export default function About({ onBack }: AboutProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const logoUrl = "/CareerDishaLogo.png";

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-2 group">
            <img alt="CareerDisha Logo" className="h-10 w-auto object-contain" src={logoUrl} referrerPolicy="no-referrer" />
            <span className="text-xl font-extrabold text-blue-700 tracking-tighter font-headline">Careerदिशा</span>
          </button>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-on-surface-variant font-bold hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
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
          <h1 className="text-5xl md:text-7xl font-extrabold font-headline text-on-surface tracking-tight mb-8 leading-tight">
            About <span className="text-primary">Careerदिशा</span>
          </h1>
          <ElectricBorder color="#0057c2" speed={1} chaos={0.15} borderRadius={48} className="shadow-2xl">
            <div className="bg-white rounded-[3rem] p-8 md:p-12 text-left z-10 w-full h-full">
              <p className="text-xl text-on-surface-variant leading-relaxed mb-6">
                Careerदिशा, powered by <span className="font-bold text-primary">ZeOpto</span>, is built to bridge the gap between ambition and the right career path. Backed by ZeOpto’s strong foundation in SAP Consulting, IT Outsourcing, and Professional Training, Careerदिशा brings together technology, mentorship, and real-world insights to guide individuals toward meaningful careers.
              </p>
              <p className="text-xl text-on-surface-variant leading-relaxed">
                ZeOpto has established itself as a trusted SAP services company, delivering high-performance solutions through consulting, implementation, and training. With a team of certified experts and a focus on innovation, efficiency, and quality, ZeOpto helps organizations streamline operations, reduce costs, and achieve sustainable growth. Careerदिशा extends this same expertise to students and professionals, making career guidance smarter, data-driven, and accessible.
              </p>
            </div>
          </ElectricBorder>
        </motion.section>

        {/* What We Bring */}
        <section className="mb-24">
          <h2 className="text-3xl font-extrabold font-headline mb-12 text-center">What We Bring to You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-outline-variant/10 hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Expert-Backed Career Guidance</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Careerदिशा leverages ZeOpto’s industry expertise to provide structured and practical career direction aligned with real-world demands.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-outline-variant/10 hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="w-14 h-14 bg-yellow-500/10 text-yellow-600 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Skilled & Certified Mentors</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Guidance comes from experienced professionals and certified experts who understand both industry expectations and career growth pathways.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-outline-variant/10 hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="w-14 h-14 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Future-Ready Skill Development</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                From foundational learning to advanced career insights, our approach ensures individuals are prepared for evolving industry trends and opportunities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision, Mission, Ambition */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-primary text-white p-10 rounded-[2.5rem] relative overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Lightbulb className="w-6 h-6" /> Our Vision
            </h3>
            <p className="text-white/80 leading-relaxed font-medium">
              To empower individuals with clarity, confidence, and the right direction, while continuing ZeOpto’s vision of becoming a trusted partner in digital transformation and career development.
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-yellow-500 text-white p-10 rounded-[2.5rem] relative overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Target className="w-6 h-6" /> Our Mission
            </h3>
            <p className="text-white/80 leading-relaxed font-medium">
              To deliver value-driven guidance and solutions that enhance both career growth for individuals and performance for organizations.
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-amber-500 text-white p-10 rounded-[2.5rem] relative overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Rocket className="w-6 h-6" /> Our Ambition
            </h3>
            <p className="text-white/80 leading-relaxed font-medium">
              To create a unified ecosystem where learning, guidance, and industry expertise come together to drive 360-degree growth for students, professionals, and businesses.
            </p>
          </motion.div>
        </section>

        {/* Core Values */}
        <section className="mb-24 bg-gradient-to-br from-slate-900 to-blue-950 border border-blue-800/50 rounded-[3rem] p-12 shadow-2xl">
          <h2 className="text-3xl font-extrabold font-headline mb-12 text-center text-white">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div 
              whileHover={{ y: -8 }}
              className="text-center cursor-pointer group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20 shadow-inner"
              >
                <TrendingUp className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
              </motion.div>
              <h4 className="text-xl font-bold mb-2 text-white">Growth</h4>
              <p className="text-blue-100/70 text-sm leading-relaxed">We believe in continuous progress through learning, performance, and real-world application.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -8 }}
              className="text-center cursor-pointer group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-yellow-500/20 shadow-inner"
              >
                <Heart className="w-8 h-8 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
              </motion.div>
              <h4 className="text-xl font-bold mb-2 text-white">Trust</h4>
              <p className="text-blue-100/70 text-sm leading-relaxed">We build reliable relationships through transparency, guidance, and consistent support.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -8 }}
              className="text-center cursor-pointer group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-amber-500/20 shadow-inner"
              >
                <Award className="w-8 h-8 text-amber-400 group-hover:text-amber-300 transition-colors" />
              </motion.div>
              <h4 className="text-xl font-bold mb-2 text-white">Value</h4>
              <p className="text-blue-100/70 text-sm leading-relaxed">We focus on delivering meaningful impact that contributes to long-term success.</p>
            </motion.div>
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
                <CheckCircle2 className="w-6 h-6 text-yellow-500" /> Industry-aligned career strategies
              </li>
              <li className="flex items-center gap-3 font-bold text-on-surface">
                <CheckCircle2 className="w-6 h-6 text-amber-500" /> Personalized and scalable guidance
              </li>
              <li className="flex items-center gap-3 font-bold text-on-surface">
                <CheckCircle2 className="w-6 h-6 text-yellow-500" /> Integration of learning, mentorship, and real-world insights
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
            <motion.div 
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm hover:shadow-2xl transition-shadow flex flex-col h-full cursor-pointer"
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-primary/10 rounded-xl overflow-hidden shrink-0">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    src="/GunjanSir.jpeg" 
                    alt="Mr. Gunjan Tewari" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <div>
                  <h4 className="text-2xl font-bold">Mr. Gunjan Tewari</h4>
                  <p className="text-primary font-bold text-sm uppercase tracking-widest">Founder & Director</p>
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <p className="text-on-surface-variant leading-relaxed mb-6">
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
            </motion.div>
            <motion.div 
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm hover:shadow-2xl transition-shadow flex flex-col h-full cursor-pointer"
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-yellow-500/10 rounded-xl overflow-hidden shrink-0">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    src="/AbhijeetSir.jpeg" 
                    alt="Mr. Abhijit Vyas" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <div>
                  <h4 className="text-2xl font-bold">Mr. Abhijit Vyas</h4>
                  <p className="text-yellow-600 font-bold text-sm uppercase tracking-widest">Co-founder & Director</p>
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <p className="text-on-surface-variant leading-relaxed mb-6">
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
                <a href="https://in.linkedin.com/in/abhijit-vyas-696640216" target="_blank" rel="noopener noreferrer" className="px-6 py-2 border-2 border-yellow-500 text-yellow-600 rounded-full font-bold hover:bg-yellow-500/5 transition-colors">LinkedIn</a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-slate-900 text-white p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          <h2 className="text-4xl font-extrabold mb-8 relative z-10">Get in Touch</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-12 relative z-10">
            Discover how Careerदिशा, powered by ZeOpto, can guide you toward the right career path and help you unlock your true potential.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8 relative z-10">
            <div className="flex items-center justify-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10">
              <Phone className="w-6 h-6 text-primary" />
              <span className="font-bold">+91-9953280036</span>
            </div>
            <a href="mailto:hr@ZeOpto.com" className="flex items-center justify-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <Mail className="w-6 h-6 text-yellow-400" />
              <span className="font-bold">hr@ZeOpto.com</span>
            </a>
            <a href="https://ZeOpto.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group">
              <Globe className="w-6 h-6 text-amber-500 group-hover:rotate-12 transition-transform" />
              <span className="font-bold">Visit ZeOpto</span>
            </a>
          </div>
          <p className="mt-12 text-white/40 text-sm font-medium uppercase tracking-widest">
            Careerदिशा empowers individuals with the right direction, backed by ZeOpto’s expertise and commitment to excellence.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 py-12 px-8 w-full">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">
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
