import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { LegalContent } from "@/components/legal-content";
import { agb } from "@/data/legal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: "/agb",
    title: `${agb.title} – PLT Autovermietung`,
    description: "Allgemeine Geschäftsbedingungen der PLT Autovermietung.",
  });
}

export default async function AgbPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero title={agb.title} subtitle={agb.stand} />
      <Section>
        <LegalContent blocks={agb.blocks} />
      </Section>
    </>
  );
}
