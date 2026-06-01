"use client";

import React from "react";

const About = () => {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white font-sans pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <p className="text-[10px] uppercase tracking-[0.34em] text-[#D9A05B] font-bold mb-5">
                    Private Eyewear Styling
                </p>
                <h1 className="text-5xl md:text-7xl font-serif mb-12">About Ever Moment</h1>
                
                <div className="space-y-8 text-base md:text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
                    <p>
                        Ever Moment redefines eyewear as a personal styling experience.
                    </p>
                    
                    <p>
                        We combine curated selections, aesthetic understanding, and one-to-one guidance to help you choose frames that align with your features, wardrobe, and the moments that matter.
                    </p>
                    
                    <p className="text-2xl md:text-3xl font-serif text-white leading-snug">
                        We don&apos;t sell eyewear. We design how you appear.
                    </p>

                    <p>
                        Our approach is simple: make every look feel intentional, effortless, and distinctly yours.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
