"use client";
import { useEffect,useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  ChevronRight,
  Crown,
  Gift,
  Heart,
  Sparkles,
  Users,
} from "lucide-react";
import { galleryCategories } from "@/lib/gallery";
import { safeJson } from "@/lib/http";


const iconMap = {
  heart: Heart,
  users: Users,
  sparkles: Sparkles,
  crown: Crown,
  gift: Gift,
};


export default function Gallery() {
  
  const [heroImage, setHeroImage] =
  useState("");

useEffect(() => {
  async function loadHero() {
    const res = await fetch("/api/gallery");

    const data = await safeJson<{ imageUrl?: string }[]>(res, []);

    if (data.length > 0) {
      setHeroImage(data[0].imageUrl || "");
    }
  }

  loadHero();
}, []);

  return (
    <section className="min-h-screen bg-[#0A0A0A] text-white pb-10">
      <div className="relative min-h-[520px] overflow-hidden bg-[#0A0A0A] pt-32 text-white md:min-h-[620px] md:pt-40">
     {heroImage && (
  <Image
    src={heroImage}
    alt="Ever Moment gallery"
    fill
    priority
    unoptimized
    className="object-cover opacity-70"
  />
)}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/55 to-transparent" />

        <div className="relative mx-auto flex min-h-[360px] w-full max-w-6xl items-center px-5 md:min-h-[430px] md:px-8">
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.34em] text-[#D9A05B]">
              Ever Moment
            </p>
            <h1 className="max-w-md text-5xl font-serif leading-tight md:text-7xl">
              Gallery
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/80 md:text-base">
              Explore curated moments styled to perfection across weddings,
              guests, family, and personal occasions.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-10 w-full max-w-6xl px-5 md:-mt-14 md:px-8">
        <div className="grid gap-4 px-4 md:grid-cols-2">
          {galleryCategories.map((category) => {
            const Icon = iconMap[category.icon];

            return (
              <Link
                key={category.slug}
                href={`/gallery/${category.slug}`}
                className="group flex min-h-28 items-center gap-4 rounded-2xl border border-white/10 bg-[#151515]/95 p-5 shadow-[0_16px_45px_rgba(0,0,0,0.28)] transition hover:-translate-y-1 hover:border-[#D9A05B]/60 hover:bg-[#1B1B1B]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#231A10] text-[#D9A05B]">
                  <Icon size={24} strokeWidth={1.7} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-bold text-white">
                    {category.title}
                  </span>
                  <span className="mt-1 block text-xs font-semibold text-white/55">
                    {category.sections.length} Categories
                  </span>
                </span>
                <ChevronRight
                  size={20}
                  className="text-[#D9A05B] opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                />
              </Link>
            );
          })}
        </div>

        <Link
          href="/booking"
          className="mx-4 mt-8 flex items-center justify-center gap-3 rounded-2xl bg-[#D9A05B] px-6 py-4 text-xs font-extrabold uppercase tracking-[0.12em] text-[#111] shadow-[0_14px_30px_rgba(217,160,91,0.22)] transition hover:bg-white md:mx-auto md:max-w-md"
        >
          <CalendarDays size={17} />
          Book Appointment
        </Link>
      </div>
    </section>
  );
}
