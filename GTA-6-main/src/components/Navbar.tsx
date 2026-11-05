import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Map, Calculator, Database, Activity, BookOpen, Home, ChevronRight, Compass } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface NavbarProps {
  onOpenSearch: () => void;
}

export function Navbar({ onOpenSearch }: NavbarProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Map', path: '/map', icon: Map },
    { name: 'Calculators', path: '/calculators', icon: Calculator },
    { name: 'Database', path: '/database', icon: Database },
    { name: 'Status', path: '/status', icon: Activity },
    { name: 'Guides', path: '/guides', icon: BookOpen },
  ];

  const closeDrawer = () => setMobileDrawerOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0B0614]/85 backdrop-blur-xl border-b border-[#FF2E93]/20 shadow-lg shadow-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo Wordmark */}
          <Link
            to="/"
            onClick={closeDrawer}
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Vice Tools Home"
          >
            {/* Retro Neon Emblem */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF2E93] via-[#FF7A18] to-[#FFC857] p-[1.5px] shadow-md shadow-[#FF2E93]/30 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#150A24] rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-[#FF2E93] group-hover:rotate-45 transition-transform duration-300" />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-['Orbitron'] font-black text-xl sm:text-2xl tracking-wider gradient-sunset-text leading-none">
                {SITE_CONFIG.name}
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#B9A6D4] uppercase -mt-0.5">
                GTA 6 COMPANION
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#FF2E93]/20 text-white border border-[#FF2E93]/50 shadow-sm shadow-[#FF2E93]/20'
                      : 'text-[#B9A6D4] hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <item.icon className="w-4 h-4 text-[#FF2E93]" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons (Search + Mobile Toggle) */}
          <div className="flex items-center gap-2">
            {/* Search Trigger Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-[#FF2E93]/15 hover:border-[#FF2E93]/40 text-[#B9A6D4] hover:text-white transition-all text-xs font-mono min-h-[44px] cursor-pointer"
              aria-label="Open search modal (Cmd+K)"
            >
              <Search className="w-4 h-4 text-[#FF2E93]" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] text-[#B9A6D4]/70 bg-white/5 rounded border border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Hamburger Drawer Trigger */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="md:hidden p-2.5 rounded-xl border border-white/10 text-[#B9A6D4] hover:text-white hover:bg-white/5 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6 text-[#FF2E93]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Slide-in Drawer */}
      {mobileDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 md:hidden bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200"
        >
          <div
            className="w-4/5 max-w-sm h-full bg-[#150A24] border-l border-[#FF2E93]/30 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF2E93] to-[#FF7A18] flex items-center justify-center">
                    <Compass className="w-4 h-4 text-[#150A24]" />
                  </div>
                  <span className="font-['Orbitron'] font-bold text-lg gradient-sunset-text">
                    VICE TOOLS
                  </span>
                </div>
                <button
                  onClick={closeDrawer}
                  className="p-2 rounded-lg text-[#B9A6D4] hover:text-white hover:bg-white/10 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-2">
                {navLinks.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={closeDrawer}
                      className={`flex items-center justify-between p-3.5 rounded-xl font-medium text-base transition-all ${
                        isActive
                          ? 'bg-[#FF2E93]/20 text-white border border-[#FF2E93]/50'
                          : 'text-[#B9A6D4] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-[#FF2E93]" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </Link>
                  );
                })}
              </div>

              {/* Quick links to calculators */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-xs font-mono font-semibold text-[#FF7A18] uppercase tracking-wider mb-3">
                  Quick Calculators
                </h4>
                <div className="space-y-1.5 text-sm">
                  <Link
                    to="/calculators/money"
                    onClick={closeDrawer}
                    className="block p-2 rounded-lg text-[#B9A6D4] hover:text-[#19E3D0] hover:bg-white/5 transition-colors"
                  >
                    💰 Money & Grind Calculator
                  </Link>
                  <Link
                    to="/calculators/loadout"
                    onClick={closeDrawer}
                    className="block p-2 rounded-lg text-[#B9A6D4] hover:text-[#19E3D0] hover:bg-white/5 transition-colors"
                  >
                    🎯 Loadout Radar Builder
                  </Link>
                  <Link
                    to="/calculators/compare"
                    onClick={closeDrawer}
                    className="block p-2 rounded-lg text-[#B9A6D4] hover:text-[#19E3D0] hover:bg-white/5 transition-colors"
                  >
                    🏎️ Vehicle Side-by-Side Comparison
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom info */}
            <div className="pt-6 border-t border-white/10 text-xs text-[#B9A6D4]/70">
              <p>Unofficial community project.</p>
              <p className="mt-1 font-mono text-[10px]">v1.0.0-preview</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
