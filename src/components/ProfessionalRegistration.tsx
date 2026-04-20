import { useState } from 'react';
import { 
  User, 
  MapPin, 
  ArrowLeft, 
  ArrowRight, 
  ChevronDown, 
  Building2, 
  Briefcase, 
  Target, 
  Brain, 
  Clock, 
  Link as LinkIcon,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProfessionalRegistrationProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function ProfessionalRegistration({ onBack, onComplete }: ProfessionalRegistrationProps) {
  const [step, setStep] = useState(1);
  const logoUrl = "/CareerDishaLogo.png";

  const nextStep = () => setStep(prev => prev < 5 ? prev + 1 : prev);
  const prevStep = () => {
    if (step === 1) onBack();
    else setStep(prev => prev - 1);
  };

  const [concerns, setConcerns] = useState<string[]>([]);
  const toggleConcern = (concern: string) => {
    setConcerns(prev => 
      prev.includes(concern) ? prev.filter(c => c !== concern) : [...prev, concern]
    );
  };

  const [intents, setIntents] = useState<string[]>([]);
  const toggleIntent = (intent: string) => {
    setIntents(prev => 
      prev.includes(intent) ? prev.filter(i => i !== intent) : [...prev, intent]
    );
  };

  const [domains, setDomains] = useState<string[]>([]);
  const toggleDomain = (domain: string) => {
    setDomains(prev => 
      prev.includes(domain) ? prev.filter(d => d !== domain) : [...prev, domain]
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
            <span className="font-label text-xs font-bold tracking-widest text-primary uppercase">Step {step} of 5</span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-on-surface-variant">
                {step * 20}% Complete
              </span>
              <div className="w-32 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${step * 20}%` }}
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
                  <p className="text-on-surface-variant text-lg leading-relaxed max-w-md mx-auto">Let's start with your profile basics.</p>
                </div>

                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-on-surface-variant tracking-wide px-1">Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                        <input className="w-full pl-12 pr-4 py-4 bg-surface-container-high rounded-xl border-none focus:ring-0 focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-on-surface" placeholder="e.g. Sarah Connor" type="text"/>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant tracking-wide px-1">Email Address</label>
                      <input className="w-full px-4 py-4 bg-surface-container-high rounded-xl border-none focus:ring-0 focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-on-surface" placeholder="sarah@example.com" type="email"/>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant tracking-wide px-1">Phone Number</label>
                      <input className="w-full px-4 py-4 bg-surface-container-high rounded-xl border-none focus:ring-0 focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-on-surface" placeholder="+91 00000 00000" type="tel"/>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant tracking-wide px-1">Age (Optional)</label>
                      <input className="w-full px-4 py-4 bg-surface-container-high rounded-xl border-none focus:ring-0 focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-on-surface" placeholder="e.g. 28" type="number"/>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant tracking-wide px-1">Current City / Location</label>
                      <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                        <input className="w-full pl-12 pr-4 py-4 bg-surface-container-high rounded-xl border-none focus:ring-0 focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-on-surface" placeholder="e.g. Bangalore, India" type="text"/>
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
                  <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-3">Current Job Details</h1>
                  <p className="text-on-surface-variant text-lg leading-relaxed max-w-md mx-auto">Help us understand your starting point.</p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2 col-span-2">
                      <label className="text-sm font-bold text-on-surface-variant px-1">Current Job Role</label>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                        <input className="w-full pl-12 pr-4 py-4 bg-surface-container-high rounded-xl border-none focus:bg-surface-container-lowest text-on-surface" placeholder="e.g. Software Engineer, Sales Executive" type="text"/>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant px-1">Industry</label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                        <input className="w-full pl-12 pr-4 py-4 bg-surface-container-high rounded-xl border-none focus:bg-surface-container-lowest text-on-surface" placeholder="e.g. IT, Finance" type="text"/>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant px-1">Years of Experience</label>
                      <div className="relative">
                        <select className="w-full pl-4 pr-10 py-4 bg-surface-container-high rounded-xl border-none focus:bg-surface-container-lowest appearance-none text-on-surface">
                          <option disabled selected value="">Select Experience</option>
                          <option>0 - 1 years</option>
                          <option>1 - 3 years</option>
                          <option>3 - 5 years</option>
                          <option>5 - 10 years</option>
                          <option>10+ years</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant px-1">Employment Status</label>
                      <div className="relative">
                        <select className="w-full pl-4 pr-10 py-4 bg-surface-container-high rounded-xl border-none focus:bg-surface-container-lowest appearance-none text-on-surface">
                          <option disabled selected value="">Select Status</option>
                          <option>Full-time</option>
                          <option>Part-time</option>
                          <option>Freelancer</option>
                          <option>Currently not working</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none w-5 h-5" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant px-1">Current Salary Range (Optional)</label>
                      <div className="relative">
                        <select className="w-full pl-4 pr-10 py-4 bg-surface-container-high rounded-xl border-none focus:bg-surface-container-lowest appearance-none text-on-surface">
                          <option disabled selected value="">Select Range</option>
                          <option>Below 5 LPA</option>
                          <option>5 - 10 LPA</option>
                          <option>10 - 20 LPA</option>
                          <option>20 - 30 LPA</option>
                          <option>30+ LPA</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-surface-container-high rounded-xl border border-outline-variant/10 space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-on-surface-variant block">How satisfied are you with your current career?</label>
                      <div className="flex gap-2">
                        {['Very', 'Somewhat', 'Neutral', 'Unsatisfied', 'Very Unsatisfied'].map(level => (
                           <label key={level} className="flex-1 cursor-pointer">
                             <input type="radio" name="satisfaction" className="peer sr-only" />
                             <div className="text-xs text-center py-2 px-1 rounded-lg border border-outline-variant/30 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all">
                               {level}
                             </div>
                           </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-bold text-on-surface-variant block flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> What's your biggest concern? (Select up to 2)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Low salary', 'No growth', 'Job stress', 'Lack of interest', 'Work-life balance', 'Want to explore something new'].map(concern => (
                          <div 
                            key={concern}
                            onClick={() => toggleConcern(concern)}
                            className={`cursor-pointer px-4 py-2 rounded-full border transition-all text-xs font-medium ${concerns.includes(concern) ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant/30 hover:border-primary/50 text-on-surface'}`}
                          >
                            {concern}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex items-center justify-between">
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
                  <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-3">Career Intent</h1>
                  <p className="text-on-surface-variant text-lg leading-relaxed max-w-md mx-auto">This drives our AI recommendations deeply.</p>
                </div>

                <form className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-on-surface-variant block flex items-center gap-2">
                       <Target className="w-5 h-5 text-primary" /> What are you looking for right now?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                       {[
                         'Career Switch', 
                         'Salary Growth', 
                         'Promotion / Upgrade', 
                         'Skill Development', 
                         'Freelancing',
                         'Entrepreneurship'
                       ].map((intent) => (
                         <div 
                           key={intent}
                           onClick={() => toggleIntent(intent)}
                           className={`cursor-pointer px-4 py-4 rounded-xl border-2 transition-all flex items-center justify-between ${intents.includes(intent) ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-outline-variant/20 hover:border-primary/50 text-on-surface-variant'}`}
                         >
                           {intent}
                           {intents.includes(intent) && <div className="w-2 h-2 rounded-full bg-primary" />}
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="p-6 bg-surface-container-high rounded-xl border border-outline-variant/10 space-y-6">
                     <p className="text-sm font-bold text-on-surface-variant mb-2">Target Direction</p>
                     
                     <div className="space-y-2">
                       <label className="text-xs font-bold text-outline uppercase tracking-widest block">Do you have a specific career in mind?</label>
                       <input className="w-full px-4 py-3 bg-surface-container-lowest rounded-lg border-none focus:ring-2 focus:ring-primary transition-all text-sm mb-3" placeholder="e.g. Yes, Product Manager (or leave blank to explore)" type="text"/>
                     </div>

                     <div className="space-y-3">
                       <label className="text-xs font-bold text-outline uppercase tracking-widest block">Preferred Domains</label>
                       <div className="flex flex-wrap gap-2">
                         {['Tech', 'Management', 'Design', 'Finance', 'Marketing', 'Other'].map(domain => (
                           <div 
                             key={domain}
                             onClick={() => toggleDomain(domain)}
                             className={`cursor-pointer px-3 py-1.5 rounded-md border transition-all text-xs font-bold ${domains.includes(domain) ? 'bg-secondary text-white border-secondary' : 'bg-surface-container-lowest border-outline-variant/30 text-on-surface hover:border-secondary'}`}
                           >
                             {domain}
                           </div>
                         ))}
                       </div>
                     </div>
                  </div>

                  <div className="pt-6 flex items-center justify-between">
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
                  <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-3">Skills & Strengths</h1>
                  <p className="text-on-surface-variant text-lg">Define your professional toolkit.</p>
                </div>

                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant px-1 flex items-center gap-2"><Brain className="w-4 h-4"/> Current Skills (Comma Separated)</label>
                    <input className="w-full px-4 py-4 bg-surface-container-high rounded-xl border-none focus:bg-surface-container-lowest transition-all" placeholder="e.g. Python, Excel, B2B Sales, Leadership" type="text"/>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant px-1">Overall Skill Proficiency</label>
                    <div className="flex gap-2">
                      {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                         <label key={level} className="flex-1 cursor-pointer">
                           <input type="radio" name="proficiency" className="peer sr-only" />
                           <div className="font-bold text-sm text-center py-3 px-1 rounded-xl border border-outline-variant/30 peer-checked:bg-tertiary peer-checked:text-on-tertiary peer-checked:border-tertiary transition-all">
                             {level}
                           </div>
                         </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant px-1">Top Strengths</label>
                    <input className="w-full px-4 py-4 bg-surface-container-high rounded-xl border-none focus:bg-surface-container-lowest transition-all" placeholder="e.g. Analytical thinking, Creativity" type="text"/>
                  </div>
                  
                  <div className="p-6 bg-surface-container-high rounded-xl border border-outline-variant/10 mt-4 space-y-4">
                    <p className="text-sm font-bold text-on-surface-variant">Do you feel you lack skills for your desired role?</p>
                    <div className="flex gap-4">
                      {['Yes, significantly', 'No, I am ready', 'Not sure'].map(opt => (
                         <label key={opt} className="cursor-pointer">
                           <input type="radio" name="skillgap" className="peer sr-only" />
                           <div className="text-sm py-2 px-4 rounded-full border border-outline-variant/30 peer-checked:bg-primary peer-checked:text-white transition-all bg-white whitespace-nowrap">
                             {opt}
                           </div>
                         </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 flex items-center justify-between">
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

          {step === 5 && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-2xl"
            >
              <div className="bg-surface-container-lowest rounded-[2rem] p-8 md:p-12 shadow-[0_32px_64px_-12px_rgba(25,28,30,0.06)] border border-outline-variant/10">
                <div className="text-center mb-10">
                  <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-3">Time & Goals</h1>
                  <p className="text-on-surface-variant text-lg">Finalize your commitment to growth.</p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                       <label className="text-sm font-bold text-on-surface-variant px-1 flex items-center gap-2"><Clock className="w-4 h-4"/> Time to dedicate daily</label>
                       <select className="w-full pl-4 pr-10 py-4 bg-surface-container-high rounded-xl border-none focus:bg-surface-container-lowest appearance-none text-sm text-on-surface">
                         <option>&lt; 1 hour</option>
                         <option>1 - 2 hours</option>
                         <option>2 - 4 hours</option>
                         <option>Weekends only</option>
                       </select>
                     </div>
                     <div className="space-y-2">
                       <label className="text-sm font-bold text-on-surface-variant px-1">Goal Timeline</label>
                       <select className="w-full pl-4 pr-10 py-4 bg-surface-container-high rounded-xl border-none focus:bg-surface-container-lowest appearance-none text-sm text-on-surface">
                         <option>3 months</option>
                         <option>6 months</option>
                         <option>1 year</option>
                         <option>Flexible</option>
                       </select>
                     </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant px-1">Are you willing to leave your current job?</label>
                    <div className="flex gap-4">
                      {['Yes', 'No', 'Maybe'].map(opt => (
                         <label key={opt} className="cursor-pointer">
                           <input type="radio" name="leavejob" className="peer sr-only" />
                           <div className="text-sm py-2 px-6 rounded-full border border-outline-variant/30 peer-checked:bg-primary peer-checked:text-white transition-all bg-surface-container-high">
                             {opt}
                           </div>
                         </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-sm font-bold text-on-surface-variant px-1">Primary Goal (Short Text)</label>
                     <input className="w-full px-4 py-4 bg-surface-container-high rounded-xl border-none focus:bg-surface-container-lowest transition-all" placeholder="e.g. Switch to Data Science in 6 months" type="text"/>
                  </div>

                  <div className="p-5 bg-surface-container-high rounded-xl border border-outline-variant/10 space-y-3">
                     <p className="text-sm font-bold text-on-surface-variant flex items-center gap-2"><LinkIcon className="w-4 h-4"/> Optional Enhancements (High Value)</p>
                     <input className="w-full px-4 py-3 bg-surface-container-lowest rounded-lg border-none focus:ring-2 focus:ring-primary text-sm" placeholder="LinkedIn Profile URL" type="url"/>
                     <input className="w-full px-4 py-3 bg-surface-container-lowest rounded-lg border-none focus:ring-2 focus:ring-primary text-sm" placeholder="Portfolio / Website" type="url"/>
                     <div className="flex items-center mt-2">
                        <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-outline-variant/40 rounded-lg cursor-pointer hover:bg-surface-container-lowest transition-all bg-white">
                           <span className="text-sm text-on-surface-variant font-medium flex items-center gap-2"><Briefcase className="w-4 h-4"/> Upload Resume (PDF)</span>
                           <input type="file" className="hidden" accept=".pdf" />
                        </label>
                     </div>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 flex gap-4 items-start">
                     <div className="pt-1">
                       <input type="checkbox" id="consent" className="w-5 h-5 rounded border-primary text-primary focus:ring-primary" />
                     </div>
                     <label htmlFor="consent" className="text-sm text-on-surface-variant leading-relaxed">
                       I agree to the Terms & Conditions and provide consent for the initial skill assessment via Careerदिशा system frameworks.
                     </label>
                  </div>

                  <div className="pt-6 flex items-center justify-between">
                    <button type="button" onClick={prevStep} className="flex items-center gap-2 text-on-surface-variant font-semibold hover:text-primary transition-colors">
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button type="button" onClick={onComplete} className="bg-primary text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 group">
                      Finish Registration <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
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