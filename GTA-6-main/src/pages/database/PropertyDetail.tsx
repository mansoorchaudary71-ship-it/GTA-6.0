import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building, MapPin, DollarSign, Warehouse, ArrowLeft, ArrowRight, Coins, ChevronRight, ShieldCheck } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { BadgeStatus } from '../../components/BadgeStatus';
import { AdSlot } from '../../components/AdSlot';
import propertiesData from '../../data/properties.json';

export function PropertyDetail() {
  const { slug } = useParams<{ slug: string }>();

  const property = propertiesData.find((p) => p.slug === slug);

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <Building className="w-16 h-16 text-[#19E3D0]/40 mx-auto mb-4" />
        <h1 className="font-['Orbitron'] font-bold text-2xl text-white">Property Not Found</h1>
        <p className="text-sm text-[#B9A6D4] mt-2 mb-6">
          The requested real estate listing could not be found in the registry.
        </p>
        <Link
          to="/database/properties"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#19E3D0] text-[#0B0614] font-mono font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Real Estate</span>
        </Link>
      </div>
    );
  }

  // Related properties
  const relatedProperties = propertiesData
    .filter((p) => p.id !== property.id && p.category === property.category)
    .slice(0, 3);
  const fallbackRelated = relatedProperties.length > 0
    ? relatedProperties
    : propertiesData.filter((p) => p.id !== property.id).slice(0, 3);

  // Amortization payoff calculation (how many hours to pay itself off)
  const payoffHours = +(property.price / Math.max(1, property.income)).toFixed(1);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: property.name,
    category: property.category,
    description: property.description,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vicetools.app/' },
      { '@type': 'ListItem', position: 2, name: 'Properties', item: 'https://vicetools.app/database/properties' },
      { '@type': 'ListItem', position: 3, name: property.name, item: `https://vicetools.app/database/properties/${property.slug}` },
    ],
  };

  return (
    <>
      <SEO
        title={`${property.name} - GTA 6 Real Estate, Price & Income`}
        description={`Inspect ${property.name} in GTA 6: Location ${property.location}, price $${property.price.toLocaleString()}, $${property.income.toLocaleString()}/hr income, ${property.garageSpots}-car garage.`}
        canonical={`/database/properties/${property.slug}`}
        schema={[productSchema, breadcrumbSchema]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#B9A6D4]/70 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/database" className="hover:text-white">Database</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/database/properties" className="hover:text-white">Properties</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#19E3D0]">{property.name}</span>
        </nav>

        {/* HERO PROPERTY CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT: ARCHITECTURAL SILHOUETTE (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl p-8 bg-gradient-to-b from-[#1E1033] to-[#150A24] border border-[#19E3D0]/30 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[360px]">
              <Building className="w-32 h-32 text-[#19E3D0]/30 my-6 animate-pulse" />
              <div className="text-xs font-mono uppercase tracking-widest text-[#B9A6D4] font-semibold">
                Original Architectural Blueprint Placeholder
              </div>
              <p className="text-[11px] text-[#B9A6D4]/50 max-w-xs mt-1">
                Full 3D interior floorplans and satellite photography will be indexed post-launch.
              </p>
              <div className="absolute top-4 left-4">
                <BadgeStatus status={property.status} size="md" />
              </div>
            </div>
          </div>

          {/* RIGHT: SPECS, INCOME & ACTION (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-3xl bg-[#150A24] border border-white/10 shadow-xl space-y-6">
              <div>
                <div className="flex items-center gap-2 text-sm font-mono text-[#19E3D0] font-bold uppercase mb-1">
                  <span>{property.category}</span>
                  <span>•</span>
                  <span>{property.location}</span>
                </div>
                <h1 className="font-['Orbitron'] font-black text-3xl sm:text-4xl text-white">
                  {property.name}
                </h1>
                <p className="text-sm text-[#B9A6D4] mt-3 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-[#B9A6D4]">Market Listing Price</span>
                  <div className="text-2xl sm:text-3xl font-['Space_Mono'] font-bold text-[#19E3D0]">
                    ${property.price.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to="/calculators/money"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#19E3D0] to-[#FF7A18] text-[#0B0614] hover:brightness-110 font-mono text-xs font-bold transition-all"
                  >
                    <Coins className="w-4 h-4" />
                    <span>Calculate Grind Time</span>
                  </Link>
                </div>
              </div>

              {/* REAL ESTATE METRICS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-xs text-[#B9A6D4]">Passive Cash Yield</div>
                  <div className="text-xl font-bold text-[#FFC857] mt-1">
                    ${property.income.toLocaleString()}/hr
                  </div>
                  <div className="text-[10px] text-[#B9A6D4]/60 mt-1">
                    Estimated hourly business dividend
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-xs text-[#B9A6D4]">Garage Showroom</div>
                  <div className="text-xl font-bold text-white mt-1">
                    {property.garageSpots} Spaces
                  </div>
                  <div className="text-[10px] text-[#B9A6D4]/60 mt-1">
                    Secure vehicle bays
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-xs text-[#B9A6D4]">Break-Even Timeline</div>
                  <div className="text-xl font-bold text-[#19E3D0] mt-1">
                    ~{payoffHours} hrs
                  </div>
                  <div className="text-[10px] text-[#B9A6D4]/60 mt-1">
                    Passive ROI threshold
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Ad slot */}
        <AdSlot size="banner" label="Sponsored Real Estate" className="mb-12" />

        {/* SIMILAR PROPERTIES */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-['Orbitron'] font-bold text-xl text-white uppercase">
              Similar Real Estate
            </h2>
            <Link
              to="/database/properties"
              className="text-xs font-mono text-[#19E3D0] hover:underline flex items-center gap-1"
            >
              <span>View all properties</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fallbackRelated.map((rel) => (
              <Link
                key={rel.id}
                to={`/database/properties/${rel.slug}`}
                className="p-5 rounded-2xl bg-[#150A24] border border-white/10 hover:border-[#19E3D0] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-[#19E3D0] uppercase">
                      {rel.category}
                    </span>
                    <BadgeStatus status={rel.status} size="sm" />
                  </div>
                  <h3 className="font-['Orbitron'] font-bold text-base text-white group-hover:text-[#19E3D0] transition-colors">
                    {rel.name}
                  </h3>
                  <p className="text-xs text-[#B9A6D4] mt-1 line-clamp-2">
                    {rel.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#19E3D0] font-bold">${rel.price.toLocaleString()}</span>
                  <span className="text-[#FFC857]">${rel.income.toLocaleString()}/hr</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
