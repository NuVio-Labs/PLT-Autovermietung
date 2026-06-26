import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { mainNav } from "@/data/navigation";
import { contact, site } from "@/data/contact";

export async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[--color-border] bg-[--color-surface]">
      <div className="mx-auto grid max-w-6xl gap-10 container-px py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Marke */}
        <div className="sm:col-span-2 lg:col-span-1">
          <span className="text-lg font-bold tracking-tight">
            {t("meta.siteName")}
          </span>
          <p className="mt-3 max-w-xs text-sm text-[--color-muted]">
            {t("footer.tagline")}
          </p>
        </div>

        {/* Navigation */}
        <nav aria-label="Footer-Navigation">
          <h2 className="text-sm font-semibold">{t("footer.navigation")}</h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-[--color-muted]">
            <li>
              <Link href="/" className="hover:text-[--color-primary]">
                {t("nav.home")}
              </Link>
            </li>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[--color-primary]">
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Kontakt */}
        <div>
          <h2 className="text-sm font-semibold">{t("footer.contact")}</h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-[--color-muted]">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>
                {contact.address.street}
                <br />
                {contact.address.postalCode} {contact.address.city}
              </span>
            </li>
            <li>
              <a
                href={contact.phoneHref}
                className="flex items-center gap-2.5 hover:text-[--color-primary]"
              >
                <Phone className="size-4 shrink-0" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2.5 hover:text-[--color-primary]"
              >
                <Mail className="size-4 shrink-0" />
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Öffnungszeiten */}
        <div>
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Clock className="size-4" />
            {t("contactPage.hours")}
          </h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-[--color-muted]">
            {contact.openingHours.map((oh) => (
              <li key={oh.days} className="flex justify-between gap-4">
                <span>{oh.days}</span>
                <span>{oh.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[--color-border]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 container-px py-5 text-xs text-[--color-muted] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {t("footer.rights")}
          </p>
          <div className="flex flex-wrap gap-5">
            <Link href="/impressum" className="hover:text-[--color-primary]">
              {t("footer.imprint")}
            </Link>
            <Link href="/datenschutz" className="hover:text-[--color-primary]">
              {t("footer.privacy")}
            </Link>
            <Link href="/agb" className="hover:text-[--color-primary]">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
