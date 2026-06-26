import { Metadata } from "next";
import { Info } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { vehicleCategories, accentClasses } from "@/data/vehicles";
import { CategoryIcon } from "@/components/category-icon";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricesPage" });
  return buildPageMetadata({
    locale,
    pathname: "/preise",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function PricesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("pricesPage.title")}
        subtitle={t("pricesPage.subtitle")}
      />

      <Section>
        <p className="max-w-2xl text-lg text-[--color-muted]">
          {t("pricesPage.intro")}
        </p>

        {/* Tarifbereiche – Preise auf Anfrage (Projekt.md §13) */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vehicleCategories.map((c) => (
            <Card
              key={c.id}
              className="flex items-center gap-4 p-5"
            >
              <div
                className={cn(
                  "grid h-11 w-11 shrink-0 place-items-center rounded-[--radius-md] text-white",
                  accentClasses[c.accent].bg,
                )}
              >
                <CategoryIcon name={c.icon} className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold">
                  {t(`categories.${c.id}.name`)}
                </h3>
                <p className="text-sm text-[--color-muted]">
                  {t("pricesPage.from")} — {t("pricesPage.notes.title")}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Variabler-Preis-Hinweis */}
        <div className="mt-10 flex items-start gap-3 rounded-[--radius-lg] border border-[--color-border] bg-[--color-surface] p-5">
          <Info className="mt-0.5 size-5 shrink-0 text-[--color-accent-dark]" />
          <p className="text-[--color-text]">{t("pricesPage.variableNote")}</p>
        </div>

        {/* Hinweise zu Kaution / Versicherung / Kilometer */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold">
            {t("pricesPage.notes.title")}
          </h2>
          <ul className="mt-4 grid gap-3 text-[--color-muted] sm:grid-cols-3">
            <li className="rounded-[--radius-md] bg-[--color-surface] p-4">
              {t("pricesPage.notes.deposit")}
            </li>
            <li className="rounded-[--radius-md] bg-[--color-surface] p-4">
              {t("pricesPage.notes.insurance")}
            </li>
            <li className="rounded-[--radius-md] bg-[--color-surface] p-4">
              {t("pricesPage.notes.mileage")}
            </li>
          </ul>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
