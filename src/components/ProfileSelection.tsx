import { 
  GraduationCap, 
  Award, 
  Building2, 
  ArrowRight 
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileSelectionProps {
  onStartStudent: () => void;
  onStartGraduate: () => void;
  onStartProfessional: () => void;
}

export default function ProfileSelection({ onStartStudent, onStartGraduate, onStartProfessional }: ProfileSelectionProps) {
  const logoUrl = "/CareerDishaLogo.png";

  return (
    <div className="font-body text-on-surface min-h-screen flex flex-col bg-[#f8fafc]">
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 md:py-20 max-w-7xl mx-auto w-full">
        {/* Brand Identity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <img 
            className="w-auto mx-auto mb-8 h-24" 
            alt="Careerदिशा Official Logo" 
            src={logoUrl}
            referrerPolicy="no-referrer"
          />
          <h1 className="font-headline font-extrabold text-4xl md:text-6xl tracking-tight mb-4 text-on-background">
            Your <span className="text-primary">future</span> is calling.
          </h1>
          <p className="font-body text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed opacity-90">
            Welcome to a Digital Sanctuary for career transformation. Choose your path to begin the luminescent journey.
          </p>
        </motion.div>

        {/* Asymmetric/Bento Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
          {/* Student Card (Featured) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface-container-lowest p-10 rounded-xl border-t-4 border-tertiary shadow-[0_24px_40px_-4px_rgba(25,28,30,0.06)] flex flex-col h-full transform transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="mb-8 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
              <GraduationCap className="text-primary w-8 h-8" />
            </div>
            <h3 className="font-headline font-bold text-2xl mb-4 text-on-surface">I'm a Student</h3>
            <p className="font-body text-on-surface-variant leading-relaxed flex-grow mb-10">
              Discover your strengths and path. Leverage AI-driven insights to map out your academic and professional future.
            </p>
            <button 
              onClick={onStartStudent}
              className="bg-tertiary-fixed text-on-tertiary-fixed px-8 py-4 rounded-xl font-headline font-bold tracking-wide flex items-center justify-center gap-2 hover:bg-tertiary transition-colors duration-300 cursor-pointer"
            >
              Start your Journey <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Graduate Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surface-container-lowest p-10 rounded-xl shadow-[0_24px_40px_-4px_rgba(25,28,30,0.04)] flex flex-col h-full transform transition-transform duration-300 hover:scale-[1.02] border border-outline-variant/10"
          >
            <div className="mb-8 w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center">
              <Award className="text-secondary w-8 h-8" />
            </div>
            <h3 className="font-headline font-bold text-2xl mb-4 text-on-surface">I'm a Graduate</h3>
            <p className="font-body text-on-surface-variant leading-relaxed flex-grow mb-10">
              Bridge the gap between education and employment. Tailor your skills for the modern job market with expert precision.
            </p>
            <button 
              onClick={onStartGraduate}
              className="bg-secondary text-white px-8 py-4 rounded-xl font-headline font-bold tracking-wide flex items-center justify-center gap-2 hover:bg-secondary/90 transition-colors duration-300 cursor-pointer"
            >
              Start your Journey <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Professional Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-surface-container-lowest p-10 rounded-xl shadow-[0_24px_40px_-4px_rgba(25,28,30,0.04)] flex flex-col h-full transform transition-transform duration-300 hover:scale-[1.02] border border-outline-variant/10"
          >
            <div className="mb-8 w-14 h-14 bg-primary-container/10 rounded-xl flex items-center justify-center">
              <Building2 className="text-primary-container w-8 h-8" />
            </div>
            <h3 className="font-headline font-bold text-2xl mb-4 text-on-surface">I'm a Working Professional</h3>
            <p className="font-body text-on-surface-variant leading-relaxed flex-grow mb-10">
              Manage career transitions or upskill for growth. Powerful dashboards to help you pivot with data-driven precision.
            </p>
            <button 
              onClick={onStartProfessional}
              className="bg-primary text-white px-8 py-4 rounded-xl font-headline font-bold tracking-wide flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors duration-300 cursor-pointer"
            >
              Start your Journey <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        <div className="mt-20 w-full max-w-4xl opacity-50">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent"></div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-auto bg-surface-container-low">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-7xl mx-auto w-full">
          <div className="mb-6 md:mb-0">
            <span className="font-headline font-bold text-on-surface text-lg">Careerदिशा</span>
            <p className="font-body text-sm tracking-wide text-on-surface-variant mt-2">
              © 2024 Careerदिशा. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="font-body text-sm tracking-wide text-on-surface-variant hover:text-secondary underline underline-offset-4 transition-opacity opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
            <a className="font-body text-sm tracking-wide text-on-surface-variant hover:text-secondary underline underline-offset-4 transition-opacity opacity-80 hover:opacity-100" href="#">Terms of Service</a>
            <a className="font-body text-sm tracking-wide text-on-surface-variant hover:text-secondary underline underline-offset-4 transition-opacity opacity-80 hover:opacity-100" href="#">Help Center</a>
            <a className="font-body text-sm tracking-wide text-on-surface-variant hover:text-secondary underline underline-offset-4 transition-opacity opacity-80 hover:opacity-100" href="#">Cookie Settings</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
