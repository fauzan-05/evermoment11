"use client";

import React from "react";

const Booking = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans pt-32 pb-20">
      <div className="max-w-xl mx-auto px-6 bg-white rounded-3xl shadow-sm border border-black/5 p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-[#2D2926]">Booking form</h1>
        </div>

        <form className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-800 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-[#C5A880] transition-colors"
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-gray-800 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Phone number"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-[#C5A880] transition-colors"
            />
          </div>

          {/* Wedding Date Field */}
          <div>
            <label htmlFor="date" className="block text-sm font-bold text-gray-800 mb-2">
              Wedding Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="date"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-[#C5A880] transition-colors appearance-none text-gray-500"
              />
            </div>
          </div>

          {/* Location Field */}
          <div>
            <label htmlFor="location" className="block text-sm font-bold text-gray-800 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="Location"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-[#C5A880] transition-colors"
            />
          </div>

          {/* Services Type Field */}
          <div>
            <label htmlFor="service" className="block text-sm font-bold text-gray-800 mb-2">
              Services Type
            </label>
            <select
              id="service"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-[#C5A880] transition-colors bg-white text-gray-500 appearance-none"
              defaultValue=""
            >
              <option value="" disabled>Service type options</option>
              <option value="bride-groom">Bride & Groom Ensemble</option>
              <option value="family">Family Styling</option>
              <option value="friends">Friends & Crew Styling</option>
              <option value="guests">Guest Experience Styling</option>
            </select>
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-bold text-gray-800 mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Message (optional)"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 focus:border-[#C5A880] transition-colors resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="w-full bg-[#C5A880] hover:bg-[#b59870] text-white font-bold py-4 px-6 rounded-lg transition-colors mt-8 shadow-md"
          >
            Confirm Appointment
          </button>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="px-4 text-gray-400 text-sm font-medium uppercase">Or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
