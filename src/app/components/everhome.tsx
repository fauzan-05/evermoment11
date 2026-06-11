"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
    Play, 
    Glasses, 
    User, 
    Calendar, 
    Users,
    Briefcase,
    Star,
    MapPin,
    ShieldCheck,
    Clock,
    ArrowRight,
    Gem,
    Home,
    Heart
} from "lucide-react";


gsap.registerPlugin(ScrollTrigger);

const EverHome = () => {
    const [services, setServices] = React.useState<any[]>([]);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>('.fade-up').forEach((elem) => {
                gsap.fromTo(elem, 
                    { y: 40, opacity: 0 },
                    {
                        y: 0, 
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: elem,
                            start: "top 85%",
                        }
                    }
                );
            });
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
    const fetchServices = async () => {
        try {
            const res = await fetch("/api/services");
            const data = await res.json();
            setServices(data);
        } catch (err) {
            console.error("Failed to load services", err);
        }
    };

    fetchServices();
}, []);

    return (
        <div className="bg-[#0A0A0A] text-white font-sans w-full overflow-x-hidden selection:bg-[#D9A05B] selection:text-white">
            
            {/* HERO SECTION */}
            <div className="relative min-h-[90vh] md:min-h-[100vh] text-white flex flex-col">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/evermoment-eyewear-hero.png"
                        alt="Premium eyewear styling arranged on black satin with gold accents"
                        fill
                        sizes="100vw"
                        className="object-cover object-center md:object-right"
                        priority
                    />
                    {/* Left to right dark gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-[#0A0A0A]/35 to-[#0A0A0A]/5"></div>
                    {/* Bottom to top gradient to blend perfectly with the feature bar */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/25 to-transparent"></div>
                </div>
                
                <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-32 pb-20 max-w-7xl mx-auto w-full">
                    <div className="max-w-2xl fade-up">
                        <div className="flex items-center gap-2 mb-4 text-[#D9A05B] text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                            <Star className="w-3 h-3 fill-current" />
                            <span>Designed for moments that matter</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight mb-6">
                            Eyewear for the moments <br/>
                            people remember.
                        </h1>
                        <p className="text-gray-300 text-base md:text-lg mb-10 max-w-xl leading-relaxed">
                            Private styling and curated eyewear for weddings, celebrations, travel, and everyday presence, designed to suit your face, your outfit, and your moment.
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 mb-16">
                            <Link href="/booking">
                                <button className="bg-[#D9A05B] text-[#111] px-8 py-4 rounded-full font-bold text-xs md:text-sm tracking-widest uppercase hover:bg-[#c58f4a] transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-[#D9A05B]/20">
                                    BOOK YOUR STYLING SESSION <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                            <Link href="/services">
                                <button className="border border-white/30 hover:border-white text-white px-8 py-4 rounded-full font-bold text-xs md:text-sm tracking-widest uppercase transition-all flex items-center gap-2 bg-white/5 backdrop-blur-sm">
                                    <Play className="w-4 h-4 fill-current" /> DISCOVER OUR SERVICES
                                </button>
                            </Link>
                        </div>

                        <p className="text-gray-400 text-xs md:text-sm max-w-md leading-relaxed border-l-2 border-[#D9A05B]/50 pl-4">
                            At Ever Moment, eyewear is not just something you wear. It is the finishing detail that shapes how you are seen and how you feel.
                        </p>
                    </div>
                </div>
            </div>

            {/* FEATURE BAR */}
            <div className="bg-[#111111] text-white py-12 px-6 rounded-b-[2rem] md:rounded-b-[3rem] border-b border-white/5 relative z-20 -mt-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
                    {[
                        { title: "Curated Eyewear", desc: "Handpicked premium frames designed for style and comfort.", icon: <Glasses className="w-8 h-8 text-[#D9A05B] mb-5 stroke-1" /> },
                        { title: "Private Styling", desc: "One-to-one eyewear styling sessions tailored to your look.", icon: <User className="w-8 h-8 text-[#D9A05B] mb-5 stroke-1" /> },
                        { title: "For Every Occasion", desc: "Weddings, events, travel, and everyday styling.", icon: <Calendar className="w-8 h-8 text-[#D9A05B] mb-5 stroke-1" /> },
                        { title: "Perfect Fit", desc: "Frames selected based on face shape, personality and comfort.", icon: <Gem className="w-8 h-8 text-[#D9A05B] mb-5 stroke-1" /> }
                    ].map((feature, i) => (
                        <div key={i} className="flex flex-col items-center text-center px-6 pt-6 md:pt-0 fade-up" style={{transitionDelay: `${i * 100}ms`}}>
                            {feature.icon}
                            <h3 className="font-bold text-xs tracking-widest uppercase mb-3 text-white/90">{feature.title}</h3>
                            <p className="text-gray-400 text-xs leading-relaxed max-w-[200px]">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* INTRO SECTION */}
            <section className="pt-24 pb-10 px-6 max-w-5xl mx-auto text-center">
                <div className="fade-up">
                    <h4 className="text-[#D9A05B] text-xs font-bold tracking-[0.2em] uppercase mb-6">
                        The Ever Moment Approach
                    </h4>
                    <p className="text-2xl md:text-4xl font-serif leading-snug text-white mb-8">
                        We don&apos;t simply help you choose frames. We design how they fit into your moment, your style, and your identity.
                    </p>
                    <p className="text-gray-400 leading-relaxed max-w-3xl mx-auto">
                        Every session blends curated selection, aesthetic understanding, and one-to-one guidance so your eyewear feels intentional, effortless, and distinctly yours.
                    </p>
                </div>
            </section>

            {/* WHO THIS IS FOR */}
            <section className="pt-16 pb-16 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-12 fade-up">
                    <h4 className="text-[#D9A05B] text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center justify-center gap-3">
                        <span className="w-6 h-px bg-[#D9A05B]/30"></span>
                        <Gem className="w-3 h-3 text-[#D9A05B]" />
                        WHO THIS IS FOR
                        <span className="w-6 h-px bg-[#D9A05B]/30"></span>
                    </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: "Brides & Grooms", desc: "Preparing for wedding looks that leave a lasting impression.", icon: <Users className="w-8 h-8 stroke-1" /> },
                        { title: "Families", desc: "Coordinated styling for weddings and special family occasions.", icon: <Users className="w-8 h-8 stroke-1" /> },
                        { title: "Professionals", desc: "Elevate your presence for work, travel, and daily life.", icon: <Briefcase className="w-8 h-8 stroke-1" /> },
                        { title: "Style Conscious Individuals", desc: "Curated eyewear for those who value style, quality, and individuality.", icon: <Star className="w-8 h-8 stroke-1" /> }
                    ].map((item, i) => (
                        <div key={i} className="bg-[#151515] hover:bg-[#1A1A1A] p-8 rounded-2xl border border-white/5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:border-white/10 fade-up">
                            <div className="mb-6 text-[#D9A05B]">
                                {item.icon}
                            </div>
                            <h3 className="font-serif text-xl font-medium mb-3 text-white">{item.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* OUR STYLING SERVICES */}
            <section className="py-20 px-6 max-w-[90rem] mx-auto bg-[#0A0A0A]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-12 fade-up">
                    <div>
                        <h4 className="text-[#D9A05B] text-xs font-bold tracking-[0.2em] uppercase mb-4">OUR STYLING SERVICES</h4>
                        <h2 className="text-3xl md:text-4xl font-serif font-medium text-white">Eyewear Styling Services for Weddings & Personal Looks</h2>
                    </div>
                    <Link href="/services" className="text-gray-400 hover:text-[#D9A05B] text-xs font-bold tracking-widest uppercase flex items-center gap-2 mt-6 md:mt-0 transition-colors">
                        VIEW ALL SERVICES <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {services.map((srv) => (
                        <div key={srv.slug} className="service-card flex flex-col group bg-[#151515] rounded-xl overflow-hidden shadow-sm border border-white/5 hover:border-white/10 transition-all duration-500 z-10 hover:z-20">
                            <div className="relative h-56 w-full overflow-hidden">
                                <Image src={srv.image} alt={srv.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="font-serif text-lg font-medium mb-3 text-white leading-snug">{srv.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{srv.shortDescription}</p>
                                <Link href={`/services/${srv.slug}`} className="text-[#D9A05B] text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 hover:text-[#c58f4a] transition-colors">
                                    VIEW STYLING EXPERIENCE <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-20 fade-up">
                    <h4 className="text-[#D9A05B] text-xs font-bold tracking-[0.2em] uppercase mb-4">HOW IT WORKS</h4>
                    <h2 className="text-3xl md:text-4xl font-serif font-medium text-white">A Seamless Styling Experience</h2>
                </div>

                <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-4 fade-up">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-[2.5rem] left-[12%] right-[12%] h-[1px] border-t border-dashed border-white/10 z-0"></div>

                    {[
                        { step: "01", title: "Consult & Curate", desc: "We understand your face shape, outfit, and occasion to create the right direction.", icon: <User className="w-6 h-6 stroke-1 text-white" /> },
                        { step: "02", title: "Selection Experience", desc: "Curated frames are selected based on your personality and look.", icon: <Glasses className="w-6 h-6 stroke-1 text-white" /> },
                        { step: "03", title: "Final Styling", desc: "We refine and finalize frames that align perfectly with your complete appearance.", icon: <Gem className="w-6 h-6 stroke-1 text-white" /> },
                        { step: "04", title: "Delivery / Home Trial", desc: "Experience our premium home trial and receive your final selection.", icon: <Home className="w-6 h-6 stroke-1 text-white" /> }
                    ].map((item, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center text-center w-full md:w-1/4 px-2">
                            <div className="w-20 h-20 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center mb-6 relative shadow-md">
                                {item.icon}
                                <div className="absolute -bottom-3 bg-[#222222] border border-white/10 text-[10px] font-bold text-white px-3 py-1 rounded-full shadow-sm tracking-widest">
                                    {item.step}
                                </div>
                            </div>
                            <h3 className="font-serif text-lg font-medium mb-3 text-white mt-2">{item.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-[220px]">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* A GLIMPSE OF OUR STYLING */}
            <section className="py-20 px-6 bg-[#0A0A0A]">
                <div className="max-w-[90rem] mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 px-0 md:px-6 fade-up">
                        <div>
                            <h4 className="text-[#D9A05B] text-xs font-bold tracking-[0.2em] uppercase">A GLIMPSE OF OUR STYLING</h4>
                        </div>
                        <Link href="/gallery" className="text-gray-400 hover:text-[#D9A05B] text-xs font-bold tracking-widest uppercase flex items-center gap-2 mt-4 md:mt-0 transition-colors">
                            VIEW FULL GALLERY <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 fade-up">
                        {[
                            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600",
                            "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600",
                            "https://images.unsplash.com/photo-1505934333218-8fe21ff8cece?auto=format&fit=crop&q=80&w=600",
                            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600"
                        ].map((img, i) => (
                            <div key={i} className="relative h-48 md:h-72 rounded-2xl overflow-hidden group border border-white/5">
                                <Image src={img} alt={`Gallery ${i}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-500"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE EVER MOMENT */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16 fade-up">
                    <h4 className="text-[#D9A05B] text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center justify-center gap-3">
                        <span className="w-6 h-px bg-[#D9A05B]/30"></span>
                        WHY CHOOSE EVER MOMENT
                        <span className="w-6 h-px bg-[#D9A05B]/30"></span>
                    </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
                    {[
                        { title: "Personalized Styling", desc: "Not just frames, complete styling that complements you.", icon: <User className="w-8 h-8 stroke-1 text-[#D9A05B]" /> },
                        { title: "Curated Premium Collections", desc: "Handpicked eyewear from world's finest brands.", icon: <Gem className="w-8 h-8 stroke-1 text-[#D9A05B]" /> },
                        { title: "One-to-One Experience", desc: "Private sessions focused only on you.", icon: <Users className="w-8 h-8 stroke-1 text-[#D9A05B]" /> },
                        { title: "Home Trial Convenience", desc: "Try at home with zero pressure before deciding.", icon: <Home className="w-8 h-8 stroke-1 text-[#D9A05B]" /> },
                        { title: "Designed for Real Moments", desc: "We style for memories that last a lifetime.", icon: <Heart className="w-8 h-8 stroke-1 text-[#D9A05B]" /> }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center fade-up" style={{transitionDelay: `${i * 100}ms`}}>
                            <div className="mb-6 bg-[#1A1A1A] w-16 h-16 rounded-full flex items-center justify-center shadow-lg border border-white/5">{item.icon}</div>
                            <h3 className="font-serif text-base font-medium mb-3 text-white">{item.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="px-6 pb-20 max-w-7xl mx-auto fade-up">
                <div className="bg-[#151515] rounded-3xl overflow-hidden flex flex-col md:flex-row items-center shadow-2xl border border-white/5">
                    <div className="flex-1 p-10 md:p-16 lg:p-20 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-serif font-medium text-white mb-6 leading-tight">
                            Your moment deserves <br/>
                            <span className="italic text-[#D9A05B]">the perfect frame.</span>
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base max-w-md mb-10 leading-relaxed">
                            Book your private styling session today and let us curate a look that's uniquely yours.
                        </p>
                        <Link href="/booking">
                            <button className="bg-[#D9A05B] text-[#111] px-8 py-4 rounded-full font-bold text-xs md:text-sm tracking-widest uppercase hover:bg-[#c58f4a] transition-all transform hover:scale-105 flex items-center gap-2">
                                BOOK YOUR STYLING SESSION <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>
                    <div className="w-full md:w-2/5 h-72 md:h-full min-h-[400px] self-stretch relative">
                        <Image src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800" alt="Eyewear and box" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#151515] via-[#151515]/50 to-transparent md:bg-gradient-to-r md:from-[#151515] md:via-[#151515]/20 md:to-transparent"></div>
                    </div>
                </div>
            </section>

            {/* PRE-FOOTER FEATURES */}
            <section className="border-t border-white/10 bg-[#111111] py-12 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { title: "By Appointment Only", desc: "Personalized attention for every client.", icon: <User className="w-5 h-5 text-[#D9A05B]" /> },
                        { title: "Available Across India", desc: "Private styling sessions at your location.", icon: <MapPin className="w-5 h-5 text-[#D9A05B]" /> },
                        { title: "Trusted & Confidential", desc: "Your style journey is always private.", icon: <ShieldCheck className="w-5 h-5 text-[#D9A05B]" /> },
                        { title: "Flexible Scheduling", desc: "Timings that suit your convenience.", icon: <Clock className="w-5 h-5 text-[#D9A05B]" /> }
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 fade-up">
                            <div className="mt-1 bg-[#1A1A1A] p-2 rounded-full border border-white/5">{item.icon}</div>
                            <div>
                                <h4 className="font-serif text-sm font-medium text-white mb-1">{item.title}</h4>
                                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default EverHome;
