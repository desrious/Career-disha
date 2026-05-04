/** TailoredGuidance — "Tailored Guidance For You" 3-card section. */
import { School, Code, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

const cards = [
  {
    icon: <School className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />,
    title: "School Students",
    desc: "Choosing a stream after 10th or 12th is the first big crossroads. We help you navigate Science, Commerce, and Arts with deep-dive personality insights.",
    features: ["Stream Selection", "Aptitude Analysis"],
    themeMap: { bgDecor: "bg-primary/5", bgDecorHover: "group-hover:bg-primary/10", iconBg: "bg-primary/10", iconText: "text-primary", iconBgHover: "group-hover:bg-primary", iconTextHover: "group-hover:text-white", titleHover: "group-hover:text-primary" }
  },
  {
    icon: <Code className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />,
    title: "College Learners",
    desc: "Bridge the gap between your degree and the industry. We provide skill-specific roadmaps and internship strategies to get you job-ready.",
    features: ["Internship Strategy", "Skill Gap Mapping"],
    themeMap: { bgDecor: "bg-secondary/5", bgDecorHover: "group-hover:bg-secondary/10", iconBg: "bg-secondary/10", iconText: "text-secondary", iconBgHover: "group-hover:bg-secondary", iconTextHover: "group-hover:text-white", titleHover: "group-hover:text-secondary" }
  },
  {
    icon: <TrendingUp className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />,
    title: "Working Professionals",
    desc: "Ready for a change? We analyze your transferable skills and provide a step-by-step blueprint for a successful career pivot into Technology, Management or Design.",
    features: ["Career Pivoting", "Executive Mentorship"],
    themeMap: { bgDecor: "bg-red-500/5", bgDecorHover: "group-hover:bg-red-500/10", iconBg: "bg-red-500/10", iconText: "text-red-500", iconBgHover: "group-hover:bg-red-50", iconTextHover: "group-hover:text-red-600", titleHover: "group-hover:text-red-600" }
  }
];

export default function TailoredGuidance() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden" id="about">
      <div className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('/TailoredGuidance.png')", maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent), linear-gradient(to bottom, transparent, black 10%, black 75%, transparent)", maskComposite: "intersect", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent), linear-gradient(to bottom, transparent, black 10%, black 75%, transparent)", WebkitMaskComposite: "source-in" as any }}>
        <div className="absolute inset-0 bg-surface-container-low/70 backdrop-blur-[2px]"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface">Tailored Guidance For You</h2>
          <div className="h-1 w-20 bg-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-on-surface-variant max-w-2xl mx-auto font-medium">Whether you're starting out or scaling up, we provide the roadmap to your unique potential.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} whileHover={{ y: -10 }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-slate-200">
              <div className={`absolute top-0 right-0 w-32 h-32 ${card.themeMap.bgDecor} rounded-bl-[100px] -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-[1.5] ${card.themeMap.bgDecorHover}`}></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <div className={`w-14 h-14 ${card.themeMap.iconBg} ${card.themeMap.iconText} rounded-xl flex items-center justify-center mb-8 relative z-10 transition-colors duration-300 ${card.themeMap.iconBgHover} ${card.themeMap.iconTextHover}`}>{card.icon}</div>
              <h3 className={`text-2xl font-extrabold mb-4 relative z-10 transition-colors duration-300 ${card.themeMap.titleHover}`}>{card.title}</h3>
              <p className="text-slate-500 mb-8 leading-relaxed relative z-10">{card.desc}</p>
              <ul className="space-y-3 mb-10 relative z-10">
                {card.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <ShieldCheck className="w-5 h-5 text-secondary group-hover:text-primary transition-colors duration-300" /> {feature}
                  </li>
                ))}
              </ul>
              <button onClick={() => alert("Feature coming soon!")} className="relative z-10 text-primary font-bold flex items-center gap-2 transition-all cursor-pointer mt-auto group/btn hover:text-accent">
                Start your Journey <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
