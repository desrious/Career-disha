import { useEffect, useRef, useState } from 'react';
import { BookOpen, FileText, Layers } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { SampleReport } from '../../data/cms';

const optionIcons = [BookOpen, FileText, Layers];

function navigateToReport(slug: string) {
  window.history.pushState({}, '', `/sample-report/${slug}`);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export default function SampleReportsFAB({ reports }: { reports: SampleReport[] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="fixed bottom-10 left-5 z-[1000] md:bottom-10 md:left-5">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="absolute bottom-full left-0 mb-4 w-[min(88vw,360px)] overflow-hidden rounded-2xl border border-white/60 bg-white/95 p-3 shadow-2xl shadow-slate-900/20 backdrop-blur-xl"
          >
            <div className="mb-2 px-2">
              <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Sample Reports</p>
            </div>

            <div className="space-y-2">
              {reports.map((report, index) => {
                const Icon = optionIcons[index] ?? FileText;
                return (
                  <button
                    key={report.slug}
                    onClick={() => {
                      setOpen(false);
                      navigateToReport(report.slug);
                    }}
                    className="group flex w-full items-start gap-3 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm shadow-slate-200/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-extrabold leading-5 text-slate-950">
                        {report.title} <span className="text-slate-500">({report.page_count})</span>
                      </span>
                      <span className="mt-1 block text-xs font-semibold leading-5 text-slate-500">
                        {report.subtitle}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="group flex items-center rounded-full bg-white/95 p-2 shadow-xl shadow-slate-900/20 ring-1 ring-white/70 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/20 md:p-2.5"
        title="Sample Reports"
        aria-expanded={open}
        animate={{ y: [-6, 6, -6] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
      >
        <img
          src="/sample_report.png"
          alt="Sample Reports"
          className="h-14 w-14 shrink-0 object-contain drop-shadow-md brightness-95 contrast-125 saturate-110 md:h-16 md:w-16"
        />
        <div className="grid grid-cols-[0fr] opacity-0 transition-all duration-400 ease-out group-hover:grid-cols-[1fr] group-hover:opacity-100">
          <div className="overflow-hidden">
            <span className="block whitespace-nowrap px-3 text-left text-sm font-extrabold text-slate-950 transition-colors group-hover:text-primary md:text-base">
              Sample Reports
            </span>
          </div>
        </div>
      </motion.button>
    </div>
  );
}
