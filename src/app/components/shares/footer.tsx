"use client";

import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#f8f5f0] text-[#2b2b2b] border-t border-[#e5dfd5] mt-16">
            <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

                {/* Brand */}
                <div>
                    <div className="mb-4">
                        <Image
                            src="/everlogo/ev1.png"
                            alt="Evermoment Logo"
                            width={220}
                            height={70}
                            className="object-contain"
                        />
                    </div>
                    <p className="text-sm mt-3 text-gray-600 leading-relaxed">
                        Premium eyewear styling for weddings and special moments.
                        Making your big day timeless and elegant.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-medium text-lg mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li><Link className="hover:text-black" href="/">Home</Link></li>
                        <li><Link className="hover:text-black" href="/services">Services</Link></li>
                        <li><Link className="hover:text-black" href="/gallery">Gallery</Link></li>
                        <li><Link className="hover:text-black" href="/about">About</Link></li>
                        <li><Link className="hover:text-black" href="/contact">Contact</Link></li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h3 className="font-medium text-lg mb-4">Services</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>Bride & Groom Styling</li>
                        <li>Family Styling</li>
                        <li>Friends & Crew Styling</li>
                        <li>Guest Experience</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-medium text-lg mb-4">Contact</h3>
                    <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Phone size={16} /> <span>+91 23456 78888</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={16} /> <span>emailid@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={16} /> <span>Kerala, India</span>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="flex gap-4 mt-5">
                        <Instagram className="cursor-pointer hover:text-black" size={18} />
                        <Facebook className="cursor-pointer hover:text-black" size={18} />
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-[#e5dfd5] text-center py-4 text-sm text-gray-500">
                &copy; {new Date().getFullYear()} ever moment. All rights reserved.
            </div>
        </footer>
    );
}
