import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  Trophy, 
  Plus, 
  Trash2, 
  Sparkles, 
  ArrowRight, 
  Gauge, 
  Zap, 
  Sliders, 
  Coins,
  ChevronDown,
  ChevronUp,
  Flame
} from 'lucide-react';

import { SEO } from '../../components/SEO';
import { AdSlot } from '../../components/AdSlot';
import { BadgeStatus } from '../../components/BadgeStatus';
import { FAQSection, FAQItem, buildFaqPageSchema } from '../../components/FAQSection';
import vehiclesData from '../../data/vehicles.json';

interface Vehicle {
  id: string;
  slug: string;
  name: string;
  category: string;
  manufacturer: string;
  price: number;
  stats: {
    topSpeed: number;
    acceleration: number;
    handling: number;
    braking: number;
  };
  description: string;
  status: string;
}

export function VehicleComparison() {
  // Select up to 4 vehicles for comparison
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'veh-01', // Cheetah Classic GT
    'veh-02', // Infernus Retro S
    'veh-10'  // Coquette D10 Spider
  ]);

  const selectedVehicles = useMemo(() => {
    return selectedIds
      .map((id) => vehiclesData.find((v) => v.id === id))
      .filter((v): v is Vehicle => Boolean(v));
  }, [selectedIds]);

  const handleAddVehicle = (id: string) => {
    if (selectedIds.includes(id)) return;
    if (selectedIds.length >= 4) return;
    setSelectedIds([...selectedIds, id]);
  };

  const handleRemoveVehicle = (id: string) => {
    if (selectedIds.length <= 2) return;
    setSelectedIds(selectedIds.filter((item) => item !== id));
  };

  // Compute category winners
  const winners = useMemo(() => {
    if (selectedVehicles.length === 0) return {};

    const maxSpeed = Math.max(...selectedVehicles.map((v) => v.stats.topSpeed));
    const maxAccel = Math.max(...selectedVehicles.map((v) => v.stats.acceleration));
    const maxHandling = Math.max(...selectedVehicles.map((v) => v.stats.handling));
    const maxBraking = Math.max(...selectedVehicles.map((v) => v.stats.braking));
    const minPrice = Math.min(...selectedVehicles.map((v) => v.price));

    return {
      topSpeed: selectedVehicles.filter((v) => v.stats.topSpeed === maxSpeed).map((v) => v.id),
      acceleration: selectedVehicles.filter((v) => v.stats.acceleration === maxAccel).map((v) => v.id),
      handling: selectedVehicles.filter((v) => v.stats.handling === maxHandling).map((v) => v.id),
      braking: selectedVehicles.filter((v) => v.stats.braking === maxBraking).map((v) => v.id),
      bestValue: selectedVehicles.filter((v) => v.price === minPrice).map((v) => v.id),
    };
  }, [selectedVehicles]);

  const seoFaqs: FAQItem[] = [
    {
      id: 'faq-veh-1',
      question: 'Which vehicle in the Vice City lineup boasts the highest top speed?',
      answer: 'The Pegassi Infernus Retro S leads the exotic supercar tier with an index rating of 97 in straight-line top speed, closely followed by the Grotti Cheetah Classic GT at 92.',
      status: 'confirmed'
    },
    {
      id: 'faq-veh-2',
      question: 'Does higher price guarantee better handling performance in GTA 6?',
      answer: 'Not necessarily. While hypercars command seven-figure price tags, agile sports classics and tuned lightweight motorcycles often achieve superior tight-cornering handling and lower turn radiuses through dense downtown streets.',
      status: 'confirmed'
    },
    {
      id: 'faq-veh-3',
      question: 'How are the vehicle stat bars calculated?',
      answer: 'Ratings are scored on a standardized 0-100 analytical curve based on engine displacement, aerodynamic downforce coefficient, and curb weight telemetry.',
      status: 'unconfirmed'
    },
    {
      id: 'faq-veh-4',
      question: 'Can I compare different classes of vehicles against each other?',
      answer: 'Yes! The Showdown tool allows cross-category comparison, allowing you to benchmark off-road swamp crawlers against classic muscle or exotic roadsters.',
      status: 'confirmed'
    }
  ];

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Vice Tools Vehicle Showdown Tool',
    applicationCategory: 'GameApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    description: 'Head-to-head performance comparator and telemetry analysis tool for Grand Theft Auto VI vehicles.'
  };

  const faqSchema = buildFaqPageSchema(seoFaqs);

  return (
    <>
      <SEO
        title="GTA 6 Vehicle Showdown & Comparison Tool | Specs, Speed & Handling"
        description="Compare up to 4 GTA 6 supercars, classic muscle cars, and off-road trucks side by side. Benchmark top speed, acceleration, handling, and price."
        canonical="/calculators/compare"
        schema={[appSchema, faqSchema]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#B9A6D4]/70 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/calculators" className="hover:text-white">Calculators</Link>
          <span>/</span>
          <span className="text-[#19E3D0]">Vehicle Showdown</span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#150A24] border border-[#19E3D0]/40 text-xs font-mono text-[#19E3D0] mb-3">
            <Car className="w-3.5 h-3.5" />
            <span>TELEMETRY HEAD-TO-HEAD</span>
          </div>
          <h1 className="font-['Orbitron'] font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            Vehicle <span className="text-[#19E3D0]">Showdown</span>
          </h1>
          <p className="mt-3 text-sm text-[#B9A6D4] leading-relaxed">
            Put the finest machines of Leonida to the test. Benchmark up to 4 vehicles side by side across straight-line velocity, 0-60 acceleration, cornering agility, and acquisition price to crown the ultimate getaway ride.
          </p>
        </div>

        {/* Ad slot */}
        <AdSlot size="leaderboard" label="Sponsorship" className="mb-8" />

        {/* VEHICLE SELECTOR ROW */}
        <div className="mb-8 p-4 rounded-2xl bg-[#150A24] border border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-mono text-[#B9A6D4]">
            Comparing <strong className="text-white">{selectedVehicles.length}</strong> of 4 slots:
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {vehiclesData.map((veh) => {
              const isSelected = selectedIds.includes(veh.id);
              return (
                <button
                  key={veh.id}
                  disabled={isSelected || selectedIds.length >= 4}
                  onClick={() => handleAddVehicle(veh.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#19E3D0]/20 text-[#19E3D0] border border-[#19E3D0]/40'
                      : selectedIds.length >= 4
                      ? 'bg-white/5 text-[#B9A6D4]/30 border border-transparent cursor-not-allowed'
                      : 'bg-white/5 hover:bg-white/10 text-[#B9A6D4] hover:text-white border border-white/5'
                  }`}
                >
                  {veh.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* SIDE-BY-SIDE COMPARISON CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {selectedVehicles.map((veh) => {
            const isSpeedWinner = winners.topSpeed?.includes(veh.id);
            const isAccelWinner = winners.acceleration?.includes(veh.id);
            const isHandlingWinner = winners.handling?.includes(veh.id);
            const isValueWinner = winners.bestValue?.includes(veh.id);

            return (
              <div
                key={veh.id}
                className="relative rounded-3xl p-6 bg-gradient-to-b from-[#1E1033] to-[#150A24] border border-[#FF2E93]/20 shadow-xl flex flex-col justify-between"
              >
                {/* Top remove button if > 2 */}
                {selectedVehicles.length > 2 && (
                  <button
                    onClick={() => handleRemoveVehicle(veh.id)}
                    className="absolute top-4 right-4 p-1.5 rounded-lg text-[#B9A6D4] hover:text-[#FF2E93] hover:bg-white/5"
                    aria-label={`Remove ${veh.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-white font-bold">
                      {veh.manufacturer}
                    </span>
                    <BadgeStatus status={veh.status} size="sm" />
                  </div>

                  <h3 className="font-['Orbitron'] font-bold text-lg text-white mb-1">
                    {veh.name}
                  </h3>
                  <div className="text-xs font-mono text-[#19E3D0] mb-4">
                    {veh.category}
                  </div>

                  {/* Price Banner */}
                  <div className={`p-3 rounded-xl mb-6 text-center border font-mono ${
                    isValueWinner 
                      ? 'bg-[#FFC857]/15 border-[#FFC857]/50 text-[#FFC857]' 
                      : 'bg-black/30 border-white/5 text-white'
                  }`}>
                    <div className="text-[10px] uppercase text-[#B9A6D4]">Acquisition Price</div>
                    <div className="text-xl font-bold mt-0.5">${veh.price.toLocaleString()}</div>
                    {isValueWinner && (
                      <div className="text-[10px] text-[#FFC857] flex items-center justify-center gap-1 mt-1 font-bold">
                        <Trophy className="w-3 h-3" />
                        <span>Best Value Pick</span>
                      </div>
                    )}
                  </div>

                  {/* TELEMETRY STATS BARS */}
                  <div className="space-y-4">
                    
                    {/* Top Speed */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-[#B9A6D4] flex items-center gap-1.5">
                          <Gauge className="w-3.5 h-3.5 text-[#FF2E93]" />
                          <span>Top Speed</span>
                        </span>
                        <div className="flex items-center gap-1 font-bold text-white">
                          <span>{veh.stats.topSpeed}</span>
                          {isSpeedWinner && (
                            <span className="text-[10px] text-[#FF2E93] uppercase font-mono px-1 rounded bg-[#FF2E93]/20">
                              FASTEST
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#FF2E93] to-[#FF7A18]"
                          style={{ width: `${veh.stats.topSpeed}%` }}
                        />
                      </div>
                    </div>

                    {/* Acceleration */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-[#B9A6D4] flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-[#FF7A18]" />
                          <span>Acceleration</span>
                        </span>
                        <div className="flex items-center gap-1 font-bold text-white">
                          <span>{veh.stats.acceleration}</span>
                          {isAccelWinner && (
                            <span className="text-[10px] text-[#FF7A18] uppercase font-mono px-1 rounded bg-[#FF7A18]/20">
                              QUICKEST
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#FF7A18] to-[#FFC857]"
                          style={{ width: `${veh.stats.acceleration}%` }}
                        />
                      </div>
                    </div>

                    {/* Handling */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-[#B9A6D4] flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-[#19E3D0]" />
                          <span>Handling</span>
                        </span>
                        <div className="flex items-center gap-1 font-bold text-white">
                          <span>{veh.stats.handling}</span>
                          {isHandlingWinner && (
                            <span className="text-[10px] text-[#19E3D0] uppercase font-mono px-1 rounded bg-[#19E3D0]/20">
                              MOST AGILE
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#19E3D0] to-[#38BDF8]"
                          style={{ width: `${veh.stats.handling}%` }}
                        />
                      </div>
                    </div>

                    {/* Braking */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-[#B9A6D4]">Braking Distance</span>
                        <span className="font-bold text-white">{veh.stats.braking}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-white/40"
                          style={{ width: `${veh.stats.braking}%` }}
                        />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Detail Link */}
                <div className="mt-8 pt-4 border-t border-white/10">
                  <Link
                    to={`/database/vehicles/${veh.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-[#19E3D0]/20 hover:border-[#19E3D0]/50 border border-white/10 text-xs font-mono text-white transition-all"
                  >
                    <span>View Full Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#19E3D0]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ad slot */}
        <AdSlot size="banner" label="Sponsored Garage" className="mb-12" />

        {/* 150+ WORDS SEO TEXT */}
        <section className="mb-12 p-8 rounded-3xl bg-[#150A24] border border-white/10 space-y-4 text-xs sm:text-sm text-[#B9A6D4] leading-relaxed">
          <h2 className="font-['Orbitron'] font-bold text-lg text-white">
            Vehicle Telemetry, Downforce & Getaway Dynamics in Leonida
          </h2>
          <p>
            Automotive performance in Grand Theft Auto VI is defined by terrain adaptability and weight transfer dynamics. Navigating the long, sweeping asphalt stretches of Ocean Drive requires sustained top speed, while fleeing undercover squad units through the winding mangrove waterways of Kelly County demands instant torque acceleration and mud-clearing traction. No single vehicle reigns supreme in every situation.
          </p>
          <p>
            When conducting head-to-head comparisons in our Showdown tool, pay close attention to the harmony between acceleration and handling. Supercars like the Pegassi Infernus Retro S achieve extraordinary straight-line velocity, but if you enter an unpaved canal embankment without adequate all-wheel stability, you risk spinning out. Meanwhile, vehicles like the Sanchez Enduro Pro motorcycle boast an exceptional handling score of 93, making them untouchable through narrow alleys even if their overall top speed is capped at 76.
          </p>
          <p>
            Our comparison algorithm highlights best-in-class category winners so you can determine whether a $1,450,000 hypercar justifies the price disparity over an $890,000 sports classic for your core heist getaway crew.
          </p>
        </section>

        {/* FAQ ACCORDION & SCHEMA.ORG JSON-LD */}
        <FAQSection
          items={seoFaqs}
          title="Frequently Asked Questions"
          subtitle="Telemetry parameters, 0-60 scoring curves, and showdown comparison rules."
          badge="Showdown FAQ"
          badgeColor="#19E3D0"
          className="mb-12"
          renderJsonLd={false}
        />

        {/* RELATED TOOL */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-['Orbitron'] font-bold text-sm text-white">
              Ready to browse our complete automotive catalog?
            </h4>
            <p className="text-xs text-[#B9A6D4]">
              Filter by class, price sliders, and confirmation status.
            </p>
          </div>
          <Link
            to="/database/vehicles"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#19E3D0] to-[#FF7A18] text-[#0B0614] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 shrink-0"
          >
            <span>Open Vehicle Database</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </>
  );
}
