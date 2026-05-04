/** WhatsAppFAB — Floating WhatsApp action button with bob animation. */
import { motion } from 'motion/react';

export default function WhatsAppFAB() {
  return (
    <div className="fixed bottom-10 right-5 z-[1000]">
      <motion.a
        href="https://wa.me/919289191164"
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(37,211,102,0.6)] transition-all duration-300"
        title="WhatsApp Chat"
        animate={{ y: [-6, 6, -6] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <img src="/Whatsapp.png" alt="WhatsApp Icon" className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-lg" />
      </motion.a>
    </div>
  );
}
