import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { LOGO_URL } from '../data/constants';

interface RefundPageProps {
  onBack: () => void;
}

export default function RefundPage({ onBack }: RefundPageProps) {
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

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 mb-8">
          <img src={LOGO_URL} alt="Careerदिशा Logo" className="h-12 w-auto mb-6" />
          
          <h1 className="text-3xl font-headline font-bold text-slate-800 mb-8">Refund & Cancellation Policy</h1>
          
          <div className="text-slate-600 space-y-6">
            <p className="leading-relaxed">
              At Career Disha, we strive to provide quality counselling and assessment services. Please read our refund and cancellation policy carefully before making any payment.
            </p>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Cancellation Policy</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li className="leading-relaxed">Users may request cancellation of counselling sessions or workshops at least 24 hours prior to the scheduled session.</li>
                <li className="leading-relaxed">Cancellation requests must be sent via registered email or official communication channels.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. Refund Policy</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li className="leading-relaxed">Refunds are applicable only in cases where services have not been delivered due to technical or operational issues from our end.</li>
                <li className="leading-relaxed">Once a psychometric assessment/report has been generated or a counselling session has been conducted, no refund shall be applicable.</li>
                <li className="leading-relaxed">Approved refunds, if any, will be processed within 7–10 working days to the original payment method.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Non-Refundable Services</h2>
              <p className="leading-relaxed">The following services are non-refundable:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li className="leading-relaxed">Completed assessments</li>
                <li className="leading-relaxed">Downloaded reports</li>
                <li className="leading-relaxed">Attended workshops/webinars</li>
                <li className="leading-relaxed">Career counselling sessions already conducted</li>
                <li className="leading-relaxed">Customized professional services</li>
              </ul>
            </section>
          </div>
        </div>

      </div>
    </div>
  );
}