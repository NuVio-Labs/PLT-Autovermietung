import { getLocale, getTranslations } from "next-intl/server";
import { BookingLink } from "@/components/booking-link";
import { AvailabilityLink } from "@/components/availability-link";

export async function CtaBanner() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <section className="bg-(--color-primary) text-(--color-on-primary)">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 container-px py-16 text-center">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">
            {t("ctaBanner.title")}
          </h2>
          <p className="mt-3 text-lg text-white/80">{t("ctaBanner.subtitle")}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <BookingLink locale={locale} size="lg">
            {t("cta.bookOnline")}
          </BookingLink>
          <AvailabilityLink
            size="lg"
            className="border-white/30 bg-white/10 text-white hover:bg-white/20"
          >
            {t("cta.checkAvailability")}
          </AvailabilityLink>
        </div>
      </div>
    </section>
  );
}
