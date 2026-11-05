import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Calculator, 
  Car, 
  Shield, 
  Building, 
  Activity, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  Flame, 
  ChevronDown, 
  ChevronUp, 
  HardDriveDownload,
  Crosshair,
  Coins
} from 'lucide-react';

import { SEO } from '../components/SEO';
import { RetroSun } from '../components/RetroSun';
import { CountdownTimer } from '../components/CountdownTimer';
import { AdSlot } from '../components/AdSlot';
import { BadgeStatus } from '../components/BadgeStatus';
import { FAQSection, buildFaqPageSchema } from '../components/FAQSection';

import updatesData from '../data/updates.json';
import faqsData from '../data/faqs.json';

export function Home() {
  // Tool cards definition
  const tools = [
    {
      title: 'Interactive Leonida Map',
      description: 'Explore verified coordinates, collectible caches, fast travel hubs, and safehouses with custom progress tracking.',
      icon: MapPin,
      badge: 'Interactive',
      badgeColor: '#19E3D0',
      link: '/map',
      accent: 'from-[#19E3D0]/20 to-[#FF2E93]/10'
    },
    {
      title: 'Money & Grind Calculator',
      description: 'Calculate real-time gameplay hours, hourly revenue, and savings curves required to purchase supercars and luxury penthouses.',
      icon: Coins,
      badge: 'Popular',
      badgeColor: '#FF7A18',
      link: '/calculators/money',
      accent: 'from-[#FF7A18]/20 to-[#FFC857]/10'
    },
    {
      title: 'Loadout Radar Builder',
      description: 'Assemble tactical weapon builds, compare damage, range, and fire rate stats on a dynamic radar chart, and share custom URLs.',
      icon: Crosshair,
      badge: 'Utility',
      badgeColor: '#FF2E93',
      link: '/calculators/loadout',
      accent: 'from-[#FF2E93]/20 to-[#D81B9A]/10'
    },
    {
      title: 'Vehicle Showdown & Catalog',
      description: 'Exotic supercars, vintage convertibles, and Everglades airboats with top speed and acceleration comparisons.',
      icon: Car,
      badge: 'Database',
      badgeColor: '#FFC857',
      link: '/database/vehicles',
      accent: 'from-[#FFC857]/20 to-[#FF7A18]/10'
    },
    {
      title: 'Weapons & Armory Directory',
      description: 'In-depth ballistics, damage per shot, rate of fire, magazine limits, and attachment specs for handguns, rifles, and shotguns.',
      icon: Shield,
      badge: 'Database',
      badgeColor: '#FF2E93',
      link: '/database/weapons',
      accent: 'from-[#FF2E93]/20 to-[#6B2FD6]/10'
    },
    {
      title: 'Real Estate & Properties',
      description: 'Mansions on Starfish Island, high-rise penthouses, chop shops, and contraband warehouses with estimated hourly cash yields.',
      icon: Building,
      badge: 'Database',
      badgeColor: '#19E3D0',
      link: '/database/properties',
      accent: 'from-[#19E3D0]/20 to-[#FF7A18]/10'
    },
    {
      title: 'Server & Network Status',
      description: 'Real-time uptime monitors for PlayStation Network, Xbox Live, and Vice Online server infrastructure with 24-hour latency logs.',
      icon: Activity,
      badge: 'Live Status',
      badgeColor: '#19E3D0',
      link: '/status',
      accent: 'from-[#19E3D0]/20 to-[#150A24]'
    },
    {
      title: 'Install Size & Preload Guide',
      description: 'Prepare your console storage with projected 180 GB footprint analyses, SSD benchmarks, and unlock schedule projections.',
      icon: HardDriveDownload,
      badge: 'Guide',
      badgeColor: '#FF7A18',
      link: '/guides/gta-6-install-size-and-preload-guide',
      accent: 'from-[#FF7A18]/20 to-[#6B2FD6]/10'
    }
  ];

  const faqSchema = buildFaqPageSchema(faqsData);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'VICE TOOLS',
    url: 'https://vicetools.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://vicetools.app/database?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      <SEO
        title="Your GTA 6 Toolkit | Interactive Map & Calculators"
        description="The ultimate GTA 6 companion toolkit. Interactive map, money progression calculator, loadout radar, vehicle stats, server status, and release guides."
        canonical="/"
        schema={[websiteSchema, faqSchema]}
      />

      <div className="relative overflow-hidden">
        {/* HERO SECTION */}
        <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden">
          {/* Neon Horizon Visual Component */}
          <RetroSun className="mb-2" />

          {/* Hero Content */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 -mt-10 sm:-mt-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#150A24]/90 border border-[#FF2E93]/40 text-xs font-mono uppercase tracking-widest text-[#FFF5FB] mb-6 glow-pink-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#FFC857]" />
              <span>THE ULTIMATE GTA 6 COMPANION TOOLKIT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#19E3D0] animate-ping" />
            </div>

            <h1 className="font-['Orbitron'] font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase drop-shadow-[0_4px_20px_rgba(255,46,147,0.35)]">
              Your <span className="gradient-sunset-text">GTA 6</span> Toolkit
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-xl text-[#B9A6D4] max-w-2xl mx-auto leading-relaxed font-light">
              Master the neon streets of Vice City and the wetlands of Leonida. Interactive maps, real-time progression calculators, ballistic databases, and live server status.
            </p>

            {/* Hero Action CTA Buttons (Min 44px height for touch) */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/map"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-['Orbitron'] font-bold text-sm tracking-wider uppercase text-white bg-gradient-to-r from-[#FF2E93] via-[#FF7A18] to-[#FFC857] shadow-lg shadow-[#FF2E93]/40 hover:shadow-xl hover:shadow-[#FF2E93]/60 hover:scale-105 active:scale-95 transition-all min-h-[48px] cursor-pointer"
              >
                <MapPin className="w-5 h-5 text-white" />
                <span>Open Map</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <Link
                to="/calculators"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-['Orbitron'] font-bold text-sm tracking-wider uppercase text-white bg-[#150A24] border border-[#FF2E93]/40 hover:border-[#19E3D0] hover:text-[#19E3D0] hover:bg-[#1E1033] transition-all min-h-[48px] cursor-pointer"
              >
                <Calculator className="w-5 h-5 text-[#FF7A18]" />
                <span>Browse Tools</span>
              </Link>
            </div>

            {/* LIVE COUNTDOWN TO RELEASE */}
            <CountdownTimer />
          </div>
        </section>

        {/* AD SLOT 1: Below Hero */}
        <section className="max-w-7xl mx-auto px-4">
          <AdSlot size="leaderboard" label="Sponsored Partner" />
        </section>

        {/* SECTION: TOOL GRID */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#19E3D0] mb-2">
              <Flame className="w-4 h-4 text-[#FF7A18]" />
              <span>COMMAND CENTER</span>
            </div>
            <h2 className="font-['Orbitron'] font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
              Essential Companion Tools
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#B9A6D4]">
              Engineered with zero fluff. Every utility you need to navigate Leonida and conquer the Vice City criminal ladder.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.title}
                to={tool.link}
                className="group relative rounded-2xl p-6 bg-gradient-to-b from-[#1E1033] to-[#150A24] border border-[#FF2E93]/20 hover:border-[#FF2E93] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF2E93]/20 flex flex-col justify-between"
              >
                {/* Neon glow hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#FF2E93]/60 flex items-center justify-center transition-colors">
                      <tool.icon className="w-6 h-6 text-[#FF2E93] group-hover:scale-110 transition-transform" />
                    </div>
                    <span
                      className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-current/30"
                      style={{ color: tool.badgeColor }}
                    >
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="font-['Orbitron'] font-bold text-lg text-white group-hover:text-[#FF7A18] transition-colors mb-2">
                    {tool.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#B9A6D4] leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono font-medium text-[#19E3D0] group-hover:translate-x-1 transition-transform">
                  <span>Launch Tool</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* AD SLOT 2: Mid Content */}
        <section className="max-w-7xl mx-auto px-4">
          <AdSlot size="banner" label="Sponsored Content" />
        </section>

        {/* SECTION: LATEST UPDATES (FROM JSON) */}
        <section className="py-16 bg-[#150A24]/40 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#FF7A18]">
                  Community Radar
                </span>
                <h2 className="font-['Orbitron'] font-extrabold text-2xl sm:text-3xl text-white mt-1 uppercase">
                  Latest Updates & Intel
                </h2>
              </div>
              <Link
                to="/guides"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#19E3D0] hover:underline"
              >
                <span>View all guides</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {updatesData.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl p-6 bg-[#150A24] border border-[#FF2E93]/20 hover:border-[#19E3D0]/60 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#B9A6D4]/70 mb-3">
                      <span className="text-[#FF2E93] font-semibold">{item.category}</span>
                      <span>{item.date}</span>
                    </div>

                    <h3 className="font-['Orbitron'] font-bold text-base text-white group-hover:text-[#19E3D0] transition-colors mb-2.5">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#B9A6D4] leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#B9A6D4]/60">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-white font-semibold">
                      {item.badge}
                    </span>
                    <span>{item.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: QUICK ANSWERS (FAQ ACCORDION & SCHEMA.ORG JSON-LD) */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <FAQSection
            items={faqsData}
            title="Quick Answers & FAQ"
            subtitle="Accurate, verified answers on release dates, platforms, and PC timing."
            badge="Essential Intel"
            badgeColor="#FFC857"
            renderJsonLd={false}
          />
        </section>

        {/* SECTION: NEWSLETTER BANNER */}
        <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#1E1033] via-[#2A0F4A] to-[#150A24] border border-[#FF2E93]/40 relative overflow-hidden shadow-2xl">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#FF2E93]/20 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-xl">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-[#19E3D0] bg-[#19E3D0]/10 border border-[#19E3D0]/30 font-bold">
                DIRECT FROM VICE CITY
              </span>
              <h3 className="font-['Orbitron'] font-black text-2xl sm:text-3xl text-white mt-3 uppercase">
                Stay Ahead of the Launch Wave
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#B9A6D4] leading-relaxed">
                Receive instant pings when new interactive map layers, confirmed cheat codes, or server status alerts are deployed.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/guides"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF2E93] to-[#FF7A18] text-white font-['Orbitron'] text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all min-h-[44px]"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore Guides Hub</span>
                </Link>
                <Link
                  to="/status"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#19E3D0] hover:text-[#19E3D0] text-white font-mono text-xs font-semibold transition-all min-h-[44px]"
                >
                  <Activity className="w-4 h-4 text-[#19E3D0]" />
                  <span>Check Server Status</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
