import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export type AdSlotSize = 'banner' | 'rectangle' | 'leaderboard' | 'sticky-mobile' | 'inline';

interface AdSlotProps {
  size: AdSlotSize;
  className?: string;
  label?: string;
}

export function AdSlot({ size, className = '', label = 'Advertisement' }: AdSlotProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!SITE_CONFIG.ADS_ENABLED || dismissed) {
    return null;
  }

  // Dimension classes with reserved heights to eliminate Cumulative Layout Shift (CLS)
  const sizeClasses: Record<AdSlotSize, string> = {
    // 728x90 Leaderboard / Responsive Banner
    leaderboard: 'w-full max-w-[728px] h-[90px] mx-auto',
    // 300x250 Medium Rectangle
    rectangle: 'w-[300px] h-[250px] mx-auto',
    // Responsive horizontal banner
    banner: 'w-full h-[100px] sm:h-[120px]',
    // Compact inline ad
    inline: 'w-full h-[70px]',
    // Mobile sticky bottom banner
    'sticky-mobile': 'fixed bottom-16 sm:bottom-0 left-0 right-0 z-40 bg-[#150A24]/95 backdrop-blur-md border-t border-[#FF2E93]/30 p-2 text-center'
  };

  if (size === 'sticky-mobile') {
    return (
      <div className={`${sizeClasses['sticky-mobile']} ${className} transition-all duration-300 md:hidden`}>
        <div className="relative max-w-md mx-auto flex items-center justify-between px-3 py-1.5 rounded-lg border border-[#FF2E93]/20 bg-[#0B0614]/80">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B9A6D4]/70 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
              Ad
            </span>
            <span className="text-xs text-[#B9A6D4] truncate font-medium">
              Support Vice Tools & Free Community Maps
            </span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss advertisement banner"
            className="p-1 text-[#B9A6D4] hover:text-[#FFF5FB] hover:bg-white/10 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label={label}
      className={`relative rounded-xl border border-dashed border-[#B9A6D4]/20 bg-[#150A24]/40 flex flex-col items-center justify-center overflow-hidden my-6 transition-all hover:border-[#FF2E93]/40 ${sizeClasses[size]} ${className}`}
    >
      {/* Background hint */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF2E93]/5 to-transparent pointer-events-none" />
      
      {/* Label and Slot Info */}
      <div className="flex items-center gap-2 text-xs font-mono text-[#B9A6D4]/60 uppercase tracking-widest">
        <Sparkles className="w-3.5 h-3.5 text-[#FF2E93]/40" />
        <span>{label}</span>
        <span className="text-[10px] text-[#B9A6D4]/40">({size})</span>
      </div>
      <p className="text-[11px] text-[#B9A6D4]/40 mt-1">
        Targeted gamer sponsorship placeholder
      </p>
    </div>
  );
}
