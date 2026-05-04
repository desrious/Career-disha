import React, { useEffect, useState } from 'react';
import './FlipDigit.css';

interface FlipDigitProps {
  digit: number;
}

export const FlipDigit: React.FC<FlipDigitProps> = ({ digit }) => {
  const [currentDigit, setCurrentDigit] = useState(digit);
  const [nextDigit, setNextDigit] = useState(digit);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (digit !== currentDigit) {
      setNextDigit(digit);
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setIsFlipping(false);
        setCurrentDigit(digit);
      }, 600); // matches animation duration
      return () => clearTimeout(timer);
    }
  }, [digit, currentDigit]);

  return (
    <div className={`flip-digit-container ${isFlipping ? 'flipping' : ''}`}>
      <div className="flip-digit-top">{isFlipping ? nextDigit : currentDigit}</div>
      <div className="flip-digit-bottom">{currentDigit}</div>
      <div className="flip-digit-flap flip-digit-flap-top">{currentDigit}</div>
      <div className="flip-digit-flap flip-digit-flap-bottom">{nextDigit}</div>
    </div>
  );
};
