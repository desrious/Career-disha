/** Visionaries — Founder profiles section using ProfileCard. */
import { useState } from 'react';
import ProfileCard from '../ProfileCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageSquare, User, Send, X } from 'lucide-react';
import PhoneInput from '../shared/PhoneInput';
import { getPhoneDetails } from '../../utils/phoneUtils';
import { saveExpertAdviceInquiry } from '../../data/cms';

type ViewType = 'landing' | 'about' | 'insights' | 'contact-us' | 'high-school' | 'plus-two' | 'graduates' | 'working-professional';

interface VisionariesProps {
  setView: (view: ViewType) => void;
}

export default function Visionaries({ setView }: VisionariesProps) {
  const [selectedFounder, setSelectedFounder] = useState<{name: string, email: string} | null>(null);
  
  const founders = [
    {
      name: "Mr. Gunjan Tewari",
      title: "Founder & Director",
      image: "/GunjanSir.jpeg",
      color: "primary" as const,
      description: "With over two decades of extensive experience in the IT sector, he has dedicated the last 8 years to comprehensive IT and career counselling. He brings a strategic vision to the platform, mentoring students and professionals to navigate their career paths efficiently.",
      bullets: ["Founder & Director", "Certified AI Generalist", "IT Career Strategist & Mentor"],
      linkedinUrl: "https://in.linkedin.com/in/gunjantewari",
      email: "gunjan@careerdisha.com" 
    },
    {
      name: "Mr. Abhijit Vyas",
      title: "Co-founder & Director",
      image: "/AbhijeetSir.jpeg",
      color: "secondary" as const,
      description: "With 18+ years of dedicated expertise in the IT sector and training, he has spent the last 8 years actively mentoring and counselling individuals. He ensures Careerदिशा's guidance remains firmly aligned with the dynamic, real-world needs of the industry.",
      bullets: ["Co-founder & Director", "Certified AI Generalist", "Technical Advisor & Mentor", "IT Project Manager"],
      linkedinUrl: "https://www.linkedin.com/in/abhijit-v-696640216?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      email: "abhijit@careerdisha.com"
    }
  ];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedFounder) return;
    if (!formData.name.trim() || !formData.message.trim()) {
      alert("Please fill all required fields.");
      return;
    }
    
    const { isValid, countryCode, dialCode, countryName } = getPhoneDetails(formData.phone);
    if (!isValid) {
      alert("Please enter a valid phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Save to Database
      await saveExpertAdviceInquiry({
        name: formData.name,
        email: selectedFounder.email, // Logging founder email for reference
        mobile: formData.phone,
        countryCode,
        dialCode,
        countryName,
        service: `Contact Founder: ${selectedFounder.name}`,
        message: formData.message,
      });

      // 2. Email Routing Logic (Simulated for frontend)
      console.log(`[EMAIL ROUTING] Sending email to: ${selectedFounder.email}`);
      console.log(`[EMAIL ROUTING] From: ${formData.name}, Mobile: ${formData.phone}`);
      console.log(`[EMAIL ROUTING] Message: ${formData.message}`);

      alert(`Your message has been sent to ${selectedFounder.name}.`);
      setSelectedFounder(null);
      setFormData({ name: '', phone: '', message: '' });
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-surface overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: "url('/MeetTheVisionaries.png')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.8, maskImage: "radial-gradient(ellipse at center, black 50%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 50%, transparent 100%)" }}></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-4">Meet the Visionaries Behind the Platform</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-on-surface-variant max-w-2xl mx-auto font-medium">The experts ensuring you receive unmatched value and professional career guidance.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {founders.map((founder, idx) => (
             <ProfileCard 
               key={idx}
               name={founder.name} 
               title={founder.title} 
               image={founder.image} 
               color={founder.color} 
               description={founder.description} 
               bullets={founder.bullets} 
               linkedinUrl={founder.linkedinUrl} 
               onContactClick={() => setSelectedFounder(founder)} 
             />
          ))}
        </div>
      </div>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {selectedFounder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm shadow-2xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl pb-6"
            >
              <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
                <h3 className="text-2xl font-headline font-bold text-on-surface">Contact {selectedFounder.name}</h3>
                <button 
                  onClick={() => setSelectedFounder(null)}
                  className="text-on-surface-variant hover:text-on-surface p-2 rounded-full hover:bg-surface transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 pb-2 space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none border-r border-outline-variant/20 pr-4 py-2 my-1">
                    <User className="h-5 w-5 text-on-surface-variant" />
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name *"
                    className="w-full pl-16 pr-4 py-4 bg-transparent border border-outline-variant/30 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                
                <PhoneInput 
                  value={formData.phone}
                  onChange={(val) => setFormData({...formData, phone: val || ''})}
                  onValidationChange={setIsPhoneValid}
                  required
                />
                
                <div className="relative">
                  <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none border-r border-outline-variant/20 pr-4 bottom-4">
                    <MessageSquare className="h-5 w-5 text-on-surface-variant" />
                  </div>
                  <textarea
                    placeholder="Enter your message *"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full pl-16 pr-4 py-4 bg-transparent border border-outline-variant/30 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  ></textarea>
                </div>
              </div>
              <div className="px-6 mt-4">
                <button 
                  className="w-full py-4 bg-[#1e8e52] hover:bg-[#167843] text-white rounded-xl font-bold transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isPhoneValid || !formData.name || !formData.message}
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
