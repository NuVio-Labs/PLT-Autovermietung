/**
 * Live-Verfügbarkeit der PLT-Fahrzeuge – gelesen aus dem NuVio-Core-System.
 *
 * Datenquelle sind ausschließlich die ÖFFENTLICHEN, read-only Core-Objekte
 * (kein Login, kein Schreibzugriff, keine internen Felder wie Kennzeichen):
 *   - View  `public_vehicles`            → Grundbestand je Station
 *   - RPC   `public_available_vehicles`  → im Zeitfenster freie Fahrzeuge
 *
 * Statusableitung: Die RPC erzwingt serverseitig den Mindestvorlauf des Core
 * (Standard 72 h) – „jetzt sofort frei" gibt sie also bewusst nicht her. Wir
 * fragen deshalb das FRÜHESTE buchbare Fenster ab (jetzt + Vorlauf, 24 h lang).
 * Ein Fahrzeug aus dem Grundbestand, das dort NICHT als frei auftaucht, gilt als
 * „belegt" → die Seite bietet dann den direkten Anruf bei der Station an.
 *
 * Zugriff serverseitig (Server Component) mit kurzer Revalidierung, damit die
 * Anzeige aktuell bleibt, ohne die Core-DB bei jedem Request zu treffen.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** PLT-Mandanten-Slug im Core (fix – nur diese eine Firma). */
const COMPANY_SLUG = "plt-autovermietung";

/** Mindestvorlauf des Core in Stunden (Default 72). Fenster-Anfang = jetzt + X. */
const LEAD_HOURS = 72;

/** Länge des abgefragten Fensters ab dem frühesten Start (Stunden). */
const WINDOW_HOURS = 24;

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

/** Frühestes buchbares Fenster [from, to] als ISO-Strings (UTC). */
export function earliestWindow(now: Date = new Date()): { from: string; to: string } {
  const from = new Date(now.getTime() + LEAD_HOURS * 3_600_000);
  const to = new Date(from.getTime() + WINDOW_HOURS * 3_600_000);
  return { from: from.toISOString(), to: to.toISOString() };
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

  const { from, to } = earliestWindow();

  try {
    const [baseRes, freeRes] = await Promise.all([
      fetch(
        `${SUPABASE_URL}/rest/v1/public_vehicles?company_slug=eq.${COMPANY_SLUG}` +
          `&station_slug=eq.${stationSlug}` +
          `&select=id,name,preis_gruppe,ahk,sitze`,
        { headers: headers(), next: { revalidate: REVALIDATE_SECONDS } },
      ),
      fetch(`${SUPABASE_URL}/rest/v1/rpc/public_available_vehicles`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({
          p_company_slug: COMPANY_SLUG,
          p_station_slug: stationSlug,
          p_from: from,
          p_to: to,
        }),
        next: { revalidate: REVALIDATE_SECONDS },
      }),
    ]);

    if (!baseRes.ok || !freeRes.ok) return { ok: false, vehicles: [] };

    const base = (await baseRes.json()) as PublicVehicleRow[];
    const free = (await freeRes.json()) as AvailableVehicleRow[];
    const freeIds = new Set(free.map((v) => v.id));

    const vehicles: StationVehicle[] = base
      .filter((v): v is PublicVehicleRow & { id: string; name: string } =>
        Boolean(v.id && v.name),
      )
      .map((v) => ({
        id: v.id,
        name: v.name,
        preisGruppe: v.preis_gruppe,
        sitze: v.sitze,
        // Core speichert AHK als String ("true"/"false"/null).
        ahk: v.ahk === "true",
        status: (freeIds.has(v.id) ? "available" : "booked") as VehicleStatus,
      }))
      // Verfügbare zuerst, dann alphabetisch – ruhige, lesbare Liste.
      .sort((a, b) => {
        if (a.status !== b.status) return a.status === "available" ? -1 : 1;
        return a.name.localeCompare(b.name, "de");
      });

    return { ok: true, vehicles };
  } catch {
    return { ok: false, vehicles: [] };
  }
}
