import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none w-full h-screen">
      {/* Dark premium overlay that fades to transparent */}
      <motion.div 
        className="absolute inset-0 bg-zinc-950"
        initial={{ opacity: 1 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* The cinematic transition wrapper */}
      <motion.div 
        className="relative w-full h-full origin-top-left transform-gpu flex items-center justify-center"
        initial={{ 
          scale: 1, 
          x: 0, 
          y: 0, 
          opacity: 1,
          filter: "blur(0px)"
        }}
        animate={isFadingOut ? { 
          scale: isDesktop ? 0.15 : 0.3,
          x: isDesktop ? 40 : 20,
          y: isDesktop ? 24 : 12,
          opacity: 0,
          filter: "blur(12px)"
        } : {}}
        transition={{ 
          duration: 1.2, 
          ease: [0.22, 1, 0.36, 1] // Apple/Stripe-like premium easing
        }}
        onAnimationComplete={() => {
          if (isFadingOut) onFinish();
        }}
      >
        <video
          src="/CareerDisha.mp4"
          autoPlay
          muted
          playsInline
          onEnded={() => setIsFadingOut(true)}
          onError={() => setIsFadingOut(true)}
          className="w-full h-full object-contain md:object-cover pointer-events-auto"
        />
      </motion.div>
    </div>
  );
}
