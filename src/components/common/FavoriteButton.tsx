"use client";
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useCatalog";
export default function FavoriteButton({ id, name, className = "" }: { id: string; name: string; className?: string }) {
  const { has, toggle } = useFavorites();
  const on = has(id);
  return (
    <button type="button" onClick={() => toggle(id)} aria-pressed={on} aria-label={on ? `حذف ${name} از علاقه‌مندی‌ها` : `افزودن ${name} به علاقه‌مندی‌ها`}
      className={`grid h-10 w-10 place-items-center rounded-full bg-white/90 text-brown shadow-soft transition-colors hover:bg-white ${className}`}>
      <Heart size={18} className={on ? "fill-caramel text-caramel" : ""} />
    </button>
  );
}
