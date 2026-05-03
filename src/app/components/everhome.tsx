"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EverHome = () => {
  const servicesSectionRef = useRef<HTMLDivElement | null>(null);
  const serviceCardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Services animation
    if (serviceCardsRef.current.length > 0) {
      gsap.to(serviceCardsRef.current, {
        scrollTrigger: {
          trigger: servicesSectionRef.current,
          start: "top 70%",
        },
        clipPath: "inset(0 0 0% 0)",
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.3,
      });
    }

    // Glass animation
    gsap.fromTo(
      ".glass",
      {
        y: 60,
        opacity: 0,
        scale: 0.8,
        rotate: -10,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".glass",
          start: "top 80%",
        },
        onComplete: () => {
          gsap.to(".glass", {
            y: 15,
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "sine.inOut",
          });
        },
      }
    );
  }, []);

  const addServiceCardRef = (el: HTMLDivElement | null) => {
    if (el && !serviceCardsRef.current.includes(el)) {
      serviceCardsRef.current.push(el);
    }
  };

  return (
    <div className="font-sans">
      {/* HERO */}
      <div className="min-h-screen text-white relative flex flex-col">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc"
            alt="Wedding"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <main className="flex-1 flex flex-col items-center justify-center relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6">
            Your moment. Our styling.
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            Premium eyewear styling for weddings & special occasions
          </p>
          <button className="bg-[#C5A880] px-8 py-3 rounded-lg font-bold">
            Book Appointment
          </button>
        </main>
      </div>

      {/* SERVICES */}
      <section
        ref={servicesSectionRef}
        className="py-16 px-6 max-w-7xl mx-auto text-center"
      >
        <h2 className="text-4xl font-serif mb-10">Services</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {["Bride & Groom", "Family Styling"].map((title, i) => (
            <div
              key={i}
              ref={addServiceCardRef}
              className="h-64 bg-gray-200 rounded-xl flex items-center justify-center"
              style={{ clipPath: "inset(0 0 100% 0)" }}
            >
              <h3 className="text-xl font-semibold">{title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl text-center mb-10">Experience</h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* IMAGE */}
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1511499767150-a48a237f0083"
              alt="Experience"
              fill
              className="object-cover"
            />

            {/* GLASS IMAGE */}
            <img
              src="/glass.png"
              alt="glass"
              className="glass absolute bottom-6 left-1/2 -translate-x-1/2 w-32 opacity-0"
            />
          </div>

          {/* TEXT */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              In-Home Styling Experience
            </h3>
            <p className="text-gray-600">
              Premium styling experience at your home or wedding venue with expert consultants.
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .glass {
          filter: drop-shadow(0 10px 20px rgba(197, 168, 128, 0.4));
        }
      `}</style>
    </div>
  );
};

export default EverHome;