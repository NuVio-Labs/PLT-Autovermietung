import type { AppPathname } from "@/i18n/routing";

/** Translation-Key (unter "nav") für das Label. */
export type NavItem = {
  href: AppPathname;
  labelKey:
    | "nav.home"
    | "nav.vehicles"
    | "nav.availability"
    | "nav.prices"
    | "nav.process"
    | "nav.locations"
    | "nav.about"
    | "nav.contact";
};

/** Hauptnavigation (Header + mobiles Menü) – Reihenfolge laut Projekt.md §7. */
export const mainNav: NavItem[] = [
  { href: "/fahrzeuge", labelKey: "nav.vehicles" },
  { href: "/verfuegbarkeit", labelKey: "nav.availability" },
  { href: "/preise", labelKey: "nav.prices" },
  { href: "/ablauf", labelKey: "nav.process" },
  { href: "/standorte", labelKey: "nav.locations" },
  { href: "/ueber-uns", labelKey: "nav.about" },
  { href: "/kontakt", labelKey: "nav.contact" },
];
