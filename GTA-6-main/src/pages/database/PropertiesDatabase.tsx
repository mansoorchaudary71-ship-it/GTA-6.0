import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Building, Search, ArrowRight, Home, ChevronLeft, ChevronRight, DollarSign, Warehouse } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { BadgeStatus } from '../../components/BadgeStatus';
import { AdSlot } from '../../components/AdSlot';
import propertiesData from '../../data/properties.json';

export function PropertiesDatabase() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [maxPrice, setMaxPrice] = useState<number>(15000000);
  const [sortBy, setSortBy] = useState<'price-desc' | 'price-asc' | 'income' | 'garage' | 'name'>('price-desc');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const categories = useMemo(() => {
    const set = new Set(propertiesData.map((p) => p.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredProperties = useMemo(() => {
    return propertiesData.filter((prop) => {
      if (selectedCategory !== 'All' && prop.category !== selectedCategory) return false;
      if (selectedStatus !== 'All' && prop.status !== selectedStatus.toLowerCase()) return false;
      if (prop.price > maxPrice) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = prop.name.toLowerCase().includes(q);
        const matchLoc = prop.location.toLowerCase().includes(q);
        const matchCat = prop.category.toLowerCase().includes(q);
        if (!matchName && !matchLoc && !matchCat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'income') return b.income - a.income;
      if (sortBy === 'garage') return b.garageSpots - a.garageSpots;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [search, selectedCategory, selectedStatus, maxPrice, sortBy]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage) || 1;
  const paginatedProperties = filteredProperties.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <SEO
        title="GTA 6 Properties & Real Estate Database | Mansions, Safehouses & Warehouses"
        description="Explore the GTA 6 real estate market. Search luxury penthouses, Starfish Island estates, and commercial chop shops with passive income stats."
        canonical="/database/properties"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#B9A6D4]/70 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/database" className="hover:text-white">Database</Link>
          <span>/</span>
          <span className="text-[#19E3D0]">Properties</span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#150A24] border border-[#19E3D0]/40 text-xs font-mono text-[#19E3D0] mb-3">
            <Building className="w-3.5 h-3.5" />
            <span>LEONIDA REALTY & INVESTMENTS</span>
          </div>
          <h1 className="font-['Orbitron'] font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            Real Estate & <span className="text-[#19E3D0]">Properties</span>
          </h1>
          <p className="mt-3 text-sm text-[#B9A6D4] leading-relaxed">
            Acquire beachfront penthouses, gated estates, and cash-generating chop shops across Vice City and surrounding counties.
          </p>
        </div>

        {/* Ad slot */}
        <AdSlot size="leaderboard" label="Sponsorship" className="mb-8" />

        {/* FILTERS */}
        <div className="p-6 rounded-3xl bg-[#150A24] border border-white/10 shadow-xl mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#B9A6D4] mb-1.5">Search Address / Title</label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#B9A6D4] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="e.g. Starfish, Penthouse..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-white/30 focus:border-[#19E3D0] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#B9A6D4] mb-1.5">Property Type</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white focus:border-[#19E3D0] focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#B9A6D4] mb-1.5">Confirmation Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white focus:border-[#19E3D0] focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Confirmed">Confirmed Only</option>
                <option value="Unconfirmed">Unconfirmed Only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#B9A6D4] mb-1.5">Sort Order</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white focus:border-[#19E3D0] focus:outline-none"
              >
                <option value="price-desc">Price (High to Low)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="income">Passive Yield (Highest)</option>
                <option value="garage">Garage Capacity (Largest)</option>
                <option value="name">Property Name (A-Z)</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-80">
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-[#B9A6D4]">Max Price:</span>
                <span className="text-[#19E3D0] font-bold">${maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="300000"
                max="15000000"
                step="250000"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setPage(1);
                }}
                className="w-full accent-[#19E3D0] cursor-pointer"
              />
            </div>

            <div className="text-xs font-mono text-[#B9A6D4]">
              Found <strong className="text-white">{filteredProperties.length}</strong> real estate listings
            </div>
          </div>
        </div>

        {/* PROPERTIES GRID */}
        {paginatedProperties.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#150A24] border border-white/10 my-8">
            <Building className="w-12 h-12 text-[#19E3D0]/40 mx-auto mb-3" />
            <h3 className="font-['Orbitron'] font-bold text-lg text-white">No Properties Found</h3>
            <p className="text-xs text-[#B9A6D4] mt-1">Try broadening your price range or clearing search filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {paginatedProperties.map((prop) => (
              <div
                key={prop.id}
                className="rounded-3xl p-6 bg-gradient-to-b from-[#1E1033] to-[#150A24] border border-[#FF2E93]/20 hover:border-[#19E3D0] transition-all duration-300 hover:shadow-2xl hover:shadow-[#19E3D0]/20 flex flex-col justify-between group"
              >
                <div>
                  {/* Generic Architectural Silhouette Placeholder */}
                  <div className="relative w-full h-40 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-center justify-center mb-5 overflow-hidden">
                    <Building className="w-16 h-16 text-[#19E3D0]/40 group-hover:scale-105 transition-transform duration-300" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#B9A6D4]/50 mt-2">
                      Original Architectural Placeholder
                    </span>
                    <span className="absolute top-2 right-2 text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#B9A6D4]">
                      Image coming soon
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#19E3D0] uppercase">
                      {prop.category}
                    </span>
                    <BadgeStatus status={prop.status} size="sm" />
                  </div>

                  <h3 className="font-['Orbitron'] font-bold text-xl text-white group-hover:text-[#19E3D0] transition-colors mb-1">
                    {prop.name}
                  </h3>
                  <div className="text-xs font-mono text-[#B9A6D4] mb-3">
                    {prop.location}
                  </div>

                  <p className="text-xs text-[#B9A6D4] line-clamp-2 leading-relaxed mb-4">
                    {prop.description}
                  </p>

                  {/* Financial & Storage Highlights */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5 font-mono text-xs">
                    <div className="p-2.5 rounded-xl bg-white/5">
                      <span className="text-[10px] text-[#B9A6D4] block">Hourly Yield</span>
                      <span className="text-sm font-bold text-[#FFC857] mt-0.5 block">
                        ${prop.income.toLocaleString()}/hr
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5">
                      <span className="text-[10px] text-[#B9A6D4] block">Garage Bays</span>
                      <span className="text-sm font-bold text-white mt-0.5 block">
                        {prop.garageSpots} Vehicles
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#B9A6D4]">Listing Price</span>
                    <div className="text-base font-mono font-bold text-[#19E3D0]">
                      ${prop.price.toLocaleString()}
                    </div>
                  </div>

                  <Link
                    to={`/database/properties/${prop.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-[#19E3D0] text-white hover:text-[#0B0614] font-mono text-xs font-bold transition-all"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 my-8 font-mono text-xs">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="p-2 rounded-xl border border-white/10 bg-white/5 disabled:opacity-30 hover:bg-white/10 text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[#B9A6D4]">
              Page <strong className="text-white">{page}</strong> of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="p-2 rounded-xl border border-white/10 bg-white/5 disabled:opacity-30 hover:bg-white/10 text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Ad slot */}
        <AdSlot size="banner" label="Sponsored Real Estate" />

      </div>
    </>
  );
}
