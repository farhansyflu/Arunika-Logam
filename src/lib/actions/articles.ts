"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";

export interface ArticleFormState {
  error?: string;
}

async function uploadArticleImage(
  supabase: ReturnType<typeof createClient>,
  file: File
): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage.from("articles").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    throw new Error(`Gagal upload gambar: ${error.message}`);
  }

  const { data } = supabase.storage.from("articles").getPublicUrl(path);
  return data.publicUrl;
}

async function uniqueSlug(
  supabase: ReturnType<typeof createClient>,
  title: string,
  excludeId?: string
): Promise<string> {
  const base = slugify(title, { lower: true, strict: true });
  let candidate = base;
  let i = 1;

  // Loop sampai menemukan slug yang belum dipakai artikel lain
  while (true) {
    let query = supabase.from("articles").select("id").eq("slug", candidate);
    if (excludeId) query = query.neq("id", excludeId);
    const { data } = await query.maybeSingle();
    if (!data) return candidate;
    i += 1;
    candidate = `${base}-${i}`;
  }
}

export async function createArticleAction(
  _prevState: ArticleFormState,
  formData: FormData
): Promise<ArticleFormState> {
  const supabase = createClient();

  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const published_at = String(formData.get("published_at") ?? "");
  const imageFile = formData.get("image") as File | null;

  if (!title || !category || !description || !published_at) {
    return { error: "Semua field wajib diisi." };
  }
  if (!imageFile || imageFile.size === 0) {
    return { error: "Gambar wajib diupload." };
  }

  try {
    const slug = await uniqueSlug(supabase, title);
    const image_url = await uploadArticleImage(supabase, imageFile);

    const { error } = await supabase.from("articles").insert({
      title,
      slug,
      category,
      description,
      published_at,
      image_url,
    });

    if (error) return { error: error.message };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Terjadi kesalahan." };
  }

  revalidatePath("/admin/artikel");
  revalidatePath("/");
  revalidatePath("/produk");
  revalidatePath("/kategori");
  redirect("/admin/artikel");
}

export async function updateArticleAction(
  id: string,
  _prevState: ArticleFormState,
  formData: FormData
): Promise<ArticleFormState> {
  const supabase = createClient();

  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const published_at = String(formData.get("published_at") ?? "");
  const imageFile = formData.get("image") as File | null;

  if (!title || !category || !description || !published_at) {
    return { error: "Semua field wajib diisi." };
  }

  try {
    const slug = await uniqueSlug(supabase, title, id);

    const updates: Record<string, unknown> = {
      title,
      slug,
      category,
      description,
      published_at,
    };

    if (imageFile && imageFile.size > 0) {
      updates.image_url = await uploadArticleImage(supabase, imageFile);
    }

    const { error } = await supabase.from("articles").update(updates).eq("id", id);
    if (error) return { error: error.message };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Terjadi kesalahan." };
  }

  revalidatePath("/admin/artikel");
  revalidatePath("/");
  revalidatePath("/produk");
  revalidatePath("/kategori");
  redirect("/admin/artikel");
}

export async function deleteArticleAction(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/artikel");
  revalidatePath("/");
  revalidatePath("/produk");
  revalidatePath("/kategori");
}
