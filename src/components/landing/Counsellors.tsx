/** Counsellors — Scrolling counsellor gallery with smooth deceleration animation and touch support. */
import { useRef, useEffect, useState, useCallback } from 'react';
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
  const speedRef = useRef(1.0);
  const targetSpeedRef = useRef(1.0);
  const animationRef = useRef<number | null>(null);
  const isInteractingRef = useRef(false);

  // We use scrollLeft instead of translateX for native touch support
  useEffect(() => {
    let lastTime = performance.now();
    
    const animateScroll = (time: number) => {
      const delta = Math.min(time - lastTime, 50); // Cap delta to avoid huge jumps on tab switch
      lastTime = time;

      if (Math.abs(targetSpeedRef.current - speedRef.current) > 0.001) {
        // Ultra-smooth deceleration using an even smaller factor
        speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.008;
      } else {
        speedRef.current = targetSpeedRef.current;
      }

      if (scrollRef.current && Math.abs(speedRef.current) > 0) {
        scrollRef.current.scrollLeft += speedRef.current * (delta / 16);
        
        // Infinite loop logic based on scrollWidth
        const maxScroll = scrollRef.current.scrollWidth / 2;
        if (scrollRef.current.scrollLeft >= maxScroll) {
          scrollRef.current.scrollLeft -= maxScroll;
        }
      }
      animationRef.current = requestAnimationFrame(animateScroll);
    };
    animationRef.current = requestAnimationFrame(animateScroll);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, []);

  const handleCardClick = () => { 
    isInteractingRef.current = !isInteractingRef.current; 
    targetSpeedRef.current = isInteractingRef.current ? 0 : 1.0; 
  };
  
  const handleCardMouseLeave = () => { 
    if (isInteractingRef.current) {
      isInteractingRef.current = false; 
      targetSpeedRef.current = 1.0; 
    }
  };

  return (
    <section className="relative py-16 sm:py-24 bg-slate-50 overflow-hidden" id="counsellors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Expert Guidance</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-4">Meet Our Counsellors</h2>
          <div className="h-1 w-20 bg-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-on-surface-variant max-w-2xl mx-auto font-medium">Our dedicated team of career counsellors brings years of expertise to guide you towards the right path.</p>
        </div>
      </div>
      
      {/* Full-bleed container approach for better mobile layout mapping */}
      <div className="relative w-full max-w-[100vw] mx-auto">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
        
        <div className="overflow-hidden w-full">
          {/* Native scorlling container allowing smooth touch swiping */}
          <div 
            ref={scrollRef} 
            className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto hide-scrollbar px-4 md:px-12 pb-8 pt-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* We duplicate the array to allow for the infinite scroll illusion */}
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-4 sm:gap-6 md:gap-8 shrink-0">
                {counsellors.map((c, idx) => (
                  <div 
                    key={idx} 
                    className="w-[85vw] max-w-[320px] sm:max-w-none sm:w-[340px] md:w-[380px] lg:w-[420px] bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 flex flex-col shrink-0 group cursor-pointer"
                    onClick={handleCardClick}
                    onMouseLeave={handleCardMouseLeave}
                  >
                    {/* iOS clipping bug fix: added isolate & transform-gpu / translate-z-[0] */}
                    <div className="relative h-64 sm:h-72 overflow-hidden shrink-0 isolate transform-gpu text-left">
                      <img 
                        src={c.image} 
                        alt={c.name} 
                        className={`w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 ${c.name === 'Dr. Anjali Bhardwaj' ? 'object-[50%_25%]' : 'object-top'}`} 
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-4 left-6 right-6">
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">{c.name}</h3>
                        <p className={`text-sm font-semibold ${(c.accent || '').split(' ')[1] || 'text-blue-300'} uppercase tracking-wider shadow-sm`}>{c.title}</p>
                      </div>
                    </div>
                    
                    {/* flex-grow ensures matching heights across cards in the flex container */}
                    <div className="p-6 flex flex-col flex-grow text-left">
                      <p className={`text-slate-600 italic text-sm mb-5 leading-relaxed border-l-4 ${(c.accent || '').split(' ')[0] || 'border-primary/30'} pl-4`}>{c.quote}</p>
                      <ul className="space-y-3 text-sm">
                        {c.bullets.map((bStr, bIdx) => {
                          const b = parseBullet(bStr, bIdx);
                          return (
                            <li key={bIdx} className="flex items-start gap-3">
                              <span className={`w-1.5 h-1.5 rounded-full ${b.color} mt-1.5 shrink-0 shadow-sm`}></span>
                              <span className="text-slate-700 leading-relaxed"><strong className="text-slate-900">{b.label}</strong> {b.value}</span>
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
    </section>
  );
}
