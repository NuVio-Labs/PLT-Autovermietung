import { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { contact } from "@/data/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return buildPageMetadata({
    locale,
    pathname: "/kontakt",
    title: `${t("title")} – PLT Autovermietung`,
    description: t("subtitle"),
  });
}

export default async function ContactPage({
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
        title={t("contactPage.title")}
        subtitle={t("contactPage.subtitle")}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          {/* Kontaktdaten */}
          <div className="space-y-6">
            <ContactRow
              icon={MapPin}
              label={t("contactPage.address")}
              value={`${contact.address.street}, ${contact.address.postalCode} ${contact.address.city}`}
            />
            <ContactRow
              icon={Phone}
              label={t("contactPage.phone")}
              value={contact.phone}
              href={contact.phoneHref}
            />
            <ContactRow
              icon={Mail}
              label={t("contactPage.email")}
              value={contact.email}
              href={`mailto:${contact.email}`}
            />

            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-(--radius-md) bg-(--color-surface-2) text-(--color-primary)">
                <Clock className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-medium text-(--color-text)">
                  {t("contactPage.hours")}
                </p>
                <ul className="mt-1 space-y-1 text-(--color-muted)">
                  {contact.openingHours.map((oh) => (
                    <li key={oh.days} className="flex gap-3">
                      <span className="w-16">{oh.days}</span>
                      <span>{oh.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Zwei-Klick-Kartenlink statt iFrame (Projekt.md §36) */}
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-(--color-primary) hover:text-(--color-primary-dark)"
            >
              {t("contactPage.showMap")}
              <ExternalLink className="size-4" />
            </a>
          </div>

          {/* Formular */}
          <Card className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold">
              {t("contactPage.form.title")}
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-(--radius-md) bg-(--color-surface-2) text-(--color-primary)">
        <Icon className="size-5" aria-hidden />
      </span>
      <div>
        <p className="text-sm font-medium text-(--color-text)">{label}</p>
        {href ? (
          <a href={href} className="text-(--color-muted) hover:text-(--color-primary)">
            {value}
          </a>
        ) : (
          <p className="text-(--color-muted)">{value}</p>
        )}
      </div>
    </div>
  );
}
