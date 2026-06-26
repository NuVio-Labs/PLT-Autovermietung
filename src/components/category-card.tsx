import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/card";
import { CategoryIcon } from "@/components/category-icon";
import { BookingLink } from "@/components/booking-link";
import { accentClasses, type VehicleCategory } from "@/data/vehicles";
import { categoryImages, unsplash } from "@/data/images";
import { cn } from "@/lib/utils";

/**
 * Karte für eine Fahrzeugkategorie (Projekt.md §11) – mit Foto, Marken-Akzent
 * und CTA zum Buchungssystem (mit Kategorie-Parameter).
 */
export async function CategoryCard({
  category,
}: {
  category: VehicleCategory;
}) {
  const t = await getTranslations();
  const locale = (await getLocale()) as "de" | "nl" | "en";
  const accent = accentClasses[category.accent];
  const img = categoryImages[category.id];

  return (
    <Card className="group flex flex-col overflow-hidden p-0 ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-[--shadow-floating]">
      <div className="relative aspect-[16/10] overflow-hidden">
        {img && (
          <Image
            src={unsplash(img.id, { w: 640, h: 400, q: 65 })}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {/* Marken-Akzent: farbiges Icon-Badge */}
        <div
          className={cn(
            "absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-[--radius-md] text-white shadow-md",
            accent.bg,
          )}
        >
          <CategoryIcon name={category.icon} className="size-5" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold">
          {t(`categories.${category.id}.name`)}
        </h3>
        <p className="mt-2 flex-1 text-sm text-[--color-muted]">
          {t(`categories.${category.id}.description`)}
        </p>
        <div className="mt-5">
          <BookingLink
            locale={locale}
            category={category.bookingCategory[locale]}
            variant="ghost"
            size="sm"
            className={cn(
              "px-0 hover:bg-transparent",
              accent.text,
            )}
          >
            {t("cta.checkAvailability")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </BookingLink>
        </div>
      </div>
    </Card>
  );
}
