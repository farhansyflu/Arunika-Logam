"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

export default function DeleteButton({
  onDelete,
  confirmText = "Yakin ingin menghapus data ini?",
}: {
  onDelete: () => Promise<void>;
  confirmText?: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!window.confirm(confirmText)) return;
    startTransition(async () => {
      await onDelete();
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label="Hapus"
      className="flex h-9 w-9 items-center justify-center rounded-full text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
    >
      <Trash2 size={16} />
    </button>
  );
}
