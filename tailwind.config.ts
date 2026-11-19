import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { espresso: "#241812", brown: "#493126", coffee: "#79563D", caramel: "#A77B56", beige: "#D9C4A5", cream: "#F6F0E7" },
    boxShadow: { soft: "0 10px 30px -12px rgba(36,24,18,.35)" },
    borderRadius: { card: "1.25rem" },
  } },
} satisfies Config;
