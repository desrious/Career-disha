/**
 * PartnerHero — Hero section for the Partner page with background image,
 * left-side content, and a right-side "Schedule Free Demo" form card.
 * Reads content from CMS. Form submits to Supabase + WhatsApp.
 */
import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Users, Globe, Target, ChevronDown, CheckCircle2, Loader2 } from 'lucide-react';
import type { CmsPartnerHero } from '../../data/cms';
import { savePartnerInquiry } from '../../data/cms';
import PhoneInput from '../shared/PhoneInput';
import { getPhoneDetails } from '../../utils/phoneUtils';

interface PartnerHeroProps {
  data: CmsPartnerHero;
  onCTAClick: () => void;
}

const statIcons = [
  <Users className="w-6 h-6 text-blue-400" />,
  <Globe className="w-6 h-6 text-[#fba70c]" />,
  <Target className="w-6 h-6 text-emerald-400" />,
];

export default function PartnerHero({ data, onCTAClick }: PartnerHeroProps) {
  const [formData, setFormData] = useState({
    interestedIn: '',
    name: '',
    email: '',
    phone: '',
  });
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.interestedIn || !formData.name || !formData.email || !formData.phone) return;
    if (!isPhoneValid) {
      alert("Please enter a valid phone number.");
      return;
    }

    setSubmitting(true);
    const { countryCode, dialCode, countryName } = getPhoneDetails(formData.phone);

    // Save to Supabase
    try {
      await savePartnerInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        countryCode,
        dialCode,
        countryName,
        interested_in: formData.interestedIn,
      });
    } catch (error) {
      console.warn('Partner inquiry save failed (Supabase may not be configured).', error);
    }

    // Build WhatsApp message
    const message = `Hi, I'm interested in the *${formData.interestedIn}* partner program.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone} (${countryName})`;
    const waUrl = `https://wa.me/919289191164?text=${encodeURIComponent(message)}`;

    setSubmitting(false);
    setSubmitted(true);
    window.open(waUrl, '_blank');

    // Reset after 4 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ interestedIn: '', name: '', email: '', phone: '' });
    }, 4000);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src="/partner-bg.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
      </div>

      {/* Animated abstract accents */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-blue-500/8 blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-[#fba70c]/8 blur-[100px] pointer-events-none"
      />

      {/* Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── LEFT SIDE ── */}
          <div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-400/20 rounded-full text-blue-300 text-sm font-semibold tracking-wider uppercase mb-8">
                <Sparkles className="w-4 h-4" />
                {data.badge}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight"
            >
              {data.heading}{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-blue-400 via-blue-300 to-[#fba70c] bg-clip-text text-transparent">{data.highlight}</span>
                <motion.span
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute bottom-1 md:bottom-2 left-0 h-2 md:h-3 bg-[#fba70c]/30 rounded-full z-0"
                />
              </span>{' '}
              Partner
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg sm:text-xl text-blue-100/70 mb-10 leading-relaxed max-w-xl font-medium"
            >
              {data.description}
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="grid grid-cols-3 gap-6 max-w-md"
            >
              {data.stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="shrink-0">{statIcons[idx % statIcons.length]}</div>
                  <div>
                    <p className="text-2xl font-extrabold text-white leading-none">{stat.value}</p>
                    <p className="text-blue-300/50 text-xs font-semibold uppercase tracking-wider mt-1">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT SIDE — FORM ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-md mx-auto lg:ml-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 overflow-hidden border border-white/20">
              <div className="px-8 pt-8 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
                  <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Book Demo</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-3">Schedule Free Demo</h3>
                <p className="text-slate-400 text-sm font-medium mt-1">Get a walkthrough of our platform</p>
              </div>

              <div className="px-8 pb-8">
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.1 }}>
                      <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                    </motion.div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Success!</h4>
                    <p className="text-slate-500 text-sm font-medium">We'll contact you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {/* Interested In */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Interested In</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          className={`w-full text-left px-4 py-3 border-2 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-between ${
                            formData.interestedIn ? 'border-blue-200 text-slate-900 bg-white' : 'border-slate-200 text-slate-400 bg-slate-50/50'
                          } hover:border-blue-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100`}
                        >
                          <span>{formData.interestedIn || `Select from ${data.programs.length} Partner Programs`}</span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {dropdownOpen && (
                          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-slate-200 rounded-xl shadow-xl z-30 overflow-hidden">
                            {data.programs.map((program) => (
                              <button
                                key={program}
                                type="button"
                                onClick={() => { setFormData({ ...formData, interestedIn: program }); setDropdownOpen(false); }}
                                className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors hover:bg-blue-50 hover:text-blue-700 ${formData.interestedIn === program ? 'bg-blue-50 text-blue-700' : 'text-slate-700'}`}
                              >
                                {program}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <div>
                      <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl font-medium text-sm text-slate-900 placeholder-slate-400 bg-slate-50/50 hover:border-blue-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200" required />
                    </div>

                    <div>
                      <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl font-medium text-sm text-slate-900 placeholder-slate-400 bg-slate-50/50 hover:border-blue-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200" required />
                    </div>

                    <div>
                      <PhoneInput 
                        value={formData.phone}
                        onChange={(val) => setFormData({...formData, phone: val || ''})}
                        onValidationChange={setIsPhoneValid}
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={submitting || !isPhoneValid}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-base py-4 rounded-xl shadow-lg shadow-blue-600/25 transition-all duration-300 mt-2"
                    >
                      {submitting ? (<><Loader2 className="w-5 h-5 animate-spin" />Submitting...</>) : (<>Get Started Now<ArrowRight className="w-5 h-5" /></>)}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
