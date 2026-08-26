export const SITE = {
  name: "Arunika Logam",
  tagline: "Brass and Copper Handicraft",
  description:
    "Melayani custom berbagai kerajinan kuningan, tembaga, dan lain-lain.",
  address: "Arunika Logam, Tumang Kulon RW 03 RW 12, Cepogo, Boyolali, Jawa Tengah",
  email: "arunikalogam@gmail.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6288228973096",
  instagram: "arunikalogam",
  mapUrl: "https://maps.app.goo.gl/3q1FtgFyBsgYg6if6",
};

// Catatan: link "Produk" sengaja mengarah ke /kategori dulu (Halaman Kategori),
// sesuai alur yang diminta: Home -> Kategori -> Produk -> Artikel Produk.
// Pencarian (SearchBar) adalah satu-satunya jalan pintas langsung ke /produk.
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/kategori", label: "Produk" },
  { href: "/cara-order", label: "Cara Order" },
  { href: "/galeri", label: "Galeri" },
  { href: "/kontak", label: "Kontak" },
];

export const ALL_CATEGORY_SLUG = "semua-produk";
export const ALL_CATEGORY_LABEL = "Semua Produk";

export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .trim()
    .replace(/&/g, "dan")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function waLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SITE.whatsapp}?text=${encoded}`;
}
