import { useState } from 'react';
import { 
  User, 
  MapPin, 
  ArrowLeft, 
  ArrowRight, 
  ChevronDown, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  Target, 
  Brain, 
  Clock, 
  Link as LinkIcon 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GraduateRegistrationProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function GraduateRegistration({ onBack, onComplete }: GraduateRegistrationProps) {
  const [step, setStep] = useState(1);
  const logoUrl = "/CareerDishaLogo.png";

  const nextStep = () => setStep(prev => prev < 4 ? prev + 1 : prev);
  const prevStep = () => {
    if (step === 1) onBack();
    else setStep(prev => prev - 1);
  };

  const [careerIntent, setCareerIntent] = useState<string[]>([]);
  const toggleIntent = (intent: string) => {
    setCareerIntent(prev => 
      prev.includes(intent) ? prev.filter(i => i !== intent) : [...prev, intent]
    );
  };

  const [skills, setSkills] = useState<string[]>([]);
  const toggleSkill = (skill: string) => {
    setSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

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
                {step * 25}% Complete
              </span>
              <div className="w-32 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${step * 25}%` }}
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
                  <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-3">Basic Information</h1>
                  <p className="text-on-surface-variant text-lg leading-relaxed max-w-md mx-auto">Let's start with your contact details.</p>
                </div>

                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-on-surface-variant tracking-wide px-1">Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                        <input className="w-full pl-12 pr-4 py-4 bg-surface-container-high rounded-xl border-none focus:ring-0 focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-on-surface" placeholder="e.g. John Doe" type="text"/>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant tracking-wide px-1">Email Address</label>
                      <input className="w-full px-4 py-4 bg-surface-container-high rounded-xl border-none focus:ring-0 focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-on-surface" placeholder="john@example.com" type="email"/>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant tracking-wide px-1">Phone Number</label>
                      <input className="w-full px-4 py-4 bg-surface-container-high rounded-xl border-none focus:ring-0 focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-on-surface" placeholder="+91 00000 00000" type="tel"/>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant tracking-wide px-1">Age (Optional)</label>
                      <input className="w-full px-4 py-4 bg-surface-container-high rounded-xl border-none focus:ring-0 focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-on-surface" placeholder="e.g. 23" type="number"/>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant tracking-wide px-1">Current Location</label>
                      <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                        <input className="w-full pl-12 pr-4 py-4 bg-surface-container-high rounded-xl border-none focus:ring-0 focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-on-surface" placeholder="e.g. Delhi, India" type="text"/>
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
                      type="button"
                      onClick={nextStep}
                      className="bg-primary text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-primary/90 transition-all active:scale-95 group"
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
              <div className="bg-surface-container-lowest rounded-[2rem] p-8 md:p-12 shadow-[0_32px_64px_-12px_rgba(25,28,30,0.06)] border border-outline-variant/10">
                <div className="text-center mb-10">
                  <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-3">Academic Background</h1>
                  <p className="text-on-surface-variant text-lg leading-relaxed max-w-md mx-auto">Tell us about your educational background.</p>
                </div>

                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant px-1">Degree</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                      <select className="w-full pl-12 pr-10 py-4 bg-surface-container-high rounded-xl border-none focus:ring-0 focus:bg-surface-container-lowest appearance-none text-on-surface">
                        <option disabled selected value="">Select Degree</option>
                        <option>B.Tech / B.E.</option>
                        <option>BSc / BCA</option>
                        <option>BBA / BCom</option>
                        <option>BA</option>
                        <option>Postgraduate (M.Tech, MBA, etc.)</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant px-1">Field of Study</label>
                    <input className="w-full px-4 py-4 bg-surface-container-high rounded-xl border-none focus:bg-surface-container-lowest transition-all" placeholder="e.g. Computer Science, Finance..." type="text"/>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant px-1">College/University Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                      <input className="w-full pl-12 pr-4 py-4 bg-surface-container-high rounded-xl border-none focus:bg-surface-container-lowest transition-all" placeholder="Enter your university name" type="text"/>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant px-1">Graduation Year</label>
                      <input className="w-full px-4 py-4 bg-surface-container-high rounded-xl border-none focus:bg-surface-container-lowest transition-all" placeholder="YYYY" type="number"/>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant px-1">Current Status</label>
                      <div className="relative">
                        <select className="w-full px-4 pr-10 py-4 bg-surface-container-high rounded-xl border-none focus:bg-surface-container-lowest appearance-none text-on-surface">
                          <option disabled selected value="">Select</option>
                          <option>Final Year Student</option>
                          <option>Recent Graduate</option>
                          <option>Pursuing Postgrad</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-10 flex items-center justify-between">
                    <button type="button" onClick={prevStep} className="flex items-center gap-2 text-on-surface-variant font-semibold hover:text-primary transition-colors">
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button type="button" onClick={nextStep} className="bg-primary text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-primary/90 transition-all active:scale-95 group">
                      Continue <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
              <div className="bg-surface-container-lowest rounded-[2rem] p-8 md:p-12 shadow-[0_32px_64px_-12px_rgba(25,28,30,0.06)] border border-outline-variant/10">
                <div className="text-center mb-10">
                  <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-3">Career Status & Intent</h1>
                  <p className="text-on-surface-variant text-lg leading-relaxed max-w-md mx-auto">Help our AI mentor understand your goals.</p>
                </div>

                <form className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-on-surface-variant block">Current Situation</label>
                    <div className="flex flex-wrap gap-4">
                       {['Not working', 'Interning', 'Employed'].map((stat) => (
                         <label key={stat} className="cursor-pointer">
                           <input type="radio" name="career_status" className="peer sr-only" />
                           <div className="px-6 py-3 rounded-full border border-outline-variant/30 text-on-surface hover:bg-surface-container-high peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all font-medium">
                             {stat}
                           </div>
                         </label>
                       ))}
                    </div>
                  </div>

                  <div className="p-6 bg-surface-container-high rounded-xl border border-outline-variant/10 space-y-4">
                     <p className="text-sm font-bold text-on-surface-variant mb-2">If employed/interning:</p>
                     <div className="grid grid-cols-2 gap-4">
                       <input className="w-full px-4 py-3 bg-surface-container-lowest rounded-lg border-none focus:ring-2 focus:ring-primary transition-all text-sm" placeholder="Job Role" type="text"/>
                       <input className="w-full px-4 py-3 bg-surface-container-lowest rounded-lg border-none focus:ring-2 focus:ring-primary transition-all text-sm" placeholder="Industry" type="text"/>
                       <input className="col-span-2 w-full px-4 py-3 bg-surface-container-lowest rounded-lg border-none focus:ring-2 focus:ring-primary transition-all text-sm" placeholder="Experience (in months/years)" type="text"/>
                     </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-on-surface-variant block flex items-center gap-2">
                       <Target className="w-4 h-4" /> What are you looking for? (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                       {[
                         { id: 'first_job', label: 'First Job' },
                         { id: 'skill_dev', label: 'Skill Development' },
                         { id: 'career_switch', label: 'Career Switch' },
                         { id: 'higher_studies', label: 'Higher Studies' }
                       ].map((intent) => (
                         <div 
                           key={intent.id}
                           onClick={() => toggleIntent(intent.id)}
                           className={`cursor-pointer px-4 py-4 rounded-xl border-2 transition-all flex items-center justify-between ${careerIntent.includes(intent.id) ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-outline-variant/20 hover:border-primary/50 text-on-surface-variant'}`}
                         >
                           {intent.label}
                           {careerIntent.includes(intent.id) && <div className="w-2 h-2 rounded-full bg-primary" />}
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="pt-10 flex items-center justify-between">
                    <button type="button" onClick={prevStep} className="flex items-center gap-2 text-on-surface-variant font-semibold hover:text-primary transition-colors">
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button type="button" onClick={nextStep} className="bg-primary text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-primary/90 transition-all active:scale-95 group">
                      Continue <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-2xl"
            >
              <div className="bg-surface-container-lowest rounded-[2rem] p-8 md:p-12 shadow-[0_32px_64px_-12px_rgba(25,28,30,0.06)] border border-outline-variant/10">
                <div className="text-center mb-10">
                  <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-3">Skills & Goals</h1>
                  <p className="text-on-surface-variant text-lg">Final step to unlock your AI Mentor.</p>
                </div>

                <form className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-on-surface-variant block flex items-center gap-2">
                       <Brain className="w-4 h-4" /> Core Skills (Select up to 3)
                    </label>
                    <div className="flex flex-wrap gap-2">
                       {['Programming', 'Communication', 'Design', 'Marketing', 'Data Analysis', 'Finance', 'Management'].map((skill) => (
                         <div 
                           key={skill}
                           onClick={() => toggleSkill(skill)}
                           className={`cursor-pointer px-4 py-2 rounded-full border transition-all text-sm font-medium ${skills.includes(skill) ? 'border-tertiary bg-tertiary text-on-tertiary shadow-md' : 'border-outline-variant/30 hover:border-tertiary text-on-surface'}`}
                         >
                           {skill}
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                       <label className="text-sm font-bold text-on-surface-variant px-1">Primary Goal</label>
                       <select className="w-full px-4 py-4 bg-surface-container-high rounded-xl border-none focus:bg-surface-container-lowest text-sm text-on-surface">
                         <option>Get a job</option>
                         <option>Switch career</option>
                         <option>Upskill</option>
                       </select>
                     </div>
                     <div className="space-y-2">
                       <label className="text-sm font-bold text-on-surface-variant px-1 flex items-center gap-2"><Clock className="w-4 h-4"/> Timeline</label>
                       <select className="w-full px-4 py-4 bg-surface-container-high rounded-xl border-none focus:bg-surface-container-lowest text-sm text-on-surface">
                         <option>3 months</option>
                         <option>6 months</option>
                         <option>1 year</option>
                         <option>Flexible</option>
                       </select>
                     </div>
                  </div>

                  <div className="p-6 bg-surface-container-high rounded-xl border border-outline-variant/10 space-y-4">
                     <p className="text-sm font-bold text-on-surface-variant flex items-center gap-2"><LinkIcon className="w-4 h-4"/> Optional (but powerful)</p>
                     <input className="w-full px-4 py-3 bg-surface-container-lowest rounded-lg border-none focus:ring-2 focus:ring-primary transition-all text-sm mb-3" placeholder="LinkedIn Profile URL" type="url"/>
                     <input className="w-full px-4 py-3 bg-surface-container-lowest rounded-lg border-none focus:ring-2 focus:ring-primary transition-all text-sm" placeholder="Portfolio / GitHub Link" type="url"/>
                     
                     <div className="mt-4 flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-outline-variant/40 rounded-xl cursor-pointer hover:bg-surface-container-lowest hover:border-primary/50 transition-all">
                           <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Briefcase className="w-6 h-6 text-on-surface-variant mb-2" />
                              <p className="text-sm text-on-surface-variant font-medium">Upload Resume (PDF)</p>
                           </div>
                           <input type="file" className="hidden" accept=".pdf" />
                        </label>
                     </div>
                  </div>

                  <div className="pt-10 flex items-center justify-between">
                    <button type="button" onClick={prevStep} className="flex items-center gap-2 text-on-surface-variant font-semibold hover:text-primary transition-colors">
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button type="button" onClick={onComplete} className="bg-primary text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
                      Finish Registration
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}