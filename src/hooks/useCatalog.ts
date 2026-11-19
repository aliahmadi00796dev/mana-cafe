"use client";
import { catalog } from "@/services/catalog";
import { DEFAULT_INFO } from "@/config/site";
import { KEYS } from "@/lib/format";
import { parseCafeInfo, parseCategories, parseFavorites, parseProducts } from "@/lib/schemas";
import { useLocalStorage } from "./useLocalStorage";
export const useProducts = () => useLocalStorage(KEYS.products, catalog.getProducts(), parseProducts);
export const useCategories = () => useLocalStorage(KEYS.categories, catalog.getCategories(), parseCategories);
export const useCafeInfo = () => useLocalStorage(KEYS.cafeInfo, DEFAULT_INFO, parseCafeInfo);
export function useFavorites() {
  const [favs, setFavs, ready] = useLocalStorage<string[]>(KEYS.favorites, [], parseFavorites);
  const toggle = (id: string) => setFavs(favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id]);
  return { favs, toggle, has: (id: string) => favs.includes(id), ready };
}
