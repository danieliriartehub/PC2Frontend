import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";

export const Route = createFileRoute("/confirmacion")({
  head: () => ({ meta: [{ title: "¡Listo! · FormalízaYa" }] }),
  component: Confirmacion,
});

type Resumen = {
  tipo: "ambulante" | "galeria";
  items: { label: string; value: string }[];
  next: string;
};

function Confirmacion() {
  const router = useRouter();
  const [resumen, setResumen] = useState<Resumen | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("fy_resumen");
    if (raw) setResumen(JSON.parse(raw));
  }, []);

  return (
    <div className="fy-app">
      <Header />
      <main className="fy-page">
        <div className="fy-success-hero">
          <div className="fy-success-check" aria-hidden>✓</div>
          <h1 className="fy-success-title">¡Ya estás en FormalízaYa!</h1>
          <p className="fy-success-sub">Guardamos tu información correctamente. No perdiste nada.</p>
        </div>

        {resumen && (
          <div className="fy-summary">
            <div className="fy-summary__title">Esto fue lo que registramos</div>
            {resumen.items.map((it) => (
              <div className="fy-info-row" key={it.label}>
                <span>{it.label}</span>
                <strong>{it.value}</strong>
              </div>
            ))}
          </div>
        )}

        <div className="fy-cta">
          <button
            className="fy-btn"
            onClick={() => router.navigate({ to: (resumen?.next as "/vendedor") ?? "/vendedor" })}
          >
            <span className="fy-btn__icon" aria-hidden>🏠</span> Ir a mi negocio
          </button>
        </div>
      </main>
    </div>
  );
}
