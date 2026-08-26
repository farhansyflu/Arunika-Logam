import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ArticleForm from "@/components/admin/ArticleForm";
import { createArticleAction } from "@/lib/actions/articles";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Tambah Artikel" };

export default async function TambahArtikelPage() {
  const supabase = createClient();
  const { data } = await supabase.from("articles").select("category");
  const categoryOptions = Array.from(new Set((data ?? []).map((r) => r.category)));

  return (
    <div className="max-w-2xl">
      <Link href="/admin/artikel" className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-ink-900">
        <ArrowLeft size={15} /> Kembali ke daftar artikel
      </Link>

      <h1 className="text-2xl text-ink-900">Tambah Artikel Baru</h1>
      <p className="mt-1 text-sm text-muted">Isi detail produk/artikel di bawah ini.</p>

      <div className="card mt-8 p-6 sm:p-8">
        <ArticleForm action={createArticleAction} categoryOptions={categoryOptions} />
      </div>
    </div>
  );
}
