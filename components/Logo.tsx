/**
 * The Chai Index mark: a clay kulhad whose steam rises as a little index chart.
 */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id="lg-clay" x1="0" x2="1">
          <stop offset="0" stopColor="#c96c43" />
          <stop offset="0.55" stopColor="#b85c38" />
          <stop offset="1" stopColor="#8f4127" />
        </linearGradient>
      </defs>
      {/* steam → chart */}
      <polyline
        className="logo-line"
        points="15,17 20,12 25,14 33,5"
        fill="none"
        stroke="#2b1a10"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="33" cy="5" r="2.2" fill="#e0892f" />
      {/* kulhad */}
      <path d="M9 21h30l-3.6 21.2A3 3 0 0 1 32.4 45H15.6a3 3 0 0 1-3-2.8Z" fill="url(#lg-clay)" />
      <path d="M11.5 31h25M12.6 37h22.8" stroke="#2b1a10" strokeOpacity=".14" strokeWidth="1.2" />
      <ellipse cx="24" cy="21" rx="15" ry="3.4" fill="#d07a4f" />
      <ellipse cx="24" cy="21.3" rx="12.4" ry="2.3" fill="#8a4b24" />
      <ellipse cx="21" cy="20.8" rx="4" ry=".7" fill="#e9c39a" opacity=".55" />
    </svg>
  );
}

export default function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-2.5" aria-label="The Chai Index — home">
      <LogoMark />
      <span className="leading-none">
        <span className="block font-mono text-[9px] uppercase tracking-[0.32em] text-dust">The</span>
        <span className="display block text-[1.45rem] font-semibold">
          <em className="font-medium italic text-clay">Chai</em> Index
        </span>
      </span>
    </a>
  );
}
