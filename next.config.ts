import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Workspace-Root explizit auf dieses Projekt setzen (verhindert die
  // Fehlinterpretation durch ein Lockfile im Home-Verzeichnis).
  outputFileTracingRoot: __dirname,
  images: {
    // Moderne Formate für die Fahrzeugbilder (siehe Projekt.md §28)
    formats: ["image/avif", "image/webp"],
    // DEMO: Platzhalter-Fotos von Unsplash. Vor Live-Gang durch echte
    // PLT-Fahrzeugbilder ersetzen (Projekt.md §28/§41).
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default withNextIntl(nextConfig);
