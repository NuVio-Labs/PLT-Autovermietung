/**
 * Live-Verfügbarkeit der PLT-Fahrzeuge – gelesen aus dem NuVio-Core-System.
 *
 * Datenquelle sind ausschließlich die ÖFFENTLICHEN, read-only Core-Objekte
 * (kein Login, kein Schreibzugriff, keine internen Felder wie Kennzeichen):
 *   - View  `public_vehicles`            → Grundbestand je Station
 *   - RPC   `public_available_vehicles`  → im Zeitfenster freie Fahrzeuge
 *
 * Statusableitung („demnächst frei"): Die RPC erzwingt serverseitig den
 * Mindestvorlauf des Core (Standard 72 h) – „jetzt sofort" gibt sie nicht her.
 * Wir prüfen deshalb ab dem frühesten erlaubten Start mehrere aufeinander
 * folgende Tagesfenster (24 h) über einen Ausblick von einigen Tagen. Ein
 * Fahrzeug gilt als VERFÜGBAR, sobald es in EINEM dieser Fenster frei ist;
 * `availableFrom` nennt den frühesten freien Tag. Fahrzeuge, die in keinem
 * Fenster frei sind, gelten als „belegt" → die Seite bietet dann den direkten
 * Anruf bei der Station an.
 *
 * Grund: Betrachtet man nur das eine 72-h-Fenster, erscheint eine Station
 * schnell komplett „belegt", obwohl schon wenige Tage später alles frei ist –
 * für Nutzer wie Demo irreführend.
 *
 * Zugriff serverseitig (Server Component) mit kurzer Revalidierung, damit die
 * Anzeige aktuell bleibt, ohne die Core-DB bei jedem Request zu treffen.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** PLT-Mandanten-Slug im Core (fix – nur diese eine Firma). */
const COMPANY_SLUG = "plt-autovermietung";

/** Mindestvorlauf des Core in Stunden (Default 72). Frühester Start = jetzt + X. */
const LEAD_HOURS = 72;

/** Länge eines geprüften Tagesfensters (Stunden). */
const WINDOW_HOURS = 24;

/** Ausblick: so viele aufeinanderfolgende Tagesfenster ab dem frühesten Start. */
const LOOKAHEAD_DAYS = 7;

/** Cache-Dauer der Verfügbarkeitsabfrage in Sekunden. */
const REVALIDATE_SECONDS = 300;

export type VehicleStatus = "available" | "booked";

export type StationVehicle = {
  id: string;
  name: string;
  /** Preisgruppen-Code aus dem Core (z. B. "B_PKW") – intern, nicht angezeigt. */
  preisGruppe: string | null;
  /** Sitzplätze, falls im Core gepflegt. */
  sitze: number | null;
  /** Anhängerkupplung vorhanden. */
  ahk: boolean;
  status: VehicleStatus;
  /** Frühester Tag (ISO-Datum), an dem das Fahrzeug frei ist – falls verfügbar. */
  availableFrom: string | null;
};

/** Ergebnis pro Station: der Fahrzeugbestand mit abgeleitetem Live-Status. */
export type StationAvailability = {
  /** true, sobald die Core-Daten erfolgreich geladen wurden. */
  ok: boolean;
  vehicles: StationVehicle[];
};

type PublicVehicleRow = {
  id: string | null;
  name: string | null;
  preis_gruppe: string | null;
  ahk: string | null;
  sitze: number | null;
};

type AvailableVehicleRow = {
  id: string;
};

function isConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

function headers(): HeadersInit {
  return {
    apikey: SUPABASE_ANON_KEY as string,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
  };
}

/**
 * Die geprüften Tagesfenster ab dem frühesten erlaubten Start (jetzt + Vorlauf),
 * jeweils {@link WINDOW_HOURS} lang, für {@link LOOKAHEAD_DAYS} Tage.
 */
