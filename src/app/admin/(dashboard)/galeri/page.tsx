import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import type { GalleryItem } from "@/lib/types";
import GalleryUploadForm from "@/components/admin/GalleryUploadForm";
import GalleryDeleteButton from "@/components/admin/GalleryDeleteButton";

export const metadata = { title: "Kelola Galeri" };

export default async function AdminGaleriPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });

  const items = (data as GalleryItem[]) ?? [];

  return (
    <div>
      <h1 className="text-2xl text-ink-900">Galeri</h1>
      <p className="mt-1 text-sm text-muted">{items.length} foto</p>

      <div className="mt-6">
        <GalleryUploadForm />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="group relative aspect-square overflow-hidden rounded-2xl border border-line bg-cream-200">
            <Image src={item.image_url} alt={item.caption ?? "Galeri"} fill className="object-cover" />
            <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="rounded-full bg-white shadow-soft">
                <GalleryDeleteButton id={item.id} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p className="mt-8 rounded-2xl border border-dashed border-line py-16 text-center text-sm text-muted">
          Belum ada foto. Upload foto pertama lewat form di atas.
        </p>
      )}
    </div>
  );
}
