import { useState, useEffect } from 'react';
import { ShieldAlert, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('vicetools_cookie_consent');
    if (!consent) {
      // Small timeout so it doesn't flicker immediately
      const timer = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDecision = (decision: 'accepted' | 'declined') => {
    localStorage.setItem('vicetools_cookie_consent', decision);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="alertdialog"
      aria-live="polite"
      className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 p-4 rounded-2xl border border-[#FF2E93]/40 bg-[#150A24]/95 backdrop-blur-xl shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-[#FF2E93]/20 border border-[#FF2E93]/40 text-[#FF2E93] shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="flex-1 text-sm text-[#B9A6D4]">
          <h4 className="font-semibold text-white mb-1 flex items-center gap-2">
            <span>Community Preferences & Local Cache</span>
          </h4>
          <p className="text-xs leading-relaxed mb-3">
            Vice Tools stores your map markers, custom loadouts, and calculator preferences locally on your device. We use privacy-friendly analytics to keep the tools running fast.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDecision('accepted')}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#FF2E93] to-[#FF7A18] text-white hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#FF2E93]/30 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              Accept
            </button>
            <button
              onClick={() => handleDecision('declined')}
              className="px-3 py-2 rounded-xl text-xs font-medium text-[#B9A6D4] hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              Decline
            </button>
          </div>
          <p className="text-[10px] text-[#B9A6D4]/60 mt-2">
            Learn more in our{' '}
            <Link to="/privacy" className="text-[#19E3D0] underline hover:text-white">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
