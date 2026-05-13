import { useState, useEffect, useCallback } from 'react';

/**
 * Parse a `valid_upto` string into a stable UTC millisecond timestamp.
 *
 * The admin panel stores values in one of two shapes:
 *   • ISO‑8601 with timezone   → "2026-05-15T14:30:00+05:30"
 *   • datetime‑local (no tz)   → "2026-05-15T14:30"
 *
 * For the second case we treat the value as **local time on the admin's
 * machine** (which is also the user‑facing timezone for this India‑only
 * product), so we parse it with `new Date()` directly — this gives us the
 * correct UTC epoch on every client whose system clock is correct,
 * regardless of their configured timezone, because we normalise to UTC
 * at save‑time in the admin panel.
 */
function parseTarget(raw: string): number | null {
  if (!raw) return null;

  // Normalise space‑separated datetime ("2026-05-15 14:30") → ISO
  const normalised = raw.includes('T') ? raw : raw.replace(' ', 'T');
  const ms = new Date(normalised).getTime();
  return Number.isFinite(ms) ? ms : null;
}

export interface CountdownResult {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function useCountdown(validUpto: string | undefined): CountdownResult {
  const computeTimeLeft = useCallback((): CountdownResult => {
    if (!validUpto) return { hours: 0, minutes: 0, seconds: 0, isExpired: false };

    const target = parseTarget(validUpto);
    if (target === null) return { hours: 0, minutes: 0, seconds: 0, isExpired: false };

    const distance = target - Date.now();

    if (distance <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const totalSeconds = Math.floor(distance / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { hours, minutes, seconds, isExpired: false };
  }, [validUpto]);

  const [timeLeft, setTimeLeft] = useState<CountdownResult>(computeTimeLeft);

  useEffect(() => {
    // Immediately sync when validUpto changes
    const initial = computeTimeLeft();
    setTimeLeft(initial);

    // Don't start an interval if already expired or no target
    if (initial.isExpired || !validUpto) return;

    const interval = setInterval(() => {
      const next = computeTimeLeft();
      setTimeLeft(next);

      // Clean up interval once expired
      if (next.isExpired) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [validUpto, computeTimeLeft]);

  return timeLeft;
}