"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { uploadGalleryImageAction, type GalleryFormState } from "@/lib/actions/gallery";

const initialState: GalleryFormState = {};

export default function GalleryUploadForm() {
  const [state, formAction] = useFormState(uploadGalleryImageAction, initialState);
  const [fileCount, setFileCount] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await formAction(formData);
        formRef.current?.reset();
        setFileCount(0);
      }}
      className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <label htmlFor="images" className="mb-1.5 block text-sm text-ink-800">
          Pilih Gambar (bisa lebih dari satu)
        </label>
        <input
          id="images"
          name="images"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setFileCount(e.target.files?.length ?? 0)}
          className="block w-full text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-ink-900 file:px-4 file:py-2 file:text-sm file:text-white hover:file:bg-brass-600"
        />
        {fileCount > 0 && (
          <p className="mt-1.5 text-xs text-muted">{fileCount} gambar dipilih</p>
        )}
        {state?.error && <p className="mt-1.5 text-xs text-red-600">{state.error}</p>}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary shrink-0 disabled:opacity-60">
      <UploadCloud size={16} /> {pending ? "Mengunggah..." : "Upload"}
    </button>
  );
}
