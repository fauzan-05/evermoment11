"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { services } from "../../lib/services";

const StylingServices = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#D9A05B] selection:text-white">
      <section className="relative pt-32 md:pt-48 pb-16 md:pb-20 text-center px-6 overflow-hidden">
        <div className="absolute top-10 md:top-20 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(217,160,91,0.12)_0%,_transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#D9A05B] font-bold mb-4 md:mb-6 animate-fade-in">
            Private Styling
          </p>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif text-white mb-6 md:mb-8 tracking-tight leading-tight md:leading-none">
            Styling <span className="italic text-[#D9A05B]">Services</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Curated eyewear experiences for weddings, family moments, celebrations, travel, and professional presence.
          </p>
          <div className="flex items-center justify-center gap-3 md:gap-4 text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500 font-bold">
            <Link href="/" className="hover:text-[#D9A05B] transition-all duration-300">Home</Link>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span className="text-white">Services</span>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14">
          {services.map((service) => (
            <div
              key={service.slug}
              className="group bg-[#151515] rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.28)] hover:shadow-[0_40px_80px_rgba(217,160,91,0.08)] transition-all duration-700 hover:-translate-y-3 flex flex-col items-center border border-white/[0.07] hover:border-[#D9A05B]/30"
            >
              <div className="w-[92%] h-[220px] md:h-[280px] mt-4 relative overflow-hidden rounded-[18px]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute left-5 top-5 rounded-full bg-[#0A0A0A]/85 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D9A05B] backdrop-blur">
                  {service.category}
                </div>
              </div>

              <div className="p-10 md:p-12 text-center flex flex-col items-center">
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-5 group-hover:text-[#D9A05B] transition-colors duration-300 leading-snug">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-10 max-w-[280px] font-light">
                  {service.shortDescription}
                </p>

                <Link
                  href={`/services/${service.slug}`}
                  className="group/btn relative overflow-hidden px-10 py-4 bg-[#D9A05B] text-[#111] text-[11px] uppercase tracking-[0.2em] font-bold rounded-xl transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-[#D9A05B]/20"
                >
                  <span className="relative z-10">View Experience</span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#111111] text-white relative overflow-hidden border-t border-white/10">

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-8 md:space-y-10">
            <h2 className="text-3xl md:text-6xl font-serif leading-tight">
              Begin your private <br />
              <span className="italic text-[#D9A05B]">styling appointment.</span>
            </h2>
            <p className="text-gray-400 text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto italic">
              Private styling. Curated selection. Lasting impression.
            </p>
            <div className="pt-4 md:pt-6">
              <Link href="/booking" className="inline-flex px-10 md:px-14 py-4 md:py-6 border border-[#D9A05B]/50 text-[#D9A05B] uppercase text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] font-bold hover:bg-[#D9A05B] hover:text-[#111] transition-all duration-700 rounded-full hover:scale-105 active:scale-95">
                Book Private Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer / Contact Info */}

    </div>
  );
};

export default StylingServices;
