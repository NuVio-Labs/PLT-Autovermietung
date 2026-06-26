"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * True erst nach dem Client-Mount. Lint-konformer Ersatz für das
 * useEffect(()=>setMounted(true))-Muster – wichtig für Portale, die
 * `document` benötigen (SSR liefert false, Client true).
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // Client
    () => false, // Server / SSR
  );
}
