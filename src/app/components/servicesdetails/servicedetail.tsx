"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const ServiceDetail = () => {
    const galleryImages = [
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800",
    ];

    return (
        <div className="min-h-screen bg-[#F9F6F1] font-sans text-[#2D2926]">
            {/* Hero Image */}
            <div className="relative w-full h-[50vh] md:h-[70vh] mt-24 md:mt-32 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg">
                    <Image
                        src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2000"
                        alt="Bride & Groom Ensemble"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
                <div className="max-w-5xl mx-auto">
                    {/* Title & Description */}
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-[#2D2926]">
                        Bride & Groom Ensemble
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-12 max-w-4xl">
                        Premium personal styling tailored base on the previous wedding events, showcasing seasonal acceptable bridal references patterns.
                    </p>

                    {/* Benefits Section */}
                    <div className="mb-16">
                        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-[#2D2926]">Benefits</h2>
                        <ul className="space-y-4 text-gray-600 text-base md:text-lg">
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                                Personalized premium services
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                                Personalized curated styling
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                                Absolute tailored consulting
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                                Wedding essential assistance
                            </li>
                        </ul>
                    </div>

                    {/* Gallery Section */}
                    <div className="mb-16">
                        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-[#2D2926]">Gallery</h2>
                        {/* Scrollable on mobile, grid on desktop */}
                        <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-4 pb-6 snap-x" style={{ scrollbarWidth: 'none' }}>
                            {galleryImages.map((src, index) => (
                                <div 
                                    key={index} 
                                    className="relative w-[280px] md:w-full h-[360px] flex-shrink-0 snap-center rounded-2xl overflow-hidden shadow-md"
                                >
                                    <Image
                                        src={src}
                                        alt={`Gallery image ${index + 1}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-center py-8">
                        <Link href="/booking" className="bg-[#C5A880] text-white px-12 md:px-16 py-4 md:py-5 rounded-xl font-bold text-sm md:text-base uppercase tracking-widest hover:bg-[#b59870] transition-colors shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                            Book This Service
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ServiceDetail;
