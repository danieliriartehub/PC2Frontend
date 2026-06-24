/**
 * Cliente mínimo para la API REST de FormalízaYa (FastAPI).
 * Ajusta API_BASE cuando conectes el backend.
 */
export const API_BASE = (import.meta.env.VITE_API_BASE as string) ?? "/api";

export async function apiPost<T = unknown>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return (await res.json()) as T;
}

export async function apiGet<T = unknown>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return (await res.json()) as T;
}
