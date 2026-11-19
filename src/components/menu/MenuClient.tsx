"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import ProductCard from "./ProductCard";
import { useCategories, useProducts } from "@/hooks/useCatalog";
import { finalPrice } from "@/lib/format";
export default function MenuClient() {
  const [products, , ready] = useProducts();
  const [cats] = useCategories();
  const init = useSearchParams().get("cat") ?? "";
  const [q, setQ] = useState(""); const [cat, setCat] = useState(init); const [temp, setTemp] = useState("");
  const [sort, setSort] = useState("pop"); const [featured, setFeatured] = useState(false); const [avail, setAvail] = useState(false);
  const list = useMemo(() => {
    const t = q.trim();
    const r = products.filter((p) => (!t || p.name.includes(t) || p.description.includes(t) || p.ingredients.some((i) => i.includes(t)))
      && (!cat || p.categoryId === cat) && (!temp || p.temp === temp || p.temp === "both") && (!featured || p.featured) && (!avail || p.available));
    return r.sort((a, b) => sort === "asc" ? finalPrice(a) - finalPrice(b) : sort === "desc" ? finalPrice(b) - finalPrice(a) : b.popularity - a.popularity);
  }, [products, q, cat, temp, sort, featured, avail]);
  const dirty = q || cat || temp || featured || avail || sort !== "pop";
  const clear = () => { setQ(""); setCat(""); setTemp(""); setFeatured(false); setAvail(false); setSort("pop"); };
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-black">منو</h1>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <label className="relative md:col-span-2"><span className="sr-only">جستجو</span><Search className="absolute right-3 top-3 text-coffee" size={18} /><input className="input pr-10" type="search" placeholder="جستجوی نوشیدنی یا غذا…" value={q} onChange={(e) => setQ(e.target.value)} /></label>
        <select aria-label="دسته‌بندی" className="input" value={cat} onChange={(e) => setCat(e.target.value)}><option value="">همهٔ دسته‌ها</option>{cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
        <select aria-label="مرتب‌سازی" className="input" value={sort} onChange={(e) => setSort(e.target.value)}><option value="pop">محبوب‌ترین</option><option value="asc">ارزان‌ترین</option><option value="desc">گران‌ترین</option></select>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
        <select aria-label="دما" className="input w-auto" value={temp} onChange={(e) => setTemp(e.target.value)}><option value="">گرم و سرد</option><option value="hot">گرم</option><option value="cold">سرد</option></select>
        <label className="flex items-center gap-2"><input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} /> ویژه‌ها</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={avail} onChange={(e) => setAvail(e.target.checked)} /> فقط موجود</label>
        {dirty && <button className="text-coffee underline" onClick={clear}>پاک کردن فیلترها</button>}
        <span className="mr-auto text-brown/70" aria-live="polite">{new Intl.NumberFormat("fa-IR").format(list.length)} مورد</span>
      </div>
      {!ready ? <p className="py-20 text-center">در حال بارگذاری…</p> : list.length === 0 ? (
        <div className="py-20 text-center"><p className="font-bold">موردی پیدا نشد.</p><p className="text-sm text-brown/70">عبارت دیگری را جستجو کنید یا فیلترها را پاک کنید.</p><button className="btn btn-dark mt-4" onClick={clear}>پاک کردن فیلترها</button></div>
      ) : <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>}
    </div>
  );
}
