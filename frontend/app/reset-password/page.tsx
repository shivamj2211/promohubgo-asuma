"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function ResetPassword() {
  const sp = useSearchParams();
  const router = useRouter();
  const token = sp.get("token") || "";
  const email = sp.get("email") || "";

  const [newPassword, setNewPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setErr("");
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token, email, newPassword }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) throw new Error(data?.error || "Request failed");
      router.push("/login");
    } catch (e: any) {
      setErr(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-xl font-semibold">Reset Password</h1>
        {err ? <div className="text-sm text-red-600">{err}</div> : null}
        <input className="w-full border rounded px-3 py-2" placeholder="New password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <Button className="w-full" disabled={loading || !token || !email} onClick={submit}>
          {loading ? "Updating..." : "Update password"}
        </Button>
      </div>
    </div>
  );
}
