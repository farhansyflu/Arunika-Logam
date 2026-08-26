"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import SearchBar from "@/components/site/SearchBar";
import { NAV_LINKS, SITE } from "@/lib/constants";
import clsx from "@/lib/clsx";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Tutup menu otomatis setiap kali pindah halaman
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Kunci scroll body saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <Container className="flex h-[76px] items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-4">
          <Image 
            src="/img/LOGO_HITAM.png" 
            alt="Logo" 
            width={30} 
            height={30} 
            className="h-10 w-auto object-contain"
          />
          <span className="text-xl tracking-wide text-ink-900">{SITE.name.toUpperCase()}</span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "text-[15px] transition-colors hover:text-brass-500",
                  active ? "text-ink-900" : "text-ink-800/80"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block lg:w-64">
          <SearchBar />
        </div>

        {/* Tombol hamburger mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-cream-200 lg:hidden"
        >
          <Menu
            size={22}
            className={clsx(
              "absolute transition-all duration-300",
              open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            )}
          />
          <X
            size={22}
            className={clsx(
              "absolute transition-all duration-300",
              open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            )}
          />
        </button>
      </Container>

      {/* Dropdown mobile — animasi smooth pakai grid-rows trick (0fr -> 1fr) */}
      <div
        className={clsx(
          "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0">
          <div
            className={clsx(
              "border-t border-line bg-white transition-opacity duration-300",
              open ? "opacity-100 delay-100" : "opacity-0"
            )}
          >
            <Container className="flex flex-col gap-1 py-5">
              <div className="mb-3">
                <SearchBar />
              </div>
              {NAV_LINKS.map((link, i) => {
                const active =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
                    className={clsx(
                      "rounded-xl px-3 py-3 text-base transition-all duration-300",
                      open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
                      active
                        ? "bg-cream-200 text-ink-900"
                        : "text-ink-800/85 hover:bg-cream-100"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </Container>
          </div>
        </div>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M14 4L4 28h4.2l2.1-5.4h9.4L21.8 28H26L16 4h-2zm-2.3 15L16 8.6 20.3 19h-8.6z" fill="#1B1812" />
    </svg>
  );
}
