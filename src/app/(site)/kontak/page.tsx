import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { SITE, waLink } from "@/lib/constants";
import { WhatsAppIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { Mail } from "lucide-react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Kontak" };

export default function KontakPage() {
  return (
    <Container className="py-16">
      <h1 className="text-5xl text-ink-900">Hubungi kami</h1>
      
      <p className="mt-4 max-w-xl text-lg text-muted">{SITE.description}</p>
      
      
      <div className="mt-10 grid overflow-hidden rounded-2xl bg-ink-900 text-cream-50 lg:grid-cols-2">
        <div className="space-y-6 p-8 sm:p-10">
          <ContactRow label="Email" value={SITE.email} href={`mailto:${SITE.email}`} icon={<Mail size={18} />} />
          <ContactRow
            label="Whatsapp"
            value={`+${SITE.whatsapp}`}
            href={waLink("Halo, saya mau tanya soal produk Arunika Logam")}
            icon={<WhatsAppIcon className="h-[18px] w-[18px]" />}
          />
          <ContactRow
            label="Instagram"
            value={SITE.instagram}
            href={`https://instagram.com/${SITE.instagram}`}
            icon={<InstagramIcon className="h-[18px] w-[18px]" />}
          />
          <div>
            <p className="text-cream-100/70">Lokasi :</p>
            <p className="mt-1 text-cream-50">{SITE.address}</p>
          </div>
        </div>

        <div className="flex items-center justify-center border-t border-white/10 p-10 lg:border-l lg:border-t-0">
         <Image
         src="/img/LOGO_VERTIKAL.png"
         alt="Logo"
         width={300}
         height={300}
         />
        </div>
      </div>
    </Container>
  );
}

function ContactRow({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-cream-100/70">{label} :</p>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-1 inline-flex items-center gap-2 text-cream-50 hover:text-brass-300"
      >
        {icon}
        {value}
      </a>
    </div>
  );
}
