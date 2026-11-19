import type { Metadata } from "next";
import { Suspense } from "react";
import MenuClient from "@/components/menu/MenuClient";
export const metadata: Metadata = { title: "منو", description: "منوی کامل مانا: قهوه، چای، دسر، صبحانه و بیشتر." };
export default function MenuPage() { return <Suspense fallback={<p className="p-10 text-center">در حال بارگذاری منو…</p>}><MenuClient /></Suspense>; }
