import { Button, type ButtonProps } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

type AvailabilityLinkProps = Omit<ButtonProps, "asChild"> & {
  children: React.ReactNode;
};

/**
 * CTA-Link zur seiteninternen Verfügbarkeits-Übersicht (/verfuegbarkeit).
 * Gegenstück zu {@link BookingLink}: „Verfügbarkeit prüfen" bleibt auf der
 * PLT-Website (Live-Liste frei/belegt), „Online buchen" führt ins Core-System.
 */
export function AvailabilityLink({
  children,
  variant = "outline",
  ...props
}: AvailabilityLinkProps) {
  return (
    <Button asChild variant={variant} {...props}>
      <Link href="/verfuegbarkeit">{children}</Link>
    </Button>
  );
}
