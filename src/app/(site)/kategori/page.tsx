import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import CategoryCard from "@/components/catalog/CategoryCard";
import { getCategories } from "@/lib/queries";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Kategori Produk" };

export default async function KategoriPage() {
  const categories = await getCategories();

  return (
    <Container className="py-16">
      <SectionTitle>Kategori Produk</SectionTitle>

      {categories.length > 0 ? (
        <div className="mt-12 grid grid-cols-2 gap-3 lg:gap-6 lg:grid-cols-3">
          {categories.map((category, i) => (
              <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-dashed border-line py-16 text-center text-sm text-muted">
          Belum ada kategori. Tambahkan artikel/produk lewat panel admin terlebih dahulu.
        </div>
      )}
    </Container>
  );
}
