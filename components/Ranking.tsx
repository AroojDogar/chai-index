"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { COUNTRIES } from "@/lib/countries";
import { ITEMS } from "@/lib/items";
import { convert, fmtMinutes, fmtMoney, fmtRatio, minutesOfWork, valueFor } from "@/lib/calc";
import type { Country, ItemKey, Measure, Rates } from "@/lib/types";
import Flag from "./Flag";
import ItemIcon from "./ItemIcon";

const REGIONS = ["All", "Asia", "Middle East", "Africa", "Europe", "Americas", "Oceania"] as const;
const MEASURES: { key: Measure; label: string; hint: string }[] = [
  { key: "home", label: "In my money", hint: "Converted to your currency at today's rate" },
  { key: "usd", label: "In US$", hint: "Converted to US dollars" },
  { key: "work", label: "Minutes of work", hint: "How long someone on the local minimum wage works to pay for it" },
];

// Lighter brew = cheaper, stronger brew = pricier.
function brew(t: number) {
  const a = [222, 176, 120];
  const b = [92, 42, 16];
  const mix = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  const top = a.map((v, i) => Math.round(v + (b[i] - v) * Math.max(0, t - 0.15)));
  return { top: `rgb(${top.join(",")})`, bottom: `rgb(${mix.join(",")})` };
}

interface Props {
  home: Country;
  item: ItemKey;
  onItem: (k: ItemKey) => void;
  measure: Measure;
  onMeasure: (m: Measure) => void;
  rates: Rates;
}

