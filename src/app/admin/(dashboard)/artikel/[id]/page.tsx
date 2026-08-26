import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ArticleForm from "@/components/admin/ArticleForm";
import { updateArticleAction } from "@/lib/actions/articles";
import { createClient } from "@/lib/supabase/server";
import type { Article } from "@/lib/types";

export const metadata = { title: "Edit Artikel" };

export default async function EditArtikelPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const [{ data: article }, { data: allCategories }] = await Promise.all([
    supabase.from("articles").select("*").eq("id", params.id).single(),
    supabase.from("articles").select("category"),
  ]);

  if (!article) notFound();

  const categoryOptions = Array.from(new Set((allCategories ?? []).map((r) => r.category)));
  const boundAction = updateArticleAction.bind(null, params.id);

  return (
    <div className="max-w-2xl">
      <Link href="/admin/artikel" className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-ink-900">
        <ArrowLeft size={15} /> Kembali ke daftar artikel
      </Link>

      <h1 className="text-2xl text-ink-900">Edit Artikel</h1>
      <p className="mt-1 text-sm text-muted">{article.title}</p>

      <div className="card mt-8 p-6 sm:p-8">
        <ArticleForm
          action={boundAction}
          article={article as Article}
          categoryOptions={categoryOptions}
        />
      </div>
    </div>
  );
}
