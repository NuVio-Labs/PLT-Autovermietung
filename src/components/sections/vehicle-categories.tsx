import { getTranslations } from "next-intl/server";
import { Section, SectionHeading } from "@/components/ui/section";
import { CategoryCard } from "@/components/category-card";
import { vehicleCategories, type VehicleCategory } from "@/data/vehicles";

export async function VehicleCategories({
  categories = vehicleCategories,
}: {
  categories?: VehicleCategory[];
}) {
  const t = await getTranslations();

  return (
    <Section>
      <SectionHeading
        title={t("categories.title")}
        subtitle={t("categories.subtitle")}
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </Section>
  );
}
