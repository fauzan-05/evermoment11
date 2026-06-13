"use client";

import { useEffect,useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { safeJson } from "@/lib/http";

type Service = {
  _id:string;
  title:string;
  slug:string;
  category:string;
  shortDescription:string;
  description:string;
  image:string;
  includes:string[];
};

export default function StylingServices() {
  const [services,setServices] =
    useState<Service[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    const res =
      await fetch(
        "/api/services"
      );

    const data =
      await safeJson<Service[]>(res, []);

    setServices(Array.isArray(data) ? data : []);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">

      <section className="pt-32 pb-20 text-center">

        <h1 className="text-6xl font-serif">
          Styling Services
        </h1>

      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="grid md:grid-cols-3 gap-8">

          {services.map(
            (service) => (
              <div
                key={service._id}
                className="bg-[#151515] rounded-3xl overflow-hidden"
              >

                <div className="relative h-72">

                  <Image
                    src={
                      service.image
                    }
                    alt={
                      service.title
                    }
                    fill
                    unoptimized
                    className="object-cover"
                  />

                </div>

                <div className="p-8">

                  <h3 className="text-2xl font-serif mb-4">
                    {service.title}
                  </h3>

                  <p className="text-white/60 mb-6">
                    {
                      service.shortDescription
                    }
                  </p>

                  <Link
                    href={`/services/${service.slug}`}
                    className="bg-[#D9A05B] text-black px-6 py-3 rounded-xl"
                  >
                    View Experience
                  </Link>

                </div>

              </div>
            )
          )}

        </div>

      </section>

    </div>
  );
}
