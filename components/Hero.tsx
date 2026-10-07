"use client";

import { useEffect, useState } from "react";
import { ITEMS } from "@/lib/items";
import { fmtMinutes, fmtMoney, minutesOfWork, toUSD } from "@/lib/calc";
import type { Country, ItemKey, Rates } from "@/lib/types";
import CountryPicker from "./CountryPicker";
import Kulhad from "./Kulhad";
import Odometer from "./Odometer";
import ItemIcon from "./ItemIcon";

interface Props {
  home: Country;
  onHome: (c: Country) => void;
  item: ItemKey;
  onItem: (k: ItemKey) => void;
  rates: Rates;
}

export default function Hero({ home, onHome, item, onItem, rates }: Props) {
  const [word, setWord] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWord((w) => (w + 1) % ITEMS.length), 2600);
    return () => clearInterval(id);
  }, []);

  const it = ITEMS.find((i) => i.key === item)!;
  const price = home.prices[item];
  const usd = toUSD(price, home.currency, rates);
  const mins = minutesOfWork(home, item);
  const local = it.localName(home);

  return (
    <section id="top" className="grid items-center gap-10 pb-10 pt-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:pb-16 lg:pt-12">
      <div>
        <p className="label flex items-center gap-2">
          <span className="h-px w-8 bg-dust/60" />
          50 countries · one everyday basket
        </p>

        <h1 className="display mt-5 text-[clamp(2.5rem,5.6vw,4.6rem)] font-medium leading-[0.98]">
          What does{" "}
          <span className="relative inline-block [perspective:600px]">
            <em key={word} className="flip-in inline-block font-semibold italic text-clay">
              {ITEMS[word].phrase}
            </em>
          </span>
          <br />
          cost around the world?
        </h1>

        <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-2">
          Prices only make sense next to what people earn. The Chai Index compares everyday things across 50 countries — in your
          money, in US dollars, and in <span className="text-ink underline decoration-saffron decoration-2 underline-offset-4">minutes of work</span>.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <CountryPicker value={home} onChange={onHome} label="I live in" />
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Choose an item">
            {ITEMS.map((i) => (
              <button key={i.key} type="button" role="tab" aria-selected={i.key === item} onClick={() => onItem(i.key)} title={i.label}
                className={`grid h-11 w-11 place-items-center rounded-full border transition ${i.key === item ? "border-ink bg-ink text-cream" : "border-line bg-cream/70 text-ink-2 hover:border-ink/40"}`}>
                <ItemIcon item={i.key} />
                <span className="sr-only">{i.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-9 border-t border-line pt-6">
          <p className="text-ink-2">
            In <strong className="font-semibold text-ink">{home.city}</strong>, {item === "chai" || item === "meal" ? <>a <em className="display italic">{local}</em></> : it.phrase} costs about
          </p>
          <p className="display mt-2 text-[clamp(3.2rem,8vw,5.5rem)] font-semibold leading-none text-ink">
            <Odometer value={fmtMoney(price, home.symbol)} />
          </p>
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[13px] text-ink-2">
            <span>≈ {fmtMoney(usd, "US$")}</span>
            <span>{mins == null ? "No national minimum wage" : `${fmtMinutes(mins)} of minimum-wage work`}</span>
          </p>
        </div>
      </div>

      <div className="relative">
        <Kulhad pourKey={`${home.code}-${item}`} tag={fmtMoney(price, home.symbol)} sub={`${local} · ${home.city}`} />
      </div>
    </section>
  );
}
