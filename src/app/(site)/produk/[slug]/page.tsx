import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/catalog/ProductCard";
import ArticleSidebar from "@/components/catalog/ArticleSidebar";
import { getArticleBySlug, getOtherArticles, getRelatedArticles } from "@/lib/queries";
import { categoryToSlug, waLink } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description.slice(0, 150),
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArtikelProdukPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const [sidebarArticles, relatedArticles] = await Promise.all([
    getOtherArticles(article.slug, 4),
    getRelatedArticles(article.category, article.slug, 4),
  ]);

  return (
    <Container className="py-16">
      <nav className="mb-6 text-sm text-muted">
        <Link href={`/produk?kategori=${categoryToSlug(article.category)}`} className="hover:text-brass-500">
          {article.category}
        </Link>
        <span className="mx-2">{">"}</span>
        <span className="text-ink-900">{article.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <h1 className="text-4xl leading-tight text-ink-900 sm:text-5xl">{article.title}</h1>
          <p className="mt-3 text-sm text-muted">{formatDate(article.published_at)}</p>

          <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-cream-200">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-neutral mt-8 max-w-none whitespace-pre-line text-[15px] leading-relaxed text-ink-800">
            {article.description}
          </div>

          <a
            href={waLink(`Halo, saya tertarik dengan produk "${article.title}"`)}
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-8"
          >
            <MessageCircle size={16} /> Pesan via WhatsApp
          </a>

          {relatedArticles.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 text-2xl text-ink-900">Produk Terkait</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {relatedArticles.map((a) => (
                  <ProductCard key={a.id} article={a} />
                ))}
              </div>
            </div>
          )}
        </div>

        <ArticleSidebar articles={sidebarArticles} />
      </div>
    </Container>
  );
}
