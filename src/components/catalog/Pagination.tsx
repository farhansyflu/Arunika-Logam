import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "@/lib/clsx";

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  function hrefFor(page: number) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams ?? {})) {
      if (value) params.set(key, value);
    }
    params.set("page", String(page));
    return `${basePath}?${params.toString()}`;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  const items: (number | "...")[] = [];
  let prev = 0;
  for (const p of pages) {
    if (prev && p - prev > 1) items.push("...");
    items.push(p);
    prev = p;
  }

  return (
    <nav className="mt-12 flex items-center justify-center gap-2">
      <Link
        href={hrefFor(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={clsx(
          "flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 text-white transition-opacity",
          currentPage === 1 && "pointer-events-none opacity-40"
        )}
      >
        <ChevronLeft size={16} />
      </Link>

      {items.map((item, i) =>
        item === "..." ? (
          <span key={`dots-${i}`} className="px-1 text-muted">
            …
          </span>
        ) : (
          <Link
            key={item}
            href={hrefFor(item)}
            className={clsx(
              "flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm transition-colors",
              item === currentPage
                ? "bg-ink-900 text-white"
                : "border border-line text-ink-900 hover:bg-cream-200"
            )}
          >
            {String(item).padStart(2, "0")}
          </Link>
        )
      )}

      <Link
        href={hrefFor(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={clsx(
          "flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 text-white transition-opacity",
          currentPage === totalPages && "pointer-events-none opacity-40"
        )}
      >
        <ChevronRight size={16} />
      </Link>
    </nav>
  );
}
