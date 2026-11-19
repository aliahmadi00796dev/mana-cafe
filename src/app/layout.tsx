import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE } from "@/config/site";
const font = Vazirmatn({ subsets: ["arabic", "latin"], display: "swap" });
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: "مانا؛ کافهٔ تخصصی قهوه با منوی کامل نوشیدنی، دسر و صبحانه. پروژهٔ نمایشی PANDORUNT.",
  icons: { icon: `${base}/images/branding/favicon.svg` },
  openGraph: { siteName: SITE.name, locale: "fa_IR", type: "website", images: [`${base}/images/branding/logo-full.svg`] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={font.className}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:right-3 focus:top-3 focus:z-50 focus:rounded focus:bg-white focus:p-3">پرش به محتوا</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
