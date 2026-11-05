import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Car, Gauge, Zap, Sliders, Shield, ArrowLeft, ArrowRight, Coins, Scale, Check, ChevronRight } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { BadgeStatus } from '../../components/BadgeStatus';
import { AdSlot } from '../../components/AdSlot';
import vehiclesData from '../../data/vehicles.json';

export function VehicleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const vehicle = vehiclesData.find((v) => v.slug === slug);

  if (!vehicle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <Car className="w-16 h-16 text-[#FF7A18]/40 mx-auto mb-4" />
        <h1 className="font-['Orbitron'] font-bold text-2xl text-white">Vehicle Not Found</h1>
        <p className="text-sm text-[#B9A6D4] mt-2 mb-6">
          The requested vehicle profile could not be located in the database.
        </p>
        <Link
          to="/database/vehicles"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF7A18] text-[#0B0614] font-mono font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  // Related vehicles in same category
  const relatedVehicles = vehiclesData
    .filter((v) => v.id !== vehicle.id && v.category === vehicle.category)
    .slice(0, 3);

  // Fallback to other vehicles if no same category
  const fallbackRelated = relatedVehicles.length > 0 
    ? relatedVehicles 
    : vehiclesData.filter((v) => v.id !== vehicle.id).slice(0, 3);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${vehicle.manufacturer} ${vehicle.name}`,
    category: vehicle.category,
    description: vehicle.description,
    offers: {
      '@type': 'Offer',
      price: vehicle.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vicetools.app/' },
      { '@type': 'ListItem', position: 2, name: 'Vehicles', item: 'https://vicetools.app/database/vehicles' },
      { '@type': 'ListItem', position: 3, name: vehicle.name, item: `https://vicetools.app/database/vehicles/${vehicle.slug}` },
    ],
  };

  return (
    <>
      <SEO
        title={`${vehicle.name} (${vehicle.manufacturer}) - GTA 6 Specs & Top Speed`}
        description={`Complete stats for ${vehicle.name} in GTA 6: Top Speed ${vehicle.stats.topSpeed}, Acceleration ${vehicle.stats.acceleration}, handling, and price: $${vehicle.price.toLocaleString()}.`}
        canonical={`/database/vehicles/${vehicle.slug}`}
        schema={[productSchema, breadcrumbSchema]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#B9A6D4]/70 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/database" className="hover:text-white">Database</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/database/vehicles" className="hover:text-white">Vehicles</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#FF7A18]">{vehicle.name}</span>
        </nav>

        {/* HERO SPEC CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT: VISUAL SILHOUETTE PLACEHOLDER (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl p-8 bg-gradient-to-b from-[#1E1033] to-[#150A24] border border-[#FF7A18]/30 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[360px]">
              <Car className="w-32 h-32 text-[#FF7A18]/30 my-6 animate-pulse" />
              <div className="text-xs font-mono uppercase tracking-widest text-[#B9A6D4] font-semibold">
                Original Vector Silhouette Placeholder
              </div>
              <p className="text-[11px] text-[#B9A6D4]/50 max-w-xs mt-1">
                Official high-resolution vehicle render will be indexed upon title release.
              </p>
              <div className="absolute top-4 left-4">
                <BadgeStatus status={vehicle.status} size="md" />
              </div>
            </div>
          </div>

          {/* RIGHT: SPECS & PRICING (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-3xl bg-[#150A24] border border-white/10 shadow-xl space-y-6">
              <div>
                <div className="flex items-center gap-2 text-sm font-mono text-[#FF7A18] font-bold uppercase mb-1">
                  <span>{vehicle.manufacturer}</span>
                  <span>•</span>
                  <span>{vehicle.category}</span>
                </div>
                <h1 className="font-['Orbitron'] font-black text-3xl sm:text-4xl text-white">
                  {vehicle.name}
                </h1>
                <p className="text-sm text-[#B9A6D4] mt-3 leading-relaxed">
                  {vehicle.description}
                </p>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-[#B9A6D4]">Ammu-Nation / Motorsport Price</span>
                  <div className="text-2xl sm:text-3xl font-['Space_Mono'] font-bold text-[#19E3D0]">
                    ${vehicle.price.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/calculators/compare?v1=${vehicle.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-[#19E3D0]/20 hover:border-[#19E3D0]/40 border border-white/10 text-xs font-mono text-white transition-all"
                  >
                    <Scale className="w-4 h-4 text-[#19E3D0]" />
                    <span>Compare</span>
                  </Link>
                  <Link
                    to="/calculators/money"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FF7A18] text-[#0B0614] hover:brightness-110 font-mono text-xs font-bold transition-all"
                  >
                    <Coins className="w-4 h-4" />
                    <span>Grind Plan</span>
                  </Link>
                </div>
              </div>

              {/* TELEMETRY PERFORMANCE BARS */}
              <div className="space-y-4 pt-2">
                <h3 className="font-['Orbitron'] font-bold text-sm text-white uppercase tracking-wider">
                  Vehicle Telemetry Index
                </h3>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-[#B9A6D4] flex items-center gap-1.5">
                      <Gauge className="w-4 h-4 text-[#FF2E93]" />
                      <span>Top Speed Rating</span>
                    </span>
                    <span className="font-bold text-white">{vehicle.stats.topSpeed} / 100</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF2E93] to-[#FF7A18]"
                      style={{ width: `${vehicle.stats.topSpeed}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-[#B9A6D4] flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-[#FF7A18]" />
                      <span>Acceleration Rating</span>
                    </span>
                    <span className="font-bold text-white">{vehicle.stats.acceleration} / 100</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF7A18] to-[#FFC857]"
                      style={{ width: `${vehicle.stats.acceleration}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-[#B9A6D4] flex items-center gap-1.5">
                      <Sliders className="w-4 h-4 text-[#19E3D0]" />
                      <span>Handling Stability</span>
                    </span>
                    <span className="font-bold text-white">{vehicle.stats.handling} / 100</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#19E3D0] to-[#38BDF8]"
                      style={{ width: `${vehicle.stats.handling}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-[#B9A6D4] flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-[#B9A6D4]" />
                      <span>Braking Response</span>
                    </span>
                    <span className="font-bold text-white">{vehicle.stats.braking} / 100</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-white/40"
                      style={{ width: `${vehicle.stats.braking}%` }}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Ad slot */}
        <AdSlot size="banner" label="Sponsored Garage" className="mb-12" />

        {/* RELATED VEHICLES */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-['Orbitron'] font-bold text-xl text-white uppercase">
              Similar {vehicle.category} Vehicles
            </h2>
            <Link
              to="/database/vehicles"
              className="text-xs font-mono text-[#FF7A18] hover:underline flex items-center gap-1"
            >
              <span>View all vehicles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fallbackRelated.map((rel) => (
              <Link
                key={rel.id}
                to={`/database/vehicles/${rel.slug}`}
                className="p-5 rounded-2xl bg-[#150A24] border border-white/10 hover:border-[#FF7A18] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-[#FF7A18] uppercase">
                      {rel.manufacturer}
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
                  <span className="text-[#B9A6D4]">Speed: {rel.stats.topSpeed}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
