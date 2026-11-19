import Link from "next/link";
import { catalog } from "@/services/catalog";
import ProductCard from "@/components/menu/ProductCard";
import InfoBlocks from "@/components/common/InfoBlocks";
import { SITE } from "@/config/site";
const all = catalog.getProducts();
const cats = catalog.getCategories();
const Row = ({ title, items, note }: { title: string; items: typeof all; note?: string }) => (
  <section className="mx-auto max-w-6xl px-4 pt-20">
    <div className="mb-6 flex items-end justify-between"><div><h2 className="text-2xl font-black">{title}</h2>{note && <p className="text-sm text-brown/70">{note}</p>}</div><Link href="/menu/" className="text-sm font-bold text-coffee hover:underline">همهٔ منو</Link></div>
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
  </section>
);
const testimonials = [["نمونه ۱", "لاته‌شان همان چیزی است که برای شروع صبح می‌خواهم."], ["نمونه ۲", "فضای آرام و چیزکیکی که حسابی یادم می‌ماند."], ["نمونه ۳", "کلد برو را حتماً امتحان کنید."]];
export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-espresso text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="text-sm tracking-widest text-beige" dir="ltr">{SITE.taglineEn}</p>
            <h1 className="mt-4 text-7xl font-black leading-tight md:text-9xl">{SITE.name}</h1>
            <p className="mt-2 text-xl text-beige">{SITE.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/menu/" className="btn bg-caramel text-espresso hover:bg-beige">مشاهدهٔ منو</Link><Link href="/about/" className="btn border border-beige/50 text-cream hover:bg-brown">داستان مانا</Link></div>
          </div>
          <div className="relative mx-auto grid aspect-square w-full max-w-sm place-items-center rounded-full bg-brown/60">
            <svg viewBox="0 0 200 200" className="w-3/4" aria-hidden="true">
              {[70, 100, 130].map((x, i) => <path key={x} className="steam" style={{ animationDelay: `${i * 1.2}s` }} d={`M${x} 70 q-10 -14 0 -28 q10 -14 0 -28`} fill="none" stroke="#D9C4A5" strokeWidth="5" strokeLinecap="round" />)}
              <path d="M40 90 h120 v38 a50 50 0 0 1 -50 50 h-20 a50 50 0 0 1 -50 -50z" fill="#F6F0E7" />
              <path d="M160 102 h12 a16 16 0 0 1 0 32 h-16" fill="none" stroke="#F6F0E7" strokeWidth="9" />
              <ellipse cx="100" cy="92" rx="56" ry="8" fill="#79563D" />
            </svg>
            <p className="absolute bottom-6 text-xs text-beige/70">جایگزین عکس: تصویر اصلی کافه را اینجا قرار دهید</p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 pt-20 text-center"><h2 className="text-2xl font-black">لحظه‌ای برای قهوهٔ ناب</h2><p className="mt-3 text-brown/80">در مانا هر فنجان با دانهٔ تازه‌آسیاب‌شده و وقت کافی دم می‌شود؛ ساده، گرم و بی‌هیاهو.</p></section>
      <section className="mx-auto max-w-6xl px-4 pt-16"><h2 className="mb-6 text-2xl font-black">دسته‌بندی‌ها</h2>
        <ul className="flex flex-wrap gap-3">{cats.map((c) => <li key={c.id}><Link href={`/menu/?cat=${c.id}`} className="btn btn-line">{c.name}</Link></li>)}</ul></section>
      <Row title="محبوب‌ترین‌ها" items={all.filter((p) => p.featured).slice(0, 4)} />
      <Row title="پرفروش‌ها" items={[...all].sort((a, b) => b.popularity - a.popularity).slice(0, 4)} />
      <Row title="پیشنهاد فصل" note="نوشیدنی‌های گرم برای روزهای سرد" items={all.filter((p) => ["hot-chocolate", "herbal", "tea"].includes(p.categoryId) && p.available).slice(0, 4)} />
      <section className="mx-auto mt-20 max-w-6xl rounded-card bg-beige/50 px-6 py-12 md:px-12"><h2 className="text-2xl font-black">داستان مانا</h2><p className="mt-3 max-w-2xl text-brown/90">مانا با یک باور شروع شد: قهوهٔ خوب نیاز به عجله ندارد. با انتخاب دانه‌های برشته‌شدهٔ تازه و دم‌آوری دقیق، می‌خواهیم هر مهمان یک لحظهٔ آرام برای خودش داشته باشد.</p></section>
      <section className="mx-auto max-w-6xl px-4 pt-20"><h2 className="text-2xl font-black">نظر مشتریان</h2><p className="mb-6 text-sm text-brown/70">محتوای نمایشی؛ این نظرات واقعی نیستند.</p>
        <div className="grid gap-4 md:grid-cols-3">{testimonials.map(([n, t]) => <blockquote key={n} className="rounded-card bg-white p-6 shadow-soft"><p>{t}</p><footer className="mt-3 text-sm text-coffee">{n} (نمونه)</footer></blockquote>)}</div></section>
      <section className="mx-auto max-w-6xl px-4 pt-20"><h2 className="mb-6 text-2xl font-black">ساعت کاری و تماس</h2><InfoBlocks /></section>
      <section className="mx-auto max-w-6xl px-4 pt-20"><h2 className="mb-6 text-2xl font-black">مانا در اینستاگرام</h2>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6">{cats.slice(0, 6).map((c) => <div key={c.id} className="grid aspect-square place-items-center rounded-xl bg-beige/60 text-xs text-brown">{c.name}</div>)}</div><p className="mt-2 text-xs text-brown/60">جای نمونهٔ پست‌ها؛ بدون اتصال به اینستاگرام.</p></section>
    </>
  );
}
