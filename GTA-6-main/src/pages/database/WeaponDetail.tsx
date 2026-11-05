import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Crosshair, Zap, Navigation, ArrowLeft, ArrowRight, Coins, ChevronRight } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { BadgeStatus } from '../../components/BadgeStatus';
import { AdSlot } from '../../components/AdSlot';
import weaponsData from '../../data/weapons.json';

export function WeaponDetail() {
  const { slug } = useParams<{ slug: string }>();

  const weapon = weaponsData.find((w) => w.slug === slug);

  if (!weapon) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <Shield className="w-16 h-16 text-[#FF2E93]/40 mx-auto mb-4" />
        <h1 className="font-['Orbitron'] font-bold text-2xl text-white">Weapon Not Found</h1>
        <p className="text-sm text-[#B9A6D4] mt-2 mb-6">
          The requested firearm profile is not available in the Armory index.
        </p>
        <Link
          to="/database/weapons"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF2E93] text-white font-mono font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Weapons</span>
        </Link>
      </div>
    );
  }

  // Related weapons
  const relatedWeapons = weaponsData
    .filter((w) => w.id !== weapon.id && w.category === weapon.category)
    .slice(0, 3);
  const fallbackRelated = relatedWeapons.length > 0 
    ? relatedWeapons 
    : weaponsData.filter((w) => w.id !== weapon.id).slice(0, 3);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: weapon.name,
    category: weapon.category,
    description: weapon.description,
    offers: {
      '@type': 'Offer',
      price: weapon.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vicetools.app/' },
      { '@type': 'ListItem', position: 2, name: 'Weapons', item: 'https://vicetools.app/database/weapons' },
      { '@type': 'ListItem', position: 3, name: weapon.name, item: `https://vicetools.app/database/weapons/${weapon.slug}` },
    ],
  };

  return (
    <>
      <SEO
        title={`${weapon.name} - GTA 6 Weapon Stats & Damage Breakdown`}
        description={`In-depth stats for ${weapon.name} in GTA 6: Damage ${weapon.stats.damage}, Fire Rate ${weapon.stats.fireRate}, ${weapon.magCapacity}-round mag, and price: $${weapon.price.toLocaleString()}.`}
        canonical={`/database/weapons/${weapon.slug}`}
        schema={[productSchema, breadcrumbSchema]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#B9A6D4]/70 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/database" className="hover:text-white">Database</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/database/weapons" className="hover:text-white">Weapons</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#FF2E93]">{weapon.name}</span>
        </nav>

        {/* HERO WEAPON CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT: VISUAL SILHOUETTE (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl p-8 bg-gradient-to-b from-[#1E1033] to-[#150A24] border border-[#FF2E93]/30 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[360px]">
              <Crosshair className="w-32 h-32 text-[#FF2E93]/30 my-6 animate-pulse" />
              <div className="text-xs font-mono uppercase tracking-widest text-[#B9A6D4] font-semibold">
                Original Vector Weapon Placeholder
              </div>
              <p className="text-[11px] text-[#B9A6D4]/50 max-w-xs mt-1">
                Official gunsmith renders and 3D schematics will be loaded post-launch.
              </p>
              <div className="absolute top-4 left-4">
                <BadgeStatus status={weapon.status} size="md" />
              </div>
            </div>
          </div>

          {/* RIGHT: BALLISTICS & AMMU-NATION SPECS (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-3xl bg-[#150A24] border border-white/10 shadow-xl space-y-6">
              <div>
                <div className="flex items-center gap-2 text-sm font-mono text-[#FF2E93] font-bold uppercase mb-1">
                  <span>{weapon.category}</span>
                  <span>•</span>
                  <span>{weapon.magCapacity} Round Mag</span>
                </div>
                <h1 className="font-['Orbitron'] font-black text-3xl sm:text-4xl text-white">
                  {weapon.name}
                </h1>
                <p className="text-sm text-[#B9A6D4] mt-3 leading-relaxed">
                  {weapon.description}
                </p>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-[#B9A6D4]">Ammu-Nation Base Price</span>
                  <div className="text-2xl sm:text-3xl font-['Space_Mono'] font-bold text-[#19E3D0]">
                    ${weapon.price.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/calculators/loadout?w=${weapon.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF2E93] to-[#FF7A18] text-white hover:brightness-110 font-mono text-xs font-bold transition-all"
                  >
                    <Crosshair className="w-4 h-4" />
                    <span>Add to Loadout</span>
                  </Link>
                </div>
              </div>

              {/* BALLISTICS BARS */}
              <div className="space-y-4 pt-2">
                <h3 className="font-['Orbitron'] font-bold text-sm text-white uppercase tracking-wider">
                  Ballistics Telemetry
                </h3>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-[#B9A6D4]">Damage Per Shot</span>
                    <span className="font-bold text-white">{weapon.stats.damage} / 100</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF2E93] to-[#FF7A18]"
                      style={{ width: `${weapon.stats.damage}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-[#B9A6D4]">Effective Range</span>
                    <span className="font-bold text-white">{weapon.stats.range} / 100</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF7A18] to-[#FFC857]"
                      style={{ width: `${weapon.stats.range}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-[#B9A6D4]">Cyclic Fire Rate</span>
                    <span className="font-bold text-white">{weapon.stats.fireRate} / 100</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#19E3D0] to-[#38BDF8]"
                      style={{ width: `${weapon.stats.fireRate}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-[#B9A6D4]">Accuracy & Recoil Control</span>
                    <span className="font-bold text-white">{weapon.stats.accuracy} / 100</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF2E93] to-[#D81B9A]"
                      style={{ width: `${weapon.stats.accuracy}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-[#B9A6D4]">Handling & Holster Mobility</span>
                    <span className="font-bold text-white">{weapon.stats.mobility} / 100</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-white/40"
                      style={{ width: `${weapon.stats.mobility}%` }}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Ad slot */}
        <AdSlot size="banner" label="Sponsored Armory" className="mb-12" />

        {/* RELATED WEAPONS */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-['Orbitron'] font-bold text-xl text-white uppercase">
              Similar Weapons
            </h2>
            <Link
              to="/database/weapons"
              className="text-xs font-mono text-[#FF2E93] hover:underline flex items-center gap-1"
            >
              <span>View all weapons</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fallbackRelated.map((rel) => (
              <Link
                key={rel.id}
                to={`/database/weapons/${rel.slug}`}
                className="p-5 rounded-2xl bg-[#150A24] border border-white/10 hover:border-[#FF2E93] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-[#FF2E93] uppercase">
                      {rel.category}
                    </span>
                    <BadgeStatus status={rel.status} size="sm" />
                  </div>
                  <h3 className="font-['Orbitron'] font-bold text-base text-white group-hover:text-[#FF7A18] transition-colors">
                    {rel.name}
                  </h3>
                  <p className="text-xs text-[#B9A6D4] mt-1 line-clamp-2">
                    {rel.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#19E3D0] font-bold">${rel.price.toLocaleString()}</span>
                  <span className="text-[#B9A6D4]">Damage: {rel.stats.damage}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
