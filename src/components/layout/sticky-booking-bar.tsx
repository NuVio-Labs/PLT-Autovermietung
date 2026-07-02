import { getLocale, getTranslations } from "next-intl/server";
import { BookingLink } from "@/components/booking-link";

/**
 * Mobile Sticky CTA (Projekt.md §8/§20): [Online buchen] über volle Breite.
 * Nur auf Mobilgeräten sichtbar.
 */
export async function StickyBookingBar() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-(--color-border) bg-(--color-background)/95 backdrop-blur md:hidden">
      <div
        className="flex gap-2 container-px py-3"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <BookingLink locale={locale} size="lg" className="flex-1">
          {t("cta.bookOnline")}
        </BookingLink>
      </div>
    </div>
  );
}
