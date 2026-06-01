import { ArrowLeft, Youtube, BookOpen, CalendarDays, Phone, Mail, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { LOGO_URL } from '../data/constants';
import { CmsInsights, defaultCmsData } from '../data/cms';

interface InsightsProps {
  onBack: () => void;
  insights?: CmsInsights;
  blogSlug?: string;
  onBlogSelect?: (slug: string) => void;
}

function renderBlogContent(content: string) {
  const lines = content.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul key={`list-${blocks.length}`} className="my-6 list-disc space-y-2 pl-6 text-slate-700">
        {listItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }
    if (/^[-*]\s+/.test(trimmed)) {
      listItems.push(trimmed.replace(/^[-*]\s+/, ''));
      return;
    }
    flushList();
    if (trimmed.startsWith('### ')) {
      blocks.push(<h3 key={index} className="mt-8 text-2xl font-extrabold text-slate-950">{trimmed.slice(4)}</h3>);
    } else if (trimmed.startsWith('## ')) {
      blocks.push(<h2 key={index} className="mt-10 text-3xl font-extrabold text-slate-950">{trimmed.slice(3)}</h2>);
    } else if (trimmed.startsWith('# ')) {
      blocks.push(<h2 key={index} className="mt-10 text-3xl font-extrabold text-slate-950">{trimmed.slice(2)}</h2>);
    } else {
      blocks.push(<p key={index} className="my-5 text-lg leading-8 text-slate-700">{trimmed}</p>);
    }
  });
  flushList();

  return blocks.length > 0 ? blocks : <p className="text-lg leading-8 text-slate-700">Blog content will be available soon.</p>;
}

export default function Insights({ onBack, insights = defaultCmsData.insights, blogSlug, onBlogSelect }: InsightsProps) {
  const selectedBlog = blogSlug ? insights.blogs.find((blog) => (blog.slug || blog.id) === blogSlug) : null;

  if (blogSlug) {
    return (
      <div className="min-h-screen bg-surface font-body text-on-surface flex flex-col">
        <nav className="fixed top-0 w-full z-[45] bg-white/85 backdrop-blur-md border-b border-outline-variant/10">
          <div className="flex justify-between items-center w-full px-4 py-3">
            <button onClick={onBack} className="flex items-center gap-2 group">
              <img alt="Career Disha Logo" className="h-10 w-auto object-contain" src={LOGO_URL} referrerPolicy="no-referrer" />
              <span className="text-xl font-extrabold text-blue-700 tracking-tighter font-headline">Career Disha</span>
            </button>
            <button
              onClick={() => onBlogSelect?.('')}
              className="flex items-center gap-2 text-on-surface-variant font-bold hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Insights
            </button>
          </div>
        </nav>

        <main className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 w-full">
          {selectedBlog ? (
            <article className="mx-auto max-w-4xl">
              <div className="mb-8 overflow-hidden rounded-[2rem] bg-slate-200 shadow-xl shadow-slate-900/10">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="aspect-[16/9] w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mb-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
                <CalendarDays className="h-4 w-4" />
                {selectedBlog.date}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-headline text-slate-950 tracking-tight leading-tight">
                {selectedBlog.title}
              </h1>
              <div className="mt-8 border-t border-slate-300 pt-6">
                {renderBlogContent(selectedBlog.content)}
              </div>
            </article>
          ) : (
            <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-xl shadow-slate-900/10">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h1 className="text-3xl font-extrabold text-slate-950">Blog Not Found</h1>
              <p className="mt-3 text-slate-600">This article is unavailable or has been unpublished.</p>
              <button onClick={() => onBlogSelect?.('')} className="mt-8 rounded-full bg-primary px-6 py-3 font-bold text-white hover:bg-primary-container">
                View All Insights
              </button>
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface flex flex-col">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[45] bg-white/80 backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex justify-between items-center w-full px-4 py-3">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="flex items-center gap-2 group">
              <img alt="Careerदिशा Logo" className="h-10 w-auto object-contain" src={LOGO_URL} referrerPolicy="no-referrer" />
              <span className="text-xl font-extrabold text-blue-700 tracking-tighter font-headline">Careerदिशा</span>
            </button>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-on-surface-variant font-bold hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
        </div>
      </nav>

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-headline text-on-surface tracking-tight mb-6">
            <span className="text-primary">{insights.heroTitle}</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
            {insights.heroDescription.replace(/Career Disha/gi, 'Careerदिशा')}
          </p>
        </motion.section>

        {/* YouTube Section */}
        <section className="mb-24 relative">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                <Youtube className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-extrabold font-headline">YouTube Videos</h2>
            </div>
          </div>

          {insights.videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {insights.videos.map((video, index) => (
                <motion.article
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm"
                >
                  <div className="aspect-video bg-slate-900">
                    <iframe
                      title={video.title}
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900">{video.title}</h3>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Youtube className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-2">Coming Soon</h3>
              <p className="text-slate-500 max-w-md">Our curated video insights and expert mentorship sessions will be available here shortly.</p>
            </div>
          )}
        </section>

        {/* Blogs Section Placeholder */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-7 h-7" />
            </div>
            <h2 className="text-3xl font-extrabold font-headline">Latest Blogs</h2>
          </div>

          {insights.blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {insights.blogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-[2rem] border border-outline-variant/10 flex flex-col overflow-hidden hover:shadow-xl transition-all group"
                >
                  <button
                    type="button"
                    onClick={() => onBlogSelect?.(blog.slug || blog.id)}
                    className="flex h-full flex-col text-left focus:outline-none focus:ring-4 focus:ring-primary/25"
                    aria-label={`Read blog: ${blog.title}`}
                  >
                    <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
                        <CalendarDays className="h-4 w-4" />
                        {blog.date}
                      </span>
                      <h3 className="text-xl font-bold leading-tight text-slate-950 group-hover:text-primary transition-colors">{blog.title}</h3>
                    </div>
                  </button>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <BookOpen className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-2">Coming Soon</h3>
              <p className="text-slate-500 max-w-md">More blogs coming soon....</p>
            </div>
          )}
        </section>

        {/* Contact */}
        <section className="bg-slate-900 text-white p-6 sm:p-8 md:p-12 lg:p-20 rounded-[2rem] sm:rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 sm:mb-8 relative z-10">Get in Touch</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-12 relative z-10">
            Discover how Careerदिशा, powered by ZeOpto, can guide you toward the right career path and help you unlock your true potential.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8 relative z-10">
            <div className="flex items-center justify-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10">
              <Phone className="w-6 h-6 text-primary" />
              <span className="font-bold">+91-9289191164</span>
            </div>
            <a href="mailto:hr@zeopto.com" className="flex items-center justify-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <Mail className="w-6 h-6 text-secondary" />
              <span className="font-bold">hr@zeopto.com</span>
            </a>
            <a href="https://ZeOpto.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group">
              <Globe className="w-6 h-6 text-tertiary group-hover:rotate-12 transition-transform" />
              <span className="font-bold">Visit ZeOpto</span>
            </a>
          </div>
          <p className="mt-12 text-white/40 text-sm font-medium tracking-widest">
            Careerदिशा empowers individuals with the right direction, backed by ZeOpto’s expertise and commitment to excellence.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 py-12 px-8 w-full">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-xs font-medium tracking-widest">
            © 2026 Careerदिशा — Powered by ZeOpto
          </p>
        </div>
      </footer>
    </div>
  );
}


