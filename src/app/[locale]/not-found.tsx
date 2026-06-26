import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function LocaleNotFound() {
  const t = await getTranslations("notFound");
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 container-px py-28 text-center">
      <p className="text-6xl font-extrabold text-[--color-primary]">404</p>
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p className="text-[--color-muted]">{t("description")}</p>
      <Button asChild className="mt-2">
        <Link href="/">{t("back")}</Link>
      </Button>
    </div>
  );
}
