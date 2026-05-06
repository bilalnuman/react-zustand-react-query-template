import { useEffect, useState } from "react";

export const useOtpTimer = (expiresInSeconds?: number) => {
  const [expiry, setExpiry] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (typeof expiresInSeconds === "number") {
      const now = Date.now();
      const serverExpiry = now + expiresInSeconds * 1000;

      setExpiry(serverExpiry);
      setTimeLeft(Math.max(0, serverExpiry - now));
    }
  }, [expiresInSeconds]);

  useEffect(() => {
    if (!expiry) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, expiry - Date.now());
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiry]);
  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  return {
    timeLeft,
    minutes,
    seconds,
    isExpired: timeLeft <= 0,
  };
};