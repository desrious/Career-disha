import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Facebook, Instagram, Linkedin, Youtube, MessageCircle } from 'lucide-react';
import { CmsContact, defaultCmsData } from '../data/cms';

export default function ContactUs({ onBack, contact = defaultCmsData.contact }: { onBack: () => void; contact?: CmsContact }) {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(contact.mapQuery || contact.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section 
      className="contact-section min-h-screen flex flex-col relative overflow-hidden z-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/contactus.png")' }}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-white/10 z-[1] pointer-events-none"></div>
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-[50]">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <img src="/CareerDishaLogo.png" alt="Career Disha Logo" className="h-14 object-contain" />
          <h1 className="text-xl font-bold text-slate-800 ml-2">Contact Us</h1>
        </div>
      </header>

      <div className="content flex-1 max-w-6xl mx-auto w-full p-8 py-12 relative z-[2]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <h2 className="text-3xl font-extrabold text-black mb-4 animate-pulse block pb-1 [text-shadow:_0_0_15px_rgba(0,0,0,0.5)]">Let's Connect</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                We're here to help you navigate your career journey. Reach out to us for expert advice and support.
              </p>
            </motion.div>

            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">Phone</h3>
                    <div className="flex flex-col gap-1">
                      {contact.phones.map((phone) => (
                        <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="text-slate-600 hover:text-green-600 transition-colors">{phone}</a>
                      ))}
                    </div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">Email</h3>
                  <a href={`mailto:${contact.email}`} className="text-slate-600 hover:text-purple-600 transition-colors">{contact.email}</a>
                </div>
              </motion.div>

              {/* Map Add-on */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 mt-6 h-64 w-full"
              >
                <iframe
                  title="ZeOpto Office Location"
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">Corporate Office</h3>
                  <p className="text-slate-600">{contact.address}</p>
                </div>
              </motion.div>

              {/* Social Media Links */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex items-center gap-4 pt-4"
              >
                 <a href={contact.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
                   <Facebook className="w-5 h-5" />
                 </a>
                 <a href={contact.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
                   <Instagram className="w-5 h-5" />
                 </a>
                 <a href={contact.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-blue-700 hover:bg-blue-700 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
                   <Linkedin className="w-5 h-5" />
                 </a>
                 <a href={contact.socials.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
                   <MessageCircle className="w-5 h-5" />
                 </a>
                 <a href={contact.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all hover:-translate-y-1 hover:shadow-md">
                   <Youtube className="w-5 h-5" />
                 </a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
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
    </section>
  );
}
