/**
 * Zentrale Geschäfts- & Kontaktdaten (Single Source of Truth).
 *
 * Adresse, Name, Vertretung, Telefon und E-Mail sind 1:1 dem bestehenden
 * Impressum (plt-autovermietung.de) entnommen und damit verifiziert.
 * Nur die Öffnungszeiten sind noch vom Kunden zu bestätigen.
 */

export const site = {
  name: "PLT Autovermietung",
  url: "https://www.plt-autovermietung.de",
  legalName: "PLT Autovermietung GbR – Heike & Peter Ververgaert",
  representedBy: "Peter Ververgaert",
} as const;

export const contact = {
  phone: "02837-962551",
  phoneHref: "tel:+492837962551",
  email: "info@plt-autovermietung.de",
  address: {
    street: "An der Horst 37",
    postalCode: "47652",
    city: "Weeze",
    country: "Deutschland",
    countryCode: "DE",
  },
  // Maps-Link (Zwei-Klick / kein iFrame ohne Einwilligung – Projekt.md §36)
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=PLT+Autovermietung+An+der+Horst+37+47652+Weeze",
  // Öffnungszeiten – TODO: vom Kunden bestätigen (im Impressum nicht hinterlegt)
  openingHours: [
    { days: "Mo–Fr", time: "08:00 – 18:00" },
    { days: "Sa", time: "09:00 – 13:00" },
    { days: "So", time: "Geschlossen" },
  ],
} as const;

/**
 * NuVio Core Buchungssystem (separates Projekt, nur per CTA verlinkt –
 * Projekt.md §34). Öffentliche, loginfreie Buchungsstrecke pro Firma:
 * /buchen/<companySlug>. PLT-Slug = "plt-autovermietung".
 *
 * Locale + optionale Kategorie werden als Query-Parameter mitgegeben. Die
 * Buchungsseite wertet sie aktuell noch nicht aus (Flow läuft über den
 * Pfad-Slug); sie schaden aber nicht und sind für eine spätere Mehrsprachigkeit
 * bzw. Kategorie-Vorauswahl vorbereitet.
 */
const NUVIO_CORE_BASE = "https://core.nuviolabs.de/buchen/plt-autovermietung";

export function bookingUrl(locale: string, category?: string): string {
  const params = new URLSearchParams({ locale });
  if (category) params.set("category", category);
  return `${NUVIO_CORE_BASE}?${params.toString()}`;
}
