import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validators";
import { sendContactEmail } from "@/lib/mail";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten() },
      { status: 422 },
    );
  }

  // Honeypot: still 200, aber kein Versand (Bot soll nichts merken).
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const localeRaw =
    typeof (body as { locale?: unknown }).locale === "string"
      ? (body as { locale: string }).locale
      : "de";

  const result = await sendContactEmail(parsed.data, localeRaw);
  if (!result.ok) {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
