"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPassword() {
  const params = useSearchParams();

  const token = params.get("token");

  const [password, setPassword] =
    useState("");

  const resetPassword = async () => {
    const res = await fetch(
      "/api/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      }
    );

    const data = await res.json();

    alert(data.message);
  };

  return (
    <div className="p-10">
      <h1>Reset Password</h1>

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button onClick={resetPassword}>
        Update Password
      </button>
    </div>
  );
}