"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import type { GalleryItem } from "@/lib/types";
import Reveal from "../ui/Reveal";

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item)}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-line bg-cream-200"
          >
            <Image
              src={item.image_url}
              alt={item.caption ?? "Galeri Arunika Logam"}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
      

      {active && (
        <div
          className="fixed inset-0 z-[60] flex animate-fade-in items-center justify-center bg-ink-900/90 p-6"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Tutup"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setActive(null)}
          >
            <X size={20} />
          </button>
          <div className="relative h-[80vh] w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={active.image_url}
              alt={active.caption ?? "Galeri Arunika Logam"}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
