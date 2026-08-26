"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "@/lib/clsx";

export default function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    // Sesuai requirement: search selalu langsung ke Halaman Produk,
    // melewati Halaman Kategori.
    router.push(q ? `/produk?q=${encodeURIComponent(q)}` : "/produk");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        "flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm",
        "focus-within:border-brass-400 transition-colors",
        className
      )}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Cari Produk..."
        className="w-full bg-transparent outline-none placeholder:text-muted"
      />
      <button
        type="submit"
        aria-label="Cari produk"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-900 text-cream-50 transition-transform active:scale-90"
      >
        <Search size={14} />
      </button>
    </form>
  );
}
