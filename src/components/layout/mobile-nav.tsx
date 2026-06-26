"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { mainNav } from "@/data/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { BookingLink } from "@/components/booking-link";
import { CallButton } from "@/components/call-button";

export function MobileNav({ locale }: { locale: string }) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Scroll sperren, wenn Menü offen.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("nav.menu")}
        aria-expanded={open}
        className="grid h-11 w-11 place-items-center rounded-[--radius-md] text-[--color-text] hover:bg-[--color-surface]"
      >
        <Menu className="size-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-[--color-background]">
          <div className="flex h-16 items-center justify-between container-px border-b border-[--color-border]">
            <span className="text-lg font-bold">{t("meta.siteName")}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("nav.close")}
              className="grid h-11 w-11 place-items-center rounded-[--radius-md] hover:bg-[--color-surface]"
            >
              <X className="size-6" />
            </button>
          </div>

          <nav className="container-px py-6">
            <ul className="flex flex-col gap-1">
              <li>
                <Link
                  href="/"
                  onClick={close}
                  className="block rounded-[--radius-md] px-3 py-3 text-lg font-medium hover:bg-[--color-surface]"
                >
                  {t("nav.home")}
                </Link>
              </li>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="block rounded-[--radius-md] px-3 py-3 text-lg font-medium hover:bg-[--color-surface]"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between rounded-[--radius-md] bg-[--color-surface] px-3 py-3">
              <span className="text-sm font-medium text-[--color-muted]">
                {t("nav.language")}
              </span>
              <LanguageSwitcher />
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <BookingLink locale={locale} size="lg" className="w-full">
                {t("cta.checkAvailability")}
              </BookingLink>
              <CallButton variant="outline" size="lg" className="w-full" />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
