"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const stylingServices = [
  {
    id: 1,
    title: "Bride & Groom Ensemble",
    description: "Premium eyewear consultation for weddings ensuring a stylish and timeless look.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    alt: "Bride & Groom",
  },
  {
    id: 2,
    title: "Family Styling",
    description: "Exclusive eyewear styling that coordinates your entire family for a stunning look.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    alt: "Family Styling",
  },
  {
    id: 3,
    title: "Friends & Crew Styling",
    description: "Make your bridal party stand out with coordinated eyewear for the ultimate wedding vibe.",
    image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800",
    alt: "Friends & Crew",
  },
  {
    id: 4,
    title: "Guests Experience",
    description: "Enhancing the guest experience with on-site eyewear styling and professional advice.",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800",
    alt: "Guests Experience",
  },
];

const StylingServices = () => {
  return (
    <div className="min-h-screen bg-[#F9F6F1] font-sans selection:bg-[#C4A46E] selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-48 pb-16 md:pb-20 text-center px-6 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 md:top-20 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(196,164,110,0.05)_0%,_transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#C4A46E] font-bold mb-4 md:mb-6 animate-fade-in">
            Curated Elegance
          </p>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif text-[#2D2926] mb-6 md:mb-8 tracking-tight leading-tight md:leading-none">
            Our Styling <span className="italic text-[#C4A46E]">Services</span>
          </h1>
          <div className="flex items-center justify-center gap-3 md:gap-4 text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-400 font-bold">
            <Link href="/" className="hover:text-[#C4A46E] transition-all duration-300">Home</Link>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-[#2D2926]">Services</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 md:pb-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14">
          {stylingServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-[30px] md:rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all duration-700 hover:-translate-y-4 flex flex-col items-center border border-black/[0.03]"
            >
              {/* Image Wrapper */}
              <div className="w-[92%] h-[220px] md:h-[280px] mt-4 relative overflow-hidden rounded-[20px] md:rounded-[30px]">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>

                {/* Float Badge */}
                <div className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <div className="w-1.5 h-1.5 bg-[#C4A46E] rounded-full animate-ping"></div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-10 md:p-12 text-center flex flex-col items-center">
                <h3 className="text-2xl md:text-3xl font-serif text-[#2D2926] mb-5 group-hover:text-[#C4A46E] transition-colors duration-300 leading-snug">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 max-w-[280px] font-light">
                  {service.description}
                </p>

                <Link
                  href="/services/details"
                  className="group/btn relative overflow-hidden px-10 py-4 bg-[#C4A46E] text-white text-[11px] uppercase tracking-[0.2em] font-bold rounded-2xl transition-all duration-500 hover:bg-[#2D2926] hover:shadow-2xl hover:shadow-[#C4A46E]/30"
                >
                  <span className="relative z-10">View Details</span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 md:py-32 bg-[#2D2926] text-white relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#C4A46E] opacity-[0.03] rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[#C4A46E] opacity-[0.02] rounded-full blur-[60px] md:blur-[100px] translate-y-1/2 -translate-x-1/4"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-8 md:space-y-10">
            <h2 className="text-3xl md:text-6xl font-serif leading-tight">
              Ready to find your <br />
              <span className="italic text-[#C4A46E]">perfect signature style?</span>
            </h2>
            <p className="text-gray-400 text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto italic">
              &quot;We believe eyewear is the most important accessory. It&apos;s the first thing people notice about you.&quot;
            </p>
            <div className="pt-4 md:pt-6">
              <Link href="/booking" className="inline-flex px-10 md:px-14 py-4 md:py-6 border border-[#C4A46E]/50 text-[#C4A46E] uppercase text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] font-bold hover:bg-[#C4A46E] hover:text-white transition-all duration-700 rounded-full hover:scale-105 active:scale-95">
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
