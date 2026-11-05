import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { SEO } from '../../components/SEO';

export function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy | Vice Tools"
        description="Vice Tools privacy policy: local storage of markers, absence of invasive tracking, and community telemetry disclosures."
        canonical="/privacy"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-xs font-mono text-[#B9A6D4]/70 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-[#19E3D0]">Privacy Policy</span>
        </nav>

        <header className="mb-8">
          <h1 className="font-['Orbitron'] font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            Privacy <span className="text-[#19E3D0]">Policy</span>
          </h1>
          <p className="mt-2 text-xs font-mono text-[#B9A6D4]">
            Effective Date: November 4, 2026 • Last Reviewed: November 2026
          </p>
        </header>

        <div className="p-8 rounded-3xl bg-[#150A24] border border-white/10 shadow-xl space-y-6 text-sm text-[#B9A6D4] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-['Orbitron'] font-bold text-lg text-white">1. Information We Store Locally</h2>
            <p>
              Vice Tools operates primarily as a client-side web application. Your discovered map coordinates, custom weapon loadout presets, and money calculator goals are stored directly inside your web browser using HTML5 <code>localStorage</code>. This data never traverses or resides on external database servers unless you explicitly choose to export the JSON payload.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-white/5">
            <h2 className="font-['Orbitron'] font-bold text-lg text-white">2. Cookies and Consent</h2>
            <p>
              We use minimal, non-invasive cookies solely to remember your UI display preferences (such as dismissing banner notices or saving your cookie acknowledgment). You may clear these cookies at any point via your browser settings or using the Reset button in our tools.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-white/5">
            <h2 className="font-['Orbitron'] font-bold text-lg text-white">3. Third-Party Analytics & Advertising</h2>
            <p>
              To maintain our free infrastructure, we may utilize privacy-respecting aggregate analytics tools to monitor general page performance and server ping latency. If third-party advertising slots are served, standard anonymous ad tags may be set by authorized advertising exchanges in compliance with global privacy regulations (GDPR, CCPA).
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-white/5">
            <h2 className="font-['Orbitron'] font-bold text-lg text-white">4. Contacting Us Regarding Data</h2>
            <p>
              If you have any questions or data inquiries regarding this policy, please dispatch a message through our <Link to="/contact" className="text-[#19E3D0] underline hover:text-white">Contact Page</Link>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
