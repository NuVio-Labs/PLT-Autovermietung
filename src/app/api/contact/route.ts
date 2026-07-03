import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Kontaktanfrage-Endpunkt – aktuell NICHT aktiv.
 *
 * Der frühere E-Mail-Versand (Resend) wurde entfernt: Anfragen werden künftig
 * im NuVio-Core-Buchungssystem durch das Personal bearbeitet, nicht per Mail.
 * Bis die Anbindung steht, ist das Kontaktformular als „in Arbeit" markiert
 * (siehe ContactForm) und dieser Endpunkt antwortet bewusst mit 503.
 *
 * Zum Scharfschalten: hier die Anbindung an das gewählte Ziel ergänzen und den
 * `disabled`-Zustand im Formular entfernen.
 */
export async function POST() {
  return NextResponse.json(
    { ok: false, reason: "not_available" },
    { status: 503 },
  );
}
