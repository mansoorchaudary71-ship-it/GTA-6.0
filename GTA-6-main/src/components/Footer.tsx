import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle, Send, Heart, Compass, MessageSquare, Twitter, Youtube, Disc } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#0B0614] border-t border-[#FF2E93]/20 pt-16 pb-28 md:pb-16 text-[#B9A6D4] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-t from-[#FF2E93]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1 & 2: Brand + Mission + Socials */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF2E93] to-[#FF7A18] flex items-center justify-center">
                <Compass className="w-5 h-5 text-[#150A24]" />
              </div>
              <span className="font-['Orbitron'] font-black text-2xl tracking-wider gradient-sunset-text">
                {SITE_CONFIG.name}
              </span>
            </Link>

            <p className="text-sm text-[#B9A6D4] max-w-sm leading-relaxed">
              The premier unofficial companion portal for Grand Theft Auto VI. Interactive Leonida navigation, real-time progression calculators, and community game databases.
            </p>

            {/* Social Icons Placeholders */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={SITE_CONFIG.socialLinks.discord}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#19E3D0] hover:text-[#19E3D0] hover:bg-[#19E3D0]/10 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Join our community Discord"
              >
                <Disc className="w-5 h-5" />
              </a>
              <a
                href={SITE_CONFIG.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF2E93] hover:text-[#FF2E93] hover:bg-[#FF2E93]/10 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Follow Vice Tools on X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={SITE_CONFIG.socialLinks.reddit}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF7A18] hover:text-[#FF7A18] hover:bg-[#FF7A18]/10 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Join Vice Tools Reddit"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
              <a
                href={SITE_CONFIG.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-red-400 hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Watch guides on YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation Quick Links */}
          <div className="space-y-3">
            <h4 className="font-['Orbitron'] text-xs font-semibold uppercase tracking-wider text-white">
              Tools & Map
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/map" className="hover:text-[#19E3D0] transition-colors">
                  Interactive Leonida Map
                </Link>
              </li>
              <li>
                <Link to="/calculators/money" className="hover:text-[#19E3D0] transition-colors">
                  Money & Progression Tool
                </Link>
              </li>
              <li>
                <Link to="/calculators/loadout" className="hover:text-[#19E3D0] transition-colors">
                  Loadout Stats Builder
                </Link>
              </li>
              <li>
                <Link to="/calculators/compare" className="hover:text-[#19E3D0] transition-colors">
                  Vehicle Showdown Tool
                </Link>
              </li>
              <li>
                <Link to="/status" className="hover:text-[#19E3D0] transition-colors">
                  Server & Cloud Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Database & Legal Links */}
          <div className="space-y-3">
            <h4 className="font-['Orbitron'] text-xs font-semibold uppercase tracking-wider text-white">
              Data & Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/database/vehicles" className="hover:text-[#FF7A18] transition-colors">
                  Vehicle Catalog
                </Link>
              </li>
              <li>
                <Link to="/database/weapons" className="hover:text-[#FF7A18] transition-colors">
                  Weapons & Armory
                </Link>
              </li>
              <li>
                <Link to="/database/properties" className="hover:text-[#FF7A18] transition-colors">
                  Real Estate & Safehouses
                </Link>
              </li>
              <li>
                <Link to="/guides" className="hover:text-[#FF7A18] transition-colors">
                  Preload & Setup Guides
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FF7A18] transition-colors">
                  About Project
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FF7A18] transition-colors">
                  Contact & Suggestions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#FF7A18] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#FF7A18] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-[#FF7A18] transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter Email Signup */}
          <div className="space-y-3">
            <h4 className="font-['Orbitron'] text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#FF2E93]" />
              <span>Vice City Wire</span>
            </h4>
            <p className="text-xs text-[#B9A6D4] leading-relaxed">
              Get notified immediately when new map locations, patch notes, or launch dates drop. No spam.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-[#19E3D0]/10 border border-[#19E3D0]/40 text-xs text-[#19E3D0] flex items-center gap-2 animate-in fade-in">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>You&apos;re subscribed to Vice City Wire! Welcome aboard.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-[#B9A6D4]/40 focus:border-[#FF2E93] focus:outline-none transition-all pr-10"
                    aria-label="Email address for Vice Tools newsletter"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-[#FF2E93] text-white hover:bg-[#FF7A18] transition-all cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                {error && <p className="text-[11px] text-[#FF2E93] font-mono">{error}</p>}
                <p className="text-[10px] text-[#B9A6D4]/50">
                  Unsubscribe anytime. We protect your inbox.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* MANDATORY DISCLAIMER TEXT (ALWAYS VISIBLE) */}
        <div className="pt-8 text-center sm:text-left">
          <div className="p-4 rounded-xl bg-[#150A24] border border-[#FF2E93]/20 text-xs text-[#B9A6D4]/80 leading-relaxed font-mono">
            <p className="font-semibold text-white/90 mb-1">LEGAL & TRADEMARK DISCLAIMER</p>
            <p>{SITE_CONFIG.disclaimer}</p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#B9A6D4]/50 gap-4">
            <p>© {new Date().getFullYear()} VICE TOOLS. All original content, calculators, and design licensed for community use.</p>
            <p className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-[#FF2E93] fill-current" /> for the GTA community.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
