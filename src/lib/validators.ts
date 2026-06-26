import { z } from "zod";

/**
 * Schema für das Kontakt-/Anfrageformular (Projekt.md §16).
 * Fehlermeldungen werden über Translation-Keys aufgelöst, damit das
 * Formular dreisprachig validiert.
 *
 * Optionale Felder sind als string mit Default "" modelliert (kein
 * .optional()), damit Eingabe- und Ausgabetyp identisch sind – das hält
 * den react-hook-form-Resolver typsicher.
 */
export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "contactPage.form.errors.nameRequired"),
  phone: z.string().trim().min(4, "contactPage.form.errors.phoneRequired"),
  email: z.string().trim().email("contactPage.form.errors.emailInvalid"),
  category: z.string().trim().default(""),
  period: z.string().trim().default(""),
  message: z.string().trim().default(""),
  consent: z
    .boolean()
    .refine((v) => v === true, "contactPage.form.errors.consentRequired"),
  // Honeypot gegen Spam (Projekt.md §36) – muss leer bleiben.
  company: z.string().max(0).default(""),
});

/** Eingabetyp (Formular) – optionale Felder dürfen fehlen. */
export type ContactFormInput = z.input<typeof contactFormSchema>;
/** Ausgabetyp (nach Parse) – alle Felder vorhanden. */
export type ContactFormValues = z.output<typeof contactFormSchema>;
