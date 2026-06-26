import type { LegalBlock } from "@/data/legal";

/** Rendert Rechtstext-Blöcke (Überschrift + Absätze). */
export function LegalContent({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <div className="mx-auto max-w-3xl space-y-6 text-(--color-text)">
      {blocks.map((block, i) => (
        <section key={i}>
          {block.heading && (
            <h2 className="text-lg font-semibold text-(--color-text)">
              {block.heading}
            </h2>
          )}
          {block.paragraphs.map((p, j) => (
            <p
              key={j}
              className="mt-2 whitespace-pre-line leading-relaxed text-(--color-muted)"
            >
              {p}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}
