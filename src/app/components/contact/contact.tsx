"use client";

import React from "react";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";

const Contact = () => {
    return (
        <div className="min-h-screen bg-[#F9F6F1] font-sans pt-32 pb-20 flex flex-col items-center justify-center">
            <div className="max-w-3xl mx-auto px-6 text-center w-full">
                <h1 className="text-4xl md:text-5xl font-serif text-[#2D2926] mb-6">Contact</h1>

                <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8">
                    We can converse ways to ways to-recenter your plans. At least use on or share contact past
                    measurements in our times constraints to discuss our in the
                    unsurpassed days as appointments.
                </p>

                <button className="bg-[#C5A880] hover:bg-[#b59870] text-white font-bold py-3 px-8 rounded-lg transition-colors mb-16 shadow-sm">
                    Contact us
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-2xl mx-auto text-left mb-16">
                    {/* Phone */}
                    <div className="flex items-center gap-4 bg-[#f1ece4] p-4 rounded-xl shadow-sm">
                        <div className="bg-[#e4dccb] p-3 rounded-full text-[#2D2926]">
                            <Phone size={20} />
                        </div>
                        <span className="font-semibold text-gray-800 tracking-wide">+91111111</span>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-center gap-4 bg-[#f1ece4] p-4 rounded-xl shadow-sm">
                        <div className="bg-[#e4dccb] p-3 rounded-full text-[#2D2926]">
                            <MessageCircle size={20} />
                        </div>
                        <span className="font-semibold text-gray-800 tracking-wide">WhatsApp</span>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-4 bg-[#f1ece4] p-4 rounded-xl shadow-sm">
                        <div className="bg-[#e4dccb] p-3 rounded-full text-[#2D2926]">
                            <Mail size={20} />
                        </div>
                        <span className="font-semibold text-gray-800 tracking-wide">emailid@gmail.com</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-4 bg-[#f1ece4] p-4 rounded-xl shadow-sm">
                        <div className="bg-[#e4dccb] p-3 rounded-full text-[#2D2926]">
                            <MapPin size={20} />
                        </div>
                        <span className="font-semibold text-gray-800 tracking-wide">Kerala</span>
                    </div>
                </div>

                {/* Social Icons */}
                <div className="flex items-center justify-center gap-6 text-[#2D2926]">
                    <a href="#" className="hover:text-[#C5A880] transition-colors p-2 bg-[#f1ece4] rounded-full">
                        <Facebook size={20} />
                    </a>
                    <a href="#" className="hover:text-[#C5A880] transition-colors p-2 bg-[#f1ece4] rounded-full">
                        <Instagram size={20} />
                    </a>
                    <a href="#" className="hover:text-[#C5A880] transition-colors p-2 bg-[#f1ece4] rounded-full">
                        <Twitter size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contact;
