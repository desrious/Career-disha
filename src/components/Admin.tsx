import { useEffect, useMemo, useRef, useState } from 'react';
import { FileText, LogOut, Plus, Save, Trash2, Upload, X } from 'lucide-react';
import {
  ADMIN_SESSION_STORAGE_KEY,
  CmsCounsellor,
  CmsData,
  CmsInsightBlog,
  CmsInsightVideo,
  CmsTestimonial,
  ExpertAdviceInquiry,
  PartnerInquiry,
  BrochureInquiry,
  SampleReport,
  SupabaseCmsError,
  SupabaseConnectionStatus,
  checkSupabaseConnection,
  deleteAllExpertAdviceInquiries,
  deleteExpertAdviceInquiry,
  deleteAllPartnerInquiries,
  deletePartnerInquiry,
  deleteBrochureInquiry,
  loadBrochureInquiries,
  loadSampleReports,
  loginAdmin,
  loadExpertAdviceInquiries,
  loadPartnerInquiries,
  logoutAdmin,
  removeSampleReportPdf,
  saveCmsData,
  saveSampleReport,
  uploadCmsBrochurePdf,
  uploadCmsImageFile,
  uploadInsightMediaFile,
  uploadSampleReportPdf,
  verifyAdminSession,
} from '../data/cms';

type AdminProps = {
  data: CmsData;
  onDataChange: (data: CmsData) => void;
  sampleReports: SampleReport[];
  onSampleReportsChange: (reports: SampleReport[]) => void;
};

type SectionKey = 'brochure' | 'sampleReports' | 'offer' | 'expert' | 'insights' | 'testimonials' | 'counsellors' | 'contact' | 'partner';

const sections: { key: SectionKey; label: string }[] = [
  { key: 'brochure', label: 'Brochure' },
  { key: 'sampleReports', label: 'Sample Reports' },
  { key: 'offer', label: 'Offer' },
  { key: 'expert', label: 'Expert advice inquiry' },
  { key: 'insights', label: 'Insights' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'counsellors', label: 'Counsellors' },
  { key: 'contact', label: 'Contact Info' },
  { key: 'partner', label: 'Partner With Us' },
];

const emptyTestimonial = (): CmsTestimonial => ({
  id: crypto.randomUUID(),
  name: 'New Student',
  role: 'Student',
  quote: 'Add testimonial text here.',
  image: 'https://randomuser.me/api/portraits/lego/1.jpg',
  rating: 5,
});

const emptyCounsellor = (): CmsCounsellor => ({
  id: crypto.randomUUID(),
  name: 'New Counsellor',
  title: 'Career Counsellor',
  image: '/CareerDishaLogo.png',
  quote: 'Add profile quote here.',
  accent: 'border-primary/30 text-blue-300',
  bullets: ['Experience: Add details', 'Specialization: Add details'],
});

const emptyInsightBlog = (): CmsInsightBlog => ({
  id: crypto.randomUUID(),
  title: 'New Insight Article',
  slug: '',
  content: 'Write the full blog content here.\n\nUse headings, paragraphs, and bullet lists to make the article easy to read.',
  date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
  image: '/CareerDishaLogo.png',
});

const emptyInsightVideo = (): CmsInsightVideo => ({
  id: crypto.randomUUID(),
  youtubeId: '2RBDdsniaHw',
  title: 'New Video',
});

const counsellorAccentOptions = [
  { label: 'Blue', value: 'border-primary/30 text-blue-300' },
  { label: 'Green', value: 'border-secondary/30 text-green-300' },
  { label: 'Amber', value: 'border-accent/30 text-amber-300' },
  { label: 'Purple', value: 'border-purple-500/30 text-purple-300' },
  { label: 'Rose', value: 'border-rose-500/30 text-rose-300' },
  { label: 'Sky', value: 'border-sky-500/30 text-sky-300' },
];

function getAuthErrorMessage(error: unknown) {
  const rawMessage =
    typeof error === 'string'
      ? error
      : error instanceof Error
        ? error.message
        : JSON.stringify(error);
  const normalizedMessage = rawMessage.toLowerCase();

  if (normalizedMessage.includes('pgrst202') || normalizedMessage.includes('verify_admin_login')) {
    return 'Supabase admin RPC is missing. Run supabase_cms_setup.sql in your Supabase SQL Editor, then retry.';
  }

  if (error instanceof SupabaseCmsError && (error.status === 401 || error.status === 403)) {
    return 'Supabase rejected access. Check your publishable key and RLS/function grants.';
  }

  if (normalizedMessage.includes('failed to fetch') || normalizedMessage.includes('networkerror')) {
    return 'Cannot reach Supabase. Check internet connection and NEXT_PUBLIC_SUPABASE_URL.';
  }

  if (error instanceof SupabaseCmsError) {
    return `Supabase login failed (${error.status}). Check SQL setup and API grants.`;
  }

  return 'Unable to verify admin login with Supabase right now.';
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  dark = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  dark?: boolean;
}) {
  return (
    <label className="block">
      <span className={`text-xs font-bold uppercase tracking-wider ${dark ? 'text-slate-100' : 'text-slate-500'}`}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 ${
          dark
            ? 'border-white/20 bg-white text-slate-950 placeholder:text-slate-500 focus:border-amber-300 focus:ring-amber-300/30'
            : 'border-slate-200 bg-white text-slate-950 placeholder:text-slate-400 focus:border-primary focus:ring-primary/20'
        }`}
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function PdfInput({
  value,
  onChange,
  onUpload,
}: {
  value: string;
  onChange: (value: string) => void;
  onUpload?: (file: File, onProgress: (progress: number) => void) => Promise<string>;
}) {
  const uploadId = useMemo(() => crypto.randomUUID(), []);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <Field label="Brochure PDF URL" value={value} onChange={onChange} />
      
      <div className="flex items-center gap-4">
        <span className="text-sm font-bold text-slate-400">OR</span>
        <label
          htmlFor={uploadId}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm"
        >
          <Upload className="h-4 w-4" />
          Upload Local PDF
        </label>
        <input
          id={uploadId}
          type="file"
          accept="application/pdf"
          className="hidden"
          disabled={isUploading}
          onChange={async (event) => {
            const file = event.target.files?.[0];
            event.target.value = '';
            if (!file) return;

            setError('');
            setProgress(0);
            setIsUploading(true);

            try {
              if (onUpload) {
                const uploadedUrl = await onUpload(file, setProgress);
                onChange(uploadedUrl);
              } else {
                setError('Upload is not configured. Paste a public PDF URL manually.');
              }
            } catch (uploadError) {
              setError(uploadError instanceof Error ? uploadError.message : 'Unable to upload PDF.');
            } finally {
              setIsUploading(false);
            }
          }}
        />
      </div>
      {isUploading && <p className="text-xs font-bold text-slate-500">Uploading PDF {progress}%</p>}
      {error && <p className="text-xs font-bold text-red-600">{error}</p>}
    </div>
  );
}

function ImageInput({
  value,
  onChange,
  onUpload,
}: {
  value: string;
  onChange: (value: string) => void;
  onUpload?: (file: File, onProgress: (progress: number) => void) => Promise<string>;
}) {
  const uploadId = useMemo(() => crypto.randomUUID(), []);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  return (
    <div className="space-y-2">
      <Field label="Image URL" value={value} onChange={onChange} />
      <label
        htmlFor={uploadId}
        className={`inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 ${isUploading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
      >
        <Upload className="h-4 w-4" />
        {isUploading ? `Uploading ${progress}%` : 'Upload Image'}
      </label>
      <input
        id={uploadId}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={isUploading}
        onChange={async (event) => {
          const file = event.target.files?.[0];
          event.target.value = '';
          if (!file) return;

          setError('');
          setProgress(0);
          setIsUploading(true);

          try {
            if (onUpload) {
              const uploadedUrl = await onUpload(file, setProgress);
              onChange(uploadedUrl);
              return;
            }
            setError('Upload is not configured. Paste a public image URL manually.');
          } catch (uploadError) {
            setError(uploadError instanceof Error ? uploadError.message : 'Unable to upload image.');
          } finally {
            setIsUploading(false);
          }
        }}
      />
      {error && <p className="text-xs font-bold text-red-600">{error}</p>}
    </div>
  );
}

function ConnectionStatus({ status }: { status: SupabaseConnectionStatus }) {
  const frontendClass = status.frontend ? 'bg-green-500' : 'bg-red-500';
  const backendClass = status.backend ? 'bg-green-500' : 'bg-amber-500';

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700">
      <span className="flex items-center gap-1.5">
        <span className={`h-2.5 w-2.5 rounded-full ${frontendClass}`}></span>
        Frontend
      </span>
      <span className="h-4 w-px bg-slate-200"></span>
      <span className="flex items-center gap-1.5">
        <span className={`h-2.5 w-2.5 rounded-full ${backendClass}`}></span>
        Backend
      </span>
      <span className="text-slate-500">{status.message}</span>
    </div>
  );
}

