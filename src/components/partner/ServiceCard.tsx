/**
 * ServiceCard — Reusable card for Partner page services section.
 * Features hover scale, shadow expansion, and accent border reveal.
 */
import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  highlight: string;
  badge?: string;
  accentColor: string;
  delay?: number;
}

export default function ServiceCard({ icon, title, description, highlight, badge, accentColor, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-default"
    >
      {/* Top accent bar (reveals on hover) */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${accentColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>

      {/* Badge */}
      {badge && (
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 ${accentColor.replace('bg-', 'bg-')}/10 ${accentColor.replace('bg-', 'text-')} text-xs font-bold uppercase tracking-wider rounded-full border ${accentColor.replace('bg-', 'border-')}/20`}>
            {badge}
          </span>
        </div>
      )}

      <div className="p-8">
        {/* Icon */}
        <div className={`w-14 h-14 ${accentColor.replace('bg-', 'bg-')}/10 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]`}>
          <div className={`${accentColor.replace('bg-', 'text-')} transition-colors duration-300`}>
            {icon}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">{title}</h3>
        <p className="text-slate-500 leading-relaxed mb-6 text-sm">{description}</p>

        {/* Highlight chip */}
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${accentColor} animate-pulse`}></div>
          <span className="text-sm font-semibold text-slate-700">{highlight}</span>
        </div>
      </div>
    </motion.div>
  );
}
