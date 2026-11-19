import type { Category, Product } from "@/types";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
/** Swap this implementation for an API client later; the UI only talks to this interface. */
export interface CatalogService {
  getProducts(): Product[]; getCategories(): Category[];
  getProduct(slug: string): Product | undefined; getRelated(p: Product, n?: number): Product[];
}
export const staticCatalog: CatalogService = {
  getProducts: () => products, getCategories: () => categories,
  getProduct: (slug) => products.find((p) => p.slug === slug),
  getRelated: (p, n = 4) => products.filter((x) => x.categoryId === p.categoryId && x.id !== p.id).slice(0, n),
};
export const catalog: CatalogService = staticCatalog;
