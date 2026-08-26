import Image from "next/image";
import Link from "next/link";
import { PlusCircle, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Article } from "@/lib/types";
import ArticleDeleteButton from "@/components/admin/ArticleDeleteButton";

export const metadata = { title: "Kelola Artikel" };

export default async function AdminArtikelPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  const articles = (data as Article[]) ?? [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl text-ink-900">Artikel / Produk</h1>
          <p className="mt-1 text-sm text-muted">{articles.length} data</p>
        </div>
        <Link href="/admin/artikel/baru" className="btn-primary">
          <PlusCircle size={16} /> Tambah Artikel
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white">
        {articles.length === 0 ? (
          <p className="p-10 text-center text-sm text-muted">
            Belum ada artikel. Klik &quot;Tambah Artikel&quot; untuk membuat yang pertama.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-cream-100 text-muted">
              <tr>
                <th className="px-5 py-3 font-normal">Gambar</th>
                <th className="px-5 py-3 font-normal">Judul</th>
                <th className="px-5 py-3 font-normal">Kategori</th>
                <th className="px-5 py-3 font-normal">Tanggal</th>
                <th className="px-5 py-3 font-normal text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {articles.map((article) => (
                <tr key={article.id}>
                  <td className="px-5 py-3">
                    <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-cream-200">
                      <Image src={article.image_url} alt={article.title} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="max-w-xs px-5 py-3 text-ink-900">{article.title}</td>
                  <td className="px-5 py-3 text-muted">{article.category}</td>
                  <td className="px-5 py-3 text-muted">
                    {new Date(article.published_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/artikel/${article.id}`}
                        aria-label="Edit"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-ink-800 hover:bg-cream-200"
                      >
                        <Pencil size={16} />
                      </Link>
                      <ArticleDeleteButton id={article.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
