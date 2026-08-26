"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "@/lib/clsx";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay animasi dalam ms — dipakai buat efek "stagger" di list/grid */
  delay?: number;
  /** Jarak geser awal sebelum fade-up, dalam px */
  offset?: number;
  as?: keyof JSX.IntrinsicElements;
};

// Komponen ini sengaja TIDAK pakai event "scroll" sama sekali.
// IntersectionObserver adalah API native browser yang jauh lebih hemat:
// browser sendiri yang memberi tahu kita saat elemen masuk viewport,
// tanpa kita harus terus-menerus menghitung posisi scroll.
//
// Hanya opacity + transform yang dianimasikan (GPU-accelerated,
// tidak memicu reflow/layout), dan observer berhenti mengamati
// begitu elemen pernah terlihat (animasi sekali saja, bukan tiap
// scroll naik-turun) — jadi aman dipakai di banyak elemen sekaligus.
export default function Reveal({
  children,
  className,
  delay = 0,
  offset = 24,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Hormati preferensi user yang mematikan animasi di OS/browser-nya
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el); // berhenti mengamati -> hemat resource
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as any;

  return (
    <Tag
      ref={ref}
      className={clsx("transition-[opacity,transform] duration-700 ease-out", className)}
      style={{
        opacity: visible ? 1 : 0.01,
        transform: visible ? "translateY(0)" : `translateY(${offset}px)`,
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
