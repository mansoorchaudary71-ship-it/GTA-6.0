import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Car, Shield, Building, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import locationsData from '../data/locations.json';
import vehiclesData from '../data/vehicles.json';
import weaponsData from '../data/weapons.json';
import propertiesData from '../data/properties.json';
import guidesData from '../data/guides.json';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open if parent passes control
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.trim().toLowerCase();

  const filteredLocations = cleanQuery
    ? locationsData.filter(
        (l) =>
          l.name.toLowerCase().includes(cleanQuery) ||
          l.category.toLowerCase().includes(cleanQuery) ||
          l.description.toLowerCase().includes(cleanQuery)
      ).slice(0, 4)
    : [];

  const filteredVehicles = cleanQuery
    ? vehiclesData.filter(
        (v) =>
          v.name.toLowerCase().includes(cleanQuery) ||
          v.category.toLowerCase().includes(cleanQuery) ||
          v.manufacturer.toLowerCase().includes(cleanQuery)
      ).slice(0, 4)
    : [];

  const filteredWeapons = cleanQuery
    ? weaponsData.filter(
        (w) =>
          w.name.toLowerCase().includes(cleanQuery) ||
          w.category.toLowerCase().includes(cleanQuery)
      ).slice(0, 4)
    : [];

  const filteredProperties = cleanQuery
    ? propertiesData.filter(
        (p) =>
          p.name.toLowerCase().includes(cleanQuery) ||
          p.location.toLowerCase().includes(cleanQuery) ||
          p.category.toLowerCase().includes(cleanQuery)
      ).slice(0, 4)
    : [];

  const filteredGuides = cleanQuery
    ? guidesData.filter(
        (g) =>
          g.title.toLowerCase().includes(cleanQuery) ||
          g.category.toLowerCase().includes(cleanQuery) ||
          g.excerpt.toLowerCase().includes(cleanQuery)
      ).slice(0, 3)
    : [];

  const totalResults =
    filteredLocations.length +
    filteredVehicles.length +
    filteredWeapons.length +
    filteredProperties.length +
    filteredGuides.length;

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Vice Tools database and guides"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-[#FF2E93]/40 bg-[#150A24] shadow-2xl shadow-black/90 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-[#FF2E93]/20 bg-[#1E1033]/60">
          <Search className="w-5 h-5 text-[#FF2E93] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search weapons, vehicles, properties, map points, or guides..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-[#B9A6D4]/50 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-[#B9A6D4] hover:text-white hover:bg-white/10 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#B9A6D4]/60 bg-white/5 border border-white/10 rounded">
              ESC
            </kbd>
          )}
          <button
            onClick={onClose}
            className="p-1.5 ml-2 text-[#B9A6D4] hover:text-white rounded-lg hover:bg-white/10"
            aria-label="Close search modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-4 space-y-4">
          {!cleanQuery && (
            <div className="text-center py-10 text-[#B9A6D4]/60">
              <Search className="w-10 h-10 mx-auto text-[#FF2E93]/30 mb-2" />
              <p className="text-sm font-medium">Type any keyword to query Vice Tools</p>
              <p className="text-xs text-[#B9A6D4]/40 mt-1">
                Try &quot;Infernus&quot;, &quot;Penthouse&quot;, &quot;Airport&quot;, &quot;Carbine&quot;, or &quot;Preload&quot;
              </p>
            </div>
          )}

          {cleanQuery && totalResults === 0 && (
            <div className="text-center py-10 text-[#B9A6D4]">
              <p className="text-sm font-medium text-white">No results found for &quot;{query}&quot;</p>
              <p className="text-xs text-[#B9A6D4]/60 mt-1">
                Try browsing our Vehicles or Map sections directly.
              </p>
            </div>
          )}

          {/* Locations Results */}
          {filteredLocations.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#19E3D0] uppercase tracking-wider mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Map Coordinates ({filteredLocations.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredLocations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => handleSelect(`/map?id=${loc.id}`)}
                    className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-[#FF2E93]/15 hover:border-[#FF2E93]/50 border border-transparent transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-[#FF2E93]">
                        {loc.name}
                      </div>
                      <div className="text-xs text-[#B9A6D4]/70">
                        {loc.category} • {loc.description.slice(0, 65)}...
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#B9A6D4]/40 group-hover:text-[#FF2E93] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Vehicles Results */}
          {filteredVehicles.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#FF7A18] uppercase tracking-wider mb-2">
                <Car className="w-3.5 h-3.5" />
                <span>Vehicles ({filteredVehicles.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredVehicles.map((veh) => (
                  <button
                    key={veh.id}
                    onClick={() => handleSelect(`/database/vehicles/${veh.slug}`)}
                    className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-[#FF7A18]/15 hover:border-[#FF7A18]/50 border border-transparent transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-[#FF7A18]">
                        {veh.name}
                      </div>
                      <div className="text-xs text-[#B9A6D4]/70">
                        {veh.category} • ${veh.price.toLocaleString()} • Top Speed: {veh.stats.topSpeed}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#B9A6D4]/40 group-hover:text-[#FF7A18] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Weapons Results */}
          {filteredWeapons.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#FF2E93] uppercase tracking-wider mb-2">
                <Shield className="w-3.5 h-3.5" />
                <span>Weapons & Gear ({filteredWeapons.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredWeapons.map((wep) => (
                  <button
                    key={wep.id}
                    onClick={() => handleSelect(`/database/weapons/${wep.slug}`)}
                    className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-[#FF2E93]/15 hover:border-[#FF2E93]/50 border border-transparent transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-[#FF2E93]">
                        {wep.name}
                      </div>
                      <div className="text-xs text-[#B9A6D4]/70">
                        {wep.category} • ${wep.price.toLocaleString()} • Damage: {wep.stats.damage}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#B9A6D4]/40 group-hover:text-[#FF2E93] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Properties Results */}
          {filteredProperties.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#FFC857] uppercase tracking-wider mb-2">
                <Building className="w-3.5 h-3.5" />
                <span>Real Estate ({filteredProperties.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredProperties.map((prop) => (
                  <button
                    key={prop.id}
                    onClick={() => handleSelect(`/database/properties/${prop.slug}`)}
                    className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-[#FFC857]/15 hover:border-[#FFC857]/50 border border-transparent transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-[#FFC857]">
                        {prop.name}
                      </div>
                      <div className="text-xs text-[#B9A6D4]/70">
                        {prop.category} • {prop.location} • ${prop.price.toLocaleString()}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#B9A6D4]/40 group-hover:text-[#FFC857] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Guides Results */}
          {filteredGuides.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-purple-400 uppercase tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5" />
                <span>Guides & Articles ({filteredGuides.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredGuides.map((guide) => (
                  <button
                    key={guide.slug}
                    onClick={() => handleSelect(`/guides/${guide.slug}`)}
                    className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-purple-500/15 hover:border-purple-500/50 border border-transparent transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-purple-300">
                        {guide.title}
                      </div>
                      <div className="text-xs text-[#B9A6D4]/70">
                        {guide.category} • {guide.readingTime}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#B9A6D4]/40 group-hover:text-purple-300 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-3 bg-[#0B0614]/80 border-t border-white/5 flex items-center justify-between text-[11px] text-[#B9A6D4]/60 font-mono">
          <span>Navigate with mouse or tap</span>
          <span>Vice Tools Index</span>
        </div>
      </div>
    </div>
  );
}
