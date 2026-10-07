"use client";

import { createElement, useEffect, useRef } from "react";

/** Fades and lifts its children into view the first time they scroll on screen. */
export default function Reveal({ children, className = "", as: Tag = "div", delay = 0, id }: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
  delay?: number;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return createElement(Tag, { ref, id, className: `reveal ${className}`, style: { transitionDelay: `${delay}ms` } }, children);
}
