import { 
  Mail, 
  Lock, 
  Eye, 
  ArrowRight, 
  Smartphone 
} from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onBack: () => void;
  onRegister: () => void;
  onLogin: () => void;
}

export default function Login({ onBack, onRegister, onLogin }: LoginProps) {
  const logoUrl = "https://lh3.googleusercontent.com/aida/ADBb0ujBNDrdlKyWEXRyOYjBQFelE82POn9IYKrMRGV5dMyymcC7rGylcaG1AbTkJM8FinkdXxOf6HEicc-0TBLtfFclDlc4mdgFD4wLacVgyI8CAiUbRJqfeZaMW0kznAXOFMyPiIca3be0o69SPtt_uZMOLh7qPrWmp7QmrwNhDggjKEO5MaE-nsQgO5jQC03qHvsid3f6x9x7xm-y32OlaxrNgOGsHeyhliP5RyZSvRubjjcj1vMNLxEtznCG1P6JAYAlUACJ6jncAw";

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden bg-surface"
    >
      {/* Subtle Ambient Background Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-secondary-container/10 blur-[100px]"></div>
      
      {/* Brand Logo Header */}
      <header className="mb-10 text-center relative z-10">
        <button onClick={onBack} className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
          <img 
            alt="CareerDisha Logo" 
            className="h-20 w-auto mb-2" 
            src={logoUrl}
            referrerPolicy="no-referrer"
          />
          <span className="text-xs font-body uppercase tracking-[0.2em] text-on-surface-variant font-semibold">The Luminary Guide</span>
        </button>
      </header>

      {/* Login Card */}
      <section className="w-full max-w-md relative z-10">
        <div className="bg-surface-container-lowest rounded-2xl p-8 sm:p-10 shadow-[0_32px_64px_-12px_rgba(25,28,30,0.06)] ring-1 ring-outline-variant/20">
          <div className="mb-10">
            <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight mb-2">Welcome back</h1>
            <p className="text-on-surface-variant font-body">Sign in to continue your journey</p>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-body font-bold uppercase tracking-widest text-on-surface-variant block ml-1" htmlFor="email">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  className="block w-full pl-12 pr-4 py-4 bg-surface-container-high border-none rounded-xl focus:ring-0 focus:bg-surface-container-highest transition-all font-body text-on-surface placeholder:text-on-surface-variant/50 outline-none" 
                  id="email" 
                  placeholder="Enter your email" 
                  type="email"
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-focus-within:w-full"></div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-body font-bold uppercase tracking-widest text-on-surface-variant block" htmlFor="password">Password</label>
                <a className="text-xs font-body font-bold text-primary hover:text-primary-container transition-colors uppercase tracking-widest" href="#">Forgot?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  className="block w-full pl-12 pr-12 py-4 bg-surface-container-high border-none rounded-xl focus:ring-0 focus:bg-surface-container-highest transition-all font-body text-on-surface placeholder:text-on-surface-variant/50 outline-none" 
                  id="password" 
                  placeholder="Your password" 
                  type="password"
                />
                <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-on-surface-variant hover:text-on-surface transition-colors" type="button">
                  <Eye className="w-5 h-5" />
                </button>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-focus-within:w-full"></div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              className="w-full bg-primary hover:bg-primary/90 text-on-primary font-headline font-extrabold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 group transition-all duration-300 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]" 
              type="submit"
            >
              Login
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-10">
            <div aria-hidden="true" className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-on-surface-variant/10"></div>
            </div>
            <div className="relative flex justify-center text-xs font-body uppercase tracking-[0.3em]">
              <span className="bg-surface-container-lowest px-4 text-on-surface-variant font-bold">OR CONTINUE WITH</span>
            </div>
          </div>

          {/* OTP Login */}
          <button 
            className="w-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant font-headline font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-200" 
            type="button"
          >
            <Smartphone className="w-5 h-5" />
            Login via OTP
          </button>

          {/* Footer Link */}
          <p className="mt-10 text-center text-sm font-body text-on-surface-variant">
            Don't have an account? 
            <button 
              onClick={onRegister}
              className="text-primary font-bold hover:underline decoration-2 underline-offset-4 ml-1"
            >
              Register now
            </button>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center py-12 px-8 border-t border-on-surface-variant/10">
        <div className="text-on-surface-variant text-xs font-body tracking-widest uppercase mb-4 md:mb-0">
          © 2024 The Luminary Guide. All rights reserved.
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <a className="text-on-surface-variant/80 text-xs font-body tracking-widest uppercase hover:text-primary transition-all duration-300" href="#">Privacy Policy</a>
          <a className="text-on-surface-variant/80 text-xs font-body tracking-widest uppercase hover:text-primary transition-all duration-300" href="#">Terms of Service</a>
          <a className="text-on-surface-variant/80 text-xs font-body tracking-widest uppercase hover:text-primary transition-all duration-300" href="#">Help Center</a>
        </div>
      </footer>
    </motion.main>
  );
}
