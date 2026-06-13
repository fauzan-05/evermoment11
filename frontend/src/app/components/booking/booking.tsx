"use client";

import React, { useEffect, useState } from "react";
import { safeJson } from "@/lib/http";

type ServiceOption = {
  _id: string;
  slug: string;
  title: string;
};

const Booking = () => {
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    location: "",
    service: "",
    message: "",
  });

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/api/services");
        const data = await safeJson<ServiceOption[]>(response, []);

        if (Array.isArray(data)) {
          setServices(data);
        }
      } catch {
        setServices([]);
      }
    }

    fetchServices();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

const handleSubmit = async () => {
  if (
    !formData.name ||
    !formData.phone ||
    !formData.date ||
    !formData.location ||
    !formData.service
  ) {
    alert("Please fill all required fields");
    return;
  }

  const selectedService =
    services.find((s) => s.slug === formData.service)?.title ||
    formData.service;

  const whatsappMessage = `
✨ *NEW APPOINTMENT REQUEST*

━━━━━━━━━━━━━━━━━━━━

👤 *CUSTOMER DETAILS*

▪ *Name:* ${formData.name}
▪ *Phone:* ${formData.phone}

📅 *APPOINTMENT DETAILS*

▪ *Date:* ${formData.date}
▪ *Location:* ${formData.location}
▪ *Service:* ${selectedService}

💬 *MESSAGE*

${formData.message || "No additional message"}

━━━━━━━━━━━━━━━━━━━━

🌐 Submitted from *Ever Moment Website*
`;

  const whatsappUrl = `https://wa.me/919633663256?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const openWhatsApp = () => {
    window.location.href = whatsappUrl;
  };

  try {
    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        service: selectedService,
      }),
    });

    const data = await safeJson<{ success?: boolean } | null>(
      response,
      null
    );

    if (response.ok && data?.success) {
      openWhatsApp();
      return;
    }

    openWhatsApp();
  } catch {
    openWhatsApp();
  }
};

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans pt-32 pb-20 px-6">
      <div className="max-w-xl mx-auto bg-[#151515] rounded-3xl shadow-sm border border-white/10 p-8 md:p-12">
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.34em] text-[#D9A05B] font-bold mb-4">
            Appointment
          </p>

          <h1 className="text-3xl md:text-5xl font-serif text-white">
            Book Your Styling Session
          </h1>

          <p className="mt-5 text-gray-400 leading-relaxed">
            Share your occasion and preferences. Ever Moment will connect with
            you to plan a private styling appointment.
          </p>
        </div>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-bold text-gray-200 mb-2"
            >
              Name
            </label>

            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#0A0A0A] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D9A05B]/50"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-bold text-gray-200 mb-2"
            >
              Phone Number
            </label>

            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#0A0A0A] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D9A05B]/50"
            />
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-bold text-gray-200 mb-2"
            >
              Appointment Date
            </label>

            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#0A0A0A] text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D9A05B]/50"
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-bold text-gray-200 mb-2"
            >
              Location
            </label>

            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#0A0A0A] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D9A05B]/50"
            />
          </div>

          {/* Service */}
          <div>
            <label
              htmlFor="service"
              className="block text-sm font-bold text-gray-200 mb-2"
            >
              Services Type
            </label>

            <select
              id="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#0A0A0A] text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D9A05B]/50"
            >
              <option value="">Select a styling service</option>

              {services.map((service) => (
                <option key={service.slug} value={service.slug}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-bold text-gray-200 mb-2"
            >
              Message
            </label>

            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Additional information"
              className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#0A0A0A] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D9A05B]/50 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#D9A05B] hover:bg-white text-[#111] font-bold py-4 px-6 rounded-lg transition-colors mt-8 shadow-md"
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
