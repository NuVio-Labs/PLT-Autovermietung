import { defineRouting } from "next-intl/routing";

/**
 * i18n routing config for PLT Autovermietung.
 * Locales: Deutsch (Standard), Niederländisch, Englisch.
 * Pathnames sind pro Sprache lokalisiert (siehe Projekt.md §17).
 */
export const routing = defineRouting({
  locales: ["de", "nl", "en"],
  defaultLocale: "de",
  // Sprachpräfix immer anzeigen -> saubere /de, /nl, /en URLs + hreflang
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/fahrzeuge": {
      de: "/fahrzeuge",
      nl: "/voertuigen",
      en: "/vehicles",
    },
    "/preise": {
      de: "/preise",
      nl: "/prijzen",
      en: "/prices",
    },
    "/ablauf": {
      de: "/ablauf",
      nl: "/werkwijze",
      en: "/how-it-works",
    },
    "/ueber-uns": {
      de: "/ueber-uns",
      nl: "/over-ons",
      en: "/about-us",
    },
    "/standorte": {
      de: "/standorte",
      nl: "/locaties",
      en: "/locations",
    },
    "/kontakt": {
      de: "/kontakt",
      nl: "/contact",
      en: "/contact",
    },
    "/impressum": {
      de: "/impressum",
      nl: "/colofon",
      en: "/imprint",
    },
    "/datenschutz": {
      de: "/datenschutz",
      nl: "/privacy",
      en: "/privacy",
    },
    "/agb": {
      de: "/agb",
      nl: "/voorwaarden",
      en: "/terms",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
