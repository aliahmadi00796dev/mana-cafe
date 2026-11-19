import Link from "next/link";
import Logo from "@/components/common/Logo";
import { NAV, SITE } from "@/config/site";
export default function Footer() {
  return (
    <footer className="mt-24 bg-espresso text-beige">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div><Logo dark className="h-14" /><p className="mt-3 text-sm">{SITE.tagline}</p></div>
        <nav aria-label="پیوندهای پاورقی" className="flex flex-col gap-2 text-sm">{NAV.map(([h, l]) => <Link key={h} href={h} className="hover:text-white">{l}</Link>)}<Link href="/admin/" className="hover:text-white">داشبورد نمایشی</Link></nav>
        <p className="text-sm leading-7">این وب‌سایت یک پروژهٔ نمایشی است؛ نشانی، تلفن و نظرات مشتریان نمونه‌اند.</p>
      </div>
      <p className="border-t border-brown py-4 text-center text-xs">© مانا — طراحی و توسعه توسط PANDORUNT</p>
    </footer>
  );
}
