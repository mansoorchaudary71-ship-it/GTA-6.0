import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Crosshair, 
  Plus, 
  Trash2, 
  Share2, 
  Save, 
  Sparkles, 
  ArrowRight, 
  Coins, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Bookmark,
  ShieldAlert
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';

import { SEO } from '../../components/SEO';
import { AdSlot } from '../../components/AdSlot';
import { BadgeStatus } from '../../components/BadgeStatus';
import { FAQSection, FAQItem, buildFaqPageSchema } from '../../components/FAQSection';
import weaponsData from '../../data/weapons.json';

interface WeaponItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  magCapacity: number;
  stats: {
    damage: number;
    range: number;
    fireRate: number;
    accuracy: number;
    mobility: number;
  };
  description: string;
  status: string;
}

interface SavedPreset {
  id: string;
  name: string;
  weaponIds: string[];
  createdAt: string;
}

export function LoadoutBuilder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedWeaponIds, setSelectedWeaponIds] = useState<string[]>([]);
  const [savedPresets, setSavedPresets] = useState<SavedPreset[]>(() => {
    try {
      const saved = localStorage.getItem('vicetools_loadout_presets');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [presetNameInput, setPresetNameInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Read URL params ?w=wep-01,wep-02 on initial load
  useEffect(() => {
    const weaponParam = searchParams.get('w');
    if (weaponParam) {
      const ids = weaponParam.split(',').filter((id) => weaponsData.some((w) => w.id === id));
      if (ids.length > 0) {
        setSelectedWeaponIds(ids.slice(0, 6));
        return;
      }
    }
    // Default starter loadout: VP-9 + Carbine + Pump Shotgun
    setSelectedWeaponIds(['wep-01', 'wep-02', 'wep-04']);
  }, []);

  // Sync state to URL for sharing
  const syncToUrl = (ids: string[]) => {
    if (ids.length > 0) {
      setSearchParams({ w: ids.join(',') }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  const handleAddWeapon = (id: string) => {
    if (selectedWeaponIds.includes(id)) return;
    if (selectedWeaponIds.length >= 6) {
      showToast('Maximum 6 weapons allowed in a loadout.');
      return;
    }
    const updated = [...selectedWeaponIds, id];
    setSelectedWeaponIds(updated);
    syncToUrl(updated);
  };

  const handleRemoveWeapon = (id: string) => {
    const updated = selectedWeaponIds.filter((wId) => wId !== id);
    setSelectedWeaponIds(updated);
    syncToUrl(updated);
  };

  const handleClearAll = () => {
    setSelectedWeaponIds([]);
    syncToUrl([]);
  };

  const handleCopyShareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    showToast('Loadout permalink copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Preset saving in localStorage
  const handleSavePreset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!presetNameInput.trim() || selectedWeaponIds.length === 0) return;

    const newPreset: SavedPreset = {
      id: `preset-${Date.now()}`,
      name: presetNameInput.trim(),
      weaponIds: selectedWeaponIds,
      createdAt: new Date().toLocaleDateString(),
    };

    const updated = [newPreset, ...savedPresets];
    setSavedPresets(updated);
    localStorage.setItem('vicetools_loadout_presets', JSON.stringify(updated));
    setPresetNameInput('');
    showToast(`Saved preset "${newPreset.name}" to browser storage!`);
  };

  const handleLoadPreset = (preset: SavedPreset) => {
    setSelectedWeaponIds(preset.weaponIds);
    syncToUrl(preset.weaponIds);
    showToast(`Loaded "${preset.name}"`);
  };

  const handleDeletePreset = (id: string) => {
    const updated = savedPresets.filter((p) => p.id !== id);
    setSavedPresets(updated);
    localStorage.setItem('vicetools_loadout_presets', JSON.stringify(updated));
  };

  // Selected weapons objects
  const selectedWeapons: WeaponItem[] = useMemo(() => {
    return selectedWeaponIds
      .map((id) => weaponsData.find((w) => w.id === id))
      .filter((w): w is WeaponItem => Boolean(w));
  }, [selectedWeaponIds]);

  // Aggregate cost
  const totalCost = selectedWeapons.reduce((sum, w) => sum + w.price, 0);

  // Compute average stats for Radar Chart
  const radarData = useMemo(() => {
    if (selectedWeapons.length === 0) {
      return [
        { stat: 'Damage', value: 0, fullMark: 100 },
        { stat: 'Range', value: 0, fullMark: 100 },
        { stat: 'Fire Rate', value: 0, fullMark: 100 },
        { stat: 'Accuracy', value: 0, fullMark: 100 },
        { stat: 'Mobility', value: 0, fullMark: 100 },
      ];
    }

    const totals = selectedWeapons.reduce(
      (acc, w) => ({
        damage: acc.damage + w.stats.damage,
        range: acc.range + w.stats.range,
        fireRate: acc.fireRate + w.stats.fireRate,
        accuracy: acc.accuracy + w.stats.accuracy,
        mobility: acc.mobility + w.stats.mobility,
      }),
      { damage: 0, range: 0, fireRate: 0, accuracy: 0, mobility: 0 }
    );

    const count = selectedWeapons.length;
    return [
      { stat: 'Damage', value: Math.round(totals.damage / count), fullMark: 100 },
      { stat: 'Range', value: Math.round(totals.range / count), fullMark: 100 },
      { stat: 'Fire Rate', value: Math.round(totals.fireRate / count), fullMark: 100 },
      { stat: 'Accuracy', value: Math.round(totals.accuracy / count), fullMark: 100 },
      { stat: 'Mobility', value: Math.round(totals.mobility / count), fullMark: 100 },
    ];
  }, [selectedWeapons]);

  const seoFaqs: FAQItem[] = [
    {
      id: 'faq-loadout-1',
      question: 'How does weapon synergy impact my combat rating in GTA 6?',
      answer: 'A balanced loadout prevents tactical blindspots. Equipping only heavy rifles sacrifices mobility when entering close-quarters stairwells or motorcycle getaways. Combining high-mobility sidearms with mid-range automatic carbines and a specialized sniper weapon ensures full engagement flexibility.',
      status: 'confirmed'
    },
    {
      id: 'faq-loadout-2',
      question: 'Can I share my custom loadouts with crew members?',
      answer: 'Yes. Every change you make automatically serializes into the browser URL. Simply click "Copy Share Link" and send the permalink to your crew or discord channel. They will instantly see your exact weapon slots and radar polygon.',
      status: 'confirmed'
    },
    {
      id: 'faq-loadout-3',
      question: 'Are loadout cost calculations based on base weapon costs or attachments?',
      answer: 'Currently, the total cost reflects the acquisition sticker price from Ammu-Nation storefronts. When the full weapon mod tree is confirmed post-launch, attachment costs (suppressors, optics, extended drums) will be integrated.',
      status: 'unconfirmed'
    },
    {
      id: 'faq-loadout-4',
      question: 'How is the 5-axis combat radar chart calculated?',
      answer: 'The radar polygon averages out damage, effective range, cyclic fire rate, accuracy, and handling mobility across all equipped slots on a normalized 0-100 baseline.',
      status: 'confirmed'
    }
  ];

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Vice Tools Loadout Radar Builder',
    applicationCategory: 'GameApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    description: 'Interactive tactical loadout builder and radar chart visualizer for Grand Theft Auto VI weaponry and gear.'
  };

  const faqSchema = buildFaqPageSchema(seoFaqs);

  return (
    <>
      <SEO
        title="GTA 6 Loadout Radar Builder | Weapon Stats & Cost Calculator"
        description="Build and balance up to 6 weapon slots for GTA 6. Interactive radar chart analyzes damage, range, mobility, and accuracy. Shareable permalinks."
        canonical="/calculators/loadout"
        schema={[appSchema, faqSchema]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#B9A6D4]/70 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/calculators" className="hover:text-white">Calculators</Link>
          <span>/</span>
          <span className="text-[#FF2E93]">Loadout Builder</span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#150A24] border border-[#FF2E93]/40 text-xs font-mono text-[#FF2E93] mb-3">
            <Crosshair className="w-3.5 h-3.5" />
            <span>TACTICAL ARMORY SIMULATOR</span>
          </div>
          <h1 className="font-['Orbitron'] font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            Loadout <span className="text-[#FF2E93]">Radar Builder</span>
          </h1>
          <p className="mt-3 text-sm text-[#B9A6D4] leading-relaxed">
            Construct custom multi-slot weapon arsenals tailored for robbery getaways, open Everglades reconnaissance, and syndicate turf wars. Analyze dynamic radar synergy curves, calculate purchase budgets, and generate shareable links.
          </p>
        </div>

        {/* Toast */}
        {feedbackToast && (
          <div className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#19E3D0] text-[#0B0614] font-semibold text-xs font-mono shadow-2xl animate-in fade-in slide-in-from-top-2">
            {feedbackToast}
          </div>
        )}

        {/* Ad slot */}
        <AdSlot size="leaderboard" label="Sponsorship" className="mb-8" />

        {/* BUILDER WORKSPACE (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT: CURRENT LOADOUT SLOTS & WEAPON PICKER (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* ACTIVE SLOTS CONTAINER */}
            <div className="p-6 rounded-3xl bg-[#150A24] border border-[#FF2E93]/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-['Orbitron'] font-bold text-base text-white">
                    Equipped Slots ({selectedWeapons.length}/6)
                  </h2>
                  <p className="text-xs text-[#B9A6D4]">
                    Tap trash icon to unequip slot
                  </p>
                </div>
                {selectedWeapons.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="text-xs font-mono text-[#B9A6D4] hover:text-[#FF2E93] underline cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Slots Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedWeapons.map((wep, idx) => (
                  <div
                    key={wep.id}
                    className="p-3.5 rounded-2xl bg-gradient-to-b from-[#1E1033] to-[#150A24] border border-[#FF2E93]/40 flex items-start justify-between gap-3 shadow-md group"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white font-bold">
                          Slot {idx + 1}
                        </span>
                        <span className="text-[10px] font-mono text-[#19E3D0]">
                          {wep.category}
                        </span>
                      </div>
                      <h3 className="font-['Orbitron'] font-bold text-sm text-white">
                        {wep.name}
                      </h3>
                      <div className="text-xs font-mono text-[#FFC857] mt-1">
                        ${wep.price.toLocaleString()} • {wep.magCapacity} Rnds
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveWeapon(wep.id)}
                      className="p-1.5 rounded-lg text-[#B9A6D4] hover:text-[#FF2E93] hover:bg-white/5 transition-colors"
                      aria-label={`Remove ${wep.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Empty slot placeholders up to 6 */}
                {Array.from({ length: Math.max(0, 6 - selectedWeapons.length) }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="p-4 rounded-2xl border border-dashed border-white/10 flex items-center justify-center text-center text-xs font-mono text-[#B9A6D4]/40 min-h-[90px]"
                  >
                    Empty Slot {selectedWeapons.length + i + 1}
                  </div>
                ))}
              </div>

              {/* Share & Save Preset Bar */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleCopyShareLink}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-[#FF2E93]/20 hover:border-[#FF2E93]/40 border border-white/10 text-xs font-mono text-white transition-all cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-[#19E3D0]" /> : <Share2 className="w-3.5 h-3.5 text-[#FF2E93]" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Copy Share Link'}</span>
                </button>

                {/* Save Preset to LocalStorage Form */}
                <form onSubmit={handleSavePreset} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={presetNameInput}
                    onChange={(e) => setPresetNameInput(e.target.value)}
                    placeholder="Preset name (e.g. Heist Kit)..."
                    className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-white/30 focus:border-[#FF2E93] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-[#FF2E93] hover:bg-[#FF7A18] text-white transition-all cursor-pointer"
                    title="Save Loadout"
                  >
                    <Save className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>

            {/* CATALOG PICKER TO ADD WEAPONS */}
            <div className="p-6 rounded-3xl bg-[#150A24] border border-white/10 shadow-xl space-y-4">
              <h2 className="font-['Orbitron'] font-bold text-base text-white">
                Available Armory ({weaponsData.length} Models)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                {weaponsData.map((wep) => {
                  const isSelected = selectedWeaponIds.includes(wep.id);
                  return (
                    <div
                      key={wep.id}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#19E3D0]/10 border-[#19E3D0]/40 opacity-75'
                          : 'bg-white/5 border-white/5 hover:border-[#FF2E93]/40 hover:bg-[#1E1033]'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold text-white">
                          {wep.name}
                        </div>
                        <div className="text-[11px] font-mono text-[#B9A6D4]/70 mt-0.5">
                          {wep.category} • ${wep.price.toLocaleString()}
                        </div>
                      </div>

                      {isSelected ? (
                        <span className="text-[10px] font-mono font-bold text-[#19E3D0] px-2 py-1 rounded bg-[#19E3D0]/10">
                          EQUIPPED
                        </span>
                      ) : (
                        <button
                          onClick={() => handleAddWeapon(wep.id)}
                          className="p-2 rounded-xl bg-white/10 hover:bg-[#FF2E93] text-white transition-all cursor-pointer"
                          aria-label={`Equip ${wep.name}`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SAVED LOCALSTORAGE PRESETS */}
            {savedPresets.length > 0 && (
              <div className="p-6 rounded-3xl bg-[#150A24] border border-white/10 space-y-3">
                <h3 className="font-['Orbitron'] font-bold text-sm text-white flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[#19E3D0]" />
                  <span>Saved Browser Presets ({savedPresets.length})</span>
                </h3>
                <div className="space-y-2">
                  {savedPresets.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-semibold text-white">{p.name}</span>
                        <span className="text-[10px] font-mono text-[#B9A6D4]/60 ml-2">
                          ({p.weaponIds.length} weapons • {p.createdAt})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleLoadPreset(p)}
                          className="px-2.5 py-1 rounded-lg bg-[#19E3D0]/20 text-[#19E3D0] hover:bg-[#19E3D0]/30 font-mono font-bold cursor-pointer"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => handleDeletePreset(p.id)}
                          className="p-1 text-[#B9A6D4] hover:text-[#FF2E93] cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT: RADAR STAT VISUALIZER & FINANCIAL TOTAL (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* TOTAL ARSENAL BUDGET */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1E1033] to-[#150A24] border border-[#FF2E93]/40 shadow-xl text-center">
              <span className="text-xs font-mono uppercase tracking-widest text-[#B9A6D4]">
                Total Loadout Acquisition Cost
              </span>
              <div className="text-3xl sm:text-4xl font-['Space_Mono'] font-bold text-white mt-1">
                ${totalCost.toLocaleString()}
              </div>
              <p className="text-xs text-[#B9A6D4] mt-2">
                Across {selectedWeapons.length} primary, secondary, and utility items.
              </p>
            </div>

            {/* RADAR STATS POLYGON */}
            <div className="p-6 rounded-3xl bg-[#150A24] border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-['Orbitron'] font-bold text-base text-white">
                    Combat Synergy Radar
                  </h3>
                  <p className="text-xs text-[#B9A6D4]">
                    Aggregate 5-axis combat capability index
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[#FF2E93] bg-[#FF2E93]/10 px-2 py-0.5 rounded border border-[#FF2E93]/30 font-bold">
                  RADAR
                </span>
              </div>

              <div className="w-full h-72 sm:h-80 -my-2">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#2A134A" />
                    <PolarAngleAxis
                      dataKey="stat"
                      stroke="#B9A6D4"
                      tick={{ fill: '#FFF5FB', fontSize: 11, fontFamily: 'Space Mono' }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      stroke="#B9A6D4"
                      tick={{ fill: '#B9A6D4', fontSize: 9 }}
                    />
                    <Radar
                      name="Loadout Synergy"
                      dataKey="value"
                      stroke="#FF2E93"
                      strokeWidth={2}
                      fill="#FF2E93"
                      fillOpacity={0.45}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Stat Breakdowns */}
              <div className="grid grid-cols-5 gap-2 text-center pt-2 border-t border-white/5 font-mono">
                {radarData.map((d) => (
                  <div key={d.stat} className="p-2 rounded-xl bg-white/5">
                    <div className="text-[9px] text-[#B9A6D4] uppercase">{d.stat}</div>
                    <div className="text-sm font-bold text-white mt-0.5">{d.value}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Ad slot */}
        <AdSlot size="banner" label="Sponsored Hardware" className="mb-12" />

        {/* 150+ WORDS SEO TEXT */}
        <section className="mb-12 p-8 rounded-3xl bg-[#150A24] border border-white/10 space-y-4 text-xs sm:text-sm text-[#B9A6D4] leading-relaxed">
          <h2 className="font-['Orbitron'] font-bold text-lg text-white">
            Architecting the Optimal Combat Loadout in Grand Theft Auto VI
          </h2>
          <p>
            Combat in the open world of Leonida demands acute tactical foresight. Unlike previous generations where players carried endless arsenals in an invisible weapon wheel, GTA 6 implements grounded physical holster and trunk storage dynamics. Players must carefully select which sidearm rides in their concealed shoulder holster, which primary rifle sits strapped over the shoulder, and what heavy ordnance is stowed inside the vehicle trunk.
          </p>
          <p>
            Our Loadout Radar Builder visualizes the multi-variable trade-offs between lethality and operational mobility. Pairing a high-damage .44 Magnum with a heavy belt-fed M249 might maximize suppression power, but severely suppresses your character&apos;s sprint stamina and aiming transition speeds. Conversely, combining a rapid-firing Phantom PDW with a Defender 12G shotgun yields top-tier close-quarters handling while leaving your squad vulnerable to rooftop snipers across Ocean Drive.
          </p>
          <p>
            Use our built-in URL serialization to exchange verified weapon presets with your crew before staging complex co-op missions. Every configuration calculates Ammu-Nation checkout costs in real-time so your team knows precisely how much cash to liquidate before rolling out.
          </p>
        </section>

        {/* FAQ ACCORDION & SCHEMA.ORG JSON-LD */}
        <FAQSection
          items={seoFaqs}
          title="Frequently Asked Questions"
          subtitle="Technical guidance on weapon synergy, combat ratings, and squad URL sharing."
          badge="Armory FAQ"
          badgeColor="#FF2E93"
          className="mb-12"
          renderJsonLd={false}
        />

        {/* RELATED TOOL */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-['Orbitron'] font-bold text-sm text-white">
              Need cash to fund this tactical weapon setup?
            </h4>
            <p className="text-xs text-[#B9A6D4]">
              Simulate hours and heist payouts with the Money Calculator.
            </p>
          </div>
          <Link
            to="/calculators/money"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF2E93] to-[#FF7A18] text-white font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 shrink-0"
          >
            <span>Open Money Tool</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </>
  );
}
