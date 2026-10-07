"use client";

const DIGITS = "0123456789";

/**
 * Rolling-number display: every digit is a column of 0–9 that slides to its value,
 * like a mechanical meter. Non-digits (symbols, commas, dots) render as-is.
 */
export default function Odometer({ value, className = "" }: { value: string; className?: string }) {
  const chars = value.split("");
  return (
    <span className={`num inline-flex items-end overflow-hidden leading-none ${className}`} aria-label={value} role="text">
      {chars.map((ch, i) => {
        const key = `${chars.length - i}`; // keyed from the right so units stay in place
        if (!DIGITS.includes(ch)) {
          return (
            <span key={key + ch} aria-hidden className="inline-block h-[1em] leading-none">
              {ch === " " ? " " : ch}
            </span>
          );
        }
        const d = Number(ch);
        return (
          <span key={key} aria-hidden className="relative inline-block h-[1em] overflow-hidden" style={{ width: "1ch" }}>
            <span className="odo-col absolute left-0 top-0 flex flex-col" style={{ transform: `translateY(${-d}em)` }}>
              {DIGITS.split("").map((n) => (
                <span key={n} className="block h-[1em] text-center leading-none">
                  {n}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
