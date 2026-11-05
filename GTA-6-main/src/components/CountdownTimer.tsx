import { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}

export function CountdownTimer() {
  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(SITE_CONFIG.RELEASE_DATE).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, totalMs: diff };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isExpired = timeLeft.totalMs <= 0;

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days, highlight: '#FF2E93' },
    { label: 'HOURS', value: timeLeft.hours, highlight: '#FF7A18' },
    { label: 'MINUTES', value: timeLeft.minutes, highlight: '#FFC857' },
    { label: 'SECONDS', value: timeLeft.seconds, highlight: '#19E3D0' }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto my-8 px-4 text-center">
      {/* Header pill */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#150A24] border border-[#FF2E93]/40 text-xs font-mono text-[#FFF5FB] mb-4 shadow-sm shadow-[#FF2E93]/20">
        <Clock className="w-3.5 h-3.5 text-[#FF2E93] animate-pulse" />
        <span className="tracking-wider uppercase">Projected Launch Countdown</span>
      </div>

      {isExpired ? (
        <div className="p-8 rounded-2xl border-2 border-[#19E3D0] bg-[#150A24]/90 backdrop-blur-xl shadow-[0_0_50px_rgba(25,227,208,0.4)] animate-bounce">
          <div className="flex items-center justify-center gap-2 text-2xl sm:text-4xl font-extrabold font-['Orbitron'] text-[#19E3D0]">
            <Sparkles className="w-8 h-8 text-[#FFC857]" />
            <span>NOW AVAILABLE WORLDWIDE</span>
            <Sparkles className="w-8 h-8 text-[#FFC857]" />
          </div>
          <p className="text-sm text-[#B9A6D4] mt-2">
            Vice City is officially open. Grab your controllers and explore Leonida!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className="relative group p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#1E1033] to-[#150A24] border border-[#FF2E93]/30 shadow-lg shadow-black/60 transition-all duration-300 hover:border-[#FF2E93] hover:scale-105"
            >
              {/* Subtle neon top bar indicator */}
              <div
                className="absolute top-0 left-1/4 right-1/4 h-[2px] rounded-full"
                style={{ backgroundColor: unit.highlight }}
              />

              <div className="font-['Space_Mono'] font-bold text-3xl sm:text-5xl text-white tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
                {String(unit.value).padStart(2, '0')}
              </div>

              <div
                className="text-[10px] sm:text-xs font-mono font-semibold tracking-widest mt-1.5 uppercase"
                style={{ color: unit.highlight }}
              >
                {unit.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Official Disclaimer Note */}
      <p className="text-xs text-[#B9A6D4]/70 mt-3 font-mono">
        Release date per official announcements. Subject to change.
      </p>
    </div>
  );
}
