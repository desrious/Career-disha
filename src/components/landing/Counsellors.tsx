/** Counsellors — Scrolling counsellor gallery with smooth deceleration animation. */
import { useRef, useEffect } from 'react';
import { CmsCounsellor } from '../../data/cms';

const COLORS = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-red-500', 'bg-orange-500', 'bg-purple-500'];

function parseBullet(bulletStr: string, index: number) {
  const parts = bulletStr.split(':');
  if (parts.length > 1) {
    return {
      label: parts[0] + ':',
      value: parts.slice(1).join(':'),
      color: COLORS[index % COLORS.length]
    };
  }
  return {
    label: '',
    value: bulletStr,
    color: COLORS[index % COLORS.length]
  };
}

export default function Counsellors({ counsellors }: { counsellors: CmsCounsellor[] }) {
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
                        <img src={c.image} alt={c.name} className={`w-full h-full object-cover ${c.name === 'Dr. Anjali Bhardwaj' ? 'object-[50%_25%]' : 'object-top'} group-hover:scale-105 transition-transform duration-500`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-6 right-6">
                          <h3 className="text-2xl font-bold text-white mb-1">{c.name}</h3>
                          <p className={`text-sm font-semibold ${(c.accent || '').split(' ')[1] || 'text-blue-300'} uppercase tracking-wider`}>{c.title}</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className={`text-slate-600 italic text-sm mb-5 leading-relaxed border-l-4 ${(c.accent || '').split(' ')[0] || 'border-primary/30'} pl-4`}>{c.quote}</p>
                        <ul className="space-y-2.5 text-sm">
                          {c.bullets.map((bStr, bIdx) => {
                            const b = parseBullet(bStr, bIdx);
                            return (
                              <li key={bIdx} className="flex items-start gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${b.color} mt-1.5 shrink-0`}></span>
                                <span className="text-slate-700"><strong className="text-slate-900">{b.label}</strong> {b.value}</span>
                              </li>
                            );
                          })}
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
