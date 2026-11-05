import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { SEO } from '../../components/SEO';

export function TermsPage() {
  return (
    <>
      <SEO
        title="Terms of Service | Vice Tools"
        description="Terms of service and acceptable use agreement for Vice Tools companion toolkit."
        canonical="/terms"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-xs font-mono text-[#B9A6D4]/70 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-[#FF7A18]">Terms of Service</span>
        </nav>

        <header className="mb-8">
          <h1 className="font-['Orbitron'] font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            Terms of <span className="text-[#FF7A18]">Service</span>
          </h1>
          <p className="mt-2 text-xs font-mono text-[#B9A6D4]">
            Effective Date: November 4, 2026
          </p>
        </header>

        <div className="p-8 rounded-3xl bg-[#150A24] border border-white/10 shadow-xl space-y-6 text-sm text-[#B9A6D4] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-['Orbitron'] font-bold text-lg text-white">1. Agreement to Terms</h2>
            <p>
              By accessing and utilizing Vice Tools (&quot;vicetools.app&quot;), you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree with these provisions, you should immediately cease use of the site.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-white/5">
            <h2 className="font-['Orbitron'] font-bold text-lg text-white">2. Intellectual Property Rights & Fair Use</h2>
            <p>
              All original visual styling, CSS animations, JavaScript calculation models, and written guides created by Vice Tools are licensed for public community reference. You may not scrape, mirror, or repackage our interactive calculators for commercial re-sale without prior written consent.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-white/5">
            <h2 className="font-['Orbitron'] font-bold text-lg text-white">3. Disclaimers of Accuracy</h2>
            <p>
              Pre-release data, including unconfirmed map locations, vehicle speeds, and weapon stats, are compiled from analytical estimates and leaks. Vice Tools makes no express guarantee that all speculative data points will match final release software.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-white/5">
            <h2 className="font-['Orbitron'] font-bold text-lg text-white">4. Limitation of Liability</h2>
            <p>
              Vice Tools and its contributors are not liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our tools or calculators.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
