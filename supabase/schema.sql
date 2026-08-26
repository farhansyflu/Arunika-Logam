-- =========================================================
-- ARUNIKA LOGAM — SKEMA SUPABASE
-- Jalankan seluruh file ini di Supabase Dashboard > SQL Editor
-- =========================================================

-- Pastikan ekstensi untuk generate UUID tersedia
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------
-- TABEL: articles  (Data Artikel / Produk)
-- Judul, Tanggal, Kategori, Gambar, Deskripsi
-- ---------------------------------------------------------
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  image_url text not null,
  description text not null default '',
  published_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_category_idx on public.articles (category);
create index if not exists articles_published_at_idx on public.articles (published_at desc);

-- ---------------------------------------------------------
-- TABEL: gallery  (Data Galeri)
-- Gambar
-- ---------------------------------------------------------
create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- Trigger updated_at otomatis untuk articles
-- ---------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_articles_updated_at on public.articles;
create trigger trg_articles_updated_at
  before update on public.articles
  for each row execute procedure public.set_updated_at();

-- ---------------------------------------------------------
-- ROW LEVEL SECURITY
-- Publik hanya boleh membaca (SELECT).
-- Tambah/ubah/hapus hanya boleh oleh user yang sudah login (admin).
-- ---------------------------------------------------------
alter table public.articles enable row level security;
alter table public.gallery enable row level security;

drop policy if exists "Public read articles" on public.articles;
create policy "Public read articles"
  on public.articles for select
  using (true);

drop policy if exists "Authenticated manage articles" on public.articles;
create policy "Authenticated manage articles"
  on public.articles for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Public read gallery" on public.gallery;
create policy "Public read gallery"
  on public.gallery for select
  using (true);

drop policy if exists "Authenticated manage gallery" on public.gallery;
create policy "Authenticated manage gallery"
  on public.gallery for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------
-- STORAGE BUCKETS
-- Bucket 'articles' untuk gambar artikel/produk,
-- bucket 'gallery' untuk gambar galeri.
-- Keduanya public-read, upload/hapus hanya untuk user login.
-- ---------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('articles', 'articles', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

drop policy if exists "Public read articles bucket" on storage.objects;
create policy "Public read articles bucket"
  on storage.objects for select
  using (bucket_id = 'articles');

drop policy if exists "Authenticated upload articles bucket" on storage.objects;
create policy "Authenticated upload articles bucket"
  on storage.objects for insert
  with check (bucket_id = 'articles' and auth.role() = 'authenticated');

drop policy if exists "Authenticated update articles bucket" on storage.objects;
create policy "Authenticated update articles bucket"
  on storage.objects for update
  using (bucket_id = 'articles' and auth.role() = 'authenticated');

drop policy if exists "Authenticated delete articles bucket" on storage.objects;
create policy "Authenticated delete articles bucket"
  on storage.objects for delete
  using (bucket_id = 'articles' and auth.role() = 'authenticated');

drop policy if exists "Public read gallery bucket" on storage.objects;
create policy "Public read gallery bucket"
  on storage.objects for select
  using (bucket_id = 'gallery');

drop policy if exists "Authenticated upload gallery bucket" on storage.objects;
create policy "Authenticated upload gallery bucket"
  on storage.objects for insert
  with check (bucket_id = 'gallery' and auth.role() = 'authenticated');

drop policy if exists "Authenticated update gallery bucket" on storage.objects;
create policy "Authenticated update gallery bucket"
  on storage.objects for update
  using (bucket_id = 'gallery' and auth.role() = 'authenticated');

drop policy if exists "Authenticated delete gallery bucket" on storage.objects;
create policy "Authenticated delete gallery bucket"
  on storage.objects for delete
  using (bucket_id = 'gallery' and auth.role() = 'authenticated');

-- ---------------------------------------------------------
-- CONTOH DATA (opsional, boleh dihapus)
-- ---------------------------------------------------------
insert into public.articles (title, slug, category, image_url, description, published_at)
values
  (
    'Custom Jam Dinding Berbahan Kuningan',
    'custom-jam-dinding-berbahan-kuningan',
    'Interior & Exterior',
    'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=800',
    'Jam dinding custom berbahan kuningan solid dengan finishing gold brushed. Cocok untuk mempercantik ruang tamu maupun ruang kerja.',
    current_date
  ),
  (
    'Bokor Siraman Ukir Tembaga',
    'bokor-siraman-ukir-tembaga',
    'Bokor Siraman',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
    'Bokor siraman dengan ukiran tangan khas Boyolali, berbahan tembaga dan kuningan pilihan.',
    current_date
  )
on conflict (slug) do nothing;
