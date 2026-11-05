import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Coins, 
  Clock, 
  Calendar, 
  TrendingUp, 
  Plus, 
  Trash2, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Info,
  ChevronDown,
  ChevronUp,
  Target
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

import { SEO } from '../../components/SEO';
import { AdSlot } from '../../components/AdSlot';
import { FAQSection, FAQItem, buildFaqPageSchema } from '../../components/FAQSection';
import vehiclesData from '../../data/vehicles.json';
import propertiesData from '../../data/properties.json';
import weaponsData from '../../data/weapons.json';

interface GoalItem {
  id: string;
  name: string;
  targetPrice: number;
}

export function MoneyCalculator() {
  const [currentCash, setCurrentCash] = useState<number>(50000);
  const [incomePerHour, setIncomePerHour] = useState<number>(125000);
  const [hoursPerDay, setHoursPerDay] = useState<number>(2.5);

  // Multi-goals state
  const [goals, setGoals] = useState<GoalItem[]>([
    { id: 'g-1', name: 'Cheetah Classic GT (Grotti)', targetPrice: 890000 },
    { id: 'g-2', name: 'Ocean Drive Penthouse', targetPrice: 4200000 }
  ]);

  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalPrice, setNewGoalPrice] = useState<number | ''>('');

  // Quick picker select
  const [selectedPreset, setSelectedPreset] = useState<string>('');

  // Combined preset options from datasets
  const presetOptions = useMemo(() => {
    const list: { name: string; price: number; type: string }[] = [];
    vehiclesData.forEach((v) => list.push({ name: `${v.name} (${v.manufacturer})`, price: v.price, type: 'Vehicle' }));
    propertiesData.forEach((p) => list.push({ name: `${p.name} (${p.location})`, price: p.price, type: 'Real Estate' }));
    weaponsData.forEach((w) => list.push({ name: `${w.name} (${w.category})`, price: w.price, type: 'Weapon' }));
    return list;
  }, []);

  const handleSelectPreset = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedPreset(val);
    const item = presetOptions.find((p) => p.name === val);
    if (item) {
      setNewGoalName(item.name);
      setNewGoalPrice(item.price);
    }
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalName.trim() || !newGoalPrice || Number(newGoalPrice) <= 0) return;

    setGoals([
      ...goals,
      {
        id: `g-${Date.now()}`,
        name: newGoalName.trim(),
        targetPrice: Number(newGoalPrice)
      }
    ]);
    setNewGoalName('');
    setNewGoalPrice('');
    setSelectedPreset('');
  };

  const handleRemoveGoal = (id: string) => {
    if (goals.length <= 1) return;
    setGoals(goals.filter((g) => g.id !== id));
  };

  // Calculations for active goal (first goal)
  const primaryGoal = goals[0] || { id: 'default', name: 'Primary Target', targetPrice: 1000000 };
  const netRequired = Math.max(0, primaryGoal.targetPrice - currentCash);
  const validIncome = Math.max(1, incomePerHour);
  const validHours = Math.max(0.1, hoursPerDay);

  const hoursNeeded = netRequired > 0 ? +(netRequired / validIncome).toFixed(1) : 0;
  const daysNeeded = netRequired > 0 ? +(hoursNeeded / validHours).toFixed(1) : 0;
  const progressPercent = Math.min(100, Math.round((currentCash / primaryGoal.targetPrice) * 100));

  // Cumulative total for all goals
  const totalAllGoals = goals.reduce((sum, g) => sum + g.targetPrice, 0);
  const netAllRequired = Math.max(0, totalAllGoals - currentCash);
  const totalDaysNeeded = +(netAllRequired / (validIncome * validHours)).toFixed(1);

  // Recharts Savings Curve Data (projecting over 14 days)
  const chartData = useMemo(() => {
    const daysToProject = Math.min(30, Math.max(7, Math.ceil(daysNeeded * 1.25) || 10));
    const dailyIncome = validIncome * validHours;
    const points = [];

    for (let day = 0; day <= daysToProject; day++) {
      const balance = currentCash + day * dailyIncome;
      points.push({
        day: `Day ${day}`,
        cash: balance,
        target: primaryGoal.targetPrice,
      });
    }
    return points;
  }, [currentCash, validIncome, validHours, daysNeeded, primaryGoal.targetPrice]);

  const seoFaqs: FAQItem[] = [
    {
      id: 'faq-money-1',
      question: 'How does the GTA 6 Money & Grind Calculator estimate completion times?',
      answer: 'The engine calculates net purchasing deficits by subtracting your current liquid bank balance from target item costs, then dividing by your realistic hourly gameplay yield. When daily play session caps are applied, it projects precise calendar days to ownership.',
      status: 'confirmed'
    },
    {
      id: 'faq-money-2',
      question: 'What is considered an average hourly income in Vice City Online?',
      answer: 'Based on franchise balance economics and verified heist / business cycles, standard early-to-mid tier activities typically net between $75,000 and $150,000 per hour, while high-tier coordinated syndicate heists can exceed $300,000 per hour.',
      status: 'unconfirmed'
    },
    {
      id: 'faq-money-3',
      question: 'Can I track multi-tier targets simultaneously?',
      answer: 'Yes! You can add an unlimited number of simultaneous acquisition goals, such as pairing an offshore cigarette speedboat with a luxury beachfront apartment. The calculator tallies combined capital requirements and timeline trajectories.',
      status: 'confirmed'
    },
    {
      id: 'faq-money-4',
      question: 'Does this calculator factor in passive income from safehouses or businesses?',
      answer: 'Yes. If you add businesses or real estate properties like chop shops or laundromats from our database, you can model passive dividends directly into your hourly progression rates.',
      status: 'confirmed'
    }
  ];

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Vice Tools Money & Grind Calculator',
    applicationCategory: 'GameApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    description: 'Real-time financial progression simulator for GTA 6 players to project hours, days, and capital curves required for luxury assets.'
  };

  const faqSchema = buildFaqPageSchema(seoFaqs);

  return (
    <>
      <SEO
        title="GTA 6 Money & Progression Calculator | Grind Time & Income Simulator"
        description="Calculate hours, daily play sessions, and earnings required to purchase supercars and luxury penthouses in GTA 6. Interactive timeline chart & goal tracking."
        canonical="/calculators/money"
        schema={[appSchema, faqSchema]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#B9A6D4]/70 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/calculators" className="hover:text-white">Calculators</Link>
          <span>/</span>
          <span className="text-[#FF7A18]">Money & Progression</span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#150A24] border border-[#FF7A18]/40 text-xs font-mono text-[#FF7A18] mb-3">
            <Coins className="w-3.5 h-3.5" />
            <span>VICE CITY FINANCIAL ENGINE</span>
          </div>
          <h1 className="font-['Orbitron'] font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            Money & Progression <span className="text-[#FF7A18]">Calculator</span>
          </h1>
          <p className="mt-3 text-sm text-[#B9A6D4] leading-relaxed">
            Plan your path to empire status in Leonida. Whether saving up for the Cheetah Classic GT, an Ocean Drive penthouse, or deep-water smuggling equipment, this tool maps your grind schedule and daily milestones into clear, actionable timelines.
          </p>
        </div>

        {/* Top Ad Slot */}
        <AdSlot size="leaderboard" label="Sponsorship" className="mb-8" />

        {/* MAIN CALCULATOR GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT COLUMN: INPUTS & GOAL MANAGEMENT (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#150A24] border border-[#FF2E93]/20 shadow-xl space-y-5">
              <h2 className="font-['Orbitron'] font-bold text-base text-white flex items-center gap-2">
                <Coins className="w-4 h-4 text-[#FF7A18]" />
                <span>Financial Parameters</span>
              </h2>

              {/* Input: Current Cash */}
              <div>
                <label className="block text-xs font-mono text-[#B9A6D4] mb-1.5">
                  Current Liquid Cash ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-mono text-[#19E3D0]">$</span>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={currentCash}
                    onChange={(e) => setCurrentCash(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-8 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-sm focus:border-[#FF7A18] focus:outline-none"
                  />
                </div>
              </div>

              {/* Input: Hourly Income */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-mono text-[#B9A6D4]">
                    Estimated Earnings Per Hour ($)
                  </label>
                  <span className="text-[10px] font-mono text-[#19E3D0]">
                    ${incomePerHour.toLocaleString()}/hr
                  </span>
                </div>
                <input
                  type="range"
                  min="25000"
                  max="500000"
                  step="5000"
                  value={incomePerHour}
                  onChange={(e) => setIncomePerHour(Number(e.target.value))}
                  className="w-full accent-[#FF7A18] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#B9A6D4]/50 mt-1">
                  <span>$25k (Street)</span>
                  <span>$250k (Heists)</span>
                  <span>$500k (Syndicate)</span>
                </div>
              </div>

              {/* Input: Hours Per Day */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-mono text-[#B9A6D4]">
                    Average Gameplay Hours / Day
                  </label>
                  <span className="text-[10px] font-mono text-[#FF2E93]">
                    {hoursPerDay} hrs/day
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="12"
                  step="0.5"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(Number(e.target.value))}
                  className="w-full accent-[#FF2E93] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#B9A6D4]/50 mt-1">
                  <span>30 min (Casual)</span>
                  <span>4 hrs (Core)</span>
                  <span>12 hrs (Hardcore)</span>
                </div>
              </div>
            </div>

            {/* GOALS MANAGEMENT BOX */}
            <div className="p-6 rounded-3xl bg-[#150A24] border border-[#FF2E93]/20 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-['Orbitron'] font-bold text-base text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#FF2E93]" />
                  <span>Target Goals ({goals.length})</span>
                </h3>
                <span className="text-[11px] font-mono text-[#B9A6D4]">
                  Total: ${totalAllGoals.toLocaleString()}
                </span>
              </div>

              {/* Active Goals List */}
              <div className="space-y-2.5">
                {goals.map((g, idx) => {
                  const itemProgress = Math.min(100, Math.round((currentCash / g.targetPrice) * 100));
                  return (
                    <div
                      key={g.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        idx === 0
                          ? 'bg-[#1E1033] border-[#FF7A18]/50 shadow-md'
                          : 'bg-white/5 border-white/5'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            {idx === 0 && (
                              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#FF7A18] text-[#0B0614] font-bold">
                                Focus
                              </span>
                            )}
                            <h4 className="text-xs sm:text-sm font-semibold text-white">
                              {g.name}
                            </h4>
                          </div>
                          <p className="text-xs font-mono text-[#19E3D0] mt-0.5">
                            ${g.targetPrice.toLocaleString()}
                          </p>
                        </div>

                        {goals.length > 1 && (
                          <button
                            onClick={() => handleRemoveGoal(g.id)}
                            className="p-1 rounded text-[#B9A6D4] hover:text-[#FF2E93] hover:bg-white/5"
                            aria-label={`Remove goal ${g.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Mini Goal Progress Bar */}
                      <div className="mt-2.5 flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#FF7A18] to-[#19E3D0]"
                            style={{ width: `${itemProgress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-[#B9A6D4]">
                          {itemProgress}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add Another Goal Form */}
              <form onSubmit={handleAddGoal} className="pt-4 border-t border-white/10 space-y-3">
                <span className="text-xs font-mono font-semibold text-white block">
                  Add Another Goal:
                </span>

                {/* Database Quick Preset Selector */}
                <div>
                  <select
                    value={selectedPreset}
                    onChange={handleSelectPreset}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-[#B9A6D4] focus:border-[#FF2E93] focus:outline-none"
                  >
                    <option value="">⚡ Quick Pick from Database...</option>
                    {presetOptions.map((opt) => (
                      <option key={opt.name} value={opt.name}>
                        [{opt.type}] {opt.name} - ${opt.price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newGoalName}
                    onChange={(e) => setNewGoalName(e.target.value)}
                    placeholder="Custom goal title..."
                    className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-white/30 focus:border-[#FF2E93] focus:outline-none"
                  />
                  <input
                    type="number"
                    min="1"
                    value={newGoalPrice}
                    onChange={(e) => setNewGoalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Target price ($)..."
                    className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white placeholder-white/30 focus:border-[#FF2E93] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl border border-[#FF7A18]/50 bg-[#FF7A18]/15 hover:bg-[#FF7A18]/25 text-[#FF7A18] hover:text-white font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Goal to Schedule</span>
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: OUTPUTS & RECHARTS TIMELINE (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* KPI STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-gradient-to-b from-[#1E1033] to-[#150A24] border border-[#FF2E93]/30 shadow-lg text-center">
                <Clock className="w-5 h-5 text-[#FF2E93] mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-['Space_Mono'] font-bold text-white">
                  {hoursNeeded} hrs
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#B9A6D4] mt-1">
                  Active Playtime Needed
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-b from-[#1E1033] to-[#150A24] border border-[#FF7A18]/30 shadow-lg text-center">
                <Calendar className="w-5 h-5 text-[#FF7A18] mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-['Space_Mono'] font-bold text-white">
                  {daysNeeded} days
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#B9A6D4] mt-1">
                  Calendar Days ({hoursPerDay}h/day)
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-b from-[#1E1033] to-[#150A24] border border-[#19E3D0]/30 shadow-lg text-center">
                <CheckCircle2 className="w-5 h-5 text-[#19E3D0] mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-['Space_Mono'] font-bold text-white">
                  {progressPercent}%
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#B9A6D4] mt-1">
                  Primary Goal Funded
                </div>
              </div>
            </div>

            {/* FOCUS GOAL PROGRESS PANEL */}
            <div className="p-6 rounded-3xl bg-[#150A24] border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#B9A6D4]">
                    Current Target Target Milestone
                  </span>
                  <h3 className="font-['Orbitron'] font-bold text-lg text-white">
                    {primaryGoal.name}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-[#B9A6D4]">Target Price</div>
                  <div className="text-base font-mono font-bold text-[#FFC857]">
                    ${primaryGoal.targetPrice.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF2E93] via-[#FF7A18] to-[#19E3D0] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-[#B9A6D4]">
                  <span>${currentCash.toLocaleString()} in Bank</span>
                  <span>
                    {netRequired === 0
                      ? 'Goal fully funded! Purchase ready.'
                      : `$${netRequired.toLocaleString()} remaining`}
                  </span>
                </div>
              </div>

              {goals.length > 1 && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-[#B9A6D4] flex items-center justify-between">
                  <span>All {goals.length} queued goals combined:</span>
                  <span className="font-mono text-white font-bold">
                    ~{totalDaysNeeded} calendar days
                  </span>
                </div>
              )}
            </div>

            {/* RECHARTS SAVINGS OVER TIME */}
            <div className="p-6 rounded-3xl bg-[#150A24] border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-['Orbitron'] font-bold text-base text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#19E3D0]" />
                    <span>Projected Capital Accumulation</span>
                  </h3>
                  <p className="text-xs text-[#B9A6D4] mt-0.5">
                    Trajectory over upcoming gaming sessions based on ${incomePerHour.toLocaleString()}/hr
                  </p>
                </div>
              </div>

              <div className="w-full h-64 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="cashFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#19E3D0" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#19E3D0" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="targetLine" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#FF2E93" />
                        <stop offset="100%" stopColor="#FF7A18" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A134A" />
                    <XAxis dataKey="day" stroke="#B9A6D4" fontSize={10} tickLine={false} />
                    <YAxis
                      stroke="#B9A6D4"
                      fontSize={10}
                      tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1E1033',
                        borderColor: '#FF2E93',
                        borderRadius: '12px',
                        color: '#FFF5FB',
                        fontSize: '12px',
                        fontFamily: 'Space Mono'
                      }}
                      formatter={(val: unknown) => [
                        typeof val === 'number' ? `$${val.toLocaleString()}` : String(val),
                        'Balance'
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="cash"
                      stroke="#19E3D0"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#cashFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#B9A6D4]/70 pt-2 border-t border-white/5">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#19E3D0]" />
                  <span>Your Projected Bank</span>
                </span>
                <span>Calculated locally in browser</span>
              </div>
            </div>

          </div>
        </div>

        {/* Mid Ad Slot */}
        <AdSlot size="banner" label="Sponsored Tooling" className="mb-12" />

        {/* 150+ WORDS SEO ARTICLE */}
        <section className="mb-12 p-8 rounded-3xl bg-[#150A24] border border-white/10 space-y-4 text-xs sm:text-sm text-[#B9A6D4] leading-relaxed">
          <h2 className="font-['Orbitron'] font-bold text-lg text-white">
            Optimizing Progression & Cash Efficiency in Vice City
          </h2>
          <p>
            The economic architecture of Grand Theft Auto VI is engineered around risk versus reward. Between high-stakes maritime heists off the Florida Keys, chop-shop contraband running in Little Haiti, and legitimate front businesses scattered across the Ocean Drive neon corridor, cash flow dictates your tactical superiority. Without systematic goal allocation, players frequently get trapped spending hard-earned capital on incremental sidearm attachments rather than purchasing high-yield revenue multipliers such as warehouse operations or executive helipads.
          </p>
          <p>
            By leveraging our Money & Progression Calculator, you can reverse-engineer your gameplay targets before committing your session time. If your objective is a $4,200,000 Ocean Drive Penthouse and your current squad runs contraband contracts yielding $125,000 per hour, you know with mathematical certainty that approximately 33.6 hours of dedicated gameplay are required. Distributing this across realistic 2.5-hour evening gaming sessions means you will unlock your keys in roughly two weeks without burning out.
          </p>
          <p>
            Furthermore, the multi-goal engine helps prevent opportunistic impulse purchases. Stacking primary targets against secondary vehicles allows you to visualize the trade-off of delaying an exotic supercar purchase in favor of investing in passive income-generating enterprises.
          </p>
        </section>

        {/* FAQ ACCORDION & JSON-LD SCHEMA */}
        <FAQSection
          items={seoFaqs}
          title="Frequently Asked Questions"
          subtitle="Key answers regarding grind mathematics, hourly income benchmarks, and multi-goal progression."
          badge="Economy FAQ"
          badgeColor="#FF7A18"
          className="mb-12"
          renderJsonLd={false}
        />

        {/* RELATED TOOLS */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-['Orbitron'] font-bold text-sm text-white">
              Looking to benchmark your dream vehicle before buying?
            </h4>
            <p className="text-xs text-[#B9A6D4]">
              Compare top speed, handling, and price against competitor models.
            </p>
          </div>
          <Link
            to="/calculators/compare"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7A18] to-[#FFC857] text-[#0B0614] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 shrink-0"
          >
            <span>Open Vehicle Showdown</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </>
  );
}
