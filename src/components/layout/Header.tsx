"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/common/Logo";
import { NAV } from "@/config/site";
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-beige/60 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
        <Link href="/" aria-label="مانا، صفحهٔ اصلی"><Logo className="h-11" /></Link>
        <nav aria-label="منوی اصلی" className="hidden gap-7 md:flex">
          {NAV.map(([h, l]) => <Link key={h} href={h} className="text-sm font-medium text-brown hover:text-caramel">{l}</Link>)}
        </nav>
        <button className="grid h-11 w-11 place-items-center md:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "بستن منو" : "باز کردن منو"} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="منوی موبایل" className="border-t border-beige bg-cream px-4 pb-4 md:hidden">
          {NAV.map(([h, l]) => <Link key={h} href={h} onClick={() => setOpen(false)} className="block border-b border-beige/60 py-3 font-medium">{l}</Link>)}
        </nav>
      )}
    </header>
  );
}
