"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  LayoutGrid,
  SlidersHorizontal,
} from "lucide-react";
import type { GalleryCategory } from "@/lib/gallery";
import { safeJson } from "@/lib/http";

type GalleryDetailProps = {
  category: GalleryCategory;
};

type GalleryImage = {
  _id: string;
  imageUrl: string;
  categorySlug: string;
  sectionSlug: string;
};

export default function GalleryDetail({
  category,
}: GalleryDetailProps) {
  const [activeSection, setActiveSection] =
    useState("all");

  const [galleryImages, setGalleryImages] =
    useState<GalleryImage[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchImages();
  }, [category.slug]);

  const fetchImages = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/gallery?category=${category.slug}`,
        {
          cache: "no-store",
        }
      );

      const data = await safeJson<GalleryImage[]>(res, []);

      setGalleryImages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const selectedSections = useMemo(() => {
    if (activeSection === "all") {
      return category.sections;
    }

    return category.sections.filter(
      (section) =>
        section.slug === activeSection
    );
  }, [activeSection, category.sections]);

  const selectedImages = useMemo(() => {
    if (activeSection === "all") {
      return galleryImages;
    }

    return galleryImages.filter(
      (image) =>
        image.sectionSlug === activeSection
    );
  }, [
    galleryImages,
    activeSection,
  ]);

  return (
    <section className="min-h-screen bg-[#0A0A0A] text-white pt-28 pb-10 md:pt-32">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">

        {/* HEADER */}

        <div className="mb-8 flex items-center justify-between">

          <Link
            href="/gallery"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#151515] text-white transition hover:border-[#D9A05B]"
          >
            <ArrowLeft size={20} />
          </Link>

          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-serif font-bold">
              {category.title}
            </h1>

            <p className="mt-2 text-xs md:text-sm text-white/55">
              {category.subtitle}
            </p>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#151515]"
          >
            <SlidersHorizontal size={19} />
          </button>

        </div>

        {/* FILTER BUTTONS */}

        <div className="mb-6 flex gap-3 overflow-x-auto pb-2">

          <button
            onClick={() =>
              setActiveSection("all")
            }
            className={`shrink-0 rounded-full px-6 py-3 text-xs font-bold transition ${
              activeSection === "all"
                ? "bg-[#D9A05B] text-black"
                : "bg-[#151515] border border-white/10"
            }`}
          >
            All
          </button>

          {category.sections.map(
            (section) => (
              <button
                key={section.slug}
                onClick={() =>
                  setActiveSection(
                    section.slug
                  )
                }
                className={`shrink-0 rounded-full px-6 py-3 text-xs font-bold transition ${
                  activeSection ===
                  section.slug
                    ? "bg-[#D9A05B] text-black"
                    : "bg-[#151515] border border-white/10"
                }`}
              >
                {section.title}
              </button>
            )
          )}

        </div>

        {/* SECTION CARDS */}

        <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#D9A05B] font-bold">
          Experience Categories
        </p>

        <div className="mb-8 grid gap-4 md:grid-cols-2">

          {selectedSections.map(
            (section) => {
              const sectionCount =
                galleryImages.filter(
                  (img) =>
                    img.sectionSlug ===
                    section.slug
                ).length;

              const coverImage =
                galleryImages.find(
                  (img) =>
                    img.sectionSlug ===
                    section.slug
                );

              return (
                <button
                  key={section.slug}
                  onClick={() =>
                    setActiveSection(
                      section.slug
                    )
                  }
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#151515] text-left"
                >
                  <div className="relative h-44">

                    {coverImage ? (
                      <Image
                        src={
                          coverImage.imageUrl
                        }
                        alt={
                          section.title
                        }
                        fill
                        unoptimized
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#0A0A0A] text-gray-500">
                        No Images
                      </div>
                    )}

                  </div>

                  <div className="p-4 flex items-center justify-between">

                    <div>
                      <h2 className="font-bold">
                        {section.title}
                      </h2>

                      <p className="text-xs text-white/55 mt-1">
                        {sectionCount}
                        {" "}
                        Photos
                      </p>
                    </div>

                    <ChevronRight
                      size={20}
                      className="text-[#D9A05B]"
                    />

                  </div>

                </button>
              );
            }
          )}

        </div>

        {/* GALLERY HEADER */}

        <div className="mb-5 flex items-center justify-between">

          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#D9A05B] font-bold">
              Gallery
            </p>

            <h2 className="mt-2 text-2xl font-serif font-bold">
              {activeSection === "all"
                ? `${category.title} Moments`
                : selectedSections[0]
                    ?.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#151515] px-4 py-3 text-xs font-bold text-white/60">
            <LayoutGrid size={16} />
            {selectedImages.length} Images
          </div>

        </div>

        {/* IMAGES */}

        {loading ? (
          <div className="text-center py-20 text-gray-400">
            Loading gallery...
          </div>
        ) : selectedImages.length ===
          0 ? (
          <div className="text-center py-20 text-gray-400">
            No images uploaded yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {selectedImages.map(
              (image) => (
                <div
                  key={image._id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#151515]"
                >
                  <div className="relative aspect-[4/5]">

                 {image.imageUrl ? (
  <Image
    src={image.imageUrl}
    alt={image.sectionSlug}
    fill
    unoptimized
    className="object-cover transition duration-500 group-hover:scale-105"
  />
) : (
  <div className="w-full h-full flex items-center justify-center bg-[#111] text-gray-500">
    No Image
  </div>
)}

                  </div>

                  <div className="p-3">

                    <p className="text-xs font-bold">
                      {
                        image.sectionSlug
                      }
                    </p>

                  </div>

                </div>
              )
            )}

          </div>
        )}

        <Link
          href="/booking"
          className="mt-8 flex items-center justify-center gap-3 rounded-2xl bg-[#D9A05B] px-6 py-4 text-xs font-extrabold uppercase tracking-[0.12em] text-[#111]"
        >
          <CalendarDays size={17} />
          Book {category.title}
          {" "}
          Experience
        </Link>

      </div>
    </section>
  );
}
