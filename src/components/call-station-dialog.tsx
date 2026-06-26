"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Phone, X, Navigation, Loader2, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  stations,
  findNearestStation,
  type Station,
} from "@/data/stations";
import { useMounted } from "@/lib/use-mounted";
import { cn } from "@/lib/utils";

type GeoState =
  | { status: "idle" }
  | { status: "locating" }
  | { status: "done"; station: Station; km: number }
  | { status: "error"; message: string };

/**
 * Modal zur Stationsauswahl beim "Anrufen".
 * Bietet (1) "Nächste Station finden" per Geolocation und (2) die volle Liste.
 * Trigger wird als Render-Prop übergeben, damit jeder Button-Style nutzbar ist.
 */
export function CallStationDialog({
  children,
}: {
  children: (open: () => void) => React.ReactNode;
}) {
  const t = useTranslations("callDialog");
  const [open, setOpen] = useState(false);
  const mounted = useMounted();
  const [geo, setGeo] = useState<GeoState>({ status: "idle" });
  const closeRef = useRef<HTMLButtonElement>(null);

  // Esc schließt, Scroll sperren, Fokus setzen.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function findNearest() {
    if (!("geolocation" in navigator)) {
      setGeo({ status: "error", message: t("geoUnsupported") });
      return;
    }
    setGeo({ status: "locating" });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { station, distanceKm } = findNearestStation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setGeo({ status: "done", station, km: distanceKm });
      },
      () => setGeo({ status: "error", message: t("geoDenied") }),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    );
  }

  function handleOpen() {
    setGeo({ status: "idle" });
    setOpen(true);
  }

  return (
    <>
      {children(handleOpen)}

      {mounted &&
        open &&
        createPortal(
          <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t("title")}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="flex max-h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-t-(--radius-lg) bg-white shadow-(--shadow-floating) sm:rounded-(--radius-lg)">
            {/* Kopf */}
            <div className="flex items-start justify-between gap-4 border-b border-(--color-border) p-5">
              <div>
                <h2 className="text-lg font-semibold">{t("title")}</h2>
                <p className="mt-1 text-sm text-(--color-muted)">
                  {t("subtitle")}
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("close")}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-(--radius-md) text-(--color-muted) hover:bg-(--color-surface)"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-5">
              {/* Nächste Station */}
              {geo.status !== "done" && (
                <button
                  type="button"
                  onClick={findNearest}
                  disabled={geo.status === "locating"}
                  className="flex w-full items-center justify-center gap-2 rounded-(--radius-md) bg-(--color-primary) px-5 py-3 font-semibold text-(--color-on-primary) transition-colors hover:bg-(--color-primary-dark) disabled:opacity-70"
                >
                  {geo.status === "locating" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      {t("locating")}
                    </>
                  ) : (
                    <>
                      <Navigation className="size-4" />
                      {t("findNearest")}
                    </>
                  )}
                </button>
              )}

              {geo.status === "error" && (
                <p className="mt-3 rounded-(--radius-md) bg-(--color-surface) px-4 py-3 text-sm text-(--color-muted)">
                  {geo.message}
                </p>
              )}

              {/* Nächste-Station-Treffer hervorgehoben */}
              {geo.status === "done" && (
                <a
                  href={geo.station.phoneHref}
                  className="block rounded-(--radius-md) border-2 border-(--color-green) bg-(--color-surface) p-4"
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-(--color-green) px-2.5 py-0.5 text-xs font-semibold text-white">
                    <Navigation className="size-3" />
                    {t("nearestLabel")}
                  </span>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{geo.station.city}</p>
                      <p className="text-sm text-(--color-muted)">
                        {geo.station.name} · {t("distanceAway", { km: geo.km })}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-(--radius-md) bg-(--color-green) px-4 py-2 text-sm font-semibold text-white">
                      <Phone className="size-4" />
                      {geo.station.phone}
                    </span>
                  </div>
                </a>
              )}

              {/* Volle Liste */}
              <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wide text-(--color-muted)">
                {t("allStations")}
              </p>
              <ul className="flex flex-col divide-y divide-(--color-border)">
                {stations.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.phoneHref}
                      className={cn(
                        "flex items-center justify-between gap-3 py-3 transition-colors hover:bg-(--color-surface)",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-(--radius-md) bg-(--color-surface-2) text-(--color-primary)">
                          <MapPin className="size-4" aria-hidden />
                        </span>
                        <span>
                          <span className="block font-medium">{s.city}</span>
                          <span className="block text-sm text-(--color-muted)">
                            {s.name}
                          </span>
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-(--color-primary)">
                        <Phone className="size-4" />
                        {s.phone}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </div>,
          document.body,
        )}
    </>
  );
}
