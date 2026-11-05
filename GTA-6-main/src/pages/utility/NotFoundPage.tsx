import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Home, ArrowLeft, AlertTriangle } from 'lucide-react';
import { SEO } from '../../components/SEO';

export function NotFoundPage() {
  return (
    <>
      <SEO
        title="404 | Lost in the City"
        description="The requested Vice Tools sector cannot be found. Navigate back to the safehouse."
      />

      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 text-center relative overflow-hidden">
        {/* Neon Backdrop Glow */}
        <div className="absolute w-96 h-96 rounded-full bg-[#FF2E93]/15 blur-3xl pointer-events-none" />

        {/* WASTED-INSPIRED ORIGINAL BANNER */}
        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#150A24] border border-[#FF2E93]/50 text-xs font-mono uppercase tracking-widest text-[#FF2E93] glow-pink-sm">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>NAVIGATION DRIFT • SECTOR UNMAPPED</span>
          </div>

          {/* Big Neon 404 */}
          <div className="font-['Space_Mono'] font-extrabold text-7xl sm:text-9xl text-white tracking-widest drop-shadow-[0_0_35px_rgba(255,46,147,0.7)] animate-pulse">
            404
          </div>

          <div className="p-4 rounded-2xl bg-[#150A24]/90 border border-[#FF2E93]/40 backdrop-blur-md">
            <h1 className="font-['Orbitron'] font-black text-2xl sm:text-3xl text-white uppercase tracking-wider gradient-sunset-text">
              LOST IN THE CITY
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#B9A6D4] leading-relaxed">
              You took a wrong turn off the expressway into uncharted Everglades waters. The street address you dialed does not exist on the Leonida transit grid.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF2E93] to-[#FF7A18] text-white font-['Orbitron'] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#FF2E93]/40 hover:brightness-110 active:scale-95 transition-all min-h-[44px]"
            >
              <Home className="w-4 h-4" />
              <span>Back to Safehouse</span>
            </Link>

            <Link
              to="/map"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#150A24] hover:bg-[#1E1033] border border-[#19E3D0]/40 text-[#19E3D0] font-mono text-xs font-bold transition-all min-h-[44px]"
            >
              <MapPin className="w-4 h-4" />
              <span>Open City Map</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
