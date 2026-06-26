import { getTranslations } from "next-intl/server";
import { Section, SectionHeading } from "@/components/ui/section";

export async function ProcessSteps() {
  const t = await getTranslations();
  const steps = ["select", "period", "check", "pickup"] as const;

  return (
    <Section>
      <SectionHeading title={t("process.title")} subtitle={t("process.subtitle")} />
      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step} className="relative">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[--color-accent] font-bold text-[--color-on-accent]">
                {i + 1}
              </span>
              <h3 className="font-semibold">
                {t(`process.steps.${step}.title`)}
              </h3>
            </div>
            <p className="mt-3 text-sm text-[--color-muted]">
              {t(`process.steps.${step}.description`)}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