export default function Admin({ data, onDataChange, sampleReports, onSampleReportsChange }: AdminProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [active, setActive] = useState<SectionKey>('offer');
  const [draft, setDraft] = useState<CmsData>(data);
  const [sampleReportDrafts, setSampleReportDrafts] = useState<SampleReport[]>(sampleReports);
  const latestDraftRef = useRef<CmsData>(data);
  const [inquiries, setInquiries] = useState<ExpertAdviceInquiry[]>([]);
  const [partnerInquiries, setPartnerInquiries] = useState<PartnerInquiry[]>([]);
  const [brochureInquiries, setBrochureInquiries] = useState<BrochureInquiry[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeletingInquiries, setIsDeletingInquiries] = useState(false);
  const [isRefreshingInquiries, setIsRefreshingInquiries] = useState(false);
  const [deletingInquiryId, setDeletingInquiryId] = useState<string | null>(null);
  const [isDeletingPartnerInquiries, setIsDeletingPartnerInquiries] = useState(false);
  const [isRefreshingPartnerInquiries, setIsRefreshingPartnerInquiries] = useState(false);
  const [deletingPartnerInquiryId, setDeletingPartnerInquiryId] = useState<string | null>(null);
  const [isDeletingBrochureInquiries, setIsDeletingBrochureInquiries] = useState(false);
  const [isRefreshingBrochureInquiries, setIsRefreshingBrochureInquiries] = useState(false);
  const [deletingBrochureInquiryId, setDeletingBrochureInquiryId] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [message, setMessage] = useState('');
  const [savingReportSlug, setSavingReportSlug] = useState<string | null>(null);
  const [uploadingReportSlug, setUploadingReportSlug] = useState<string | null>(null);
  const [uploadProgressBySlug, setUploadProgressBySlug] = useState<Record<string, number>>({});
  const [removingReportSlug, setRemovingReportSlug] = useState<string | null>(null);
  const [connection, setConnection] = useState<SupabaseConnectionStatus>({
    frontend: false,
    backend: false,
    message: 'Checking connection',
  });

  useEffect(() => {
    const sessionToken = window.sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
    if (!sessionToken) {
      setAuthChecked(true);
      return;
    }

    verifyAdminSession(sessionToken)
      .then((session) => {
        if (session?.is_valid) {
          setLoggedIn(true);
        } else {
          window.sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
          setLoggedIn(false);
          setMessage('Admin session expired. Please sign in again.');
        }
      })
      .catch((error) => {
        window.sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
        setLoggedIn(false);
        setMessage(getAuthErrorMessage(error));
      })
      .finally(() => setAuthChecked(true));
  }, []);

  useEffect(() => {
    if (isDirty) return;
    latestDraftRef.current = data;
    setDraft(data);
  }, [data, isDirty]);

  useEffect(() => {
    setSampleReportDrafts(sampleReports);
  }, [sampleReports]);

  useEffect(() => {
    if (!loggedIn) return;
    let active = true;

    const refreshConnection = () => {
      checkSupabaseConnection().then((nextConnection) => {
        if (active) setConnection(nextConnection);
      });
    };

    const refreshInquiries = () => {
      loadExpertAdviceInquiries().then((nextInquiries) => {
        if (active) setInquiries(nextInquiries);
      });
      loadPartnerInquiries().then((nextPartnerInquiries) => {
        if (active) setPartnerInquiries(nextPartnerInquiries);
      });
      loadBrochureInquiries().then((nextBrochureInquiries) => {
        if (active) setBrochureInquiries(nextBrochureInquiries);
      });
      loadSampleReports().then((nextReports) => {
        if (active) {
          setSampleReportDrafts(nextReports);
          onSampleReportsChange(nextReports);
        }
      });
    };

    refreshConnection();
    refreshInquiries();
    const interval = window.setInterval(() => {
      refreshConnection();
      refreshInquiries();
    }, 5000);
    window.addEventListener('focus', refreshConnection);
    window.addEventListener('focus', refreshInquiries);

    return () => {
      active = false;
      window.clearInterval(interval);
      window.removeEventListener('focus', refreshConnection);
      window.removeEventListener('focus', refreshInquiries);
    };
  }, [loggedIn]);

  const updateDraft = (next: CmsData) => {
    latestDraftRef.current = next;
    setDraft(next);
    setIsDirty(true);
    setMessage('');
  };

  const updateSampleReportDraft = (slug: string, patch: Partial<SampleReport>) => {
    setSampleReportDrafts((current) =>
      current.map((report) => (report.slug === slug ? { ...report, ...patch } : report)),
    );
    setMessage('');
  };

  const publishSampleReports = (reports: SampleReport[]) => {
    setSampleReportDrafts(reports);
    onSampleReportsChange(reports);
  };

  const saveReport = async (report: SampleReport) => {
    setSavingReportSlug(report.slug);
    try {
      const saved = await saveSampleReport(report);
      const nextReports = sampleReportDrafts.map((item) => (item.slug === saved.slug ? saved : item));
      publishSampleReports(nextReports);
      setMessage(`${saved.title} updated.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save sample report.');
    } finally {
      setSavingReportSlug(null);
    }
  };

  const uploadReportPdf = async (report: SampleReport, file: File) => {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setMessage('Only PDF files can be uploaded for sample reports.');
      return;
    }

    setUploadingReportSlug(report.slug);
    setUploadProgressBySlug((current) => ({ ...current, [report.slug]: 0 }));
    try {
      const pdfPath = await uploadSampleReportPdf(report.slug, file, (progress) => {
        setUploadProgressBySlug((current) => ({ ...current, [report.slug]: progress }));
      });
      const saved = await saveSampleReport({ ...report, pdf_path: pdfPath });
      const nextReports = sampleReportDrafts.map((item) => (item.slug === saved.slug ? saved : item));
      publishSampleReports(nextReports);
      setMessage(`${saved.title} PDF uploaded.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to upload sample report PDF.');
    } finally {
      setUploadingReportSlug(null);
    }
  };

  const removeReportPdf = async (report: SampleReport) => {
    if (!report.pdf_path) return;

    const confirmed = window.confirm(`Remove the PDF for ${report.title}?`);
    if (!confirmed) return;

    setRemovingReportSlug(report.slug);
    try {
      await removeSampleReportPdf(report.pdf_path);
      const saved = await saveSampleReport({ ...report, pdf_path: '' });
      const nextReports = sampleReportDrafts.map((item) => (item.slug === saved.slug ? saved : item));
      publishSampleReports(nextReports);
      setMessage(`${saved.title} PDF removed.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to remove sample report PDF.');
    } finally {
      setRemovingReportSlug(null);
    }
  };

  const refreshInquiries = async () => {
    setIsRefreshingInquiries(true);
    try {
      const nextInquiries = await loadExpertAdviceInquiries();
      setInquiries(nextInquiries);
    } catch {
      setMessage('Unable to refresh inquiries right now. Please try again.');
    } finally {
      setIsRefreshingInquiries(false);
    }
  };

  const refreshPartnerInquiries = async () => {
    setIsRefreshingPartnerInquiries(true);
    try {
      const next = await loadPartnerInquiries();
      setPartnerInquiries(next);
    } catch {
      setMessage('Unable to refresh partner inquiries right now.');
    } finally {
      setIsRefreshingPartnerInquiries(false);
    }
  };

  const refreshBrochureInquiries = async () => {
    setIsRefreshingBrochureInquiries(true);
    try {
      const next = await loadBrochureInquiries();
      setBrochureInquiries(next);
    } catch {
      setMessage('Unable to refresh brochure inquiries right now.');
    } finally {
      setIsRefreshingBrochureInquiries(false);
    }
  };

  const save = async () => {
    if (isSaving) return;

    const latestDraft = latestDraftRef.current;

    // Validate countdown configuration before saving
    if (latestDraft.offer.show_countdown) {
      if (!latestDraft.offer.valid_upto) {
        setMessage('Cannot save: Countdown is enabled but no end date/time is set. Please pick a future date or disable the countdown.');
        return;
      }
      const endTime = new Date(latestDraft.offer.valid_upto).getTime();
      if (isNaN(endTime)) {
        setMessage('Cannot save: The offer end date/time is invalid. Please correct it.');
        return;
      }
      if (endTime <= Date.now()) {
        const confirmed = window.confirm(
          'The offer end date/time is in the past. The countdown will show "Offer Expired" on the website. Save anyway?'
        );
        if (!confirmed) return;
      }
    }

    setIsSaving(true);
    try {
      const savedData = await saveCmsData(latestDraft);
      latestDraftRef.current = savedData;
      setDraft(savedData);
      onDataChange(savedData);
      setIsDirty(false);
      setConnection({ frontend: true, backend: true, message: 'Supabase connected' });
      setMessage('Changes saved to Supabase and published.');
    } catch (error) {
      if (error instanceof SupabaseCmsError && error.status === 404) {
        setConnection({ frontend: true, backend: false, message: 'Tables missing' });
        setMessage('Nothing was published. Supabase tables or RPC functions are missing. Run the Insights CMS migration, then save again.');
      } else {
        setConnection({ frontend: true, backend: false, message: 'Backend unavailable' });
        const detail = error instanceof Error ? error.message : 'Unknown Supabase error.';
        setMessage(`Nothing was published. Supabase rejected the update: ${detail}`);
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (!authChecked) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
          <div className="rounded-2xl border border-white/10 bg-white/10 px-6 py-4 text-sm font-semibold backdrop-blur">
            Checking admin session...
          </div>
        </div>
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
          <form
            className="w-full rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur"
            onSubmit={async (event) => {
              event.preventDefault();
              try {
                const session = await loginAdmin(credentials.username, credentials.password);
                if (!session) {
                  setMessage('Invalid username or password.');
                  return;
                }
                window.sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, session.session_token);
                setLoggedIn(true);
                setMessage('');
                return;
              } catch (error) {
                setMessage(getAuthErrorMessage(error));
              }
            }}
          >
            <img src="/CareerDishaLogo.png" alt="Careerदिशा" className="mb-6 h-16 w-auto brightness-0 invert" />
            <h1 className="mb-2 text-3xl font-extrabold">Admin CMS</h1>
            <p className="mb-8 text-sm text-slate-300">Sign in with the admin account stored in Supabase.</p>
            <div className="space-y-4">
              <Field dark label="Username" value={credentials.username} onChange={(username) => setCredentials({ ...credentials, username })} />
              <Field dark label="Password" type="password" value={credentials.password} onChange={(password) => setCredentials({ ...credentials, password })} />
            </div>
            {message && <p className="mt-4 text-sm font-semibold text-amber-300">{message}</p>}
            <button className="mt-6 w-full rounded-xl bg-[#fba70c] px-5 py-3 font-bold text-slate-950 hover:bg-amber-400">
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Careerदिशा</p>
            <h1 className="text-2xl font-extrabold">Admin CMS</h1>
          </div>
          <div className="flex items-center gap-3">
            <ConnectionStatus status={connection} />
            {isDirty && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">Unsaved changes</span>}
            {message && <span className="text-sm font-semibold text-green-700">{message}</span>}
            <button onClick={save} disabled={isSaving} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-60">
              <Save className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={async () => {
                const sessionToken = window.sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
                if (sessionToken) {
                  try {
                    await logoutAdmin(sessionToken);
                  } catch {
                    // Ignore logout RPC failures and clear local session anyway.
                  }
                }
                window.sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
                setLoggedIn(false);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
        <nav className="mx-auto mt-4 flex max-w-7xl gap-2 overflow-x-auto pb-1">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActive(section.key)}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
                active === section.key ? 'bg-primary text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          {active === 'brochure' && (
            <div className="space-y-6">
              <h2 className="text-xl font-extrabold">Brochure Details</h2>
                <p className="text-sm text-slate-500 font-medium">Configure your brochure page file upload.</p>
                
                <PdfInput 
                  value={draft.brochure?.pdfUrl || ''} 
                  onUpload={(file, onProgress) => uploadCmsBrochurePdf(file, onProgress)}
                  onChange={(pdfUrl) => updateDraft({ ...draft, brochure: { ...draft.brochure, pdfUrl } })} 
                />

                <div className="h-px bg-slate-200 mt-8 mb-4"></div>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-extrabold">Brochure Inquiries</h2>
                      <p className="text-sm text-slate-500">People who downloaded the brochure.</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={refreshBrochureInquiries}
                        disabled={isRefreshingBrochureInquiries}
                        className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-50"
                      >
                        {isRefreshingBrochureInquiries ? 'Refreshing...' : 'Refresh'}
                      </button>
                      {brochureInquiries.length > 0 && (
                        <button
                          onClick={async () => {
                            const confirmed = window.confirm('Delete all brochure downloads? This cannot be undone.');
                            if (!confirmed) return;
                            try {
                              const deletable = brochureInquiries.filter((item) => item.id);
                              await Promise.all(deletable.map((item) => deleteBrochureInquiry(String(item.id))));
                              setBrochureInquiries([]);
                              setMessage('All brochure downloads deleted.');
                            } catch {
                              setMessage('Unable to delete all brochure downloads.');
                            }
                          }}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete All
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {brochureInquiries.length > 0 ? (
                    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm scrollbar-thin">
                      <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                          <tr>
                            <th className="px-4 py-3 font-bold">Date</th>
                            <th className="px-4 py-3 font-bold">Name</th>
                            <th className="px-4 py-3 font-bold">Contact</th>
                            <th className="px-4 py-3 font-bold">Query</th>
                            <th className="px-4 py-3 text-right font-bold">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {brochureInquiries.map((inq) => (
                            <tr key={inq.id ?? `${inq.email}-${inq.mobile}`}>
                              <td className="px-4 py-3 text-slate-500">{inq.created_at ? new Date(inq.created_at).toLocaleString() : '-'}</td>
                              <td className="px-4 py-3 font-bold">{inq.name}</td>
                              <td className="px-4 py-3">
                                <div>{inq.email}</div>
                                <div className="text-slate-500">{inq.mobile}</div>
                                {inq.countryname && <div className="text-xs text-slate-400">{inq.countryname} ({inq.countrycode})</div>}
                              </td>
                              <td className="px-4 py-3 text-slate-600 whitespace-normal min-w-[200px]">{inq.query || '-'}</td>
                              <td className="px-4 py-3 text-right">
                                <button
                                  onClick={async () => {
                                    if (!inq.id) return;
                                    const confirmed = window.confirm('Delete this record?');
                                    if (!confirmed) return;
                                    setDeletingBrochureInquiryId(inq.id);
                                    setIsDeletingBrochureInquiries(true);
                                    try {
                                      await deleteBrochureInquiry(inq.id);
                                      setBrochureInquiries((prev) => prev.filter((item) => item.id !== inq.id));
                                      setMessage('Record deleted.');
                                    } catch {
                                      setMessage('Unable to delete record.');
                                    } finally {
                                      setIsDeletingBrochureInquiries(false);
                                      setDeletingBrochureInquiryId(null);
                                    }
                                  }}
                                  disabled={isDeletingBrochureInquiries || !inq.id}
                                  className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  {deletingBrochureInquiryId === inq.id ? 'Deleting...' : 'Delete'}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center">
                      <p className="text-sm font-medium text-slate-500">No brochure downloads yet.</p>
                    </div>
                  )}
                </div>
                        </div>
            )}

            {active === 'sampleReports' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold">Sample Reports</h2>
                  <p className="text-sm font-medium text-slate-500">Manage the three landing page report previews.</p>
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                  {sampleReportDrafts.map((report) => {
                    const uploadId = `sample-report-${report.slug}`;
                    const isUploading = uploadingReportSlug === report.slug;
                    const isSavingReport = savingReportSlug === report.slug;
                    const isRemoving = removingReportSlug === report.slug;
                    const progress = uploadProgressBySlug[report.slug] ?? 0;

                    return (
                      <div key={report.slug} className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <FileText className="h-5 w-5" />
                            </span>
                            <div>
                              <h3 className="font-extrabold text-slate-950">{report.title}</h3>
                              <p className="text-xs font-bold text-slate-500">{report.page_count}</p>
                            </div>
                          </div>
                          <label className="flex items-center gap-2 text-xs font-bold text-slate-600">
                            <input
                              type="checkbox"
                              checked={report.is_active}
                              onChange={(event) => updateSampleReportDraft(report.slug, { is_active: event.target.checked })}
                            />
                            Active
                          </label>
                        </div>

                        <div className="space-y-3">
                          <Field
                            label="Title"
                            value={report.title}
                            onChange={(title) => updateSampleReportDraft(report.slug, { title })}
                          />
                          <Field
                            label="Page Count Text"
                            value={report.page_count}
                            onChange={(page_count) => updateSampleReportDraft(report.slug, { page_count })}
                          />
                          <TextArea
                            label="Subtitle"
                            value={report.subtitle}
                            rows={3}
                            onChange={(subtitle) => updateSampleReportDraft(report.slug, { subtitle })}
                          />
                        </div>

                        <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">PDF File</p>
                              <p className="mt-1 truncate text-xs font-semibold text-slate-600">
                                {report.pdf_path || 'No PDF uploaded'}
                              </p>
                            </div>
                            {report.pdf_path && (
                              <button
                                onClick={() => removeReportPdf(report)}
                                disabled={isRemoving}
                                className="shrink-0 rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                                title="Remove PDF"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}
                          </div>

                          {isUploading && (
                            <div className="mt-3">
                              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className="h-full rounded-full bg-primary transition-all"
                                  style={{ width: `${Math.max(progress, 8)}%` }}
                                />
                              </div>
                              <p className="mt-1 text-xs font-bold text-slate-500">Uploading {progress}%</p>
                            </div>
                          )}

                          <div className="mt-3 flex flex-wrap gap-2">
                            <label
                              htmlFor={uploadId}
                              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50"
                            >
                              <Upload className="h-4 w-4" />
                              {report.pdf_path ? 'Replace PDF' : 'Upload PDF'}
                            </label>
                            <input
                              id={uploadId}
                              type="file"
                              accept="application/pdf"
                              className="hidden"
                              onChange={(event) => {
                                const file = event.target.files?.[0];
                                event.target.value = '';
                                if (file) uploadReportPdf(report, file);
                              }}
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => saveReport(report)}
                          disabled={isSavingReport || isUploading}
                          className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-60"
                        >
                          <Save className="h-4 w-4" />
                          {isSavingReport ? 'Saving...' : 'Save Report'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {active === 'offer' && (
            <OfferEditor draft={draft} updateDraft={updateDraft} />
          )}

          {active === 'expert' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold">Expert Advice Modal Settings</h2>
                <Field label="Modal Heading" value={draft.expertAdvice.heading} onChange={(heading) => updateDraft({ ...draft, expertAdvice: { ...draft.expertAdvice, heading } })} />
                <TextArea label="Services (one per line)" value={draft.expertAdvice.services.join('\n')} onChange={(value) => updateDraft({ ...draft, expertAdvice: { ...draft.expertAdvice, services: value.split('\n').filter(Boolean) } })} />
                <Field label="Success Message" value={draft.expertAdvice.successMessage} onChange={(successMessage) => updateDraft({ ...draft, expertAdvice: { ...draft.expertAdvice, successMessage } })} />
              </div>

              <div className="h-px bg-slate-200"></div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-extrabold">Expert Advice Inquiries</h2>
                    <p className="text-sm text-slate-500">Latest form submissions stored in Supabase. Refreshes automatically every 5 seconds.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={async () => {
                        if (inquiries.length === 0) return;
                        const confirmed = window.confirm('Delete all inquiries? This action cannot be undone.');
                        if (!confirmed) return;
                        setIsDeletingInquiries(true);
                        try {
                          await deleteAllExpertAdviceInquiries();
                          setInquiries([]);
                          setMessage('All expert advice inquiries deleted.');
                        } catch (error) {
                          // Fallback path for environments where bulk-delete RPC is not deployed yet.
                          try {
                            const deletable = inquiries.filter((item) => item.id);
                            await Promise.all(deletable.map((item) => deleteExpertAdviceInquiry(String(item.id))));
                            setInquiries([]);
                            setMessage('All expert advice inquiries deleted.');
                          } catch {
                            const errorMessage = error instanceof Error ? error.message : 'unknown error';
                            setMessage(`Unable to delete all inquiries (${errorMessage}).`);
                          }
                        } finally {
                          setIsDeletingInquiries(false);
                        }
                      }}
                      disabled={isDeletingInquiries || inquiries.length === 0}
                      className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isDeletingInquiries ? 'Deleting...' : 'Delete All'}
                    </button>
                    <button
                      onClick={refreshInquiries}
                      disabled={isDeletingInquiries || isRefreshingInquiries}
                      className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isRefreshingInquiries ? 'Refreshing...' : 'Refresh'}
                    </button>
                  </div>
                </div>
                {inquiries.length === 0 ? (
                  <p className="rounded-xl bg-slate-50 p-5 text-sm font-semibold text-slate-500">No inquiries found yet.</p>
                ) : (
                  <div className="overflow-hidden rounded-xl border border-slate-200">
                    <table className="w-full min-w-[860px] text-left text-sm">
                      <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                        <tr>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3">Name</th>
                          <th className="px-4 py-3">Contact</th>
                          <th className="px-4 py-3">Service</th>
                          <th className="px-4 py-3">Message</th>
                          <th className="px-4 py-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {inquiries.map((inquiry) => (
                          <tr key={inquiry.id ?? `${inquiry.email}-${inquiry.mobile}`}>
                            <td className="px-4 py-3 text-slate-500">{inquiry.created_at ? new Date(inquiry.created_at).toLocaleString() : '-'}</td>
                            <td className="px-4 py-3 font-bold">{inquiry.name}</td>
                            <td className="px-4 py-3">
                              <div>{inquiry.email}</div>
                              <div className="text-slate-500">{inquiry.mobile}</div>
                              {inquiry.countryname && <div className="text-xs text-slate-400">{inquiry.countryname} ({inquiry.countrycode})</div>}
                            </td>
                            <td className="px-4 py-3">{inquiry.service}</td>
                            <td className="px-4 py-3 text-slate-600">{inquiry.message || '-'}</td>
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={async () => {
                                  if (!inquiry.id) return;
                                  const confirmed = window.confirm('Delete this inquiry? This action cannot be undone.');
                                  if (!confirmed) return;
                                  setDeletingInquiryId(inquiry.id);
                                  setIsDeletingInquiries(true);
                                  try {
                                    await deleteExpertAdviceInquiry(inquiry.id);
                                    setInquiries((prev) => prev.filter((item) => item.id !== inquiry.id));
                                    setMessage('Inquiry deleted.');
                                  } catch {
                                    setMessage('Unable to delete inquiry right now. Please try again.');
                                  } finally {
                                    setIsDeletingInquiries(false);
                                    setDeletingInquiryId(null);
                                  }
                                }}
                                disabled={isDeletingInquiries || !inquiry.id}
                                className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                {deletingInquiryId === inquiry.id ? 'Deleting...' : 'Delete'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {active === 'insights' && (
            <div className="space-y-8">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Hero Title" value={draft.insights.heroTitle} onChange={(heroTitle) => updateDraft({ ...draft, insights: { ...draft.insights, heroTitle } })} />
                <div className="md:col-span-2">
                  <TextArea label="Hero Description" value={draft.insights.heroDescription} onChange={(heroDescription) => updateDraft({ ...draft, insights: { ...draft.insights, heroDescription } })} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-extrabold">YouTube Videos</h2>
                    <p className="text-sm text-slate-500">Use only the YouTube video ID, for example: 2RBDdsniaHw.</p>
                  </div>
                  <button onClick={() => updateDraft({ ...draft, insights: { ...draft.insights, videos: [...draft.insights.videos, emptyInsightVideo()] } })} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-container">
                    <Plus className="h-4 w-4" />
                    Add Video
                  </button>
                </div>
                {draft.insights.videos.map((video) => (
                  <div key={video.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h3 className="font-bold">{video.title}</h3>
                      <button onClick={() => updateDraft({ ...draft, insights: { ...draft.insights, videos: draft.insights.videos.filter((item) => item.id !== video.id) } })} className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Video Title" value={video.title} onChange={(title) => updateDraft({ ...draft, insights: { ...draft.insights, videos: draft.insights.videos.map((item) => item.id === video.id ? { ...item, title } : item) } })} />
                      <Field label="YouTube ID" value={video.youtubeId} onChange={(youtubeId) => updateDraft({ ...draft, insights: { ...draft.insights, videos: draft.insights.videos.map((item) => item.id === video.id ? { ...item, youtubeId } : item) } })} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-extrabold">Blogs</h2>
                    <p className="text-sm text-slate-500">Manage internal blog posts. Slugs and upload dates are generated automatically.</p>
                  </div>
                  <button onClick={() => updateDraft({ ...draft, insights: { ...draft.insights, blogs: [...draft.insights.blogs, emptyInsightBlog()] } })} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-container">
                    <Plus className="h-4 w-4" />
                    Add New Blog
                  </button>
                </div>
                {draft.insights.blogs.map((blog) => (
                  <div key={blog.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h3 className="font-bold">{blog.title}</h3>
                      <button onClick={() => updateDraft({ ...draft, insights: { ...draft.insights, blogs: draft.insights.blogs.filter((item) => item.id !== blog.id) } })} className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Title" value={blog.title} onChange={(title) => updateDraft({ ...draft, insights: { ...draft.insights, blogs: draft.insights.blogs.map((item) => item.id === blog.id ? { ...item, title } : item) } })} />
                      <ImageInput
                        value={blog.image}
                        onUpload={(file, onProgress) => uploadInsightMediaFile(file, 'blogs', onProgress)}
                        onChange={(image) => updateDraft({ ...draft, insights: { ...draft.insights, blogs: draft.insights.blogs.map((item) => item.id === blog.id ? { ...item, image } : item) } })}
                      />
                      <div className="md:col-span-2">
                        <TextArea label="Blog Content" value={blog.content} onChange={(content) => updateDraft({ ...draft, insights: { ...draft.insights, blogs: draft.insights.blogs.map((item) => item.id === blog.id ? { ...item, content } : item) } })} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === 'testimonials' && (
            <CollectionEditor
              items={draft.testimonials}
              onAdd={() => updateDraft({ ...draft, testimonials: [...draft.testimonials, emptyTestimonial()] })}
              onRemove={(id) => updateDraft({ ...draft, testimonials: draft.testimonials.filter((item) => item.id !== id) })}
              render={(item) => (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Name" value={item.name} onChange={(name) => updateDraft({ ...draft, testimonials: draft.testimonials.map((t) => t.id === item.id ? { ...t, name } : t) })} />
                  <Field label="Role" value={item.role} onChange={(role) => updateDraft({ ...draft, testimonials: draft.testimonials.map((t) => t.id === item.id ? { ...t, role } : t) })} />
                  <Field label="Rating" type="number" value={String(item.rating)} onChange={(rating) => updateDraft({ ...draft, testimonials: draft.testimonials.map((t) => t.id === item.id ? { ...t, rating: Number(rating) || 5 } : t) })} />
                  <ImageInput
                    value={item.image}
                    onUpload={(file, onProgress) => uploadCmsImageFile(file, 'testimonials', onProgress)}
                    onChange={(image) => updateDraft({ ...draft, testimonials: draft.testimonials.map((t) => t.id === item.id ? { ...t, image } : t) })}
                  />
                  
                  <div className="md:col-span-2">
                    <TextArea label="Quote" value={item.quote} onChange={(quote) => updateDraft({ ...draft, testimonials: draft.testimonials.map((t) => t.id === item.id ? { ...t, quote } : t) })} />
                  </div>
                </div>
              )}
            />
          )}

          {active === 'counsellors' && (
            <CollectionEditor
              addButtonText="Add a councellor"
              items={draft.counsellors}
              onAdd={() => updateDraft({ ...draft, counsellors: [...draft.counsellors, emptyCounsellor()] })}
              onRemove={(id) => updateDraft({ ...draft, counsellors: draft.counsellors.filter((item) => item.id !== id) })}
              render={(item) => (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Name" value={item.name} onChange={(name) => updateDraft({ ...draft, counsellors: draft.counsellors.map((c) => c.id === item.id ? { ...c, name } : c) })} />
                  <Field label="Title" value={item.title} onChange={(title) => updateDraft({ ...draft, counsellors: draft.counsellors.map((c) => c.id === item.id ? { ...c, title } : c) })} />
                  <SelectField
                    label="Accent Style"
                    value={item.accent}
                    options={counsellorAccentOptions}
                    onChange={(accent) => updateDraft({ ...draft, counsellors: draft.counsellors.map((c) => c.id === item.id ? { ...c, accent } : c) })}
                  />
                  <ImageInput
                    value={item.image}
                    onUpload={(file, onProgress) => uploadCmsImageFile(file, 'counsellors', onProgress)}
                    onChange={(image) => updateDraft({ ...draft, counsellors: draft.counsellors.map((c) => c.id === item.id ? { ...c, image } : c) })}
                  />
                  <div className="md:col-span-2">
                    <TextArea label="Quote" value={item.quote} onChange={(quote) => updateDraft({ ...draft, counsellors: draft.counsellors.map((c) => c.id === item.id ? { ...c, quote } : c) })} />
                    <TextArea label="Bullets (one per line)" rows={5} value={item.bullets.join('\n')} onChange={(value) => updateDraft({ ...draft, counsellors: draft.counsellors.map((c) => c.id === item.id ? { ...c, bullets: value.split('\n').filter(Boolean) } : c) })} />
                  </div>
                </div>
              )}
            />
          )}

          {active === 'partner' && (
            <div className="space-y-8">
              {/* Partner Hero Content */}
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold">Hero Section</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Badge Text" value={draft.partner.hero.badge} onChange={(badge) => updateDraft({ ...draft, partner: { ...draft.partner, hero: { ...draft.partner.hero, badge } } })} />
                  <Field label="Heading" value={draft.partner.hero.heading} onChange={(heading) => updateDraft({ ...draft, partner: { ...draft.partner, hero: { ...draft.partner.hero, heading } } })} />
                  <Field label="Highlight (gradient text)" value={draft.partner.hero.highlight} onChange={(highlight) => updateDraft({ ...draft, partner: { ...draft.partner, hero: { ...draft.partner.hero, highlight } } })} />
                  <div className="md:col-span-2">
                    <TextArea label="Description" value={draft.partner.hero.description} onChange={(description) => updateDraft({ ...draft, partner: { ...draft.partner, hero: { ...draft.partner.hero, description } } })} />
                  </div>
                  <div className="md:col-span-2">
                    <TextArea label="Partner Programs (one per line — shown in form dropdown)" value={draft.partner.hero.programs.join('\n')} onChange={(value) => updateDraft({ ...draft, partner: { ...draft.partner, hero: { ...draft.partner.hero, programs: value.split('\n').filter(Boolean) } } })} />
                  </div>
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 pt-2">Stats</h3>
                {draft.partner.hero.stats.map((stat, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-4 rounded-lg bg-slate-50 p-3">
                    <Field label={`Stat ${idx + 1} Value`} value={stat.value} onChange={(value) => { const stats = [...draft.partner.hero.stats]; stats[idx] = { ...stats[idx], value }; updateDraft({ ...draft, partner: { ...draft.partner, hero: { ...draft.partner.hero, stats } } }); }} />
                    <Field label={`Stat ${idx + 1} Label`} value={stat.label} onChange={(label) => { const stats = [...draft.partner.hero.stats]; stats[idx] = { ...stats[idx], label }; updateDraft({ ...draft, partner: { ...draft.partner, hero: { ...draft.partner.hero, stats } } }); }} />
                  </div>
                ))}
              </div>

              <div className="h-px bg-slate-200"></div>

              {/* Service Cards */}
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold">Service Cards</h2>
                {draft.partner.services.map((svc) => (
                  <div key={svc.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="font-bold mb-3">{svc.title}</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Title" value={svc.title} onChange={(title) => updateDraft({ ...draft, partner: { ...draft.partner, services: draft.partner.services.map((s) => s.id === svc.id ? { ...s, title } : s) } })} />
                      <Field label="Highlight" value={svc.highlight} onChange={(highlight) => updateDraft({ ...draft, partner: { ...draft.partner, services: draft.partner.services.map((s) => s.id === svc.id ? { ...s, highlight } : s) } })} />
                      <Field label="Badge" value={svc.badge} onChange={(badge) => updateDraft({ ...draft, partner: { ...draft.partner, services: draft.partner.services.map((s) => s.id === svc.id ? { ...s, badge } : s) } })} />
                      <Field label="Accent Color Class" value={svc.accentColor} onChange={(accentColor) => updateDraft({ ...draft, partner: { ...draft.partner, services: draft.partner.services.map((s) => s.id === svc.id ? { ...s, accentColor } : s) } })} />
                      <div className="md:col-span-2">
                        <TextArea label="Description" value={svc.description} onChange={(description) => updateDraft({ ...draft, partner: { ...draft.partner, services: draft.partner.services.map((s) => s.id === svc.id ? { ...s, description } : s) } })} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-slate-200"></div>

              {/* Path Cards */}
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold">Select Your Path Cards</h2>
                {draft.partner.paths.map((path) => (
                  <div key={path.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="font-bold mb-3">{path.title} — {path.subtitle}</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Title" value={path.title} onChange={(title) => updateDraft({ ...draft, partner: { ...draft.partner, paths: draft.partner.paths.map((p) => p.id === path.id ? { ...p, title } : p) } })} />
                      <Field label="Subtitle" value={path.subtitle} onChange={(subtitle) => updateDraft({ ...draft, partner: { ...draft.partner, paths: draft.partner.paths.map((p) => p.id === path.id ? { ...p, subtitle } : p) } })} />
                      <Field label="Stat Badge" value={path.stat} onChange={(stat) => updateDraft({ ...draft, partner: { ...draft.partner, paths: draft.partner.paths.map((p) => p.id === path.id ? { ...p, stat } : p) } })} />
                      <Field label="Stat Label" value={path.statLabel} onChange={(statLabel) => updateDraft({ ...draft, partner: { ...draft.partner, paths: draft.partner.paths.map((p) => p.id === path.id ? { ...p, statLabel } : p) } })} />
                      <div className="md:col-span-2">
                        <TextArea label="Description" value={path.description} onChange={(description) => updateDraft({ ...draft, partner: { ...draft.partner, paths: draft.partner.paths.map((p) => p.id === path.id ? { ...p, description } : p) } })} />
                      </div>
                      <div className="md:col-span-2">
                        <TextArea label="Benefits (one per line)" rows={5} value={path.benefits.join('\n')} onChange={(value) => updateDraft({ ...draft, partner: { ...draft.partner, paths: draft.partner.paths.map((p) => p.id === path.id ? { ...p, benefits: value.split('\n').filter(Boolean) } : p) } })} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-slate-200"></div>

              {/* Why Partner */}
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold">Why Partner Section</h2>
                {draft.partner.whyPartner.map((item) => (
                  <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Title" value={item.title} onChange={(title) => updateDraft({ ...draft, partner: { ...draft.partner, whyPartner: draft.partner.whyPartner.map((w) => w.id === item.id ? { ...w, title } : w) } })} />
                      <Field label="Color Class" value={item.color} onChange={(color) => updateDraft({ ...draft, partner: { ...draft.partner, whyPartner: draft.partner.whyPartner.map((w) => w.id === item.id ? { ...w, color } : w) } })} />
                      <div className="md:col-span-2">
                        <TextArea label="Description" value={item.description} onChange={(description) => updateDraft({ ...draft, partner: { ...draft.partner, whyPartner: draft.partner.whyPartner.map((w) => w.id === item.id ? { ...w, description } : w) } })} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-slate-200"></div>

              {/* CTA Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold">CTA Section</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Heading" value={draft.partner.cta.heading} onChange={(heading) => updateDraft({ ...draft, partner: { ...draft.partner, cta: { ...draft.partner.cta, heading } } })} />
                  <Field label="Email Address" value={draft.partner.cta.emailAddress} onChange={(emailAddress) => updateDraft({ ...draft, partner: { ...draft.partner, cta: { ...draft.partner.cta, emailAddress } } })} />
                  <div className="md:col-span-2">
                    <TextArea label="Description" value={draft.partner.cta.description} onChange={(description) => updateDraft({ ...draft, partner: { ...draft.partner, cta: { ...draft.partner.cta, description } } })} />
                  </div>
                  <div className="md:col-span-2">
                    <Field label="WhatsApp URL" value={draft.partner.cta.whatsappUrl} onChange={(whatsappUrl) => updateDraft({ ...draft, partner: { ...draft.partner, cta: { ...draft.partner.cta, whatsappUrl } } })} />
                  </div>
                </div>
              </div>

              <div className="h-px bg-slate-200"></div>

              {/* Partner Inquiries */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-extrabold">Partner Demo Inquiries</h2>
                    <p className="text-sm text-slate-500">Form submissions from the Partner page. Refreshes automatically every 5 seconds.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={async () => {
                        if (partnerInquiries.length === 0) return;
                        const confirmed = window.confirm('Delete all partner inquiries? This action cannot be undone.');
                        if (!confirmed) return;
                        setIsDeletingPartnerInquiries(true);
                        try {
                          await deleteAllPartnerInquiries();
                          setPartnerInquiries([]);
                          setMessage('All partner inquiries deleted.');
                        } catch (error) {
                          try {
                            const deletable = partnerInquiries.filter((item) => item.id);
                            await Promise.all(deletable.map((item) => deletePartnerInquiry(String(item.id))));
                            setPartnerInquiries([]);
                            setMessage('All partner inquiries deleted.');
                          } catch {
                            const errorMessage = error instanceof Error ? error.message : 'unknown error';
                            setMessage(`Unable to delete all partner inquiries (${errorMessage}).`);
                          }
                        } finally {
                          setIsDeletingPartnerInquiries(false);
                        }
                      }}
                      disabled={isDeletingPartnerInquiries || partnerInquiries.length === 0}
                      className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isDeletingPartnerInquiries ? 'Deleting...' : 'Delete All'}
                    </button>
                    <button
                      onClick={refreshPartnerInquiries}
                      disabled={isDeletingPartnerInquiries || isRefreshingPartnerInquiries}
                      className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isRefreshingPartnerInquiries ? 'Refreshing...' : 'Refresh'}
                    </button>
                  </div>
                </div>
                {partnerInquiries.length === 0 ? (
                  <p className="rounded-xl bg-slate-50 p-5 text-sm font-semibold text-slate-500">No partner inquiries found yet.</p>
                ) : (
                  <div className="overflow-hidden rounded-xl border border-slate-200">
                    <table className="w-full min-w-[700px] text-left text-sm">
                      <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                        <tr>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3">Name</th>
                          <th className="px-4 py-3">Email</th>
                          <th className="px-4 py-3">Phone</th>
                          <th className="px-4 py-3">Interested In</th>
                          <th className="px-4 py-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {partnerInquiries.map((inq) => (
                          <tr key={inq.id ?? `${inq.email}-${inq.phone}`}>
                            <td className="px-4 py-3 text-slate-500">{inq.created_at ? new Date(inq.created_at).toLocaleString() : '-'}</td>
                            <td className="px-4 py-3 font-bold">{inq.name}</td>
                            <td className="px-4 py-3">{inq.email}</td>
                            <td className="px-4 py-3">
                              {inq.phone}
                              {inq.countryname && <div className="text-xs text-slate-400 mt-1">{inq.countryname} ({inq.countrycode})</div>}
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">{inq.interested_in}</span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={async () => {
                                  if (!inq.id) return;
                                  const confirmed = window.confirm('Delete this inquiry?');
                                  if (!confirmed) return;
                                  setDeletingPartnerInquiryId(inq.id);
                                  setIsDeletingPartnerInquiries(true);
                                  try {
                                    await deletePartnerInquiry(inq.id);
                                    setPartnerInquiries((prev) => prev.filter((item) => item.id !== inq.id));
                                    setMessage('Partner inquiry deleted.');
                                  } catch {
                                    setMessage('Unable to delete inquiry.');
                                  } finally {
                                    setIsDeletingPartnerInquiries(false);
                                    setDeletingPartnerInquiryId(null);
                                  }
                                }}
                                disabled={isDeletingPartnerInquiries || !inq.id}
                                className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                {deletingPartnerInquiryId === inq.id ? 'Deleting...' : 'Delete'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {active === 'contact' && (
            <div className="grid gap-4 md:grid-cols-2">
              <TextArea label="Phone Numbers (one per line)" value={draft.contact.phones.join('\n')} onChange={(value) => updateDraft({ ...draft, contact: { ...draft.contact, phones: value.split('\n').filter(Boolean) } })} />
              <Field label="Email" value={draft.contact.email} onChange={(email) => updateDraft({ ...draft, contact: { ...draft.contact, email } })} />
              <Field label="Website" value={draft.contact.website} onChange={(website) => updateDraft({ ...draft, contact: { ...draft.contact, website } })} />
              <Field label="WhatsApp Chat URL" value={draft.contact.whatsapp} onChange={(whatsapp) => updateDraft({ ...draft, contact: { ...draft.contact, whatsapp } })} />
              <Field label="Map Query" value={draft.contact.mapQuery} onChange={(mapQuery) => updateDraft({ ...draft, contact: { ...draft.contact, mapQuery } })} />
              <div className="md:col-span-2">
                <TextArea label="Address" value={draft.contact.address} onChange={(address) => updateDraft({ ...draft, contact: { ...draft.contact, address } })} />
              </div>
              {Object.entries(draft.contact.socials).map(([key, value]) => (
                <Field key={key} label={`${key} URL`} value={value} onChange={(url) => updateDraft({ ...draft, contact: { ...draft.contact, socials: { ...draft.contact.socials, [key]: url } } })} />
              ))}
            </div>
          )}


        </section>
      </div>
    </main>
  );
}

// ─── Date/time helpers for 12-hour AM/PM offer editor ─────────────────────

/** Build an ISO 8601 string with local timezone offset, e.g. "2026-05-15T14:30:00+05:30" */
function buildIsoWithOffset(date: string, hour12: number, minute: number, ampm: 'AM' | 'PM'): string {
  let hour24 = hour12 % 12;
  if (ampm === 'PM') hour24 += 12;

  const pad = (n: number) => n.toString().padStart(2, '0');

  // Get the local timezone offset to embed in the ISO string
  const offsetMinutes = -(new Date().getTimezoneOffset());
  const offsetSign = offsetMinutes >= 0 ? '+' : '-';
  const absOffset = Math.abs(offsetMinutes);
  const offsetHours = pad(Math.floor(absOffset / 60));
  const offsetMins = pad(absOffset % 60);

  return `${date}T${pad(hour24)}:${pad(minute)}:00${offsetSign}${offsetHours}:${offsetMins}`;
}

/** Parse a stored valid_upto ISO string back into { date, hour12, minute, ampm } */
function parseValidUpto(raw: string | undefined): { date: string; hour12: number; minute: number; ampm: 'AM' | 'PM' } | null {
  if (!raw) return null;

  const normalised = raw.includes('T') ? raw : raw.replace(' ', 'T');
  const d = new Date(normalised);
  if (isNaN(d.getTime())) return null;

  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const hour24 = d.getHours();
  const minute = d.getMinutes();
  const ampm: 'AM' | 'PM' = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;

  return { date: `${year}-${month}-${day}`, hour12, minute, ampm };
}

/** Check if a given date + time is in the past */
function isDateTimeInPast(date: string, hour12: number, minute: number, ampm: 'AM' | 'PM'): boolean {
  const iso = buildIsoWithOffset(date, hour12, minute, ampm);
  return new Date(iso).getTime() <= Date.now();
}

/** Format a date string + time into a human‑readable preview */
function formatPreview(date: string, hour12: number, minute: number, ampm: 'AM' | 'PM'): string {
  const d = new Date(date + 'T00:00:00');
  if (isNaN(d.getTime())) return '';
  const dayStr = d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${dayStr} at ${hour12}:${pad(minute)} ${ampm}`;
}

/** Get today's date as YYYY-MM-DD for the min attribute */
function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
}

// ─── Offer Editor Component ──────────────────────────────────────────────

function OfferEditor({ draft, updateDraft }: { draft: CmsData; updateDraft: (data: CmsData) => void }) {
  const parsed = parseValidUpto(draft.offer.valid_upto);
  const dateVal = parsed?.date || '';
  const hour12Val = parsed?.hour12 || 12;
  const minuteVal = parsed?.minute ?? 0;
  const ampmVal = parsed?.ampm || 'AM';

  const isPast = dateVal ? isDateTimeInPast(dateVal, hour12Val, minuteVal, ampmVal) : false;

  const setDateTime = (date: string, hour12: number, minute: number, ampm: 'AM' | 'PM') => {
    if (!date) {
      updateDraft({ ...draft, offer: { ...draft.offer, valid_upto: '' } });
      return;
    }
    const iso = buildIsoWithOffset(date, hour12, minute, ampm);
    updateDraft({ ...draft, offer: { ...draft.offer, valid_upto: iso } });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="flex items-center gap-3 rounded-lg bg-slate-50 p-3 text-sm font-bold">
        <input
          type="checkbox"
          checked={draft.offer.visible}
          onChange={(event) => updateDraft({ ...draft, offer: { ...draft.offer, visible: event.target.checked } })}
        />
        Show offer on website
      </label>
      <label className="flex items-center gap-3 rounded-lg bg-slate-50 p-3 text-sm font-bold">
        <input
          type="checkbox"
          checked={!!draft.offer.show_countdown}
          onChange={(event) => updateDraft({ ...draft, offer: { ...draft.offer, show_countdown: event.target.checked } })}
        />
        Enable Countdown Timer
      </label>

      {draft.offer.show_countdown === true && (
        <div className="md:col-span-2 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Offer Valid Until</span>

          {/* Date picker */}
          <div className="flex flex-wrap gap-3 items-end">
            <label className="block">
              <span className="text-xs font-semibold text-slate-400 block mb-1">Date</span>
              <input
                type="date"
                min={getTodayString()}
                value={dateVal}
                onChange={(e) => setDateTime(e.target.value, hour12Val, minuteVal, ampmVal)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>

            {/* Hour */}
            <label className="block">
              <span className="text-xs font-semibold text-slate-400 block mb-1">Hour</span>
              <select
                value={hour12Val}
                onChange={(e) => setDateTime(dateVal, Number(e.target.value), minuteVal, ampmVal)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </label>

            <span className="text-lg font-bold text-slate-400 pb-2">:</span>

            {/* Minute */}
            <label className="block">
              <span className="text-xs font-semibold text-slate-400 block mb-1">Min</span>
              <select
                value={minuteVal}
                onChange={(e) => setDateTime(dateVal, hour12Val, Number(e.target.value), ampmVal)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                  <option key={m} value={m}>{m.toString().padStart(2, '0')}</option>
                ))}
              </select>
            </label>

            {/* AM/PM */}
            <label className="block">
              <span className="text-xs font-semibold text-slate-400 block mb-1">AM/PM</span>
              <select
                value={ampmVal}
                onChange={(e) => setDateTime(dateVal, hour12Val, minuteVal, e.target.value as 'AM' | 'PM')}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </label>
          </div>

          {/* Preview + validation */}
          {dateVal && (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-500">
                📅 {formatPreview(dateVal, hour12Val, minuteVal, ampmVal)}
              </p>
              {isPast && (
                <p className="text-xs font-bold text-red-500 bg-red-50 rounded-lg px-3 py-2 inline-block">
                  ⚠ The selected date/time is in the past. The countdown will show "Offer Expired" on the website.
                </p>
              )}
            </div>
          )}
          {!dateVal && draft.offer.show_countdown && (
            <p className="text-xs font-bold text-amber-600 bg-amber-50 rounded-lg px-3 py-2 inline-block">
              ⚠ No end date selected. Please pick a future date/time for the countdown.
            </p>
          )}
        </div>
      )}

      <Field label="Badge" value={draft.offer.badge} onChange={(badge) => updateDraft({ ...draft, offer: { ...draft.offer, badge } })} />
      <Field label="Title" value={draft.offer.title} onChange={(title) => updateDraft({ ...draft, offer: { ...draft.offer, title } })} />
      <Field label="CTA" value={draft.offer.cta} onChange={(cta) => updateDraft({ ...draft, offer: { ...draft.offer, cta } })} />
      <Field label="Original Price" value={draft.offer.originalPrice} onChange={(originalPrice) => updateDraft({ ...draft, offer: { ...draft.offer, originalPrice } })} />
      <Field label="Offer Price" value={draft.offer.offerPrice} onChange={(offerPrice) => updateDraft({ ...draft, offer: { ...draft.offer, offerPrice } })} />
      <div className="md:col-span-2">
        <TextArea label="Description" value={draft.offer.description} onChange={(description) => updateDraft({ ...draft, offer: { ...draft.offer, description } })} />
      </div>
      <div className="md:col-span-2">
        <Field label="Offer Note" value={draft.offer.note} onChange={(note) => updateDraft({ ...draft, offer: { ...draft.offer, note } })} />
      </div>
    </div>
  );
}

function CollectionEditor<T extends { id: string; name: string }>({
  items,
  onAdd,
  onRemove,
  render,
  addButtonText = 'Add Item',
}: {
  items: T[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  render: (item: T) => React.ReactNode;
  addButtonText?: string;
}) {
  return (
    <div className="space-y-5">
      <button onClick={onAdd} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-container">
        <Plus className="h-4 w-4" />
        {addButtonText}
      </button>
      {items.map((item) => (
        <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="font-bold">{item.name}</h3>
            <button onClick={() => onRemove(item.id)} className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50">
              <Trash2 className="h-4 w-4" />
              Remove
            </button>
          </div>
          {render(item)}
        </div>
      ))}
    </div>
  );
}
