import { asset } from "@/lib/format";
export default function Logo({ dark = false, className = "h-12" }: { dark?: boolean; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={asset(`/images/branding/${dark ? "logo-full-dark" : "logo-full"}.svg`)} alt="مانا | MANA CAFÉ" className={className} />;
}
