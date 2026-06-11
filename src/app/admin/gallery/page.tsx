"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Upload,
  Trash2,
  ImagePlus,
} from "lucide-react";

const categories: Record<
  string,
  string[]
> = {
  "bride-groom": [
    "bride",
    "groom",
    "couple",
  ],

  family: [
    "parents",
    "siblings",
    "portraits",
  ],

  "friends-crew": [
    "bride-crew",
    "groom-crew",
    "party",
  ],

  "guest-experience": [
    "vip-guests",
    "family-guests",
    "premium",
    "sunglasses-bar",
  ],

  "personal-occasion": [
    "birthday",
    "anniversary",
    "vacation",
    "corporate",
  ],
};

type GalleryImage = {
  _id: string;
  imageUrl: string;
  categorySlug: string;
  sectionSlug: string;
};

export default function AdminGallery() {
  const [images, setImages] = useState<
    GalleryImage[]
  >([]);

  const [files, setFiles] = useState<
    File[]
  >([]);

  const [uploading, setUploading] =
    useState(false);

  const [category, setCategory] =
    useState("bride-groom");

  const [section, setSection] =
    useState("bride");

  const fetchImages = async () => {
    try {
      const res = await fetch(
        "/api/gallery",
        {
          cache: "no-store",
        }
      );

      const data =
        await res.json();

      setImages(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    setSection(
      categories[category][0]
    );
  }, [category]);

  const uploadImages = async () => {
    if (!files.length) return;

    try {
      setUploading(true);

      for (const file of files) {
        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        formData.append(
          "categorySlug",
          category
        );

        formData.append(
          "sectionSlug",
          section
        );

        const res =
          await fetch(
            "/api/gallery/upload",
            {
              method: "POST",
              body: formData,
            }
          );

        if (!res.ok) {
          throw new Error(
            "Upload failed"
          );
        }
      }

      setFiles([]);

      await fetchImages();

      alert(
        "Images uploaded successfully"
      );
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (
    id: string
  ) => {
    const ok = confirm(
      "Delete this image?"
    );

    if (!ok) return;

    try {
      const res = await fetch(
        `/api/gallery/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error(
          "Delete failed"
        );
      }

      fetchImages();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-10">
          Gallery Admin
        </h1>

        <div className="bg-[#151515] rounded-3xl border border-white/10 p-6 mb-10">

          <div className="grid md:grid-cols-2 gap-5">

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4"
            >
              {Object.keys(
                categories
              ).map((cat) => (
                <option
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={section}
              onChange={(e) =>
                setSection(
                  e.target.value
                )
              }
              className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4"
            >
              {categories[
                category
              ]?.map((sub) => (
                <option
                  key={sub}
                  value={sub}
                >
                  {sub}
                </option>
              ))}
            </select>

          </div>

          <div className="mt-6">

            <label className="flex items-center justify-center border-2 border-dashed border-white/10 rounded-3xl p-10 cursor-pointer hover:border-[#D9A05B]">

              <div className="text-center">

                <ImagePlus
                  size={40}
                  className="mx-auto mb-4 text-[#D9A05B]"
                />

                <p>
                  Select Gallery Images
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  Multiple images supported
                </p>

              </div>

              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={(e) =>
                  setFiles(
                    Array.from(
                      e.target
                        .files || []
                    )
                  )
                }
              />

            </label>

          </div>

          {files.length > 0 && (
            <div className="mt-6">

              <p className="mb-4 text-[#D9A05B]">
                {files.length}
                {" "}
                image(s) selected
              </p>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">

                {files.map(
                  (
                    file,
                    index
                  ) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-xl overflow-hidden"
                    >
                      <img
                        src={URL.createObjectURL(
                          file
                        )}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )
                )}

              </div>

            </div>
          )}

          <button
            onClick={
              uploadImages
            }
            disabled={
              uploading
            }
            className="mt-8 bg-[#D9A05B] text-black px-8 py-4 rounded-xl font-bold flex items-center gap-3"
          >
            <Upload
              size={18}
            />

            {uploading
              ? "Uploading..."
              : "Upload Images"}
          </button>

        </div>

        <h2 className="text-3xl font-bold mb-6">
          Uploaded Images
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">

          {images.map(
            (image) => (
              <div
                key={
                  image._id
                }
                className="bg-[#151515] rounded-2xl overflow-hidden border border-white/10"
              >

                <div className="relative h-56">

                  <Image
                    src={
                      image.imageUrl
                    }
                    alt=""
                    fill
                    unoptimized
                    className="object-cover"
                  />

                </div>

                <div className="p-4">

                  <p className="text-xs text-[#D9A05B]">
                    {
                      image.categorySlug
                    }
                  </p>

                  <p className="text-sm mt-1">
                    {
                      image.sectionSlug
                    }
                  </p>

                  <button
                    onClick={() =>
                      deleteImage(
                        image._id
                      )
                    }
                    className="mt-4 w-full bg-red-600 py-2 rounded-xl flex items-center justify-center gap-2"
                  >
                    <Trash2
                      size={16}
                    />
                    Delete
                  </button>

                </div>

              </div>
            )
          )}

        </div>

      </div>
    </div>
  );
}