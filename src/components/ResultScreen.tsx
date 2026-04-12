import { 
  Bell, 
  User, 
  TrendingUp, 
  Zap, 
  Verified, 
  ArrowRight,
  BarChart3
} from 'lucide-react';
import { motion } from 'motion/react';

interface ResultScreenProps {
  onGoToRoadmap: () => void;
}

export default function ResultScreen({ onGoToRoadmap }: ResultScreenProps) {
  const logoUrl = "https://lh3.googleusercontent.com/aida/ADBb0ugIHQH9KsYjSKy1yo34iJCmwhIw1ZXx3GPKOKKzjAsaRbYBMEG4kfTa2z-crvDJbhYdFL8AhCt2dFGAsep_YZMiJZ7MPIvfJk8icyV4fsoNbRyYgfVZEhFseLuEFTYV25zfhulbQnq1m8GD8MMigU-o-JxAdjEOdw8l5xhSuZ-WPqcXxPZMj__NpwW53-jqerHgTy0fh-enQv8RcFD1w6MciE4P2Jhl1tgJR8vW4XJFuk8Y4xe-eQg5_-KJ_8nwA8k74_7fG7Perg";
  const avatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuAIzOqjcnqP--aMQz0kQC2LXF-AuSgPlTnz96QBZ4_qVnWSprPxEj932eIr999rzlGgMEJotG3S2f4hZrVRErOFtlDV364m8NsBdbJuR3e3-eqQX-sB9jNt0lsvUkosK0J1OJBy5qjYueLl2ol5kSutOu5C3hqNnOK9WG9uRMXZucflvwsSl80cukXdmy8_lBVv7exTDojGhStyepiAdFiZ80dHFpIv-Qb-YAyJ6TZNX6D5dw9NaOfhOCm9EM_c7-4jhSTcABI9BWTO";

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <img alt="CareerDisha Logo" className="h-12 w-auto object-contain" src={logoUrl} referrerPolicy="no-referrer" />
            <div className="hidden md:flex gap-6 items-center">
              <button className="text-slate-500 font-medium text-xs tracking-widest uppercase hover:text-blue-600 transition-colors">Assessment</button>
              <button className="text-blue-700 font-bold border-b-2 border-blue-600 pb-1 text-xs tracking-widest uppercase">Results</button>
              <button onClick={onGoToRoadmap} className="text-slate-500 font-medium text-xs tracking-widest uppercase hover:text-blue-600 transition-colors">Roadmap</button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-blue-700 transition-all active:scale-95">
              <Bell className="w-6 h-6" />
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border-2 border-primary-fixed">
              <img alt="User profile avatar" className="w-full h-full object-cover" src={avatarUrl} referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-on-surface tracking-tight mb-4 leading-tight">
            RIASEC Profile Analysis
          </h1>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            Your unique blend of <span className="text-primary font-semibold">Investigative</span> and <span className="text-secondary font-semibold">Artistic</span> traits suggests a high aptitude for roles that bridge technical precision with creative problem-solving.
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interest Distribution Radar */}
          <section className="lg:col-span-7 bg-surface-container-lowest rounded-[2rem] p-8 md:p-12 relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 border border-white/50">
            <div className="flex justify-between items-center mb-10">
              <h3 className="font-headline text-2xl font-bold">Interest Distribution</h3>
              <BarChart3 className="text-primary-container w-6 h-6" />
            </div>
            
            <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center">
              {/* Faux Radar Chart Visual */}
              <div className="absolute inset-0 border-[1px] border-outline-variant/30 rounded-full"></div>
              <div className="absolute inset-12 border-[1px] border-outline-variant/30 rounded-full"></div>
              <div className="absolute inset-24 border-[1px] border-outline-variant/30 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full drop-shadow-lg" viewBox="0 0 100 100">
                  <polygon fill="none" points="50,5 93,30 93,70 50,95 7,70 7,30" stroke="#e0e3e5" strokeWidth="0.5"></polygon>
                  <line stroke="#e0e3e5" strokeWidth="0.2" x1="50" x2="50" y1="5" y2="95"></line>
                  <line stroke="#e0e3e5" strokeWidth="0.2" x1="93" x2="7" y1="30" y2="70"></line>
                  <line stroke="#e0e3e5" strokeWidth="0.2" x1="93" x2="7" y1="70" y2="30"></line>
                  <motion.polygon 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="fill-primary/20 stroke-primary" 
                    points="50,15 80,40 60,65 50,85 20,60 30,35" 
                    strokeWidth="1.5"
                  ></motion.polygon>
                </svg>
              </div>
              {/* Labels */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest uppercase text-primary">Investigative</div>
              <div className="absolute top-[25%] -right-12 text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">Artistic</div>
              <div className="absolute bottom-[25%] -right-12 text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">Social</div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">Enterprising</div>
              <div className="absolute bottom-[25%] -left-12 text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">Conventional</div>
              <div className="absolute top-[25%] -left-12 text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">Realistic</div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4 justify-center">
              <span className="px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full text-sm font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-on-secondary-container"></span>
                High Growth Potential
              </span>
              <span className="px-4 py-2 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-sm font-semibold">Editorial Precision</span>
            </div>
          </section>

          {/* Right Column: Matches and AI Mentor */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <section className="bg-surface-container-lowest rounded-[2rem] p-8 border border-white/50">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-headline text-xl font-bold">Top 3 Career Matches</h3>
                <button className="text-primary text-sm font-semibold hover:underline">View 15+ more matches</button>
              </div>
              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="font-headline font-bold text-lg">Data Scientist</span>
                    <span className="text-primary font-bold">94%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="font-headline font-bold text-lg">Architect</span>
                    <span className="text-primary font-bold">88%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="font-headline font-bold text-lg">Research Lead</span>
                    <span className="text-primary font-bold">82%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-primary text-white rounded-[2rem] p-8 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-container rounded-full opacity-20 group-hover:scale-125 transition-transform duration-700"></div>
              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="font-bold tracking-wide uppercase text-[10px]">AI Mentor Insight</span>
                </div>
                <blockquote className="text-xl font-headline font-medium italic leading-snug">
                  "Your aptitude for deep analysis paired with creative vision is a rare combination. You don't just solve problems—you rethink them entirely."
                </blockquote>
                <button className="w-full py-4 bg-tertiary-fixed text-on-tertiary-fixed font-bold rounded-xl tracking-tight hover:brightness-105 active:scale-95 transition-all uppercase text-sm">
                  TALK TO AI MENTOR
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Bottom Row: Strengths and Areas */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-[2rem] p-8 border-t-2 border-secondary-container">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                <Verified className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-2xl font-bold">Key Strengths</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low border border-transparent hover:border-secondary-container/30 transition-colors">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-semibold text-on-surface">Analytical Precision</span>
              </li>
              <li className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low border border-transparent hover:border-secondary-container/30 transition-colors">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-semibold text-on-surface">Creative Synthesizer</span>
              </li>
              <li className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low border border-transparent hover:border-secondary-container/30 transition-colors">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-semibold text-on-surface">High Cognitive Endurance</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-[2rem] p-8 border-t-2 border-error-container">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-error-container/20 flex items-center justify-center text-error">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-2xl font-bold">Development Areas</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low border border-transparent hover:border-error-container/30 transition-colors">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span className="font-semibold text-on-surface">Collaborative Overload</span>
              </li>
              <li className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low border border-transparent hover:border-error-container/30 transition-colors">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span className="font-semibold text-on-surface">Perfectionist Delay</span>
              </li>
              <li className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low border border-transparent hover:border-error-container/30 transition-colors">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span className="font-semibold text-on-surface">Delegation Anxiety</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="w-full py-12 bg-slate-50 border-t border-outline-variant/10">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-2xl font-bold text-blue-700 font-headline">Careerदिशा</span>
            <span className="text-slate-500 italic font-medium">Confusion Se Clarity Tak</span>
          </div>
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-8 text-sm">
              <button className="text-slate-500 hover:text-blue-700 transition-colors">Privacy Policy</button>
              <button className="text-slate-500 hover:text-blue-700 transition-colors">Terms of Service</button>
              <button className="text-slate-500 hover:text-blue-700 transition-colors">Contact Support</button>
            </div>
            <p className="text-slate-500 text-xs">
              © 2024 The Luminary Guide. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
