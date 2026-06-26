"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { BrandAccent } from "@/data/vehicles";
import { cn } from "@/lib/utils";

export type VehicleCardData = {
  id: string;
  name: string;
  description: string;
  bookingUrl: string;
  accent: BrandAccent;
  image: string;
  imageAlt: string;
};

type Props = {
  allLabel: string;
  ctaLabel: string;
  facts: string[];
  categories: VehicleCardData[];
};

const accentBg: Record<BrandAccent, string> = {
  blue: "bg-(--color-blue)",
  pink: "bg-(--color-pink)",
  green: "bg-(--color-green)",
};

/**
 * Fahrzeug-Filter (Projekt.md §12). Da konkrete Fahrzeuge noch vom Kunden
 * kommen, filtern wir auf Kategorie-Ebene. "Alle" zeigt alles.
 */
export function VehicleFilter({ allLabel, ctaLabel, facts, categories }: Props) {
  const [active, setActive] = useState<string>("all");

  const visible =
    active === "all" ? categories : categories.filter((c) => c.id === active);

  return (
    <div>
      {/* Filter-Chips */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Kategorie">
        <FilterChip
          label={allLabel}
          active={active === "all"}
          onClick={() => setActive("all")}
        />
        {categories.map((c) => (
          <FilterChip
            key={c.id}
            label={c.name}
            active={active === c.id}
            onClick={() => setActive(c.id)}
          />
        ))}
      </div>

      {/* Karten */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((c) => (
          <Card
            key={c.id}
            className="group flex flex-col overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-floating)"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={c.image}
                alt={c.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                className={cn(
                  "absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white shadow",
                  accentBg[c.accent],
                )}
              >
                {c.name}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-semibold">{c.name}</h3>
              <p className="mt-2 text-sm text-(--color-muted)">{c.description}</p>
              <ul className="mt-4 flex flex-1 flex-col gap-2 text-sm text-(--color-text)">
                {facts.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check
                      className="size-4 text-(--color-accent-dark)"
                      aria-hidden
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild variant="primary" className="mt-6 w-full">
                <a href={c.bookingUrl} rel="noopener">
                  {ctaLabel}
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-(--color-primary) text-(--color-on-primary)"
          : "bg-(--color-surface-2) text-(--color-muted) hover:bg-(--color-border)",
      )}
    >
      {label}
    </button>
  );
}
