import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "../components/Header";

export const Route = createFileRoute("/licencia")({
  head: () => ({ meta: [{ title: "Mi licencia · FormalízaYa" }] }),
  component: Licencia,
});

type Estado = "ok" | "warn" | "bad";

function Licencia() {
  const router = useRouter();
  // Datos demo
  const estado: Estado = "warn";
  const dias = 12;
  const vence = "28 de marzo de 2025";
  const numero = "LIC-2024-08812";

  const [loading, setLoading] = useState(false);

  function solicitar() {
    setLoading(true);
    setTimeout(() => {
      const resumen = {
        tipo: "ambulante" as const,
        items: [
          { label: "Trámite", value: "Renovación de licencia" },
          { label: "Licencia", value: numero },
          { label: "Estado", value: "En revisión" },
        ],
        next: "/vendedor",
      };
      sessionStorage.setItem("fy_resumen", JSON.stringify(resumen));
      router.navigate({ to: "/confirmacion" });
    }, 1100);
  }

  if (loading) {
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

  const map = {
    ok:   { cls: "fy-license-hero--ok",   icon: "✓", title: "Tu licencia está vigente", color: "verde" },
    warn: { cls: "fy-license-hero--warn", icon: "⏳", title: "Tu licencia está por vencer", color: "amarillo" },
    bad:  { cls: "fy-license-hero--bad",  icon: "✕", title: "Tu licencia está vencida", color: "rojo" },
  } as const;
  const m = map[estado];

  return (
    <div className="fy-app">
      <Header showBack to="/vendedor" />
      <main className="fy-page">
        <div className={`fy-license-hero ${m.cls}`}>
          <div className="fy-license-hero__icon" aria-hidden>{m.icon}</div>
          <div className="fy-license-hero__title">{m.title}</div>
          <div className="fy-license-hero__days">
            Faltan <strong>{dias} días</strong> para que venza
          </div>
        </div>

        <div className="fy-card">
          <div className="fy-info-row">
            <span>📄 Número</span>
            <strong>{numero}</strong>
          </div>
          <div className="fy-info-row">
            <span>📅 Vence el</span>
            <strong>{vence}</strong>
          </div>
          <div className="fy-info-row">
            <span>🚦 Estado</span>
            <strong>Por vencer</strong>
          </div>
        </div>

        <div className="fy-cta">
          <button className="fy-btn" onClick={solicitar}>
            <span className="fy-btn__icon" aria-hidden>🔄</span> Renovar mi licencia
          </button>
        </div>
      </main>
    </div>
  );
}
