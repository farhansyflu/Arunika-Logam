import Image from "next/image";
import Link from "next/link";
import type { CategorySummary } from "@/lib/types";

export default function CategoryCard({ category }: { category: CategorySummary }) {
  return (
    <Link
      href={`/produk?kategori=${category.slug}`}
      className="card group flex h-full flex-col overflow-hidden"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-200">
        {category.image_url ? (
          <Image
            src={category.image_url}
            alt={category.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="p-5 text-center">
        <h3 className="text-lg text-ink-900">{category.name}</h3>
        <p className="text-xs text-muted">{category.count} produk</p>
      </div>
    </Link>
  );
}
