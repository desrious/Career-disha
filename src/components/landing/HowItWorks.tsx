/**
 * HowItWorks — "From Career Confusion to Clarity" 3-step section.
 */
import { HelpCircle, Brain, Route } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
  {
    icon: <HelpCircle className="w-10 h-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />,
    title: "Assessment",
    desc: "Take our gold-standard psychometric test to uncover your hidden strengths and interests.",
    bg: "bg-primary/10 text-primary",
    bgHover: "group-hover:bg-primary group-hover:text-white group-hover:shadow-lg"
  },
  {
    icon: <Brain className="w-10 h-10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" />,
    title: "AI Analysis",
    desc: "Receive deep mentor insights as our AI maps your profile against 500+ modern career paths.",
    bg: "bg-secondary/10 text-secondary",
    bgHover: "group-hover:bg-secondary group-hover:text-white group-hover:shadow-lg"
  },
  {
    icon: <Route className="w-10 h-10 group-hover:scale-110 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />,
    title: "Personalized Career Roadmap",
    desc: "Get an actionable, step-by-step path including skill requirements and college recommendations.",
    bg: "bg-balance/20 text-balance",
    bgHover: "group-hover:bg-balance group-hover:shadow-lg"
  }
];

export default function HowItWorks() {
  return (
    <section className="relative pt-12 sm:pt-16 pb-16 sm:pb-24 bg-surface px-4 sm:px-6 md:px-8 border-b border-slate-100 overflow-hidden" id="how-it-works">
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20">
        <img src="/confusiontoclarity.png" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-4">From Career Confusion to Clarity</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto font-medium">Three simple steps of career planning to unlock your professional potential and choose the right career.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {steps.map((step, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} whileHover={{ y: -8 }} transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }} className="relative text-center group cursor-default">
              <div className={`w-20 h-20 ${step.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${step.bgHover}`}>{step.icon}</div>
              <h3 className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-primary">{step.title}</h3>
              <p className="text-on-surface-variant leading-relaxed px-4">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
