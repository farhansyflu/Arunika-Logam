"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface GalleryFormState {
  error?: string;
}

export async function uploadGalleryImageAction(
  _prevState: GalleryFormState,
  formData: FormData
): Promise<GalleryFormState> {
  const supabase = createClient();
  const files = formData.getAll("images") as File[];
  const caption = String(formData.get("caption") ?? "").trim() || null;

  const validFiles = files.filter((f) => f && f.size > 0);
  if (validFiles.length === 0) {
    return { error: "Pilih minimal satu gambar." };
  }

  for (const file of validFiles) {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      return { error: `Gagal upload gambar: ${uploadError.message}` };
    }

    const { data } = supabase.storage.from("gallery").getPublicUrl(path);

    const { error: insertError } = await supabase.from("gallery").insert({
      image_url: data.publicUrl,
      caption,
    });

    if (insertError) {
      return { error: insertError.message };
    }
  }

  revalidatePath("/admin/galeri");
  revalidatePath("/galeri");
  revalidatePath("/");
  return {};
}

export async function deleteGalleryItemAction(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("gallery").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/galeri");
  revalidatePath("/galeri");
  revalidatePath("/");
}
