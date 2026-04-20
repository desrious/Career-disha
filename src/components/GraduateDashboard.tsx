import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  Zap,
  FileText,
  BarChart3,
  Briefcase,
  Target,
  Code
} from 'lucide-react';
import { SidebarNavigation, MenuButton } from './SidebarNavigation';

interface GraduateDashboardProps {
  onGoToResults: () => void;
  onGoToRoadmap: () => void;
}

export default function GraduateDashboard({ onGoToResults, onGoToRoadmap }: GraduateDashboardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-surface flex font-body">
      {/* Sidebar */}
      <SidebarNavigation 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        onGoToDashboard={() => {}} 
        onGoToRoadmap={onGoToRoadmap} 
        onGoToResults={onGoToResults}
        activeScreen="dashboard"
      />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto w-full">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            {!isMenuOpen && (
              <MenuButton onClick={() => setIsMenuOpen(true)} />
            )}
            <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight font-headline m-0">
              Hello, <span className="text-primary">Rahul</span>! Let's land that <span className="text-primary">Data Scientist</span> role.
            </h1>
          </div>
          <p className="text-lg text-on-surface-variant leading-relaxed max-w-3xl">
            Your profile is currently 70% match for entry-level Data Science roles. Here is your strategic action plan to bridge the gap.
          </p>
        </header>

        {/* Top Section: AI Strategy & Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Action-Oriented AI Mentor */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full pointer-events-none"></div>
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-on-surface">Career Strategy</h3>
                  <p className="text-sm text-on-surface-variant">AI-Generated Action Plan</p>
                </div>
              </div>
              <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">Switching Career</span>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed mb-10 font-medium">
              "To successfully transition into Data Science from your IT background, you need to transition from theoretical knowledge to practical application. <strong className="text-primary">Focus heavily on building 2 end-to-end Python projects</strong> in the next 3 months rather than just completing more courses."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
              <div className="bg-surface-container-lowest border border-outline-variant/20 p-5 rounded-2xl hover:border-primary/30 transition-colors">
                <Target className="w-5 h-5 text-primary mb-3" />
                <p className="text-xs font-bold text-outline uppercase tracking-widest mb-1">Recommended Role</p>
                <p className="font-bold text-lg text-slate-800">Jr. Data Scientist</p>
                <p className="text-xs text-slate-500 mt-1">High demand in your area</p>
              </div>
              
              <div className="bg-surface-container-lowest border border-outline-variant/20 p-5 rounded-2xl hover:border-secondary/30 transition-colors">
                <Briefcase className="w-5 h-5 text-secondary mb-3" />
                <p className="text-xs font-bold text-outline uppercase tracking-widest mb-1">Target Industry</p>
                <p className="font-bold text-lg text-slate-800">FinTech / SaaS</p>
                <p className="text-xs text-slate-500 mt-1">Matches your prior domain</p>
              </div>

              <div className="bg-surface-container-lowest border border-outline-variant/20 p-5 rounded-2xl hover:border-tertiary/30 transition-colors">
                <Code className="w-5 h-5 text-tertiary mb-3" />
                <p className="text-xs font-bold text-outline uppercase tracking-widest mb-1">Critical Skill Gap</p>
                <p className="font-bold text-lg text-slate-800">SQL & Pandas</p>
                <p className="text-xs text-slate-500 mt-1">Needed for tech interviews</p>
              </div>
            </div>
          </div>

          {/* Progress Tracker Tracker */}
          <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary blur-[50px] opacity-30 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            
            <div className="relative z-10">
              <p className="text-[10px] font-bold tracking-widest uppercase mb-4 text-slate-400">Job Readiness Score</p>
              <div className="flex items-end gap-2 mb-2">
                <h3 className="text-5xl font-extrabold leading-none">70<span className="text-2xl text-slate-400">%</span></h3>
              </div>
              <p className="text-sm text-slate-300 mb-8">Almost interview-ready. Complete the pending projects to hit 85%.</p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2 text-slate-300">
                    <span>Roadmap Completion</span>
                    <span>12 / 18 Tasks</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[66%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={onGoToRoadmap}
              className="relative z-10 w-full py-4 bg-white text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-all shadow-lg"
            >
              <span>View Action Plan</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Middle Section: Practical Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
           {/* Section 1: Resume & Skill Gap */}
           <div className="bg-surface-container-low rounded-[2.5rem] p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-2xl">Application Toolkit</h3>
                <span className="px-3 py-1 bg-surface-container-highest text-xs font-bold rounded-full border border-outline-variant/20">Essential</span>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl flex items-center gap-5 border border-outline-variant/10 hover:shadow-md transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-bold text-slate-800 text-lg">Resume Builder</p>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md mb-1">Score: 68/100</span>
                    </div>
                    <p className="text-xs text-slate-500">Needs ATS optimization for Data roles.</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                </div>
                
                <div className="bg-white p-5 rounded-2xl flex items-center gap-5 border border-outline-variant/10 hover:shadow-md transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-white transition-colors">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 text-lg mb-1">Live Skill Gap Analysis</p>
                    <p className="text-xs text-slate-500"><strong className="text-slate-700">Missing:</strong> Cloud Deployment (AWS), ML Ops basics</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-tertiary transition-colors" />
                </div>
              </div>
            </div>

            {/* Section 2: Roadmap Highlights */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-outline-variant/10 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-2xl">This Week's Targets</h3>
                <button className="text-primary text-sm font-bold hover:underline">See all tasks</button>
              </div>

              <div className="flex-1 space-y-4">
                <div className="group flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform"></div>
                  </div>
                  <div className="flex-1 pb-4 border-b border-outline-variant/10">
                    <p className="font-bold text-slate-800 line-clamp-1">Build Customer Churn Prediction Model</p>
                    <p className="text-sm text-slate-500 mt-1">Portfolio Project • Tech: Python, Scikit-learn</p>
                  </div>
                </div>
                
                <div className="group flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform"></div>
                  </div>
                  <div className="flex-1 pb-4 border-b border-outline-variant/10">
                    <p className="font-bold text-slate-800 line-clamp-1">Master Advanced SQL Joins & Window Functions</p>
                    <p className="text-sm text-slate-500 mt-1">Skill Building • Est: 4 hours</p>
                  </div>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center flex-shrink-0 mt-1 bg-slate-100">
                    <CheckCircle2 className="w-full h-full text-slate-400" />
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-bold text-slate-400 line-through">Revamp LinkedIn Profile Headline</p>
                    <p className="text-sm text-slate-400 mt-1">Completed 2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
        </div>

        {/* Bottom Section: Opportunities */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-extrabold font-headline mb-1">Recommended Opportunities</h2>
              <p className="text-slate-500">Based on your current skill level and trajectory</p>
            </div>
            <button className="text-primary font-bold flex items-center gap-2 hover:underline">
              Job Board <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="bg-white border border-outline-variant/10 rounded-[2rem] p-6 hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 font-bold text-xl">
                A
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Internship • Remote</p>
              <h4 className="font-bold text-xl mb-1 line-clamp-1">Data Engineeer Intern</h4>
              <p className="text-slate-500 text-sm mb-4">Apex Analytics</p>
              <div className="flex items-center gap-2 mb-6">
                 <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">Python</span>
                 <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">ETL</span>
              </div>
              <button className="w-full py-3 bg-slate-50 text-primary font-bold rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                Quick Apply
              </button>
            </div>

            <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-[2rem] p-6 hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 blur-[30px] rounded-full"></div>
              <div className="w-12 h-12 bg-white/10 text-white rounded-xl flex items-center justify-center mb-4 font-bold text-xl backdrop-blur-md">
                Z
              </div>
              <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2">Entry-Level • On-site</p>
              <h4 className="font-bold text-xl mb-1 line-clamp-1 text-white">Junior Data Scientist</h4>
              <p className="text-slate-400 text-sm mb-4">Zenith Corp • Bangalore</p>
              <div className="flex items-center gap-2 mb-6">
                 <span className="text-xs bg-white/10 text-slate-300 px-2 py-1 rounded">Machine Learning</span>
                 <span className="text-xs bg-white/10 text-slate-300 px-2 py-1 rounded">SQL</span>
              </div>
              <button className="w-full py-3 bg-accent text-slate-900 font-bold rounded-xl group-hover:bg-white transition-colors">
                View Details
              </button>
            </div>
            
            <div className="bg-secondary-container/10 border border-secondary-container/30 rounded-[2rem] p-6 flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-secondary-container/20 transition-colors">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-secondary mb-4 shadow-sm group-hover:scale-110 transition-transform">
                 <ArrowRight className="w-6 h-6" />
               </div>
               <h4 className="font-bold text-lg mb-2">Unlock More Roles</h4>
               <p className="text-sm text-slate-500">Discover 50+ handpicked opportunities matching your profile.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}