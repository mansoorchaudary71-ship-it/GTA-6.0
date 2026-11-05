import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Car, Search, SlidersHorizontal, ArrowUpDown, ArrowRight, Gauge, Zap, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { BadgeStatus } from '../../components/BadgeStatus';
import { AdSlot } from '../../components/AdSlot';
import vehiclesData from '../../data/vehicles.json';

export function VehiclesDatabase() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [maxPrice, setMaxPrice] = useState<number>(3000000);
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc' | 'speed'>('speed');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const categories = useMemo(() => {
    const set = new Set(vehiclesData.map((v) => v.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredVehicles = useMemo(() => {
    return vehiclesData.filter((veh) => {
      if (selectedCategory !== 'All' && veh.category !== selectedCategory) return false;
      if (selectedStatus !== 'All' && veh.status !== selectedStatus.toLowerCase()) return false;
      if (veh.price > maxPrice) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = veh.name.toLowerCase().includes(q);
        const matchMake = veh.manufacturer.toLowerCase().includes(q);
        const matchCat = veh.category.toLowerCase().includes(q);
        if (!matchName && !matchMake && !matchCat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'speed') return b.stats.topSpeed - a.stats.topSpeed;
      return 0;
    });
  }, [search, selectedCategory, selectedStatus, maxPrice, sortBy]);

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage) || 1;
  const paginatedVehicles = filteredVehicles.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <SEO
        title="GTA 6 Vehicle Database | Supercars, Classic Muscle & Bikes"
        description="Browse all confirmed and rumored GTA 6 vehicles. Filter by top speed, acceleration, handling, price, and manufacturer."
        canonical="/database/vehicles"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#B9A6D4]/70 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/database" className="hover:text-white">Database</Link>
          <span>/</span>
          <span className="text-[#FF7A18]">Vehicles</span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#150A24] border border-[#FF7A18]/40 text-xs font-mono text-[#FF7A18] mb-3">
            <Car className="w-3.5 h-3.5" />
            <span>VICE CITY MOTORING DIRECTORY</span>
          </div>
          <h1 className="font-['Orbitron'] font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            Vehicle <span className="text-[#FF7A18]">Database</span>
          </h1>
          <p className="mt-3 text-sm text-[#B9A6D4] leading-relaxed">
            From the roaring Grotti Cheetah along Ocean Beach to swamp crawlers tearing through Kelly County, inspect full engine specs, acceleration curves, and pricing.
          </p>
        </div>

        {/* Ad slot */}
        <AdSlot size="leaderboard" label="Sponsorship" className="mb-8" />

        {/* FILTERS & SEARCH CONTROLS */}
        <div className="p-6 rounded-3xl bg-[#150A24] border border-white/10 shadow-xl mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div>
              <label className="block text-xs font-mono text-[#B9A6D4] mb-1.5">Search Make / Model</label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#B9A6D4] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="e.g. Cheetah, Pegassi..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-white/30 focus:border-[#FF7A18] focus:outline-none"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-mono text-[#B9A6D4] mb-1.5">Vehicle Class</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white focus:border-[#FF7A18] focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-xs font-mono text-[#B9A6D4] mb-1.5">Confirmation Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white focus:border-[#FF7A18] focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Confirmed">Confirmed Only</option>
                <option value="Unconfirmed">Unconfirmed Only</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-xs font-mono text-[#B9A6D4] mb-1.5">Sort Order</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white focus:border-[#FF7A18] focus:outline-none"
              >
                <option value="speed">Top Speed (Highest)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="name">Model Name (A-Z)</option>
              </select>
            </div>

          </div>

          {/* Price Range Slider */}
          <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-80">
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-[#B9A6D4]">Max Budget:</span>
                <span className="text-[#19E3D0] font-bold">${maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="30000"
                max="3000000"
                step="50000"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setPage(1);
                }}
                className="w-full accent-[#FF7A18] cursor-pointer"
              />
            </div>

            <div className="text-xs font-mono text-[#B9A6D4]">
              Found <strong className="text-white">{filteredVehicles.length}</strong> matching models
            </div>
          </div>
        </div>

        {/* VEHICLES CARD GRID */}
        {paginatedVehicles.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#150A24] border border-white/10 my-8">
            <Car className="w-12 h-12 text-[#FF7A18]/40 mx-auto mb-3" />
            <h3 className="font-['Orbitron'] font-bold text-lg text-white">No Vehicles Match Your Query</h3>
            <p className="text-xs text-[#B9A6D4] mt-1">Try resetting the class filter or expanding your price slider.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {paginatedVehicles.map((veh) => (
              <div
                key={veh.id}
                className="rounded-3xl p-6 bg-gradient-to-b from-[#1E1033] to-[#150A24] border border-[#FF2E93]/20 hover:border-[#FF7A18] transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF7A18]/20 flex flex-col justify-between group"
              >
                <div>
                  {/* Generic Silhouette Placeholder */}
                  <div className="relative w-full h-40 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-center justify-center mb-5 overflow-hidden">
                    <Car className="w-16 h-16 text-[#FF7A18]/40 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#B9A6D4]/50 mt-2">
                      Original Silhouette Placeholder
                    </span>
                    <span className="absolute top-2 right-2 text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#B9A6D4]">
                      Image coming soon
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#FF7A18] uppercase">
                      {veh.manufacturer}
                    </span>
                    <BadgeStatus status={veh.status} size="sm" />
                  </div>

                  <h3 className="font-['Orbitron'] font-bold text-xl text-white group-hover:text-[#FF7A18] transition-colors mb-1">
                    {veh.name}
                  </h3>
                  <div className="text-xs font-mono text-[#19E3D0] mb-3">
                    {veh.category}
                  </div>

                  <p className="text-xs text-[#B9A6D4] line-clamp-2 leading-relaxed mb-4">
                    {veh.description}
                  </p>

                  {/* Telemetry bar preview */}
                  <div className="space-y-2 pt-3 border-t border-white/5 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#B9A6D4] flex items-center gap-1.5">
                        <Gauge className="w-3.5 h-3.5 text-[#FF2E93]" />
                        <span>Top Speed</span>
                      </span>
                      <span className="font-bold text-white">{veh.stats.topSpeed} / 100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B9A6D4] flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#FF7A18]" />
                        <span>Acceleration</span>
                      </span>
                      <span className="font-bold text-white">{veh.stats.acceleration} / 100</span>
                    </div>
                  </div>
                </div>

                {/* Price and Action Button */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#B9A6D4]">Price</span>
                    <div className="text-base font-mono font-bold text-[#19E3D0]">
                      ${veh.price.toLocaleString()}
                    </div>
                  </div>

                  <Link
                    to={`/database/vehicles/${veh.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-[#FF7A18] text-white hover:text-[#0B0614] font-mono text-xs font-bold transition-all"
                  >
                    <span>Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 my-8 font-mono text-xs">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="p-2 rounded-xl border border-white/10 bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 text-white"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[#B9A6D4]">
              Page <strong className="text-white">{page}</strong> of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="p-2 rounded-xl border border-white/10 bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 text-white"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom Ad slot */}
        <AdSlot size="banner" label="Sponsored Catalog" />

      </div>
    </>
  );
}
