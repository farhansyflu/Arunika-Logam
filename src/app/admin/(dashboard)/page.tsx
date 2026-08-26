import Link from "next/link";
import { Newspaper, Images, PlusCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  const supabase = createClient();

  const [{ count: articleCount }, { count: galleryCount }] = await Promise.all([
    supabase.from("articles").select("*", { count: "exact", head: true }),
    supabase.from("gallery").select("*", { count: "exact", head: true }),
  ]);

  return (
    <div>
      <h1 className="text-2xl text-ink-900">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Ringkasan katalog Arunika Logam.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <StatCard
          icon={<Newspaper size={20} />}
          label="Total Artikel / Produk"
          value={articleCount ?? 0}
          href="/admin/artikel"
        />
        <StatCard
          icon={<Images size={20} />}
          label="Total Foto Galeri"
          value={galleryCount ?? 0}
          href="/admin/galeri"
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/admin/artikel/baru" className="btn-primary">
          <PlusCircle size={16} /> Tambah Artikel Baru
        </Link>
        <Link href="/admin/galeri" className="btn-outline">
          <PlusCircle size={16} /> Upload Foto Galeri
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link href={href} className="card flex items-center gap-4 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cream-200 text-ink-900">
        {icon}
      </div>
      <div>
        <p className="text-2xl text-ink-900">{value}</p>
        <p className="text-sm text-muted">{label}</p>
      </div>
    </Link>
  );
}
