"use client";

import type { ItemKey } from "@/lib/types";
import Kulhad from "./Kulhad";

/**
 * The hero illustration changes with the selected item, and each one has its own entrance:
 *  chai    → chai pours into a kulhad
 *  coffee  → cup drops onto the saucer, then latte art draws itself
 *  meal    → the plate fills up piece by piece
 *  bread   → dough rises and bakes golden
 *  transit → a bus drives in and settles on its suspension
 *  cinema  → popcorn pops while a ticket slides up
 */
export default function HeroScene({ item, sceneKey, tag, sub }: { item: ItemKey; sceneKey: string; tag: string; sub: string }) {
  if (item === "chai") return <Kulhad pourKey={sceneKey} tag={tag} sub={sub} />;

  const Scene = { coffee: Coffee, meal: Meal, bread: Bread, transit: Bus, cinema: Cinema }[item];
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <svg key={sceneKey} viewBox="0 0 360 420" className="w-full overflow-visible" role="img" aria-label={`${sub}: ${tag}`}>
        <ellipse cx="180" cy="392" rx="140" ry="14" fill="#2b1a10" opacity="0.12" />
        <Scene />
      </svg>
      <PriceTag key={`tag-${sceneKey}`} tag={tag} sub={sub} />
    </div>
  );
}

function PriceTag({ tag, sub }: { tag: string; sub: string }) {
  return (
    <div className="absolute right-[-4%] top-[52%] w-[44%] origin-top-left rounded-[10px] border border-[#d8c3a2] bg-cream px-3.5 py-3 shadow-[0_14px_30px_-12px_rgba(43,26,16,0.45)] sm:right-[-8%]"
      style={{ animation: "tagIn 0.9s cubic-bezier(0.34,1.56,0.64,1) 1.2s both" }}>
      <span className="absolute -left-1.5 top-3 h-3 w-3 rounded-full border border-[#d8c3a2] bg-paper" />
      <p className="display truncate text-xl font-semibold leading-tight sm:text-2xl">{tag}</p>
      <p className="mt-0.5 truncate text-[11px] text-ink-2">{sub}</p>
    </div>
  );
}

function Steam({ x = [140, 180, 220], y = 120 }: { x?: number[]; y?: number }) {
  return (
    <g className="steam" stroke="#2b1a10" strokeOpacity="0.32" strokeWidth="3" fill="none" strokeLinecap="round">
      {x.map((cx) => (
        <path key={cx} d={`M${cx} ${y} q-12 -18 0 -34 q12 -16 0 -32`} />
      ))}
    </g>
  );
}

/* ------------------------------ Coffee ------------------------------ */
function Coffee() {
  return (
    <>
      <defs>
        <linearGradient id="cf-cup" x1="0" x2="1">
          <stop offset="0" stopColor="#fffaf1" />
          <stop offset="0.6" stopColor="#f1e6d4" />
          <stop offset="1" stopColor="#d9c8ad" />
        </linearGradient>
      </defs>
      {/* saucer */}
      <ellipse cx="180" cy="352" rx="150" ry="30" fill="#e9dcc6" />
      <ellipse cx="180" cy="346" rx="150" ry="28" fill="url(#cf-cup)" stroke="#d2bf9f" />
      <ellipse cx="180" cy="344" rx="80" ry="12" fill="#2b1a10" opacity="0.08" />

      <g className="scene-drop">
        {/* handle */}
        <path d="M276 196 C336 192 338 278 270 274" fill="none" stroke="#e7dac4" strokeWidth="18" strokeLinecap="round" />
        <path d="M276 196 C336 192 338 278 270 274" fill="none" stroke="#2b1a10" strokeOpacity=".08" strokeWidth="2" />
        {/* body */}
        <path d="M76 168 H284 V246 Q284 338 180 338 Q76 338 76 246 Z" fill="url(#cf-cup)" stroke="#d2bf9f" />
        <path d="M80 286 Q180 300 280 286" stroke="#e0892f" strokeWidth="7" fill="none" opacity=".85" />
        {/* coffee + crema */}
        <ellipse cx="180" cy="168" rx="104" ry="20" fill="#f1e6d4" />
        <ellipse cx="180" cy="170" rx="94" ry="16" fill="#5a2c10" />
        <ellipse cx="180" cy="170" rx="86" ry="13" fill="#b9733f" className="scene-fade" style={{ animationDelay: "0.9s" }} />
        {/* latte-art heart */}
        <path className="scene-draw" style={{ animationDelay: "1.3s" }}
          d="M180 180 C160 170 152 160 164 156 C172 154 178 158 180 163 C182 158 188 154 196 156 C208 160 200 170 180 180 Z"
          fill="none" stroke="#fbf6ec" strokeWidth="4.5" strokeLinejoin="round" />
      </g>
      <Steam y={140} />
    </>
  );
}

