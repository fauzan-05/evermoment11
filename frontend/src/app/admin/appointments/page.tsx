"use client";

import { useEffect, useState, useRef } from "react";
import {
  Trash2,
  Eye,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  Clock3,
  CheckCircle,
  XCircle,
  BadgeCheck,
} from "lucide-react";
import { safeJson } from "@/lib/http";

type Appointment = {
  _id: string;
  name: string;
  phone: string;
  date: string;
  location: string;
  service: string;
  message: string;
  status: string;
  isRead: boolean;
};

export default function AdminAppointments() {
  const lastAppointmentIdRef =
  useRef<string | null>(null);
  const [appointments, setAppointments] = useState<
    Appointment[]
  >([]);
const lastCountRef = useRef(0);
  const [fetchError, setFetchError] = useState("");

  const [activeTab, setActiveTab] =
    useState("Pending");

useEffect(() => {
  fetchAppointments();

  const interval = setInterval(() => {
    fetchAppointments();
  }, 10000);

  return () => clearInterval(interval);
}, []);
useEffect(() => {
  if (
    "Notification" in window &&
    Notification.permission !==
      "granted"
  ) {
    Notification.requestPermission();
  }
}, []);

const fetchAppointments = async () => {
  try {
    const res = await fetch("/api/appointments", {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await safeJson<{ error?: string } | null>(
        res,
        null
      );

      setFetchError(
        errorData?.error ||
          `Failed to fetch appointments: ${res.status}`
      );
      return;
    }

    const data = await safeJson<Appointment[]>(res, []);
    setFetchError("");

    if (!Array.isArray(data)) {
      setAppointments([]);
      return;
    }

    // First load only
    if (lastCountRef.current === 0) {
      lastCountRef.current = data.length;
    }

    // New appointment arrived
    if (data.length > lastCountRef.current) {
      console.log("NEW APPOINTMENT DETECTED");

      try {
        const audio = new Audio(
          "/notification.mp3"
        );

        audio.volume = 1;

        await audio.play();

        console.log("SOUND PLAYED");
      } catch (err) {
        console.log(
          "SOUND BLOCKED",
          err
        );
      }

      if (
        "Notification" in window &&
        Notification.permission ===
          "granted"
      ) {
        new Notification(
          "🔔 New Appointment Request",
          {
            body: `${data[0]?.name || "Someone"} submitted a new appointment.`,
          }
        );
      }
    }

    console.log(
      "Current:",
      data.length,
      "Previous:",
      lastCountRef.current
    );

    // Update count after checks
    lastCountRef.current = data.length;

    setAppointments(data);
  } catch (error) {
    setFetchError(
      error instanceof Error
        ? error.message
        : "Failed to fetch appointments"
    );
  }
};



     
  const markAsSeen = async (id: string) => {
    await fetch("/api/appointments", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        isRead: true,
      }),
    });

    fetchAppointments();
  };

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    await fetch("/api/appointments", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status,
      }),
    });

    fetchAppointments();
  };

  const deleteAppointment = async (
    id: string
  ) => {
    const ok = confirm(
      "Delete this appointment?"
    );

    if (!ok) return;

    await fetch(
      `/api/appointments?id=${id}`,
      {
        method: "DELETE",
      }
    );

    fetchAppointments();
  };

  const unreadCount = appointments.filter(
    (a) => !a.isRead
  ).length;

  const pendingCount = appointments.filter(
    (a) => a.status === "Pending"
  ).length;

  const confirmedCount =
    appointments.filter(
      (a) => a.status === "Confirmed"
    ).length;

  const completedCount =
    appointments.filter(
      (a) => a.status === "Completed"
    ).length;

  const cancelledCount =
    appointments.filter(
      (a) => a.status === "Cancelled"
    ).length;

  const filteredAppointments =
    appointments.filter(
      (a) => a.status === activeTab
    );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white px-6 pb-8 pt-28 md:px-8 md:pb-10 md:pt-32">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-10">
          <p className="uppercase tracking-[0.35em] text-xs text-[#D9A05B]">
            Admin Dashboard
          </p>

          <h1 className="text-5xl font-bold mt-2">
            Appointments
          </h1>
        </div>

        {fetchError && (
          <div className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-200">
            {fetchError}
          </div>
        )}

        {/* STATS */}

        <div className="grid md:grid-cols-5 gap-4 mb-10">

          <div className="bg-[#151515] p-5 rounded-3xl border border-white/10">
            <p className="text-gray-400">
              New Requests
            </p>

            <h2 className="text-3xl font-bold text-[#D9A05B] mt-2">
              {unreadCount}
            </h2>
          </div>

          <div className="bg-[#151515] p-5 rounded-3xl border border-yellow-500/20">
            <p className="text-gray-400">
              Pending
            </p>

            <h2 className="text-3xl font-bold text-yellow-500 mt-2">
              {pendingCount}
            </h2>
          </div>

          <div className="bg-[#151515] p-5 rounded-3xl border border-green-500/20">
            <p className="text-gray-400">
              Confirmed
            </p>

            <h2 className="text-3xl font-bold text-green-500 mt-2">
              {confirmedCount}
            </h2>
          </div>

          <div className="bg-[#151515] p-5 rounded-3xl border border-blue-500/20">
            <p className="text-gray-400">
              Completed
            </p>

            <h2 className="text-3xl font-bold text-blue-500 mt-2">
              {completedCount}
            </h2>
          </div>

          <div className="bg-[#151515] p-5 rounded-3xl border border-red-500/20">
            <p className="text-gray-400">
              Cancelled
            </p>

            <h2 className="text-3xl font-bold text-red-500 mt-2">
              {cancelledCount}
            </h2>
          </div>

        </div>

        {/* CATEGORY BUTTONS */}

        <div className="flex flex-wrap gap-3 mb-10">

          <button
            onClick={() =>
              setActiveTab("Pending")
            }
            className={`px-5 py-3 rounded-2xl font-medium ${
              activeTab === "Pending"
                ? "bg-yellow-500 text-black"
                : "bg-[#151515]"
            }`}
          >
            <Clock3
              size={16}
              className="inline mr-2"
            />
            Pending
          </button>

          <button
            onClick={() =>
              setActiveTab("Confirmed")
            }
            className={`px-5 py-3 rounded-2xl font-medium ${
              activeTab === "Confirmed"
                ? "bg-green-600"
                : "bg-[#151515]"
            }`}
          >
            <CheckCircle
              size={16}
              className="inline mr-2"
            />
            Confirmed
          </button>

          <button
            onClick={() =>
              setActiveTab("Completed")
            }
            className={`px-5 py-3 rounded-2xl font-medium ${
              activeTab === "Completed"
                ? "bg-blue-600"
                : "bg-[#151515]"
            }`}
          >
            <BadgeCheck
              size={16}
              className="inline mr-2"
            />
            Completed
          </button>

          <button
            onClick={() =>
              setActiveTab("Cancelled")
            }
            className={`px-5 py-3 rounded-2xl font-medium ${
              activeTab === "Cancelled"
                ? "bg-red-600"
                : "bg-[#151515]"
            }`}
          >
            <XCircle
              size={16}
              className="inline mr-2"
            />
            Cancelled
          </button>

        </div>

        {/* APPOINTMENTS */}

        <div className="grid gap-6">

          {filteredAppointments.map(
            (item) => (
              <div
                key={item._id}
                className={`bg-[#151515] border rounded-3xl p-6 ${
                  !item.isRead
                    ? "border-[#D9A05B]"
                    : "border-white/10"
                }`}
              >
                <div className="flex justify-between">

                  <div>

                    <div className="flex items-center gap-3">

                      <h2 className="text-2xl font-bold">
                        {item.name}
                      </h2>

                      {!item.isRead && (
                        <span className="bg-[#D9A05B] text-black px-3 py-1 rounded-full text-xs font-bold">
                          NEW
                        </span>
                      )}

                    </div>

                    <div className="mt-5 grid gap-3 text-gray-300 sm:grid-cols-2">

                      <p className="flex items-center gap-2">
                        <Phone size={16} />
                        {item.phone}
                      </p>

                      <p className="flex items-center gap-2">
                        <Calendar size={16} />
                        {item.date}
                      </p>

                      <p className="flex items-center gap-2">
                        <MapPin size={16} />
                        {item.location}
                      </p>

                      <p className="hidden">
                        🛍️ {item.service}
                      </p>

                      <p className="hidden">
                        <MessageSquare
                          size={16}
                        />
                        {item.message ||
                          "No message"}
                      </p>

                    </div>

                    <div className="mt-5 grid gap-4 lg:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-4">
                        <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#D9A05B]">
                          <BadgeCheck size={15} />
                          Service Type
                        </p>
                        <p className="text-sm leading-6 text-white/80">
                          {item.service || "Not selected"}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-4">
                        <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#D9A05B]">
                          <MessageSquare size={15} />
                          Message
                        </p>
                        <p className="text-sm leading-6 text-white/70">
                          {item.message || "No message"}
                        </p>
                      </div>
                    </div>

                  </div>

                  <div className="flex gap-3">

                    {!item.isRead && (
                      <button
                        onClick={() =>
                          markAsSeen(
                            item._id
                          )
                        }
                        className="bg-green-600 px-4 py-3 rounded-xl"
                      >
                        <Eye size={18} />
                      </button>
                    )}

                    <button
                      onClick={() =>
                        deleteAppointment(
                          item._id
                        )
                      }
                      className="bg-red-600 px-4 py-3 rounded-xl"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>

                <div className="mt-6">

                  <select
                    value={item.status}
                    onChange={(e) =>
                      updateStatus(
                        item._id,
                        e.target.value
                      )
                    }
                    className="bg-[#0A0A0A] border border-white/10 px-4 py-3 rounded-xl"
                  >
                    <option>
                      Pending
                    </option>

                    <option>
                      Confirmed
                    </option>

                    <option>
                      Completed
                    </option>

                    <option>
                      Cancelled
                    </option>

                  </select>

                </div>
              </div>
            )
          )}

          {filteredAppointments.length ===
            0 && (
            <div className="bg-[#151515] rounded-3xl border border-white/10 p-16 text-center text-gray-400">
              No appointments in this
              category.
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
