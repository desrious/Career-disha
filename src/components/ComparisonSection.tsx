import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const comparisonData = [
  {
    id: 1,
    title: "Career Assessments Comparison",
    desc: "Career assessment is a diagnostic tool that evaluates strengths, interests, and inclinations. It provides a 360-degree overview, and 60% of counselling accuracy depends on it.",
    features: [
      { name: "Dimensions", cd: "6 Dimensional (Interest, Personality, Motivators, Learning Style, Aptitude)", others: "2 - 5 Dimensional" },
      { name: "No of Assessments", cd: "22+ Including Graduates and Professionals", others: "Only for School students" },
      { name: "Accuracy and Reliability", cd: "93%", others: "78%-89%" },
      { name: "Methodology Framework", cd: "O*NET USA and BCPA India", others: "Internal Framework" },
      { name: "Vernacular Language", cd: "15 Languages", others: "1-7 Max" }
    ]
  },
  {
    id: 2,
    title: "Career Reports Comparison",
    desc: "The outcome of the assessment. Detailed analysis with action-driven insights that helps in informed decision-making.",
    features: [
      { name: "Career Assessment Reports", cd: "35+ Pages", others: "12 - 32 Pages" },
      { name: "No of Career Recommendations", cd: "5", others: "3-5*" },
      { name: "Career Paths Recommendations", cd: "10+", others: "NOT AVAILABLE" },
      { name: "Career Report with Execution Plan", cd: "Very Unique", others: "NOT AVAILABLE" },
      { name: "Milestones Report 10 years Plan", cd: "Unique to CareerDisha", others: "NOT AVAILABLE" }
    ]
  },
  {
    id: 3,
    title: "Student Dashboard Solutions Comparison",
    desc: "Goes beyond reports. Includes course selection, admissions, portfolio building. Manages full career lifecycle.",
    features: [
      { name: "Virtual Internships", cd: "400+ from Fortune 500 companies all free", others: "Limited, and Chargeable" },
      { name: "Career Library", cd: "Yes", others: "Yes" },
      { name: "Portfolio Building", cd: "Yes", others: "Yes" },
      { name: "Online Personal Development Courses", cd: "Yes", others: "Limited or MOSTLY NOT AVAILABLE" }
    ]
  },
  {
    id: 4,
    title: "Integrated Global Universities Admission Platform Comparison",
    desc: "Helps students planning to study abroad. One-stop solution that simplifies application process with complete overseas guidance.",
    features: [
      { name: "India Colleges Information", cd: "1 Lakh+ Courses", others: "Limited" },
      { name: "International Colleges Information", cd: "3+ Lakh Courses, 22+ Countries", others: "Limited" },
      { name: "AI Based Admission Prediction", cd: "Very Unique", others: "NOT AVAILABLE" },
      { name: "University Application Management", cd: "Technology Driven Single Window", others: "Offline, Manual" }
    ]
  },
  {
    id: 5,
    title: "Career Counsellors Comparison",
    desc: "Quality depends on counsellor network. Includes profiling, career path shortlisting, recommendations, and guidance support.",
    features: [
      { name: "Trained and Certified Counsellors", cd: "4.9 Rated", others: "3.5-4.5 Rated" },
      { name: "Network of Career Counsellors", cd: "9000+", others: "10-100" },
      { name: "Cities Covered", cd: "340+", others: "1-20" },
      { name: "Extensive Handholdings", cd: "Unique to CareerDisha", others: "Limited" }
    ]
  },
  {
    id: 6,
    title: "Other Career Counselling Tools",
    desc: "Additional integrated tools including SOP maker, career information, and decision-making support.",
    features: [
      { name: "AI Powered Guiding Star", cd: "Exclusive to CareerDisha", others: "NOT AVAILABLE" },
      { name: "SOP Maker", cd: "Unique to CareerDisha", others: "No" },
      { name: "Student Portfolio Webpage", cd: "Unique to CareerDisha", others: "No" },
      { name: "Student Execution Plan Milestones", cd: "Unique to CareerDisha", others: "No" }
    ]
  }
];

const ComparisonSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleData = isExpanded ? comparisonData : comparisonData.slice(0, 2);

  return (
    <section className="py-24 bg-surface px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-4">Comprehensive Career Guidance Comparison</h2>
          <div className="h-1 w-20 bg-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-on-surface-variant max-w-2xl mx-auto font-medium text-lg">
            Understand how different career guidance solutions compare across key areas
          </p>
        </div>

        {/* Blocks */}
        <div className="space-y-8">
          <AnimatePresence>
            {visibleData.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-shadow hover:shadow-xl hover:border-primary/20"
              >
                <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 transition-colors hover:bg-primary/5">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2 transition-colors">{item.id}. {item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  {/* Decorative VS Background */}
                  <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full items-center justify-center font-bold text-slate-300 z-10 shadow-sm border border-slate-100">VS</div>

                  {/* CareerDisha Column */}
                  <div className="relative group bg-primary/5 border-2 border-primary/20 rounded-xl p-6 md:p-8 shadow-[0_0_15px_rgba(var(--color-primary),0.05)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--color-primary),0.2)] hover:bg-primary/10 hover:scale-[1.01] z-0 hover:z-20">
                    <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-lg tracking-widest uppercase transition-transform group-hover:scale-105 origin-top-right">
                      CareerDisha
                    </div>
                    <ul className="space-y-3 mt-4">
                      {item.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 p-2 rounded-lg transition-all duration-300 hover:bg-white/60 hover:translate-x-2 group/item cursor-default">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 transition-transform duration-300 group-hover/item:scale-125 group-hover/item:rotate-12" />
                          <span className="text-sm text-slate-700 transition-colors group-hover/item:text-slate-900">
                            <strong className="text-slate-900 block md:inline transition-colors group-hover/item:text-primary">{feature.name}: </strong> {feature.cd}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Others Column */}
                  <div className="relative group bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8 opacity-90 transition-all duration-300 hover:opacity-100 hover:bg-slate-100 hover:shadow-md hover:scale-[1.01] z-0 hover:z-20">
                    <div className="absolute top-0 right-0 bg-slate-300 text-slate-700 text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-lg tracking-widest uppercase transition-transform group-hover:scale-105 origin-top-right">
                      Other Platforms
                    </div>
                    <ul className="space-y-3 mt-4">
                      {item.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 p-2 rounded-lg transition-all duration-300 hover:bg-white/80 hover:-translate-x-2 group/item cursor-default grayscale hover:grayscale-0">
                          <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5 transition-transform duration-300 group-hover/item:scale-125 group-hover/item:-rotate-12" />
                          <span className="text-sm text-slate-600 transition-colors group-hover/item:text-slate-800">
                            <strong className="text-slate-700 block md:inline transition-colors group-hover/item:text-red-500">{feature.name}: </strong> {feature.others}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Toggle Button */}
        <div className="mt-12 flex flex-col items-center">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-8 py-3 bg-white border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2 group shadow-sm hover:shadow-md"
          >
            {isExpanded ? (
              <>View Less <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" /></>
            ) : (
              <>View Full Comparison <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" /></>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;