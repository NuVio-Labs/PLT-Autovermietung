import { Metadata } from "next";
import { Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { CtaBanner } from "@/components/sections/cta-banner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "process" });
  return buildPageMetadata({
    locale,
    pathname: "/ablauf",
    title: `${t("title")} – PLT Autovermietung`,
    description: t("subtitle"),
  });
}

export default async function AblaufPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const steps = ["select", "period", "check", "pickup"] as const;
  const docs = ["license", "id", "payment", "deposit"] as const;

  return (
    <>
      <PageHero title={t("process.title")} subtitle={t("process.subtitle")} />

      <Section>
        <ol className="space-y-5">
          {steps.map((step, i) => (
            <li key={step}>
              <Card className="flex items-start gap-4 p-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-(--color-accent) font-bold text-(--color-on-accent)">
                  {i + 1}
                </span>
                <div>
                  <h2 className="font-semibold">
                    {t(`process.steps.${step}.title`)}
                  </h2>
                  <p className="mt-1 text-(--color-muted)">
                    {t(`process.steps.${step}.description`)}
                  </p>
                </div>
              </Card>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-(--radius-lg) bg-(--color-surface) p-8">
          <h2 className="text-xl font-semibold">
            {t("process.documents.title")}
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {docs.map((d) => (
              <li key={d} className="flex items-center gap-2.5 text-(--color-text)">
                <Check className="size-5 text-(--color-accent-dark)" aria-hidden />
                {t(`process.documents.${d}`)}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
