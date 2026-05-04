/**
 * PathSelector — Interactive "Select Your Path" section.
 * Cards expand inline to reveal details — NO navigation on click.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { School, User, Building2, GraduationCap, ChevronDown, CheckCircle2 } from 'lucide-react';

const paths = [
  {
    id: 'schools',
    icon: <School className="w-7 h-7" />,
    title: 'Schools',
    subtitle: 'K-12 Institutions',
    color: 'blue',
    description: 'Transform your school into a career-ready institution. Our Careerदिशा Labs integrate seamlessly into your academic structure, providing students with AI-powered career assessments starting from Class 8.',
    benefits: ['AI-powered career labs for students', 'Teacher training & certification', 'Parent engagement workshops', 'Annual career readiness reports', 'CSR project eligibility'],
    stat: '200+ Schools',
    statLabel: 'Already Partnered',
  },
  {
    id: 'individuals',
    icon: <User className="w-7 h-7" />,
    title: 'Individuals',
    subtitle: 'Career Counsellors & Coaches',
    color: 'amber',
    description: 'Launch or scale your career counselling practice with our globally recognized certification program. Get access to world-class assessment technology, training modules, and a ready-to-use business model.',
    benefits: ['Certified Career Analyst (CCA) credential', 'Full assessment technology access', 'Business setup & marketing support', 'Client management dashboard', 'Community of 500+ counsellors'],
    stat: 'CCA Certified',
    statLabel: 'Global Recognition',
  },
  {
    id: 'corporates',
    icon: <Building2 className="w-7 h-7" />,
    title: 'Corporates',
    subtitle: 'HR & Talent Teams',
    color: 'red',
    description: 'Elevate your HR function with data-driven competency assessments. Our HR Miles program helps you hire better, develop smarter, and retain longer through psychometric-backed evaluation frameworks.',
    benefits: ['Pre-hiring competency assessments', 'Employee development mapping', 'Leadership potential identification', 'Team dynamics analysis', 'Custom report branding'],
    stat: 'B2B Focus',
    statLabel: 'Enterprise Ready',
  },
  {
    id: 'institutions',
    icon: <GraduationCap className="w-7 h-7" />,
    title: 'Institutions',
    subtitle: 'Universities & Training Centers',
    color: 'emerald',
    description: 'Embed career guidance into your curriculum. Our co-branded technology platform lets you offer premium career assessments under your institutional brand, enhancing student outcomes and placement rates.',
    benefits: ['Co-branded assessment platform', 'White-label options available', 'Placement readiness programs', 'Faculty development modules', 'Student engagement analytics'],
    stat: '24hr Setup',
    statLabel: 'Quick Deployment',
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; bgLight: string; ring: string }> = {
  blue:    { bg: 'bg-blue-600',    text: 'text-blue-600',    border: 'border-blue-600',    bgLight: 'bg-blue-50',    ring: 'ring-blue-200' },
  amber:   { bg: 'bg-[#fba70c]',   text: 'text-[#d97706]',   border: 'border-[#fba70c]',   bgLight: 'bg-amber-50',   ring: 'ring-amber-200' },
  red:     { bg: 'bg-red-500',     text: 'text-red-500',     border: 'border-red-500',     bgLight: 'bg-red-50',     ring: 'ring-red-200' },
  emerald: { bg: 'bg-emerald-600', text: 'text-emerald-600', border: 'border-emerald-600', bgLight: 'bg-emerald-50', ring: 'ring-emerald-200' },
};

export default function PathSelector() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-slate-50 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#fba70c]/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3 block">Find Your Fit</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Select Your Path</h2>
          <div className="h-1 w-20 bg-[#fba70c] mx-auto rounded-full mb-6"></div>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg">Choose the partnership model that aligns with your goals. Click to explore what each path offers.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paths.map((path, idx) => {
            const colors = colorMap[path.color];
            const isExpanded = expandedId === path.id;

            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                layout
                className={`bg-white rounded-2xl border-2 overflow-hidden transition-all duration-500 cursor-pointer ${isExpanded ? `${colors.border} shadow-xl ${colors.ring} ring-4` : 'border-slate-100 shadow-sm hover:shadow-lg hover:border-slate-200'}`}
                onClick={() => setExpandedId(isExpanded ? null : path.id)}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${isExpanded ? `${colors.bg} text-white shadow-lg` : `${colors.bgLight} ${colors.text}`}`}>
                        {path.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{path.title}</h3>
                        <p className="text-slate-400 text-sm font-semibold">{path.subtitle}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2"
                    >
                      <ChevronDown className={`w-5 h-5 transition-colors ${isExpanded ? colors.text : 'text-slate-400'}`} />
                    </motion.div>
                  </div>

                  {/* Stat badge (always visible) */}
                  <div className="mt-4 flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${colors.bgLight} ${colors.text}`}>
                      {path.stat}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">{path.statLabel}</span>
                  </div>

                  {/* Expandable content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 pt-6 border-t border-slate-100">
                          <p className="text-slate-600 leading-relaxed mb-6">{path.description}</p>
                          <div className="space-y-3">
                            {path.benefits.map((benefit, bIdx) => (
                              <motion.div
                                key={bIdx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: bIdx * 0.08 }}
                                className="flex items-center gap-3"
                              >
                                <CheckCircle2 className={`w-5 h-5 ${colors.text} shrink-0`} />
                                <span className="text-sm font-medium text-slate-700">{benefit}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
