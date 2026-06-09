"use client";

import { useMemo, useState } from "react";
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

type GalleryDetailProps = {
  category: GalleryCategory;
};

export default function GalleryDetail({ category }: GalleryDetailProps) {
  const [activeSection, setActiveSection] = useState("all");

  const selectedSections = useMemo(() => {
    if (activeSection === "all") {
      return category.sections;
    }

    return category.sections.filter(
      (section) => section.slug === activeSection
    );
  }, [activeSection, category.sections]);

  const selectedImages = selectedSections.flatMap((section) =>
    section.images.map((image) => ({
      ...image,
      sectionTitle: section.title,
    }))
  );

  return (
    <section className="min-h-screen bg-[#0A0A0A] text-white pt-28 pb-10 md:pt-32">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/gallery"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#151515] text-white transition hover:border-[#D9A05B]"
            aria-label="Back to gallery"
          >
            <ArrowLeft size={20} />
          </Link>

          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold md:text-5xl">
              {category.title}
            </h1>
            <p className="mt-2 max-w-md text-xs font-semibold leading-5 text-white/55 md:text-sm">
              {category.subtitle}
            </p>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#151515] text-white"
            aria-label="Filter gallery"
          >
            <SlidersHorizontal size={19} />
          </button>
        </div>

        <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
          <button
            type="button"
            onClick={() => setActiveSection("all")}
            className={`shrink-0 rounded-full px-6 py-3 text-xs font-bold transition ${
              activeSection === "all"
                ? "bg-[#D9A05B] text-[#111] shadow-[0_10px_24px_rgba(217,160,91,0.2)]"
                : "border border-white/10 bg-[#151515] text-white/75"
            }`}
          >
            All
          </button>
          {category.sections.map((section) => (
            <button
              key={section.slug}
              type="button"
              onClick={() => setActiveSection(section.slug)}
              className={`shrink-0 rounded-full px-6 py-3 text-xs font-bold transition ${
                activeSection === section.slug
                  ? "bg-[#D9A05B] text-[#111] shadow-[0_10px_24px_rgba(217,160,91,0.2)]"
                  : "border border-white/10 bg-[#151515] text-white/75"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#D9A05B]">
          Experience Categories
        </p>

        <div className="mb-8 grid gap-4 md:grid-cols-2">
          {selectedSections.map((section) => (
            <button
              key={section.slug}
              type="button"
              onClick={() => setActiveSection(section.slug)}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#151515] text-left shadow-[0_16px_45px_rgba(0,0,0,0.28)] transition hover:-translate-y-1 hover:border-[#D9A05B]/60 hover:bg-[#1B1B1B]"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <div className="flex items-center gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-extrabold text-white">
                    {section.title}
                  </h2>
                  <p className="mt-1 text-xs font-semibold text-white/55">
                    {section.photos} Photos
                  </p>
                </div>
                <ChevronRight size={20} className="text-[#D9A05B]" />
              </div>
            </button>
          ))}
        </div>

        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#D9A05B]">
              Gallery
            </p>
            <h2 className="mt-2 text-2xl font-serif font-bold">
              {activeSection === "all"
                ? `${category.title} Moments`
                : selectedSections[0]?.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#151515] px-4 py-3 text-xs font-bold text-white/60">
            <LayoutGrid size={16} />
            {selectedImages.length} Looks
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {selectedImages.map((image, index) => (
            <div
              key={`${image.sectionTitle}-${index}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#151515] shadow-[0_14px_38px_rgba(0,0,0,0.26)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <div className="p-3">
                <p className="truncate text-xs font-bold text-white">
                  {image.sectionTitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/booking"
          className="mt-8 flex items-center justify-center gap-3 rounded-2xl bg-[#D9A05B] px-6 py-4 text-xs font-extrabold uppercase tracking-[0.12em] text-[#111] shadow-[0_14px_30px_rgba(217,160,91,0.22)] transition hover:bg-white"
        >
          <CalendarDays size={17} />
          Book {category.title} Experience
        </Link>
      </div>
    </section>
  );
}
