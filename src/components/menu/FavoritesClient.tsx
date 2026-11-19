"use client";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useFavorites, useProducts } from "@/hooks/useCatalog";
export default function FavoritesClient() {
  const [products] = useProducts();
  const { favs, ready } = useFavorites();
  const list = products.filter((p) => favs.includes(p.id));
  return (
    <div className="mx-auto max-w-6xl px-4 py-10"><h1 className="text-3xl font-black">علاقه‌مندی‌ها</h1>
      {!ready ? <p className="py-16 text-center">در حال بارگذاری…</p> : list.length === 0 ? (
        <div className="py-20 text-center"><p className="font-bold">هنوز چیزی اضافه نکرده‌اید.</p><p className="text-sm text-brown/70">روی قلب هر محصول بزنید تا اینجا ذخیره شود.</p><Link href="/menu/" className="btn btn-dark mt-4">رفتن به منو</Link></div>
      ) : <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>}
    </div>
  );
}
