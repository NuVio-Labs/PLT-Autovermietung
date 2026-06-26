"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const localeMeta: Record<Locale, { label: string; flag: string; full: string }> = {
  de: { label: "DE", flag: "🇩🇪", full: "Deutsch" },
  nl: { label: "NL", flag: "🇳🇱", full: "Nederlands" },
  en: { label: "EN", flag: "🇬🇧", full: "English" },
};

/**
 * Sprachumschalter als Dropdown mit Flaggen (Projekt.md §17).
 * Hält den Nutzer auf derselben Inhaltsseite und wechselt nur das Locale.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Klick außerhalb / Esc schließt das Dropdown.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function switchTo(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  const current = localeMeta[locale];

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Sprache wählen"
        className="inline-flex items-center gap-1.5 rounded-(--radius-md) border border-(--color-border) bg-white px-2.5 py-1.5 text-sm font-semibold text-(--color-text) transition-colors hover:bg-(--color-surface)"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span>{current.label}</span>
        <ChevronDown
          className={cn(
            "size-4 text-(--color-muted) transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-(--radius-md) border border-(--color-border) bg-white py-1 shadow-(--shadow-floating)"
        >
          {routing.locales.map((loc) => {
            const meta = localeMeta[loc];
            const active = loc === locale;
            return (
              <li key={loc} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => switchTo(loc)}
                  className={cn(
                    "flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-(--color-surface)",
                    active && "font-semibold",
                  )}
                >
                  <span className="text-base leading-none">{meta.flag}</span>
                  <span className="flex-1">{meta.full}</span>
                  {active && (
                    <Check className="size-4 text-(--color-primary)" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
