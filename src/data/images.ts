/**
 * DEMO-Platzhalterbilder (Unsplash).
 *
 * ⚠️ Vor Livegang durch echte PLT-Fahrzeugbilder ersetzen (Projekt.md §28/§41).
 * Die IDs wurden inhaltlich geprüft und passen zur jeweiligen Kategorie.
 * Quelle: Unsplash (kostenlos, kommerziell nutzbar, keine Attribution nötig).
 */

const UNSPLASH = "https://images.unsplash.com/";

/** Baut eine optimierte Unsplash-URL (Crop + Qualität + Breite). */
export function unsplash(
  id: string,
  opts: { w?: number; h?: number; q?: number } = {},
): string {
  const { w = 1200, h, q = 70 } = opts;
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(w),
    q: String(q),
  });
  if (h) params.set("h", String(h));
  return `${UNSPLASH}${id}?${params.toString()}`;
}

/** Hero-Bild der Startseite (Fahrer-Perspektive, warm/einladend). */
export const heroImage = {
  id: "photo-1449965408869-eaa3f722e40d",
  alt: "Fahrer am Steuer eines Fahrzeugs bei Sonnenuntergang",
};

/** Bild pro Fahrzeugkategorie. */
export const categoryImages: Record<
  string,
  { id: string; alt: string }
> = {
  car: {
    id: "photo-1502877338535-766e1452684a",
    alt: "Blauer PKW in der Seitenansicht vor einem Gebäude",
  },
  van: {
    id: "photo-1641199788912-9a7385a35c82",
    alt: "Weißer Transporter (Kastenwagen) in der Seitenansicht auf einer Straße",
  },
  truck: {
    id: "photo-1601584115197-04ecc0da31d7",
    alt: "Weißer LKW auf einer Landstraße",
  },
  trailer: {
    id: "photo-1499147463149-adc471bbc639",
    alt: "Weißer geschlossener Anhänger in der Seitenansicht",
  },
  longterm: {
    id: "photo-1570733577524-3a047079e80d",
    alt: "PKW geparkt an einer europäischen Straße",
  },
  business: {
    id: "photo-1597007030739-6d2e7172ee5b",
    alt: "Gepflegter PKW in einem Showroom",
  },
};
