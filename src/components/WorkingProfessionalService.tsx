import React from 'react';
import { Compass, Target, Brain, ArrowRight, CheckCircle2, Map, BookOpen, UserCheck, Star, ArrowLeft } from 'lucide-react';

interface WorkingProfessionalServiceProps {
  onBack: () => void;
}

const WorkingProfessionalService = ({ onBack }: WorkingProfessionalServiceProps) => {
  return (
    <div className="bg-slate-50 min-h-screen pt-20 relative">
      
      {/* Navigation Layer */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-50 shadow-sm">
        <div className="flex items-center">
          <img 
            alt="CareerDisha Logo" 
            className="h-10 w-auto object-contain cursor-pointer transition-transform hover:scale-105" 
            src="/CareerDishaLogo.png" 
            onClick={onBack}
            referrerPolicy="no-referrer" 
          />
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-700 hover:text-primary font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 bg-[url('/confused.png')] bg-[length:100%_auto] bg-no-repeat bg-center pt-16 pb-24 lg:pt-24 lg:pb-32 mt-[-5rem] pt-[calc(5rem+4rem)] z-10">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto bg-white/80 p-8 rounded-3xl shadow-xl border border-slate-100 backdrop-blur-lg">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-primary font-semibold text-sm mb-4">
              CareerDisha for Working Professional
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6 drop-shadow-sm">
              Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Path Early</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Help professionals align their career trajectory with their evolving interests, leverage existing skills for transitions, or ascend into leadership roles confidently.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 text-base font-semibold rounded-full bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                Start Your Career Discovery
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-24 h-24 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-10 w-32 h-32 bg-sky-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </section>

      {/* Problem Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 bg-white/70 p-6 rounded-2xl backdrop-blur-md shadow-sm border border-white max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The Working Professional Dilemma</h2>
            <p className="text-lg text-slate-700">
              Students at this stage often feel overwhelmed and confused. Does this sound familiar?
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8 text-rose-500" />,
                title: "Navigating Career Transitions",
                desc: "Switching industries, upskilling, or seeking leadership paths? These are pivotal transitions needing clarity.",
                bgColor: "bg-rose-50"
              },
              {
                icon: <Map className="w-8 h-8 text-amber-500" />,
                title: "Lack of Awareness",
                desc: "Many emerging careers and contemporary pathways remain unknown, limiting students' creative and professional potential.",
                bgColor: "bg-amber-50"
              },
              {
                icon: <UserCheck className="w-8 h-8 text-blue-500" />,
                title: "Peer & Parent Pressure",
                desc: "Choosing what friends are doing or what parents suggest without aligning it with personal aptitude and interests.",
                bgColor: "bg-blue-50"
              }
            ].map((problem, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className={`w-16 h-16 rounded-2xl ${problem.bgColor} flex items-center justify-center mb-6 shadow-sm`}>
                  {problem.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{problem.title}</h3>
                <p className="text-slate-700 font-medium leading-relaxed">{problem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="relative pt-[25vw] pb-24 z-10 bg-[url('/confident.png')] bg-[length:100%_auto] bg-no-repeat bg-top border-y border-white">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-white/80 p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 backdrop-blur-lg">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 drop-shadow-sm">What CareerDisha Offers</h2>
              <p className="text-lg text-slate-700 mb-8 font-medium">
                A structured, scientific approach to help students navigate their first major academic crossroad.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Career Discovery Assessment", desc: "Identify innate traits and potential pathways." },
                  { title: "Interest & Aptitude Analysis", desc: "Understand what you truly enjoy and excel at." },
                  { title: "Stream Selection Guidance", desc: "Data-driven recommendations for advanced career moves." },
                  { title: "Personalized Career Report", desc: "A comprehensive roadmap outlining optimal options." }
                ].map((offer, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="mt-1 bg-white p-2 rounded-full text-blue-600 shadow-sm border border-slate-100">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{offer.title}</h4>
                      <p className="text-slate-700 font-medium">{offer.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative w-full">
              <div className="bg-gradient-to-br from-blue-100/80 to-sky-100/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white relative z-10">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md mb-4 transform hover:-translate-y-1 transition-transform border border-slate-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <Brain className="w-6 h-6" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900">Aptitude Score</h5>
                      <span className="text-sm text-slate-500">Logical & Analytical</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 shadow-inner">
                    <div className="bg-green-500 h-2 rounded-full w-[85%] shadow-sm"></div>
                  </div>
                </div>
                
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md transform translate-x-4 hover:-translate-y-1 transition-transform border border-slate-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100/80 rounded-full flex items-center justify-center text-primary shadow-inner border border-white">
                      <Star className="w-6 h-6" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900">Next Role Strategy</h5>
                      <span className="text-sm text-slate-500">Based on assessment</span>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-primary">Senior Product Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative z-10 bg-gradient-to-b from-transparent to-slate-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 bg-white/80 p-8 rounded-3xl backdrop-blur-md shadow-xl border border-white max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 drop-shadow-sm">How It Works</h2>
            <p className="text-lg text-slate-700 font-medium">
              Three simple steps to clarity, powered by scientifically validated assessments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-white/60 shadow-sm z-0 rounded-full"></div>
            
            {[
              {
                step: "01",
                title: "Take Assessment",
                desc: "Complete our AI-based psychometric test designed specifically for working professionals.",
                icon: <BookOpen className="w-6 h-6" />
              },
              {
                step: "02",
                title: "Get Detailed Report",
                desc: "Receive a comprehensive analysis of your interests, personality, and aptitudes.",
                icon: <Compass className="w-6 h-6" />
              },
              {
                step: "03",
                title: "Expert Guidance",
                desc: "1-on-1 counseling session to decode the report and finalize your stream.",
                icon: <UserCheck className="w-6 h-6" />
              }
            ].map((item, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center text-center bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white hover:bg-white/90 hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="w-24 h-24 bg-white/90 rounded-full border-4 border-slate-50 shadow-md flex items-center justify-center mb-6 relative group hover:border-slate-100 transition-colors backdrop-blur-md">
                  <div className="w-16 h-16 bg-blue-50/80 rounded-full flex items-center justify-center text-primary group-hover:bg-blue-100/90 transition-colors border border-white shadow-inner">
                    {item.icon}
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 rounded-full text-white font-bold flex items-center justify-center text-sm shadow-md border border-white">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-700 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="inline-block px-6 py-3 bg-white/80 backdrop-blur-md shadow-lg border border-white rounded-full text-sm text-slate-800 font-semibold italic">
              * Assessments are powered by scientifically validated psychometric tools
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 relative z-20 bg-slate-900/90 backdrop-blur-[8px] text-white border-t border-slate-800 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose CareerDisha Early?</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-slate-800 rounded-2xl mx-auto flex items-center justify-center mb-6 text-blue-300">
                <Map className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Clarity at Early Stage</h3>
              <p className="text-blue-200">Understand your unique strengths before major academic commitments.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-slate-800 rounded-2xl mx-auto flex items-center justify-center mb-6 text-blue-300">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Avoid Wrong Choices</h3>
              <p className="text-blue-200">Prevent the stress and setback of selecting mismatched streams.</p>
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
      <section className="py-24 relative z-20 bg-white/90 backdrop-blur-md text-center border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50/80 p-10 rounded-3xl border border-slate-100 shadow-xl backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-slate-900 mb-6 drop-shadow-sm">Ready to Discover Your Path?</h2>
            <p className="text-xl text-slate-700 mb-10 font-medium">
              Take the first step towards a fulfilling academic and professional journey.
            </p>
            <button className="px-10 py-5 text-lg font-semibold rounded-full bg-gradient-to-r from-primary to-blue-600 text-white shadow-xl shadow-blue-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2">
              Start Your Journey Today <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkingProfessionalService;

