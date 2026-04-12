import { useRef } from 'react';
import { ArrowLeft, Play, Youtube, BookOpen, ExternalLink, ChevronLeft, ChevronRight, Phone, Mail, Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface InsightsProps {
  onBack: () => void;
}

const videos = [
  { id: '2RBDdsniaHw', title: 'Career Guidance Session 1' },
  { id: 'U2QHNZmi-XY', title: 'SAP Consulting Insights' },
  { id: 'zkBlpi7JYnw', title: 'Future of Work' },
  { id: 'aEpR8tV8q4M', title: 'Industry Trends 2024' },
  { id: 'K0YPVQ86Evc', title: 'Professional Training' },
  { id: 'u88FY029G38', title: 'Career Pivot Strategies' },
  { id: 'OzB5Pnxmi04', title: 'Digital Transformation' },
  { id: 'exDfZcx_Hbc', title: 'Mentorship Matters' },
  { id: 'qVb1SwMaJk4', title: 'Skill Development' },
  { id: 'Bo3Ptle_m7U', title: 'Career Roadmap Guide' },
  { id: 'nReiaWKEtBI', title: 'Success Stories' },
  { id: '3NKy0EwZ_9Q', title: 'Leadership & Vision' },
  { id: 'Bc0JIM4utyM', title: 'CareerSaathi Overview' },
];

const mockBlogs = [
  {
    title: "Is adopting career in SAP is viable Opt...",
    excerpt: "Is Adopting a Career in SAP for Fresher Graduates a Viable Option? In toda...",
    date: "7-Sep-2025",
    category: "Career Advice",
    image: "https://picsum.photos/seed/sap-career/800/600",
    link: "https://zeopto.com/blog-details.php?slug=is-adopting-career-in-sap-is-viable-option-"
  },
  {
    title: "ZeOpto Workshop at Amrapali University -...",
    excerpt: "Learning is always special when it connects with real-world opportunities. Our recent SAP Worksho...",
    date: "30-Sep-2025",
    category: "Workshop",
    image: "https://picsum.photos/seed/workshop/800/600",
    link: "https://zeopto.com/blog-details.php?slug=zeopto-workshop-at-amrapali-university---a-journey-of-learning-growth"
  },
  {
    title: "Best SAP FICO Training Institute | ZeOpt...",
    excerpt: "SAP FICO Training. Choosing the right SAP FICO training institute in Noida can shape your ca...",
    date: "6-Nov-2025",
    category: "Training",
    image: "https://picsum.photos/seed/fico/800/600",
    link: "https://zeopto.com/blog-details.php?slug=best-sap-fico-training-institute-zeopto"
  },
  {
    title: "Best SAP MM Training Institute in Noida ...",
    excerpt: "SAP MM is one of the most important modules in the SAP system and is widely used in industries th...",
    date: "16-Nov-2025",
    category: "Training",
    image: "https://picsum.photos/seed/mm/800/600",
    link: "https://zeopto.com/blog-details.php?slug=best-sap-mm-training-institute-in-noida-zeopto"
  },
  {
    title: "Best SAP Training Institute in Noida | Z...",
    excerpt: "Best SAP Training Institute in Noida. SAP is one of the most widely used business software...",
    date: "15-Dec-2025",
    category: "Education",
    image: "https://picsum.photos/seed/noida/800/600",
    link: "https://zeopto.com/blog-details.php?slug=best-sap-training-institute-in-noida-zeopto"
  },
  {
    title: "ZeOpto Workshop at Graphic Era Universit...",
    excerpt: "ZeOpto Workshop at Graphic Era University – Industry-Focused Learning Experience...",
    date: "5-Feb-2026",
    category: "Workshop",
    image: "https://picsum.photos/seed/graphic-era/800/600",
    link: "https://zeopto.com/blog-details.php?slug=zeopto-workshop-at-graphic-era-university-empowering-students-with-industry-ready-it-sap-skills"
  },
  {
    title: "SAP Classes in Noida...",
    excerpt: "SAP Classes in Noida: Learn SAP with Practical Training at ZeOpto. Today, com...",
    date: "5-Feb-2026",
    category: "Training",
    image: "https://picsum.photos/seed/classes/800/600",
    link: "https://zeopto.com/blog-details.php?slug=sap-classes-in-noida"
  }
];

export default function Insights({ onBack }: InsightsProps) {
  const logoUrl = "https://lh3.googleusercontent.com/aida/ADBb0ugzZSaguePFRojyoy0_LCdEqum7gnG2tQ-k4pS5jxWATdQPiZIKEIJSYirhb_Njis6PhjMuh6DBsMIG7ZExcapPd5TsG4tkiZsV0T1FRJvNspOS58iifjbtlgCEeaDLgotTd8LiaXo8DzK4StNrj7RIv1s5ZDoF_2Fewb9woZ_7pYT6ywrFYyCLjvYmEuIcHmgTzFiJEgWaiNcV_mJQ3nU0IWzmomFRY65BOerkbx6sKIAzXp5dYrC2tq3iHs8ZR8cMn96kHipPuLM";
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

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

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold font-headline text-on-surface tracking-tight mb-6">
            <span className="text-primary">Insights</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
            Stay updated with the latest industry trends, expert mentorship sessions, and career guidance from the visionaries at Careerदिशा.
          </p>
        </motion.section>

        {/* YouTube Section */}
        <section className="mb-24 relative">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                <Youtube className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-extrabold font-headline">YouTube Videos</h2>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full border border-outline-variant/20 flex items-center justify-center hover:bg-white hover:shadow-md transition-all active:scale-90"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full border border-outline-variant/20 flex items-center justify-center hover:bg-white hover:shadow-md transition-all active:scale-90"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-10 no-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            {videos.map((video, index) => (
              <motion.div 
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="min-w-[300px] md:min-w-[400px] group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-outline-variant/10 hover:shadow-xl transition-all snap-center"
              >
                <div className="aspect-video relative overflow-hidden bg-slate-100">
                  <iframe 
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <h3 className="font-bold text-on-surface line-clamp-1">{video.title}</h3>
                  <div className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-5 h-5 fill-current" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Blogs Section Placeholder */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-7 h-7" />
            </div>
            <h2 className="text-3xl font-extrabold font-headline">Latest Blogs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockBlogs.map((blog, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[2.5rem] border border-outline-variant/10 flex flex-col overflow-hidden hover:shadow-xl transition-all group"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                    {blog.date}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest mb-4 block">{blog.category}</span>
                  <h3 className="text-xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors">{blog.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6 line-clamp-3">{blog.excerpt}</p>
                  <div className="mt-auto pt-6 border-t border-outline-variant/10 flex items-center justify-between">
                    <a 
                      href={blog.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Read More <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-outline font-medium italic">More blogs coming soon...</p>
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
            <a href="mailto:hr@zeopto.com" className="flex items-center justify-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <Mail className="w-6 h-6 text-secondary" />
              <span className="font-bold">hr@zeopto.com</span>
            </a>
            <a href="https://zeopto.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group">
              <Globe className="w-6 h-6 text-tertiary group-hover:rotate-12 transition-transform" />
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
            © 2024 Careerदिशा — Empowering Your Professional Future
          </p>
        </div>
      </footer>
    </div>
  );
}
