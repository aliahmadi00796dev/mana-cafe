import type { Product } from "@/types";
import { finalPrice, toman } from "@/lib/format";
export default function Price({ p }: { p: Product }) {
  return p.discount ? (
    <span className="flex flex-wrap items-baseline gap-2"><strong>{toman(finalPrice(p))}</strong><s className="text-xs text-coffee/70">{toman(p.price)}</s><span className="rounded bg-caramel/20 px-1.5 text-xs text-brown">٪{new Intl.NumberFormat("fa-IR").format(p.discount)} تخفیف</span></span>
  ) : <strong>{toman(p.price)}</strong>;
}
