"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ImagePlus,
  Loader2,
  RefreshCcw,
  Trash2,
  Upload,
} from "lucide-react";
import { safeJson } from "@/lib/http";

const categories: Record<string, string[]> = {
  "bride-groom": ["bride", "groom", "couple"],
  family: ["parents", "siblings", "portraits"],
  "friends-crew": ["bride-crew", "groom-crew", "party"],
  "guest-experience": [
    "vip-guests",
    "family-guests",
    "premium",
    "sunglasses-bar",
  ],
  "personal-occasion": ["birthday", "anniversary", "vacation", "corporate"],
};

type GalleryImage = {
  _id: string;
  imageUrl: string;
  categorySlug: string;
  sectionSlug: string;
};

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("bride-groom");
  const [section, setSection] = useState("bride");

  const previewFiles = useMemo(
    () =>
      files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      })),
    [files]
  );

  useEffect(() => {
    return () => {
      previewFiles.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previewFiles]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/gallery", {
        cache: "no-store",
      });
      const data = await safeJson<GalleryImage[]>(res, []);

      setImages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    setSection(categories[category][0]);
  }, [category]);

  const uploadImages = async () => {
    if (!files.length) return;

    try {
      setUploading(true);

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("categorySlug", category);
        formData.append("sectionSlug", section);

        const res = await fetch("/api/gallery/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error("Upload failed");
        }
      }

      setFiles([]);
      await fetchImages();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (id: string) => {
    const ok = confirm("Delete this image?");

    if (!ok) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      await fetchImages();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] px-6 pb-10 pt-28 text-white md:px-8 md:pt-32">
      <main className="mx-auto max-w-7xl">
        <section className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.32em] text-[#D9A05B]">
              Admin Dashboard
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Gallery Admin
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/55">
              Upload and organize gallery images by experience category and
              section.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchImages}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-[#151515] px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white/80 transition hover:border-[#D9A05B]/60 hover:text-[#D9A05B]"
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </button>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-white/10 bg-[#151515] p-6 shadow-2xl shadow-black/30 md:p-8">
            <div className="mb-7">
              <h2 className="text-2xl font-semibold">Upload Images</h2>
              <p className="mt-2 text-sm text-white/50">
                Select the destination first, then upload one or more images.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Category">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="admin-input"
                >
                  {Object.keys(categories).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Section">
                <select
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="admin-input"
                >
                  {categories[category]?.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <label className="mt-6 flex min-h-64 cursor-pointer items-center justify-center rounded-3xl border border-dashed border-white/15 bg-[#0A0A0A] p-8 text-center transition hover:border-[#D9A05B]/70">
              <div>
                <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D9A05B]/10 text-[#D9A05B]">
                  <ImagePlus className="h-8 w-8" />
                </span>
                <p className="text-lg font-semibold">Select Gallery Images</p>
                <p className="mt-2 text-sm text-white/45">
                  Multiple images supported
                </p>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-[#D9A05B]">
                  Browse files
                </p>
              </div>

              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={(e) => setFiles(Array.from(e.target.files || []))}
              />
            </label>

            {previewFiles.length > 0 && (
              <div className="mt-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-[#D9A05B]">
                    {previewFiles.length} image(s) selected
                  </p>
                  <button
                    type="button"
                    onClick={() => setFiles([])}
                    className="text-xs font-bold uppercase tracking-[0.16em] text-white/45 transition hover:text-white"
                  >
                    Clear
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {previewFiles.map((preview, index) => (
                    <div
                      key={`${preview.file.name}-${index}`}
                      className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-[#111]"
                    >
                      <Image
                        src={preview.url}
                        alt={preview.file.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={uploadImages}
              disabled={uploading || files.length === 0}
              className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#D9A05B] px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#111] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {uploading ? "Uploading" : "Upload Images"}
            </button>
          </div>

          <section className="rounded-3xl border border-white/10 bg-[#111111] p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Uploaded Images</h2>
                <p className="mt-2 text-sm text-white/50">
                  {images.length} images currently published
                </p>
              </div>
            </div>

            {loading ? (
              <div className="flex min-h-96 items-center justify-center rounded-2xl border border-white/10 bg-[#0A0A0A] text-white/50">
                <Loader2 className="mr-3 h-5 w-5 animate-spin text-[#D9A05B]" />
                Loading gallery
              </div>
            ) : images.length === 0 ? (
              <div className="flex min-h-96 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0A0A0A] p-8 text-center text-white/45">
                No gallery images uploaded yet.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {images.map((image) => (
                  <article
                    key={image._id}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] transition hover:border-[#D9A05B]/50"
                  >
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={image.imageUrl}
                        alt={image.sectionSlug}
                        fill
                        unoptimized
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-4">
                      <p className="truncate text-[10px] font-bold uppercase tracking-[0.18em] text-[#D9A05B]">
                        {image.categorySlug}
                      </p>
                      <p className="mt-2 truncate text-sm text-white/70">
                        {image.sectionSlug}
                      </p>

                      <button
                        type="button"
                        onClick={() => deleteImage(image._id)}
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}

function Field({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-white/55">
        {label}
      </span>
      {children}
    </label>
  );
}
