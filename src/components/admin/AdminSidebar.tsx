"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Newspaper, Images, LogOut } from "lucide-react";
import clsx from "@/lib/clsx";
import { logoutAction } from "@/lib/actions/auth";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/artikel", label: "Artikel / Produk", icon: Newspaper },
  { href: "/admin/galeri", label: "Galeri", icon: Images },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-line bg-white p-5">
      <div className="mb-8 px-2">
        <p className="text-lg text-ink-900">Arunika Logam</p>
        <p className="text-xs text-muted">Panel Admin</p>
      </div>

      <nav className="flex-1 space-y-1">
        {LINKS.map((link) => {
          const active =
            link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                active ? "bg-ink-900 text-white" : "text-ink-800 hover:bg-cream-200"
              )}
            >
              <Icon size={17} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <form action={logoutAction}>
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-800 transition-colors hover:bg-cream-200"
        >
          <LogOut size={17} />
          Keluar
        </button>
      </form>
    </aside>
  );
}
