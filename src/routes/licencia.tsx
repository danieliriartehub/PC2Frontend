import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { API_BASE } from "../lib/api";

export const Route = createFileRoute("/licencia")({
  head: () => ({ meta: [{ title: "Mi licencia · FormalízaYa" }] }),
  component: Licencia,
});

type Estado = "ok" | "warn" | "bad";

interface LicenciaData {
  id: number;
  negocio_id: number;
  numero_licencia: string;
  tipo_licencia: string;
  estado: string;
  fecha_emision: string | null;
  fecha_vencimiento: string | null;
  entidad_emisora: string | null;
}

function Licencia() {
  const router = useRouter();
  const [licencias, setLicencias] = useState<LicenciaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [renovando, setRenovando] = useState(false);

  const token = sessionStorage.getItem("fy_token");

  useEffect(() => {
    if (!token) {
      router.navigate({ to: "/login" });
      return;
    }
    fetchLicencias();
  }, [router, token]);

  async function fetchLicencias() {
    try {
      const res = await fetch(`${API_BASE}/licencias`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        sessionStorage.removeItem("fy_token");
        router.navigate({ to: "/login" });
        return;
      }
      if (!res.ok) throw new Error("Error cargando licencias");
      const data = await res.json();
      setLicencias(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function solicitarRenovacion(lic: LicenciaData) {
    setRenovando(true);
    try {
      const res = await fetch(`${API_BASE}/solicitudes/renovacion`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          licencia_id: lic.id,
          negocio_id: lic.negocio_id,
          motivo: "Renovación solicitada por el titular",
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Error al solicitar renovación");
      }

      const resumen = {
        tipo: "ambulante" as const,
        items: [
          { label: "Trámite", value: "Renovación de licencia" },
          { label: "Licencia", value: lic.numero_licencia },
          { label: "Estado", value: "Pendiente de revisión" },
        ],
        next: "/vendedor",
      };
      sessionStorage.setItem("fy_resumen", JSON.stringify(resumen));
      router.navigate({ to: "/confirmacion" });
    } catch (err: any) {
      setError(err.message);
      setRenovando(false);
    }
  }

  if (loading) {
    return (
      <div className="fy-app">
        <Header />
        <main className="fy-page">
          <div className="fy-loading">
            <div className="fy-loading__emoji" aria-hidden>📄</div>
            <div className="fy-loading__text">Cargando tus licencias...</div>
          </div>
        </main>
      </div>
    );
  }

  if (renovando) {
    return (
      <div className="fy-app">
        <Header />
        <main className="fy-page">
          <div className="fy-loading">
            <div className="fy-loading__emoji" aria-hidden>📨</div>
            <div className="fy-loading__text">Estamos enviando tu solicitud...</div>
            <div className="fy-loading__hint">Espera un momentito por favor.</div>
          </div>
        </main>
      </div>
    );
  }

  if (licencias.length === 0) {
    return (
      <div className="fy-app">
        <Header showBack to="/vendedor" />
        <main className="fy-page">
          <h1 className="fy-h1">Mi licencia</h1>
          <div className="fy-card" style={{ textAlign: "center", padding: "2rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>📄</div>
            <p>Aún no tienes ninguna licencia registrada.</p>
            <p style={{ fontSize: "0.85rem", color: "#888", marginTop: "0.5rem" }}>
              Solicita una desde tu panel principal.
            </p>
            <button className="fy-btn" style={{ marginTop: "1rem" }} onClick={() => router.navigate({ to: "/vendedor" })}>
              Volver al panel
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Mostrar la primera licencia
  const lic = licencias[0];

  function calcEstado(l: LicenciaData): Estado {
    if (l.estado === "vencida" || l.estado === "anulada") return "bad";
    if (l.estado === "por_vencer") return "warn";
    if (l.fecha_vencimiento) {
      const diff = new Date(l.fecha_vencimiento).getTime() - Date.now();
      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      if (dias <= 0) return "bad";
      if (dias <= 30) return "warn";
    }
    return "ok";
  }

  const estado = calcEstado(lic);
  const diasRestantes = lic.fecha_vencimiento
    ? Math.max(0, Math.floor((new Date(lic.fecha_vencimiento).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  const fechaVence = lic.fecha_vencimiento
    ? new Date(lic.fecha_vencimiento).toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" })
    : "Sin fecha";

  const map = {
    ok:   { cls: "fy-license-hero--ok",   icon: "✓", title: "Tu licencia está vigente" },
    warn: { cls: "fy-license-hero--warn", icon: "⏳", title: "Tu licencia está por vencer" },
    bad:  { cls: "fy-license-hero--bad",  icon: "✕", title: "Tu licencia está vencida" },
  } as const;
  const m = map[estado];

  const estadoTexto: Record<string, string> = {
    vigente: "Vigente",
    por_vencer: "Por vencer",
    vencida: "Vencida",
    en_tramite: "En trámite",
    anulada: "Anulada",
  };

  return (
    <div className="fy-app">
      <Header showBack to="/vendedor" />
      <main className="fy-page">
        {error && <div className="fy-error" style={{ marginBottom: "1rem" }}>❌ {error}</div>}

        <div className={`fy-license-hero ${m.cls}`}>
          <div className="fy-license-hero__icon" aria-hidden>{m.icon}</div>
          <div className="fy-license-hero__title">{m.title}</div>
          <div className="fy-license-hero__days">
            {estado === "bad" ? (
              <span>Tu licencia ha expirado</span>
            ) : (
              <span>Faltan <strong>{diasRestantes} días</strong> para que venza</span>
            )}
          </div>
        </div>

        <div className="fy-card">
          <div className="fy-info-row">
            <span>📄 Número</span>
            <strong>{lic.numero_licencia}</strong>
          </div>
          <div className="fy-info-row">
            <span>📋 Tipo</span>
            <strong>{lic.tipo_licencia === "provisional" ? "Provisional" : "Definitiva"}</strong>
          </div>
          <div className="fy-info-row">
            <span>📅 Vence el</span>
            <strong>{fechaVence}</strong>
          </div>
          <div className="fy-info-row">
            <span>🚦 Estado</span>
            <strong>{estadoTexto[lic.estado] || lic.estado}</strong>
          </div>
          {lic.entidad_emisora && (
            <div className="fy-info-row">
              <span>🏛️ Emisor</span>
              <strong>{lic.entidad_emisora}</strong>
            </div>
          )}
        </div>

        <div className="fy-cta">
          <button className="fy-btn" onClick={() => solicitarRenovacion(lic)}>
            <span className="fy-btn__icon" aria-hidden>🔄</span> Renovar mi licencia
          </button>
        </div>
      </main>
    </div>
  );
}
