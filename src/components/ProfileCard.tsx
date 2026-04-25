import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  title: string;
  image: string;
  color: 'primary' | 'secondary';
  description: string;
  bullets: string[];
  linkedinUrl: string;
  onContactClick: () => void;
  innerGradient?: string;
  behindGlowColor?: string;
}

const ProfileCard = ({
  name,
  title,
  image,
  color,
  description,
  bullets,
  linkedinUrl,
  onContactClick,
  innerGradient,
  behindGlowColor,
}: ProfileCardProps) => {
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Calculate tilt angles (subtle tilt for professional look)
    const rotateX = -(y / rect.height) * 4;
    const rotateY = (x / rect.width) * 4;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    });
  };

  const primaryClass = color === 'primary' ? 'text-primary' : 'text-secondary';
  const bgClass = color === 'primary' ? 'bg-primary' : 'bg-secondary';
  const borderClass = color === 'primary' ? 'border-primary' : 'border-secondary';
  const bgLightClass = color === 'primary' ? 'bg-primary/10' : 'bg-secondary/10';
  const hoverBgClass = color === 'primary' ? 'hover:bg-primary/90' : 'hover:bg-secondary/90';

  return (
    <div className="relative group perspective-1000">
      {/* Behind Glow */}
      <div 
        className="absolute inset-0 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"
        style={{ backgroundColor: behindGlowColor || (color === 'primary' ? 'rgba(0, 87, 194, 0.4)' : 'rgba(0, 108, 69, 0.4)') }}
      />
      
      {/* Main Card */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ ...tiltStyle, background: innerGradient || 'white' }}
        className="bg-white p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-lg hover:shadow-2xl transition-all duration-300 ease-out flex flex-col h-full relative overflow-hidden z-10 will-change-transform"
      >
        <div className={`absolute top-0 right-0 w-32 h-32 ${color === 'primary' ? 'bg-primary/5' : 'bg-secondary/5'} rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform`} />
        
        <div className="flex items-start md:items-center gap-6 mb-8 relative z-10 pointer-events-none">
          <div className={`w-28 h-36 md:w-32 md:h-40 ${bgLightClass} rounded-2xl overflow-hidden shrink-0 shadow-lg border border-${color}/20 ring-4 ring-white`}>
            <img src={image} alt={name} className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
          </div>
          <div className="pt-2 md:pt-0">
            <h4 className="text-2xl font-bold text-slate-800 drop-shadow-sm">{name}</h4>
            <p className={`${primaryClass} font-bold text-sm uppercase tracking-widest mt-1`}>{title}</p>
          </div>
        </div>
        
        <div className="flex flex-col flex-grow relative z-10 pointer-events-none">
          <p className="text-slate-600 leading-relaxed mb-8 font-medium">
            {description}
          </p>
          <ul className="space-y-4 my-auto">
            {bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-700">
                <CheckCircle2 className={`w-5 h-5 ${primaryClass} shrink-0 drop-shadow-sm`} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex gap-4 mt-10 pt-6 border-t border-slate-200 relative z-10">
          <button 
            onClick={onContactClick} 
            className={`px-8 py-2.5 ${bgClass} text-white rounded-full font-bold ${hoverBgClass} shadow-md hover:shadow-xl transition-all active:scale-95`}
          >
            Contact
          </button>
          <a 
            href={linkedinUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`px-8 py-2.5 border-2 ${borderClass} ${primaryClass} rounded-full font-bold hover:text-white ${color === 'primary' ? 'hover:bg-primary' : 'hover:bg-secondary'} shadow-sm hover:shadow-xl transition-all active:scale-95`}
          >
            LinkedIn
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCard;