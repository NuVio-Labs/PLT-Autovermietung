/** Kompakter Seitenkopf für Unterseiten. */
export function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b border-[--color-border] bg-[--color-surface]">
      <div className="mx-auto max-w-6xl container-px py-14 sm:py-16">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-[--color-muted]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
