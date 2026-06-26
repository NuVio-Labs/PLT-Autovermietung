import { Metadata } from "next";
import { MapPin, CalendarRange, Truck, UserRound } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { CtaBanner } from "@/components/sections/cta-banner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  return buildPageMetadata({
    locale,
    pathname: "/ueber-uns",
    title: `${t("title")} – PLT Autovermietung`,
    description: t("subtitle"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const highlights = [
    { icon: MapPin, key: "local" },
    { icon: CalendarRange, key: "flexible" },
    { icon: Truck, key: "fleet" },
    { icon: UserRound, key: "fair" },
  ] as const;

  return (
    <>
      <PageHero title={t("aboutPage.title")} subtitle={t("aboutPage.subtitle")} />

      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-xl font-medium text-[--color-text]">
            {t("aboutPage.intro")}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[--color-muted]">
            {t("aboutPage.body")}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, key }) => (
            <div key={key} className="rounded-[--radius-lg] bg-[--color-surface] p-6">
              <Icon className="size-6 text-[--color-primary]" aria-hidden />
              <h2 className="mt-3 font-semibold">
                {t(`why.items.${key}.title`)}
              </h2>
              <p className="mt-1 text-sm text-[--color-muted]">
                {t(`why.items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
