"use client";

import { useState } from "react";
import { ITEMS } from "@/lib/items";
import { basket, convert, fmtMinutes, fmtMoney, minutesOfWork, toUSD } from "@/lib/calc";
import type { Country, Rates } from "@/lib/types";
import CountryPicker from "./CountryPicker";
import ItemIcon from "./ItemIcon";

const PIVOT = { x: 260, y: 64 };
const HALF = 188;
const DROP = 96;

function Pan({ x, y, coins, color }: { x: number; y: number; coins: number; color: string }) {
  return (
    <g className="pan" style={{ transform: `translate(${x}px, ${y}px)` }}>
      <path d={`M0 0 L-62 ${DROP} M0 0 L62 ${DROP}`} stroke="#5b4433" strokeWidth="1.4" />
      <circle r="4" fill="#2b1a10" />
      <path d={`M-78 ${DROP} Q0 ${DROP + 34} 78 ${DROP} Z`} fill="#c98a55" stroke="#8a4b24" strokeWidth="1.5" />
      {Array.from({ length: coins }).map((_, i) => (
        <g key={i} transform={`translate(${(i % 2 ? 6 : -6) + (i % 3) - 1}, ${DROP - 6 - i * 7})`}>
          <ellipse rx="22" ry="6" fill={color} stroke="#2b1a10" strokeOpacity=".35" />
          <ellipse rx="14" ry="3" fill="none" stroke="#2b1a10" strokeOpacity=".2" />
        </g>
      ))}
    </g>
  );
}

