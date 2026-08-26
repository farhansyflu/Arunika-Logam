"use client";

import DeleteButton from "@/components/admin/DeleteButton";
import { deleteGalleryItemAction } from "@/lib/actions/gallery";

export default function GalleryDeleteButton({ id }: { id: string }) {
  return (
    <DeleteButton
      confirmText="Yakin ingin menghapus foto ini?"
      onDelete={() => deleteGalleryItemAction(id)}
    />
  );
}
