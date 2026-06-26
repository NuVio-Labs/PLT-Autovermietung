import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname, type Locale } from "@/i18n/routing";
import { site, contact } from "@/data/contact";
import { stationCities } from "@/data/stations";

/**
 * Baut die hreflang-/canonical-Alternates für eine logische Route über alle
 * Sprachen (Projekt.md §32). next-intl liefert pro Locale den lokalisierten Pfad.
 */
export function buildAlternates(pathname: AppPathname) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    const localizedPath = getPathname({ locale, href: pathname });
    languages[locale] = `${site.url}${localizedPath}`;
  }
  // x-default zeigt auf die Standardsprache.
  languages["x-default"] = `${site.url}${getPathname({
    locale: routing.defaultLocale,
    href: pathname,
  })}`;

  return {
    canonical: languages[routing.defaultLocale],
    languages,
  };
}

type PageMetaArgs = {
  locale: Locale;
  pathname: AppPathname;
  title: string;
  description: string;
};

/** Erzeugt vollständige Next-Metadata inkl. OpenGraph + hreflang. */
export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
}: PageMetaArgs): Metadata {
  const alternates = buildAlternates(pathname);
  const url = alternates.languages[locale];

  return {
    title,
    description,
    alternates,
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.name,
      locale,
    },
  };
}

/** LocalBusiness / AutoRental JSON-LD (Projekt.md §33). */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["AutoRental", "LocalBusiness"],
    name: site.name,
    url: site.url,
    telephone: contact.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      postalCode: contact.address.postalCode,
      addressLocality: contact.address.city,
      addressCountry: contact.address.countryCode,
    },
    // Bediente Orte (Vermietstationen im Kreis Kleve / Niederrhein)
    areaServed: stationCities.map((city) => ({ "@type": "City", name: city })),
    openingHoursSpecification: contact.openingHours.map((oh) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: oh.days,
      // Zeiten als Hinweis; final mit Kundendaten strukturieren.
      description: oh.time,
    })),
  };
}
