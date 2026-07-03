import { Metadata } from "next";
import { MapPin, Phone, CheckCircle2, CircleSlash, Info, ArrowLeft } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookingLink } from "@/components/booking-link";
import { stations, type Station } from "@/data/stations";
import { getStationAvailability } from "@/lib/availability";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "availabilityPage" });
  return buildPageMetadata({
    locale,
    pathname: "/verfuegbarkeit",
    title: `${t("title")} – PLT Autovermietung`,
    description: t("subtitle"),
  });
}

export default async function AvailabilityPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ station?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const { station: stationSlug } = await searchParams;

  const selected = stationSlug
    ? stations.find((s) => s.slug === stationSlug) ?? null
    : null;

  return (
    <>
      <PageHero
        title={t("availabilityPage.title")}
        subtitle={t("availabilityPage.subtitle")}
      />

      <Section>
        {selected ? (
          <StationView station={selected} locale={locale} />
        ) : (
          <StationPicker />
        )}
      </Section>
    </>
  );
}

/** Auswahl der Station – führt per Query-Param zur Detail-Ansicht. */
async function StationPicker() {
  const t = await getTranslations();
  return (
    <>
      <p className="mb-6 max-w-2xl text-(--color-muted)">
        {t("availabilityPage.pickHint")}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stations.map((s) => (
          <Link
            key={s.slug}
            href={{ pathname: "/verfuegbarkeit", query: { station: s.slug } }}
            className="group flex items-center justify-between gap-3 rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) p-5 transition hover:border-(--color-primary) hover:shadow-sm"
          >
            <span className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-(--radius-md) bg-(--color-surface-2) text-(--color-primary)">
                <MapPin className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block font-semibold leading-snug">{s.city}</span>
                <span className="block text-sm text-(--color-muted)">{s.name}</span>
              </span>
            </span>
            <span
              className="text-(--color-muted) transition group-hover:translate-x-0.5 group-hover:text-(--color-primary)"
              aria-hidden
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}

/** Fahrzeugliste einer Station mit Live-Status + Anruf-Fallback. */
async function StationView({
  station,
  locale,
}: {
  station: Station;
  locale: Locale;
}) {
  const t = await getTranslations();
  const { ok, vehicles } = await getStationAvailability(station.slug);
  const available = vehicles.filter((v) => v.status === "available");

  return (
    <div>
      <Link
        href="/verfuegbarkeit"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-(--color-muted) hover:text-(--color-primary)"
      >
        <ArrowLeft className="size-4" />
        {t("availabilityPage.backToStations")}
      </Link>

      <div className="mb-8 flex flex-col gap-4 rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-(--radius-md) bg-(--color-surface-2) text-(--color-primary)">
            <MapPin className="size-5" aria-hidden />
          </span>
          <div>
            <h2 className="text-xl font-bold leading-snug">{station.city}</h2>
            <p className="text-sm text-(--color-muted)">
              {station.name} · {station.postalCode} {station.city}
            </p>
          </div>
        </div>
        <a
          href={station.phoneHref}
          className="inline-flex items-center justify-center gap-2 rounded-(--radius-md) border border-(--color-border) bg-(--color-surface-2) px-4 py-2.5 text-sm font-medium text-(--color-primary) transition hover:border-(--color-primary)"
        >
          <Phone className="size-4" />
          {station.phone}
        </a>
      </div>

      {!ok || vehicles.length === 0 ? (
        <NoData station={station} />
      ) : (
        <>
          <div className="mb-4 flex items-center gap-2 text-sm text-(--color-muted)">
            <Info className="size-4 shrink-0" />
            <p>{t("availabilityPage.windowNote")}</p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {vehicles.map((v) => (
              <li key={v.id}>
                <Card className="flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{v.name}</p>
                    <p className="text-sm text-(--color-muted)">
                      {[
                        v.sitze ? t("availabilityPage.seats", { count: v.sitze }) : null,
                        v.ahk ? t("availabilityPage.towbar") : null,
                      ]
                        .filter(Boolean)
                        .join(" · ") || " "}
                    </p>
                  </div>
                  {v.status === "available" ? (
                    <Badge className="shrink-0 gap-1 bg-(--color-green) text-white">
                      <CheckCircle2 className="size-3.5" />
                      {t("availabilityPage.statusAvailable")}
                    </Badge>
                  ) : (
                    <a
                      href={station.phoneHref}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-(--color-surface-2) px-3 py-1.5 text-xs font-medium text-(--color-muted) transition hover:text-(--color-primary)"
                      title={t("availabilityPage.callToBook")}
                    >
                      <CircleSlash className="size-3.5" />
                      {t("availabilityPage.statusBooked")}
                    </a>
                  )}
                </Card>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-start gap-4 rounded-(--radius-lg) bg-(--color-surface) p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 size-5 shrink-0 text-(--color-accent-dark)" />
              <p className="text-(--color-text)">
                {available.length > 0
                  ? t("availabilityPage.ctaAvailable")
                  : t("availabilityPage.ctaAllBooked", { phone: station.phone })}
              </p>
            </div>
            {available.length > 0 && (
              <BookingLink locale={locale} size="lg" className="shrink-0">
                {t("cta.bookOnline")}
              </BookingLink>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/** Neutraler Zustand: keine Online-Verfügbarkeitsdaten – Anruf anbieten. */
async function NoData({ station }: { station: Station }) {
  const t = await getTranslations();
  return (
    <div className="flex flex-col items-start gap-4 rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <Info className="mt-0.5 size-5 shrink-0 text-(--color-accent-dark)" />
        <p className="text-(--color-text)">{t("availabilityPage.noData")}</p>
      </div>
      <a
        href={station.phoneHref}
        className="inline-flex shrink-0 items-center gap-2 rounded-(--radius-md) bg-(--color-primary) px-4 py-2.5 text-sm font-medium text-(--color-on-primary) transition hover:bg-(--color-primary-dark)"
      >
        <Phone className="size-4" />
        {t("availabilityPage.callStation", { phone: station.phone })}
      </a>
    </div>
  );
}
