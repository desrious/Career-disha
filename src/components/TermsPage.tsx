import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { LOGO_URL } from '../data/constants';

interface TermsPageProps {
  onBack: () => void;
}

export default function TermsPage({ onBack }: TermsPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <img src={LOGO_URL} alt="Careerदिशा Logo" className="h-12 w-auto mb-6" />
          <h1 className="text-3xl font-headline font-bold text-slate-800 mb-8">Terms of Service (TOS)</h1>
          
          <div className="text-slate-600 space-y-6">
            <p className="leading-relaxed">
              Welcome to Career Disha. By accessing our website, services, assessments, counselling programs, workshops, or making payments through our online payment gateway powered by Razorpay, you agree to comply with and be bound by the following Terms of Service.
            </p>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Services</h2>
              <p className="leading-relaxed">
                Career Disha provides career counselling, psychometric assessments, mentoring programs, workshops, professional guidance, and related educational services for students and professionals.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. Payments</h2>
              <p className="leading-relaxed">
                All payments made on our website are securely processed through Razorpay payment gateway. Users are required to provide accurate billing and contact information while making transactions.
              </p>
              <p className="leading-relaxed mt-2">
                Career Disha does not store any sensitive banking information such as debit/credit card details, CVV, or internet banking credentials.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. User Responsibilities</h2>
              <p className="leading-relaxed">Users agree:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li className="leading-relaxed">To provide authentic and accurate information.</li>
                <li className="leading-relaxed">Not to misuse the website or services.</li>
                <li className="leading-relaxed">Not to reproduce or distribute assessment reports, content, or materials without written permission.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. Intellectual Property</h2>
              <p className="leading-relaxed">
                All website content, branding, assessments, reports, graphics, and counselling methodologies are the intellectual property of Career Disha and may not be copied or reused without authorization.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">5. Limitation of Liability</h2>
              <p className="leading-relaxed">
                Career Disha provides guidance and recommendations based on assessments, AI-driven analysis, and expert counselling. Final academic or career decisions remain the sole responsibility of the user.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">6. Modifications</h2>
              <p className="leading-relaxed">
                Career Disha reserves the right to modify services, pricing, policies, or terms without prior notice.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
