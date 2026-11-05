import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShieldCheck, Heart, Sparkles, MapPin, Calculator, Users } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { SITE_CONFIG } from '../../config/site';

export function AboutPage() {
  return (
    <>
      <SEO
        title="About Vice Tools | GTA 6 Unofficial Companion Mission"
        description="Learn about the origin, principles, and community team behind Vice Tools, the premier fan-built GTA 6 companion toolkit."
        canonical="/about"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-xs font-mono text-[#B9A6D4]/70 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-[#FF2E93]">About</span>
        </nav>

        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#150A24] border border-[#FF2E93]/40 text-xs font-mono text-[#FF2E93] mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>COMMUNITY ORIGIN & MANIFESTO</span>
          </div>
          <h1 className="font-['Orbitron'] font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            About <span className="gradient-sunset-text">Vice Tools</span>
          </h1>
          <p className="mt-4 text-base text-[#B9A6D4] leading-relaxed">
            Vice Tools is an independent, community-driven digital companion forged to help Grand Theft Auto VI players master the criminal underworld of Vice City and the untamed wilds of Leonida.
          </p>
        </header>

        <div className="p-8 rounded-3xl bg-[#150A24] border border-white/10 shadow-xl space-y-6 text-sm text-[#B9A6D4] leading-relaxed">
          <h2 className="font-['Orbitron'] font-bold text-xl text-white">Our Mission</h2>
          <p>
            When Grand Theft Auto VI arrives, the scale of Leonida will surpass any sandbox previously created. Finding hidden contraband, computing realistic progression grind hours, fine-tuning weapon loadouts, and tracking server connectivity shouldn&apos;t require flipping through endless disjointed forum threads. Vice Tools was created to provide a centralized, responsive, lightning-fast suite that runs flawlessly on both desktop battle stations and mobile smartphones.
          </p>

          <h2 className="font-['Orbitron'] font-bold text-xl text-white pt-4 border-t border-white/5">
            Strict Originality & Trademark Respect
          </h2>
          <p>
            Vice Tools is an entirely fan-crafted creation. We do NOT use any official Rockstar Games logos, trademarked typography, copyrighted art, or proprietary game files. Every silhouette, CSS gradient, SVG illustration, and algorithm is created in-house by passionate gaming enthusiasts. We proudly respect intellectual property rights and operate under standard fair-use analytical gaming guidelines.
          </p>

          <h2 className="font-['Orbitron'] font-bold text-xl text-white pt-4 border-t border-white/5">
            Core Design Principles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <Sparkles className="w-5 h-5 text-[#FF2E93] mb-2" />
              <h3 className="font-semibold text-white">Zero Slop</h3>
              <p className="text-xs text-[#B9A6D4]/70 mt-1">
                No intrusive popups, forced logins, or telemetry surveillance. Pure tools designed by players.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <Calculator className="w-5 h-5 text-[#FF7A18] mb-2" />
              <h3 className="font-semibold text-white">Mathematical Truth</h3>
              <p className="text-xs text-[#B9A6D4]/70 mt-1">
                Every calculation and telemetry stat is mathematically verifiable with transparent parameters.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <ShieldCheck className="w-5 h-5 text-[#19E3D0] mb-2" />
              <h3 className="font-semibold text-white">Clear Disclosures</h3>
              <p className="text-xs text-[#B9A6D4]/70 mt-1">
                We clearly label unconfirmed leaks versus verified official releases so you never get misled.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex items-center justify-between">
            <span className="font-mono text-xs text-[#B9A6D4]">Have a suggestion or bug report?</span>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF2E93] to-[#FF7A18] text-white font-mono text-xs font-bold"
            >
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
