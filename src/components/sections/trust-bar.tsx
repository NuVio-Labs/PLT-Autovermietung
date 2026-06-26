import { MapPin, CalendarRange, Truck, UserRound, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function TrustBar() {
  const t = await getTranslations();

  const items = [
    { icon: MapPin, label: t("trust.local") },
    { icon: CalendarRange, label: t("trust.flexible") },
    { icon: Truck, label: t("trust.fleet") },
    { icon: UserRound, label: t("trust.personal") },
    { icon: ShieldCheck, label: t("trust.fair") },
  ];

  return (
    <div className="border-b border-(--color-border) bg-(--color-surface)">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 container-px py-5 text-sm font-medium text-(--color-muted)">
        {items.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2">
            <Icon className="size-4 text-(--color-accent-dark)" aria-hidden />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
