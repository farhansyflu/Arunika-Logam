import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Cara Order" };

export default function CaraOrderPage() {
  return (
    <Container className="py-16">
      <SectionTitle>Cara Order di Toko Kami</SectionTitle>

      <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-ink-900 p-8 text-cream-50 sm:p-10">
        <Section title="Hubungi Admin">
          <Step number={1}>Silahkan hubungi kami via Whatsapp, DM Instagram, atau Email</Step>
          <Step number={2}>Kirim desain gambar yang anda inginkan</Step>
          <Step number={3}>Diskusikan mengenai ukuran dan desain barang</Step>
          <Step number={4}>Negosiasikan harga</Step>
        </Section>

        <Section title="Catatan" className="mt-10">
          <Step number={1}>Jika barang merupakan Ready Stock, maka akan langsung dikirim setelah pembayaran</Step>
          <Step number={2}>Untuk pesanan custom, minimal pembayaran uang muka 50% dari total harga barang</Step>
          <Step number={3}>Pembayaran kekurangan atau pelunasan setelah dikirim invoice dan foto bahwa barang sudah jadi dan siap untuk dikirim</Step>
          <Step number={4}>Biaya pengiriman ditanggung sepenuhnya oleh pihak konsumen</Step>
        </Section>
      </div>
    </Container>
  );
}

function Section({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-2xl">{title}</h2>
      <ol className="mt-4 space-y-3">{children}</ol>
    </div>
  );
}

function Step({ number, children }: { number: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-[15px] text-cream-100/90">
      <span>{number}.</span>
      <span>{children}</span>
    </li>
  );
}
