"use client";
import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { useCafeInfo, useCategories, useProducts } from "@/hooks/useCatalog";
import { catalog } from "@/services/catalog";
import { DEFAULT_INFO } from "@/config/site";
import { KEYS, toman } from "@/lib/format";
import type { Product, Temp } from "@/types";

const blank = (categoryId: string): Product => ({ id: "", slug: "", name: "", description: "", price: 0, categoryId, image: `/images/categories/${categoryId}.svg`, imagePlaceholder: true, ingredients: [], size: "", temp: "hot", available: true, featured: false, popularity: 50 });
const fa = (n: number) => new Intl.NumberFormat("fa-IR").format(n);

export default function AdminClient() {
  const [products, setProducts] = useProducts();
  const [cats, setCats] = useCategories();
  const [info, setInfo] = useCafeInfo();
  const [q, setQ] = useState("");
  const [draft, setDraft] = useState<Product | null>(null);
  const [ing, setIng] = useState("");
  const [err, setErr] = useState("");
  const [newCat, setNewCat] = useState("");

  const upd = (id: string, patch: Partial<Product>) => setProducts(products.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const list = products.filter((p) => !q.trim() || p.name.includes(q.trim()) || p.slug.includes(q.trim().toLowerCase()));
  const stats = [["محصولات", products.length], ["موجود", products.filter((p) => p.available).length], ["ناموجود", products.filter((p) => !p.available).length], ["ویژه", products.filter((p) => p.featured).length]] as const;

  const save = () => {
    if (!draft) return;
    const d = { ...draft, ingredients: ing.split("،").map((s) => s.trim()).filter(Boolean), imagePlaceholder: draft.image.startsWith("/images/categories/") };
    if (!d.name.trim() || !/^[a-z0-9-]+$/.test(d.slug)) return setErr("نام و شناسهٔ لاتین (حروف کوچک، عدد و خط تیره) لازم است.");
    if (products.some((p) => p.slug === d.slug && p.id !== d.id)) return setErr("این شناسه قبلاً استفاده شده است.");
    if (d.id) setProducts(products.map((p) => (p.id === d.id ? d : p)));
    else setProducts([...products, { ...d, id: `p-${Date.now()}` }]);
    setDraft(null); setErr("");
  };
  const reset = () => {
    if (!confirm("همهٔ تغییرات نمایشی پاک و داده‌های اولیه بازگردانی شود؟")) return;
    setProducts(catalog.getProducts()); setCats(catalog.getCategories()); setInfo(DEFAULT_INFO);
    try { localStorage.removeItem(KEYS.favorites); window.dispatchEvent(new CustomEvent("mana-storage", { detail: KEYS.favorites })); } catch { /* ignore */ }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div role="note" className="mb-6 rounded-xl border border-caramel bg-beige/50 p-4 text-sm">
        <strong>داشبورد نمایشی (دمو).</strong> این صفحه ورود ندارد و امن نیست: تغییرات فقط در مرورگر همین دستگاه (LocalStorage) ذخیره می‌شود و برای بازدیدکنندگان دیگر دیده نمی‌شود. احراز هویت واقعی و مدیریت چندکاربره به بک‌اند نیاز دارد.
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-black">داشبورد</h1><button className="btn btn-line" onClick={reset}>بازنشانی داده‌های دمو</button></div>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">{stats.map(([t, n]) => <div key={t} className="rounded-card bg-white p-5 shadow-soft"><p className="text-sm text-brown/70">{t}</p><p className="text-3xl font-black">{fa(n)}</p></div>)}</div>

      <section className="mt-10"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-black">مدیریت محصولات</h2>
        <div className="flex gap-2"><input className="input w-56" type="search" aria-label="جستجوی محصول" placeholder="جستجو…" value={q} onChange={(e) => setQ(e.target.value)} /><button className="btn btn-dark" onClick={() => { setDraft(blank(cats[0]?.id ?? "")); setIng(""); setErr(""); }}>افزودن محصول</button></div></div>
        {draft && (
          <form className="mt-4 grid gap-3 rounded-card bg-white p-5 shadow-soft md:grid-cols-2" onSubmit={(e) => { e.preventDefault(); save(); }}>
            <label className="text-sm">نام<input className="input" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></label>
            <label className="text-sm">شناسهٔ لاتین (slug)<input className="input" dir="ltr" value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} /></label>
            <label className="text-sm">قیمت (تومان)<input className="input" type="number" min={0} value={draft.price} onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })} /></label>
            <label className="text-sm">دسته<select className="input" value={draft.categoryId} onChange={(e) => setDraft({ ...draft, categoryId: e.target.value })}>{cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
            <label className="text-sm">مسیر یا نشانی تصویر<input className="input" dir="ltr" value={draft.image} onChange={(e) => setDraft({ ...draft, image: e.target.value })} /></label>
            <label className="text-sm">اندازه<input className="input" value={draft.size} onChange={(e) => setDraft({ ...draft, size: e.target.value })} /></label>
            <label className="text-sm">دما<select className="input" value={draft.temp} onChange={(e) => setDraft({ ...draft, temp: e.target.value as Temp })}><option value="hot">گرم</option><option value="cold">سرد</option><option value="both">گرم یا سرد</option><option value="room">دمای محیط</option></select></label>
            <label className="text-sm">مواد (با «،» جدا کنید)<input className="input" value={ing} onChange={(e) => setIng(e.target.value)} /></label>
            <label className="text-sm md:col-span-2">توضیح<textarea className="input" rows={2} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} /></label>
            {err && <p role="alert" className="text-sm text-red-700 md:col-span-2">{err}</p>}
            <div className="flex gap-2 md:col-span-2"><button className="btn btn-dark">ذخیره</button><button type="button" className="btn btn-line" onClick={() => setDraft(null)}>انصراف</button></div>
          </form>
        )}
        <div className="mt-4 overflow-x-auto rounded-card bg-white shadow-soft">
          <table className="w-full min-w-[640px] text-sm"><thead className="bg-beige/50 text-right"><tr><th className="p-3">نام</th><th className="p-3">قیمت (تومان)</th><th className="p-3">موجود</th><th className="p-3">ویژه</th><th className="p-3"><span className="sr-only">عملیات</span></th></tr></thead>
            <tbody>{list.map((p) => (
              <tr key={p.id} className="border-t border-beige/60">
                <td className="p-3 font-medium">{p.name}<div className="text-xs text-brown/60">{toman(p.price)}</div></td>
                <td className="p-3"><input aria-label={`قیمت ${p.name}`} className="input w-32" type="number" min={0} value={p.price} onChange={(e) => upd(p.id, { price: Math.max(0, Number(e.target.value)) })} /></td>
                <td className="p-3"><input aria-label={`موجود بودن ${p.name}`} type="checkbox" checked={p.available} onChange={(e) => upd(p.id, { available: e.target.checked })} /></td>
                <td className="p-3"><input aria-label={`ویژه بودن ${p.name}`} type="checkbox" checked={p.featured} onChange={(e) => upd(p.id, { featured: e.target.checked })} /></td>
                <td className="flex gap-2 p-3">
                  <button aria-label={`ویرایش ${p.name}`} onClick={() => { setDraft(p); setIng(p.ingredients.join("، ")); setErr(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}><Pencil size={16} /></button>
                  <button aria-label={`حذف ${p.name}`} onClick={() => confirm(`«${p.name}» حذف شود؟`) && setProducts(products.filter((x) => x.id !== p.id))}><Trash2 size={16} /></button>
                </td></tr>))}</tbody></table>
        </div>
      </section>

      <section className="mt-10"><h2 className="mb-3 text-xl font-black">دسته‌بندی‌ها</h2>
        <ul className="grid gap-2 md:grid-cols-3">{cats.map((c) => (
          <li key={c.id} className="flex gap-2"><input aria-label={`نام دسته ${c.id}`} className="input" value={c.name} onChange={(e) => setCats(cats.map((x) => (x.id === c.id ? { ...x, name: e.target.value } : x)))} />
            <button aria-label={`حذف دستهٔ ${c.name}`} disabled={products.some((p) => p.categoryId === c.id)} title="دسته‌ای که محصول دارد حذف نمی‌شود" className="disabled:opacity-30" onClick={() => setCats(cats.filter((x) => x.id !== c.id))}><Trash2 size={16} /></button></li>))}</ul>
        <form className="mt-3 flex max-w-sm gap-2" onSubmit={(e) => { e.preventDefault(); const n = newCat.trim(); if (n) { setCats([...cats, { id: `cat-${Date.now()}`, name: n }]); setNewCat(""); } }}>
          <input className="input" placeholder="دستهٔ جدید" value={newCat} onChange={(e) => setNewCat(e.target.value)} /><button className="btn btn-dark">افزودن</button></form>
      </section>

      <section className="mt-10"><h2 className="mb-3 text-xl font-black">اطلاعات کافه</h2>
        <div className="grid gap-3 md:grid-cols-2">{(["phone", "address", "hours", "instagram", "mapNote"] as const).map((k) => (
          <label key={k} className="text-sm">{({ phone: "تلفن", address: "نشانی", hours: "ساعات کاری", instagram: "اینستاگرام", mapNote: "توضیح نقشه" })[k]}<input className="input" value={info[k]} onChange={(e) => setInfo({ ...info, [k]: e.target.value })} /></label>))}</div>
      </section>
    </div>
  );
}
