import React, { useEffect, useRef, useState } from 'react';
import './FlipDigit.css';

interface FlipDigitProps {
  digit: number;
}

export const FlipDigit: React.FC<FlipDigitProps> = ({ digit }) => {
  const [displayDigit, setDisplayDigit] = useState(digit);
  const [isFlipping, setIsFlipping] = useState(false);
  const prevDigitRef = useRef(digit);

  useEffect(() => {
    // Only animate when the digit actually changes
    if (digit !== prevDigitRef.current) {
      setIsFlipping(true);

      const timer = setTimeout(() => {
        setIsFlipping(false);
        setDisplayDigit(digit);
        prevDigitRef.current = digit;
      }, 600); // matches CSS animation duration

      return () => clearTimeout(timer);
    }
  }, [digit]);

  return (
    <div className={`flip-digit-container ${isFlipping ? 'flipping' : ''}`}>
      <div className="flip-digit-top">{isFlipping ? digit : displayDigit}</div>
      <div className="flip-digit-bottom">{displayDigit}</div>
      <div className="flip-digit-flap flip-digit-flap-top">{displayDigit}</div>
      <div className="flip-digit-flap flip-digit-flap-bottom">{digit}</div>
    </div>
  );
};
