"use client";

/**
 * Hero illustration: chai pours from above into a clay kulhad, the level rises with a
 * moving wave, bubbles float up and steam curls off the top. A paper price tag hangs on the side.
 * Change `pourKey` to replay the pour.
 */
export default function Kulhad({ pourKey, tag, sub }: { pourKey: string; tag: string; sub: string }) {
  // Inner cup shape, used as the liquid's clip path
  const inner = "M58 112 H302 L276 330 Q273 352 251 352 H109 Q87 352 84 330 Z";
  const wave = (y: number, amp: number) => {
    // Seamless: 6 periods of 120px across 720px, so sliding by half (360px) loops perfectly.
    let d = `M0 ${y}`;
    for (let x = 0; x < 720; x += 120) d += ` Q${x + 30} ${y - amp} ${x + 60} ${y} Q${x + 90} ${y + amp} ${x + 120} ${y}`;
    return `${d} V420 H0 Z`;
  };

  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <svg viewBox="0 0 360 420" className="w-full overflow-visible" role="img" aria-label={`A kulhad of chai. ${tag}, ${sub}`}>
        <defs>
          <linearGradient id="k-clay" x1="0" x2="1">
            <stop offset="0" stopColor="#cf7449" />
            <stop offset="0.45" stopColor="#bb5f3a" />
            <stop offset="1" stopColor="#8a3d24" />
          </linearGradient>
          <linearGradient id="k-tea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b9733f" />
            <stop offset="1" stopColor="#6e3816" />
          </linearGradient>
          <linearGradient id="k-stream" x1="0" x2="1">
            <stop offset="0" stopColor="#9a5527" />
            <stop offset="0.5" stopColor="#c98a55" />
            <stop offset="1" stopColor="#8a4b24" />
          </linearGradient>
          <clipPath id="k-inner">
            <path d={inner} />
          </clipPath>
          <filter id="k-rough">
            <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="3" />
            <feColorMatrix values="0 0 0 0 0.2  0 0 0 0 0.1  0 0 0 0 0.05  0 0 0 0.22 0" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
        </defs>

        {/* shadow */}
        <ellipse cx="180" cy="392" rx="132" ry="14" fill="#2b1a10" opacity="0.12" />

        <g key={pourKey}>
          {/* stream from the pot */}
          <rect className="stream" x="173" y="-40" width="14" height="210" rx="7" fill="url(#k-stream)" />

          {/* cup body */}
          <path d="M44 100 H316 L286 336 Q282 368 250 368 H110 Q78 368 74 336 Z" fill="url(#k-clay)" />
          <path d="M44 100 H316 L286 336 Q282 368 250 368 H110 Q78 368 74 336 Z" filter="url(#k-rough)" />
          <path d="M70 200 H292 M78 262 H284 M84 314 H276" stroke="#2b1a10" strokeOpacity="0.1" strokeWidth="3" />

          {/* liquid */}
          <g clipPath="url(#k-inner)">
            <rect x="0" y="0" width="360" height="420" fill="#4a2410" opacity="0.55" />
            <g style={{ animation: "rise 1.9s cubic-bezier(0.3, 0.6, 0.2, 1) 0.25s both" }}>
              <g className="wave-slow" style={{ transformBox: "fill-box" }}>
                <path d={wave(146, 7)} fill="#8a4b24" opacity="0.7" />
              </g>
              <g className="wave" style={{ transformBox: "fill-box" }}>
                <path d={wave(150, 6)} fill="url(#k-tea)" />
              </g>
            </g>
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} className="bubble" cx={110 + i * 46} cy={330} r={3 + (i % 2) * 2}
                fill="#f2d3ad" style={{ animationDelay: `${1.6 + i * 0.7}s` }} />
            ))}
          </g>

          {/* rim */}
          <ellipse cx="180" cy="102" rx="138" ry="20" fill="none" stroke="#d98559" strokeWidth="10" />
          <ellipse cx="180" cy="102" rx="138" ry="20" fill="none" stroke="#2b1a10" strokeOpacity="0.08" strokeWidth="2" />
        </g>

        {/* steam */}
        <g className="steam" stroke="#2b1a10" strokeOpacity="0.35" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M135 70 q-12 -18 0 -34 q12 -16 0 -32" />
          <path d="M185 64 q-12 -18 0 -34 q12 -16 0 -32" />
          <path d="M235 70 q-12 -18 0 -34 q12 -16 0 -32" />
        </g>

        {/* string to the tag */}
        <path d="M300 150 C330 170 336 196 322 214" stroke="#2b1a10" strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
      </svg>

      {/* price tag */}
      <div key={`tag-${pourKey}`}
        className="absolute right-[-4%] top-[49%] w-[44%] origin-top-left rounded-[10px] border border-[#d8c3a2] bg-cream px-3.5 py-3 shadow-[0_14px_30px_-12px_rgba(43,26,16,0.45)] sm:right-[-8%]"
        style={{ animation: "tagIn 0.9s cubic-bezier(0.34,1.56,0.64,1) 1.4s both" }}>
        <span className="absolute -left-1.5 top-3 h-3 w-3 rounded-full border border-[#d8c3a2] bg-paper" />
        <p className="display truncate text-xl font-semibold leading-tight sm:text-2xl">{tag}</p>
        <p className="mt-0.5 truncate text-[11px] text-ink-2">{sub}</p>
      </div>

      <style>{`
        @keyframes rise { from { transform: translateY(210px); } to { transform: translateY(0); } }
        @keyframes tagIn { from { transform: rotate(-30deg) scale(.6); opacity: 0; } to { transform: rotate(7deg); opacity: 1; } }
      `}</style>
    </div>
  );
}
