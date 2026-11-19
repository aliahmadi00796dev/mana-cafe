import type { CafeInfo } from "@/types";
export const SITE = { name: "مانا", latin: "MANA CAFÉ", tagline: "قهوه، آرامش و لحظه‌های ناب", taglineEn: "A MOMENT OF PURE COFFEE", url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000" };
// Sample data only: edit freely. No real address or phone number is used.
export const DEFAULT_INFO: CafeInfo = {
  phone: "۰۲۱-XXXXXXXX (نمونه)", address: "نشانی کافه در این بخش قرار می‌گیرد (نمونه)",
  hours: "همه روزه ۸:۰۰ تا ۲۳:۰۰", instagram: "@mana.cafe (نمونه)", mapNote: "محل نقشه (نمونه)",
};
export const NAV = [["/", "خانه"], ["/menu/", "منو"], ["/about/", "دربارهٔ ما"], ["/contact/", "تماس"], ["/favorites/", "علاقه‌مندی‌ها"]] as const;
