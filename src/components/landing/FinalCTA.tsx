/** FinalCTA — "Ready to find your career direction?" CTA section. */
import { motion } from 'motion/react';

export default function FinalCTA() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto rounded-2xl sm:rounded-[3rem] bg-slate-900 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative z-10 px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4 sm:mb-6">Ready to find your career direction?</h2>
          <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-12">Join 5,000+ others who have engaged with our professional career guidance and found their calling with Careerदिशा's unique psychological approach to career planning.</p>
          <motion.div animate={{ y: [-8, 8, -8] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
            <a href="https://lifemap.mycareerdisha.com/" target="_blank" rel="noopener noreferrer" aria-label="Start Assessment Now - Career Discovery" className="bg-accent hover:bg-accent/90 text-slate-900 font-extrabold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 rounded-full shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all hover:scale-105 active:scale-95 inline-block">START ASSESSMENT NOW</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
