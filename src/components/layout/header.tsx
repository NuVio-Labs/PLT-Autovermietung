import { getLocale, getTranslations } from "next-intl/server";
import { mainNav } from "@/data/navigation";
import { Logo } from "./logo";
import { NavLink } from "./nav-link";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";
import { HeaderShell } from "./header-shell";
import { BookingLink } from "@/components/booking-link";

export async function Header() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <HeaderShell>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between container-px">
        <Logo />

        {/* Desktop-Navigation (Projekt.md §7) */}
        <nav className="hidden md:block" aria-label="Hauptnavigation">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{t(item.labelKey)}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:flex md:items-center md:gap-4">
          <LanguageSwitcher />
          <BookingLink locale={locale} size="sm">
            {t("cta.checkAvailability")}
          </BookingLink>
        </div>

        <MobileNav locale={locale} />
      </div>
    </HeaderShell>
  );
}
