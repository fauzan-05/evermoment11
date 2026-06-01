"use client";

import Image from "next/image";

const images = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    alt: "Wedding couple",
    height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
    alt: "Wedding rings",
    height: 400,
  },
  {
    src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2070&auto=format&fit=crop",
    alt: "Wedding venue",
    height: 500,
  },
  {
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop",
    alt: "Bride and groom",
    height: 450,
  },
  {
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop",
    alt: "Wedding celebration",
    height: 550,
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
    alt: "Wedding flowers",
    height: 400,
  },
  {
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
    alt: "Bride",
    height: 650,
  },
  {
    src: "https://images.unsplash.com/photo-1505315891316-de1bc6a7a58a?q=80&w=2070&auto=format&fit=crop",
    alt: "Wedding dinner",
    height: 400,
  },
  {
    src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop",
    alt: "Wedding cake",
    height: 500,
  },
];

export default function Gallery() {
  return (
    <section className="w-full min-h-screen bg-[#0A0A0A] text-white px-4 sm:px-6 lg:px-8 py-32 md:py-40">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.34em] text-[#D9A05B] font-bold mb-4">
            Gallery
          </p>
          <h2 className="text-4xl md:text-6xl font-serif mb-4 text-white">A Look at Ever Moment</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of moments shaped through detail, balance, and personal styling.
            Each look reflects individuality, intention, and a refined approach to presence.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((image, index) => (
            <div key={index} className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-sm border border-white/10 hover:border-[#D9A05B]/30 transition-colors duration-300">
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={image.height}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium tracking-wider uppercase text-sm border border-white/50 px-4 py-2 rounded-full backdrop-blur-sm">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
