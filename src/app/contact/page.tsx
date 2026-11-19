import type { Metadata } from "next";
import InfoBlocks from "@/components/common/InfoBlocks";
export const metadata: Metadata = { title: "تماس با ما", description: "ساعات کاری، نشانی و راه‌های ارتباط با مانا." };
export default function Contact() {
  return <div className="mx-auto max-w-4xl px-4 py-12"><h1 className="mb-2 text-3xl font-black">تماس با ما</h1><p className="mb-8 text-sm text-brown/70">اطلاعات زیر نمونه است و از داشبورد نمایشی قابل ویرایش است.</p><InfoBlocks /></div>;
}
