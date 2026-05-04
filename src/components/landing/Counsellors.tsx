/** Counsellors — Scrolling counsellor gallery with smooth deceleration animation. */
import { useRef, useEffect } from 'react';

const counsellors = [
  { name: 'Nishtha Vyas', role: 'Senior Career Counsellor', image: '/NishthaVyas.jpg', quote: '"Empowering students through data-driven insights and strategic foresight to navigate global career paths."', accentColor: 'border-primary/30', roleColor: 'text-blue-300', bullets: [{ label: 'Experience:', value: '10 years in career development & mentorship', color: 'bg-primary' }, { label: 'Specialization:', value: 'Emerging industry trends & career architecture', color: 'bg-secondary' }, { label: 'Strategy:', value: 'Global job market expertise for future-ready decisions', color: 'bg-accent' }, { label: 'Approach:', value: 'Building clarity through high-impact guidance', color: 'bg-red-500' }] },
  { name: 'Milli Tewari', role: 'Lead Career Strategist', image: '/MilliTewari.jpg', quote: '"Building agile and future-proof career paths through personalized strategy and market intelligence."', accentColor: 'border-secondary/30', roleColor: 'text-green-300', bullets: [{ label: 'Experience:', value: '8 years in career strategy & mentorship', color: 'bg-primary' }, { label: 'Core Focus:', value: 'Modern industry shifts & global job markets', color: 'bg-secondary' }, { label: 'Methodology:', value: 'Simplifying complex trends into actionable plans', color: 'bg-accent' }, { label: 'Goal:', value: 'Strategic mindset for long-term excellence', color: 'bg-red-500' }] },
  { name: 'Shruti Bhardwaj', role: 'Career Development Specialist', image: '/Shruti_bhardwaj.jpg', quote: '"Dedicated to bridging the gap between academic potential and professional success through personalized mentorship."', accentColor: 'border-accent/30', roleColor: 'text-amber-300', bullets: [{ label: 'Experience:', value: '3 years in student career counseling & skill development', color: 'bg-primary' }, { label: 'Focus:', value: 'Discovering core strengths & aligning career paths', color: 'bg-secondary' }, { label: 'Approach:', value: 'Relatable one-on-one guidance for early-career transitions', color: 'bg-accent' }, { label: 'Commitment:', value: 'Building a strong foundation for professional entry', color: 'bg-red-500' }] },
  { name: 'Dr. Anjali Bhardwaj', role: 'Senior Counselling Psychologist', image: '/Anjali_Bhardwaj.png', quote: '"Integrating psychological insights with career guidance to empower individuals with mental resilience and emotional clarity."', accentColor: 'border-purple-500/30', roleColor: 'text-purple-300', imgPosition: 'object-[50%_25%]', bullets: [{ label: 'Experience:', value: '15 years in clinical counselling, behavioural therapy, and mental wellness.', color: 'bg-primary' }, { label: 'Specialization:', value: 'Expert in psychometric assessments, personality mapping, and managing academic or career-related stress.', color: 'bg-secondary' }, { label: 'Methodology:', value: "Combining empathetic listening with scientific psychological frameworks to uncover an individual's true potential.", color: 'bg-purple-500' }, { label: 'Focus:', value: 'Dedicated to helping students and professionals overcome internal barriers, anxiety, and decision-making blocks.', color: 'bg-red-500' }, { label: 'Vision:', value: 'Committed to ensuring every individual achieves a harmonious balance between professional success and personal well-being.', color: 'bg-orange-500' }] },
];

export default function Counsellors() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);
  const speedRef = useRef(1.5);
  const targetSpeedRef = useRef(1.5);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const animateScroll = () => {
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.05;
      scrollPosRef.current += speedRef.current;
      if (scrollRef.current) {
        const halfWidth = scrollRef.current.scrollWidth / 2;
        if (scrollPosRef.current >= halfWidth) scrollPosRef.current -= halfWidth;
        scrollRef.current.style.transform = `translateX(-${scrollPosRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animateScroll);
    };
    animationRef.current = requestAnimationFrame(animateScroll);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, []);

  const handleMouseEnter = () => { targetSpeedRef.current = 0; };
  const handleMouseLeave = () => { targetSpeedRef.current = 1.5; };

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-slate-50 overflow-hidden" id="counsellors">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Expert Guidance</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-4">Meet Our Counsellors</h2>
          <div className="h-1 w-20 bg-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-on-surface-variant max-w-2xl mx-auto font-medium">Our dedicated team of career counsellors brings years of expertise to guide you towards the right path.</p>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div className="overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div ref={scrollRef} className="flex gap-4 sm:gap-6 md:gap-8" style={{ width: 'max-content' }}>
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-4 sm:gap-6 md:gap-8 shrink-0">
                  {counsellors.map((c, idx) => (
                    <div key={idx} className="w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px] bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-shadow duration-300 shrink-0 group">
                      <div className="relative h-72 overflow-hidden">
                        <img src={c.image} alt={c.name} className={`w-full h-full object-cover ${c.imgPosition || 'object-top'} group-hover:scale-105 transition-transform duration-500`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-6 right-6">
                          <h3 className="text-2xl font-bold text-white mb-1">{c.name}</h3>
                          <p className={`text-sm font-semibold ${c.roleColor} uppercase tracking-wider`}>{c.role}</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className={`text-slate-600 italic text-sm mb-5 leading-relaxed border-l-4 ${c.accentColor} pl-4`}>{c.quote}</p>
                        <ul className="space-y-2.5 text-sm">
                          {c.bullets.map((b, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full ${b.color} mt-1.5 shrink-0`}></span>
                              <span className="text-slate-700"><strong className="text-slate-900">{b.label}</strong> {b.value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
