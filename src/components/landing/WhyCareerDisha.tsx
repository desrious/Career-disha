/** WhyCareerDisha — Bento grid "Why Choose Our Career Guidance" section. */
import { Award, Bot, Route, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { LOGO_URL } from '../../data/constants';

export default function WhyCareerDisha() {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-10 sm:mb-16 md:mb-20 flex flex-col items-center">
          <img src={LOGO_URL} alt="Careerदिशा Logo" className="h-16 md:h-20 mb-6 object-contain" referrerPolicy="no-referrer" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">Why Choose Our Career Guidance</h2>
          <p className="max-w-2xl mx-auto text-on-surface-variant text-lg">We combine human psychology with advanced intelligence to provide career counselling and professional career guidance that actually helps you choose the right career.</p>            </div>            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.1 }} whileHover={{ scale: 0.98 }} className="md:col-span-7 bg-primary-container p-6 sm:p-8 md:p-12 rounded-[2rem] flex flex-col justify-between text-on-primary-container relative overflow-hidden group">
            <div className="relative z-10">
              <motion.div className="inline-block transform origin-center transition-transform" whileHover={{ rotate: 10, scale: 1.1 }}><Award className="w-12 h-12 mb-6" /></motion.div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Psychologically Grounded</h3>
              <p className="text-on-primary-container/80 text-lg max-w-md">Our assessments aren't just tests; they are deep-dives into personality frameworks used by top career psychologists globally.</p>
            </div>
            <div className="absolute right-[-50px] bottom-[-50px] opacity-10 group-hover:scale-110 transition-transform duration-700"><ShieldCheck className="w-[300px] h-[300px]" /></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.2 }} whileHover={{ scale: 1.02 }} className="md:col-span-5 bg-secondary-container p-6 sm:p-8 md:p-12 rounded-[2rem] flex flex-col justify-center text-on-secondary-container group">
            <div className="bg-white/20 p-4 rounded-2xl w-fit mb-6 transition-transform group-hover:-rotate-6 group-hover:scale-110 duration-300"><Bot className="w-10 h-10" /></div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Expert Career Advice</h3>
            <p className="text-on-secondary-container/80 text-lg">24/7 access to career advice for students that helps decode complex career path guidance based on your unique profile.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.3 }} whileHover={{ scale: 1.02 }} className="md:col-span-5 bg-tertiary-fixed p-6 sm:p-8 md:p-12 rounded-[2rem] flex flex-col justify-center text-on-tertiary-fixed group">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3 flex-wrap">
              Actionable Career Plans
              <Route className="w-8 h-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
            </h3>
            <p className="text-on-tertiary-fixed-variant text-lg">No generic career advice. We provide structured career planning, targeted dates, links to courses, and specific jobs to aim for.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.4 }} className="md:col-span-7 bg-indigo-50 border border-indigo-100 p-6 sm:p-8 md:p-12 rounded-[2rem] flex flex-col justify-center relative overflow-hidden">
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-4 border-white bg-indigo-200"></motion.div>
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-4 border-white bg-indigo-300"></motion.div>
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-4 border-white bg-indigo-400"></motion.div>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-indigo-900">10,000+</p>
                <p className="text-indigo-700 text-sm sm:text-lg font-semibold mt-1">Careers transformed this year</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
