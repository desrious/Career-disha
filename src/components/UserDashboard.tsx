import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  Zap,
  FileText,
  BarChart3
} from 'lucide-react';
import { SidebarNavigation, MenuButton } from './SidebarNavigation';

interface UserDashboardProps {
  onGoToResults: () => void;
  onGoToRoadmap: () => void;
}

export default function UserDashboard({ onGoToResults, onGoToRoadmap }: UserDashboardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const logoUrl = "/CareerDishaLogo.png";
  const avatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuAIzOqjcnqP--aMQz0kQC2LXF-AuSgPlTnz96QBZ4_qVnWSprPxEj932eIr999rzlGgMEJotG3S2f4hZrVRErOFtlDV364m8NsBdbJuR3e3-eqQX-sB9jNt0lsvUkosK0J1OJBy5qjYueLl2ol5kSutOu5C3hqNnOK9WG9uRMXZucflvwsSl80cukXdmy8_lBVv7exTDojGhStyepiAdFiZ80dHFpIv-Qb-YAyJ6TZNX6D5dw9NaOfhOCm9EM_c7-4jhSTcABI9BWTO";

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
      <main className="flex-1 p-12 overflow-y-auto w-full">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            {!isMenuOpen && (
              <MenuButton onClick={() => setIsMenuOpen(true)} />
            )}
            <h1 className="text-5xl font-extrabold text-on-surface tracking-tight font-headline m-0">
              Hello, <span className="text-primary">Aditi</span>! Your journey to <span className="text-primary">UX Architect</span> starts here.
            </h1>
          </div>
          <p className="text-lg text-on-surface-variant leading-relaxed max-w-3xl">
            Based on your recent assessment, you're 65% aligned with your dream role. Let's bridge the remaining gap today.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* AI Mentor Guidance */}
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 shadow-sm border border-outline-variant/10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">AI Mentor Guidance</h3>
              </div>
            </div>

            <p className="text-xl text-on-surface leading-relaxed mb-10 italic">
              "Aditi, your natural flair for <span className="bg-secondary-container/30 px-2 rounded">Visual Hierarchy</span> and <span className="bg-secondary-container/30 px-2 rounded">Systemic Thinking</span> makes you a standout candidate for Design Leadership."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface-container-low p-6 rounded-3xl">
                <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-4">Top Careers</p>
                <p className="font-bold text-lg mb-1">UX Architect</p>
                <div className="text-xs text-on-surface-variant space-y-1">
                  <p>Product Strategist</p>
                  <p>Service Designer</p>
                </div>
              </div>
              <div className="bg-surface-container-low p-6 rounded-3xl">
                <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-4">Strengths</p>
                <div className="text-sm font-bold space-y-2">
                  <p>Empathy Mapping</p>
                  <p>Data Synthesis</p>
                </div>
              </div>
              <div className="bg-surface-container-low p-6 rounded-3xl">
                <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-4">Growth Areas</p>
                <div className="text-sm font-bold space-y-2">
                  <p>Stakeholder Management</p>
                  <p>Advanced Figma Dev-Handover</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Next Milestone */}
            <div className="bg-primary text-white rounded-[2.5rem] p-8 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] font-bold tracking-widest uppercase mb-4 opacity-80">Your Next Milestone</p>
                <h3 className="text-2xl font-bold mb-6 leading-tight">Complete the "Information Architecture" Module</h3>
                
                <div className="mb-8">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>Progress to UX Architect</span>
                    <span>65%</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary-container w-[65%] rounded-full"></div>
                  </div>
                </div>

                <button className="w-full py-4 bg-white text-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all">
                  <span>Resume Learning</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Career Toolkit */}
            <div className="bg-surface-container-low rounded-[2.5rem] p-8">
              <h3 className="font-bold text-xl mb-6">Career Toolkit</h3>
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl flex items-center gap-4 border border-outline-variant/10">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">Resume Builder</p>
                    <p className="text-[10px] text-outline">Optimized for AI screening</p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl flex items-center gap-4 border border-outline-variant/10">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">Skill Gap Analysis</p>
                    <p className="text-[10px] text-outline">8 missing skills identified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curated for You */}
        <section className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-extrabold font-headline">Curated for You</h2>
            <button className="text-primary font-bold flex items-center gap-2 hover:underline">
              View All Resources <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group cursor-pointer overflow-hidden rounded-[2.5rem]">
              <img 
                src="https://picsum.photos/seed/design/800/450" 
                alt="Workshop" 
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
                <span className="bg-tertiary-container text-on-tertiary-container text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-widest">Expert Workshop</span>
                <h3 className="text-2xl font-bold text-white mb-2">Mastering User Psychology in Interface Design</h3>
                <p className="text-white/60 text-sm">Friday, Oct 12 • 6:00 PM IST</p>
              </div>
            </div>

            <div className="bg-secondary-container/10 border-l-4 border-secondary-container rounded-[2.5rem] p-10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-secondary-container rounded-2xl flex items-center justify-center text-on-secondary-container mb-6">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Get Certified by Industry Leaders</h3>
                <p className="text-on-surface-variant leading-relaxed mb-8">
                  Enroll in the Advanced UX Leadership track and get a verified badge from Careerदिशा.
                </p>
              </div>
              <button className="text-primary font-bold flex items-center gap-2 hover:underline">
                Check Eligibility <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
