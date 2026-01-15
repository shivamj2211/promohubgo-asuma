export const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export async function apiFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${BACKEND}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.ok === false) {
    throw new Error(data?.error || "Request failed");
  }
  return data;
}
