"use client";

import React from "react";
import { services } from "@/app/lib/services";

const Booking = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans pt-32 pb-20 px-6">
      <div className="max-w-xl mx-auto bg-[#151515] rounded-3xl shadow-sm border border-white/10 p-8 md:p-12">
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.34em] text-[#D9A05B] font-bold mb-4">
            Appointment
          </p>
          <h1 className="text-3xl md:text-5xl font-serif text-white">Book Your Styling Session</h1>
          <p className="mt-5 text-gray-400 leading-relaxed">
            Share your occasion and preferences. Ever Moment will connect with you to plan a private styling appointment.
          </p>
        </div>

        <form className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-200 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#0A0A0A] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D9A05B]/50 focus:border-[#D9A05B] transition-colors"
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-gray-200 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Phone number"
              className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#0A0A0A] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D9A05B]/50 focus:border-[#D9A05B] transition-colors"
            />
          </div>

          {/* Wedding Date Field */}
          <div>
            <label htmlFor="date" className="block text-sm font-bold text-gray-200 mb-2">
              Wedding Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="date"
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#D9A05B]/50 focus:border-[#D9A05B] transition-colors appearance-none text-gray-400"
              />
            </div>
          </div>

          {/* Location Field */}
          <div>
            <label htmlFor="location" className="block text-sm font-bold text-gray-200 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="Location"
              className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#0A0A0A] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D9A05B]/50 focus:border-[#D9A05B] transition-colors"
            />
          </div>

          {/* Services Type Field */}
          <div>
            <label htmlFor="service" className="block text-sm font-bold text-gray-200 mb-2">
              Services Type
            </label>
            <select
              id="service"
              className="w-full px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#D9A05B]/50 focus:border-[#D9A05B] transition-colors bg-[#0A0A0A] text-gray-400 appearance-none"
              defaultValue=""
            >
              <option value="" disabled>Select a styling service</option>
              {services.map((service) => (
                <option key={service.slug} value={service.slug}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-bold text-gray-200 mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Message (optional)"
              className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#0A0A0A] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D9A05B]/50 focus:border-[#D9A05B] transition-colors resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="w-full bg-[#D9A05B] hover:bg-white text-[#111] font-bold py-4 px-6 rounded-lg transition-colors mt-8 shadow-md"
          >
            Confirm Appointment
          </button>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="px-4 text-gray-400 text-sm font-medium uppercase">Or</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
