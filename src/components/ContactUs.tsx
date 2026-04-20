import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Facebook, Instagram, Linkedin, Youtube, MessageCircle } from 'lucide-react';

export default function ContactUs({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <h1 className="text-xl font-bold text-slate-800">Contact Us</h1>
        </div>
      </header>

      <div className="flex-1 max-w-6xl mx-auto w-full p-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Let's Connect</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                We're here to help you navigate your career journey. Reach out to us for expert advice and support.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">Phone</h3>
                  <a href="tel:+919953280036" className="text-slate-600 hover:text-green-600 transition-colors">+91-9953280036</a>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">Email</h3>
                  <a href="mailto:hr@ZeOpto.com" className="text-slate-600 hover:text-purple-600 transition-colors">hr@ZeOpto.com</a>
                </div>
              </div>

              {/* Map Add-on */}
              <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 mt-6 h-64 w-full">
                <iframe
                  title="ZeOpto Office Location"
                  src="https://maps.google.com/maps?q=ZeOpto%20IT%20Services,%20Sector%204,%20Noida&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">Corporate Office</h3>
                  <p className="text-slate-600">Offices B-02, A-28, Near Noida Sector 16 Metro Station, Block A, Sector 4, Noida, UP-201301</p>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex items-center gap-4 pt-4">
                 <a href="https://www.facebook.com/ZeOptoitservices" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
                   <Facebook className="w-5 h-5" />
                 </a>
                 <a href="https://www.instagram.com/ZeOptoitservices/?igsh=MTBkYThwNG8wY2F5ZA%3D%3D#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
                   <Instagram className="w-5 h-5" />
                 </a>
                 <a href="https://www.linkedin.com/company/ZeOpto-it-services/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-blue-700 hover:bg-blue-700 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
                   <Linkedin className="w-5 h-5" />
                 </a>
                 <a href="https://www.whatsapp.com/channel/0029Vb5aVHkDzgT8eqtO4p3n" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
                   <MessageCircle className="w-5 h-5" />
                 </a>
                 <a href="https://youtube.com/@ZeOpto?si=k0Oijwu3wG1AhtNR" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
                   <Youtube className="w-5 h-5" />
                 </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-800">Send Us a Message</h2>
            </div>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Your Message</label>
                <textarea 
                  rows={4}
                  placeholder="How can we help you today?"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white resize-none"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/30 mt-4"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
