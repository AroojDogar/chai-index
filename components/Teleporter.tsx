"use client";

import { useEffect, useMemo, useState } from "react";
import { COUNTRIES } from "@/lib/countries";
import { basket, convert, equivalentSalary, fmtMoney, purchasingPower } from "@/lib/calc";
import type { Country, Rates } from "@/lib/types";
import CountryPicker from "./CountryPicker";
import Flag from "./Flag";
import Odometer from "./Odometer";

function niceDefault(c: Country) {
  const v = basket(c) * 45;
  const m = 10 ** Math.max(0, Math.floor(Math.log10(v)) - 1);
  return Math.round(v / m) * m;
}

export default function Teleporter({ home, target, onTarget, rates }: {
  home: Country;
  target: Country;
  onTarget: (c: Country) => void;
  rates: Rates;
}) {
  const [salary, setSalary] = useState(() => niceDefault(home));
  const [text, setText] = useState(() => niceDefault(home).toLocaleString("en-US"));

  useEffect(() => {
    const d = niceDefault(home);
    setSalary(d);
    setText(d.toLocaleString("en-US"));
  }, [home]);

  function onInput(v: string) {
    const digits = v.replace(/[^\d]/g, "").slice(0, 12);
    const n = Number(digits || 0);
    setSalary(n);
    setText(digits ? n.toLocaleString("en-US") : "");
  }

  const equiv = equivalentSalary(salary, home, target);
  const converted = convert(salary, home.currency, target.currency, rates);
  const power = purchasingPower(salary, home, target, rates);

  const ranked = useMemo(
    () =>
      COUNTRIES.filter((c) => c.code !== home.code)
        .map((c) => ({ c, p: purchasingPower(1, home, c, rates) }))
        .sort((x, y) => y.p - x.p),
    [home, rates],
  );
  const furthest = ranked.slice(0, 5);
  const shrinks = ranked.slice(-5).reverse();

  return (
    <section id="teleport" className="scroll-mt-6" aria-labelledby="tp-h">
      <p className="label">Salary teleporter</p>
      <h2 id="tp-h" className="display mt-2 text-4xl font-medium sm:text-5xl">
        What is your salary <em className="italic text-clay">worth abroad?</em>
      </h2>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        <div className="card relative overflow-hidden p-6 sm:p-8">
          <div className="flex flex-wrap items-end gap-3">
            <label className="flex-1">
              <span className="label">My monthly income in {home.city}</span>
              <span className="mt-2 flex h-14 items-center rounded-2xl border border-line bg-cream px-4 focus-within:border-ink/50">
                <span className="mr-2 font-mono text-dust">{home.symbol}</span>
                <input inputMode="numeric" value={text} onChange={(e) => onInput(e.target.value)} aria-label="Monthly income"
                  className="num w-full bg-transparent font-mono text-xl outline-none" />
              </span>
            </label>
            <CountryPicker value={target} onChange={onTarget} label="Teleport to" />
          </div>

          {/* journey arc */}
          <svg viewBox="0 0 600 120" className="mt-6 w-full" aria-hidden>
            <path id="tp-arc" d="M40 96 Q300 -30 560 96" fill="none" stroke="#8f7660" strokeOpacity=".5" strokeWidth="2" strokeDasharray="4 7" />
            <circle cx="40" cy="96" r="7" fill="#e0892f" />
            <circle cx="560" cy="96" r="7" fill="#5d7f45" />
            <g key={`${home.code}-${target.code}`}>
              <circle r="9" fill="#2b1a10">
                <animateMotion dur="2.4s" repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.25 1">
                  <mpath href="#tp-arc" />
                </animateMotion>
              </circle>
            </g>
            <text x="40" y="118" textAnchor="middle" className="fill-ink-2 font-mono" fontSize="12">{home.city}</text>
            <text x="560" y="118" textAnchor="middle" className="fill-ink-2 font-mono" fontSize="12">{target.city}</text>
          </svg>

          <div className="mt-4 border-t border-line pt-6">
            {home.code === target.code ? (
              <p className="display text-2xl">Pick a different country to teleport to.</p>
            ) : (
              <>
                <p className="text-ink-2">To live like you do in {home.city}, you&apos;d need about</p>
                <p className="display mt-1 text-[clamp(2.6rem,6vw,4.2rem)] font-semibold leading-none">
                  <Odometer value={fmtMoney(equiv, target.symbol)} />
                </p>
                <p className="mt-2 text-ink-2">a month in {target.city}.</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-paper-2/60 p-4">
                    <p className="label">Your income, converted</p>
                    <p className="mt-1 font-mono text-lg">{fmtMoney(converted, target.symbol)}</p>
                  </div>
                  <div className={`rounded-2xl p-4 ${power >= 1 ? "bg-cardamom/15" : "bg-berry/10"}`}>
                    <p className="label">Your everyday life there</p>
                    <p className={`mt-1 font-mono text-lg ${power >= 1 ? "text-cardamom" : "text-berry"}`}>
                      {power >= 1 ? `${power.toFixed(1)}× richer` : `${Math.round(power * 100)}% of today`}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid gap-5">
          <List title="Where your money goes furthest" tone="good" rows={furthest} onPick={onTarget} />
          <List title="Where it shrinks the most" tone="bad" rows={shrinks} onPick={onTarget} />
        </div>
      </div>
      <p className="mt-3 px-2 text-xs text-dust">
        A simplified comparison: it scales your income by how much the same everyday basket costs in each country. Rent, taxes and
        healthcare — usually the biggest costs — aren&apos;t included.
      </p>
    </section>
  );
}

function List({ title, rows, tone, onPick }: {
  title: string;
  rows: { c: Country; p: number }[];
  tone: "good" | "bad";
  onPick: (c: Country) => void;
}) {
  return (
    <div className="card p-5">
      <p className="label flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${tone === "good" ? "bg-cardamom" : "bg-berry"}`} />
        {title}
      </p>
      <ol className="mt-3 space-y-1">
        {rows.map(({ c, p }) => (
          <li key={c.code}>
            <button type="button" onClick={() => onPick(c)}
              className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-paper-2/60">
              <Flag code={c.code} size={22} />
              <span className="flex-1 truncate text-sm">{c.name}</span>
              <span className={`font-mono text-sm ${tone === "good" ? "text-cardamom" : "text-berry"}`}>
                {p >= 1 ? `${p.toFixed(1)}×` : `${Math.round(p * 100)}%`}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
