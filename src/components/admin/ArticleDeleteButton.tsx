"use client";

import DeleteButton from "@/components/admin/DeleteButton";
import { deleteArticleAction } from "@/lib/actions/articles";

export default function ArticleDeleteButton({ id }: { id: string }) {
  return (
    <DeleteButton
      confirmText="Yakin ingin menghapus artikel ini? Tindakan ini tidak bisa dibatalkan."
      onDelete={() => deleteArticleAction(id)}
    />
  );
}
