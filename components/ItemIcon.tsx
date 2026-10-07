import type { ItemKey } from "@/lib/types";

const PATHS: Record<ItemKey, React.ReactNode> = {
  chai: (
    <>
      <path d="M5 9h12l-1.6 9.2a2 2 0 0 1-2 1.8H8.6a2 2 0 0 1-2-1.8Z" />
      <path d="M9 5.5c-.8-1 .8-1.8 0-3M13 5.5c-.8-1 .8-1.8 0-3" />
    </>
  ),
  coffee: (
    <>
      <path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z" />
      <path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16M3 21h15" />
    </>
  ),
  meal: (
    <>
      <path d="M3 12h18a9 9 0 0 1-18 0Z" />
      <path d="M8 8.5c1-1.4 2.6-2 4-2s3 .6 4 2" />
    </>
  ),
  bread: (
    <>
      <path d="M5 11a4 4 0 0 1 2-7h10a4 4 0 0 1 2 7v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1Z" />
      <path d="M9 9l1.5 2M13 9l1.5 2" />
    </>
  ),
  transit: (
    <>
      <rect x="4" y="3" width="16" height="15" rx="3" />
      <path d="M4 11h16M8 18v2.5M16 18v2.5" />
      <circle cx="8" cy="14.5" r=".6" fill="currentColor" />
      <circle cx="16" cy="14.5" r=".6" fill="currentColor" />
    </>
  ),
  cinema: (
    <>
      <path d="M3 7a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a3 3 0 0 0 0 6v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a3 3 0 0 0 0-6Z" />
      <path d="M10 8v8" strokeDasharray="1.5 2" />
    </>
  ),
};

export default function ItemIcon({ item, className = "h-5 w-5" }: { item: ItemKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {PATHS[item]}
    </svg>
  );
}
