# Arunika Logam — Website Katalog

Website katalog untuk **Arunika Logam** (Brass and Copper Handicraft), dibangun dengan **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase**.

## ✨ Fitur

- Halaman publik: Home, Kategori, Produk, Detail Artikel Produk, Galeri, Cara Order, Kontak
- Alur navigasi: **Home → Kategori → Produk → Artikel Produk**. Tombol/menu "Produk" selalu mengarah ke Halaman Kategori dulu. **Search selalu langsung ke Halaman Produk**, melewati Halaman Kategori.
- CRUD Artikel/Produk (Judul, Tanggal, Kategori, Gambar, Deskripsi) — lewat panel admin
- CRUD Galeri (upload banyak gambar sekaligus) — lewat panel admin
- Login admin dengan Supabase Auth, route `/admin/*` otomatis diproteksi middleware
- Upload gambar ke Supabase Storage (bucket `articles` & `gallery`, public-read)
- Dropdown menu mobile dengan animasi smooth (CSS grid-rows technique, tanpa library animasi tambahan)
- Font **Questrial** (via `next/font/google`)
- Ikon: **lucide-react** (ikon UI umum: search, menu, panah, dsb) + 2 ikon custom inline SVG untuk WhatsApp & Instagram (karena brand-icon ini tidak tersedia di lucide-react)

> **Catatan soal desain sumber:** file desain (`DEKSTOP_DESIGN.zip` / `MOBILE_DESIGN.zip`) yang diberikan berupa wireframe/mockup grayscale (placeholder gambar & teks, tanpa palet warna final). Struktur & layout di project ini mengikuti wireframe tersebut persis, sedangkan palet warna (cream/ink/brass) dan detail visual saya tentukan sendiri agar terasa premium & sesuai tema brass/copper. Semua token warna ada di `tailwind.config.ts` — gampang diganti kapan saja.

## 🧱 Struktur Data

**Tabel `articles`** (Data Artikel / Produk):
| Kolom | Tipe | Keterangan |
|---|---|---|
| title | text | Judul |
| published_at | date | Tanggal |
| category | text | Kategori (bebas, dipakai juga untuk Halaman Kategori) |
| image_url | text | Gambar (URL dari Supabase Storage) |
| description | text | Deskripsi |
| slug | text | Dibuat otomatis dari judul, dipakai di URL `/produk/[slug]` |

**Tabel `gallery`** (Data Galeri):
| Kolom | Tipe | Keterangan |
|---|---|---|
| image_url | text | Gambar |
| caption | text (opsional) | Keterangan gambar |

## 🚀 Cara Menjalankan

### 1. Install dependencies

```bash
npm install
```

### 2. Buat project Supabase

1. Buka [supabase.com](https://supabase.com) → buat project baru (gratis).
2. Buka **SQL Editor**, copy seluruh isi file `supabase/schema.sql`, lalu **Run**.
   Ini akan membuat tabel `articles` & `gallery`, storage bucket `articles` & `gallery`, serta RLS policy yang sesuai (publik hanya bisa baca, admin yang login bisa CRUD).
3. Buka **Authentication → Users → Add User**, buat 1 akun admin (email + password). Akun inilah yang dipakai login di `/admin/login`. Tidak ada halaman registrasi publik — sengaja, supaya cuma kamu yang bisa akses admin.

### 3. Isi environment variable

Copy `.env.local.example` menjadi `.env.local`:

```bash
cp .env.local.example .env.local
```

Isi dengan kredensial dari **Supabase Dashboard → Project Settings → API**:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_WHATSAPP_NUMBER=6288228973096
```

### 4. Jalankan development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk situs publik, dan [http://localhost:3000/admin/login](http://localhost:3000/admin/login) untuk login admin.

### 5. Deploy

Paling gampang deploy ke **Vercel**:

```bash
npm i -g vercel
vercel
```

Jangan lupa tambahkan environment variable yang sama di dashboard Vercel (Project Settings → Environment Variables).

## 📁 Struktur Folder Penting

```
src/
  app/
    (site)/            → semua halaman publik (Header + Footer otomatis)
      page.tsx          → Home
      kategori/         → Halaman Kategori
      produk/            → Halaman Produk (list, filter, search)
        [slug]/          → Halaman Artikel Produk (detail)
      galeri/            → Halaman Galeri
      cara-order/        → Halaman Cara Order
      kontak/            → Halaman Kontak
    admin/
      login/             → Login admin (tanpa sidebar)
      (dashboard)/       → Semua halaman admin (dengan sidebar), diproteksi middleware
        page.tsx          → Dashboard
        artikel/          → List, tambah, edit artikel
        galeri/           → List, upload, hapus galeri
  components/
    site/                → Header, Footer, SearchBar
    catalog/             → ProductCard, CategoryCard, Pagination, dll
    admin/                → Form & komponen khusus admin
    ui/                    → Container, SectionTitle, ikon brand
  lib/
    supabase/            → Setup client Supabase (browser, server, middleware)
    actions/               → Server Actions (auth, CRUD artikel, CRUD galeri)
    queries.ts             → Fungsi query data untuk halaman publik
    constants.ts            → Info situs, nav links, helper WhatsApp link
supabase/
  schema.sql              → Skema database lengkap, tinggal di-run sekali
```

## 🎨 Mengubah Warna / Tema

Semua token warna ada di `tailwind.config.ts` bagian `colors`:
- `cream` — warna latar
- `ink` — warna teks/gelap utama
- `brass` — warna aksen (kuningan/emas)

Ubah nilai hex-nya sesuai kebutuhan, seluruh komponen akan otomatis mengikuti.

## 🔧 Kustomisasi Lanjutan

- **Ganti nomor WhatsApp / alamat / email**: edit `src/lib/constants.ts` (objek `SITE`).
- **Tambah kategori baru**: kategori tidak disimpan di tabel terpisah — otomatis muncul begitu kamu menambahkan artikel dengan nama kategori baru lewat admin.
- **Ubah jumlah produk per halaman**: konstanta `PAGE_SIZE` di `src/app/(site)/produk/page.tsx` dan `src/app/(site)/galeri/page.tsx`.
