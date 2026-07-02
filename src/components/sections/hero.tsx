import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { heroImage, unsplash } from "@/data/images";
import { BookingLink } from "@/components/booking-link";

export async function Hero() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <section className="relative isolate overflow-hidden bg-(--color-primary) text-white">
      {/* Hero-Bild (priorisiert geladen – Projekt.md §27) */}
      <Image
        src={unsplash(heroImage.id, { w: 1920, h: 1080, q: 68 })}
        alt={heroImage.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Marken-Overlay (Blau -> transparent) für Lesbarkeit */}
      <div
        aria-hidden
        className="absolute inset-0 -z-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(36,94,146,0.94) 0%, rgba(36,94,146,0.78) 42%, rgba(23,22,27,0.45) 100%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-center container-px py-28 sm:py-36">
        <div className="max-w-3xl animate-fade-up">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight drop-shadow-sm sm:text-5xl lg:text-6xl">
            {t("hero.title")}
            <span className="mt-2 block text-2xl font-semibold text-white/85 sm:text-3xl">
              {t("hero.tagline")}
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/90 sm:text-xl">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BookingLink locale={locale} size="lg">
              {t("cta.checkAvailability")}
            </BookingLink>
            <BookingLink
              locale={locale}
              variant="outline"
              size="lg"
              className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              {t("cta.bookOnline")}
            </BookingLink>
          </div>
        </div>
      </div>
    </section>
  );
}
