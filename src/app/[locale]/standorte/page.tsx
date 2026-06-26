import { Metadata } from "next";
import { MapPin, Phone, ExternalLink, Info } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Badge } from "@/components/ui/badge";
import { stations, stationMapsUrl } from "@/data/stations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "stationsPage" });
  return buildPageMetadata({
    locale,
    pathname: "/standorte",
    title: `${t("title")} – PLT Autovermietung`,
    description: t("subtitle"),
  });
}

export default async function StationsPage({
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
        title={t("stationsPage.title")}
        subtitle={t("stationsPage.subtitle")}
      />

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stations.map((s) => (
            <Card key={s.name} className="flex flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-(--radius-md) bg-(--color-surface-2) text-(--color-primary)">
                    <MapPin className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h2 className="font-semibold leading-snug">{s.name}</h2>
                    <p className="mt-1 text-sm text-(--color-muted)">
                      {s.street}
                      <br />
                      {s.postalCode} {s.city}
                    </p>
                  </div>
                </div>
                {s.primary && (
                  <Badge className="bg-(--color-green) text-white">
                    {t("stationsPage.primaryBadge")}
                  </Badge>
                )}
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <a
                  href={s.phoneHref}
                  className="inline-flex items-center gap-2 text-sm font-medium text-(--color-primary) hover:text-(--color-primary-dark)"
                >
                  <Phone className="size-4" />
                  {s.phone}
                </a>
                <a
                  href={stationMapsUrl(s)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-(--color-muted) hover:text-(--color-primary)"
                >
                  <ExternalLink className="size-4" />
                  {t("stationsPage.showOnMap")}
                </a>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex items-start gap-3 rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) p-5">
          <Info className="mt-0.5 size-5 shrink-0 text-(--color-accent-dark)" />
          <p className="text-(--color-text)">{t("stationsPage.note")}</p>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
