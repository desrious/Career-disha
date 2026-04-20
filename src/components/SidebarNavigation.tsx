import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  BarChart3, 
  User, 
  Bot, 
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarNavigationProps {
  onGoToDashboard?: () => void;
  onGoToRoadmap?: () => void;
  onGoToResults?: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  logoUrl?: string;
  activeScreen?: 'dashboard' | 'roadmap' | 'insights' | 'profile';
}

export function MenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="group relative inline-flex items-center gap-2"
    >
      {/* Solid 'Neu' Shadow Layer */}
      <span className="absolute rounded-xl inset-0 bg-primary/30 border-2 border-primary translate-x-1 translate-y-1 transition-transform duration-200 group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-active:translate-x-0 group-active:translate-y-0"></span>
      
      {/* Button Surface */}
      <span className="relative flex items-center gap-2 px-5 py-2 bg-surface text-primary border-2 border-primary rounded-xl font-bold transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-active:translate-x-0 group-active:translate-y-0">
        <Menu className="w-5 h-5" />
        Menu
      </span>
    </button>
  );
}

export function SidebarNavigation({ 
  onGoToDashboard, 
  onGoToRoadmap, 
  onGoToResults,
  isMenuOpen,
  setIsMenuOpen,
  logoUrl = "https://lh3.googleusercontent.com/aida/ADBb0ugIHQH9KsYjSKy1yo34iJCmwhIw1ZXx3GPKOKKzjAsaRbYBMEG4kfTa2z-crvDJbhYdFL8AhCt2dFGAsep_YZMiJZ7MPIvfJk8icyV4fsoNbRyYgfVZEhFseLuEFTYV25zfhulbQnq1m8GD8MMigU-o-JxAdjEOdw8l5xhSuZ-WPqcXxPZMj__NpwW53-jqerHgTy0fh-enQv8RcFD1w6MciE4P2Jhl1tgJR8vW4XJFuk8Y4xe-eQg5_-KJ_8nwA8k74_7fG7Perg",
  activeScreen = 'dashboard'
}: SidebarNavigationProps) {
  
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* Staggered Underlays */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="fixed inset-y-0 left-0 w-64 bg-primary/20 z-50 pointer-events-none"
          />
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="fixed inset-y-0 left-0 w-64 bg-primary/40 z-50 pointer-events-none"
          />

          {/* Actual Sidebar */}
          <motion.aside 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-64 border-r border-outline-variant/10 bg-white flex flex-col fixed inset-y-0 left-0 z-[60] h-screen overflow-hidden shadow-2xl"
          >
            <motion.div 
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.3
                  }
                }
              }}
              className="flex flex-col h-full min-w-[256px]"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="p-8 flex justify-between items-start"
              >
                <div>
                  <img src={logoUrl} alt="CareerDisha Logo" className="h-10 w-auto mb-2" referrerPolicy="no-referrer" />
                  <p className="text-[10px] font-bold text-outline tracking-widest uppercase">Navigation</p>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
              
              <nav className="flex-1 px-4 space-y-2 mt-4">
                <motion.button 
                  variants={{
                    hidden: { opacity: 0, x: -30, rotateX: 15 },
                    visible: { opacity: 1, x: 0, rotateX: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  onClick={() => {
                    setIsMenuOpen(false);
                    onGoToDashboard && onGoToDashboard();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold ${activeScreen === 'dashboard' ? 'bg-primary/5 text-primary' : 'text-on-surface-variant hover:bg-surface-container transition-colors'}`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard</span>
                </motion.button>
                <motion.button 
                  variants={{
                    hidden: { opacity: 0, x: -30, rotateX: 15 },
                    visible: { opacity: 1, x: 0, rotateX: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  onClick={() => {
                    setIsMenuOpen(false);
                    onGoToRoadmap && onGoToRoadmap();
                  }} 
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${activeScreen === 'roadmap' ? 'bg-primary/5 text-primary' : 'text-on-surface-variant hover:bg-surface-container transition-colors'}`}
                >
                  <MapIcon className="w-5 h-5" />
                  <span>Roadmap</span>
                </motion.button>
                <motion.button 
                  variants={{
                    hidden: { opacity: 0, x: -30, rotateX: 15 },
                    visible: { opacity: 1, x: 0, rotateX: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  onClick={() => {
                    setIsMenuOpen(false);
                    onGoToResults && onGoToResults();
                  }} 
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${activeScreen === 'insights' ? 'bg-primary/5 text-primary' : 'text-on-surface-variant hover:bg-surface-container transition-colors'}`}
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>Guidance</span>
                </motion.button>
                <motion.button 
                  variants={{
                    hidden: { opacity: 0, x: -30, rotateX: 15 },
                    visible: { opacity: 1, x: 0, rotateX: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${activeScreen === 'profile' ? 'bg-primary/5 text-primary' : 'text-on-surface-variant hover:bg-surface-container transition-colors'}`}
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </motion.button>
              </nav>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="p-6"
              >
                <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                  <Bot className="w-5 h-5" />
                  <span>AI Mentor</span>
                </button>
              </motion.div>
            </motion.div>
          </motion.aside>

          {/* Optional backdrop clicking outside closes menu */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/20 z-[40]"
          />
        </>
      )}
    </AnimatePresence>
  );
}