/* ------------------------------ Meal ------------------------------ */
function Meal() {
  const grains = [
    [128, 262], [150, 240], [172, 228], [196, 232], [220, 246], [238, 268], [140, 284], [166, 270],
    [190, 258], [212, 276], [230, 292], [120, 300], [158, 300], [200, 300], [250, 302], [182, 286],
  ];
  return (
    <>
      {/* plate */}
      <ellipse cx="180" cy="336" rx="164" ry="40" fill="#e3d4bb" />
      <ellipse cx="180" cy="330" rx="164" ry="38" fill="#fbf6ec" stroke="#d2bf9f" />
      <ellipse cx="180" cy="330" rx="120" ry="26" fill="none" stroke="#5d7f45" strokeOpacity=".35" strokeWidth="3" strokeDasharray="2 7" />

      {/* rice dome */}
      <g className="scene-pop" style={{ animationDelay: "0.15s" }}>
        <path d="M86 322 C88 248 136 214 180 214 C226 214 274 250 276 322 Z" fill="#e8b25a" />
        <path d="M86 322 C88 248 136 214 180 214 C226 214 274 250 276 322 Z" fill="url(#ml-shade)" />
        {grains.map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="5" ry="2.2" fill={i % 3 ? "#fff6e3" : "#d9822b"} transform={`rotate(${(i * 37) % 180} ${x} ${y})`} />
        ))}
      </g>
      <defs>
        <radialGradient id="ml-shade" cx="0.4" cy="0.3" r="0.8">
          <stop offset="0.5" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#8a4b24" stopOpacity=".45" />
        </radialGradient>
      </defs>

      {/* chicken pieces */}
      {[[148, 236, -18], [214, 244, 14], [178, 220, 0]].map(([x, y, r], i) => (
        <g key={i} className="scene-pop" style={{ animationDelay: `${0.55 + i * 0.18}s` }}>
          <ellipse cx={x} cy={y} rx="20" ry="13" fill="#a8562b" transform={`rotate(${r} ${x} ${y})`} />
          <ellipse cx={x - 4} cy={y - 4} rx="9" ry="4" fill="#d07a4f" opacity=".7" transform={`rotate(${r} ${x} ${y})`} />
        </g>
      ))}
      {/* lemon + chilli + herbs */}
      <g className="scene-pop" style={{ animationDelay: "1.15s" }}>
        <path d="M262 318 A30 30 0 0 1 318 310 Z" fill="#f2d14b" stroke="#d9b22e" strokeWidth="2" />
        <path d="M268 314 L312 308 M290 297 L290 312" stroke="#fff7c2" strokeWidth="1.5" />
      </g>
      <g className="scene-pop" style={{ animationDelay: "1.3s" }}>
        <path d="M60 318 C80 300 104 300 118 308" stroke="#9c3b46" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M118 308 l8 -6" stroke="#5d7f45" strokeWidth="4" strokeLinecap="round" />
      </g>
      {[[164, 206], [196, 210], [132, 256], [232, 262], [184, 250]].map(([x, y], i) => (
        <g key={i} className="scene-pop" style={{ animationDelay: `${1.4 + i * 0.07}s` }}>
          <ellipse cx={x} cy={y} rx="6" ry="3" fill="#5d7f45" transform={`rotate(${i * 50} ${x} ${y})`} />
        </g>
      ))}
      <Steam x={[140, 180, 220]} y={196} />
    </>
  );
}

