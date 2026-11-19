export type Temp = "hot" | "cold" | "both" | "room";
export interface Category { id: string; name: string }
export interface Product {
  id: string; slug: string; name: string; description: string; price: number; categoryId: string;
  image: string; imagePlaceholder: boolean; ingredients: string[]; size: string; temp: Temp;
  available: boolean; featured: boolean; popularity: number; discount?: number; prep?: string;
}
export interface CafeInfo { phone: string; address: string; hours: string; instagram: string; mapNote: string }
