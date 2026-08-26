import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ProductCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/produk/${article.slug}`}
      className="card group flex h-full flex-col overflow-hidden"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-200">
        <Image
          src={article.image_url}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="tag-chip w-fit">{article.category}</span>
        <h3 className="text-lg line-clamp-3 leading-snug text-ink-900">{article.title}</h3>
        <p className="line-clamp-3 text-sm text-muted">{article.description}</p>
        <p className="mt-auto pt-2 text-xs text-muted">{formatDate(article.published_at)}</p>
      </div>
    </Link>
  );
}
