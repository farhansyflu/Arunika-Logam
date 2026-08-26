import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import { SITE, waLink } from "@/lib/constants";
import { WhatsAppIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Image 
              src="/img/LOGO_HORIZONTAL.png" 
              alt="Logo" 
              width={300} 
              height={300}
              className="w-full h-auto max-w-[300px]"
              />
        </div>

        <div>
          <p className="mb-3 text-ink-900">Menu</p>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/kategori" className="hover:text-brass-500">Produk</Link></li>
            <li><Link href="/cara-order" className="hover:text-brass-500">Cara Order</Link></li>
            <li><Link href="/galeri" className="hover:text-brass-500">Galeri</Link></li>
            <li><Link href="/kontak" className="hover:text-brass-500">Kontak</Link></li>
          </ul>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={waLink("Halo, saya mau tanya-tanya soal produk Arunika Logam")}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-900 text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            <a
              href={`https://instagram.com/${SITE.instagram}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-900 text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-900 text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="mb-3 text-ink-900">Lokasi :</p>
          <p className="flex gap-2 text-sm text-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            {SITE.address}
          </p>
          <a
            href={SITE.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm text-ink-900 underline underline-offset-4 hover:text-brass-500"
          >
            View On Map
          </a>
        </div>
      </Container>

      <div className="border-t border-line py-5">
        <p className="text-center text-xs text-muted">
          © {new Date().getFullYear()} Developed by {SITE.name}, All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
