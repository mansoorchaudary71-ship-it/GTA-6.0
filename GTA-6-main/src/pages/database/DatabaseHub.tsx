import { Link } from 'react-router-dom';
import { Database, Car, Shield, Building, ArrowRight, Sparkles, Search } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { AdSlot } from '../../components/AdSlot';

import vehiclesData from '../../data/vehicles.json';
import weaponsData from '../../data/weapons.json';
import propertiesData from '../../data/properties.json';

export function DatabaseHub() {
  const sections = [
    {
      title: 'Vehicle Database',
      description: 'Explore the complete roster of supercars, classic muscle, street bikes, and swamp airboats with verified top speeds and acceleration stats.',
      count: vehiclesData.length,
      path: '/database/vehicles',
      icon: Car,
      color: '#FF7A18',
      preview: ['Cheetah Classic GT', 'Infernus Retro S', 'Coquette D10']
    },
    {
      title: 'Weapons & Armory',
      description: 'In-depth ballistics, damage per shot, rate of fire, magazine limits, and attachment specs for handguns, rifles, shotguns, and heavy ordnances.',
      count: weaponsData.length,
      path: '/database/weapons',
      icon: Shield,
      color: '#FF2E93',
      preview: ['VP-9 Service Pistol', 'Carbine Rifle Mod-3', 'Defender 12G']
    },
    {
      title: 'Real Estate & Properties',
      description: 'Browse luxury penthouses along Ocean Drive, waterfront villas on Starfish Island, Chop Shops in Little Haiti, and industrial warehouses.',
      count: propertiesData.length,
      path: '/database/properties',
      icon: Building,
      color: '#19E3D0',
      preview: ['Starfish Island Villa', 'Ocean Drive Penthouse', 'Port Gellhorn Lockup']
    }
  ];

  return (
    <>
      <SEO
        title="GTA 6 Database | Vehicles, Weapons & Properties Catalog"
        description="Comprehensive GTA 6 game database. Search and filter vehicles, firearms, and real estate properties with full stats and price listings."
        canonical="/database"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#150A24] border border-[#FF2E93]/40 text-xs font-mono uppercase tracking-widest text-[#19E3D0] mb-4">
            <Database className="w-3.5 h-3.5 text-[#19E3D0]" />
            <span>CENTRAL ASSET REGISTRY</span>
          </div>

          <h1 className="font-['Orbitron'] font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Leonida <span className="gradient-sunset-text">Database</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#B9A6D4] leading-relaxed">
            The definitive fan index of all confirmed and rumored machinery, weapons, and safehouse real estate across Grand Theft Auto VI.
          </p>
        </div>

        {/* Ad slot */}
        <AdSlot size="leaderboard" label="Sponsorship" className="mb-10" />

        {/* Database Sections Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {sections.map((sec) => (
            <div
              key={sec.title}
              className="rounded-3xl p-8 bg-gradient-to-b from-[#1E1033] to-[#150A24] border border-[#FF2E93]/20 hover:border-[#FF2E93] transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF2E93]/20 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#FF2E93] flex items-center justify-center transition-all">
                    <sec.icon className="w-7 h-7 text-[#FF2E93] group-hover:scale-110 transition-transform" />
                  </div>
                  <span
                    className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-current/30"
                    style={{ color: sec.color }}
                  >
                    {sec.count} Records
                  </span>
                </div>

                <h2 className="font-['Orbitron'] font-bold text-xl text-white group-hover:text-[#FF7A18] transition-colors mb-2">
                  {sec.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#B9A6D4] leading-relaxed mb-6">
                  {sec.description}
                </p>

                {/* Preview tags */}
                <div className="pt-4 border-t border-white/5 mb-6 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-[#B9A6D4]/50">Featured:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {sec.preview.map((p) => (
                      <span
                        key={p}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-[#FFF5FB]/80 border border-white/5"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                to={sec.path}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF2E93] to-[#FF7A18] text-white font-['Orbitron'] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#FF2E93]/30 hover:brightness-110 active:scale-95 transition-all min-h-[44px]"
              >
                <span>Browse {sec.title}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Global Catalog Disclaimer Note */}
        <div className="p-6 rounded-2xl bg-[#150A24] border border-white/10 text-xs text-[#B9A6D4] leading-relaxed">
          <p className="font-semibold text-white mb-1">DATA VERIFICATION POLICY</p>
          <p>
            All catalog entries maintain an explicit &quot;Confirmed&quot; or &quot;Unconfirmed&quot; status badge. Official entries stem directly from publisher promotional media and ESRB age rating descriptions. Speculative records reflect community telemetry and are promptly updated upon title release.
          </p>
        </div>
      </div>
    </>
  );
}
