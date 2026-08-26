"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";
import type { Article } from "@/lib/types";
import type { ArticleFormState } from "@/lib/actions/articles";

type ActionFn = (state: ArticleFormState, formData: FormData) => Promise<ArticleFormState>;

const initialState: ArticleFormState = {};

export default function ArticleForm({
  action,
  article,
  categoryOptions,
}: {
  action: ActionFn;
  article?: Article;
  categoryOptions: string[];
}) {
  const [state, formAction] = useFormState(action, initialState);
  const [preview, setPreview] = useState<string | null>(article?.image_url ?? null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Judul" htmlFor="title">
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={article?.title}
            className="input"
            placeholder="Custom Jam Dinding Berbahan Kuningan"
          />
        </Field>

        <Field label="Tanggal" htmlFor="published_at">
          <input
            id="published_at"
            name="published_at"
            type="date"
            required
            defaultValue={article?.published_at ?? new Date().toISOString().slice(0, 10)}
            className="input"
          />
        </Field>

        <Field label="Kategori" htmlFor="category" className="sm:col-span-2">
          <input
            id="category"
            name="category"
            type="text"
            required
            list="category-options"
            defaultValue={article?.category}
            className="input"
            placeholder="Interior & Exterior"
          />
          <datalist id="category-options">
            {categoryOptions.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </Field>
      </div>

      <Field label="Deskripsi" htmlFor="description">
        <textarea
          id="description"
          name="description"
          required
          rows={6}
          defaultValue={article?.description}
          className="input resize-none"
          placeholder="Tuliskan deskripsi produk di sini..."
        />
      </Field>

      <Field label="Gambar" htmlFor="image">
        <div className="flex items-start gap-4">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl border border-dashed border-line bg-cream-100">
            {preview ? (
              <Image src={preview} alt="Preview" fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted">
                <ImagePlus size={22} />
              </div>
            )}
          </div>
          <div className="flex-1">
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-ink-900 file:px-4 file:py-2 file:text-sm file:text-white hover:file:bg-brass-600"
            />
            {article && (
              <p className="mt-2 text-xs text-muted">
                Kosongkan jika tidak ingin mengganti gambar.
              </p>
            )}
          </div>
        </div>
      </Field>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{state.error}</p>
      )}

      <SubmitButton isEdit={Boolean(article)} />
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm text-ink-800">
        {label}
      </label>
      {children}
    </div>
  );
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
      {pending ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Artikel"}
    </button>
  );
}
