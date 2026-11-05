import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import L from 'leaflet';
import {
  Filter,
  Search,
  CheckCircle,
  Circle,
  Share2,
  Download,
  Upload,
  RotateCcw,
  Eye,
  EyeOff,
  MapPin,
  Car,
  Home,
  Flame,
  ShoppingBag,
  Sparkles,
  Plane,
  X,
  SlidersHorizontal,
  Info
} from 'lucide-react';

import { SEO } from '../components/SEO';
import { BadgeStatus } from '../components/BadgeStatus';
import locationsData from '../data/locations.json';

interface LocationItem {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  description: string;
  status: string;
}

const CATEGORIES = [
  { name: 'Collectibles', color: '#FFC857', icon: Sparkles },
  { name: 'Vehicles', color: '#FF7A18', icon: Car },
  { name: 'Properties', color: '#19E3D0', icon: Home },
  { name: 'Missions', color: '#FF2E93', icon: Flame },
  { name: 'Stores', color: '#D81B9A', icon: ShoppingBag },
  { name: 'Hidden Items', color: '#A855F7', icon: MapPin },
  { name: 'Fast Travel', color: '#38BDF8', icon: Plane },
];

function createCustomPin(color: string, isFound: boolean) {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        position: relative;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: ${isFound ? '0.45' : '1'};
        transform: translate(-50%, -100%);
      ">
        <div style="
          width: 24px;
          height: 24px;
          border-radius: 50% 50% 50% 0;
          background: ${color};
          transform: rotate(-45deg);
          border: 2px solid #FFFFFF;
          box-shadow: 0 0 12px ${color};
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 8px;
            height: 8px;
            background: #0B0614;
            border-radius: 50%;
          "></div>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

export function MapPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    CATEGORIES.map((c) => c.name)
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [hideFound, setHideFound] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [dataModalMode, setDataModalMode] = useState<'export' | 'import'>('export');
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Local storage of discovered markers
  const [foundIds, setFoundIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vicetools_found_markers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const saveFoundIds = (newIds: string[]) => {
    setFoundIds(newIds);
    localStorage.setItem('vicetools_found_markers', JSON.stringify(newIds));
  };

  const toggleFound = (id: string) => {
    if (foundIds.includes(id)) {
      saveFoundIds(foundIds.filter((item) => item !== id));
      showToast('Marker unchecked');
    } else {
      saveFoundIds([...foundIds, id]);
      showToast('Marked as discovered!');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // URL query handling (?id=loc-01&category=Vehicles)
  const queryId = searchParams.get('id');
  const queryCategory = searchParams.get('category');

  useEffect(() => {
    if (queryCategory) {
      const match = CATEGORIES.find(
        (c) => c.name.toLowerCase() === queryCategory.toLowerCase()
      );
      if (match && !selectedCategories.includes(match.name)) {
        setSelectedCategories([match.name]);
      }
    }
  }, [queryCategory]);

  const targetLocation = useMemo(() => {
    if (!queryId) return null;
    return locationsData.find((l) => l.id === queryId) || null;
  }, [queryId]);

  // Filter locations
  const filteredLocations = useMemo(() => {
    return locationsData.filter((loc) => {
      if (!selectedCategories.includes(loc.category)) return false;
      if (hideFound && foundIds.includes(loc.id)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = loc.name.toLowerCase().includes(q);
        const matchesDesc = loc.description.toLowerCase().includes(q);
        const matchesCat = loc.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      return true;
    });
  }, [selectedCategories, hideFound, foundIds, searchQuery]);

  // Statistics
  const totalCount = locationsData.length;
  const foundCount = foundIds.filter((id) =>
    locationsData.some((l) => l.id === id)
  ).length;
  const overallPercentage = Math.round((foundCount / totalCount) * 100);

  const categoryStats = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const totalInCat = locationsData.filter((l) => l.category === cat.name).length;
      const foundInCat = locationsData.filter(
        (l) => l.category === cat.name && foundIds.includes(l.id)
      ).length;
      const pct = totalInCat > 0 ? Math.round((foundInCat / totalInCat) * 100) : 0;
      return {
        ...cat,
        total: totalInCat,
        found: foundInCat,
        pct,
      };
    });
  }, [foundIds]);

  const toggleCategory = (catName: string) => {
    if (selectedCategories.includes(catName)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== catName));
    } else {
      setSelectedCategories([...selectedCategories, catName]);
    }
  };

  const selectAllCategories = () => setSelectedCategories(CATEGORIES.map((c) => c.name));
  const clearAllCategories = () => setSelectedCategories([]);

  const handleCopyShareLink = (loc: LocationItem) => {
    const url = `${window.location.origin}/map?category=${encodeURIComponent(
      loc.category
    )}&id=${loc.id}`;
    navigator.clipboard.writeText(url);
    showToast('Direct coordinate link copied to clipboard!');
  };

  const handleResetProgress = () => {
    saveFoundIds([]);
    setShowResetConfirm(false);
    showToast('All map discovery progress cleared.');
  };

  const handleExportJson = () => {
    const dataStr = JSON.stringify(foundIds, null, 2);
    navigator.clipboard.writeText(dataStr);
    showToast('Progress JSON copied to clipboard!');
  };

  const handleImportJson = () => {
    setImportError('');
    try {
      const parsed = JSON.parse(importJsonText);
      if (!Array.isArray(parsed)) {
        throw new Error('Import data must be a JSON array of location IDs.');
      }
      saveFoundIds(parsed);
      setShowDataModal(false);
      setImportJsonText('');
      showToast(`Successfully imported ${parsed.length} discovered items!`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setImportError(err.message);
      } else {
        setImportError('Invalid JSON format.');
      }
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const initialCenter: [number, number] = targetLocation 
      ? [targetLocation.lat, targetLocation.lng]
      : [25.78, -80.20];

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: 12,
      minZoom: 10,
      maxZoom: 16,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CARTO &copy; OpenStreetMap',
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = layerGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers when filters / foundIds change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    const layer = markersLayerRef.current;
    layer.clearLayers();

    filteredLocations.forEach((loc) => {
      const catConfig = CATEGORIES.find((c) => c.name === loc.category);
      const color = catConfig ? catConfig.color : '#FF2E93';
      const isFound = foundIds.includes(loc.id);

      const marker = L.marker([loc.lat, loc.lng], {
        icon: createCustomPin(color, isFound),
      });

      // Construct popup element
      const popupDiv = document.createElement('div');
      popupDiv.className = 'p-1 max-w-xs text-left';
      popupDiv.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px;">
          <span style="font-size:10px;font-family:monospace;font-weight:bold;text-transform:uppercase;padding:2px 6px;border-radius:4px;background-color:${color}25;color:${color}">
            ${loc.category}
          </span>
          <span style="font-size:10px;font-family:monospace;color:${loc.status === 'confirmed' ? '#19E3D0' : '#FFC857'}">
            ${loc.status.toUpperCase()}
          </span>
        </div>
        <h4 style="font-family:'Orbitron',sans-serif;font-weight:bold;font-size:14px;color:#FFFFFF;margin:0 0 4px 0;">
          ${loc.name}
        </h4>
        <p style="font-size:12px;color:#B9A6D4;line-height:1.4;margin:0 0 10px 0;">
          ${loc.description}
        </p>
        <div style="padding-top:8px;border-top:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:space-between;gap:8px;">
          <button id="btn-toggle-${loc.id}" style="
            flex:1;
            padding:6px 10px;
            border-radius:8px;
            font-size:11px;
            font-family:monospace;
            font-weight:bold;
            cursor:pointer;
            background:${isFound ? 'rgba(25,227,208,0.2)' : 'rgba(255,255,255,0.1)'};
            color:${isFound ? '#19E3D0' : '#FFFFFF'};
            border:${isFound ? '1px solid rgba(25,227,208,0.4)' : '1px solid rgba(255,255,255,0.15)'};
          ">
            ${isFound ? '✓ Discovered' : '○ Mark Found'}
          </button>
          <button id="btn-share-${loc.id}" style="
            padding:6px 10px;
            border-radius:8px;
            font-size:11px;
            cursor:pointer;
            background:rgba(255,255,255,0.05);
            color:#B9A6D4;
            border:1px solid rgba(255,255,255,0.1);
          " title="Copy coordinate link">
            🔗
          </button>
        </div>
      `;

      marker.bindPopup(popupDiv);

      marker.on('popupopen', () => {
        const toggleBtn = document.getElementById(`btn-toggle-${loc.id}`);
        const shareBtn = document.getElementById(`btn-share-${loc.id}`);

        if (toggleBtn) {
          toggleBtn.onclick = () => {
            toggleFound(loc.id);
            marker.closePopup();
          };
        }
        if (shareBtn) {
          shareBtn.onclick = () => {
            handleCopyShareLink(loc);
          };
        }
      });

      layer.addLayer(marker);

      // If this matches queryId, auto-open popup
      if (queryId === loc.id) {
        setTimeout(() => {
          marker.openPopup();
        }, 300);
      }
    });
  }, [filteredLocations, foundIds, queryId]);

  // Center on target location when queryId changes
  useEffect(() => {
    if (targetLocation && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([targetLocation.lat, targetLocation.lng], 13, { duration: 1.2 });
    }
  }, [targetLocation]);

  return (
    <>
      <SEO
        title="Interactive GTA 6 Map | Leonida & Vice City Coordinates"
        description="Explore the full interactive fan map for Grand Theft Auto VI. Track collectibles, stunt jumps, airport fast travel, safehouses, and hidden contraband."
        canonical="/map"
      />

      {/* Main Map Container */}
      <div className="relative w-full h-[calc(100vh-64px)] flex flex-col md:flex-row overflow-hidden bg-[#0B0614]">
        
        {/* LAUNCH NOTICE BANNER */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[400] max-w-lg w-[92%] sm:w-auto px-4 py-2 rounded-xl bg-[#150A24]/90 border border-[#FF2E93]/40 backdrop-blur-md shadow-xl flex items-center justify-between gap-3 text-xs text-[#B9A6D4]">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#19E3D0] shrink-0" />
            <span className="font-mono">
              <strong>Preview Coordinates:</strong> Map data will be fully updated as official satellite surveys release.
            </span>
          </div>
        </div>

        {/* TOAST NOTIFICATION */}
        {toastMessage && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-[500] px-4 py-2 rounded-xl bg-[#19E3D0] text-[#0B0614] font-semibold text-xs font-mono shadow-xl animate-in fade-in slide-in-from-top-2">
            {toastMessage}
          </div>
        )}

        {/* DESKTOP SIDEBAR / FILTER PANEL */}
        <aside className="hidden md:flex flex-col w-80 lg:w-96 bg-[#150A24] border-r border-[#FF2E93]/20 z-10 shrink-0 h-full overflow-hidden">
          {/* Header & Overall Progress */}
          <div className="p-4 border-b border-white/10 bg-[#1E1033]/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#FF2E93]" />
                <h1 className="font-['Orbitron'] font-bold text-base text-white">
                  LEONIDA ATLAS
                </h1>
              </div>
              <span className="text-[10px] font-mono text-[#19E3D0] bg-[#19E3D0]/10 border border-[#19E3D0]/30 px-2 py-0.5 rounded font-bold">
                FAN RADAR
              </span>
            </div>

            {/* Overall Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#B9A6D4]">Exploration Progress</span>
                <span className="text-white font-bold">
                  {foundCount} / {totalCount} ({overallPercentage}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#FF2E93] via-[#FF7A18] to-[#19E3D0] transition-all duration-300"
                  style={{ width: `${overallPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className="p-3 border-b border-white/5">
            <div className="relative">
              <Search className="w-4 h-4 text-[#B9A6D4] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search locations or items..."
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-[#B9A6D4]/40 focus:border-[#FF2E93] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#B9A6D4] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Controls Bar */}
          <div className="px-4 py-2.5 border-b border-white/5 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <button
                onClick={selectAllCategories}
                className="text-[#19E3D0] hover:underline cursor-pointer"
              >
                All
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={clearAllCategories}
                className="text-[#B9A6D4] hover:underline cursor-pointer"
              >
                Clear
              </button>
            </div>

            <button
              onClick={() => setHideFound(!hideFound)}
              className="flex items-center gap-1.5 text-xs text-[#B9A6D4] hover:text-white cursor-pointer"
            >
              {hideFound ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-[#FF7A18]" />
                  <span>Hidden ({foundCount})</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Hide Found</span>
                </>
              )}
            </button>
          </div>

          {/* Categories List with Checkboxes & Progress */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            {categoryStats.map((cat) => {
              const isChecked = selectedCategories.includes(cat.name);
              return (
                <div
                  key={cat.name}
                  onClick={() => toggleCategory(cat.name)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isChecked
                      ? 'bg-white/5 border-white/10 hover:border-[#FF2E93]/40'
                      : 'bg-transparent border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <div>
                      <div className="text-xs font-semibold text-white">
                        {cat.name}
                      </div>
                      <div className="text-[10px] font-mono text-[#B9A6D4]/70">
                        {cat.found} / {cat.total} found
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#B9A6D4]">
                      {cat.pct}%
                    </span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="rounded accent-[#FF2E93] cursor-pointer"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Bar (Import / Export / Reset) */}
          <div className="p-3 border-t border-white/10 bg-[#0B0614]/80 flex items-center justify-between text-xs font-mono">
            <button
              onClick={() => {
                setDataModalMode('export');
                setShowDataModal(true);
              }}
              className="flex items-center gap-1 text-[#B9A6D4] hover:text-[#19E3D0] p-1.5 rounded hover:bg-white/5 cursor-pointer"
              title="Backup your discovered markers"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>

            <button
              onClick={() => {
                setDataModalMode('import');
                setShowDataModal(true);
              }}
              className="flex items-center gap-1 text-[#B9A6D4] hover:text-[#19E3D0] p-1.5 rounded hover:bg-white/5 cursor-pointer"
              title="Import saved progress"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import</span>
            </button>

            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-1 text-[#FF2E93] hover:text-red-400 p-1.5 rounded hover:bg-white/5 cursor-pointer"
              title="Reset discovered markers"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </aside>

        {/* MOBILE FILTER TOGGLE BAR (FLOATING) */}
        <div className="md:hidden absolute bottom-20 left-4 right-4 z-[400] flex items-center gap-2">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#150A24]/95 border border-[#FF2E93] text-white font-mono text-xs font-semibold shadow-xl shadow-black/80 backdrop-blur-md cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#FF2E93]" />
            <span>Map Filters & Progress ({foundCount}/{totalCount})</span>
          </button>
        </div>

        {/* MOBILE BOTTOM SHEET FOR FILTERS */}
        {mobileFilterOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[600] md:hidden bg-black/75 backdrop-blur-sm flex items-end"
            onClick={() => setMobileFilterOpen(false)}
          >
            <div
              className="w-full bg-[#150A24] border-t border-[#FF2E93] rounded-t-3xl p-6 pb-24 max-h-[80vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <div>
                  <h3 className="font-['Orbitron'] font-bold text-base text-white">
                    FILTER MAP COORDINATES
                  </h3>
                  <p className="text-xs text-[#B9A6D4]">
                    Discovered: {foundCount} of {totalCount} ({overallPercentage}%)
                  </p>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 rounded-lg text-[#B9A6D4] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Quick Actions */}
              <div className="flex items-center justify-between py-2 border-b border-white/5 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <button onClick={selectAllCategories} className="text-[#19E3D0]">
                    Select All
                  </button>
                  <span>•</span>
                  <button onClick={clearAllCategories} className="text-[#B9A6D4]">
                    Clear
                  </button>
                </div>
                <button
                  onClick={() => setHideFound(!hideFound)}
                  className="text-xs text-[#FF7A18]"
                >
                  {hideFound ? 'Showing All' : 'Hide Found Items'}
                </button>
              </div>

              {/* Categories */}
              <div className="overflow-y-auto py-3 space-y-2 flex-1">
                {categoryStats.map((cat) => {
                  const isChecked = selectedCategories.includes(cat.name);
                  return (
                    <div
                      key={cat.name}
                      onClick={() => toggleCategory(cat.name)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                        isChecked
                          ? 'bg-white/5 border-[#FF2E93]/40'
                          : 'bg-transparent border-transparent opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                        <span className="text-sm font-semibold text-white">
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#B9A6D4]">
                        {cat.found}/{cat.total}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="text-xs font-mono text-[#FF2E93] hover:underline"
                >
                  Reset Progress
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF2E93] to-[#FF7A18] text-white font-mono text-xs font-bold"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* NATIVE LEAFLET MAP CONTAINER */}
        <div className="flex-1 h-full relative z-0">
          <div ref={mapContainerRef} className="w-full h-full bg-[#0B0614]" />
        </div>

        {/* RESET CONFIRMATION MODAL */}
        {showResetConfirm && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[700] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          >
            <div className="max-w-sm w-full bg-[#150A24] border border-[#FF2E93] rounded-2xl p-6 shadow-2xl">
              <h4 className="font-['Orbitron'] font-bold text-base text-white mb-2">
                RESET EXPLORATION PROGRESS?
              </h4>
              <p className="text-xs text-[#B9A6D4] leading-relaxed mb-6">
                This will uncheck all {foundCount} discovered locations stored in your browser. This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-[#B9A6D4] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetProgress}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#FF2E93] text-white hover:bg-red-500"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* IMPORT / EXPORT MODAL */}
        {showDataModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[700] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          >
            <div className="max-w-md w-full bg-[#150A24] border border-[#19E3D0]/50 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <h4 className="font-['Orbitron'] font-bold text-base text-white">
                  {dataModalMode === 'export' ? 'EXPORT PROGRESS' : 'IMPORT PROGRESS'}
                </h4>
                <button
                  onClick={() => setShowDataModal(false)}
                  className="text-[#B9A6D4] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {dataModalMode === 'export' ? (
                <div className="space-y-4">
                  <p className="text-xs text-[#B9A6D4]">
                    Your current discovered list contains {foundCount} markers. Click below to copy the JSON payload to transfer across devices.
                  </p>
                  <pre className="p-3 rounded-xl bg-black/50 border border-white/10 text-[11px] font-mono text-[#19E3D0] max-h-40 overflow-y-auto">
                    {JSON.stringify(foundIds, null, 2)}
                  </pre>
                  <button
                    onClick={handleExportJson}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#19E3D0] to-[#FF2E93] text-[#0B0614] font-mono font-bold text-xs hover:brightness-110 cursor-pointer"
                  >
                    Copy JSON to Clipboard
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-[#B9A6D4]">
                    Paste your previously exported JSON array of discovered IDs below:
                  </p>
                  <textarea
                    rows={4}
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    placeholder='["loc-01", "loc-02"]'
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-white placeholder-white/20 focus:border-[#19E3D0] focus:outline-none"
                  />
                  {importError && (
                    <p className="text-xs text-[#FF2E93] font-mono">{importError}</p>
                  )}
                  <button
                    onClick={handleImportJson}
                    className="w-full py-2.5 rounded-xl bg-[#19E3D0] text-[#0B0614] font-mono font-bold text-xs hover:brightness-110 cursor-pointer"
                  >
                    Load Progress
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </>
  );
}
