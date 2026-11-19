import Link from "next/link";
import type { Product } from "@/types";
import ProductImage from "@/components/common/ProductImage";
import FavoriteButton from "@/components/common/FavoriteButton";
import Price from "@/components/common/Price";
export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card bg-white shadow-soft">
      <div className="relative overflow-hidden">
        <ProductImage src={p.image} alt={p.name} categoryId={p.categoryId} className="transition-transform duration-500 group-hover:scale-105" />
        <FavoriteButton id={p.id} name={p.name} className="absolute left-3 top-3" />
        {!p.available && <span className="absolute bottom-3 right-3 rounded-full bg-espresso px-3 py-1 text-xs text-cream">ناموجود</span>}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-bold"><Link href={`/product/${p.slug}/`} className="after:absolute after:inset-0 after:content-['']">{p.name}</Link></h3>
        <p className="line-clamp-2 text-sm text-brown/80">{p.description}</p>
        <div className="mt-auto pt-2 text-sm"><Price p={p} /></div>
      </div>
    </article>
  );
}
