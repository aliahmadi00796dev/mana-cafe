"use client";
import { useCallback, useEffect, useState } from "react";
/** localStorage with validation, graceful failure, and same-tab sync between components. */
export function useLocalStorage<T>(key: string, initial: T, parse: (v: unknown) => T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const read = () => {
      try { const raw = localStorage.getItem(key); setValue(raw === null ? initial : parse(JSON.parse(raw))); }
      catch { setValue(initial); }
    };
    read(); setReady(true);
    const h = (e: Event) => { if ((e as CustomEvent).detail === key) read(); };
    window.addEventListener("mana-storage", h);
    return () => window.removeEventListener("mana-storage", h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const set = useCallback((next: T) => {
    setValue(next);
    try { localStorage.setItem(key, JSON.stringify(next)); window.dispatchEvent(new CustomEvent("mana-storage", { detail: key })); } catch { /* storage unavailable */ }
  }, [key]);
  return [value, set, ready] as const;
}
