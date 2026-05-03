"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EverHome = () => {
    const servicesSectionRef = useRef<HTMLElement | null>(null);
    const serviceCardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const serviceCards = serviceCardsRef.current.filter(Boolean);

            // Curtain reveal animation for service cards
            if (serviceCards.length > 0) {
                gsap.to(serviceCards, {
                    scrollTrigger: {
                        trigger: servicesSectionRef.current,
                        start: "top 70%", // Start animation when the section is 70% in view
                    },
                    clipPath: "inset(0 0 0% 0)", // Reveal the element by animating clipPath
                    duration: 1.2,
                    ease: "power3.inOut",
                    stagger: 0.3 // Add a delay between each card animating in
                });
            }
        });
        
        return () => ctx.revert(); // Cleanup on unmount
    }, []);

    return (
        <div className="font-sans">
            <div className="min-h-screen text-white overflow-hidden relative flex flex-col">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2000"
                        alt="Wedding Couple"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                {/* Main Hero Section */}
                <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 text-center mt-20 md:mt-0">
                    <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 drop-shadow-lg">
                        Your moment. Our styling.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl drop-shadow-md">
                        Premium eyewear styling for weddings & special occasions
                    </p>
                    <button className="bg-[#C5A880] text-[#2D2926] px-10 py-4 rounded-xl font-bold text-base tracking-wide hover:bg-[#d4b994] transition-all transform active:scale-95 shadow-xl">
                        Book Appointment
                    </button>
                </main>
            </div>

            {/* New Sections Wrapper */}
            <div className="bg-[#F9F6F1] text-[#2D2926]">
                {/* Value Section */}
                <section className="py-20 px-6 max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-serif font-bold mb-12">Value Section</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold font-serif">Premium Eyewear</h3>
                            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">Premium eyewear styling tailored to moment on special events for weddings and evening parties</p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold font-serif">Personalized Styling</h3>
                            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">Personalized styling with expert consultants your specific occasions brand styling</p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold font-serif">Wedding Experiences Service</h3>
                            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">Wedding ensemble tailor specific themes or traditional modern requirements custom designs</p>
                        </div>
                    </div>
                </section>

                {/* Services Preview */}
                <section className="py-16 px-6 max-w-7xl mx-auto text-center" ref={servicesSectionRef}>
                    <h2 className="text-4xl font-serif font-bold mb-12">Services Preview</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: "Bride & Groom Ensemble", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800" },
                            { title: "Family Styling", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800" },
                            { title: "Friends & Crew Styling", img: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800" },
                            { title: "Guest Experience Styling", img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800" },
                        ].map((service, idx) => (
                            <div
                                key={idx}
                                ref={(el) => {
                                    serviceCardsRef.current[idx] = el;
                                }}
                                className="relative h-64 md:h-80 rounded-3xl overflow-hidden group border border-gray-200 shadow-md p-2"
                                style={{ clipPath: "inset(0 0 100% 0)" }} // Initial state for curtain effect
                            >
                                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                    <Image src={service.img} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 transition-colors group-hover:bg-black/50">
                                        <h3 className="text-white text-2xl font-serif font-bold mb-4">{service.title}</h3>
                                        <Link href="/services/details">
                                            <button className="bg-[#C5A880] text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-[#b09570] transition-colors">View Details</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Experience Section */}
                <section className="py-20 px-6 max-w-7xl mx-auto">
                    <h2 className="text-4xl font-serif font-bold mb-12 text-center">Experience Section</h2>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
                            <Image src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800" alt="Experience" fill className="object-cover" />
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-3xl font-serif font-bold">In-Home Styling Experience</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Convenient premium styling for weddings or any special occasions that guarantees expert service.
                            </p>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-[#C5A880]"></span>
                                    <span>Personalized curated recommendation service</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-[#C5A880]"></span>
                                    <span>Personalized custom fit and guaranteed experience</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-[#C5A880]"></span>
                                    <span>Premium styling guaranteed experience</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-[#C5A880]"></span>
                                    <span>Expert styling anywhere experience even on wedding venues.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>


        </div>
    );
};

export default EverHome;
