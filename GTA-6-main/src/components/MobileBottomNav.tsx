import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Home, Map, Calculator, Database, MoreHorizontal, Activity, BookOpen, Info, Shield, HelpCircle, X } from 'lucide-react';

export function MobileBottomNav() {
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();

  const tabs = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Map', path: '/map', icon: Map },
    { name: 'Tools', path: '/calculators', icon: Calculator },
    { name: 'Database', path: '/database', icon: Database },
  ];

  return (
    <>
      {/* Mobile Tab Bar */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B0614]/95 backdrop-blur-xl border-t border-[#FF2E93]/20 md:hidden pb-safe"
      >
        <div className="grid grid-cols-5 h-16">
          {tabs.map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                  isActive
                    ? 'text-[#FF2E93] font-semibold'
                    : 'text-[#B9A6D4] hover:text-white'
                }`
              }
            >
              <tab.icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-mono tracking-tight">{tab.name}</span>
            </NavLink>
          ))}

          {/* More Sheet Trigger */}
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
              moreOpen || ['/status', '/guides', '/about'].includes(location.pathname)
                ? 'text-[#FF2E93] font-semibold'
                : 'text-[#B9A6D4] hover:text-white'
            }`}
            aria-label="More navigation items"
          >
            <MoreHorizontal className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-mono tracking-tight">More</span>
          </button>
        </div>
      </nav>

      {/* More Options Modal / Bottom Sheet */}
      {moreOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 md:hidden bg-black/70 backdrop-blur-sm flex items-end animate-in fade-in duration-200"
          onClick={() => setMoreOpen(false)}
        >
          <div
            className="w-full bg-[#150A24] border-t border-[#FF2E93]/40 rounded-t-3xl p-6 pb-24 shadow-2xl animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <span className="font-['Orbitron'] font-bold text-base text-white">
                ADDITIONAL TOOLS & PAGES
              </span>
              <button
                onClick={() => setMoreOpen(false)}
                className="p-1.5 rounded-lg text-[#B9A6D4] hover:text-white hover:bg-white/10 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/status"
                onClick={() => setMoreOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-[#FF2E93]/15 border border-white/5 hover:border-[#FF2E93]/40 transition-all text-sm text-white"
              >
                <Activity className="w-5 h-5 text-[#19E3D0]" />
                <div>
                  <div className="font-semibold">Server Status</div>
                  <div className="text-[11px] text-[#B9A6D4]">Network ping</div>
                </div>
              </Link>

              <Link
                to="/guides"
                onClick={() => setMoreOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-[#FF2E93]/15 border border-white/5 hover:border-[#FF2E93]/40 transition-all text-sm text-white"
              >
                <BookOpen className="w-5 h-5 text-[#FF7A18]" />
                <div>
                  <div className="font-semibold">Guides & FAQ</div>
                  <div className="text-[11px] text-[#B9A6D4]">Preload & tips</div>
                </div>
              </Link>

              <Link
                to="/about"
                onClick={() => setMoreOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-[#FF2E93]/15 border border-white/5 hover:border-[#FF2E93]/40 transition-all text-sm text-white"
              >
                <Info className="w-5 h-5 text-[#FFC857]" />
                <div>
                  <div className="font-semibold">About Us</div>
                  <div className="text-[11px] text-[#B9A6D4]">Project origin</div>
                </div>
              </Link>

              <Link
                to="/disclaimer"
                onClick={() => setMoreOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-[#FF2E93]/15 border border-white/5 hover:border-[#FF2E93]/40 transition-all text-sm text-white"
              >
                <Shield className="w-5 h-5 text-[#B9A6D4]" />
                <div>
                  <div className="font-semibold">Disclaimer</div>
                  <div className="text-[11px] text-[#B9A6D4]">Unofficial info</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
