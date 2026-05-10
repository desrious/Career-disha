import React from 'react';
import { ArrowLeft, BookOpen, Clock } from 'lucide-react';

interface BrochurePageProps {
  onBack: () => void;
}

export default function BrochurePage({ onBack }: BrochurePageProps) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center font-sans relative">
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-primary transition-colors hover:bg-slate-200/50 p-2 rounded-lg"
      >
        <ArrowLeft size={20} />
        <span className="font-medium hidden sm:inline">Back to Home</span>
      </button>

      <div className="bg-white p-10 md:p-16 rounded-2xl shadow-xl shadow-slate-200/50 max-w-2xl w-full border border-slate-100 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8 relative">
          <BookOpen className="text-primary w-12 h-12" strokeWidth={1.5} />
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-slate-100">
             <Clock className="text-amber-500 w-6 h-6" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-slate-900 mb-5 tracking-tight">
          Brochure Coming Soon
        </h1>
        
        <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
          We are currently updating our comprehensive program brochure to ensure you receive the most detailed and up-to-date information about our offerings.
        </p>

        <div className="flex items-center gap-3 text-slate-700 bg-slate-50 px-6 py-4 rounded-xl border border-slate-100 w-full justify-center">
          <span className="font-medium">It will be available for download soon. Please check back later.</span>
        </div>
        
        <button 
          onClick={onBack}
          className="mt-10 px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
}
