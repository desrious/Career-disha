import { ArrowRight, BarChart3, Users, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { DotLottiePlayer } from '@dotlottie/react-player';

interface RegistrationSuccessProps {
  onGoToDashboard: () => void;
}

export default function RegistrationSuccess({ onGoToDashboard }: RegistrationSuccessProps) {
  const logoUrl = "https://lh3.googleusercontent.com/aida/ADBb0ujH1bZOsWRdIL3Tm_EEwzxLcS6FhGQT8sL7ecqJg97-NsxA0AzWfXD4fxPeM2BTDsCiPnpHVmhL7gIgxazKzCziH_AcwWaJjrJpXqve8BjhnCFX07Vk3dihbYUALXB36aj1wFofS0ihBWm3yufeNhDlPYS-d4Oh9ggf4OyRJhJkT6zyyu4Zj-JmdRk5xLrcR9tv1Yn10VMAZCIBUogQ0Ups7GCSgNXGqRVThjRmFqLjUYS8F372PImYzR-ST7Oo03MsSr4E1AVdsA";

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body">
      {/* Header */}
      <header className="w-full px-6 py-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <img alt="Career Disha Logo" className="h-10 w-auto object-contain" src={logoUrl} referrerPolicy="no-referrer" />
        </div>
        <div className="flex items-center gap-4 w-48 md:w-64">
          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
            <div className="bg-secondary-fixed h-full w-full rounded-full"></div>
          </div>
          <span className="text-xs font-bold text-on-surface-variant">100%</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto w-full relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-secondary-fixed/10 rounded-full blur-3xl -z-10"></div>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: [0, -15, 0],
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2 // Start floating after the initial entrance and animation
            },
            default: { duration: 0.8 }
          }}
          className="mb-12 relative"
        >
          <div className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mx-auto overflow-hidden">
            <DotLottiePlayer
              src="https://lottie.host/ff21e3ef-2093-4b09-804e-82b2764366f3/EDj5PqZ0TQ.lottie"
              autoplay
              loop={false}
              speed={0.5}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className="absolute inset-0 border-4 border-secondary-container opacity-10 rounded-full scale-125"></div>
          <div className="absolute inset-0 border border-secondary-container opacity-5 rounded-full scale-150"></div>
        </motion.div>

        <div className="space-y-6 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary tracking-tight leading-tight font-headline">
            You're all set, Alex!
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-xl mx-auto opacity-80">
            Your profile is ready. We've structured your data to provide the most accurate career insights.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <button 
            onClick={onGoToDashboard}
            className="group flex items-center gap-3 bg-tertiary-fixed hover:bg-tertiary-container transition-all duration-300 px-10 py-5 rounded-xl active:scale-95 cursor-pointer"
          >
            <span className="font-headline font-bold text-on-tertiary-fixed text-lg">Go to Dashboard</span>
            <ArrowRight className="text-on-tertiary-fixed group-hover:translate-x-1 transition-transform w-6 h-6" />
          </button>
          <span className="text-xs font-medium text-outline uppercase tracking-widest mt-4">Preparing your personalized roadmap...</span>
        </div>

        <div className="mt-20 w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left opacity-60">
          <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col gap-3">
            <div className="text-primary"><BarChart3 className="w-6 h-6" /></div>
            <h3 className="font-headline font-bold text-on-surface">Data Analysis</h3>
            <p className="text-xs text-on-surface-variant">Advanced mapping of your skills against 500+ career trajectories.</p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col gap-3 md:-translate-y-4">
            <div className="text-secondary"><Users className="w-6 h-6" /></div>
            <h3 className="font-headline font-bold text-on-surface">Mentor Match</h3>
            <p className="text-xs text-on-surface-variant">Identifying 3 industry leaders who align with your core values.</p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col gap-3">
            <div className="text-tertiary"><Sparkles className="w-6 h-6" /></div>
            <h3 className="font-headline font-bold text-on-surface">Curated Path</h3>
            <p className="text-xs text-on-surface-variant">Your learning modules are now unlocking based on your profile.</p>
          </div>
        </div>
      </main>

      <footer className="w-full py-8 px-6 text-center">
        <p className="text-xs text-outline tracking-wide uppercase">
          © 2024 Luminary Guide — THE GROUNDED ASCENT
        </p>
      </footer>
    </div>
  );
}
