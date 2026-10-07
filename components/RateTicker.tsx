import { convert, fmtMoney } from "@/lib/calc";
import { COUNTRIES } from "@/lib/countries";
import type { Country, Rates } from "@/lib/types";

/** Scrolling strip: one unit of each currency, expressed in the visitor's own money. */
export default function RateTicker({ home, rates }: { home: Country; rates: Rates }) {
  const seen = new Set<string>([home.currency]);
  const others = COUNTRIES.filter((c) => !seen.has(c.currency) && seen.add(c.currency));
  // For tiny units (e.g. 1 VND), quote 100 or 1,000 units so the number stays readable.
  const items = others.map((c) => {
    const one = convert(1, c.currency, home.currency, rates);
    const unit = one >= 1 ? 1 : one >= 0.01 ? 100 : 1000;
    return { cur: c.currency, unit, value: one * unit };
  });

  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((it) => (
        <span key={it.cur} className="flex items-center gap-2 px-5 font-mono text-[12px] text-ink-2">
          <span className="text-dust">{it.unit.toLocaleString("en-US")} {it.cur}</span>
          <span className="text-ink">{fmtMoney(it.value, home.symbol)}</span>
          <span className="text-line">◆</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden border-y border-line bg-cream/60 py-2.5" aria-label="Exchange rates">
      <div className="ticker flex w-max">
        {row}
        {row}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper to-transparent" />
    </div>
  );
}
