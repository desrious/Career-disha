import { 
  X, 
  ArrowRight, 
  Clock 
} from 'lucide-react';
import { motion } from 'motion/react';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { useState } from 'react';

interface RegisterProps {
  onClose: () => void;
  onStart: () => void;
}

export default function Register({ onClose, onStart }: RegisterProps) {
  const [isFirstPlayDone, setIsFirstPlayDone] = useState(false);
  const logoUrl = "/CareerDishaLogo.png";
  const illustrationUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBcf0cFwQMR8p9sFKPoRHw6YlO2pAeX8nkkLqKiPvNDKRTjpkQP600rC8aPJBDFrlzKPrmNW5DSpEOG1IsxR1MvMReZRCw289weqWLZoLW1PYsitZHakG1Pm3ZsOAPdJaU5O3KaAGq84jFb5oUwkEnZHEmvGN3ob017JYFZUCwnk0etHbJBqchlxAZaKXxXKwvGoQlDRokoN-lpPTmQnhYXTQx_hJU49Xf-pqAiX0al4-U2D-gEEX2x4iFObDQ_TDiDRF1B6Bmb-Dsz";

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-surface flex flex-col relative overflow-hidden font-body"
    >
      {/* Header Section */}
      <header className="absolute top-0 w-full z-50 flex justify-between items-center px-6 py-6 bg-transparent">
        <div className="flex items-center">
          <img 
            alt="Careerदिशा Logo" 
            className="w-32 h-auto object-contain" 
            src={logoUrl}
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs font-bold text-on-surface-variant tracking-widest uppercase">Progress</span>
            <div className="flex items-center gap-3">
              <div className="h-2 w-48 bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full w-1/4 bg-primary rounded-full"></div>
              </div>
              <span className="text-sm font-bold text-primary">25%</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="ml-6 text-on-surface-variant hover:opacity-80 transition-opacity"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 -left-24 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -right-24 w-[500px] h-[500px] bg-secondary-container/10 rounded-full blur-[100px]"></div>

        <div className="max-w-3xl w-full text-center flex flex-col items-center z-10">
          {/* Central Lottie Animation */}
          <div className="mb-14 relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-150"></div>
            <motion.div 
              initial={{ opacity: 0, y: 0 }}
              animate={{ 
                opacity: 1,
                y: [0, -8, 0] 
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ 
                opacity: { duration: 1 },
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="relative w-32 h-32 flex items-center justify-center cursor-pointer group"
            >
              <DotLottiePlayer
                src="https://lottie.host/79f08e55-e57b-4a74-bf4b-6e73af4477c0/vV9okQT20Z.lottie"
                autoplay
                loop={isFirstPlayDone}
                speed={0.5}
                // segment={isFirstPlayDone ? [30, 90] : [0, 100]}
                onEvent={(event) => {
                  if (event === 'complete') {
                    setIsFirstPlayDone(true);
                  }
                }}
                style={{ width: '180px', height: '180px' }}
              />
            </motion.div>
          </div>

          {/* Hero Text */}
          <h1 className="text-6xl font-extrabold text-on-surface leading-tight mb-8 tracking-tight font-headline">
            Welcome to the <br/>
            <span className="text-primary">Luminescent Path</span>
          </h1>
          <p className="text-2xl text-on-surface-variant leading-relaxed mb-14 max-w-xl font-body">
            We're excited to help you discover your future. Let's start by getting to know you a little better.
          </p>

          {/* CTA Section */}
          <div className="flex flex-col items-center gap-8 w-full">
            <button 
              onClick={onStart}
              className="group relative px-14 py-6 bg-tertiary-fixed text-on-tertiary-fixed font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 active:scale-95 flex items-center gap-4"
            >
              <span>Start Registration</span>
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </button>
            
            <span className="text-base font-medium text-on-surface-variant/60 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Takes about 3 minutes
            </span>
          </div>
        </div>

        {/* Editorial Visual Asset */}
        <div className="absolute -right-20 bottom-0 w-[450px] opacity-90 pointer-events-none">
          <img 
            alt="Students collaborating" 
            className="w-full h-auto mix-blend-multiply" 
            src={illustrationUrl}
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-10 px-12 flex justify-between items-center bg-transparent z-20">
        <div className="text-sm text-on-surface-variant/50 font-medium tracking-wider uppercase">
          © 2024 Careerदिशा Platform
        </div>
        <div className="flex gap-10">
          <a href="#" className="text-sm font-bold text-on-surface-variant/70 hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="text-sm font-bold text-on-surface-variant/70 hover:text-primary transition-colors">Support Center</a>
        </div>
      </footer>
    </motion.main>
  );
}
