import { useState } from 'react';
import { 
  User, 
  Calendar, 
  Phone, 
  Users, 
  GraduationCap, 
  MapPin, 
  ArrowLeft, 
  ArrowRight, 
  ChevronDown, 
  Search, 
  Mail, 
  CheckCircle2, 
  Plus, 
  BadgeCheck 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StudentRegistrationProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function StudentRegistration({ onBack, onComplete }: StudentRegistrationProps) {
  const [step, setStep] = useState(1);
  const logoUrl = "/CareerDishaLogo.png";

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => {
    if (step === 1) onBack();
    else setStep(prev => prev - 1);
  };

  const progress = (step / 4) * 100;

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body">
      {/* Top Navigation / Progress Header */}
      <nav className="fixed top-0 w-full bg-surface/80 backdrop-blur-md z-50 border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-8 h-20 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <img 
              alt="CareerDisha Logo" 
              className="h-10 w-auto" 
              src={logoUrl}
              referrerPolicy="no-referrer"
            />
            <span className="text-2xl font-bold tracking-tighter text-primary font-headline">Careerदिशा</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-label text-xs font-bold tracking-widest text-primary uppercase">Step {step} of 4</span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-on-surface-variant">
                {step === 1 ? '25%' : step === 2 ? '50%' : '75%'} Complete
              </span>
              <div className="w-32 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${step === 1 ? 25 : step === 2 ? 50 : 75}%` }}
                  className="h-full bg-primary-container rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-32 pb-24 px-6 flex items-center justify-center relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] opacity-10 blur-[100px] rounded-full bg-primary pointer-events-none"></div>
        <div className="fixed bottom-0 left-0 -z-10 w-[400px] h-[400px] opacity-5 blur-[100px] rounded-full bg-tertiary pointer-events-none"></div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-2xl"
            >
              <div className="bg-surface-container-lowest rounded-[2rem] p-8 md:p-12 shadow-[0_32px_64px_-12px_rgba(25,28,30,0.06)] border border-outline-variant/10">
                <div className="text-center mb-10">
                  <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-3">Tell us about yourself</h1>
                  <p className="text-on-surface-variant text-lg leading-relaxed max-w-md mx-auto">This helps us personalize your career recommendations.</p>
                </div>

                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant tracking-wide px-1">Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                        <input required className="w-full pl-12 pr-4 py-4 bg-surface-container-high rounded-xl border-none focus:ring-0 focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-on-surface" placeholder="e.g. Rahul Sharma" type="text"/>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-focus-within:w-full transition-all duration-300"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant tracking-wide px-1">Age</label>
                      <div className="relative group">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                        <input required min="1" max="99" className="w-full pl-12 pr-4 py-4 bg-surface-container-high rounded-xl border-none focus:ring-0 focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-on-surface" placeholder="Enter your age" type="number"/>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-focus-within:w-full transition-all duration-300"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant tracking-wide px-1">Phone Number</label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                        <input required className="w-full pl-12 pr-4 py-4 bg-surface-container-high rounded-xl border-none focus:ring-0 focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-on-surface" placeholder="+91 00000 00000" type="tel"/>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-focus-within:w-full transition-all duration-300"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant tracking-wide px-1">Gender</label>
                      <div className="relative group">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                        <select required className="w-full pl-12 pr-10 py-4 bg-surface-container-high rounded-xl border-none focus:ring-0 focus:bg-surface-container-lowest appearance-none transition-all text-on-surface">
                          <option disabled selected value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none w-5 h-5" />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-focus-within:w-full transition-all duration-300"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant tracking-wide px-1">Class / Grade</label>
                      <div className="relative group">
                        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                        <select required className="w-full pl-12 pr-10 py-4 bg-surface-container-high rounded-xl border-none focus:ring-0 focus:bg-surface-container-lowest appearance-none transition-all text-on-surface">
                          <option disabled selected value="">Select Class</option>
                          <option value="Class 10">Class 10</option>
                          <option value="Class 11">Class 11</option>
                          <option value="Class 12">Class 12</option>
                          <option value="Undergraduate">Undergraduate</option>
                          <option value="Postgraduate">Postgraduate</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none w-5 h-5" />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-focus-within:w-full transition-all duration-300"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant tracking-wide px-1">Location (City)</label>
                      <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                        <input required className="w-full pl-12 pr-4 py-4 bg-surface-container-high rounded-xl border-none focus:ring-0 focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-on-surface" placeholder="e.g. Mumbai" type="text"/>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-focus-within:w-full transition-all duration-300"></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-10 flex items-center justify-between">
                    <button 
                      type="button"
                      onClick={prevStep}
                      className="flex items-center gap-2 text-on-surface-variant font-semibold hover:text-primary transition-colors group"
                    >
                      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      Back
                    </button>
                    <button 
                      type="submit"
                      className="bg-tertiary-fixed text-on-tertiary-fixed px-10 py-4 rounded-xl font-bold flex items-center gap-3 hover:shadow-xl hover:shadow-tertiary/10 transition-all active:scale-95 group"
                    >
                      Continue
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-2xl"
            >
              <div className="text-center mb-10">
                <h1 className="text-4xl font-headline font-extrabold text-on-surface mb-3 tracking-tight">School Information</h1>
                <p className="text-on-surface-variant text-lg">Help us link you with your educational institution.</p>
              </div>

              <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-10 shadow-[0_24px_40px_-4px_rgba(25,28,30,0.06)] border border-white/40">
                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                  <div className="space-y-2">
                    <label className="block text-sm font-label font-bold text-on-surface tracking-wide">SCHOOL NAME</label>
                    <div className="relative group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                      <input required className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 focus:ring-0 focus:bg-white transition-all text-on-surface placeholder:text-outline shadow-sm" placeholder="Search for your school..." type="text"/>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-focus-within:w-full"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-label font-bold text-on-surface tracking-wide">SCHOOL EMAIL ID</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                        <input required className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 focus:ring-0 focus:bg-white transition-all text-on-surface placeholder:text-outline shadow-sm" placeholder="admin@school.com" type="email"/>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-focus-within:w-full"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-label font-bold text-on-surface tracking-wide">PINCODE</label>
                      <div className="relative group">
                        <input required className="w-full bg-surface-container-low border-none rounded-xl py-4 px-4 focus:ring-0 focus:bg-white transition-all text-on-surface placeholder:text-outline shadow-sm" placeholder="400001" type="text"/>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-focus-within:w-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-label font-bold text-on-surface tracking-wide">SCHOOL ADDRESS</label>
                    <div className="relative group">
                      <textarea required className="w-full bg-surface-container-low border-none rounded-xl py-4 px-4 focus:ring-0 focus:bg-white transition-all text-on-surface placeholder:text-outline shadow-sm resize-none" placeholder="Enter school address..." rows={3}></textarea>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-focus-within:w-full"></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-label font-bold text-on-surface tracking-wide">CHOOSE YOUR STREAM</label>
                    <div className="flex flex-wrap gap-3">
                      <button type="button" className="bg-secondary-container text-on-secondary-container px-6 py-2.5 rounded-full font-label font-bold text-sm shadow-sm flex items-center gap-2 transition-transform active:scale-95">
                        <CheckCircle2 className="w-4 h-4" />
                        Science
                      </button>
                      <button type="button" className="bg-surface-container-high text-on-surface-variant px-6 py-2.5 rounded-full font-label font-medium text-sm hover:bg-surface-variant transition-colors active:scale-95">
                        Commerce
                      </button>
                      <button type="button" className="bg-surface-container-high text-on-surface-variant px-6 py-2.5 rounded-full font-label font-medium text-sm hover:bg-surface-variant transition-colors active:scale-95">
                        Arts
                      </button>
                      <button type="button" className="bg-surface-container-high text-on-surface-variant px-6 py-2.5 rounded-full font-label font-medium text-sm hover:bg-surface-variant transition-colors active:scale-95">
                        Not Decided
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-surface-container">
                    <button 
                      type="button"
                      onClick={prevStep}
                      className="flex items-center gap-2 text-on-surface-variant font-label font-semibold px-6 py-3 rounded-xl hover:bg-surface-container transition-colors group"
                    >
                      <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                      Back
                    </button>
                    <button 
                      type="submit"
                      className="w-full sm:w-auto bg-gradient-to-r from-tertiary-container to-tertiary-fixed-dim text-on-tertiary-container px-10 py-4 rounded-xl font-label font-bold text-base shadow-lg shadow-tertiary/20 flex items-center justify-center gap-2 group transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                    >
                      Continue
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-2xl"
            >
              <div className="mb-10 text-left">
                <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-3">Guardian Linking</h1>
                <p className="text-on-surface-variant text-lg font-body leading-relaxed max-w-md">
                  Who will be supporting you on this journey? Connect your mentors at home.
                </p>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onComplete(); }}>
                <section className="bg-surface-container-lowest p-6 rounded-3xl transition-all duration-300 hover:shadow-xl border border-transparent hover:border-outline-variant/10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-primary-fixed flex items-center justify-center rounded-2xl">
                        <User className="text-primary w-8 h-8" />
                      </div>
                      <div>
                        <h2 className="font-headline text-xl font-bold">Father Details</h2>
                        <p className="text-xs font-label text-on-surface-variant font-medium tracking-wide uppercase">Legal Guardian</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-secondary-container px-3 py-1 rounded-full">
                      <BadgeCheck className="text-on-secondary-container w-4 h-4" />
                      <span className="text-[10px] font-bold text-on-secondary-container tracking-wider uppercase">Primary Guardian</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="relative">
                      <label className="block text-[10px] font-label font-bold text-outline uppercase tracking-widest mb-1 ml-1">Full Name</label>
                      <input required className="w-full bg-surface-container-high/50 p-4 rounded-xl font-body text-on-surface border-b-2 border-transparent focus:border-primary focus:outline-none transition-all" type="text" defaultValue="Robert Sterling"/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-label font-bold text-outline uppercase tracking-widest mb-1 ml-1">Email Address</label>
                        <input required className="w-full bg-surface-container-high/50 p-4 rounded-xl font-body text-on-surface border-b-2 border-transparent focus:border-primary focus:outline-none transition-all" type="email" defaultValue="r.sterling@outlook.com"/>
                      </div>
                      <div>
                        <label className="block text-[10px] font-label font-bold text-outline uppercase tracking-widest mb-1 ml-1">Phone Number</label>
                        <input required className="w-full bg-surface-container-high/50 p-4 rounded-xl font-body text-on-surface border-b-2 border-transparent focus:border-primary focus:outline-none transition-all" type="tel" defaultValue="+1 (555) 012-3456"/>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="bg-surface-container-lowest p-6 rounded-3xl transition-all duration-300 hover:shadow-xl border border-transparent hover:border-outline-variant/10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-tertiary-fixed flex items-center justify-center rounded-2xl">
                      <Users className="text-tertiary w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="font-headline text-xl font-bold">Mother Details</h2>
                      <p className="text-xs font-label text-on-surface-variant font-medium tracking-wide uppercase">Legal Guardian</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="relative">
                      <label className="block text-[10px] font-label font-bold text-outline uppercase tracking-widest mb-1 ml-1">Full Name</label>
                      <input className="w-full bg-surface-container-high/50 p-4 rounded-xl font-body text-on-surface border-b-2 border-transparent focus:border-primary focus:outline-none transition-all" placeholder="Enter mother's name" type="text"/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-label font-bold text-outline uppercase tracking-widest mb-1 ml-1">Email Address</label>
                        <input className="w-full bg-surface-container-high/50 p-4 rounded-xl font-body text-on-surface border-b-2 border-transparent focus:border-primary focus:outline-none transition-all" placeholder="email@example.com" type="email"/>
                      </div>
                      <div>
                        <label className="block text-[10px] font-label font-bold text-outline uppercase tracking-widest mb-1 ml-1">Phone Number</label>
                        <input className="w-full bg-surface-container-high/50 p-4 rounded-xl font-body text-on-surface border-b-2 border-transparent focus:border-primary focus:outline-none transition-all" placeholder="+1 (000) 000-0000" type="tel"/>
                      </div>
                    </div>
                  </div>
                </section>

                <button type="button" className="w-full py-8 border-2 border-dashed border-outline-variant rounded-3xl flex flex-col items-center justify-center gap-2 group transition-all hover:bg-surface-container hover:border-primary">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Plus className="text-outline group-hover:text-primary w-6 h-6" />
                  </div>
                  <span className="font-label font-bold text-on-surface-variant group-hover:text-primary transition-colors">+ Add Another Guardian</span>
                </button>
              
                <div className="mt-12 flex items-center justify-between">
                  <button 
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-2 px-6 py-4 rounded-2xl hover:bg-surface-container-low transition-colors text-on-surface-variant font-bold"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                  </button>
                  <button 
                    type="submit"
                    className="bg-gradient-to-r from-tertiary-container to-tertiary px-8 py-4 rounded-2xl flex items-center gap-3 text-on-tertiary font-headline font-bold shadow-lg shadow-tertiary/20 hover:scale-[0.98] transition-transform"
                  >
                    <span>Complete Setup</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="w-full py-12 bg-surface border-t border-outline-variant/10">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-4 text-sm tracking-wide">
          <p className="text-slate-400">© 2024 Luminary Guide. All rights reserved.</p>
          <div className="flex gap-8">
            <a className="text-slate-400 hover:text-primary underline underline-offset-4 transition-opacity opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
            <a className="text-slate-400 hover:text-primary underline underline-offset-4 transition-opacity opacity-80 hover:opacity-100" href="#">Terms of Service</a>
            <a className="text-slate-400 hover:text-primary underline underline-offset-4 transition-opacity opacity-80 hover:opacity-100" href="#">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
