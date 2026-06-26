"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Client-Hülle für den Header: wird beim Scrollen deckend weiß
 * (oben transparent/leicht, gescrollt solide für bessere Lesbarkeit).
 */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled
          ? "border-b border-[--color-border] bg-white shadow-[--shadow-card]"
          : "border-b border-transparent bg-white/80 backdrop-blur",
      )}
    >
      {children}
    </header>
  );
}
