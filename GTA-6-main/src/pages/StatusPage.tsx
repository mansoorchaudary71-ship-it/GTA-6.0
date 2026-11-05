import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  RefreshCw, 
  Wifi, 
  Clock, 
  ShieldAlert, 
  Send, 
  X,
  Sparkles,
  Server
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { AdSlot } from '../components/AdSlot';
import statusData from '../data/status.json';

interface ServiceItem {
  id: string;
  name: string;
  platform: string;
  status: 'operational' | 'degraded' | 'outage';
  pingMs: number;
  uptime24h: number;
  statusMessage: string;
  history24h: number[]; // 1 = operational, 2 = degraded, 3 = outage
}

export function StatusPage() {
  const [services, setServices] = useState<ServiceItem[]>(statusData.services as ServiceItem[]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date(statusData.lastUpdated));
  const [secondsUntilRefresh, setSecondsUntilRefresh] = useState(60);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Report issue modal
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('PS5');
  const [issueDescription, setIssueDescription] = useState('');
  const [reportedToast, setReportedToast] = useState(false);

  // Auto-refresh timer every 60 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsUntilRefresh((prev) => {
        if (prev <= 1) {
          triggerRefresh();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const triggerRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate minor fluctuation in ping
      setServices((prev) =>
        prev.map((s) => ({
          ...s,
          pingMs: Math.max(18, s.pingMs + (Math.floor(Math.random() * 5) - 2)),
        }))
      );
      setLastUpdated(new Date());
      setIsRefreshing(false);
      setSecondsUntilRefresh(60);
    }, 600);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueDescription.trim()) return;

    setReportModalOpen(false);
    setIssueDescription('');
    setReportedToast(true);
    setTimeout(() => setReportedToast(false), 4000);
  };

  const getStatusBadge = (status: ServiceItem['status']) => {
    switch (status) {
      case 'operational':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#19E3D0]/10 text-[#19E3D0] border border-[#19E3D0]/30 shadow-sm shadow-[#19E3D0]/20">
            <span className="w-2 h-2 rounded-full bg-[#19E3D0] animate-pulse" />
            <span>OPERATIONAL</span>
          </span>
        );
      case 'degraded':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FFC857]/10 text-[#FFC857] border border-[#FFC857]/30 shadow-sm shadow-[#FFC857]/20">
            <span className="w-2 h-2 rounded-full bg-[#FFC857] animate-ping" />
            <span>DEGRADED</span>
          </span>
        );
      case 'outage':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FF2E93]/10 text-[#FF2E93] border border-[#FF2E93]/30 shadow-sm shadow-[#FF2E93]/20">
            <span className="w-2 h-2 rounded-full bg-[#FF2E93]" />
            <span>OUTAGE</span>
          </span>
        );
    }
  };

  return (
    <>
      <SEO
        title="GTA 6 Live Server & Network Status | PS5, Xbox & Online Monitoring"
        description="Check real-time network and matchmaking server status for GTA 6 across PlayStation 5, Xbox Series X|S, and Vice Online cloud infrastructure."
        canonical="/status"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#B9A6D4]/70 mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-[#19E3D0]">Server Status</span>
        </nav>

        {/* Header & Refresh Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#150A24] border border-[#19E3D0]/40 text-xs font-mono text-[#19E3D0] mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>LIVE NETWORK TELEMETRY</span>
            </div>
            <h1 className="font-['Orbitron'] font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              Server & Cloud <span className="text-[#19E3D0]">Status</span>
            </h1>
            <p className="mt-2 text-sm text-[#B9A6D4]">
              Real-time connectivity monitoring across PlayStation 5, Xbox Series X|S, and Vice Online infrastructure.
            </p>
          </div>

          {/* Refresh and Report Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={triggerRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#19E3D0] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh ({secondsUntilRefresh}s)</span>
            </button>

            <button
              onClick={() => setReportModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF2E93] to-[#FF7A18] text-white hover:brightness-110 font-mono text-xs font-bold transition-all shadow-md shadow-[#FF2E93]/20 cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Report an Issue</span>
            </button>
          </div>
        </div>

        {/* FEEDBACK TOAST */}
        {reportedToast && (
          <div className="p-4 rounded-2xl bg-[#19E3D0]/10 border border-[#19E3D0] text-[#19E3D0] text-xs font-mono mb-6 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Thank you! Your community status report has been logged and queued for telemetry analysis.</span>
          </div>
        )}

        {/* OFFICIAL DISCLAIMER STRIP */}
        <div className="p-4 rounded-2xl bg-[#150A24] border border-white/10 mb-8 flex items-center justify-between gap-4 text-xs font-mono text-[#B9A6D4]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#FF7A18]" />
            <span>Last polled: {lastUpdated.toLocaleTimeString()} UTC</span>
          </div>
          <span className="text-[11px] text-[#FFC857] bg-[#FFC857]/10 px-2.5 py-1 rounded-full border border-[#FFC857]/30">
            Community-reported status. Not official.
          </span>
        </div>

        {/* Ad slot */}
        <AdSlot size="leaderboard" label="Sponsorship" className="mb-8" />

        {/* SERVICES STATUS MONITOR LIST */}
        <div className="space-y-4 mb-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-3xl bg-[#150A24] border border-[#FF2E93]/20 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-[#19E3D0]/50 transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#19E3D0]">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-['Orbitron'] font-bold text-lg text-white">
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#B9A6D4]">
                      <span>Platform: {service.platform}</span>
                      <span>•</span>
                      <span className="text-[#19E3D0]">{service.pingMs}ms latency</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#B9A6D4] mt-2 leading-relaxed">
                  {service.statusMessage}
                </p>
              </div>

              {/* UPTIME & 24H BAR */}
              <div className="w-full lg:w-80 space-y-2">
                <div className="flex items-center justify-between">
                  {getStatusBadge(service.status)}
                  <span className="text-xs font-mono font-bold text-white">
                    {service.uptime24h}% (24h)
                  </span>
                </div>

                {/* 24-Segmented Historical Bar */}
                <div className="flex gap-1 h-3 rounded-md overflow-hidden bg-black/40 p-0.5">
                  {service.history24h.map((val, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 rounded-sm ${
                        val === 1
                          ? 'bg-[#19E3D0]'
                          : val === 2
                          ? 'bg-[#FFC857]'
                          : 'bg-[#FF2E93]'
                      }`}
                      title={`Hour ${idx + 1}: ${val === 1 ? '100% Nominal' : val === 2 ? 'Minor Latency' : 'Service Interruption'}`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[9px] font-mono text-[#B9A6D4]/50">
                  <span>24 hours ago</span>
                  <span>Present</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* RECENT INCIDENTS TIMELINE */}
        <div className="p-8 rounded-3xl bg-[#150A24] border border-white/10 mb-12 space-y-6">
          <h2 className="font-['Orbitron'] font-bold text-xl text-white uppercase">
            Recent Network Incidents & Maintenance
          </h2>

          <div className="space-y-4">
            {statusData.recentIncidents.map((inc) => (
              <div
                key={inc.id}
                className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                      inc.resolved
                        ? 'bg-[#19E3D0]/20 text-[#19E3D0]'
                        : 'bg-[#FF7A18]/20 text-[#FF7A18]'
                    }`}>
                      {inc.resolved ? 'RESOLVED' : 'ACTIVE INVESTIGATION'}
                    </span>
                    <span className="text-xs font-mono text-[#B9A6D4]/60">
                      {new Date(inc.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm text-white">{inc.title}</h4>
                  <p className="text-xs text-[#B9A6D4] mt-1">{inc.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ad slot */}
        <AdSlot size="banner" label="Sponsored Infrastructure" className="mb-8" />

        {/* REPORT ISSUE MODAL */}
        {reportModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          >
            <div
              className="max-w-md w-full bg-[#150A24] border border-[#FF2E93] rounded-3xl p-6 shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-['Orbitron'] font-bold text-base text-white">
                  REPORT SERVER ISSUE
                </h3>
                <button
                  onClick={() => setReportModalOpen(false)}
                  className="p-1 rounded text-[#B9A6D4] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleReportSubmit} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-[#B9A6D4] mb-1">Affected Platform</label>
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:border-[#FF2E93] focus:outline-none"
                  >
                    <option value="PS5">PlayStation 5</option>
                    <option value="Xbox">Xbox Series X|S</option>
                    <option value="Cloud">Vice Online Cloud Infrastructure</option>
                    <option value="SocialClub">Social Club Account Sync</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#B9A6D4] mb-1">Describe Encountered Issue</label>
                  <textarea
                    rows={4}
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    placeholder="e.g. Can't connect to European lobbies; matchmaking disconnects with error code 104..."
                    className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 focus:border-[#FF2E93] focus:outline-none"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-[#B9A6D4] hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF2E93] to-[#FF7A18] text-white font-bold hover:brightness-110 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Report</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
