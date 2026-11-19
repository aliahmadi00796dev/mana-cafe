import type { Metadata } from "next";
export const metadata: Metadata = { title: "دربارهٔ ما", description: "داستان، فلسفه و کیفیت مواد اولیه در مانا." };
const blocks = [["داستان مانا", "مانا از علاقه به قهوه‌ای ساده و صادقانه شروع شد؛ جایی که مهمان بدون عجله بنشیند و فنجانش را کامل بنوشد."], ["فلسفهٔ قهوه", "قهوهٔ خوب یعنی دانهٔ تازه، آسیاب درست و دم‌آوری دقیق. ما همین سه چیز را جدی می‌گیریم."], ["کیفیت و مواد اولیه", "شیر، میوه و نان را تازه تهیه می‌کنیم و دسرها را هر روز آماده می‌کنیم."], ["فضای کافه", "نور گرم، رنگ‌های قهوه‌ای و صندلی‌های راحت؛ فضایی برای گفت‌وگو یا کار آرام."]];
export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12"><h1 className="text-3xl font-black">دربارهٔ مانا</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-2">{blocks.map(([t, d]) => <section key={t} className="rounded-card bg-white p-6 shadow-soft"><h2 className="font-bold">{t}</h2><p className="mt-2 text-brown/80">{d}</p></section>)}</div>
      <p className="mt-6 text-sm text-brown/60">جای عکس‌های برند: تصاویر واقعی کافه را در public/images/banners قرار دهید.</p></div>
  );
}
