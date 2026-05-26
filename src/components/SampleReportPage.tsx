import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, BookOpen, FileWarning, Loader2 } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import { fetchSampleReportPdfBytes, SampleReport } from '../data/cms';
import { LOGO_URL } from '../data/constants';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url).toString();

type PdfDocument = Awaited<ReturnType<typeof pdfjsLib.getDocument>['promise']>;

function MissingReport({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex min-h-[55vh] items-center justify-center px-6 py-16 text-center">
      <div className="max-w-xl rounded-2xl border border-dashed border-slate-300 bg-white p-8 shadow-xl shadow-slate-200/60">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          <FileWarning className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-950">Sample Report Coming Soon</h1>
        <p className="mt-3 text-base font-medium leading-7 text-slate-600">
          This preview is being updated by the Career Disha team.
        </p>
        <button
          onClick={onBack}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>
      </div>
    </div>
  );
}

function PdfPageCanvas({ document, pageNumber }: { document: PdfDocument; pageNumber: number }) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [visible, setVisible] = useState(pageNumber <= 2);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '700px 0px' },
    );

    observer.observe(shell);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible || !shellRef.current || !canvasRef.current) return;

    let cancelled = false;
    let renderTask: ReturnType<Awaited<ReturnType<PdfDocument['getPage']>>['render']> | undefined;

    const renderPage = async () => {
      const page = await document.getPage(pageNumber);
      const shellWidth = shellRef.current?.clientWidth ?? 360;
      const baseViewport = page.getViewport({ scale: 1 });
      const cssScale = Math.min(1.55, Math.max(0.62, (shellWidth - 24) / baseViewport.width));
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({ scale: cssScale * pixelRatio });
      const canvas = canvasRef.current;
      if (!canvas || cancelled) return;

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${Math.floor(viewport.width / pixelRatio)}px`;
      canvas.style.height = `${Math.floor(viewport.height / pixelRatio)}px`;

      const context = canvas.getContext('2d');
      if (!context) return;

      renderTask = page.render({ canvas, canvasContext: context, viewport });
      await renderTask.promise;
      if (!cancelled) setRendered(true);
    };

    renderPage().catch((error) => {
      if (!cancelled && error?.name !== 'RenderingCancelledException') {
        console.error('Unable to render sample report page.', error);
      }
    });

    return () => {
      cancelled = true;
      renderTask?.cancel();
    };
  }, [document, pageNumber, visible]);

  return (
    <div ref={shellRef} className="mx-auto w-full max-w-5xl px-3 sm:px-6">
      <div className="mb-3 flex items-center justify-between px-1 text-xs font-extrabold uppercase tracking-wider text-slate-500">
        <span>Page {pageNumber}</span>
      </div>
      <div className="flex min-h-[360px] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100 p-3 shadow-xl shadow-slate-300/30 sm:rounded-2xl sm:p-4">
        {!rendered && (
          <div className="absolute flex items-center gap-2 text-sm font-bold text-slate-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading
          </div>
        )}
        <canvas ref={canvasRef} className="relative max-w-full bg-white shadow-lg shadow-slate-900/10" />
      </div>
    </div>
  );
}

function PdfCanvasViewer({ report }: { report: SampleReport }) {
  const [document, setDocument] = useState<PdfDocument | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;
    const loadingTaskRef: { destroy?: () => Promise<void> } = {};

    const load = async () => {
      setStatus('loading');
      setDocument(null);
      setPageCount(0);

      try {
        const bytes = await fetchSampleReportPdfBytes(report);
        const loadingTask = pdfjsLib.getDocument({ data: bytes });
        loadingTaskRef.destroy = () => loadingTask.destroy();
        const pdf = await loadingTask.promise;
        if (cancelled) {
          await pdf.destroy();
          return;
        }
        setDocument(pdf);
        setPageCount(pdf.numPages);
        setStatus('ready');
      } catch (error) {
        if (!cancelled) {
          console.error('Unable to load sample report PDF.', error);
          setStatus('error');
        }
      }
    };

    load();

    return () => {
      cancelled = true;
      loadingTaskRef.destroy?.();
    };
  }, [report]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-xl shadow-slate-200/60">
        <div className="flex items-center gap-3 text-sm font-extrabold">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          Loading preview
        </div>
      </div>
    );
  }

  if (status === 'error' || !document) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-xl shadow-slate-200/60">
        <div>
          <FileWarning className="mx-auto h-12 w-12 text-amber-500" />
          <h2 className="mt-4 text-2xl font-extrabold text-slate-950">Preview Unavailable</h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">Please check back shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Array.from({ length: pageCount }, (_, index) => (
        <PdfPageCanvas key={index + 1} document={document} pageNumber={index + 1} />
      ))}
    </div>
  );
}

export default function SampleReportPage({
  report,
  onBack,
}: {
  report?: SampleReport;
  onBack: () => void;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [report?.slug]);

  const title = report ? `${report.title} (${report.page_count})` : 'Sample Report';
  const canPreview = Boolean(report?.is_active && report.pdf_path);

  const accent = useMemo(() => {
    if (report?.slug === 'career-insight') return 'from-emerald-500/20 via-white to-blue-500/20';
    if (report?.slug === 'career-master-blueprint') return 'from-amber-400/25 via-white to-primary/20';
    return 'from-primary/20 via-white to-amber-300/25';
  }, [report?.slug]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 shadow-sm backdrop-blur-md sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 md:gap-4">
          <img
            alt="Career Disha Logo"
            className="h-10 w-auto shrink-0 cursor-pointer object-contain transition-transform hover:scale-105"
            src={LOGO_URL}
            onClick={onBack}
            referrerPolicy="no-referrer"
          />
          <span className="hidden border-l-2 border-slate-300 pl-3 text-sm font-semibold text-slate-800 sm:block md:pl-4 md:text-base">
            Sample Reports
          </span>
        </div>
        <button
          onClick={onBack}
          className="flex cursor-pointer items-center gap-2 font-semibold text-slate-700 transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="hidden sm:inline">Back to Home</span>
        </button>
      </div>

      <main className="pt-16">
        <section className={`bg-gradient-to-br ${accent} px-6 py-14 sm:py-18`}>
          <div className="mx-auto max-w-6xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-primary shadow-sm">
              <BookOpen className="h-4 w-4" />
              Career Disha
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {report?.subtitle && (
              <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-slate-600 sm:text-xl">
                {report.subtitle}
              </p>
            )}
          </div>
        </section>

        <section className="px-0 py-8 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-6xl">
            {!report || !canPreview ? <MissingReport onBack={onBack} /> : <PdfCanvasViewer report={report} />}
          </div>
        </section>
      </main>
    </div>
  );
}
