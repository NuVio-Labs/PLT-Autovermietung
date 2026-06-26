import { Button, type ButtonProps } from "@/components/ui/button";
import { bookingUrl } from "@/data/contact";

type BookingLinkProps = Omit<ButtonProps, "asChild"> & {
  locale: string;
  category?: string;
  children: React.ReactNode;
};

/**
 * CTA-Link zum NuVio-Core-Buchungssystem (Projekt.md §34).
 * Übergibt Locale (+ optionale Kategorie) als Query-Parameter.
 */
export function BookingLink({
  locale,
  category,
  children,
  variant = "accent",
  ...props
}: BookingLinkProps) {
  return (
    <Button asChild variant={variant} {...props}>
      <a href={bookingUrl(locale, category)} rel="noopener">
        {children}
      </a>
    </Button>
  );
}
