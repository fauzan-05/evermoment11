"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";

const Contact = () => {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white font-sans pt-32 pb-20 flex flex-col items-center justify-center">
            <div className="max-w-3xl mx-auto px-6 text-center w-full">
                <p className="text-[10px] uppercase tracking-[0.34em] text-[#D9A05B] font-bold mb-5">
                    Contact
                </p>
                <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Begin Your Styling Experience</h1>

                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8">
                    Connect with Ever Moment to schedule your private styling appointment.
                    Each session is tailored to your occasion, preferences, and personal style, delivered with focused attention and curated precision.
                </p>

                <p className="font-serif text-2xl text-white mb-8">
                    Private styling. Curated selection. Lasting impression.
                </p>

                <Link href="/booking" className="inline-flex bg-[#D9A05B] hover:bg-white text-[#111] font-bold py-3 px-8 rounded-lg transition-colors mb-16 shadow-sm">
                    Book Appointment
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-2xl mx-auto text-left mb-16">
                    {/* Phone */}
                    <div className="flex items-center gap-4 bg-[#151515] p-4 rounded-xl shadow-sm border border-white/10">
                        <div className="bg-[#222222] p-3 rounded-full text-[#D9A05B]">
                            <Phone size={20} />
                        </div>
                        <span className="font-semibold text-gray-200 tracking-wide">+91 23456 78888</span>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-center gap-4 bg-[#151515] p-4 rounded-xl shadow-sm border border-white/10">
                        <div className="bg-[#222222] p-3 rounded-full text-[#D9A05B]">
                            <MessageCircle size={20} />
                        </div>
                        <span className="font-semibold text-gray-200 tracking-wide">WhatsApp</span>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-4 bg-[#151515] p-4 rounded-xl shadow-sm border border-white/10">
                        <div className="bg-[#222222] p-3 rounded-full text-[#D9A05B]">
                            <Mail size={20} />
                        </div>
                        <span className="font-semibold text-gray-200 tracking-wide">emailid@gmail.com</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-4 bg-[#151515] p-4 rounded-xl shadow-sm border border-white/10">
                        <div className="bg-[#222222] p-3 rounded-full text-[#D9A05B]">
                            <MapPin size={20} />
                        </div>
                        <span className="font-semibold text-gray-200 tracking-wide">Kerala</span>
                    </div>
                </div>

                {/* Social Icons */}
                <div className="flex items-center justify-center gap-6 text-[#D9A05B]">
                    <a href="#" className="hover:text-white transition-colors p-2 bg-[#151515] rounded-full border border-white/10">
                        <Facebook size={20} />
                    </a>
                    <a href="#" className="hover:text-white transition-colors p-2 bg-[#151515] rounded-full border border-white/10">
                        <Instagram size={20} />
                    </a>
                    <a href="#" className="hover:text-white transition-colors p-2 bg-[#151515] rounded-full border border-white/10">
                        <Twitter size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contact;
