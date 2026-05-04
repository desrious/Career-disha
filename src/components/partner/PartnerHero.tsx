/**
 * PartnerHero — Hero section for the Partner page with gradient background,
 * animated abstract shapes, and a CTA button.
 */
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PartnerHeroProps {
  onCTAClick: () => void;
}

export default function PartnerHero({ onCTAClick }: PartnerHeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"></div>

      {/* Animated Abstract Shapes */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-[#fba70c]/10 blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] left-[15%] w-[300px] h-[300px] rounded-full border border-white/5 pointer-events-none"
      />
      <motion.div
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[20%] right-[15%] w-[250px] h-[250px] rounded-full border border-blue-400/10 pointer-events-none"
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23fff' stroke-width='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")" }}></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-400/20 rounded-full text-blue-300 text-sm font-semibold tracking-wider uppercase mb-8">
              <Sparkles className="w-4 h-4" />
              Partnership Program
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight"
          >
            Partner With{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-400 via-blue-300 to-[#fba70c] bg-clip-text text-transparent">Careerदिशा</span>
              <motion.span
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                className="absolute bottom-1 md:bottom-2 left-0 h-2 md:h-3 bg-[#fba70c]/30 rounded-full z-0"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-lg sm:text-xl text-blue-100/70 mb-10 leading-relaxed max-w-2xl font-medium"
          >
            Join India's fastest-growing career guidance ecosystem. Collaborate with us to transform careers at scale — from schools to corporates — powered by cutting-edge AI technology and psychology-driven assessments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              onClick={onCTAClick}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-3 bg-[#fba70c] hover:bg-[#d97706] text-slate-900 font-extrabold text-lg px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(251,167,12,0.25)] transition-all duration-300"
            >
              Become a Partner
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.a
              href="#services"
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white/40 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:bg-white/5"
            >
              Explore Programs
            </motion.a>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl"
        >
          {[
            { value: "10K+", label: "Careers Guided" },
            { value: "50+", label: "Partner Institutions" },
            { value: "4", label: "Partnership Models" },
            { value: "15+", label: "Years Experience" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center sm:text-left">
              <p className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{stat.value}</p>
              <p className="text-blue-300/60 text-sm font-semibold tracking-wider uppercase">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
