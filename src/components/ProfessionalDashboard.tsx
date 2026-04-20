import { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Settings, 
  Search, 
  Bell, 
  Menu,
  ChevronRight,
  TrendingUp,
  Target,
  Clock,
  Briefcase,
  Brain,
  Zap,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  BarChart,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SidebarNavigation } from './SidebarNavigation';

interface ProfessionalDashboardProps {
  onGoToResults: () => void;
  onGoToRoadmap: () => void;
}

export default function ProfessionalDashboard({ onGoToResults, onGoToRoadmap }: ProfessionalDashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pathMode, setPathMode] = useState<'switch' | 'grow'>('switch');

  const logoUrl = "/CareerDishaLogo.png";

  // Mock data for the dashboard
  const user = {
    name: "Sarah Connor",
    currentRole: "Marketing Executive",
    experience: "3 years experience",
    suggestedRole: "Product Manager",
    insight: "Based on your analytical and communication strengths, transitioning into product roles is a strong fit.",
    completion: 35
  };

  const pathStats = {
    switch: {
      time: "6–8 months",
      difficulty: "Medium",
      salary: "15 - 20 LPA",
      growth: "High (20% YoY)"
    },
    grow: {
      time: "3–5 months",
      difficulty: "Low-Medium",
      salary: "10 - 14 LPA",
      growth: "Steady (10% YoY)"
    }
  };

  const currentStats = pathStats[pathMode];

  return (
    <div className="bg-surface text-on-surface min-h-screen font-body flex overflow-hidden">
      {/* Sidebar Navigation */}
      <SidebarNavigation 
        isMenuOpen={isSidebarOpen} 
        setIsMenuOpen={setIsSidebarOpen} 
        onGoToResults={onGoToResults}
        onGoToRoadmap={onGoToRoadmap}
        activeScreen="dashboard"
      />

      <div className="flex-1 flex flex-col min-h-screen h-screen overflow-hidden relative">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <header className="h-20 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/20 flex items-center justify-between px-4 lg:px-8 z-30 sticky top-0 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2.5 rounded-xl hover:bg-surface-container-high transition-colors lg:hidden"
            >
              <Menu className="w-6 h-6 text-on-surface" />
            </button>
            <div className="flex items-center gap-3">
              <img src={logoUrl} alt="CareerDisha Logo" className="h-8 w-auto hidden sm:block" />
              <h1 className="font-headline font-bold text-xl text-on-surface flex items-center gap-2">
                Executive <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-md text-sm">Pro</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-surface-container-high rounded-full px-4 py-2 border border-outline-variant/20">
              <Search className="w-4 h-4 text-on-surface-variant mr-2" />
              <input 
                type="text" 
                placeholder="Search strategies, skills..." 
                className="bg-transparent border-none focus:outline-none text-sm w-48 text-on-surface placeholder:text-on-surface-variant/50"
              />
            </div>
            <button className="relative p-2.5 rounded-full hover:bg-surface-container-high transition-colors border border-outline-variant/20">
              <Bell className="w-5 h-5 text-on-surface-variant" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface-container-lowest"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-outline-variant/20 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-tertiary flex items-center justify-center text-white font-bold shadow-md">
                SC
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold">{user.name}</p>
                <p className="text-xs text-on-surface-variant">{user.currentRole}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 z-10 scroll-smooth">
          
          {/* Section 1: Career Snapshot (Identity + Direction) */}
          <section className="bg-surface-container-lowest rounded-3xl p-6 lg:p-8 shadow-sm border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
            <div className="flex flex-col lg:flex-row justify-between gap-8 relative z-10">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Strategic Overview</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-on-surface">
                  <div className="flex flex-col">
                    <span className="text-sm text-on-surface-variant mb-1">Current State</span>
                    <span className="text-xl font-bold bg-surface-container-high px-4 py-2 rounded-xl border border-outline-variant/20 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-outline" /> {user.currentRole}
                    </span>
                  </div>
                  <ChevronRight className="w-6 h-6 text-outline-variant hidden sm:block mt-6" />
                  <div className="flex flex-col">
                    <span className="text-sm text-on-surface-variant mb-1">Target Direction</span>
                    <span className="text-xl font-bold bg-primary/10 text-primary px-4 py-2 rounded-xl border border-primary/20 flex items-center gap-2">
                      <Target className="w-5 h-5" /> {user.suggestedRole}
                    </span>
                  </div>
                </div>
                <p className="text-on-surface-variant leading-relaxed mt-4 max-w-3xl flex items-start gap-3 bg-surface-container-highest/30 p-4 rounded-xl border border-outline-variant/10">
                  <Zap className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
                  <span>{user.insight}</span>
                </p>
              </div>
              
              {/* Progress Tracker (Motivation Engine) */}
              <div className="lg:w-64 shrink-0 flex flex-col items-center justify-center p-6 bg-surface-container-highest rounded-2xl border border-outline-variant/10">
                <div className="relative w-24 h-24 mb-3">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-outline-variant/20" strokeWidth="8" />
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" stroke="currentColor" 
                      className="text-primary transition-all duration-1000 ease-out" 
                      strokeWidth="8" 
                      strokeDasharray="283" 
                      strokeDashoffset={283 - (283 * user.completion) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-2xl font-bold text-on-surface">{user.completion}%</span>
                  </div>
                </div>
                <h3 className="font-bold text-sm text-center mb-1">Readiness Score</h3>
                <p className="text-xs text-center text-on-surface-variant">Next: Complete SQL Basics</p>
              </div>
            </div>
          </section>

          {/* Section 2: Career Switch / Growth Simulator & Time-Based Planning */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Simulator */}
            <div className="lg:col-span-2 bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-outline-variant/10 flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-lg font-bold flex items-center gap-2"><TrendingUp className="w-5 h-5 text-secondary" /> Path Simulator</h2>
                
                <div className="flex p-1 bg-surface-container-highest rounded-xl border border-outline-variant/20">
                  <button 
                    onClick={() => setPathMode('switch')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${pathMode === 'switch' ? 'bg-surface-container-lowest shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
                  >
                    Switch Career
                  </button>
                  <button 
                    onClick={() => setPathMode('grow')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${pathMode === 'grow' ? 'bg-surface-container-lowest shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
                  >
                    Grow in Current
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-surface-container-highest rounded-2xl border border-outline-variant/10">
                  <div className="flex items-center gap-2 text-on-surface-variant text-xs font-bold uppercase mb-2"><Clock className="w-4 h-4"/> Time</div>
                  <div className="font-headline font-bold text-on-surface">{currentStats.time}</div>
                </div>
                <div className="p-4 bg-surface-container-highest rounded-2xl border border-outline-variant/10">
                  <div className="flex items-center gap-2 text-on-surface-variant text-xs font-bold uppercase mb-2"><Target className="w-4 h-4"/> Difficulty</div>
                  <div className="font-headline font-bold text-on-surface">{currentStats.difficulty}</div>
                </div>
                <div className="p-4 bg-surface-container-highest rounded-2xl border border-outline-variant/10">
                  <div className="flex items-center gap-2 text-on-surface-variant text-xs font-bold uppercase mb-2"><TrendingUp className="w-4 h-4"/> Salary</div>
                  <div className="font-headline font-bold text-secondary">{currentStats.salary}</div>
                </div>
                <div className="p-4 bg-surface-container-highest rounded-2xl border border-outline-variant/10">
                  <div className="flex items-center gap-2 text-on-surface-variant text-xs font-bold uppercase mb-2"><BarChart className="w-4 h-4"/> Growth</div>
                  <div className="font-headline font-bold text-on-surface">{currentStats.growth}</div>
                </div>
              </div>
              
              {/* Time-based planning integrated loosely here */}
              <div className="mt-auto bg-primary/5 rounded-xl p-4 border border-primary/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <span className="text-sm font-bold text-on-surface block">Suggested Pace</span>
                    <span className="text-xs text-on-surface-variant">1–2 hrs/day • Weekends focused on projects</span>
                  </div>
                </div>
                <button className="text-primary text-sm font-bold hover:underline">Adjust</button>
              </div>
            </div>

            {/* AI Mentor */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-outline-variant/10 flex flex-col bg-gradient-to-b from-surface-container-lowest to-surface-container-lowest relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/10 rounded-full blur-[40px] pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-tertiary/20 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-tertiary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Strategic AI Mentor</h2>
                  <p className="text-xs text-on-surface-variant">Direct & Practical Advice</p>
                </div>
              </div>

              <div className="flex-1 bg-surface-container-highest/50 rounded-2xl p-4 mb-4 border border-outline-variant/10 relative z-10 overflow-y-auto space-y-4">
                <div className="bg-surface-container-lowest p-3 rounded-xl rounded-tl-none border border-outline-variant/10 shadow-sm">
                  <p className="text-sm text-on-surface leading-relaxed">Don't quit your job immediately. You have 60% of the required analytics skills for Product Management, but lack structural PM frameworks. Build those in the next 8 weeks alongside your job.</p>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-xl rounded-tr-none border border-outline-variant/10 shadow-sm ml-8 bg-primary/5 border-primary/10">
                  <p className="text-sm text-on-surface leading-relaxed">Should I start applying now?</p>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-xl rounded-tl-none border border-outline-variant/10 shadow-sm">
                  <p className="text-sm text-on-surface leading-relaxed">Not yet. Let's finish the 'Agile Project Simulation' on your roadmap first to have a solid talking point for interviews.</p>
                </div>
              </div>

              <div className="relative z-10">
                <input 
                  type="text" 
                  placeholder="Ask a strategic question..." 
                  className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/50"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-tertiary text-on-tertiary rounded-lg hover:bg-tertiary/90 transition-colors">
                   <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: Personalized Roadmap & Skill Gap */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Roadmap Execution Engine */}
            <div className="lg:col-span-2 bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-outline-variant/10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Execution Roadmap</h2>
                <button onClick={onGoToRoadmap} className="text-sm font-bold text-primary hover:underline">View Full</button>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-outline-variant/30 before:to-transparent">
                
                {/* Phase 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-surface-container-lowest bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-primary/5 border border-primary/20 shadow-sm ml-4 md:ml-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-sm text-primary">Phase 1 (Weeks 1–4)</h3>
                      <span className="text-xs font-bold text-primary bg-white px-2 py-0.5 rounded-full">In Progress</span>
                    </div>
                    <p className="text-sm font-semibold mb-2">Core PM Concepts & Frameworks</p>
                    <ul className="space-y-1.5 mt-2">
                       <li className="flex items-center gap-2 text-xs text-on-surface-variant"><CheckCircle2 className="w-3.5 h-3.5 text-primary"/> Intro to Agile (Completed)</li>
                       <li className="flex items-center gap-2 text-xs text-on-surface"><div className="w-3.5 h-3.5 rounded-full border-2 border-primary border-t-transparent animate-spin shrink-0"/> PRD Writing (1 hr left)</li>
                    </ul>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-surface-container-lowest bg-surface-container-highest text-outline shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm ml-4 md:ml-0 opacity-70">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-sm text-on-surface-variant">Phase 2 (Weeks 5–8)</h3>
                    </div>
                    <p className="text-sm font-semibold mb-2">Build 2 Practical Projects</p>
                    <p className="text-xs text-on-surface-variant">Apply frameworks to a real problem statement.</p>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-surface-container-lowest bg-surface-container-highest text-outline shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm ml-4 md:ml-0 opacity-50">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-sm text-on-surface-variant">Phase 3 (Weeks 9–12)</h3>
                    </div>
                    <p className="text-sm font-semibold">Apply & Network</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Skill Gap Analysis */}
              <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-outline-variant/10 flex-1">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><Target className="w-5 h-5 text-error" /> Skill Gap Analysis</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-surface-container-highest rounded-xl border border-outline-variant/10">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      <span className="text-sm font-bold">Communication</span>
                    </div>
                    <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-md">Strong</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-surface-container-highest rounded-xl border border-outline-variant/10">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      <span className="text-sm font-bold">Data Analysis</span>
                    </div>
                    <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-md">Good</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-error/5 rounded-xl border border-error/20">
                    <div className="flex items-center gap-3">
                      <XCircle className="w-5 h-5 text-error" />
                      <span className="text-sm font-bold">SQL / Data Structs</span>
                    </div>
                    <span className="text-xs font-bold text-error bg-error/10 px-2 py-1 rounded-md">Missing</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-tertiary/5 rounded-xl border border-tertiary/20">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-tertiary" />
                      <span className="text-sm font-bold">Agile/Scrum</span>
                    </div>
                    <span className="text-xs font-bold text-tertiary bg-tertiary/10 px-2 py-1 rounded-md">Priority</span>
                  </div>
                </div>
              </div>

              {/* Resume & Profile Optimization */}
              <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-outline-variant/10">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /> Application Toolkit</h2>
                <p className="text-xs text-on-surface-variant mb-4">Tailor your profile for Product Management roles emphasizing transferrable marketing skills.</p>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 rounded-xl border border-outline-variant/20 hover:border-primary/50 hover:bg-primary/5 transition-all text-left group">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                      <span className="text-sm font-bold text-on-surface">Tailor Resume</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-outline-variant group-hover:text-primary transition-colors" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-xl border border-outline-variant/20 hover:border-primary/50 hover:bg-primary/5 transition-all text-left group">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                      <span className="text-sm font-bold text-on-surface">Optimize LinkedIn</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-outline-variant group-hover:text-primary transition-colors" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
}