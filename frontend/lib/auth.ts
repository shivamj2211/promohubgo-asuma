import { apiFetch } from "@/lib/api";

export async function getMe() {
  return apiFetch("/api/me", { method: "GET" });
}
