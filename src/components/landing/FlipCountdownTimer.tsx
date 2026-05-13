import React from 'react';
import { useCountdown } from './useCountdown';
import { FlipDigit } from './FlipDigit';

interface FlipCountdownTimerProps {
  validUpto?: string;
  showCountdown?: boolean;
}

export const FlipCountdownTimer: React.FC<FlipCountdownTimerProps> = ({ validUpto, showCountdown }) => {
  const { hours, minutes, seconds, isExpired } = useCountdown(validUpto);

  if (!showCountdown) return null;

  if (isExpired) {
    return (
      <div className="flex items-center justify-center p-4 bg-slate-900 rounded-xl mb-4">
        <p className="text-red-400 font-bold uppercase tracking-widest text-sm">Offer Expired</p>
      </div>
    );
  }

  const displayHours = Math.max(0, hours);
  const displayMinutes = Math.max(0, minutes);
  const displaySeconds = Math.max(0, seconds);

  const hourDigits = displayHours.toString().padStart(2, '0').split('').map(Number);
  const minuteDigits = displayMinutes.toString().padStart(2, '0').split('').map(Number);
  const secondDigits = displaySeconds.toString().padStart(2, '0').split('').map(Number);

  return (
    <div className="flex flex-col items-center mb-5 bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-indigo-100 shadow-sm">
      <span className="text-[13px] font-bold uppercase tracking-widest text-slate-500 opacity-80 mb-2">
        Remaining
      </span>

      <div className="flex items-center justify-center gap-1">
        <div className="flex flex-col items-center">
          <div className="flex">
            {hourDigits.map((digit, i) => (
              <FlipDigit key={`h-${i}`} digit={digit} />
            ))}
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-2">Hr</span>
        </div>

        <span className="text-2xl font-black text-slate-800 pb-6 px-1 animate-pulse">:</span>

        <div className="flex flex-col items-center">
          <div className="flex">
            {minuteDigits.map((digit, i) => (
              <FlipDigit key={`m-${i}`} digit={digit} />
            ))}
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-2">Min</span>
        </div>

        <span className="text-2xl font-black text-slate-800 pb-6 px-1 animate-pulse">:</span>

        <div className="flex flex-col items-center">
          <div className="flex">
            {secondDigits.map((digit, i) => (
              <FlipDigit key={`s-${i}`} digit={digit} />
            ))}
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-2">Sec</span>
        </div>
      </div>
    </div>
  );
};