export function lookaheadWindows(
  now: Date = new Date(),
): { from: string; to: string }[] {
  const start = now.getTime() + LEAD_HOURS * 3_600_000;
  return Array.from({ length: LOOKAHEAD_DAYS }, (_, i) => {
    const from = new Date(start + i * 24 * 3_600_000);
    const to = new Date(from.getTime() + WINDOW_HOURS * 3_600_000);
    return { from: from.toISOString(), to: to.toISOString() };
  });
}

/**
 * Verfügbarkeit einer Station. Liefert `ok: false`, wenn die Core-Anbindung
 * nicht konfiguriert ist oder eine Abfrage fehlschlägt – die Seite zeigt dann
 * einen neutralen Hinweis + Anruf-Fallback, statt einen Fehler zu werfen.
 */
export async function getStationAvailability(
  stationSlug: string,
): Promise<StationAvailability> {
  if (!isConfigured()) return { ok: false, vehicles: [] };

  const windows = lookaheadWindows();

  try {
    // Grundbestand der Station + je ein Verfügbarkeits-Abruf pro Tagesfenster.
    const [baseRes, ...windowRes] = await Promise.all([
      fetch(
        `${SUPABASE_URL}/rest/v1/public_vehicles?company_slug=eq.${COMPANY_SLUG}` +
          `&station_slug=eq.${stationSlug}` +
          `&select=id,name,preis_gruppe,ahk,sitze`,
        { headers: headers(), next: { revalidate: REVALIDATE_SECONDS } },
      ),
      ...windows.map((w) =>
        fetch(`${SUPABASE_URL}/rest/v1/rpc/public_available_vehicles`, {
          method: "POST",
          headers: headers(),
          body: JSON.stringify({
            p_company_slug: COMPANY_SLUG,
            p_station_slug: stationSlug,
            p_from: w.from,
            p_to: w.to,
          }),
          next: { revalidate: REVALIDATE_SECONDS },
        }),
      ),
    ]);

    if (!baseRes.ok || windowRes.some((r) => !r.ok)) {
      return { ok: false, vehicles: [] };
    }

    const base = (await baseRes.json()) as PublicVehicleRow[];
    const perWindow = (await Promise.all(
      windowRes.map((r) => r.json()),
    )) as AvailableVehicleRow[][];

    // Pro Fahrzeug den frühesten freien Tag bestimmen (erstes Fenster, in dem
    // es auftaucht). Ohne Treffer → belegt.
    const earliestFreeDay = new Map<string, string>();
    perWindow.forEach((free, i) => {
      const day = windows[i].from.slice(0, 10); // ISO-Datum (YYYY-MM-DD)
      for (const v of free) {
        if (!earliestFreeDay.has(v.id)) earliestFreeDay.set(v.id, day);
      }
    });

    const vehicles: StationVehicle[] = base
      .filter((v): v is PublicVehicleRow & { id: string; name: string } =>
        Boolean(v.id && v.name),
      )
      .map((v) => {
        const availableFrom = earliestFreeDay.get(v.id) ?? null;
        return {
          id: v.id,
          name: v.name,
          preisGruppe: v.preis_gruppe,
          sitze: v.sitze,
          // Core speichert AHK als String ("true"/"false"/null).
          ahk: v.ahk === "true",
          status: (availableFrom ? "available" : "booked") as VehicleStatus,
          availableFrom,
        };
      })
      // Verfügbare zuerst (früheste zuerst), dann alphabetisch.
      .sort((a, b) => {
        if (a.status !== b.status) return a.status === "available" ? -1 : 1;
        if (a.availableFrom && b.availableFrom && a.availableFrom !== b.availableFrom) {
          return a.availableFrom < b.availableFrom ? -1 : 1;
        }
        return a.name.localeCompare(b.name, "de");
      });

    return { ok: true, vehicles };
  } catch {
    return { ok: false, vehicles: [] };
  }
}
