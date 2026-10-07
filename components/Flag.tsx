"use client";

import { useEffect, useRef, useState } from "react";
import { flagUrl } from "@/lib/calc";

/** Country flag from flagcdn.com, with a neat two-letter fallback if the image can't load. */
export default function Flag({ code, size = 22, className = "" }: { code: string; size?: number; className?: string }) {
  const [failed, setFailed] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  const h = Math.round(size * 0.72);

  // The image may fail before React hydrates (so onError never fires) — check once mounted.
  useEffect(() => {
    setFailed(false);
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, [code]);

  return (
    <span
      className={`relative inline-grid shrink-0 place-items-center overflow-hidden rounded-[4px] bg-paper-2 font-mono text-[9px] font-medium uppercase text-ink-2 ring-1 ring-line ${className}`}
      style={{ width: size, height: h }}
    >
      {code}
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={img}
          src={flagUrl(code, 40)}
          srcSet={`${flagUrl(code, 80)} 2x`}
          alt=""
          width={size}
          height={h}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </span>
  );
}
