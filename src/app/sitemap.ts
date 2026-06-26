import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";
import { site } from "@/data/contact";

const pages: AppPathname[] = [
  "/",
  "/fahrzeuge",
  "/preise",
  "/ablauf",
  "/standorte",
  "/ueber-uns",
  "/kontakt",
  "/impressum",
  "/datenschutz",
  "/agb",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] = `${site.url}${getPathname({ locale, href: page })}`;
    }
    return {
      url: `${site.url}${getPathname({ locale: routing.defaultLocale, href: page })}`,
      lastModified: new Date(),
      alternates: { languages },
    };
  });
}
