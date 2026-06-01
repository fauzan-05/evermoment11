"use client";

import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#0A0A0A] text-white border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

                {/* Brand */}
                <div>
                    <div className="mb-4">
                        <Image
                            src="/everlogo/ev1.png"
                            alt="Evermoment Logo"
                            width={220}
                            height={70}
                            style={{ width: "auto", height: "auto" }}
                            className="object-contain brightness-0 invert"
                        />
                    </div>
                    <p className="text-sm mt-3 text-gray-400 leading-relaxed">
                        Private styling and curated eyewear for weddings, celebrations, travel, and everyday presence.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-medium text-lg mb-4 text-white">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link className="hover:text-white transition-colors" href="/">Home</Link></li>
                        <li><Link className="hover:text-white transition-colors" href="/services">Services</Link></li>
                        <li><Link className="hover:text-white transition-colors" href="/gallery">Gallery</Link></li>
                        <li><Link className="hover:text-white transition-colors" href="/about">About</Link></li>
                        <li><Link className="hover:text-white transition-colors" href="/contact">Contact</Link></li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h3 className="font-medium text-lg mb-4 text-white">Services</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>Bride & Groom Styling</li>
                        <li>Family Styling</li>
                        <li>Friends & Crew Styling</li>
                        <li>Guest Experience</li>
                        <li>Personal Occasion Styling</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-medium text-lg mb-4 text-white">Contact</h3>
                    <div className="space-y-3 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <Phone size={16} className="text-[#D9A05B]" /> <span>+91 23456 78888</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={16} className="text-[#D9A05B]" /> <span>emailid@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-[#D9A05B]" /> <span>Kerala, India</span>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="flex gap-4 mt-5 text-gray-400">
                        <Instagram className="cursor-pointer hover:text-white transition-colors" size={18} />
                        <Facebook className="cursor-pointer hover:text-white transition-colors" size={18} />
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-white/10 text-center py-4 text-sm text-gray-500">
                &copy; {new Date().getFullYear()} ever moment. All rights reserved.
            </div>
        </footer>
    );
}
