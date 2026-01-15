"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setErr("");
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) throw new Error(data?.error || "Request failed");
      setDone(true);
    } catch (e: any) {
      setErr(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-xl font-semibold">Forgot Password</h1>
        {done ? (
          <div className="text-sm">If your email exists, a reset link has been sent.</div>
        ) : (
          <>
            {err ? <div className="text-sm text-red-600">{err}</div> : null}
            <input className="w-full border rounded px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button className="w-full" disabled={loading} onClick={submit}>
              {loading ? "Sending..." : "Send reset link"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
