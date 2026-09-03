import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/catalog/ProductCard";
import Pagination from "@/components/catalog/Pagination";
import { getArticles, getCategories } from "@/lib/queries";
import { ALL_CATEGORY_SLUG } from "@/lib/constants";
import clsx from "@/lib/clsx";

export const metadata: Metadata = { title: "Produk" };

const PAGE_SIZE = 8;

export default async function ProdukPage({
  searchParams,
}: {
  searchParams: { kategori?: string; q?: string; page?: string };
}) {
  const page = Math.max(1, Number(searchParams.page) || 1);
  const categorySlug = searchParams.kategori;
  const search = searchParams.q;

  const [{ articles, total, categoryName }, categories] = await Promise.all([
    getArticles({ categorySlug, search, page, pageSize: PAGE_SIZE }),
    getCategories(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  let heading = "Semua Produk";
  if (search) heading = `Hasil pencarian: "${search}"`;
  else if (categoryName) heading = categoryName;

  return (
    <Container className="py-16">
      <SectionTitle>{heading}</SectionTitle>

      <div className="mt-12 grid gap-10 lg:grid-cols-[240px_1fr]">
        {/* Sidebar filter kategori */}
        <aside className="hidden lg:block">
          <div className="card sticky top-24 p-5">
            <p className="mb-4 text-sm text-muted">Filter Kategori</p>
            <ul className="space-y-1">
              {categories.map((cat) => {
                const active =
                  (categorySlug ?? ALL_CATEGORY_SLUG) === cat.slug && !search;
                return (
                  <li key={cat.slug}>
                    <Link
                      href={
                        cat.slug === ALL_CATEGORY_SLUG
                          ? "/produk"
                          : `/produk?kategori=${cat.slug}`
                      }
                      className={clsx(
                        "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                        active
                          ? "bg-ink-900 text-white"
                          : "text-ink-800 hover:bg-cream-200"
                      )}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs opacity-70">{cat.count}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <div className="min-w-0">
          {/* Filter kategori versi mobile (horizontal scroll) */}
          <div className="mb-6 flex gap-2 min-w-0 overflow-x-auto pb-2 lg:hidden">
            {categories.map((cat) => {
              const active = (categorySlug ?? ALL_CATEGORY_SLUG) === cat.slug && !search;
              return (
                <Link
                  key={cat.slug}
                  href={cat.slug === ALL_CATEGORY_SLUG ? "/produk" : `/produk?kategori=${cat.slug}`}
                  className={clsx(
                    "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
                    active
                      ? "border-ink-900 bg-ink-900 text-white"
                      : "border-line text-ink-800"
                  )}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 xl:gap-6 xl:grid-cols-3">
              {articles.map((article) => (
                <ProductCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-line py-20 text-center text-sm text-muted">
              Produk tidak ditemukan.
            </div>
          )}

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath="/produk"
            searchParams={{ kategori: categorySlug, q: search }}
          />

          <div className="mt-10 flex justify-end">
            <Link href="/kategori" className="btn-primary">
              Kategori Lainnya
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
