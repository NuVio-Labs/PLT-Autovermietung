# PLT Autovermietung – Website Relaunch 2026

Mobile-First, dreisprachiger (DE/NL/EN) Relaunch der Website von PLT Autovermietung
(Weeze / Niederrhein). Konzept siehe [Projekt.md](./Projekt.md).

## Tech-Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (Design-Tokens via `@theme inline`)
- **next-intl** – Mehrsprachigkeit mit lokalisierten URLs (`/de/fahrzeuge`, `/nl/voertuigen`, `/en/vehicles`)
- **React Hook Form + Zod** – validiertes, dreisprachiges Kontaktformular
- **Resend** – E-Mail-Versand der Anfragen (dry-run ohne API-Key)
- **lucide-react** – Icons

## Entwicklung

```bash
npm install
cp .env.example .env.local   # Werte ergänzen (optional für dev)
npm run dev                  # http://localhost:3000 -> /de

npm run build                # Production-Build (prerendert DE/NL/EN)
npm run start
npm run lint
npm run typecheck
```

## Projektstruktur

```
src/
├─ app/
│  ├─ [locale]/            # alle Seiten (Start, fahrzeuge, preise, ablauf,
│  │                       #   ueber-uns, kontakt, impressum, datenschutz, agb)
│  ├─ api/contact/         # Formular-Endpoint (Resend)
│  ├─ layout.tsx           # Root (pass-through)
│  ├─ sitemap.ts / robots.ts
│  └─ not-found.tsx
├─ components/
│  ├─ layout/              # Header, Footer, MobileNav, StickyBookingBar, …
│  ├─ sections/            # Hero, TrustBar, VehicleCategories, WhyPlt, …
│  └─ ui/                  # Button, Card, Badge, Input, Section
├─ data/                   # contact, navigation, vehicles, legal
├─ i18n/                   # routing, navigation, request
├─ lib/                    # seo, validators, mail, utils
└─ messages/               # de.json / nl.json / en.json
```

## Mehrsprachigkeit

- Standardsprache: **de**. URLs sind pro Sprache lokalisiert (siehe `src/i18n/routing.ts`).
- Übersetzungen liegen ausschließlich in `src/messages/*.json` – keine hart codierten Texte.
- hreflang/canonical + lokalisierte `sitemap.xml` werden automatisch erzeugt.

## Buchungssystem (NuVio Core)

Die Website verlinkt nur per CTA zum separaten Buchungssystem. Der Link wird in
`src/data/contact.ts` über `bookingUrl(locale, category)` gebaut
(`https://core.nuviolabs.de/buchen/plt-autovermietung?locale=…&category=…`).

## Rechtstexte

- **Impressum** und **AGB** wurden 1:1 vom bestehenden Auftritt
  (plt-autovermietung.de) übernommen → `src/data/legal.ts`.
- **Datenschutzerklärung** ist ein an die neue Website angepasster Entwurf
  (`src/app/[locale]/datenschutz/page.tsx`) → **vor Livegang rechtlich prüfen lassen**.

## Design / Branding (Demo-Stand)

- **Logo**: echtes PLT-Logo eingebunden (`public/assets/logo.png`).
- **Farben**: aus dem Logo abgeleitet (P=Blau `#4287c4`, L=Pink `#dd3a8a`,
  T=Grün `#8ebb0d`, Smile-Schwarz `#17161b`). Verspielter Multicolor-Look:
  Primär = Blau, Akzente Blau/Pink/Grün rotieren über Kategorien/Sektionen.
  Tokens in `app/globals.css` (`:root`).
- **Fotos**: Unsplash-Platzhalter (`data/images.ts`), inhaltlich passend gewählt.
  ⚠️ **Vor Livegang durch echte PLT-Fahrzeugbilder ersetzen** (Projekt.md §28).

## Offene Punkte / Vom Kunden benötigt (Projekt.md §41)

- [ ] **Echte Fahrzeugbilder** statt Unsplash-Platzhalter (`data/images.ts`)
- [ ] **Markenfarben final freigeben** (aktuell aus Logo abgeleitet)
- [ ] **Öffnungszeiten** bestätigen (`data/contact.ts`)
- [ ] **Preise / Tariflogik** (aktuell „auf Anfrage")
- [ ] **Resend-Konfiguration** (`RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`)
- [ ] NL/EN-Übersetzungen final gegenlesen lassen
- [ ] Datenschutzerklärung rechtlich prüfen lassen

> Hinweis: Die Datei-Konvention `middleware.ts` löst unter Next 16 einen
> Deprecation-Hinweis aus (Umbenennung zu `proxy` empfohlen). Bleibt bewusst
> bestehen, bis next-intl die Umstellung offiziell unterstützt.
