import { useState } from 'react';
import { motion } from 'motion/react';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      {/* Dark premium overlay that fades to transparent */}
      <motion.div 
        className="absolute inset-0 bg-zinc-950"
        initial={{ opacity: 1 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* The cinematic transition wrapper */}
      <motion.div 
        className="relative w-full h-full origin-top-left transform-gpu"
        initial={{ 
          scale: 1, 
          x: 0, 
          y: 0, 
          opacity: 1,
          filter: "blur(0px)"
        }}
        animate={isFadingOut ? { 
          scale: 0.15,
          x: 40,
          y: 24,
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
          className="w-full h-full object-cover pointer-events-auto"
        />
      </motion.div>
    </div>
  );
}
