"use client";
import { useEffect, useState } from "react";
import { asset } from "@/lib/format";
export default function ProductImage({ src, alt, categoryId, className = "" }: { src: string; alt: string; categoryId: string; className?: string }) {
  const [s, setS] = useState(src);
  useEffect(() => setS(src), [src]);
  const fallback = `/images/categories/${categoryId}.svg`;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={asset(s)} alt={alt} loading="lazy" decoding="async" width={600} height={600} onError={() => s !== fallback && setS(fallback)} className={`aspect-square w-full bg-beige/40 object-cover ${className}`} />;
}
