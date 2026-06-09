import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        Ever Moment Admin
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <Link
          href="/admin/appointments"
          className="bg-[#151515] p-8 rounded-3xl border border-white/10 hover:border-[#D9A05B]"
        >
          <h2 className="text-2xl font-bold">
            Appointments
          </h2>

          <p className="text-gray-400 mt-2">
            Manage bookings
          </p>
        </Link>

        <Link
          href="/admin/gallery"
          className="bg-[#151515] p-8 rounded-3xl border border-white/10 hover:border-[#D9A05B]"
        >
          <h2 className="text-2xl font-bold">
            Gallery
          </h2>

          <p className="text-gray-400 mt-2">
            Upload and manage images
          </p>
        </Link>
      </div>
    </div>
  );
}