/**
 * Header — Fixed top navigation bar with desktop nav links, Programs dropdown,
 * Expert Advice CTA, and animated mobile menu drawer.
 */
import { Phone, Mail, Globe, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LOGO_URL } from '../../data/constants';

type ViewType = 'landing' | 'about' | 'insights' | 'contact-us' | 'partner' | 'brochure' | 'high-school' | 'plus-two' | 'graduates' | 'working-professional' | 'terms' | 'privacy';

interface HeaderProps {
  setView: (view: ViewType) => void;
  setShowInquiryModal: (show: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  mobileProgramsOpen: boolean;
  setMobileProgramsOpen: (open: boolean) => void;
}

export default function Header({
  setView,
  setShowInquiryModal,
  mobileMenuOpen,
  setMobileMenuOpen,
  mobileProgramsOpen,
  setMobileProgramsOpen,
}: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 flex flex-col bg-slate-50/80 backdrop-blur-md border-b border-slate-100">
      {/* Top Info Bar */}
      <div className="w-full bg-slate-900 text-white py-1.5 px-3 sm:px-6 flex justify-center md:justify-end gap-3 sm:gap-6 text-[9px] sm:text-xs font-semibold tracking-wider">
        <a href="tel:+919289191164" className="flex items-center gap-1 sm:gap-2 hover:text-primary transition-colors">
          <Phone size={12} /> <span><span className="hidden sm:inline">+91-</span>9289191164</span>
        </a>
        <a href="mailto:hr@zeopto.com" className="hidden sm:flex items-center gap-2 hover:text-primary transition-colors">
          <Mail size={12} /> hr@zeopto.com
        </a>
        <a href="https://ZeOpto.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 sm:gap-2 hover:text-primary transition-colors">
          <Globe size={12} /> Visit ZeOpto
        </a>
      </div>
      <nav className="flex justify-between items-center px-3 sm:px-4 h-16 md:h-24 max-w-full">
        <div className="flex items-center gap-2">
          <img
            alt="Careerदिशा Logo"
            className="h-10 sm:h-14 md:h-20 w-auto object-contain"
            src={LOGO_URL}
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="hidden lg:flex flex-1 justify-center items-center gap-6 xl:gap-10">
          <button onClick={() => setView('landing')} className="text-primary border-b-2 border-primary font-headline tracking-tight font-semibold hover:opacity-80 transition-opacity duration-300 cursor-pointer">Home</button>
          <button
            onClick={() => setView('about')}
            className="text-on-surface-variant hover:text-primary font-headline tracking-tight font-semibold hover:opacity-80 transition-opacity duration-300"
          >
            About Us
          </button>
          <div className="relative group py-4">
            <span className="text-on-surface-variant hover:text-primary font-headline tracking-tight font-semibold hover:opacity-80 transition-opacity duration-300 cursor-pointer flex items-center gap-1">
              Programs
            </span>
            <div className="absolute left-0 top-full w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
              <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden flex flex-col py-2">
                <button onClick={() => setView('high-school')} className="text-left px-5 py-3 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors">Career Counselling for High School (9th & 10th)</button>
                <button onClick={() => setView('plus-two')} className="text-left px-5 py-3 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors">Career Counselling for Plus-two(11th & 12th)</button>
                <button onClick={() => setView('graduates')} className="text-left px-5 py-3 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors">Career Counselling for Graduates</button>
                <button onClick={() => setView('working-professional')} className="text-left px-5 py-3 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors">Career Counselling for Working Professional</button>
              </div>
            </div>
          </div>
          <button
            onClick={() => setView('insights')}
            className="text-on-surface-variant hover:text-primary font-headline tracking-tight font-semibold hover:opacity-80 transition-opacity duration-300"
          >
            Insights
          </button>

          <button
            onClick={() => setView('brochure')}
            className="text-on-surface-variant hover:text-primary font-headline tracking-tight font-semibold hover:opacity-80 transition-opacity duration-300"
          >
            Download Brochure
          </button>
          <button
            onClick={() => setView('partner')}
            className="text-on-surface-variant hover:text-primary font-headline tracking-tight font-semibold hover:opacity-80 transition-opacity duration-300"
          >
            Partner With Us
          </button>
          <button
            onClick={() => setView('contact-us')}
            className="text-on-surface-variant hover:text-primary font-headline tracking-tight font-semibold hover:opacity-80 transition-opacity duration-300"
          >
            Contact Us
          </button>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setShowInquiryModal(true)}
            className="group hidden sm:flex h-10 items-center justify-center gap-2 rounded-full bg-[#fba70c] pl-3 pr-4 transition-all duration-300 ease-in-out hover:bg-[#d97706] hover:pl-2 text-white font-semibold font-headline animate-elegant-zoom shadow-md hover:shadow-lg active:bg-[#b45309]"
          >
            <span className="rounded-full bg-white p-1 text-sm transition-colors duration-300 group-hover:bg-white flex items-center justify-center">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="-translate-x-[200%] text-[0px] transition-all duration-300 group-hover:translate-x-0 group-hover:text-lg group-hover:text-[#d97706] group-active:-rotate-45" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
            <span>Expert Advice</span>
          </button>
          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>
      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white border-t border-slate-100"
          >
            <div className="flex flex-col py-4 px-4 gap-1">
              <button onClick={() => { setView('landing'); setMobileMenuOpen(false); }} className="text-left px-4 py-3 text-primary font-headline font-semibold rounded-lg bg-primary/5">Home</button>
              <button onClick={() => { setView('about'); setMobileMenuOpen(false); }} className="text-left px-4 py-3 text-on-surface-variant font-headline font-semibold rounded-lg hover:bg-slate-50 transition-colors">About Us</button>
              <div>
                <button onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)} className="w-full text-left px-4 py-3 text-on-surface-variant font-headline font-semibold rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between">
                  Programs
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileProgramsOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileProgramsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-4"
                    >
                      <button onClick={() => { setView('high-school'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">High School (9th & 10th)</button>
                      <button onClick={() => { setView('plus-two'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">Plus-two (11th & 12th)</button>
                      <button onClick={() => { setView('graduates'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">Graduates</button>
                      <button onClick={() => { setView('working-professional'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">Working Professional</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button onClick={() => { setView('insights'); setMobileMenuOpen(false); }} className="text-left px-4 py-3 text-on-surface-variant font-headline font-semibold rounded-lg hover:bg-slate-50 transition-colors">Insights</button>
              <button onClick={() => { setView('brochure'); setMobileMenuOpen(false); }} className="text-left px-4 py-3 text-on-surface-variant font-headline font-semibold rounded-lg hover:bg-slate-50 transition-colors">Download Brochure</button>
              <button onClick={() => { setView('partner'); setMobileMenuOpen(false); }} className="text-left px-4 py-3 text-on-surface-variant font-headline font-semibold rounded-lg hover:bg-slate-50 transition-colors">Partner With Us</button>
              <button onClick={() => { setView('contact-us'); setMobileMenuOpen(false); }} className="text-left px-4 py-3 text-on-surface-variant font-headline font-semibold rounded-lg hover:bg-slate-50 transition-colors">Contact Us</button>
              <button
                onClick={() => { setShowInquiryModal(true); setMobileMenuOpen(false); }}
                className="mt-2 w-full py-3 bg-[#fba70c] text-white font-bold font-headline rounded-full hover:bg-[#d97706] transition-colors"
              >
                Expert Advice
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
