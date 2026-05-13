/**
 * HeroSection — Landing page hero with rotating phrases and background image carousel.
 * Manages its own animation intervals for phrase cycling (6s) and image cycling (40s).
 */
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const heroImages = [
  "/landing_page_img1.png",
  "/landing_page_img2.png",
  "/landing_page_img3.png"
];

const heroPhrases = [
  { line1: "Find your career ", key1: "direction.", line2: "Build your ", key2: "career." },
  { line1: "Choose the right ", key1: "career.", line2: "Design your ", key2: "destiny." },
  { line1: "Discover your ", key1: "spark.", line2: "Launch your ", key2: "path." },
  { line1: "Map your career ", key1: "path.", line2: "Own your ", key2: "success." },
  { line1: "Define your ", key1: "purpose.", line2: "Elevate your ", key2: "journey." },
];

export default function HeroSection() {
  const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % heroPhrases.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const imgInterval = setInterval(() => {
      setCurrentHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 40000);
    return () => clearInterval(imgInterval);
  }, []);

  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 hero-overlay z-10 backdrop-blur-[2px] bg-black/30"></div>
        <AnimatePresence mode="popLayout">
          <motion.img
            key={heroImages[currentHeroImageIndex]}
            src={heroImages[currentHeroImageIndex]}
            alt="Empowering Career Vision"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </AnimatePresence>
      </div>
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.2 }
            }
          }}
          className="max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-2xl relative lg:-left-8 xl:-left-12"
        >
          <div className="h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] xl:h-[210px] relative w-full overflow-visible">
            <AnimatePresence mode="popLayout">
              <motion.h1
                key={currentPhraseIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-0 left-0 w-full text-[1.6rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-on-surface leading-[1.2] mb-6 tracking-tight"
                style={{ textShadow: '0 0 20px rgba(255,255,255,0.4), 0 0 40px rgba(59,130,246,0.25), 0 2px 4px rgba(0,0,0,0.3)' }}
              >
                <span className="block mb-1 sm:mb-2 whitespace-nowrap">
                  {heroPhrases[currentPhraseIndex].line1}
                  <span className="relative inline-block ml-1">
                    <span className="relative z-10 text-white">{heroPhrases[currentPhraseIndex].key1}</span>
                    <motion.span initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }} className="absolute bottom-0 sm:bottom-1 md:bottom-2 left-0 h-2 sm:h-3 md:h-4 lg:h-5 bg-primary/60 -rotate-2 z-0 origin-left rounded-md w-full"></motion.span>
                  </span>
                </span>
                <span className="block whitespace-nowrap">
                  <span className="text-blue-500" style={{ textShadow: 'none', WebkitTextStroke: '1px rgba(255, 255, 255, 0.4)' }}>
                    {heroPhrases[currentPhraseIndex].line2}
                  </span>
                  <span className="relative inline-block ml-1">
                    <span className="relative z-10 text-white drop-shadow-md">{heroPhrases[currentPhraseIndex].key2}</span>
                    <motion.span initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }} className="absolute bottom-0 sm:bottom-1 md:bottom-2 left-0 h-2 sm:h-3 md:h-4 lg:h-5 bg-blue-400/80 rotate-1 z-0 origin-left rounded-md w-full"></motion.span>
                  </span>
                </span>
              </motion.h1>
            </AnimatePresence>
          </div>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed font-medium text-white/90 drop-shadow-md w-full"
          >
            Confused about your career? Get personalized professional career guidance <br className="hidden md:block" />
            and career counselling designed for the next generation of leaders to choose the right career.
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <motion.a
                href="https://lifemap.mycareerdisha.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Start Assessment - Career Discovery"
                whileHover={{ x: 4, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-yellow-400 text-black border-2 border-black rounded-full font-bold text-sm sm:text-base md:text-lg px-5 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[-8px_8px_0_0_rgba(255,255,255,1)]"
              >
                START ASSESSMENT
                <motion.div
                  animate={{ x: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-5 h-5 text-red-500 transition-colors" />
                </motion.div>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      {/* Floating Decorative Elements */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[5%] top-[20%] hidden xl:block w-32 h-32 blur-[60px] bg-primary rounded-full opacity-60 pointer-events-none"
      />
      <motion.div
        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[40%] bottom-[10%] hidden xl:block w-40 h-40 blur-[80px] bg-tertiary rounded-full opacity-40 pointer-events-none"
      />
    </section>
  );
}
