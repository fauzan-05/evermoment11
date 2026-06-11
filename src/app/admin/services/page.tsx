"use client";

import { useEffect, useState } from "react";

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

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [form, setForm] = useState<FormData>({
    title: "",
    slug: "",
    category: "",
    shortDescription: "",
    description: "",
    includes: "",
  });

  // ---------------- LOAD SERVICES ----------------
  const loadServices = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  // ---------------- UPLOAD IMAGE ----------------
  const uploadImage = async () => {
    if (!imageFile) return "";

    const formData = new FormData();
    formData.append("file", imageFile);

    const res = await fetch("/api/services/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Upload failed");
    }

    return data.url;
  };

  // ---------------- CREATE SERVICE ----------------
  const createService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
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
        const err = await res.json();
        throw new Error(err.error || "Failed to create service");
      }

      alert("Service Added");

      setForm({
        title: "",
        slug: "",
        category: "",
        shortDescription: "",
        description: "",
        includes: "",
      });

      setImageFile(null);
      loadServices();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  // ---------------- DELETE SERVICE ----------------
  const deleteService = async (id: string) => {
    if (!confirm("Delete service?")) return;

    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      loadServices();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Manage Services
      </h1>

      {/* FORM */}
      <form onSubmit={createService} className="mb-10 space-y-4">

        <input
          placeholder="Title"
          className="w-full border p-3"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Slug"
          className="w-full border p-3"
          value={form.slug}
          onChange={(e) =>
            setForm({ ...form, slug: e.target.value })
          }
        />

        <input
          placeholder="Category"
          className="w-full border p-3"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          accept="image/*"
          className="w-full border p-3"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setImageFile(e.target.files[0]);
            }
          }}
        />

        <textarea
          placeholder="Short Description"
          className="w-full border p-3"
          value={form.shortDescription}
          onChange={(e) =>
            setForm({
              ...form,
              shortDescription: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Description"
          className="w-full border p-3"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Includes (comma separated)"
          className="w-full border p-3"
          value={form.includes}
          onChange={(e) =>
            setForm({
              ...form,
              includes: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="bg-black px-6 py-3 text-white"
        >
          Add Service
        </button>
      </form>

      {/* LIST */}
      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service._id}
            className="flex items-center justify-between border p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={service.image}
                alt={service.title}
                className="h-16 w-16 rounded object-cover"
              />

              <div>
                <h3 className="font-bold">
                  {service.title}
                </h3>
                <p>{service.category}</p>
              </div>
            </div>

            <button
              onClick={() => deleteService(service._id)}
              className="bg-red-500 px-4 py-2 text-white"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}