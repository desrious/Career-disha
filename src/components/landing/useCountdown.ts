import { useState, useEffect } from 'react';

export function useCountdown(validUpto: string | undefined) {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number }>({ hours: 0, minutes: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!validUpto) {
      setIsExpired(true);
      return;
    }

    const targetDate = new Date(validUpto).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setIsExpired(true);
        setTimeLeft({ hours: 0, minutes: 0 });
      } else {
        setIsExpired(false);
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft({ hours, minutes });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000); 

    return () => clearInterval(interval);
  }, [validUpto]);

  return { ...timeLeft, isExpired };
}
