"use client";

import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { CallStationDialog } from "@/components/call-station-dialog";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * "Anrufen"-Button, der die Stationsauswahl öffnet (statt fest die
 * Hauptnummer zu wählen). Label: "callNow" (lang) oder "call" (kurz).
 */
export function CallButton({
  label = "callNow",
  ...props
}: Omit<ButtonProps, "children"> & { label?: "callNow" | "call" }) {
  const t = useTranslations("cta");
  return (
    <CallStationDialog>
      {(open) => (
        <Button type="button" onClick={open} {...props}>
          <Phone className="size-4" />
          {t(label)}
        </Button>
      )}
    </CallStationDialog>
  );
}

/**
 * Variante für die mobile Sticky-Bar (eigenes Layout statt Button-Styles).
 */
export function CallBarButton({ className }: { className?: string }) {
  const t = useTranslations("cta");
  return (
    <CallStationDialog>
      {(open) => (
        <button
          type="button"
          onClick={open}
          className={cn(
            "flex h-12 flex-1 items-center justify-center gap-2 rounded-[--radius-md] border border-[--color-border] font-semibold text-[--color-text]",
            className,
          )}
        >
          <Phone className="size-4" />
          {t("call")}
        </button>
      )}
    </CallStationDialog>
  );
}
