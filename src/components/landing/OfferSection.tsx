/** OfferSection — Early Bird Promo banner. */
import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import type { CmsData } from '../../data/cms';
import { FlipCountdownTimer } from './FlipCountdownTimer';

interface OfferSectionProps {
  offer: CmsData['offer'];
  onCTAClick: () => void;
}

export default function OfferSection({ offer, onCTAClick }: OfferSectionProps) {
  if (!offer.visible) return null;

  return (
    <section className="py-12 px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="max-w-5xl mx-auto rounded-[2.5rem] bg-gradient-to-br from-indigo-50/90 to-white/95 border border-indigo-100 shadow-[0_20px_60px_-15px_rgba(79,70,229,0.15)] overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#fba70c]/20 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <Star size={14} className="fill-red-600" />
              {offer.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-headline mb-3">{offer.title}</h2>
            <p className="text-lg text-slate-600 font-medium">{offer.description}</p>
          </div>
          <div className="flex flex-col items-center md:items-end shrink-0">
            <FlipCountdownTimer validUpto={offer.valid_upto} showCountdown={offer.show_countdown} />
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl text-slate-400 font-bold line-through decoration-red-400/50 decoration-2">{offer.originalPrice}</span>
              <span className="text-5xl font-black text-[#fba70c] drop-shadow-sm">{offer.offerPrice}</span>
            </div>
            <button onClick={onCTAClick} className="w-full md:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold font-headline text-[1.1rem] shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">{offer.cta}</button>
            <p className="text-xs text-slate-400 font-medium mt-3 text-center md:text-right">{offer.note}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
