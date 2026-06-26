import { Resend } from "resend";
import { contact, site } from "@/data/contact";
import type { ContactFormValues } from "@/lib/validators";

/**
 * Versand der Kontaktanfrage via Resend (Projekt.md §25).
 *
 * Konfiguration über ENV (siehe .env.example):
 *   RESEND_API_KEY  – API-Key
 *   CONTACT_FROM    – verifizierte Absenderadresse (z. B. anfrage@plt-...)
 *   CONTACT_TO      – Zieladresse (Postfach von PLT)
 *
 * Solange kein Key gesetzt ist, läuft der Versand im "dry-run": Die Anfrage
 * wird geloggt und als Erfolg behandelt, damit das Formular auch ohne
 * Konfiguration getestet werden kann.
 */
export async function sendContactEmail(
  data: ContactFormValues,
  locale: string,
): Promise<{ ok: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? contact.email;
  const from = process.env.CONTACT_FROM ?? `${site.name} <onboarding@resend.dev>`;

  const subject = `Neue Anfrage über ${site.name} (${locale.toUpperCase()})`;
  const lines = [
    `Name: ${data.name}`,
    `Telefon: ${data.phone}`,
    `E-Mail: ${data.email}`,
    `Fahrzeug/Kategorie: ${data.category || "—"}`,
    `Mietzeitraum: ${data.period || "—"}`,
    `Sprache: ${locale}`,
    "",
    "Nachricht:",
    data.message || "—",
  ];
  const text = lines.join("\n");

  if (!apiKey) {
    console.info("[mail] RESEND_API_KEY fehlt – dry-run. Anfrage:\n" + text);
    return { ok: true };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject,
    text,
  });

  if (error) {
    console.error("[mail] Resend-Fehler:", error);
    return { ok: false };
  }
  return { ok: true };
}
