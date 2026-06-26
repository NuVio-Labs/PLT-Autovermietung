import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { LegalContent } from "@/components/legal-content";
import type { LegalBlock } from "@/data/legal";
import { contact, site } from "@/data/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    pathname: "/datenschutz",
    title: "Datenschutzerklärung – PLT Autovermietung",
    description: "Datenschutzerklärung der PLT Autovermietung.",
  });
}

/**
 * Datenschutzerklärung für die NEUE Website. Spiegelt wider, was die Seite
 * tatsächlich verarbeitet (Kontaktformular via Resend, kein Tracking,
 * Karten als Zwei-Klick-Link – Projekt.md §36).
 *
 * ⚠️ HINWEIS: Entwurf – vor Livegang vom Kunden / Rechtsberatung prüfen lassen.
 */
const blocks: LegalBlock[] = [
  {
    heading: "1. Verantwortlicher",
    paragraphs: [
      `${site.legalName}\n${contact.address.street}\n${contact.address.postalCode} ${contact.address.city}\nTelefon: ${contact.phone}\nE-Mail: ${contact.email}`,
    ],
  },
  {
    heading: "2. Erhebung und Verarbeitung personenbezogener Daten",
    paragraphs: [
      "Sie können unsere Website grundsätzlich besuchen, ohne personenbezogene Daten anzugeben. Personenbezogene Daten werden nur erhoben, wenn Sie uns diese im Rahmen einer Anfrage über das Kontaktformular freiwillig mitteilen.",
    ],
  },
  {
    heading: "3. Kontaktformular",
    paragraphs: [
      "Wenn Sie uns über das Kontaktformular eine Anfrage senden, verarbeiten wir die von Ihnen angegebenen Daten (Name, Telefonnummer, E-Mail-Adresse sowie die Angaben zu Fahrzeug, Mietzeitraum und Nachricht) ausschließlich zum Zweck der Bearbeitung Ihrer Anfrage und für den Fall von Anschlussfragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b und f DSGVO.",
      "Der Versand Ihrer Anfrage erfolgt über den Dienstleister Resend (Resend, Inc.), der die E-Mail-Zustellung in unserem Auftrag als Auftragsverarbeiter abwickelt. Ihre Daten werden nicht zu Werbezwecken verwendet und nicht an unberechtigte Dritte weitergegeben.",
    ],
  },
  {
    heading: "4. Server-Logfiles / Hosting",
    paragraphs: [
      "Beim Aufruf der Website werden durch den Hosting-Anbieter automatisch technische Zugriffsdaten (z. B. IP-Adresse, Datum und Uhrzeit, abgerufene Seite, Browsertyp) verarbeitet, soweit dies zur Bereitstellung und Sicherheit der Website erforderlich ist. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.",
    ],
  },
  {
    heading: "5. Karten / Standort",
    paragraphs: [
      "Auf der Kontaktseite ist keine Karte direkt eingebunden. Stattdessen verlinken wir auf einen externen Kartendienst. Erst durch Anklicken des Links werden Daten an den Kartenanbieter übertragen. Bis dahin findet keine Datenübertragung statt.",
    ],
  },
  {
    heading: "6. Kein Tracking, keine Marketing-Cookies",
    paragraphs: [
      "Diese Website setzt keine Tracking- oder Marketing-Cookies ein und bindet keine externen Analyse-Dienste ein.",
    ],
  },
  {
    heading: "7. Ihre Rechte",
    paragraphs: [
      "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten. Zudem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Zur Ausübung Ihrer Rechte genügt eine formlose Mitteilung an die oben genannten Kontaktdaten.",
    ],
  },
  {
    heading: "8. Speicherdauer",
    paragraphs: [
      "Wir speichern personenbezogene Daten nur so lange, wie dies zur Bearbeitung Ihrer Anfrage erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.",
    ],
  },
];

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero title="Datenschutzerklärung" />
      <Section>
        <LegalContent blocks={blocks} />
      </Section>
    </>
  );
}
