import { useState, useEffect, useRef } from 'react';

export function useCountdown(validUpto: string | undefined) {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number }>({
    hours: 0,
    minutes: 0
  });
  const [isExpired, setIsExpired] = useState(false);

  // ✅ FIX: store stable target timestamp
  const targetRef = useRef<number | null>(null);

  useEffect(() => {
    if (!validUpto) return;

    // parse ONLY once
    targetRef.current = new Date(validUpto.replace(' ', 'T')).getTime();
  }, [validUpto]);

  useEffect(() => {
    if (!targetRef.current) return;

    const updateCountdown = () => {
      const now = Date.now();
      const distance = targetRef.current! - now;

      if (distance <= 0) {
        setIsExpired(true);
        setTimeLeft({ hours: 0, minutes: 0 });
      } else {
        setIsExpired(false);

        const totalMinutes = Math.floor(distance / (1000 * 60));
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        setTimeLeft({ hours, minutes });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return { ...timeLeft, isExpired };
}