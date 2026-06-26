import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * PLT-Logo (public/assets/logo.png) – das echte Marken-Logo.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center", className)}
      aria-label="PLT Autovermietung – Startseite"
    >
      <Image
        src="/assets/logo.png"
        alt="PLT Autovermietung"
        width={132}
        height={74}
        priority
        className="h-10 w-auto"
      />
    </Link>
  );
}
