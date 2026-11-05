import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Search, ArrowRight, Crosshair, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { BadgeStatus } from '../../components/BadgeStatus';
import { AdSlot } from '../../components/AdSlot';
import weaponsData from '../../data/weapons.json';

export function WeaponsDatabase() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [maxPrice, setMaxPrice] = useState<number>(80000);
  const [sortBy, setSortBy] = useState<'damage' | 'fireRate' | 'price-asc' | 'price-desc' | 'name'>('damage');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const categories = useMemo(() => {
    const set = new Set(weaponsData.map((w) => w.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredWeapons = useMemo(() => {
    return weaponsData.filter((wep) => {
      if (selectedCategory !== 'All' && wep.category !== selectedCategory) return false;
      if (selectedStatus !== 'All' && wep.status !== selectedStatus.toLowerCase()) return false;
      if (wep.price > maxPrice) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = wep.name.toLowerCase().includes(q);
        const matchCat = wep.category.toLowerCase().includes(q);
        if (!matchName && !matchCat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'damage') return b.stats.damage - a.stats.damage;
      if (sortBy === 'fireRate') return b.stats.fireRate - a.stats.fireRate;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [search, selectedCategory, selectedStatus, maxPrice, sortBy]);

  const totalPages = Math.ceil(filteredWeapons.length / itemsPerPage) || 1;
  const paginatedWeapons = filteredWeapons.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <SEO
        title="GTA 6 Weapons Database & Armory | Ballistics, Damage & Fire Rate"
        description="Comprehensive GTA 6 weapons catalog. Analyze handguns, rifles, shotguns, and heavy weapons with damage per shot, range, and Ammu-Nation pricing."
        canonical="/database/weapons"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#B9A6D4]/70 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/database" className="hover:text-white">Database</Link>
          <span>/</span>
          <span className="text-[#FF2E93]">Weapons</span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#150A24] border border-[#FF2E93]/40 text-xs font-mono text-[#FF2E93] mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>AMMU-NATION BALLISTICS CATALOG</span>
          </div>
          <h1 className="font-['Orbitron'] font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            Weapons & <span className="text-[#FF2E93]">Armory</span>
          </h1>
          <p className="mt-3 text-sm text-[#B9A6D4] leading-relaxed">
            From concealed carry 9mm service sidearms to high-caliber marksman rifles, analyze raw damage profiles, cyclic rates, and effective ranges.
          </p>
        </div>

        {/* Ad slot */}
        <AdSlot size="leaderboard" label="Sponsorship" className="mb-8" />

        {/* FILTERS */}
        <div className="p-6 rounded-3xl bg-[#150A24] border border-white/10 shadow-xl mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#B9A6D4] mb-1.5">Search Model</label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#B9A6D4] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="e.g. Carbine, VP-9..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-white/30 focus:border-[#FF2E93] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#B9A6D4] mb-1.5">Weapon Class</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white focus:border-[#FF2E93] focus:outline-none"
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
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white focus:border-[#FF2E93] focus:outline-none"
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
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white focus:border-[#FF2E93] focus:outline-none"
              >
                <option value="damage">Damage (Highest)</option>
                <option value="fireRate">Fire Rate (Fastest)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="name">Weapon Name (A-Z)</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-80">
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-[#B9A6D4]">Max Budget:</span>
                <span className="text-[#19E3D0] font-bold">${maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="80000"
                step="2000"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setPage(1);
                }}
                className="w-full accent-[#FF2E93] cursor-pointer"
              />
            </div>

            <div className="text-xs font-mono text-[#B9A6D4]">
              Found <strong className="text-white">{filteredWeapons.length}</strong> matching models
            </div>
          </div>
        </div>

        {/* WEAPONS GRID */}
        {paginatedWeapons.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#150A24] border border-white/10 my-8">
            <Shield className="w-12 h-12 text-[#FF2E93]/40 mx-auto mb-3" />
            <h3 className="font-['Orbitron'] font-bold text-lg text-white">No Weapons Match Your Search</h3>
            <p className="text-xs text-[#B9A6D4] mt-1">Try resetting the class or expanding your price slider.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {paginatedWeapons.map((wep) => (
              <div
                key={wep.id}
                className="rounded-3xl p-6 bg-gradient-to-b from-[#1E1033] to-[#150A24] border border-[#FF2E93]/20 hover:border-[#FF2E93] transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF2E93]/20 flex flex-col justify-between group"
              >
                <div>
                  {/* Generic Silhouette Placeholder */}
                  <div className="relative w-full h-36 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-center justify-center mb-5 overflow-hidden">
                    <Crosshair className="w-14 h-14 text-[#FF2E93]/40 group-hover:rotate-45 transition-transform duration-300" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#B9A6D4]/50 mt-2">
                      Original Silhouette Placeholder
                    </span>
                    <span className="absolute top-2 right-2 text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#B9A6D4]">
                      Image coming soon
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#FF2E93] uppercase">
                      {wep.category}
                    </span>
                    <BadgeStatus status={wep.status} size="sm" />
                  </div>

                  <h3 className="font-['Orbitron'] font-bold text-xl text-white group-hover:text-[#FF7A18] transition-colors mb-1">
                    {wep.name}
                  </h3>
                  <div className="text-xs font-mono text-[#B9A6D4] mb-3">
                    {wep.magCapacity} Round Magazine
                  </div>

                  <p className="text-xs text-[#B9A6D4] line-clamp-2 leading-relaxed mb-4">
                    {wep.description}
                  </p>

                  {/* Ballistics Preview */}
                  <div className="space-y-2 pt-3 border-t border-white/5 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#B9A6D4] flex items-center gap-1.5">
                        <Crosshair className="w-3.5 h-3.5 text-[#FF2E93]" />
                        <span>Damage Rating</span>
                      </span>
                      <span className="font-bold text-white">{wep.stats.damage} / 100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B9A6D4] flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#FF7A18]" />
                        <span>Fire Rate</span>
                      </span>
                      <span className="font-bold text-white">{wep.stats.fireRate} / 100</span>
                    </div>
                  </div>
                </div>

                {/* Price and Action Button */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#B9A6D4]">Store Price</span>
                    <div className="text-base font-mono font-bold text-[#19E3D0]">
                      ${wep.price.toLocaleString()}
                    </div>
                  </div>

                  <Link
                    to={`/database/weapons/${wep.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-[#FF2E93] text-white hover:text-white font-mono text-xs font-bold transition-all"
                  >
                    <span>Specs</span>
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
        <AdSlot size="banner" label="Sponsored Armory" />

      </div>
    </>
  );
}
