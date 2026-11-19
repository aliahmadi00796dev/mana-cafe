import type { Metadata } from "next";
import FavoritesClient from "@/components/menu/FavoritesClient";
export const metadata: Metadata = { title: "علاقه‌مندی‌ها", description: "محصولات موردعلاقهٔ شما در مانا." };
export default function Favorites() { return <FavoritesClient />; }
