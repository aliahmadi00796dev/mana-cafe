import type { Metadata } from "next";
import AdminClient from "@/components/admin/AdminClient";
export const metadata: Metadata = { title: "داشبورد نمایشی", robots: { index: false } };
export default function Admin() { return <AdminClient />; }
