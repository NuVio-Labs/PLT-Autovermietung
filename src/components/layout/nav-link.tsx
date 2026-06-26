"use client";

import { Link, usePathname } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function NavLink({
  href,
  children,
}: {
  href: AppPathname;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative text-sm font-medium transition-colors hover:text-(--color-primary)",
        active ? "text-(--color-primary)" : "text-(--color-text)",
      )}
    >
      {children}
    </Link>
  );
}
