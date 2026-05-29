import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, Send, Settings, User, X } from 'lucide-react';
import { saveExpertAdviceInquiry } from '../data/cms';
import PhoneInput from './shared/PhoneInput';
import { getPhoneDetails } from '../utils/phoneUtils';

interface InquiryModalProps {
  onClose: () => void;
  heading?: string;
  services?: string[];
  successMessage?: string;
}

const InquiryModal: React.FC<InquiryModalProps> = ({
  onClose,
  heading = 'Expert Advice',
  services = ['Career Counselling', 'Become a Partner'],
  successMessage = 'An expert will get in contact with you shortly.',
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    service: '',
    message: '',
  });
  const [formError, setFormError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneChange = (value: string | undefined) => {
    setFormData({ ...formData, mobile: value || '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.mobile.trim() || !formData.service.trim()) {
      setFormError('Please fill all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    const { isValid, countryCode, dialCode, countryName } = getPhoneDetails(formData.mobile);
    
    if (!isValid) {
      setFormError('Please enter a valid phone number for the selected country.');
      return;
    }

    setIsSubmitting(true);
    try {
      await saveExpertAdviceInquiry({
        ...formData,
        countrycode: countryCode,
        dialcode: dialCode,
        countryname: countryName,
      });
      alert(successMessage);
      onClose();
    } catch (error) {
      console.error('Expert advice enquiry submission failed.', error);
      setFormError('Unable to send your enquiry right now. Please try again shortly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg lg:max-w-4xl overflow-hidden relative flex flex-col lg:flex-row">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-800 bg-white rounded-full p-1 shadow-md"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="hidden lg:block lg:w-1/2 bg-gray-100">
          <img
            src="images/about-service.jpg"
            alt="Inquiry"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop';
            }}
          />
        </div>

        <div className="w-full lg:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
          <h4 className="text-2xl font-bold mb-6 text-center text-slate-800">{heading}</h4>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex bg-slate-50 border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
              <div className="px-4 py-3 bg-white border-r border-slate-200 flex items-center justify-center text-slate-400">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent outline-none"
                placeholder="Your Name / Company Name*"
                required
              />
            </div>

            <div className="flex bg-slate-50 border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
              <div className="px-4 py-3 bg-white border-r border-slate-200 flex items-center justify-center text-slate-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent outline-none"
                placeholder="Email Address*"
                required
              />
            </div>

            <PhoneInput 
              value={formData.mobile} 
              onChange={handlePhoneChange} 
              onValidationChange={setIsPhoneValid}
              required 
            />

            <div className="flex bg-slate-50 border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
              <div className="px-4 py-3 bg-white border-r border-slate-200 flex items-center justify-center text-slate-400">
                <Settings className="w-5 h-5" />
              </div>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent outline-none"
                required
              >
                <option value="" disabled>Select a Service*</option>
                {services.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div className="flex bg-slate-50 border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
              <div className="px-4 py-3 bg-white border-r border-slate-200 flex items-center justify-center text-slate-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent outline-none resize-none"
                placeholder="Your Message (optional)"
                rows={3}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !isPhoneValid}
                className="w-full text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-50"
                style={{ backgroundColor: '#fba70c' }}
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </div>
            {formError && <p className="text-sm font-semibold text-red-600" role="alert">{formError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