export default function Ranking({ home, item, onItem, measure, onMeasure, rates }: Props) {
  const [region, setRegion] = useState<(typeof REGIONS)[number]>("All");
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const [showAll, setShowAll] = useState(false);
  const LIMIT = 15;

  const rows = useMemo(() => {
    const list = COUNTRIES.filter((c) => region === "All" || c.region === region || c.code === home.code).map((c) => ({
      c,
      v: valueFor(c, item, measure, home, rates),
    }));
    const withV = list.filter((r) => r.v != null && Number.isFinite(r.v)) as { c: Country; v: number }[];
    const without = list.filter((r) => r.v == null || !Number.isFinite(r.v));
    withV.sort((a, b) => (order === "desc" ? b.v - a.v : a.v - b.v));
    return { ranked: withV, missing: without.map((r) => r.c) };
  }, [region, item, measure, home, rates, order]);

  const max = Math.max(...rows.ranked.map((r) => r.v), 0);
  const min = Math.min(...rows.ranked.map((r) => r.v));
  const homeV = valueFor(home, item, measure, home, rates);
  const homeRank = rows.ranked.findIndex((r) => r.c.code === home.code);
  const cheapest = [...rows.ranked].sort((a, b) => a.v - b.v)[0];
  const priciest = [...rows.ranked].sort((a, b) => b.v - a.v)[0];

  // ---------- FLIP: animate rows to their new positions when the order changes ----------
  const listRef = useRef<HTMLOListElement>(null);
  const prev = useRef(new Map<string, number>());
  useLayoutEffect(() => {
    const els = listRef.current?.querySelectorAll<HTMLElement>("[data-code]");
    if (!els) return;
    const next = new Map<string, number>();
    els.forEach((el) => next.set(el.dataset.code!, el.offsetTop));
    els.forEach((el) => {
      const before = prev.current.get(el.dataset.code!);
      const after = next.get(el.dataset.code!)!;
      if (before == null) {
        el.animate([{ opacity: 0, transform: "translateX(-12px)" }, { opacity: 1, transform: "none" }], { duration: 450, easing: "ease-out" });
      } else if (Math.abs(before - after) > 1) {
        el.animate([{ transform: `translateY(${before - after}px)` }, { transform: "none" }], {
          duration: 750,
          easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        });
      }
    });
    prev.current = next;
  }, [rows]);

  const fmtValue = (v: number) => (measure === "work" ? fmtMinutes(v) : measure === "usd" ? fmtMoney(v, "US$") : fmtMoney(v, home.symbol));
  const it = ITEMS.find((i) => i.key === item)!;
  const measureWord = measure === "work" ? "most minutes of work" : "most expensive";

  return (
    <section id="index" className="scroll-mt-6" aria-labelledby="index-h">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="label">The index</p>
          <h2 id="index-h" className="display mt-2 text-4xl font-medium sm:text-5xl">
            Where {it.phrase} is <em className="italic text-clay">{order === "desc" ? measureWord : measure === "work" ? "most affordable" : "cheapest"}</em>
          </h2>
        </div>
        <button type="button" onClick={() => setOrder((o) => (o === "desc" ? "asc" : "desc"))}
          className="flex h-10 items-center gap-2 rounded-full border border-line bg-cream/70 px-4 text-sm transition hover:border-ink/40">
          <svg viewBox="0 0 20 20" className={`h-4 w-4 transition-transform duration-500 ${order === "asc" ? "rotate-180" : ""}`} aria-hidden>
            <path d="M10 4v12m0 0-4-4m4 4 4-4" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {order === "desc" ? "Highest first" : "Lowest first"}
        </button>
      </div>

      {/* Controls */}
      <div className="card mt-6 grid grid-cols-[minmax(0,1fr)] gap-4 p-4 sm:p-5">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Item">
          {ITEMS.map((i) => (
            <button key={i.key} type="button" role="tab" aria-selected={i.key === item} onClick={() => onItem(i.key)}
              className={`flex h-10 items-center gap-2 rounded-full px-4 text-sm transition ${i.key === item ? "bg-ink text-cream" : "bg-paper-2/60 text-ink-2 hover:bg-paper-2"}`}>
              <ItemIcon item={i.key} className="h-4 w-4" />
              {i.label}
            </button>
          ))}
        </div>
        <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="inline-flex w-full rounded-full bg-paper-2/60 p-1 sm:w-auto" role="radiogroup" aria-label="Measure">
            {MEASURES.map((m) => (
              <button key={m.key} type="button" role="radio" aria-checked={m.key === measure} title={m.hint} onClick={() => onMeasure(m.key)}
                className={`h-9 flex-1 whitespace-nowrap rounded-full px-2 text-[12px] transition sm:flex-none sm:px-4 sm:text-[13px] ${m.key === measure ? "bg-cream text-ink shadow-sm" : "text-ink-2 hover:text-ink"}`}>
                {m.label}
              </button>
            ))}
          </div>
          <div className="-mx-1 flex min-w-0 gap-1.5 overflow-x-auto px-1 pb-1 lg:pb-0">
            {REGIONS.map((r) => (
              <button key={r} type="button" onClick={() => setRegion(r)}
                className={`h-8 shrink-0 rounded-full border px-3 text-[12px] transition ${r === region ? "border-clay bg-clay text-cream" : "border-line text-ink-2 hover:border-ink/40"}`}>
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Headline stats */}
      {cheapest && priciest && (
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label={measure === "work" ? "Most affordable" : "Cheapest"} code={cheapest.c.code} title={cheapest.c.name} value={fmtValue(cheapest.v)} />
          <Stat label={measure === "work" ? "Least affordable" : "Priciest"} code={priciest.c.code} title={priciest.c.name} value={fmtValue(priciest.v)} />
          <Stat label="The gap" title={`${min > 0 ? Math.round(max / min) : "—"}×`} value={`between ${measure === "work" ? "least and most affordable" : "cheapest and priciest"}`} />
          <Stat label={`${home.name} ranks`} code={home.code}
            title={homeRank >= 0 ? `#${homeRank + 1} of ${rows.ranked.length}` : "—"}
            value={homeV == null ? "No minimum wage" : fmtValue(homeV)} highlight />
        </div>
      )}

      {/* Rows */}
      <ol ref={listRef} className="card mt-5 divide-y divide-line overflow-hidden p-2 sm:p-3">
        {rows.ranked.map(({ c, v }, i) => {
          const isHome = c.code === home.code;
          // Collapsed view: top rows, plus the visitor's own country wherever it sits.
          if (!showAll && i >= LIMIT && !isHome) return null;
          const t = max > min ? (v - min) / (max - min) : 0.5;
          const color = brew(t);
          const ratio = homeV ? v / homeV : NaN;
          const local = c.prices[item];
          const mins = minutesOfWork(c, item);
          const chaiPerHour = c.wage ? c.wage / c.prices.chai : null;
          return (
            <li key={c.code} data-code={c.code}
              className={`relative grid grid-cols-[28px_1fr_auto] items-center gap-x-3 gap-y-2 rounded-2xl px-2.5 py-3 sm:grid-cols-[34px_minmax(170px,1.1fr)_2fr_120px] sm:px-3 ${isHome ? "bg-saffron/10 ring-1 ring-saffron/50" : ""}`}>
              <span className="font-mono text-xs text-dust">{String(i + 1).padStart(2, "0")}</span>

              <div className="flex min-w-0 items-center gap-3">
                <Flag code={c.code} size={26} />
                <div className="min-w-0">
                  <p className="flex items-center gap-2 truncate font-medium">
                    {c.name}
                    {isHome && <span className="rounded-full bg-saffron px-1.5 py-px font-mono text-[9px] font-medium uppercase tracking-wider text-cream">You</span>}
                  </p>
                  <p className="truncate text-xs text-dust">
                    {it.localName(c)} · {fmtMoney(local, c.symbol)}
                  </p>
                </div>
              </div>

              <div className="text-right sm:order-last">
                <p className="num font-mono text-[15px] font-medium text-ink">{fmtValue(v)}</p>
                <p className={`font-mono text-[10.5px] ${ratio > 1.05 ? "text-berry" : ratio < 0.95 ? "text-cardamom" : "text-dust"}`}>
                  {isHome ? "your baseline" : `${fmtRatio(ratio)}`}
                </p>
              </div>

              <div className="col-span-3 sm:col-span-1">
                <div className="relative h-3 overflow-hidden rounded-full bg-paper-2/80">
                  <div className="pour absolute inset-y-0 left-0 rounded-full"
                    style={{ width: `${Math.max(2, (v / max) * 100)}%`, ["--bar-top" as string]: color.top, ["--bar-bottom" as string]: color.bottom, transitionDelay: `${Math.min(i, 20) * 25}ms` }} />
                </div>
                {measure === "work" && chaiPerHour != null && (
                  <p className="mt-1 text-[11px] text-dust">One hour of work buys ≈ {chaiPerHour >= 10 ? Math.round(chaiPerHour) : chaiPerHour.toFixed(1)} cups of {c.tea.toLowerCase()}</p>
                )}
                {measure !== "work" && mins != null && (
                  <p className="mt-1 hidden text-[11px] text-dust sm:block">{fmtMinutes(mins)} of local minimum-wage work</p>
                )}
              </div>
            </li>
          );
        })}

        {rows.ranked.length > LIMIT && (
          <li className="flex justify-center px-3 py-3">
            <button type="button" onClick={() => setShowAll((s) => !s)}
              className="flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-sm text-cream transition hover:bg-ink-2">
              {showAll ? "Show top 15" : `Show all ${rows.ranked.length} countries`}
              <svg viewBox="0 0 20 20" className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`} aria-hidden>
                <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </li>
        )}

        {(showAll || rows.ranked.length <= LIMIT) && rows.missing.length > 0 && (
          <li className="px-3 py-4 text-sm text-dust">
            <span className="font-medium text-ink-2">No national minimum wage: </span>
            {rows.missing.map((c) => c.name).join(", ")}. These can't be ranked by minutes of work.
          </li>
        )}
      </ol>

      <p className="mt-3 px-2 text-xs text-dust">
        Lighter bar = cheaper, stronger brew = pricier. Prices are converted at {rates.live ? "today's live" : "recent"} exchange rates
        {measure === "home" ? ` into ${home.currency}` : ""}.
        {measure !== "home" && ` 1 ${home.currency} = ${convert(1, home.currency, "USD", rates).toPrecision(3)} USD.`}
      </p>
    </section>
  );
}

function Stat({ label, title, value, code, highlight }: { label: string; title: string; value: string; code?: string; highlight?: boolean }) {
  return (
    <div className={`card p-4 ${highlight ? "!border-saffron/60 !bg-saffron/10" : ""}`}>
      <p className="label">{label}</p>
      <p className="mt-2 flex items-center gap-2">
        {code && <Flag code={code} size={22} />}
        <span className="display truncate text-xl font-semibold">{title}</span>
      </p>
      <p className="mt-1 truncate font-mono text-xs text-ink-2">{value}</p>
    </div>
  );
}
