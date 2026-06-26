import { MapPin, CalendarRange, Truck, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Section, SectionHeading } from "@/components/ui/section";

export async function WhyPlt() {
  const t = await getTranslations();

  const items = [
    { key: "local", icon: MapPin, bg: "bg-(--color-blue)" },
    { key: "flexible", icon: CalendarRange, bg: "bg-(--color-pink)" },
    { key: "fleet", icon: Truck, bg: "bg-(--color-green)" },
    { key: "fair", icon: ShieldCheck, bg: "bg-(--color-primary)" },
  ] as const;

  return (
    <Section className="bg-(--color-surface)">
      <SectionHeading title={t("why.title")} subtitle={t("why.subtitle")} />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ key, icon: Icon, bg }) => (
          <div key={key} className="text-center sm:text-left">
            <div
              className={`mx-auto grid h-12 w-12 place-items-center rounded-(--radius-md) text-white sm:mx-0 ${bg}`}
            >
              <Icon className="size-6" aria-hidden />
            </div>
            <h3 className="mt-4 font-semibold">
              {t(`why.items.${key}.title`)}
            </h3>
            <p className="mt-2 text-sm text-(--color-muted)">
              {t(`why.items.${key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
