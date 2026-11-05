import { Link } from 'react-router-dom';
import { Coins, Crosshair, Car, ArrowRight, Sparkles, TrendingUp, Cpu } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { AdSlot } from '../../components/AdSlot';
import { FAQSection, FAQItem, buildFaqPageSchema } from '../../components/FAQSection';

export function CalculatorsHub() {
  const calculatorHubFaqs: FAQItem[] = [
    {
      id: 'faq-hub-1',
      question: 'Are the Vice Tools GTA 6 calculators free to use?',
      answer: 'Yes, all Vice Tools calculators, simulators, and progression estimators are 100% free with no account creation or subscription required.',
      status: 'confirmed'
    },
    {
      id: 'faq-hub-2',
      question: 'How accurate are the monetary grind and time calculations?',
      answer: 'Our mathematical models reflect verified franchise baseline payouts, heist cycle benchmarks, and published industry data. All parameters can be customized to match your crew\'s exact hourly yield.',
      status: 'confirmed'
    },
    {
      id: 'faq-hub-3',
      question: 'Is my progression and custom loadout data saved across sessions?',
      answer: 'Yes. All active targets, custom weapon presets, and comparison vehicles are saved locally in your browser storage (HTML5 localStorage), keeping your data persistent and private.',
      status: 'confirmed'
    },
    {
      id: 'faq-hub-4',
      question: 'Can I share my vehicle showdowns and custom loadouts with friends?',
      answer: 'Yes! Our calculators automatically encode your selected loadouts and vehicle parameters directly into shareable permalink URLs for instant squad collaboration.',
      status: 'confirmed'
    },
    {
      id: 'faq-hub-5',
      question: 'Will these calculators be updated when GTA 6 officially launches?',
      answer: 'Absolutely. Within hours of title release, all sticker prices, vehicle top speeds, and weapon damage charts will be updated to match the launch patch telemetry.',
      status: 'confirmed'
    }
  ];

  const faqSchema = buildFaqPageSchema(calculatorHubFaqs);

  const tools = [
    {
      id: 'money',
      title: 'Money & Grind Calculator',
      description: 'Model your criminal empire finances. Compute active gameplay hours, daily milestones, and projected compound savings to purchase high-end villas, hypercars, and contraband enterprises.',
      path: '/calculators/money',
      icon: Coins,
      badge: 'Economy',
      badgeColor: '#FF7A18',
      features: ['Multi-goal tracking', 'Interactive timeline chart', 'Database item picker', 'Export targets']
    },
    {
      id: 'loadout',
      title: 'Loadout Radar Builder',
      description: 'Engineer and balance up to 6 tactical weapon slots. Analyze overall combat synergy across damage, effective range, fire rate, accuracy, and mobility on an interactive radar polygon.',
      path: '/calculators/loadout',
      icon: Crosshair,
      badge: 'Armory',
      badgeColor: '#FF2E93',
      features: ['Radar stat visualization', 'Total weapon expenditure', 'Shareable URL permalinks', 'Local build presets']
    },
    {
      id: 'compare',
      title: 'Vehicle Showdown Comparison',
      description: 'Benchmark up to 4 ground, sea, and air machines side-by-side. Compare top speeds, 0-60 acceleration ratings, chassis handling, braking efficiency, and dollar-per-stat value.',
      path: '/calculators/compare',
      icon: Car,
      badge: 'Motorsports',
      badgeColor: '#19E3D0',
      features: ['Head-to-head stat bars', 'Automated winner highlights', 'Class filters', 'Price-to-speed ratio']
    }
  ];

  return (
    <>
      <SEO
        title="GTA 6 Calculators & Optimization Tools"
        description="Comprehensive GTA 6 tools: Money & Grind Calculator, Loadout Radar Builder, and Vehicle Showdown comparison tool."
        canonical="/calculators"
        schema={faqSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#150A24] border border-[#FF2E93]/40 text-xs font-mono uppercase tracking-widest text-[#19E3D0] mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#19E3D0]" />
            <span>ALGORITHMIC GAMEPLAY ENGINES</span>
          </div>

          <h1 className="font-['Orbitron'] font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Tactical & Economy <span className="gradient-sunset-text">Calculators</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#B9A6D4] leading-relaxed">
            Eliminate guesswork from your progression. Our specialized simulation suites translate in-game stats, market values, and weapon attributes into actionable launch strategies.
          </p>
        </div>

        {/* Ad Slot */}
        <AdSlot size="leaderboard" label="Sponsored Calculator Suite" className="mb-10" />

        {/* Tools Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="rounded-3xl p-8 bg-gradient-to-b from-[#1E1033] to-[#150A24] border border-[#FF2E93]/20 hover:border-[#FF2E93] transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF2E93]/20 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#FF2E93] flex items-center justify-center transition-all">
                    <tool.icon className="w-7 h-7 text-[#FF2E93] group-hover:scale-110 transition-transform" />
                  </div>
                  <span
                    className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-current/30"
                    style={{ color: tool.badgeColor }}
                  >
                    {tool.badge}
                  </span>
                </div>

                <h2 className="font-['Orbitron'] font-bold text-xl text-white group-hover:text-[#FF7A18] transition-colors mb-3">
                  {tool.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#B9A6D4] leading-relaxed mb-6">
                  {tool.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 pt-4 border-t border-white/5 mb-6">
                  {tool.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs font-mono text-[#B9A6D4]/80">
                      <Sparkles className="w-3 h-3 text-[#19E3D0]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={tool.path}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF2E93] to-[#FF7A18] text-white font-['Orbitron'] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#FF2E93]/30 hover:brightness-110 active:scale-95 transition-all min-h-[44px]"
              >
                <span>Launch {tool.title.split(' ')[0]} Tool</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Informational SEO text block */}
        <div className="p-8 rounded-3xl bg-[#150A24] border border-white/5 text-xs sm:text-sm text-[#B9A6D4] leading-relaxed space-y-4 mb-16">
          <h3 className="font-['Orbitron'] font-bold text-base text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#19E3D0]" />
            <span>Why Progression Planning Matters in Vice City</span>
          </h3>
          <p>
            Grand Theft Auto VI introduces an intricate, responsive game economy that mirrors the bustling commerce of sunny Florida. From waterfront villas on Starfish Island to deep-water cigarette boats and customized high-caliber weaponry, purchasing end-game assets requires disciplined cash management. Rather than burning hours on low-yield activities, our calculators allow you to model realistic hourly yields, project day-to-day capital growth, and evaluate whether a fast sports classic or an executive chopper delivers superior tactical return on investment.
          </p>
          <p>
            All mathematical parameters across our calculator modules are client-side only. Your saved goals, builds, and custom comparisons are cached directly inside your browser storage, meaning your session data never leaves your device and remains completely private.
          </p>
        </div>

        {/* FAQ ACCORDION & SCHEMA.ORG JSON-LD */}
        <FAQSection
          items={calculatorHubFaqs}
          title="Calculators & Tooling FAQ"
          subtitle="Everything you need to know about our algorithms, local persistence, and accuracy."
          badge="Calculator Intel"
          badgeColor="#19E3D0"
          className="mb-8"
          renderJsonLd={false}
        />
      </div>
    </>
  );
}