export default function FaceOff({ a, b, onA, onB, rates }: {
  a: Country;
  b: Country;
  onA: (c: Country) => void;
  onB: (c: Country) => void;
  rates: Rates;
}) {
  const [spin, setSpin] = useState(0);
  const usdA = toUSD(basket(a), a.currency, rates);
  const usdB = toUSD(basket(b), b.currency, rates);
  const ratio = usdB / usdA;
  const angle = Math.max(-16, Math.min(16, Math.log2(ratio) * 9));
  const rad = (angle * Math.PI) / 180;
  const left = { x: PIVOT.x - HALF * Math.cos(rad), y: PIVOT.y - HALF * Math.sin(rad) };
  const right = { x: PIVOT.x + HALF * Math.cos(rad), y: PIVOT.y + HALF * Math.sin(rad) };
  const coins = (usd: number) => Math.max(1, Math.min(9, Math.round(Math.log2(usd / 4) * 1.6)));

  const workA = a.wage ? (basket(a) / a.wage) * 60 : null;
  const workB = b.wage ? (basket(b) / b.wage) * 60 : null;

  const pricier = ratio >= 1 ? b : a;
  const cheaper = ratio >= 1 ? a : b;
  const times = ratio >= 1 ? ratio : 1 / ratio;

  let workLine = "";
  if (workA && workB) {
    const w = workA / workB;
    if (w > 1.1) workLine = `But someone on minimum wage in ${b.name} works ${w.toFixed(1)}× fewer minutes to afford it than in ${a.name}.`;
    else if (w < 0.9) workLine = `And someone on minimum wage in ${b.name} works ${(1 / w).toFixed(1)}× longer to afford it than in ${a.name}.`;
    else workLine = `On minimum wage, it takes about the same time to afford it in both.`;
  }

  return (
    <section id="faceoff" className="scroll-mt-6" aria-labelledby="fo-h">
      <p className="label">Face-off</p>
      <h2 id="fo-h" className="display mt-2 text-4xl font-medium sm:text-5xl">
        Put two countries <em className="italic text-clay">on the scale</em>
      </h2>

      <div className="card mt-6 overflow-hidden p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <CountryPicker value={a} onChange={onA} label="Country A" />
          <button type="button" aria-label="Swap countries"
            onClick={() => { onA(b); onB(a); setSpin((s) => s + 180); }}
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-cream text-ink-2 transition hover:border-ink/40">
            <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform duration-500" style={{ transform: `rotate(${spin}deg)` }} aria-hidden>
              <path d="M4 7h11m0 0-3-3m3 3-3 3M16 13H5m0 0 3-3m-3 3 3 3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <CountryPicker value={b} onChange={onB} label="Country B" />
        </div>

        <svg viewBox="0 0 520 250" className="mx-auto mt-4 w-full max-w-[560px]" role="img"
          aria-label={`Everyday basket: ${pricier.name} is ${times.toFixed(1)} times pricier than ${cheaper.name}`}>
          <path d="M260 64 L240 226 H280 Z" fill="#8a4b24" />
          <rect x="196" y="224" width="128" height="12" rx="6" fill="#5b4433" />
          <g className="beam" style={{ transform: `rotate(${angle}deg)`, transformOrigin: `${PIVOT.x}px ${PIVOT.y}px` }}>
            <rect x={PIVOT.x - HALF - 6} y={PIVOT.y - 4} width={HALF * 2 + 12} height="8" rx="4" fill="#2b1a10" />
          </g>
          <circle cx={PIVOT.x} cy={PIVOT.y} r="10" fill="#e0892f" stroke="#2b1a10" strokeWidth="2" />
          <Pan x={left.x} y={left.y} coins={coins(usdA)} color="#e9b45f" />
          <Pan x={right.x} y={right.y} coins={coins(usdB)} color="#e9b45f" />
        </svg>

        <div className="mt-2 grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="label">{a.city} basket</p>
            <p className="display text-3xl font-semibold">{fmtMoney(usdA, "US$")}</p>
            <p className="font-mono text-xs text-dust">{fmtMoney(basket(a), a.symbol)}</p>
          </div>
          <div>
            <p className="label">{b.city} basket</p>
            <p className="display text-3xl font-semibold">{fmtMoney(usdB, "US$")}</p>
            <p className="font-mono text-xs text-dust">{fmtMoney(basket(b), b.symbol)}</p>
          </div>
        </div>

        <p className="display mx-auto mt-6 max-w-2xl text-center text-2xl leading-snug sm:text-[1.7rem]">
          {a.code === b.code ? (
            "Pick two different countries to compare."
          ) : (
            <>
              The everyday basket costs <em className="italic text-clay">{times.toFixed(1)}× more</em> in {pricier.name} than in {cheaper.name}.
            </>
          )}
        </p>
        {a.code !== b.code && workLine && <p className="mx-auto mt-2 max-w-xl text-center text-ink-2">{workLine}</p>}

        {/* Item by item */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-line">
          <div className="grid grid-cols-[1fr_1.3fr_1fr] bg-paper-2/60 px-4 py-2.5 text-[11px] sm:grid-cols-[1.2fr_1fr_1.4fr_1fr]">
            <span className="label hidden sm:block">Item</span>
            <span className="label text-left">{a.name}</span>
            <span className="label text-center">Which costs more</span>
            <span className="label text-right">{b.name}</span>
          </div>
          {ITEMS.map((it) => {
            const pa = a.prices[it.key];
            const pb = b.prices[it.key];
            const r = toUSD(pb, b.currency, rates) / toUSD(pa, a.currency, rates);
            const lean = Math.max(-1, Math.min(1, Math.log2(r) / 4)); // -1..1
            const ma = minutesOfWork(a, it.key);
            const mb = minutesOfWork(b, it.key);
            return (
              <div key={it.key} className="grid grid-cols-[1fr_1.3fr_1fr] items-center gap-2 border-t border-line px-4 py-3 sm:grid-cols-[1.2fr_1fr_1.4fr_1fr]">
                <span className="col-span-3 flex items-center gap-2 text-sm font-medium sm:col-span-1">
                  <ItemIcon item={it.key} className="h-4 w-4 text-clay" />
                  {it.label}
                </span>
                <span className="text-left">
                  <span className="block font-mono text-sm">{fmtMoney(pa, a.symbol)}</span>
                  <span className="block text-[11px] text-dust">{ma == null ? "—" : fmtMinutes(ma)} work</span>
                </span>
                <span className="relative mx-auto h-2 w-full max-w-[200px] rounded-full bg-paper-2">
                  <span className="absolute inset-y-[-3px] left-1/2 w-px bg-ink/30" />
                  <span className="absolute inset-y-0 rounded-full transition-all duration-700"
                    style={{
                      left: lean < 0 ? `${50 + lean * 50}%` : "50%",
                      width: `${Math.abs(lean) * 50}%`,
                      background: "linear-gradient(90deg, #c98a55, #b85c38)",
                    }} />
                  <span className="absolute -bottom-4 left-0 right-0 text-center font-mono text-[10px] text-ink-2">
                    {r >= 0.95 && r <= 1.05 ? "same" : r > 1 ? `${r.toFixed(1)}× in ${b.code.toUpperCase()}` : `${(1 / r).toFixed(1)}× in ${a.code.toUpperCase()}`}
                  </span>
                </span>
                <span className="text-right">
                  <span className="block font-mono text-sm">{fmtMoney(pb, b.symbol)}</span>
                  <span className="block text-[11px] text-dust">
                    {mb == null ? "—" : fmtMinutes(mb)} work · {fmtMoney(convert(pb, b.currency, a.currency, rates), a.symbol)}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-dust">
          Basket = chai + coffee + meal + bread + bus ride + cinema ticket. Bars lean toward the country where each item costs more in US dollars.
          {(workA == null || workB == null) && " Minutes of work aren't shown for countries without a national minimum wage."}
        </p>
      </div>
    </section>
  );
}
