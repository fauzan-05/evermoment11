"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Gallery", href: "/gallery" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className="fixed top-4 md:top-6 w-full z-[100] flex justify-center px-4">
            <div className="flex items-center justify-between w-[95%] md:w-[85%] max-w-5xl h-12 md:h-14 px-6 md:px-10 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-[#C5A880]/20 bg-[#2B211C] relative z-10">
                {/* Brand Logo */}
                <div className="flex-shrink-0 -ml-2 md:-ml-4">
                    <Link href="/" className="group flex items-center h-full pr-3 md:pr-4">
                        <Image
                            src="/everlogo/everlogo.png"
                            alt="Evermoment Logo"
                            width={110}
                            height={36}
                            className="object-contain transition-transform duration-300 scale-[1.0] md:scale-[1.8] origin-left group-hover:scale-[1.1] md:group-hover:scale-[1.9] md:w-[130px] md:h-[42px]"
                            priority
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex flex-1 items-center justify-center gap-10 text-[11px] uppercase tracking-[0.2em] font-bold text-white/90">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`transition-all duration-300 hover:text-white hover:scale-105 ${pathname === link.href ? "text-white" : "text-white/70"}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* CTA & Mobile Toggle Area */}
                <div className="flex items-center justify-end gap-4 md:gap-6 flex-shrink-0">
                    <Link href="/booking" className="hidden lg:flex items-center justify-center bg-[#C5A880] text-[#2D2926] px-6 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-[0.1em] hover:bg-[#d4b994] transition-colors shadow-md hover:scale-105 transform duration-300">
                        Book Appointment
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown Curtain */}
            <div className={`absolute top-[60px] w-[95%] bg-[#2B211C] rounded-2xl shadow-xl border border-[#C5A880]/20 lg:hidden overflow-hidden transition-all duration-500 ease-in-out origin-top flex flex-col ${isMobileMenuOpen ? "max-h-[400px] opacity-100 pointer-events-auto mt-2" : "max-h-0 opacity-0 pointer-events-none mt-0"}`}>
                <div className="flex flex-col items-center py-8 gap-6 text-[12px] uppercase tracking-[0.2em] font-bold">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`transition-colors duration-300 ${pathname === link.href ? "text-[#C5A880]" : "text-white"}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link 
                        href="/booking"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="mt-2 bg-[#C5A880] text-[#2D2926] px-8 py-3 rounded-full font-bold text-[10px] uppercase tracking-[0.1em]"
                    >
                        Book Appointment
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
