import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Clock, Calendar, User, ArrowLeft, ArrowRight, Share2, Bookmark, ChevronRight, CheckCircle2 } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { BadgeStatus } from '../../components/BadgeStatus';
import { AdSlot } from '../../components/AdSlot';
import guidesData from '../../data/guides.json';

export function GuideDetail() {
  const { slug } = useParams<{ slug: string }>();

  const guide = guidesData.find((g) => g.slug === slug);

  if (!guide) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <BookOpen className="w-16 h-16 text-[#FF7A18]/40 mx-auto mb-4" />
        <h1 className="font-['Orbitron'] font-bold text-2xl text-white">Guide Not Found</h1>
        <p className="text-sm text-[#B9A6D4] mt-2 mb-6">
          The requested article could not be retrieved from the editorial archives.
        </p>
        <Link
          to="/guides"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF7A18] text-[#0B0614] font-mono font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Guides Hub</span>
        </Link>
      </div>
    );
  }

  const relatedGuides = guidesData.filter((g) => g.slug !== guide.slug).slice(0, 2);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.excerpt,
    datePublished: guide.lastUpdated,
    dateModified: guide.lastUpdated,
    author: {
      '@type': 'Person',
      name: guide.author.name,
      jobTitle: guide.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vice Tools',
      logo: {
        '@type': 'ImageObject',
        url: 'https://vicetools.app/icon.png',
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vicetools.app/' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://vicetools.app/guides' },
      { '@type': 'ListItem', position: 3, name: guide.title, item: `https://vicetools.app/guides/${guide.slug}` },
    ],
  };

  // Render markdown content sections
  const renderFormattedContent = (rawText: string) => {
    const paragraphs = rawText.split('\n\n');
    return paragraphs.map((block, idx) => {
      if (block.startsWith('### ')) {
        const title = block.replace('### ', '');
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return (
          <h2
            key={idx}
            id={id}
            className="font-['Orbitron'] font-bold text-xl sm:text-2xl text-white mt-10 mb-4 pt-6 border-t border-white/5 scroll-mt-24 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF7A18]" />
            <span>{title}</span>
          </h2>
        );
      }

      if (block.startsWith('1. ') || block.startsWith('- ')) {
        const lines = block.split('\n');
        return (
          <ul key={idx} className="space-y-2 my-4 pl-4 font-normal text-[#B9A6D4] text-sm leading-relaxed">
            {lines.map((l, lIdx) => (
              <li key={lIdx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#19E3D0] shrink-0 mt-0.5" />
                <span>{l.replace(/^[0-9]+\.\s+/, '').replace(/^-\s+/, '')}</span>
              </li>
            ))}
          </ul>
        );
      }

      return (
        <p key={idx} className="text-sm sm:text-base text-[#B9A6D4] leading-relaxed my-4 font-light">
          {block}
        </p>
      );
    });
  };

  return (
    <>
      <SEO
        title={`${guide.title} | Vice Tools`}
        description={guide.excerpt}
        canonical={`/guides/${guide.slug}`}
        type="article"
        schema={[articleSchema, breadcrumbSchema]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#B9A6D4]/70 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/guides" className="hover:text-white">Guides</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#FF7A18] truncate max-w-xs">{guide.title}</span>
        </nav>

        {/* ARTICLE HEADER */}
        <header className="max-w-4xl mx-auto mb-10 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-4 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-[#FF7A18]/10 text-[#FF7A18] border border-[#FF7A18]/30 font-bold uppercase">
              {guide.category}
            </span>
            <BadgeStatus status={guide.status} size="md" />
            <span className="text-[#B9A6D4] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Updated {guide.lastUpdated}</span>
            </span>
            <span className="text-[#19E3D0] flex items-center gap-1 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>{guide.readingTime}</span>
            </span>
          </div>

          <h1 className="font-['Orbitron'] font-black text-3xl sm:text-5xl text-white uppercase tracking-tight leading-tight">
            {guide.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#B9A6D4] leading-relaxed">
            {guide.excerpt}
          </p>

          {/* Author Byline */}
          <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FF2E93] to-[#FF7A18] flex items-center justify-center text-white font-bold font-mono">
              {guide.author.name.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{guide.author.name}</div>
              <div className="text-xs font-mono text-[#B9A6D4]/70">{guide.author.role}</div>
            </div>
          </div>
        </header>

        {/* Ad slot */}
        <div className="max-w-4xl mx-auto mb-10">
          <AdSlot size="leaderboard" label="Sponsorship" />
        </div>

        {/* TWO-COLUMN ARTICLE BODY & TABLE OF CONTENTS */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          
          {/* MAIN ARTICLE TEXT (8 cols) */}
          <article className="lg:col-span-8">
            <div className="p-8 rounded-3xl bg-[#150A24] border border-white/10 shadow-xl">
              {renderFormattedContent(guide.content)}
            </div>
          </article>

          {/* SIDEBAR: TABLE OF CONTENTS & RELATED (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Table of Contents */}
            <div className="sticky top-24 p-6 rounded-3xl bg-[#150A24] border border-white/10 shadow-xl space-y-4">
              <h3 className="font-['Orbitron'] font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#19E3D0]" />
                <span>Table of Contents</span>
              </h3>

              <nav className="space-y-2 text-xs font-mono">
                {guide.headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className="block p-2 rounded-lg text-[#B9A6D4] hover:text-[#19E3D0] hover:bg-white/5 transition-colors"
                  >
                    {h.text}
                  </a>
                ))}
              </nav>

              {/* Sidebar Ad slot */}
              <div className="pt-4 border-t border-white/10">
                <AdSlot size="rectangle" label="Sponsored Sidebar" />
              </div>
            </div>

          </aside>
        </div>

        {/* RELATED GUIDES */}
        <section className="max-w-4xl mx-auto pt-8 border-t border-white/10 mb-12">
          <h3 className="font-['Orbitron'] font-bold text-xl text-white mb-6 uppercase">
            Recommended Next Reads
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedGuides.map((rel) => (
              <Link
                key={rel.slug}
                to={`/guides/${rel.slug}`}
                className="p-6 rounded-2xl bg-[#150A24] border border-white/10 hover:border-[#FF7A18] transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#FF7A18] uppercase">
                    {rel.category} • {rel.readingTime}
                  </span>
                  <h4 className="font-['Orbitron'] font-bold text-base text-white group-hover:text-[#FF7A18] transition-colors mt-1">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-[#B9A6D4] mt-2 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#19E3D0]">
                  <span>Open Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
