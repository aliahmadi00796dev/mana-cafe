import { z } from "zod";
export const categorySchema = z.object({ id: z.string().min(1), name: z.string().min(1) });
export const productSchema = z.object({
  id: z.string(), slug: z.string().min(1), name: z.string().min(1), description: z.string(), price: z.number().nonnegative(),
  categoryId: z.string(), image: z.string(), imagePlaceholder: z.boolean(), ingredients: z.array(z.string()), size: z.string(),
  temp: z.enum(["hot", "cold", "both", "room"]), available: z.boolean(), featured: z.boolean(), popularity: z.number(),
  discount: z.number().min(0).max(90).optional(), prep: z.string().optional(),
});
export const cafeInfoSchema = z.object({ phone: z.string(), address: z.string(), hours: z.string(), instagram: z.string(), mapNote: z.string() });
export const parseProducts = (v: unknown) => z.array(productSchema).parse(v);
export const parseCategories = (v: unknown) => z.array(categorySchema).parse(v);
export const parseFavorites = (v: unknown) => z.array(z.string()).parse(v);
export const parseCafeInfo = (v: unknown) => cafeInfoSchema.parse(v);
