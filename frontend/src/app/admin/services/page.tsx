"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ImagePlus,
  Loader2,
  Plus,
  RefreshCcw,
  Trash2,
} from "lucide-react";
import { safeJson } from "@/lib/http";

type Service = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  image: string;
  includes: string[];
};

type FormData = {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  includes: string;
};

const emptyForm: FormData = {
  title: "",
  slug: "",
  category: "",
  shortDescription: "",
  description: "",
  includes: "",
};

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/services", {
        cache: "no-store",
      });
      const data = await safeJson(res, []);

      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setServices([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const updateForm = (key: keyof FormData, value: string) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const uploadImage = async () => {
    if (!imageFile) return "";

    const formData = new FormData();
    formData.append("file", imageFile);

    const res = await fetch("/api/services/upload", {
      method: "POST",
      body: formData,
    });

    const data = await safeJson<{ error?: string; url?: string }>(res, {});

    if (!res.ok) {
      throw new Error(data.error || "Upload failed");
    }

    return data.url || "";
  };

  const createService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSaving(true);
      const imageUrl = await uploadImage();

      if (!imageUrl) {
        alert("Please select an image");
        return;
      }

      const res = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          slug: form.slug,
          category: form.category,
          shortDescription: form.shortDescription,
          description: form.description,
          image: imageUrl,
          includes: form.includes
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        }),
      });

      if (!res.ok) {
        const err = await safeJson<{ error?: string }>(res, {});
        throw new Error(err.error || "Failed to create service");
      }

      setForm(emptyForm);
      setImageFile(null);
      await loadServices();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm("Delete service?")) return;

    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      await loadServices();
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
              Manage Services
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/55">
              Add, review, and remove styling services that appear across the
              website.
            </p>
          </div>

          <button
            type="button"
            onClick={loadServices}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-[#151515] px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white/80 transition hover:border-[#D9A05B]/60 hover:text-[#D9A05B]"
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </button>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <form
            onSubmit={createService}
            className="rounded-3xl border border-white/10 bg-[#151515] p-6 shadow-2xl shadow-black/30 md:p-8"
          >
            <div className="mb-7">
              <h2 className="text-2xl font-semibold">Create Service</h2>
              <p className="mt-2 text-sm text-white/50">
                Fill the details exactly as they should appear on the site.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Title">
                <input
                  required
                  value={form.title}
                  onChange={(e) => updateForm("title", e.target.value)}
                  placeholder="Bridal Styling"
                  className="admin-input"
                />
              </Field>

              <Field label="Slug">
                <input
                  required
                  value={form.slug}
                  onChange={(e) => updateForm("slug", e.target.value)}
                  placeholder="bridal-styling"
                  className="admin-input"
                />
              </Field>

              <Field label="Category">
                <input
                  required
                  value={form.category}
                  onChange={(e) => updateForm("category", e.target.value)}
                  placeholder="Wedding"
                  className="admin-input"
                />
              </Field>

              <Field label="Service Image">
                <label className="flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-white/15 bg-[#0A0A0A] px-4 py-3 text-sm text-white/55 transition hover:border-[#D9A05B]/70 hover:text-white">
                  <span className="truncate">
                    {imageFile ? imageFile.name : "Choose image"}
                  </span>
                  <ImagePlus className="h-5 w-5 text-[#D9A05B]" />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      setImageFile(e.target.files?.[0] || null);
                    }}
                  />
                </label>
              </Field>
            </div>

            <div className="mt-5 grid gap-5">
              <Field label="Short Description">
                <textarea
                  required
                  rows={3}
                  value={form.shortDescription}
                  onChange={(e) =>
                    updateForm("shortDescription", e.target.value)
                  }
                  placeholder="A concise summary for service cards."
                  className="admin-input resize-none"
                />
              </Field>

              <Field label="Description">
                <textarea
                  required
                  rows={5}
                  value={form.description}
                  onChange={(e) => updateForm("description", e.target.value)}
                  placeholder="Detailed service description for the detail page."
                  className="admin-input resize-none"
                />
              </Field>

              <Field label="Includes">
                <textarea
                  rows={3}
                  value={form.includes}
                  onChange={(e) => updateForm("includes", e.target.value)}
                  placeholder="Face shape guidance, frame selection, home trial"
                  className="admin-input resize-none"
                />
              </Field>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#D9A05B] px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#111] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              {isSaving ? "Saving" : "Add Service"}
            </button>
          </form>

          <section className="rounded-3xl border border-white/10 bg-[#111111] p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Service Library</h2>
                <p className="mt-2 text-sm text-white/50">
                  {services.length} services currently published
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="flex min-h-80 items-center justify-center rounded-2xl border border-white/10 bg-[#0A0A0A] text-white/50">
                <Loader2 className="mr-3 h-5 w-5 animate-spin text-[#D9A05B]" />
                Loading services
              </div>
            ) : services.length === 0 ? (
              <div className="flex min-h-80 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0A0A0A] p-8 text-center text-white/45">
                No services have been added yet.
              </div>
            ) : (
              <div className="space-y-4">
                {services.map((service) => (
                  <article
                    key={service._id}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] transition hover:border-[#D9A05B]/50"
                  >
                    <div className="grid gap-4 p-4 sm:grid-cols-[120px_1fr_auto] sm:items-center">
                      <div className="relative h-28 overflow-hidden rounded-xl bg-[#151515] sm:h-24">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          unoptimized
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-lg font-semibold">
                            {service.title}
                          </h3>
                          <span className="rounded-full border border-[#D9A05B]/25 bg-[#D9A05B]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D9A05B]">
                            {service.category}
                          </span>
                        </div>
                        <p className="line-clamp-2 text-sm leading-6 text-white/55">
                          {service.shortDescription}
                        </p>
                        <p className="mt-2 text-xs text-white/35">
                          /services/{service.slug}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteService(service._id)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500 hover:text-white"
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
