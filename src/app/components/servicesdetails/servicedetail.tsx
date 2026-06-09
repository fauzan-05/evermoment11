"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import type { Service } from "@/lib/services";

type ServiceDetailProps = {
  service: Service;
};

const ServiceDetail = ({ service }: ServiceDetailProps) => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans text-white">
      <section className="relative pt-32 md:pt-40 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center">
          <div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] font-bold text-[#D9A05B] mb-8 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Services
            </Link>
            <p className="text-[10px] uppercase tracking-[0.34em] text-[#D9A05B] font-bold mb-5">
              {service.category}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight mb-7">
              {service.title}
            </h1>
            <p className="text-gray-400 text-base md:text-xl leading-relaxed max-w-2xl mb-10">
              {service.description}
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-3 bg-[#D9A05B] text-[#111] px-8 py-4 rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-white transition-colors"
            >
              Book This Service
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative h-[420px] md:h-[620px] rounded-[24px] overflow-hidden shadow-2xl">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#D9A05B] font-bold mb-4">
              Styling Focus
            </p>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight">
              Designed around your face, wardrobe, comfort, and moment.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {service.includes.map((item) => (
              <div key={item} className="bg-[#151515] rounded-2xl p-6 border border-white/[0.07] shadow-sm">
                <CheckCircle className="w-5 h-5 text-[#D9A05B] mb-5" />
                <p className="text-gray-300 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 bg-[#111111] text-white rounded-[24px] px-8 py-10 md:px-12 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8 border border-white/10">
          <div>
            <h3 className="text-3xl md:text-4xl font-serif mb-3">Ready to begin?</h3>
            <p className="text-white/65 max-w-2xl">
              Connect with Ever Moment to schedule a private session tailored to your occasion, preferences, and personal style.
            </p>
          </div>
          <Link
            href="/booking"
            className="inline-flex shrink-0 items-center justify-center gap-3 bg-[#D9A05B] text-[#111] px-8 py-4 rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-white transition-colors"
          >
            Book Appointment
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ServiceDetail;
