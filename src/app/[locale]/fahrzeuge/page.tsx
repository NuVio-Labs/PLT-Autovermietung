import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { VehicleFilter } from "@/components/vehicle-filter";
import { filterableCategories } from "@/data/vehicles";
import { bookingUrl } from "@/data/contact";
import { categoryImages, unsplash } from "@/data/images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "vehiclesPage" });
  return buildPageMetadata({
    locale,
    pathname: "/fahrzeuge",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function VehiclesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const categories = filterableCategories.map((c) => ({
    id: c.id,
    name: t(`categories.${c.id}.name`),
    description: t(`categories.${c.id}.description`),
    bookingUrl: bookingUrl(locale, c.bookingCategory[locale]),
    accent: c.accent,
    image: unsplash(categoryImages[c.id].id, { w: 640, h: 400, q: 65 }),
    imageAlt: categoryImages[c.id].alt,
  }));

  const facts = [
    t("vehiclesPage.facts.flexibleDuration"),
    t("vehiclesPage.facts.privateBusiness"),
    t("vehiclesPage.facts.onRequest"),
  ];

  return (
    <>
      <PageHero
        title={t("vehiclesPage.title")}
        subtitle={t("vehiclesPage.subtitle")}
      />
      <Section>
        <VehicleFilter
          allLabel={t("categories.all")}
          ctaLabel={t("cta.checkAvailability")}
          facts={facts}
          categories={categories}
        />
      </Section>
      <CtaBanner />
    </>
  );
}
