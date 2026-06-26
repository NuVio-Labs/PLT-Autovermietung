/**
 * Fahrzeugkategorien (Projekt.md §11/§12).
 *
 * Hinweis: Konkrete Fahrzeuge/Bilder/Preise liefert der Kunde (Projekt.md §41).
 * Vorerst arbeiten wir auf Kategorie-Ebene. `bookingCategory` enthält die pro
 * Sprache an NuVio Core zu übergebenden category-Parameter (Projekt.md §34).
 */

export type CategoryId =
  | "car"
  | "van"
  | "truck"
  | "trailer"
  | "longterm"
  | "business";

/** Marken-Akzent (Logo-Farben) – rotiert verspielt über die Kategorien. */
export type BrandAccent = "blue" | "pink" | "green";

export type VehicleCategory = {
  id: CategoryId;
  /** category-Parameter für NuVio Core, pro Locale (Projekt.md §34). */
  bookingCategory: Record<"de" | "nl" | "en", string>;
  /** Lucide-Icon-Name (in der UI gemappt). */
  icon: "car" | "truck" | "package" | "caravan" | "calendar-clock" | "briefcase";
  /** Marken-Akzentfarbe für diese Kategorie (Multicolor-Look). */
  accent: BrandAccent;
  /** Auf der Fahrzeug-Filterseite anzeigbar? (Langzeit/Geschäft = Info-Karten) */
  filterable: boolean;
};

export const vehicleCategories: VehicleCategory[] = [
  {
    id: "car",
    bookingCategory: { de: "pkw", nl: "auto", en: "car" },
    icon: "car",
    accent: "blue",
    filterable: true,
  },
  {
    id: "truck",
    bookingCategory: { de: "lkw", nl: "vrachtwagen", en: "truck" },
    icon: "package",
    accent: "green",
    filterable: true,
  },
  {
    id: "van",
    bookingCategory: { de: "transporter", nl: "bestelwagen", en: "van" },
    icon: "truck",
    accent: "pink",
    filterable: true,
  },
  {
    id: "trailer",
    bookingCategory: { de: "anhaenger", nl: "aanhanger", en: "trailer" },
    icon: "caravan",
    accent: "blue",
    filterable: true,
  },
  {
    id: "longterm",
    bookingCategory: { de: "langzeit", nl: "langetermijn", en: "long-term" },
    icon: "calendar-clock",
    accent: "pink",
    filterable: false,
  },
  {
    id: "business",
    bookingCategory: { de: "geschaeft", nl: "zakelijk", en: "business" },
    icon: "briefcase",
    accent: "green",
    filterable: false,
  },
];

/** Tailwind-/Token-Klassen je Marken-Akzent (für konsistenten Multicolor-Look). */
export const accentClasses: Record<
  BrandAccent,
  { bg: string; text: string; ring: string }
> = {
  blue: {
    bg: "bg-(--color-blue)",
    text: "text-(--color-blue-dark)",
    ring: "group-hover:ring-(--color-blue)",
  },
  pink: {
    bg: "bg-(--color-pink)",
    text: "text-(--color-pink-dark)",
    ring: "group-hover:ring-(--color-pink)",
  },
  green: {
    bg: "bg-(--color-green)",
    text: "text-(--color-green-dark)",
    ring: "group-hover:ring-(--color-green)",
  },
};

/** Kategorien, die im Filter der Fahrzeugseite erscheinen (Projekt.md §12). */
export const filterableCategories = vehicleCategories.filter((c) => c.filterable);
