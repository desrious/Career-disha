const fs = require('fs');

const pt = import React from 'react';
import { Target, Map, UserCheck, Star, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function PlusTwo({ onBack }: { onBack: () => void }) {
  return (
    <div className="bg-indigo-50 min-h-screen font-sans">
      <div className="fixed top-0 w-full h-16 bg-white/90 backdrop-blur-md border-b border-indigo-100 flex items-center justify-between px-6 z-50 shadow-sm">
        <img alt="Logo" className="h-8 cursor-pointer" src="/CareerDishaLogo.png" onClick={onBack} />
        <button onClick={onBack} className="flex items-center gap-2 text-indigo-900 font-semibold"><ArrowLeft className="w-5 h-5"/> Back</button>
      </div>

      <header className="max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col md:flex-row items-center gap-12 z-10 relative">
        <div className="md:w-1/2 space-y-6">
          <div className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 font-bold rounded-full text-sm">PLUS TWO (11TH & 12TH)</div>
          <h1 className="text-5xl md:text-6xl font-black text-indigo-950 leading-tight">Design Your <span className="text-indigo-600">College Journey</span></h1>
          <p className="text-lg text-indigo-800/80 leading-relaxed font-medium">Navigate complex choices on entrance exams, specialized degrees, and university planning over your crucial remaining school years.</p>
        </div>
        <div className="md:w-1/2 w-full h-[400px] md:h-[500px] relative rounded-[2rem] overflow-hidden shadow-2xl">
           <div className="absolute inset-0 bg-slate-50 bg-[url('/confused.png')] bg-[length:100%_auto] bg-no-repeat bg-center"></div>
        </div>
      </header>

      <section className="bg-indigo-950 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-bold mb-3 text-rose-400">Course Specialization</h3>
              <p className="text-indigo-200">Deciding between Engineering, Medical, Commerce, and Humanities. Choosing a path that aligns with your aptitude.</p>
            </div>
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-bold mb-3 text-amber-400">Exam Preparation</h3>
              <p className="text-indigo-200">Managing stress and mapping realistic goals for highly competitive national entrance exams alongside boards.</p>
            </div>
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-bold mb-3 text-blue-400">Expectation Management</h3>
              <p className="text-indigo-200">Balancing societal and parental expectations against a student's actual unique capabilities and interests.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2 w-full h-[500px] relative rounded-[3rem] overflow-hidden bg-slate-50 bg-[url('/confident.png')] bg-[length:100%_auto] bg-no-repeat bg-top"></div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-indigo-950 mb-6">Precision Guidance</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
               <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl font-semibold text-indigo-900 border border-indigo-100">Psychometric Eval</div>
               <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl font-semibold text-indigo-900 border border-indigo-100">University Shortlisting</div>
               <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl font-semibold text-indigo-900 border border-indigo-100">Major Identification</div>
               <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl font-semibold text-indigo-900 border border-indigo-100">Exam Planning</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
\;

const gs = \import React from 'react';
import { Target, ArrowLeft, Layers } from 'lucide-react';

export default function GraduatesService({ onBack }: { onBack: () => void }) {
  return (
    <div className="bg-emerald-50 min-h-screen pt-16 font-serif">
      <div className="fixed top-0 w-full h-16 bg-white/90 backdrop-blur-md border-b flex items-center justify-between px-6 z-50">
        <img alt="Logo" className="h-8 cursor-pointer" src="/CareerDishaLogo.png" onClick={onBack} />
        <button onClick={onBack} className="flex items-center gap-2 font-semibold"><ArrowLeft className="w-5 h-5"/> Back</button>
      </div>

      <header className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-block px-4 py-1 border-2 border-emerald-600 text-emerald-700 font-bold rounded-full text-sm uppercase tracking-wider mb-6">For Graduates</div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6">Catapult Your <span className="text-emerald-600">Early Career</span></h1>
        
        <div className="w-full h-[60vh] rounded-[3rem] overflow-hidden shadow-2xl relative mt-12 bg-[url('/confused.png')] bg-[length:100%_auto] bg-no-repeat bg-center"></div>
      </header>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
           <div className="flex flex-col justify-center space-y-8">
              <h2 className="text-4xl font-bold text-slate-900">The Immediate Graduate Crossroads</h2>
              <div className="p-6 bg-emerald-50 rounded-2xl">
                 <h3 className="text-xl font-bold text-slate-900">Industry Roles</h3>
                 <p className="text-slate-600 mt-2">Which sector truly matches your degree and personality?</p>
              </div>
              <div className="p-6 bg-teal-50 rounded-2xl">
                 <h3 className="text-xl font-bold text-slate-900">Higher Education</h3>
                 <p className="text-slate-600 mt-2">Should you pursue a Master's degree right away or gain experience?</p>
              </div>
           </div>
           <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-xl bg-slate-50 bg-[url('/confident.png')] bg-[length:100%_auto] bg-no-repeat bg-top"></div>
        </div>
      </section>
    </div>
  );
}
\;

const wp = \import React from 'react';
import { ArrowLeft, TrendingUp } from 'lucide-react';

export default function WorkingProfessionalService({ onBack }: { onBack: () => void }) {
  return (
    <div className="bg-slate-900 min-h-screen pt-16 text-slate-300">
      <div className="fixed top-0 w-full h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 z-50">
        <img alt="Logo" className="h-8 cursor-pointer invert brightness-0" src="/CareerDishaLogo.png" onClick={onBack} />
        <button onClick={onBack} className="flex items-center gap-2 hover:text-white font-semibold"><ArrowLeft className="w-5 h-5"/> Back</button>
      </div>

      <div className="grid lg:grid-cols-2 min-h-[85vh]">
          <div className="flex flex-col justify-center p-10 lg:p-20 z-10">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-semibold tracking-wide w-max mb-8"><TrendingUp className="w-4 h-4"/> WORKING PROFESSIONAL</div>
             <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-8">Pivot.<br/>Upskill.<br/>Accelerate.</h1>
             <p className="text-xl text-slate-400 mb-12">Help professionals align their career trajectory with evolving interests.</p>
          </div>
          <div className="relative h-[60vh] lg:h-auto overflow-hidden bg-slate-800 bg-[url('/confused.png')] bg-[length:100%_auto] bg-no-repeat bg-center mix-blend-luminosity opacity-60"></div>
      </div>

      <section className="py-20 lg:py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
           <div className="relative h-[500px] rounded-2xl overflow-hidden bg-slate-800 bg-[url('/confident.png')] bg-[length:100%_auto] bg-no-repeat bg-top opacity-80"></div>
           <div>
               <h2 className="text-4xl lg:text-5xl font-bold text-white mb-10">Navigate Mid-Career Plateau</h2>
               <div className="space-y-8">
                  <div className="border-l-4 border-blue-500 pl-6">
                     <h3 className="text-2xl font-semibold text-blue-400 mb-2">Career Reinvention</h3>
                     <p className="text-slate-400">Uncover adjacent industries where your current specialized skill set acts as a force multiplier.</p>
                  </div>
                  <div className="border-l-4 border-teal-500 pl-6">
                     <h3 className="text-2xl font-semibold text-teal-400 mb-2">Leadership Transition</h3>
                     <p className="text-slate-400">Map out the psychological and practical gaps between individual contributor and management.</p>
                  </div>
               </div>
           </div>
        </div>
      </section>
    </div>
  );
}
\;

fs.writeFileSync('C:/Users/LENOVO/OneDrive/Desktop/Career disha/Career-disha/src/components/PlusTwo.tsx', pt);
fs.writeFileSync('C:/Users/LENOVO/OneDrive/Desktop/Career disha/Career-disha/src/components/GraduatesService.tsx', gs);
fs.writeFileSync('C:/Users/LENOVO/OneDrive/Desktop/Career disha/Career-disha/src/components/WorkingProfessionalService.tsx', wp);
