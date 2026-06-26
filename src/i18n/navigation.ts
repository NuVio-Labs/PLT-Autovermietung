import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Lokalisierte Navigations-APIs (Link, redirect, usePathname, useRouter,
 * getPathname). Diese kennen die pathnames-Map aus routing.ts und erzeugen
 * automatisch die korrekten sprachabhängigen URLs.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
