import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { LegalContent } from "@/components/legal-content";
import { impressum } from "@/data/legal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: "/impressum",
    title: `${impressum.title} – PLT Autovermietung`,
    description: "Impressum der PLT Autovermietung GbR, Weeze.",
  });
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero title={impressum.title} />
      <Section>
        <LegalContent blocks={impressum.blocks} />
      </Section>
    </>
  );
}
