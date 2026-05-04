/**
 * PathSelector — Interactive "Select Your Path" section.
 * Cards expand inline to reveal details — NO navigation on click.
 * Reads path data from CMS.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { School, User, Building2, GraduationCap, ChevronDown, CheckCircle2 } from 'lucide-react';
import type { CmsPartnerPath } from '../../data/cms';

interface PathSelectorProps {
  paths: CmsPartnerPath[];
}

const iconMap: Record<string, React.ReactNode> = {
  schools: <School className="w-7 h-7" />,
  individuals: <User className="w-7 h-7" />,
  corporates: <Building2 className="w-7 h-7" />,
  institutions: <GraduationCap className="w-7 h-7" />,
};

const colorMap: Record<string, { bg: string; text: string; border: string; bgLight: string; ring: string }> = {
  blue:    { bg: 'bg-blue-600',    text: 'text-blue-600',    border: 'border-blue-600',    bgLight: 'bg-blue-50',    ring: 'ring-blue-200' },
  amber:   { bg: 'bg-[#fba70c]',   text: 'text-[#d97706]',   border: 'border-[#fba70c]',   bgLight: 'bg-amber-50',   ring: 'ring-amber-200' },
  red:     { bg: 'bg-red-500',     text: 'text-red-500',     border: 'border-red-500',     bgLight: 'bg-red-50',     ring: 'ring-red-200' },
  emerald: { bg: 'bg-emerald-600', text: 'text-emerald-600', border: 'border-emerald-600', bgLight: 'bg-emerald-50', ring: 'ring-emerald-200' },
};

const defaultColors = colorMap.blue;

export default function PathSelector({ paths }: PathSelectorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-slate-50 relative overflow-hidden">
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
            const colors = colorMap[path.color] ?? defaultColors;
            const isExpanded = expandedId === path.id;
            const icon = iconMap[path.id] ?? <GraduationCap className="w-7 h-7" />;

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
                        {icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{path.title}</h3>
                        <p className="text-slate-400 text-sm font-semibold">{path.subtitle}</p>
                      </div>
                    </div>
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }} className="mt-2">
                      <ChevronDown className={`w-5 h-5 transition-colors ${isExpanded ? colors.text : 'text-slate-400'}`} />
                    </motion.div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${colors.bgLight} ${colors.text}`}>
                      {path.stat}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">{path.statLabel}</span>
                  </div>

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
