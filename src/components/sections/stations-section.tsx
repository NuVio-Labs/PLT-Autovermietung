import { MapPin, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { stations } from "@/data/stations";

/**
 * Standorte-Teaser auf der Startseite: zeigt alle Stations-Orte als Chips
 * und verlinkt auf die Standorte-Seite.
 */
export async function StationsSection() {
  const t = await getTranslations();
  const accents = ["blue", "pink", "green"] as const;
  const accentBg = {
    blue: "bg-[--color-blue]",
    pink: "bg-[--color-pink]",
    green: "bg-[--color-green]",
  };

  return (
    <Section className="bg-[--color-surface]">
      <SectionHeading
        title={t("stations.title")}
        subtitle={t("stations.subtitle")}
      />

      <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
        {stations.map((s, i) => (
          <li key={s.name}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[--color-border] bg-[--color-background] px-4 py-2 text-sm font-medium shadow-[--shadow-card]">
              <span
                className={`grid size-5 place-items-center rounded-full text-white ${accentBg[accents[i % 3]]}`}
              >
                <MapPin className="size-3" aria-hidden />
              </span>
              {s.city}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/standorte">
            {t("stations.viewAll")}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
