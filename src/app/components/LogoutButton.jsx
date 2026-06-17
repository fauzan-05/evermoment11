"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    console.log("clicked");

    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/admin/login";
  };

  return (
    <button
      type="button"
      onClick={logout}
      className="rounded-lg bg-red-600 px-4 py-2 text-white"
    >
      Logout
    </button>
  );
}