import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Wrench, BadgeDollarSign, ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/catalog/ProductCard";
import { getLatestArticles, getGalleryPreview } from "@/lib/queries";
import { SITE, waLink } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";

export default async function HomePage() {
  const [articles, galleryItems] = await Promise.all([
    getLatestArticles(8),
    getGalleryPreview(6),
  ]);

  return (
    <>
      {/* HERO */}
      <Reveal delay={80}>
      <section className="bg-cream">
        <Container className="grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <h1 className="px-1">ARUNIKA LOGAM</h1>
            <h1 className="text-5xl leading-[1.05] text-ink-900 sm:text-6xl">
              Brass and Copper Handicraft
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted">{SITE.description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="#produkterbaru" className="btn-primary">
                Lihat Produk
              </Link>
              <a href={waLink("Halo, saya mau tanya soal produk Arunika Logam")} target="_blank" rel="noreferrer" className="btn-outline">
                Hubungi Kami
              </a>
            </div>
          </div>
          
          <div>
            <Image
            src="/img/hero-img.png"
            alt="Kerajinan Kuningan dan Tembaga Arunika Logam"
            width={500}
            height={500}
            className="w-full h-auto max-w-[500px]"
            priority
            />
          </div>
        </Container>
      </section>
      </Reveal>

      {/* KENAPA MEMILIH KAMI */}
      <section className="py-20">
        <Container>
      <Reveal delay={80}>
          <SectionTitle>Kenapa memilih kami?</SectionTitle>
      </Reveal>
          <div className="mt-14 grid gap-12 sm:grid-cols-3">
            <Reveal delay={80}>
            <WhyCard
              icon={<Wrench className="h-8 w-8" strokeWidth={1.5} />}
              title="Custom Sesuai Keinginan"
              desc="Anda bisa memilih produk dari katalog kami, atau membawa desain sendiri dengan ukuran khusus sesuai dengan keinginan anda"
            />
            </Reveal>
            <Reveal delay={160}>
            <WhyCard
              icon={<BadgeDollarSign className="h-8 w-8" strokeWidth={1.5} />}
              title="Harga Terjangkau"
              desc="Kami menjamin akan memberi penawaran harga yang sesuai dengan kualitas produk yang terbaik"
            />
            </Reveal>
            <Reveal delay={240}>
            <WhyCard
              icon={<ShieldCheck className="h-8 w-8" strokeWidth={1.5} />}
              title="Aman dan Terpercaya"
              desc="Kami menjamin akan memberikan kualitas terbaik setiap produk, bagi kami kepercayaan adalah hal yang paling utama"
            />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* PRODUK TERBARU */}
      <section className="bg-cream py-20" id="produkterbaru">
        <Container>
          <Reveal delay={80}>
          <SectionTitle>Produk Terbaru</SectionTitle>
          </Reveal>
          {articles.length > 0 ? (
            <div className="mt-12 grid gap-3 lg:gap-6 grid-cols-2 lg:grid-cols-4">
              {articles.map((article, i) => (
                <Reveal key={article.id} delay={i * 80} className="h-full">
                  <ProductCard article={article} />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyNotice text="Belum ada produk. Tambahkan artikel pertama lewat panel admin." />
          )}
          <div className="mt-10 flex justify-end">
            <Link href="/kategori" className="btn-primary">
              Lihat Semua Produk <ArrowRight size={16} />
            </Link>
          </div>
        </Container>
      </section>

      {/* DOKUMENTASI / GALERI */}
      <section className="py-20">
        <Container>
          <Reveal delay={80}>
          <SectionTitle>Galeri</SectionTitle>
          </Reveal>
          {galleryItems.length > 0 ? (
            <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3">
              {galleryItems.map((item, i) => (
                <Reveal key={item.id} delay={i * 80}>
                <div
                  className="relative aspect-square overflow-hidden rounded-2xl bg-cream-200"
                >
                  <Image
                    src={item.image_url}
                    alt={item.caption ?? SITE.name}
                    fill
                    sizes="33vw"
                    className="object-cover"
                  />
                </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyNotice text="Belum ada foto galeri. Tambahkan lewat panel admin." />
          )}
          <div className="mt-10 flex justify-end">
            <Link href="/galeri" className="btn-primary">
              Lihat Galeri <ArrowRight size={16} />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

function WhyCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-5 text-ink-900">{icon}</div>
      <h3 className="text-xl text-ink-900">{title}</h3>
      <p className="mt-3 text-sm text-muted">{desc}</p>
    </div>
  );
}

function EmptyNotice({ text }: { text: string }) {
  return (
    <div className="mt-12 rounded-2xl border border-dashed border-line py-16 text-center text-sm text-muted">
      {text}
    </div>
  );
}
