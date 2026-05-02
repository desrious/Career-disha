import { useEffect, useMemo, useRef, useState } from 'react';
import { LogOut, Plus, Save, Trash2, Upload } from 'lucide-react';
import {
  ADMIN_SESSION_STORAGE_KEY,
  CmsCounsellor,
  CmsData,
  CmsInsightBlog,
  CmsInsightVideo,
  CmsTestimonial,
  ExpertAdviceInquiry,
  SupabaseCmsError,
  SupabaseConnectionStatus,
  checkSupabaseConnection,
  defaultCmsData,
  deleteAllExpertAdviceInquiries,
  deleteExpertAdviceInquiry,
  loginAdmin,
  loadExpertAdviceInquiries,
  logoutAdmin,
  saveCmsData,
  verifyAdminSession,
} from '../data/cms';

type AdminProps = {
  data: CmsData;
  onDataChange: (data: CmsData) => void;
};

type SectionKey = 'offer' | 'expert' | 'insights' | 'testimonials' | 'counsellors' | 'contact';

const sections: { key: SectionKey; label: string }[] = [
  { key: 'offer', label: 'Offer' },
  { key: 'expert', label: 'Expert advice inquiry' },
  { key: 'insights', label: 'Insights' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'counsellors', label: 'Counsellors' },
  { key: 'contact', label: 'Contact Info' },
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
  excerpt: 'Add a short summary for this insight.',
  date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
  category: 'Career Advice',
  image: '/CareerDishaLogo.png',
  link: 'https://ZeOpto.com/',
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

function ImageInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const uploadId = useMemo(() => crypto.randomUUID(), []);

  return (
    <div className="space-y-2">
      <Field label="Image URL" value={value} onChange={onChange} />
      <label
        htmlFor={uploadId}
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        <Upload className="h-4 w-4" />
        Upload Image
      </label>
      <input
        id={uploadId}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => onChange(String(reader.result));
          reader.readAsDataURL(file);
        }}
      />
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

export default function Admin({ data, onDataChange }: AdminProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [active, setActive] = useState<SectionKey>('offer');
  const [draft, setDraft] = useState<CmsData>(data);
  const latestDraftRef = useRef<CmsData>(data);
  const [inquiries, setInquiries] = useState<ExpertAdviceInquiry[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeletingInquiries, setIsDeletingInquiries] = useState(false);
  const [isRefreshingInquiries, setIsRefreshingInquiries] = useState(false);
  const [deletingInquiryId, setDeletingInquiryId] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [message, setMessage] = useState('');
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

  const save = async () => {
    const latestDraft = latestDraftRef.current;
    setIsSaving(true);
    try {
      await saveCmsData(latestDraft);
      onDataChange(latestDraft);
      setIsDirty(false);
      setConnection({ frontend: true, backend: true, message: 'Supabase connected' });
      setMessage('Changes saved to Supabase and published.');
    } catch (error) {
      if (error instanceof SupabaseCmsError && error.status === 404) {
        setConnection({ frontend: true, backend: false, message: 'Tables missing' });
        setMessage('Saved locally, but Supabase tables are missing. Run the SQL setup in Supabase, then save again.');
      } else {
        setConnection({ frontend: true, backend: false, message: 'Backend unavailable' });
        setMessage('Saved locally, but Supabase rejected the update. Check table setup and RLS policies.');
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
          {active === 'offer' && (
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex items-center gap-3 rounded-lg bg-slate-50 p-3 text-sm font-bold">
                <input
                  type="checkbox"
                  checked={draft.offer.visible}
                  onChange={(event) => updateDraft({ ...draft, offer: { ...draft.offer, visible: event.target.checked } })}
                />
                Show offer on website
              </label>
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
                    <h2 className="text-xl font-extrabold">Latest Blogs</h2>
                    <p className="text-sm text-slate-500">Manage article cards, images, categories, dates, and read-more links.</p>
                  </div>
                  <button onClick={() => updateDraft({ ...draft, insights: { ...draft.insights, blogs: [...draft.insights.blogs, emptyInsightBlog()] } })} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-container">
                    <Plus className="h-4 w-4" />
                    Add Blog
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
                      <Field label="Category" value={blog.category} onChange={(category) => updateDraft({ ...draft, insights: { ...draft.insights, blogs: draft.insights.blogs.map((item) => item.id === blog.id ? { ...item, category } : item) } })} />
                      <Field label="Date" value={blog.date} onChange={(date) => updateDraft({ ...draft, insights: { ...draft.insights, blogs: draft.insights.blogs.map((item) => item.id === blog.id ? { ...item, date } : item) } })} />
                      <Field label="Read More Link" value={blog.link} onChange={(link) => updateDraft({ ...draft, insights: { ...draft.insights, blogs: draft.insights.blogs.map((item) => item.id === blog.id ? { ...item, link } : item) } })} />
                      <ImageInput value={blog.image} onChange={(image) => updateDraft({ ...draft, insights: { ...draft.insights, blogs: draft.insights.blogs.map((item) => item.id === blog.id ? { ...item, image } : item) } })} />
                      <div className="md:col-span-2">
                        <TextArea label="Excerpt" value={blog.excerpt} onChange={(excerpt) => updateDraft({ ...draft, insights: { ...draft.insights, blogs: draft.insights.blogs.map((item) => item.id === blog.id ? { ...item, excerpt } : item) } })} />
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
                  <ImageInput value={item.image} onChange={(image) => updateDraft({ ...draft, testimonials: draft.testimonials.map((t) => t.id === item.id ? { ...t, image } : t) })} />
                  <div className="md:col-span-2">
                    <TextArea label="Quote" value={item.quote} onChange={(quote) => updateDraft({ ...draft, testimonials: draft.testimonials.map((t) => t.id === item.id ? { ...t, quote } : t) })} />
                  </div>
                </div>
              )}
            />
          )}

          {active === 'counsellors' && (
            <CollectionEditor
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
                  <ImageInput value={item.image} onChange={(image) => updateDraft({ ...draft, counsellors: draft.counsellors.map((c) => c.id === item.id ? { ...c, image } : c) })} />
                  <div className="md:col-span-2">
                    <TextArea label="Quote" value={item.quote} onChange={(quote) => updateDraft({ ...draft, counsellors: draft.counsellors.map((c) => c.id === item.id ? { ...c, quote } : c) })} />
                    <TextArea label="Bullets (one per line)" rows={5} value={item.bullets.join('\n')} onChange={(value) => updateDraft({ ...draft, counsellors: draft.counsellors.map((c) => c.id === item.id ? { ...c, bullets: value.split('\n').filter(Boolean) } : c) })} />
                  </div>
                </div>
              )}
            />
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

function CollectionEditor<T extends { id: string; name: string }>({
  items,
  onAdd,
  onRemove,
  render,
}: {
  items: T[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  render: (item: T) => React.ReactNode;
}) {
  return (
    <div className="space-y-5">
      <button onClick={onAdd} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-container">
        <Plus className="h-4 w-4" />
        Add Item
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
