import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Clock, Download, X } from 'lucide-react';
import { CmsBrochure, saveBrochureInquiry } from '../data/cms';
import { LOGO_URL } from '../data/constants';
import PhoneInput from './shared/PhoneInput';
import { getPhoneDetails } from '../utils/phoneUtils';

interface BrochurePageProps {
  onBack: () => void;
  brochure?: CmsBrochure;
}

export default function BrochurePage({ onBack, brochure }: BrochurePageProps) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    query: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleDownloadClick = () => {
    setShowModal(true);
  };

  const handleDownloadStart = async () => {
    if (!brochure?.pdfUrl) return;

    try {
      if (brochure.pdfUrl.startsWith('data:')) {
        // Direct download for base64 data URIs
        const link = document.createElement('a');
        link.href = brochure.pdfUrl;
        link.download = 'Careerdisha Brochure.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }

      // Approach: Fetch as a Blob to enforce the download universally 
      // without opening in a new tab or redirecting
      const response = await fetch(brochure.pdfUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Careerdisha Brochure.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup URL object
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 150);
      
    } catch (err) {
      console.error('Failed to download brochure via blob, using fallback', err);
      // Fallback in case of CORS restrictions
      const link = document.createElement('a');
      link.href = brochure.pdfUrl;
      link.download = 'Careerdisha Brochure.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!formData.name.trim() || !formData.email.trim() || !formData.mobile.trim()) {
      setFormError('Please fill all required fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    const { isValid, countryCode, dialCode, countryName } = getPhoneDetails(formData.mobile);
    if (!isPhoneValid || !isValid) {
      setFormError('Please enter a valid mobile number for the selected country.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await saveBrochureInquiry({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        countrycode: countryCode,
        dialcode: dialCode,
        countryname: countryName,
        query: formData.query
      });
      setShowModal(false);
      handleDownloadStart();
    } catch (err) {
      console.error('Brochure enquiry submission failed.', err);
      setFormError('Unable to process your request right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!brochure?.content && !brochure?.pdfUrl) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center font-sans relative pt-20">
        
        {/* Navigation Layer */}
        <div className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-50 shadow-sm">
          <div className="flex items-center gap-3 md:gap-4">
            <img
              alt="Career Disha Logo"
              className="h-10 w-auto object-contain cursor-pointer transition-transform hover:scale-105 shrink-0"
              src={LOGO_URL}
              onClick={onBack}
              referrerPolicy="no-referrer"
            />
            <span className="hidden sm:block text-slate-800 font-semibold text-sm md:text-base border-l-2 border-slate-300 pl-3 md:pl-4">Brochure</span>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-700 hover:text-primary font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Home</span>
          </button>
        </div>

        <div className="mt-8 bg-white p-10 md:p-16 rounded-2xl shadow-xl shadow-slate-200/50 max-w-2xl w-full border border-slate-100 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8 relative">
            <BookOpen className="text-primary w-12 h-12" strokeWidth={1.5} />
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-slate-100">
              <Clock className="text-amber-500 w-6 h-6" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-slate-900 mb-5 tracking-tight">
            Brochure Coming Soon
          </h1>
          
          <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
            We are currently updating our comprehensive program brochure to ensure you receive the most detailed and up-to-date information about our offerings.
          </p>

          <div className="flex items-center gap-3 text-slate-700 bg-slate-50 px-6 py-4 rounded-xl border border-slate-100 w-full justify-center">
            <span className="font-medium">It will be available for download soon. Please check back later.</span>
          </div>
          
          <button 
            onClick={onBack}
            className="mt-10 px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 sm:p-12 font-sans relative pt-24 sm:pt-28">
      
      {/* Navigation Layer */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-50 shadow-sm">
        <div className="flex items-center gap-3 md:gap-4">
          <img
            alt="Career Disha Logo"
            className="h-10 w-auto object-contain cursor-pointer transition-transform hover:scale-105 shrink-0"
            src={LOGO_URL}
            onClick={onBack}
            referrerPolicy="no-referrer"
          />
          <span className="hidden sm:block text-slate-800 font-semibold text-sm md:text-base border-l-2 border-slate-300 pl-3 md:pl-4">Brochure</span>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-700 hover:text-primary font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back to Home</span>
        </button>
      </div>

      <div className="bg-white p-6 sm:p-12 rounded-2xl shadow-xl shadow-slate-200/50 max-w-5xl w-full border border-slate-100 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {brochure.content && (
          <div 
            className="prose max-w-none w-full mb-8"
            dangerouslySetInnerHTML={{ __html: brochure.content }}
          />
        )}

        {brochure.pdfUrl && (
          <div className="w-full h-auto min-h-[400px] md:h-[800px] border border-slate-200 rounded-xl overflow-hidden bg-slate-100/50 relative">
            {/* Desktop View (object tags are reliable for desktop PDFs) */}
            <object 
              data={`${brochure.pdfUrl}#toolbar=0&navpanes=0`} 
              type="application/pdf"
              className="w-full h-full hidden md:block"
            >
              <div className="flex flex-col items-center justify-center p-8 text-center bg-white h-[400px]">
                <BookOpen size={48} className="mb-4 text-slate-300" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Preview Unavailable</h3>
                <p className="text-slate-600 mb-6 max-w-sm">
                  Your browser requires a PDF plugin to view this inline.
                </p>
                <button 
                  onClick={handleDownloadClick}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all shadow-md active:scale-95"
                >
                  <Download size={20} />
                  Download Brochure
                </button>
              </div>
            </object>

            {/* Mobile View (Bypasses iframe limitations completely) */}
            <div className="w-full h-auto flex flex-col items-center justify-center py-16 px-6 text-center md:hidden bg-white">
                <BookOpen size={56} className="mb-5 text-slate-300" />
                <h3 className="text-2xl font-semibold text-slate-800 mb-3">Brochure Ready</h3>
                <p className="text-slate-600 mb-8 max-w-sm text-base leading-relaxed">
                  Mobile browsers do not support high-quality PDF previews inline. Download the brochure directly to your device for the best reading experience.
                </p>
                <button 
                  onClick={handleDownloadClick}
                  className="flex items-center justify-center gap-2 w-full max-w-[280px] px-8 py-4 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all shadow-md active:scale-95 text-lg"
                >
                  <Download size={20} />
                  Download PDF Now
                </button>
            </div>
          </div>
        )}
        
        {brochure.pdfUrl && (
          <div className="mt-8 flex justify-center border-t border-slate-100 pt-8">
            <button 
              onClick={handleDownloadClick}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Download size={20} />
              Download Brochure
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-xl font-headline font-bold text-slate-900">Download Brochure</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number *</label>
                <PhoneInput 
                  value={formData.mobile}
                  onChange={(val) => setFormData({...formData, mobile: val || ''})}
                  onValidationChange={setIsPhoneValid}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Query (Optional)</label>
                <textarea 
                  value={formData.query}
                  onChange={(e) => setFormData({...formData, query: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all min-h-[80px] resize-y"
                  placeholder="Any questions..."
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting || !isPhoneValid}
                className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    <span>Download PDF</span>
                  </>
                )}
              </button>
              {formError && <p className="text-sm font-semibold text-red-600" role="alert">{formError}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
