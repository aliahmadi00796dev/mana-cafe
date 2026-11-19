"use client";
import { Clock, Instagram, MapPin, Phone } from "lucide-react";
import { useCafeInfo } from "@/hooks/useCatalog";
export default function InfoBlocks() {
  const [i] = useCafeInfo();
  const rows = [[Clock, "ساعات کاری", i.hours], [Phone, "تلفن", i.phone], [MapPin, "نشانی", i.address], [Instagram, "اینستاگرام", i.instagram]] as const;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {rows.map(([Icon, t, v]) => (
        <div key={t} className="flex gap-3 rounded-card bg-white p-5 shadow-soft"><Icon className="mt-1 shrink-0 text-caramel" size={20} /><div><h3 className="text-sm font-bold">{t}</h3><p className="text-sm text-brown/80">{v}</p></div></div>
      ))}
      <div className="grid min-h-40 place-items-center rounded-card border border-dashed border-caramel/60 bg-beige/30 text-sm text-brown sm:col-span-2">{i.mapNote}</div>
    </div>
  );
}
