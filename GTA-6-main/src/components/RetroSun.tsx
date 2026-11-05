interface RetroSunProps {
  className?: string;
}

export function RetroSun({ className = '' }: RetroSunProps) {
  return (
    <div className={`relative w-full overflow-hidden flex flex-col items-center justify-center select-none ${className}`}>
      {/* Background glow behind sun */}
      <div className="absolute top-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-t from-[#FF2E93]/30 via-[#FF7A18]/20 to-transparent blur-3xl pointer-events-none" />

      {/* Retro Horizon & Sun SVG */}
      <svg
        viewBox="0 0 800 420"
        className="w-full max-w-4xl h-auto drop-shadow-[0_0_35px_rgba(255,46,147,0.4)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Sunset Gradient for the Sun */}
          <linearGradient id="sunGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFC857" />
            <stop offset="45%" stopColor="#FF7A18" />
            <stop offset="85%" stopColor="#FF2E93" />
            <stop offset="100%" stopColor="#6B2FD6" />
          </linearGradient>

          {/* Mask for Synthwave Sun Blinds / Horizontal Lines */}
          <mask id="sunBlindsMask">
            {/* White circle base */}
            <circle cx="400" cy="230" r="140" fill="white" />
            {/* Black cutouts for horizontal retro slats */}
            <rect x="250" y="235" width="300" height="4" fill="black" />
            <rect x="250" y="250" width="300" height="6" fill="black" />
            <rect x="250" y="267" width="300" height="9" fill="black" />
            <rect x="250" y="286" width="300" height="13" fill="black" />
            <rect x="250" y="309" width="300" height="17" fill="black" />
            <rect x="250" y="336" width="300" height="22" fill="black" />
          </mask>

          {/* Neon Horizon Glow */}
          <linearGradient id="horizonLineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6B2FD6" stopOpacity="0" />
            <stop offset="20%" stopColor="#19E3D0" />
            <stop offset="50%" stopColor="#FF2E93" />
            <stop offset="80%" stopColor="#FF7A18" />
            <stop offset="100%" stopColor="#6B2FD6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient Stars / Twinkles in the sky */}
        <circle cx="120" cy="70" r="1.5" fill="#FFC857" opacity="0.6" />
        <circle cx="280" cy="40" r="1.5" fill="#19E3D0" opacity="0.7" />
        <circle cx="680" cy="80" r="1.5" fill="#FFF5FB" opacity="0.5" />
        <circle cx="560" cy="50" r="2" fill="#FF2E93" opacity="0.8" />
        <circle cx="720" cy="130" r="1.5" fill="#FF7A18" opacity="0.6" />

        {/* The Synthwave Sun with Blinds */}
        <circle
          cx="400"
          cy="230"
          r="140"
          fill="url(#sunGradient)"
          mask="url(#sunBlindsMask)"
        />

        {/* Distant Mountain / Skyline Silhouette */}
        <path
          d="M0 340 L80 325 L160 338 L240 310 L310 330 L380 305 L440 328 L510 312 L600 335 L700 320 L800 340 L800 360 L0 360 Z"
          fill="#150A24"
          opacity="0.85"
        />

        {/* Horizon glowing laser line */}
        <rect x="0" y="338" width="800" height="3" fill="url(#horizonLineGlow)" />

        {/* Left Palm Tree Silhouette */}
        <g fill="#0B0614">
          {/* Curved trunk */}
          <path d="M110 360 Q130 250 160 170 Q164 172 162 176 Q134 250 118 360 Z" />
          {/* Fronds */}
          {/* Frond 1 (left down) */}
          <path d="M162 170 Q110 175 75 210 Q105 190 160 174 Z" />
          {/* Frond 2 (left high) */}
          <path d="M162 170 Q115 140 85 155 Q125 145 162 172 Z" />
          {/* Frond 3 (top left) */}
          <path d="M162 170 Q145 110 130 95 Q155 125 164 170 Z" />
          {/* Frond 4 (top right) */}
          <path d="M162 170 Q185 105 210 100 Q190 130 164 172 Z" />
          {/* Frond 5 (right high) */}
          <path d="M162 170 Q225 130 255 160 Q215 150 164 174 Z" />
          {/* Frond 6 (right down) */}
          <path d="M162 170 Q230 180 245 225 Q210 195 162 174 Z" />
        </g>

        {/* Secondary Left Smaller Palm */}
        <g fill="#0B0614" opacity="0.75">
          <path d="M60 360 Q75 290 95 230 Q98 232 96 235 Q78 290 68 360 Z" />
          <path d="M96 232 Q60 220 30 245 Q65 230 95 234 Z" />
          <path d="M96 232 Q70 190 60 165 Q85 195 97 232 Z" />
          <path d="M96 232 Q120 185 145 180 Q125 205 97 233 Z" />
          <path d="M96 232 Q135 220 160 245 Q125 230 96 234 Z" />
        </g>

        {/* Right Palm Tree Silhouette */}
        <g fill="#0B0614">
          {/* Trunk */}
          <path d="M690 360 Q670 260 640 180 Q636 182 638 186 Q666 260 682 360 Z" />
          {/* Fronds */}
          <path d="M638 182 Q690 185 725 220 Q695 200 640 186 Z" />
          <path d="M638 182 Q685 150 715 165 Q675 155 638 184 Z" />
          <path d="M638 182 Q655 120 670 105 Q645 135 636 182 Z" />
          <path d="M638 182 Q615 115 590 110 Q610 140 636 184 Z" />
          <path d="M638 182 Q575 140 545 170 Q585 160 636 186 Z" />
          <path d="M638 182 Q570 190 555 235 Q590 205 638 186 Z" />
        </g>
      </svg>

      {/* Perspective wireframe floor */}
      <div className="w-full h-24 sm:h-32 -mt-12 overflow-hidden relative">
        <div className="absolute inset-0 retro-grid-floor animate-grid-scroll opacity-40" />
        {/* Soft fade at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0614]/50 to-[#0B0614]" />
      </div>
    </div>
  );
}
