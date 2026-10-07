import type { Country, ItemKey, Measure, Rates } from "./types";

/** Convert an amount from one currency to another using USD-based rates. */
export function convert(amount: number, from: string, to: string, r: Rates): number {
  const f = r.rates[from];
  const t = r.rates[to];
  if (!f || !t) return NaN;
  return (amount / f) * t;
}

export function toUSD(amount: number, from: string, r: Rates) {
  return convert(amount, from, "USD", r);
}

/** Minutes of minimum-wage work needed to pay for something. */
export function minutesOfWork(c: Country, item: ItemKey): number | null {
  if (!c.wage) return null;
  return (c.prices[item] / c.wage) * 60;
}

/** The value a country is ranked by, for the current measure. Lower = cheaper / more affordable. */
export function valueFor(c: Country, item: ItemKey, measure: Measure, home: Country, r: Rates): number | null {
  if (measure === "work") return minutesOfWork(c, item);
  if (measure === "usd") return toUSD(c.prices[item], c.currency, r);
  return convert(c.prices[item], c.currency, home.currency, r);
}

/** Sum of the everyday basket, in local currency. */
export function basket(c: Country): number {
  return Object.values(c.prices).reduce((a, b) => a + b, 0);
}

/**
 * Salary needed in `target` to afford the same everyday basket that `salary` buys in `home`.
 * Uses the ratio of basket costs in each country's own currency.
 */
export function equivalentSalary(salary: number, home: Country, target: Country): number {
  return (salary * basket(target)) / basket(home);
}

/** How many more (or fewer) baskets your salary would buy, relative to staying home, if converted at market rates. */
export function purchasingPower(salary: number, home: Country, target: Country, r: Rates): number {
  const converted = convert(salary, home.currency, target.currency, r);
  return converted / equivalentSalary(salary, home, target);
}

// ---------- formatting ----------

export function fmtNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  const opts: Intl.NumberFormatOptions =
    abs >= 100
      ? { maximumFractionDigits: 0 }
      : abs >= 10
        ? { minimumFractionDigits: 0, maximumFractionDigits: 1 }
        : { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  return n.toLocaleString("en-US", opts);
}

/** "Rs 90", "€3.50", "AED 7.00" — letter-only symbols get a space. */
export function fmtMoney(n: number, symbol: string): string {
  if (!Number.isFinite(n)) return "—";
  const sep = /^[A-Za-z]+$/.test(symbol) ? " " : "";
  return `${symbol}${sep}${fmtNumber(n)}`;
}

export function fmtMinutes(min: number | null): string {
  if (min == null) return "—";
  if (min < 1) return `${Math.round(min * 60)} sec`;
  if (min < 60) return `${min < 10 ? min.toFixed(1) : Math.round(min)} min`;
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return m ? `${h} h ${m} min` : `${h} h`;
}

export function fmtRatio(x: number): string {
  if (!Number.isFinite(x)) return "—";
  if (x >= 0.95 && x <= 1.05) return "same";
  if (x > 1) return `${x < 10 ? x.toFixed(1) : Math.round(x)}× more`;
  const inv = 1 / x;
  return `${inv < 10 ? inv.toFixed(1) : Math.round(inv)}× less`;
}

export const flagUrl = (code: string, w: 40 | 80 | 160 = 40) => `https://flagcdn.com/w${w}/${code}.png`;
