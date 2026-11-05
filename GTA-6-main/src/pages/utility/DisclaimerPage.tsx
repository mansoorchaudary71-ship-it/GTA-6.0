import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Info, CheckCircle2, HelpCircle } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { SITE_CONFIG } from '../../config/site';

export function DisclaimerPage() {
  return (
    <>
      <SEO
        title="Legal Disclaimer & Trademark Disclosures | Vice Tools"
        description="Official legal disclaimer: Vice Tools is an unofficial fan-made project independent of Rockstar Games and Take-Two Interactive."
        canonical="/disclaimer"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-xs font-mono text-[#B9A6D4]/70 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-[#FF2E93]">Disclaimer</span>
        </nav>

        <header className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#150A24] border border-[#FF2E93]/40 text-xs font-mono text-[#FF2E93] mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>LEGAL & TRADEMARK ADVISORY</span>
          </div>
          <h1 className="font-['Orbitron'] font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            Legal <span className="text-[#FF2E93]">Disclaimer</span>
          </h1>
          <p className="mt-2 text-sm text-[#B9A6D4]">
            Important disclosures regarding trademarks, copyright boundaries, and speculative game data.
          </p>
        </header>

        <div className="space-y-6">
          {/* Highlighted primary statement */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1E1033] via-[#2A0F4A] to-[#150A24] border border-[#FF2E93]/50 shadow-2xl space-y-3 font-mono text-sm leading-relaxed text-white">
            <div className="text-xs uppercase font-bold text-[#FF2E93] tracking-widest flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              <span>Mandatory Fan Disclosure</span>
            </div>
            <p className="text-base text-[#FFF5FB]">
              {SITE_CONFIG.disclaimer}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#150A24] border border-white/10 shadow-xl space-y-6 text-sm text-[#B9A6D4] leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-['Orbitron'] font-bold text-lg text-white">Trademark Information</h2>
              <p>
                &quot;Grand Theft Auto&quot;, &quot;GTA VI&quot;, &quot;Rockstar Games&quot;, and related names, logos, and emblems are registered trademarks of Take-Two Interactive Software, Inc. and its subsidiaries. Any use of these marks on Vice Tools is strictly for identification, commentary, and news reporting under nominative fair-use principles.
              </p>
            </section>

            <section className="space-y-2 pt-4 border-t border-white/5">
              <h2 className="font-['Orbitron'] font-bold text-lg text-white">Confirmed vs Unconfirmed Indicators</h2>
              <p>
                To maintain transparency with the player community, Vice Tools strictly badges all catalog entries:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-[#19E3D0]/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#19E3D0]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>CONFIRMED</span>
                  </div>
                  <p className="text-xs text-[#B9A6D4]">
                    Item or coordinate has been officially shown in trailer footage, developer blogs, press announcements, or rating board summaries.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-[#FFC857]/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FFC857]">
                    <HelpCircle className="w-4 h-4" />
                    <span>UNCONFIRMED</span>
                  </div>
                  <p className="text-xs text-[#B9A6D4]">
                    Item, vehicle speed, or coordinate is based on community research, historical engine patterns, or leaks. May differ in the launch build.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-2 pt-4 border-t border-white/5">
              <h2 className="font-['Orbitron'] font-bold text-lg text-white">No Game Assets or Ripped Files</h2>
              <p>
                Vice Tools is hosted entirely on original code. We do not extract, decompile, or host copyrighted binary game files, proprietary sound files, or original textures. All visual graphics are original SVG vector silhouettes, CSS gradients, or public font libraries.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
