import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Clock, Calendar, ArrowRight, User, Sparkles } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { BadgeStatus } from '../../components/BadgeStatus';
import { AdSlot } from '../../components/AdSlot';
import guidesData from '../../data/guides.json';

export function GuidesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Install and Preload', 'Settings', 'Money', 'Tips'];

  const filteredGuides = useMemo(() => {
    return guidesData.filter((g) => {
      if (selectedCategory !== 'All' && g.category !== selectedCategory) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = g.title.toLowerCase().includes(q);
        const matchExcerpt = g.excerpt.toLowerCase().includes(q);
        if (!matchTitle && !matchExcerpt) return false;
      }
      return true;
    });
  }, [selectedCategory, search]);

  return (
    <>
      <SEO
        title="GTA 6 Guides & Walkthroughs | Preload, PC Release & Settings"
        description="Comprehensive guides for Grand Theft Auto VI. Install size projections, preload windows, PC release expectations, and setup optimization."
        canonical="/guides"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#B9A6D4]/70 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-[#FF7A18]">Guides & Intel</span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#150A24] border border-[#FF7A18]/40 text-xs font-mono text-[#FF7A18] mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>LEONIDA FIELD MANUALS</span>
          </div>
          <h1 className="font-['Orbitron'] font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            Guides & <span className="text-[#FF7A18]">Walkthroughs</span>
          </h1>
          <p className="mt-3 text-sm text-[#B9A6D4] leading-relaxed">
            In-depth hardware recommendations, storage optimization guides, release schedule analyses, and tactical gameplay primers curated by the Vice Tools team.
          </p>
        </div>

        {/* Ad slot */}
        <AdSlot size="leaderboard" label="Sponsorship" className="mb-8" />

        {/* CATEGORY TABS & SEARCH */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#FF7A18] text-[#0B0614] font-bold shadow-md shadow-[#FF7A18]/20'
                    : 'bg-white/5 hover:bg-white/10 text-[#B9A6D4] hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#B9A6D4] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guides..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#150A24] border border-white/10 text-xs text-white placeholder-white/30 focus:border-[#FF7A18] focus:outline-none"
            />
          </div>
        </div>

        {/* GUIDES BLOG LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredGuides.map((guide) => (
            <article
              key={guide.slug}
              className="rounded-3xl p-7 bg-gradient-to-b from-[#1E1033] to-[#150A24] border border-[#FF2E93]/20 hover:border-[#FF7A18] transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF7A18]/20 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="text-[#FF7A18] font-semibold uppercase">
                    {guide.category}
                  </span>
                  <BadgeStatus status={guide.status} size="sm" />
                </div>

                <h2 className="font-['Orbitron'] font-bold text-xl text-white group-hover:text-[#FF7A18] transition-colors mb-3 leading-snug">
                  {guide.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#B9A6D4] line-clamp-3 leading-relaxed mb-6">
                  {guide.excerpt}
                </p>
              </div>

              <div>
                {/* Meta details */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#B9A6D4]/70 mb-4">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#FF2E93]" />
                    <span>{guide.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#19E3D0]" />
                    <span>{guide.readingTime}</span>
                  </div>
                </div>

                <Link
                  to={`/guides/${guide.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-[#FF7A18] text-white hover:text-[#0B0614] font-mono text-xs font-bold transition-all min-h-[44px]"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Ad slot */}
        <AdSlot size="banner" label="Sponsored Editorial" />

      </div>
    </>
  );
}
