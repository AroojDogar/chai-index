"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { COUNTRIES } from "@/lib/countries";
import type { Country } from "@/lib/types";
import Flag from "./Flag";

interface Props {
  value: Country;
  onChange: (c: Country) => void;
  label: string;
  compact?: boolean;
}

export default function CountryPicker({ value, onChange, label, compact }: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    const all = [...COUNTRIES].sort((a, b) => a.name.localeCompare(b.name));
    if (!s) return all;
    return all.filter(
      (c) => c.name.toLowerCase().includes(s) || c.city.toLowerCase().includes(s) || c.currency.toLowerCase().includes(s),
    );
  }, [q]);

  useEffect(() => {
    if (!open) return;
    setActive(0);
    input.current?.focus();
    const close = (e: MouseEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  function pick(c: Country) {
    onChange(c);
    setOpen(false);
    setQ("");
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(list.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter" && list[active]) {
      e.preventDefault();
      pick(list[active]);
    } else if (e.key === "Escape") setOpen(false);
  }

  return (
    <div ref={box} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open} aria-label={`${label}: ${value.name}`}
        className={`group flex items-center gap-2.5 rounded-full border border-line bg-cream/90 text-left transition hover:border-ink/40 ${compact ? "h-11 px-3.5" : "h-14 px-4"}`}>
        <Flag code={value.code} size={compact ? 22 : 28} />
        <span className="min-w-0">
          {!compact && <span className="label block !text-[9px]">{label}</span>}
          <span className="block truncate font-medium">{value.name}</span>
        </span>
        <svg viewBox="0 0 20 20" className={`ml-1 h-4 w-4 shrink-0 text-dust transition ${open ? "rotate-180" : ""}`} aria-hidden>
          <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-[min(320px,86vw)] overflow-hidden rounded-2xl border border-line bg-cream shadow-[0_24px_60px_-20px_rgba(43,26,16,0.5)]">
          <div className="border-b border-line p-2">
            <input ref={input} value={q} onChange={(e) => { setQ(e.target.value); setActive(0); }} onKeyDown={onKey}
              placeholder="Search country, city or currency…" aria-label="Search countries"
              className="h-10 w-full rounded-xl bg-paper px-3 text-sm outline-none placeholder:text-dust" />
          </div>
          <ul role="listbox" className="max-h-72 overflow-y-auto py-1">
            {list.length === 0 && <li className="px-4 py-3 text-sm text-dust">No match.</li>}
            {list.map((c, i) => (
              <li key={c.code} role="option" aria-selected={c.code === value.code}>
                <button type="button" onClick={() => pick(c)} onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center gap-3 px-3.5 py-2 text-left text-sm ${i === active ? "bg-paper-2/70" : ""}`}>
                  <Flag code={c.code} size={20} />
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="font-mono text-[11px] text-dust">{c.currency}</span>
                  {c.code === value.code && <span className="h-1.5 w-1.5 rounded-full bg-saffron" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
