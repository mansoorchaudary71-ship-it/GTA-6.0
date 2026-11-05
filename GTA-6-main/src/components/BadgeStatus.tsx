import React from 'react';
import { CheckCircle2, HelpCircle } from 'lucide-react';

interface BadgeStatusProps {
  status: 'confirmed' | 'unconfirmed' | string;
  size?: 'sm' | 'md';
}

export function BadgeStatus({ status, size = 'sm' }: BadgeStatusProps) {
  const isConfirmed = status.toLowerCase() === 'confirmed';

  if (isConfirmed) {
    return (
      <span
        className={`inline-flex items-center gap-1 font-mono uppercase tracking-wider font-semibold rounded-full border border-[#19E3D0]/40 bg-[#19E3D0]/10 text-[#19E3D0] ${
          size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
        }`}
        title="Officially verified via game announcements and publisher materials"
      >
        <CheckCircle2 className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        <span>Confirmed</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono uppercase tracking-wider font-semibold rounded-full border border-[#FFC857]/40 bg-[#FFC857]/10 text-[#FFC857] ${
        size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      }`}
      title="Unconfirmed community leak or projection; subject to change"
    >
      <HelpCircle className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>Unconfirmed</span>
    </span>
  );
}
