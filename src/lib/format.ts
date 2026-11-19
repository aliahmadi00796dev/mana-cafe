const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
/** Prefix local paths with the GitHub Pages basePath. External URLs pass through. */
export const asset = (p: string) => (/^(https?:)?\/\//.test(p) ? p : `${base}${p}`);
export const toman = (n: number) => `${new Intl.NumberFormat("fa-IR").format(n)} تومان`;
export const finalPrice = (p: { price: number; discount?: number }) => Math.round(p.price * (1 - (p.discount ?? 0) / 100));
export const TEMP_LABEL = { hot: "گرم", cold: "سرد", both: "گرم یا سرد", room: "دمای محیط" } as const;
export const KEYS = { products: "mana_products", categories: "mana_categories", favorites: "mana_favorites", cafeInfo: "mana_cafe_info" } as const;