/* ------------------------------ Bread ------------------------------ */
function Bread() {
  return (
    <>
      <defs>
        <linearGradient id="br-crust" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9792f" />
          <stop offset="1" stopColor="#8f4c1e" />
        </linearGradient>
        <linearGradient id="br-board" x1="0" x2="1">
          <stop offset="0" stopColor="#b9875a" />
          <stop offset="1" stopColor="#94653d" />
        </linearGradient>
      </defs>
      {/* cutting board */}
      <rect x="22" y="322" width="316" height="34" rx="17" fill="url(#br-board)" />
      <path d="M50 334 H300 M70 344 H280" stroke="#2b1a10" strokeOpacity=".12" strokeWidth="2" />

      {/* loaf rising */}
      <g className="scene-rise">
        <path d="M58 326 C48 214 112 168 180 168 C250 168 312 214 302 326 Z" fill="url(#br-crust)" />
        {/* raw dough overlay fades out = baking */}
        <path d="M58 326 C48 214 112 168 180 168 C250 168 312 214 302 326 Z" fill="#f3dcb0" className="scene-bake" />
        {[-1, 0, 1].map((i) => (
          <path key={i} className="scene-draw" style={{ animationDelay: `${1.5 + i * 0.12 + 0.12}s` }}
            d={`M${150 + i * 48} 196 C${168 + i * 48} 214 ${170 + i * 48} 236 ${162 + i * 48} 256`}
            stroke="#f6d9a8" strokeWidth="6" strokeLinecap="round" fill="none" />
        ))}
        <ellipse cx="140" cy="208" rx="40" ry="14" fill="#fff" opacity=".12" />
      </g>

      {/* slices */}
      {[0, 1].map((i) => (
        <g key={i} className="scene-slide" style={{ animationDelay: `${1.7 + i * 0.2}s` }}>
          <g transform={`translate(${34 + i * 30} ${240 + i * 4}) rotate(${-12 + i * 6})`}>
            <path d="M0 86 V30 C0 6 20 -4 44 -4 C68 -4 86 6 86 30 V86 Z" fill="#a8622c" />
            <path d="M8 82 V32 C8 14 24 6 44 6 C64 6 78 14 78 32 V82 Z" fill="#f4dcae" />
            {[[24, 30], [52, 26], [38, 50], [62, 58], [22, 66], [46, 72]].map(([x, y], k) => (
              <circle key={k} cx={x} cy={y} r="2.4" fill="#d9b884" />
            ))}
          </g>
        </g>
      ))}
    </>
  );
}

/* ------------------------------ Bus ------------------------------ */
function Bus() {
  return (
    <>
      {/* road */}
      <rect x="-20" y="330" width="400" height="42" rx="10" fill="#5b4433" opacity=".85" />
      <g style={{ transformBox: "fill-box" }} className="road-lines">
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={i} x={-20 + i * 80} y="349" width="40" height="5" rx="2.5" fill="#f5ecdc" opacity=".8" />
        ))}
      </g>

      <g className="scene-drive">
        <g className="scene-sway">
          {/* body */}
          <rect x="34" y="150" width="292" height="164" rx="26" fill="#e0892f" />
          <rect x="34" y="150" width="292" height="34" rx="17" fill="#b85c38" />
          <rect x="34" y="268" width="292" height="46" rx="0" fill="#c9732a" opacity=".55" />
          {/* route sign */}
          <rect x="56" y="157" width="64" height="20" rx="5" fill="#2b1a10" />
          <text x="88" y="172" textAnchor="middle" fontSize="13" fontFamily="JetBrains Mono, monospace" fill="#f2d14b">42 ↗</text>
          {/* windows */}
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={58 + i * 60} y="196" width="48" height="56" rx="8" fill="#fbf6ec" opacity=".92" />
          ))}
          <path d="M58 200 l20 -4 M118 200 l20 -4" stroke="#fff" strokeWidth="3" opacity=".6" />
          {/* door */}
          <rect x="296" y="196" width="0" height="0" />
          <rect x="282" y="196" width="34" height="110" rx="6" fill="#fbf6ec" opacity=".85" />
          <path d="M299 200 V302" stroke="#e0892f" strokeWidth="2" />
          {/* headlight */}
          <circle cx="318" cy="284" r="7" fill="#fff6c9" />
          <circle cx="318" cy="284" r="16" fill="#fff6c9" opacity=".25" className="scene-fade" style={{ animationDelay: "1.4s" }} />
          {/* passengers */}
          <circle cx="82" cy="236" r="10" fill="#8a4b24" opacity=".55" />
          <circle cx="202" cy="232" r="10" fill="#5d7f45" opacity=".55" />
        </g>
        {/* wheels */}
        {[96, 252].map((x) => (
          <g key={x}>
            <circle cx={x} cy="316" r="27" fill="#2b1a10" />
            <g className="wheel" style={{ transformOrigin: `${x}px 316px` }}>
              <circle cx={x} cy="316" r="12" fill="#8f7660" />
              <path d={`M${x - 12} 316 H${x + 12} M${x} 304 V328`} stroke="#2b1a10" strokeWidth="3" />
            </g>
          </g>
        ))}
      </g>
    </>
  );
}

