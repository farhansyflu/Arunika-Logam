import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import GalleryGrid from "@/components/catalog/GalleryGrid";
import Pagination from "@/components/catalog/Pagination";
import { getGallery } from "@/lib/queries";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Galeri" };

const PAGE_SIZE = 12;

export default async function GaleriPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, Number(searchParams.page) || 1);
  const { items, total } = await getGallery(page, PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <Container className="py-16">
      <SectionTitle>Galeri</SectionTitle>
      {items.length > 0 ? (
        <div className="mt-12">
          <GalleryGrid items={items} />
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-dashed border-line py-20 text-center text-sm text-muted">
          Belum ada foto galeri. Tambahkan lewat panel admin.
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} basePath="/galeri" />
    </Container>
   
  );
}
