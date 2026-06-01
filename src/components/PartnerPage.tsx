/**
 * PartnerPage — Full "Partner With Us" page.
 * Composed of: PartnerHero, Services grid, PathSelector, Why Partner section, and CTA.
 * All content is CMS-driven via the `data` prop.
 */
import { ArrowLeft, GraduationCap, School, Building2, Code2, ShieldCheck, Headphones, Rocket, Award, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { LOGO_URL, COPYRIGHT_TEXT } from '../data/constants';
import type { CmsPartner } from '../data/cms';
import PartnerHero from './partner/PartnerHero';
import ServiceCard from './partner/ServiceCard';
import PathSelector from './partner/PathSelector';

interface PartnerPageProps {
  onBack: () => void;
  data: CmsPartner;
}

const serviceIconMap: Record<string, React.ReactNode> = {
  'career-counsellor': <GraduationCap className="w-7 h-7" />,
  'school-labs': <School className="w-7 h-7" />,
  'corporate': <Building2 className="w-7 h-7" />,
  'cobranded': <Code2 className="w-7 h-7" />,
};

const whyIconMap: Record<string, React.ReactNode> = {
  'training': <Award className="w-8 h-8" />,
  'tech': <Code2 className="w-8 h-8" />,
  'support': <Headphones className="w-8 h-8" />,
  'launch': <Rocket className="w-8 h-8" />,
};

export default function PartnerPage({ onBack, data }: PartnerPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 font-body text-on-surface">
      {/* Top Navbar */}
      <header className="fixed top-0 w-full h-16 bg-white/90 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <img alt="Careerदिशा Logo" className="h-10 sm:h-12 w-auto object-contain cursor-pointer" src={LOGO_URL} referrerPolicy="no-referrer" onClick={onBack} />
          <div className="hidden sm:block h-6 w-px bg-slate-200"></div>
          <span className="hidden sm:block text-blue-700 font-bold text-sm uppercase tracking-widest">Partner Program</span>
        </div>
        <button onClick={onBack} className="flex items-center gap-2 text-slate-700 hover:text-blue-700 font-semibold transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </button>
      </header>

      <div className="pt-16">
        {/* Hero Section */}
        <PartnerHero data={data.hero} />

        {/* Services Section */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 relative overflow-hidden" id="services">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20.5z' fill='%23000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")" }}></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-[#fba70c] font-bold tracking-widest uppercase text-xs mb-3 block">Our Offerings</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Partnership Programs</h2>
              <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full mb-6"></div>
              <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg">Four distinct programs designed to fit your ambition — whether you're an educator, entrepreneur, or enterprise.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.services.map((service, idx) => (
                <ServiceCard
                  key={service.id}
                  icon={serviceIconMap[service.id] ?? <GraduationCap className="w-7 h-7" />}
                  title={service.title}
                  description={service.description}
                  highlight={service.highlight}
                  badge={service.badge}
                  accentColor={service.accentColor}
                  delay={idx * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Select Your Path */}
        <PathSelector paths={data.paths} />

        {/* Why Partner with Us */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3 block">The Advantage</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Why Partner with Careerदिशा?</h2>
              <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg">We don't just offer a program — we deliver a complete career guidance ecosystem.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.whyPartner.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring" }}
                    className={`w-16 h-16 ${item.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    {whyIconMap[item.id] ?? <Award className="w-8 h-8" />}
                  </motion.div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 md:px-8" id="partner-contact">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-[2rem] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-500/15 blur-[100px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-[#fba70c]/15 blur-[80px] pointer-events-none"></div>

              <div className="relative z-10 px-6 sm:px-10 md:px-16 py-16 sm:py-20 text-center">
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#fba70c]/20 border border-[#fba70c]/30 rounded-full text-[#fba70c] text-sm font-bold tracking-wider uppercase mb-8"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Verified Partner Program
                </motion.div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">{data.cta.heading}</h2>
                <p className="text-blue-200/60 text-lg max-w-2xl mx-auto mb-10 font-medium">{data.cta.description}</p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <motion.a
                    href={data.cta.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-3 bg-[#fba70c] hover:bg-[#d97706] text-slate-900 font-extrabold text-lg px-10 py-5 rounded-xl shadow-[0_0_40px_rgba(251,167,12,0.3)] transition-all duration-300"
                  >
                    Get Started Now
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={`mailto:${data.cta.emailAddress}?subject=Partner%20Inquiry%20-%20Career%20Disha`}
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white/40 text-white font-semibold text-lg px-10 py-5 rounded-xl transition-all duration-300 hover:bg-white/5"
                  >
                    Email Us
                  </motion.a>
                </div>

                <p className="text-blue-300/40 text-sm mt-8 font-medium">Our team will connect with you within 24 hours</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img alt="Logo" className="h-8 brightness-0 invert" src={LOGO_URL} referrerPolicy="no-referrer" />
              <span className="text-white font-bold">Careerदिशा</span>
            </div>
            <p className="text-xs text-slate-500 tracking-widest">{COPYRIGHT_TEXT}</p>
            <button onClick={onBack} className="text-slate-400 text-sm hover:text-white transition-colors font-semibold">← Back to Home</button>
          </div>
        </footer>
      </div>
    </div>
  );
}
