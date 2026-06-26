import { cn } from "@/lib/utils";

/** Konsistenter Sektions-Wrapper mit zentriertem Container. */
export function Section({
  children,
  className,
  innerClassName,
  id,
  as: Tag = "section",
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
  as?: "section" | "div";
}) {
  return (
    <Tag id={id} className={cn("section-y", className)}>
      <div className={cn("mx-auto max-w-6xl container-px", innerClassName)}>
        {children}
      </div>
    </Tag>
  );
}

/** Standardisierter Sektions-Kopf (Eyebrow optional, Titel, Untertitel). */
export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  centered = true,
  className,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-(--color-accent-dark)">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-lg text-(--color-muted)">{subtitle}</p>
      )}
    </div>
  );
}
