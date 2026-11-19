import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalog } from "@/services/catalog";
import ProductImage from "@/components/common/ProductImage";
import FavoriteButton from "@/components/common/FavoriteButton";
import ProductCard from "@/components/menu/ProductCard";
import Price from "@/components/common/Price";
import { TEMP_LABEL } from "@/lib/format";
export const dynamicParams = false;
export const generateStaticParams = () => catalog.getProducts().map((p) => ({ slug: p.slug }));
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = catalog.getProduct(params.slug);
  return p ? { title: p.name, description: p.description, openGraph: { title: `${p.name} | مانا`, description: p.description } } : {};
}
export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = catalog.getProduct(params.slug);
  if (!p) notFound();
  const cat = catalog.getCategories().find((c) => c.id === p.categoryId);
  const related = catalog.getRelated(p);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav aria-label="مسیر صفحه" className="mb-6 text-sm text-brown/70"><Link href="/">خانه</Link> / <Link href="/menu/">منو</Link> / <Link href={`/menu/?cat=${p.categoryId}`}>{cat?.name}</Link> / <span aria-current="page" className="text-espresso">{p.name}</span></nav>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-card shadow-soft"><ProductImage src={p.image} alt={p.name} categoryId={p.categoryId} /><FavoriteButton id={p.id} name={p.name} className="absolute left-4 top-4" /></div>
        <div>
          <h1 className="text-3xl font-black">{p.name}</h1>
          <div className="mt-3 text-lg"><Price p={p} /></div>
          <p className="mt-4">{p.description}</p>
          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl bg-white p-4"><dt className="text-brown/70">اندازه</dt><dd className="font-bold">{p.size}</dd></div>
            <div className="rounded-xl bg-white p-4"><dt className="text-brown/70">دما</dt><dd className="font-bold">{TEMP_LABEL[p.temp]}</dd></div>
            <div className="rounded-xl bg-white p-4"><dt className="text-brown/70">وضعیت</dt><dd className="font-bold">{p.available ? "موجود" : "ناموجود"}</dd></div>
            {p.prep && <div className="rounded-xl bg-white p-4"><dt className="text-brown/70">طرز تهیه</dt><dd className="font-bold">{p.prep}</dd></div>}
          </dl>
          <h2 className="mt-6 font-bold">مواد تشکیل‌دهنده</h2>
          <ul className="mt-2 flex flex-wrap gap-2">{p.ingredients.map((i) => <li key={i} className="rounded-full bg-beige/60 px-3 py-1 text-sm">{i}</li>)}</ul>
          <Link href="/menu/" className="btn btn-dark mt-8">بازگشت به منو</Link>
        </div>
      </div>
      {related.length > 0 && <section className="mt-16"><h2 className="mb-4 text-xl font-black">محصولات مرتبط</h2><div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div></section>}
    </div>
  );
}
