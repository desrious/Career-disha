/** Testimonials — Scrollable testimonial cards section. */
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import type { CmsTestimonial } from '../../data/cms';

interface TestimonialsProps {
  testimonials: CmsTestimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-8 overflow-hidden" id="testimonials">
      <div className="absolute inset-0 pointer-events-none shadow-inner" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
        <div className="absolute inset-0 bg-slate-50"></div>
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/40 blur-[100px]"></div>
        <div className="absolute bottom-[0%] -right-[10%] w-[60%] h-[60%] rounded-full bg-yellow-400/40 blur-[100px]"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface">What our Lumineers say</h2>
        </div>
        <div className="relative group">
          <button onClick={() => { const c = document.getElementById('testimonials-container'); if (c) c.scrollBy({ left: -400, behavior: 'smooth' }); }} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-10 w-12 h-12 rounded-full border border-slate-200 bg-white shadow-md flex items-center justify-center hover:bg-slate-50 hover:scale-105 transition-all" aria-label="Previous testimonial">
            <ChevronLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div id="testimonials-container" className="flex items-stretch gap-8 overflow-x-auto pb-10 pt-4 no-scrollbar snap-x scroll-smooth px-4">
            {testimonials.map((t) => (
              <div key={t.id} className="min-w-[280px] sm:min-w-[320px] md:min-w-[400px] bg-white/60 backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-3xl snap-center shadow-sm border border-white/50 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col h-auto">
                <div className="flex gap-1 text-accent mb-6">
                  {[...Array(t.rating || 5)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-accent" />))}
                </div>
                <p className="text-slate-600 text-base sm:text-lg italic mb-6 sm:mb-10 leading-relaxed drop-shadow-sm">"{t.quote}"</p>
                <div className="flex items-center gap-4 text-left mt-auto">
                  <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white shrink-0 flex items-center justify-center">
                    <img alt={t.name} src={t.image} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-on-surface leading-tight">{t.name}</h4>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => { const c = document.getElementById('testimonials-container'); if (c) c.scrollBy({ left: 400, behavior: 'smooth' }); }} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-10 w-12 h-12 rounded-full border border-slate-200 bg-white shadow-md flex items-center justify-center hover:bg-slate-50 hover:scale-105 transition-all" aria-label="Next testimonial">
            <ChevronRight className="w-6 h-6 text-slate-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
