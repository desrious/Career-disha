import { useState } from 'react';
import { 
  Map as MapIcon, 
  BarChart3, 
  Wrench, 
  Bot, 
  ChevronRight, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle, 
  Terminal, 
  Database, 
  Lock, 
  Award, 
  ArrowRight,
  Share2,
  Globe,
  Mail,
  TrendingUp,
  Menu
} from 'lucide-react';
import { motion } from 'motion/react';
import { SidebarNavigation, MenuButton } from './SidebarNavigation';

interface RoadmapScreenProps {
  onGoToDashboard: () => void;
  onGoToResults: () => void;
}

export default function RoadmapScreen({ onGoToDashboard, onGoToResults }: RoadmapScreenProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoUrl = "/CareerDishaLogo.png";
  const workspaceImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuCXDwRm8pPA-qylIFXu-12K_Pz3FocFV7_Bk1a_SaJcB2f1VRJxxeM-yBnCY7jmY0gvgD0YZQGwdLuNwS_1wqZu8FYkKVnms1Yebt-l_wPT766DqL85mCsA9UgRMaZfDhbJq8LobsIkESAzHyuU9O6cZ3EvyAFnkK6iGz20xL3EcvgXTfhoKKA4EfsqFup15eq9505qPBKP1OrDq9e4hni8tn8Z4p7e6hpW_HShKTzQnBGPbNuzSdmY7E2wr2S0dn81RnC6BSmDXAOm";

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col">
      <SidebarNavigation 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        onGoToDashboard={onGoToDashboard} 
        onGoToRoadmap={() => {}} 
        onGoToResults={onGoToResults}
        activeScreen="roadmap"
      />

      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-[45] bg-slate-50/80 backdrop-blur-md flex justify-between items-center px-8 h-20 max-w-full border-b border-outline-variant/10">
        <div className="flex items-center gap-4">
          {!isMenuOpen && (
            <MenuButton onClick={() => setIsMenuOpen(true)} />
          )}
          <img alt="CareerDisha Logo" className="h-12 w-auto object-contain" src={logoUrl} referrerPolicy="no-referrer" />
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          <button className="font-headline tracking-tight font-semibold text-slate-600 hover:text-blue-600 transition-colors">Home</button>
          <button className="font-headline tracking-tight font-semibold text-slate-600 hover:text-blue-600 transition-colors">How it Works</button>
          <button className="font-headline tracking-tight font-semibold text-slate-600 hover:text-blue-600 transition-colors">About</button>
        </nav>
        <div className="flex items-center gap-4">
          <button className="font-headline tracking-tight font-semibold text-slate-600 hover:opacity-80 transition-opacity">Login</button>
          <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-xl font-headline font-semibold tracking-tight hover:opacity-90 transition-transform active:scale-95">Start Assessment</button>
        </div>
      </header>

      <div className="flex flex-1 pt-20">
        {/* Main Content Canvas */}
        <main className="flex-1 p-8 md:p-12 relative">
          {/* Dot Grid Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #191c1e 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          
          <div className="max-w-5xl mx-auto relative z-10">
            {/* Header & Breadcrumbs */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-slate-500 mb-2 text-[10px] font-bold uppercase tracking-widest">
                  <span>My Journeys</span>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-primary">Data Scientist</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface font-headline tracking-tighter">Career Roadmap</h1>
                <p className="text-on-surface-variant mt-2 max-w-xl text-lg">Your curated ascent from technical foundations to industry mastery in Data Science.</p>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-outline-variant/10">
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Overall Progress</p>
                  <p className="text-2xl font-bold text-secondary font-headline">42%</p>
                </div>
                <div className="w-32 h-3 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="w-[42%] h-full bg-secondary rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Roadmap Vertical Path */}
            <div className="relative space-y-24 py-10">
              {/* The Connection Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-surface-container-highest -translate-x-1/2 z-0 hidden md:block"></div>
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-surface-container-highest z-0 md:hidden"></div>

              {/* Milestone 1: Completed */}
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0">
                <div className="flex-1 md:text-right md:pr-16 hidden md:block">
                  <div className="bg-white p-6 rounded-3xl shadow-sm border-r-4 border-secondary-fixed transition-transform hover:-translate-y-1 duration-300">
                    <h3 className="font-headline font-bold text-xl mb-2">Mathematical Pillars</h3>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">Mastering linear algebra, calculus, and probability theory as the core of data structures.</p>
                    <div className="flex justify-end gap-2">
                      <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-full uppercase">Calculus III</span>
                      <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-full uppercase">Stats</span>
                    </div>
                  </div>
                </div>
                {/* Center Node */}
                <div className="w-16 h-16 rounded-full bg-secondary-fixed text-on-secondary-container flex items-center justify-center border-4 border-surface shadow-lg relative shrink-0">
                  <CheckCircle2 className="w-8 h-8 font-bold" />
                </div>
                <div className="flex-1 md:pl-16">
                  <div className="md:hidden mb-4">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border-l-4 border-secondary-fixed">
                      <h3 className="font-headline font-bold text-xl mb-2">Foundations</h3>
                      <p className="text-sm text-slate-600">Mathematics and fundamental logic for algorithmic thinking.</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 group cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container transition-transform group-hover:scale-110">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">Course: Linear Algebra for ML</span>
                      <CheckCircle2 className="w-4 h-4 text-secondary ml-auto" />
                    </div>
                    <div className="flex items-center gap-3 group cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">Assessment: Probability Theory</span>
                      <CheckCircle2 className="w-4 h-4 text-secondary ml-auto" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestone 2: Current */}
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0">
                <div className="flex-1 md:pr-16 order-2 md:order-1">
                  <div className="bg-white p-6 rounded-3xl shadow-md ring-2 ring-tertiary/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-tertiary-fixed/30 rounded-full -mr-12 -mt-12"></div>
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-tertiary mb-1">In Progress</h4>
                    <h3 className="font-headline font-bold text-xl mb-3">Skill Building: Python & SQL</h3>
                    <p className="text-sm text-slate-600 mb-6">Transitioning from theory to practical data manipulation and storage architectures.</p>
                    <div className="space-y-3">
                      <div className="bg-surface p-3 rounded-xl flex items-center justify-between border-b-2 border-primary">
                        <div className="flex items-center gap-3">
                          <Terminal className="w-4 h-4 text-primary" />
                          <span className="text-xs font-bold">Pandas DataFrames</span>
                        </div>
                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-md font-bold">70%</span>
                      </div>
                      <div className="bg-surface p-3 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Database className="w-4 h-4 text-slate-400" />
                          <span className="text-xs font-bold text-slate-500">PostgreSQL Mastery</span>
                        </div>
                        <button className="text-[10px] bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-md font-bold hover:opacity-80">RESUME</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Center Node */}
                <div className="w-16 h-16 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center border-4 border-surface shadow-[0_0_20px_rgba(244,196,48,0.4)] relative order-1 md:order-2 shrink-0">
                  <TrendingUp className="w-8 h-8 font-bold" />
                </div>
                <div className="flex-1 md:pl-16 order-3 hidden md:block">
                  <div className="relative">
                    <img className="w-full h-48 object-cover rounded-3xl shadow-lg brightness-90" src={workspaceImg} alt="Workspace" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-3xl flex items-end p-6">
                      <p className="text-white text-xs font-medium italic">"The bridge between ideas and reality is code."</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestone 3: Locked */}
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 opacity-60 grayscale-[0.5]">
                <div className="flex-1 md:text-right md:pr-16 hidden md:block">
                  <div className="bg-surface-container p-6 rounded-3xl border border-dashed border-outline-variant">
                    <h3 className="font-headline font-bold text-xl mb-2 text-slate-500">Project Portfolio</h3>
                    <p className="text-sm text-slate-400">Apply skills to real-world datasets and build your GitHub presence.</p>
                  </div>
                </div>
                {/* Center Node */}
                <div className="w-16 h-16 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center border-4 border-surface shadow-inner relative shrink-0">
                  <Lock className="w-8 h-8" />
                </div>
                <div className="flex-1 md:pl-16">
                  <div className="md:hidden">
                    <div className="bg-surface-container p-6 rounded-3xl border border-dashed border-outline-variant mb-6">
                      <h3 className="font-headline font-bold text-xl mb-2 text-slate-500">Project Portfolio</h3>
                      <p className="text-sm text-slate-400">Locked until Skill Building is 100% complete.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-slate-400">
                      <BookOpen className="w-5 h-5" />
                      <div className="text-xs">
                        <p className="font-bold">Module: Predictive Analytics Project</p>
                        <p>Requirements: Linear Regression, Python Basics</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-slate-400">
                      <Database className="w-5 h-5" />
                      <div className="text-xs">
                        <p className="font-bold">Module: Natural Language Processing</p>
                        <p>Requirements: Advanced Python, Math Foundations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestone 4: Success */}
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 opacity-40">
                <div className="flex-1 md:pr-16 order-2 md:order-1 hidden md:block">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-surface-container rounded-2xl"></div>
                    <div className="h-24 bg-surface-container rounded-2xl"></div>
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center border-4 border-surface shadow-inner relative order-1 md:order-2 shrink-0">
                  <Award className="w-8 h-8" />
                </div>
                <div className="flex-1 md:pl-16 order-3">
                  <div className="bg-surface-container p-6 rounded-3xl border border-dashed border-outline-variant">
                    <h3 className="font-headline font-bold text-xl mb-2 text-slate-500">Job Readiness</h3>
                    <p className="text-sm text-slate-400">Interview prep, resume building, and placement support.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Summary Card */}
            <div className="mt-20 bg-white/70 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 shadow-xl flex flex-col md:flex-row items-center gap-10">
              <div className="relative w-32 h-32 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-surface-container-high" cx="64" cy="64" fill="transparent" r="56" stroke="currentColor" strokeWidth="12"></circle>
                  <circle className="text-tertiary" cx="64" cy="64" fill="transparent" r="56" stroke="currentColor" strokeDasharray="351.85" strokeDashoffset="204" strokeWidth="12"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black font-headline">42%</span>
                  <span className="text-[8px] font-bold uppercase text-slate-500">Mastery</span>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold font-headline mb-2">Maintain Your Momentum</h2>
                <p className="text-slate-600 text-sm leading-relaxed max-w-lg">You've completed the heavy lifting of mathematical theory. Your next focus is <strong>The SQL Bootcamp</strong>. Consistently spending just 30 minutes a day will put you on track for an internship in <strong>3 months</strong>.</p>
              </div>
              <button className="bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed-dim px-8 py-4 rounded-2xl font-bold transition-all shadow-lg flex items-center gap-2 flex-shrink-0">
                Continue Learning
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-slate-100 py-12 px-8 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <span className="font-headline font-bold text-slate-800 text-xl block mb-4">The Luminary Guide</span>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-widest leading-relaxed">
              © 2024 The Luminary Guide. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">Platform</h4>
            <button className="text-slate-500 text-xs uppercase tracking-widest hover:text-blue-500 transition-colors text-left">Resources</button>
            <button className="text-slate-500 text-xs uppercase tracking-widest hover:text-blue-500 transition-colors text-left">Support</button>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">Legal</h4>
            <button className="text-slate-500 text-xs uppercase tracking-widest hover:text-blue-500 transition-colors text-left">Privacy</button>
            <button className="text-slate-500 text-xs uppercase tracking-widest hover:text-blue-500 transition-colors text-left">Terms</button>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">Connect</h4>
            <div className="flex gap-4">
              <Share2 className="w-5 h-5 text-slate-400 hover:text-primary cursor-pointer" />
              <Globe className="w-5 h-5 text-slate-400 hover:text-primary cursor-pointer" />
              <Mail className="w-5 h-5 text-slate-400 hover:text-primary cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
