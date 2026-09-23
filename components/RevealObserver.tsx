"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Fades `.reveal` elements in as they scroll into view, staggered per parent. */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const siblings = [...(el.parentElement?.children ?? [])].filter((c) => c.classList.contains("reveal"));
          el.style.setProperty("--d", `${Math.min(siblings.indexOf(el), 6) * 0.08}s`);
          el.classList.add("is-visible");
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