/* ------------------------------ Cinema ------------------------------ */
function Cinema() {
  return (
    <g transform="translate(-26 0)">
      <CinemaInner />
    </g>
  );
}

function CinemaInner() {
  const kernels = [
    [150, 200, 0], [176, 190, 0.3], [204, 198, 0.6], [228, 206, 0.15], [130, 212, 0.45],
  ];
  return (
    <>
      <defs>
        <clipPath id="cn-box">
          <path d="M112 226 H272 L252 364 H132 Z" />
        </clipPath>
      </defs>

      {/* ticket slides up behind */}
      <g className="scene-ticket">
        <g transform="rotate(-14 110 250)">
          <path d="M36 196 H186 a12 12 0 0 0 0 24 V250 a12 12 0 0 0 0 24 V304 H36 V274 a12 12 0 0 0 0 -24 V220 a12 12 0 0 0 0 -24 Z" fill="#f2d14b" stroke="#d9b22e" strokeWidth="2" />
          <path d="M150 204 V296" stroke="#2b1a10" strokeOpacity=".35" strokeWidth="2" strokeDasharray="4 5" />
          <text x="94" y="242" textAnchor="middle" fontSize="13" fontFamily="JetBrains Mono, monospace" fill="#2b1a10" letterSpacing="2">ADMIT</text>
          <text x="94" y="266" textAnchor="middle" fontSize="13" fontFamily="JetBrains Mono, monospace" fill="#2b1a10" letterSpacing="2">ONE</text>
          <text x="168" y="256" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono, monospace" fill="#2b1a10" transform="rotate(-90 168 252)">No. 050</text>
        </g>
      </g>

      {/* popcorn pile */}
      <g className="scene-pop" style={{ animationDelay: "0.2s" }}>
        {[[130, 228], [156, 214], [184, 208], [212, 214], [240, 226], [168, 230], [200, 232], [146, 238], [226, 240]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="17" fill="#fff6e3" stroke="#e6cf9f" />
            <circle cx={x + 6} cy={y - 5} r="8" fill="#fffbf2" />
            <circle cx={x - 6} cy={y + 4} r="4" fill="#f2d14b" opacity=".6" />
          </g>
        ))}
      </g>

      {/* box */}
      <g className="scene-pop">
        <path d="M112 226 H272 L252 364 H132 Z" fill="#fbf6ec" />
        <g clipPath="url(#cn-box)">
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={114 + i * 36} y="220" width="18" height="150" fill="#9c3b46" transform={`skewX(${-4 + i * 2})`} />
          ))}
        </g>
        <rect x="104" y="220" width="176" height="14" rx="5" fill="#9c3b46" />
        <circle cx="192" cy="300" r="22" fill="#fbf6ec" />
        <text x="192" y="306" textAnchor="middle" fontSize="15" fontFamily="Fraunces, Georgia, serif" fontWeight="700" fill="#9c3b46">★</text>
      </g>

      {/* popping kernels */}
      {kernels.map(([x, y, d], i) => (
        <g key={i} className="kernel" style={{ animationDelay: `${1 + Number(d) * 2}s`, ["--dx" as string]: `${(i % 2 ? 1 : -1) * (24 + i * 10)}px` }}>
          <circle cx={x} cy={y} r="11" fill="#fff6e3" stroke="#e6cf9f" />
          <circle cx={Number(x) + 4} cy={Number(y) - 3} r="5" fill="#fffbf2" />
        </g>
      ))}
    </>
  );
}
