import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.plt-autovermietung.de",
  ),
};

// <html>/<body> werden im [locale]-Layout gesetzt, damit lang dynamisch ist.
// Dieses Root-Layout reicht die Kinder nur durch.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
