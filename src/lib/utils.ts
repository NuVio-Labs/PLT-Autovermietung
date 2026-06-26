import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Mergt Tailwind-Klassen konfliktfrei (shadcn-Standard-Helper). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
