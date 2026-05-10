/** LandingFooter — Main landing page footer with social links and newsletter. */
import { Send, Globe, Users, Share2 } from 'lucide-react';
import { LOGO_URL, COPYRIGHT_TEXT } from '../../data/constants';

type ViewType = 'landing' | 'about' | 'insights' | 'contact-us' | 'high-school' | 'plus-two' | 'graduates' | 'working-professional' | 'terms' | 'privacy';

interface LandingFooterProps {
  setView: (view: ViewType) => void;
}

export default function LandingFooter({ setView }: LandingFooterProps) {
  return (
    <footer className="bg-slate-900 w-full py-8 sm:py-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <span className="font-headline font-bold text-white text-xl flex items-center gap-2">
            <img alt="Careerदिशा Logo" className="h-10 md:h-12 w-auto brightness-0 invert" src={LOGO_URL} referrerPolicy="no-referrer" />
            Careerदिशा
          </span>
          <p className="text-slate-400 text-sm leading-relaxed mb-1">C2, Block-C, 2nd floor, Sector 2, Noida, Uttar Pradesh 201301</p>
          <p className="text-slate-400 text-sm leading-relaxed">Delivering expert career counselling and career planning to guide the next generation in choosing the right career.</p>
          <div className="flex items-center justify-start gap-3 pt-4 flex-wrap">
            <a href="https://www.facebook.com/ZeOptoitservices" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 bg-slate-800 rounded-full shadow-sm border border-slate-700 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://www.instagram.com/ZeOptoitservices/?igsh=MTBkYThwNG8wY2F5ZA%3D%3D#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 bg-slate-800 rounded-full shadow-sm border border-slate-700 flex items-center justify-center text-pink-400 hover:bg-pink-600 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </a>
            <a href="https://www.linkedin.com/company/ZeOpto-it-services/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 bg-slate-800 rounded-full shadow-sm border border-slate-700 flex items-center justify-center text-blue-400 hover:bg-blue-700 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="https://www.whatsapp.com/channel/0029Vb5aVHkDzgT8eqtO4p3n" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 bg-slate-800 rounded-full shadow-sm border border-slate-700 flex items-center justify-center text-green-400 hover:bg-green-500 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path></svg>
            </a>
            <a href="https://youtube.com/@ZeOpto?si=k0Oijwu3wG1AhtNR" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 bg-slate-800 rounded-full shadow-sm border border-slate-700 flex items-center justify-center text-red-500 hover:bg-red-600 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-xs uppercase tracking-widest font-bold text-slate-100">Explore</h4>
          <ul className="space-y-2">
            <li><a href="#testimonials" onClick={() => setView('landing')} className="block text-slate-400 text-sm hover:text-primary transition-colors text-left w-full">Testimonials</a></li>
            <li><button onClick={() => setView('insights')} className="text-slate-400 text-sm hover:text-primary transition-colors text-left w-full">Resources</button></li>
            <li><button onClick={() => setView('insights')} className="text-slate-400 text-sm hover:text-primary transition-colors text-left w-full">Career Blog</button></li>
            <li><button onClick={() => setView('contact-us')} className="text-slate-400 text-sm hover:text-primary transition-colors text-left w-full">Support</button></li>
            <li><button onClick={() => setView('contact-us')} className="text-slate-400 text-sm hover:text-primary transition-colors text-left w-full">Contact Us</button></li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-xs uppercase tracking-widest font-bold text-slate-100">Legal</h4>
          <ul className="space-y-2">
            <li><button onClick={() => setView('privacy')} className="text-slate-400 text-sm hover:text-primary transition-colors text-left w-full">Privacy and Policy</button></li>
            <li><button onClick={() => setView('terms')} className="text-slate-400 text-sm hover:text-primary transition-colors text-left w-full">Terms and conditions</button></li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-xs uppercase tracking-widest font-bold text-slate-100">Newsletter</h4>
          <div className="flex gap-2">
            <input className="bg-slate-800 border-none rounded-lg p-2 text-sm w-full text-white placeholder-slate-400 focus:ring-2 focus:ring-primary outline-none" placeholder="Email address" type="email" />
            <button className="bg-primary text-white p-2 rounded-lg hover:opacity-90 transition-opacity"><Send className="w-5 h-5" /></button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs tracking-widest text-slate-500">{COPYRIGHT_TEXT}</p>
        <div className="flex gap-6">
          <Globe className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" onClick={() => window.open('https://zeopto.com/', '_blank')} />
          <Users className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" onClick={() => window.open('https://linkedin.com/company/zeopto', '_blank')} />
          <Share2 className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" onClick={() => { if (navigator.share) { navigator.share({ title: 'Careerदिशा', text: 'Check out Careerदिशा - AI-powered career guidance!', url: window.location.href }); } }} />
        </div>
      </div>
    </footer>
  );
}
