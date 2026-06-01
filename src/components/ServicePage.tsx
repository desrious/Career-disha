import { Brain, ArrowRight, CheckCircle2, Map, BookOpen, UserCheck, Star, ArrowLeft, Target, Users } from 'lucide-react';
import { LOGO_URL } from '../data/constants';
import type { ServicePageData } from '../data/servicePageData';

interface ServicePageProps {
  data: ServicePageData;
  onBack: () => void;
}

export default function ServicePage({ data, onBack }: ServicePageProps) {
  return (
    <div className="bg-slate-900 min-h-screen pt-20 relative">

      {/* Navigation Layer */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-50 shadow-sm">
        <div className="flex items-center gap-3 md:gap-4">
          <img
            alt="Careerदिशा Logo"
            className="h-10 w-auto object-contain cursor-pointer transition-transform hover:scale-105 shrink-0"
            src={LOGO_URL}
            onClick={onBack}
            referrerPolicy="no-referrer"
          />
          <span className="hidden sm:block text-slate-800 font-semibold text-sm md:text-base border-l-2 border-slate-300 pl-3 md:pl-4">{data.pageTitle}</span>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-700 hover:text-primary font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>
      </div>

      {/* SECTION 1: CONFUSED (Hero + Problem) */}
      <div 
        className="relative w-full bg-cover bg-center bg-no-repeat min-h-screen"
        style={{ backgroundImage: `url('${data.bgConfused || '/confused.png'}')` }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        {/* Gradient at the bottom to blend into the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-slate-900 z-0 pointer-events-none"></div>

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 mt-[-5rem] pt-[calc(5rem+4rem)] z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto bg-[rgba(255,255,255,0.75)] backdrop-blur-md p-8 rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-black/5 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out">
              <span className="inline-block py-1 px-3 rounded-full bg-amber-100 text-amber-700 font-bold text-sm mb-4 border border-amber-200 shadow-sm">
                {data.badge}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-950 tracking-tight leading-tight mb-6 drop-shadow-sm">
                {data.heroTitle}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">{data.heroHighlight}</span>
              </h1>
              <p className="text-xl text-slate-800 mb-10 leading-relaxed font-medium">
                {data.heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="https://lifemap.mycareerdisha.com/" target="_blank" rel="noopener noreferrer" aria-label={data.ctaText} className="px-8 py-4 text-base font-bold rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-blue-950 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-1 transition-all duration-300 inline-block">
                  {data.ctaText}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-12 lg:py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 bg-[rgba(255,255,255,0.75)] backdrop-blur-md p-6 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-black/5 max-w-2xl mx-auto hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out">
              <h2 className="text-3xl font-bold text-blue-950 mb-4">{data.problemHeading}</h2>
              <p className="text-lg text-slate-800 font-medium">{data.problemSubtext}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {data.problems.map((problem, index) => {
                const Icon = problem.icon;
                return (
                  <div key={index} className="bg-[rgba(255,255,255,0.75)] backdrop-blur-md rounded-2xl p-8 border border-black/5 shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out min-h-[260px] flex flex-col">
                    <div className={`w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 shadow-sm shrink-0 border border-slate-100`}>
                      <Icon className={`w-8 h-8 text-amber-500`} />
                    </div>
                    <h3 className="text-xl font-bold text-blue-950 mb-3">{problem.title}</h3>
                    <p className="text-slate-800 font-semibold leading-relaxed flex-grow">{problem.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 2: CONFIDENT (What We Offer + How It Works) */}
      <div 
        className="relative w-full bg-cover bg-center bg-no-repeat min-h-screen"
        style={{ backgroundImage: `url('${data.bgConfident || '/confident.png'}')` }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        {/* Gradient at the top to blend from the previous section */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-slate-900 to-transparent z-0 pointer-events-none"></div>
        {/* Gradient at the bottom to blend into Benefits section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-slate-900/90 z-0 pointer-events-none"></div>

        {/* What We Offer */}
        <section className="relative pt-20 pb-24 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 bg-[rgba(255,255,255,0.75)] backdrop-blur-md p-8 md:p-12 rounded-3xl border border-black/5 shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold text-blue-950 mb-6 drop-shadow-sm">{data.offerHeading}</h2>
                <p className="text-lg text-slate-800 mb-8 font-medium">{data.offerSubtext}</p>

                <div className="space-y-6">
                  {data.offers.map((offer, index) => (
                    <div key={index} className="flex gap-4 items-start hover:translate-x-1 transition-transform duration-300">
                      <div className="mt-1 bg-amber-50 p-2 rounded-full text-amber-500 shadow-sm border border-amber-100 shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-blue-900">{offer.title}</h4>
                        <p className="text-slate-800 font-semibold">{offer.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-1/2 relative w-full">
                <div className="text-center md:text-right mb-2 pr-4">
                   <span className="text-xs text-slate-700 font-bold uppercase tracking-widest italic bg-slate-50 px-3 py-1 rounded-full border border-slate-200 shadow-sm">Illustration</span>
                </div>
                <div className="bg-[rgba(255,255,255,0.8)] backdrop-blur-md rounded-3xl p-8 shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-slate-200 relative z-10 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out">
                  <div className="bg-white rounded-2xl p-6 shadow-[0_4px_15px_rgba(0,0,0,0.05)] mb-4 hover:-translate-y-1 transition-all duration-300 border border-slate-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border border-blue-200">
                        <Brain className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="font-bold text-blue-950">Aptitude Score</h5>
                        <span className="text-sm text-slate-700 font-medium">Logical & Analytical</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 shadow-inner overflow-hidden">
                      <div className="bg-amber-400 h-2 rounded-full w-[85%] shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-[0_4px_15px_rgba(0,0,0,0.05)] transform translate-x-4 hover:-translate-y-1 transition-all duration-300 border border-slate-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 shadow-inner border border-amber-200">
                        <Star className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="font-bold text-blue-950">{data.recommendLabel}</h5>
                        <span className="text-sm text-slate-700 font-medium">Based on assessment</span>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-blue-600">{data.recommendValue}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 lg:py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 bg-[rgba(255,255,255,0.75)] backdrop-blur-md p-8 rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-black/5 max-w-3xl mx-auto hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out">
              <h2 className="text-3xl font-bold text-blue-950 mb-4 drop-shadow-sm">How It Works</h2>
              <p className="text-lg text-slate-800 font-semibold">
                Three simple steps to clarity, powered by scientifically validated assessments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-1 bg-[rgba(255,255,255,0.8)] shadow-sm z-0 rounded-full border border-black/5"></div>

              {[
                { step: '01', title: 'Career Counselling', desc: 'Engage in a pre-counselling session to define your goals and challenges.', icon: Users },
                { step: '02', title: 'Take Assessment', desc: 'Complete our AI-based psychometric test designed for your profile.', icon: BookOpen },
                { step: '03', title: 'Get Detailed Report', desc: 'Receive a comprehensive analysis of your interests, personality, and aptitudes.', icon: Target },
                { step: '04', title: 'Expert Guidance', desc: '1-on-1 counseling session to decode the report and finalize your path.', icon: UserCheck },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="relative z-10 flex flex-col items-center text-center bg-[rgba(255,255,255,0.75)] backdrop-blur-md p-6 rounded-3xl border border-black/5 shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out h-full">
                    <div className="w-24 h-24 bg-slate-50 rounded-full border border-slate-100 shadow-sm flex items-center justify-center mb-6 relative group transition-colors shrink-0">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-amber-500 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors border border-slate-50 shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 rounded-full text-white font-bold flex items-center justify-center text-sm shadow-[0_4px_10px_rgba(37,99,235,0.4)] border border-white/40">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-blue-950 mb-3">{item.title}</h3>
                    <p className="text-slate-800 font-semibold flex-grow">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 text-center px-4">
              <p className="inline-block px-6 py-4 bg-[rgba(255,255,255,0.75)] backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-black/5 rounded-2xl md:rounded-full text-sm md:text-base text-slate-800 font-bold italic max-w-4xl leading-relaxed hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out">
                * Assessments designed using scientifically validated methodologies, developed in collaboration with accredited Doctor / Psychologist from leading institutions such as Medanta and Max Healthcare.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Benefits */}
      <section className="py-20 relative z-20 bg-slate-900/90 backdrop-blur-[8px] text-white border-t border-slate-800 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{data.benefitsHeading}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-slate-800 rounded-2xl mx-auto flex items-center justify-center mb-6 text-blue-300">
                <Map className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Clarity at Early Stage</h3>
              <p className="text-blue-200">Understand your unique strengths before major commitments.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-slate-800 rounded-2xl mx-auto flex items-center justify-center mb-6 text-blue-300">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Avoid Wrong Choices</h3>
              <p className="text-blue-200">Prevent the stress and setback of selecting mismatched paths.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-slate-800 rounded-2xl mx-auto flex items-center justify-center mb-6 text-blue-300">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Build Confidence</h3>
              <p className="text-blue-200">Move forward with assurance, knowing your path aligns with your true potential.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-20 bg-slate-900 text-center border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-6 sm:p-8 md:p-10 lg:p-16 rounded-2xl sm:rounded-3xl border border-blue-400/50 shadow-[0_0_40px_rgba(59,130,246,0.3)] backdrop-blur-sm hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 ease-in-out relative overflow-hidden group">
            
            {/* Subtle glow overlay on hover */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"></div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-sm relative z-10">Ready to Discover Your Path?</h2>
            <p className="text-xl text-blue-100 mb-10 font-bold relative z-10 max-w-2xl mx-auto">
              Take the first step towards a fulfilling academic and professional journey.
            </p>
            <a href="https://lifemap.mycareerdisha.com/" target="_blank" rel="noopener noreferrer" aria-label="Start Your Journey Today - Career Discovery" className="px-10 py-5 text-lg font-bold rounded-full bg-amber-400 text-blue-950 shadow-xl hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:-translate-y-1 hover:scale-105 transition-all duration-300 inline-flex items-center gap-3 relative z-10 group/btn">
              Start Your Journey Today <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-100 text-center relative z-20">
        <p className="text-slate-500 text-xs font-medium tracking-widest" style={{ textTransform: 'none' }}>
          &copy; 2026 Careerदिशा &mdash; Powered by ZeOpto
        </p>
      </footer>
    </div>
  );
}
