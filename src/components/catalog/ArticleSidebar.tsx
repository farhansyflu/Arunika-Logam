import Link from "next/link";
import type { Article } from "@/lib/types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticleSidebar({
  title = "Artikel Lainnya",
  articles,
}: {
  title?: string;
  articles: Article[];
}) {
  if (articles.length === 0) return null;

  return (
    <aside className="card h-fit p-6">
      <span className="mb-5 inline-block rounded-full bg-ink-900 px-4 py-2 text-sm text-white">
        {title}
      </span>
      <ul className="divide-y divide-line">
        {articles.map((a) => (
          <li key={a.id} className="py-4 first:pt-0 last:pb-0">
            <Link href={`/produk/${a.slug}`} className="group block">
              <h4 className="text-base leading-snug text-ink-900 group-hover:text-brass-500">
                {a.title}
              </h4>
              <p className="mt-1 text-xs text-muted">{formatDate(a.published_at)}</p>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{a.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
