/** Methodology — "The Psychological Journey" 4-step section. */
import { Users, HelpCircle, Brain, Route } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
  { icon: <Users className="w-8 h-8" />, title: "Pre-counselling", desc: "Initial consultation to understand your career aspirations, current challenges, and set expectations.", color: "bg-tertiary shadow-tertiary/20", textColor: "text-white", delay: 0.1 },
  { icon: <HelpCircle className="w-8 h-8" />, title: "Assessment", desc: "Identify your core strengths, interests, and subconscious personality drivers via our gold-standard survey.", color: "bg-primary shadow-primary/20", textColor: "text-white", delay: 0.2 },
  { icon: <Brain className="w-8 h-8" />, title: "AI Analysis", desc: "Our advanced models process 500+ data points to match your unique profile against global industry trends.", color: "bg-secondary shadow-secondary/20", textColor: "text-white", delay: 0.3 },
  { icon: <Route className="w-8 h-8" />, title: "Personalized Actionable Roadmaps", desc: "Receive a comprehensive, multi-year blueprint tailored to your psychology. Our roadmaps include specific skill acquisition paths, verified college recommendations, and direct connections to industry mentors.", color: "bg-accent shadow-accent/20", textColor: "text-slate-900", isSpecial: true as const, delay: 0.4 }
];

export default function Methodology() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 mt-8 sm:mt-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat pointer-events-none" style={{ backgroundImage: "url('/PsychologicalJourney.png')", maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent), linear-gradient(to bottom, transparent, black 10%, black 75%, transparent)", maskComposite: "intersect", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent), linear-gradient(to bottom, transparent, black 10%, black 75%, transparent)", WebkitMaskComposite: "source-in" as any }}>
        <div className="absolute inset-0 bg-surface/40 backdrop-blur-[2px]"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-4">
          <div className="max-w-xl">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Our Methodology</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">The Psychological Journey</h2>
          </div>
          <p className="text-on-surface-variant max-w-sm font-medium mb-1">We move you from confusion to confidence through three core scientific stages.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 relative mt-10 md:mt-16">
          <div className="hidden md:block absolute top-[2rem] left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-tertiary/30 via-primary/30 to-accent/30 -z-10"></div>
          {steps.map((step, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, scale: 0.9, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: step.delay, type: "spring", stiffness: 100 }} className={`relative text-center group ${'isSpecial' in step && step.isSpecial ? 'p-6 rounded-3xl bg-accent/5 border-2 border-accent/20 shadow-xl mt-[-1.5rem]' : ''}`}>
              {'isSpecial' in step && step.isSpecial && (
                <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-accent text-slate-900 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md border border-slate-900/10">Core Platform Feature</motion.div>
              )}
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring" }} className={`w-16 h-16 ${step.color} ${step.textColor} rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl relative z-10`}>{step.icon}</motion.div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className={`text-on-surface-variant leading-relaxed ${'isSpecial' in step && step.isSpecial ? 'px-2 text-sm font-medium' : 'px-4'}`}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
