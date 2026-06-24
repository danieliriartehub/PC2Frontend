import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "../components/Header";
import { apiPost, API_BASE } from "../lib/api";

export const Route = createFileRoute("/registro-ambulante")({
  head: () => ({ meta: [{ title: "Registro · FormalízaYa" }] }),
  component: RegistroAmbulante,
});

type Rubro = "" | "ropa_mujer" | "ropa_hombre" | "ropa_nino" | "calzado" | "accesorios" | "telas";

const RUBROS: { value: Rubro; label: string; emoji: string }[] = [
  { value: "ropa_mujer", label: "Vendo ropa de mujer", emoji: "👗" },
  { value: "ropa_hombre", label: "Vendo ropa de hombre", emoji: "👔" },
  { value: "ropa_nino", label: "Vendo ropa de niños", emoji: "🧒" },
  { value: "calzado", label: "Vendo calzado", emoji: "👟" },
  { value: "accesorios", label: "Vendo accesorios", emoji: "👜" },
  { value: "telas", label: "Vendo telas", emoji: "🧵" },
];

function RegistroAmbulante() {
  const router = useRouter();
  const [dni, setDni] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [negocio, setNegocio] = useState("");
  const [rubro, setRubro] = useState<Rubro>("");
  const [referencia, setReferencia] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  function validar() {
    const e: Record<string, string> = {};
    if (!/^\d{8}$/.test(dni)) e.dni = "Tu DNI debe tener 8 números";
    if (!correo.includes("@")) e.correo = "Ingresa un correo electrónico válido";
    if (password.length < 6) e.password = "La contraseña debe tener al menos 6 caracteres";
    if (negocio.trim().length < 2) e.negocio = "Escribe el nombre de tu negocio";
    if (!rubro) e.rubro = "Elige qué vendes";
    if (referencia.trim().length < 4) e.referencia = "Cuéntanos dónde vendes (ejemplo: frente a Los Andes)";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setServerError("");
    if (!validar()) return;
    setLoading(true);
    try {
      // POST /negocios/registrar_ambulante  (FastAPI)
      const res = await fetch(`${API_BASE}/negocios/registrar_ambulante`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dni, correo, password, negocio, rubro, referencia }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Ocurrió un error al registrarse");
      }
      const resumen = {
        tipo: "ambulante" as const,
        items: [
          { label: "DNI", value: dni },
          { label: "Negocio", value: negocio },
          { label: "Rubro", value: RUBROS.find((r) => r.value === rubro)?.label ?? "" },
          { label: "Ubicación", value: referencia },
        ],
        next: "/login",
      };
      sessionStorage.setItem("fy_resumen", JSON.stringify(resumen));
      router.navigate({ to: "/confirmacion" });
    } catch (err: any) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="fy-app">
        <Header />
        <main className="fy-page">
          <div className="fy-loading">
            <div className="fy-loading__emoji" aria-hidden>📝</div>
            <div className="fy-loading__text">Estamos guardando tu información...</div>
            <div className="fy-loading__hint">No cierres la aplicación, ya casi terminamos.</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="fy-app">
      <Header showBack to="/" />
      <main className="fy-page">
        <div className="fy-steps">
          <span className="fy-steps__dot is-active" />
          <span className="fy-steps__dot" />
          <span className="fy-steps__dot" />
        </div>

        <h1 className="fy-h1">Cuéntanos de ti</h1>
        <p className="fy-sub">Por favor completa estos datos. Es rápido.</p>

        {serverError && <div className="fy-error" style={{ marginBottom: '1rem' }}>❌ {serverError}</div>}

        <form onSubmit={onSubmit} noValidate>
          <div className="fy-field">
            <label className="fy-label" htmlFor="dni">
              <span className="fy-label__icon" aria-hidden>🪪</span> Tu DNI
            </label>
            <input
              id="dni"
              className="fy-input"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={8}
              value={dni}
              onChange={(e) => setDni(e.target.value.replace(/\D/g, ""))}
              placeholder="Ej. 12345678"
            />
            <div className="fy-help">Son los 8 números de tu documento.</div>
            {errors.dni && <div className="fy-error">⚠️ {errors.dni}</div>}
          </div>

          <div className="fy-field">
            <label className="fy-label" htmlFor="correo">
              <span className="fy-label__icon" aria-hidden>📧</span> Tu Correo
            </label>
            <input
              id="correo"
              className="fy-input"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="Ej. juan@correo.com"
            />
            {errors.correo && <div className="fy-error">⚠️ {errors.correo}</div>}
          </div>

          <div className="fy-field">
            <label className="fy-label" htmlFor="password">
              <span className="fy-label__icon" aria-hidden>🔒</span> Contraseña
            </label>
            <input
              id="password"
              className="fy-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
            />
            {errors.password && <div className="fy-error">⚠️ {errors.password}</div>}
          </div>

          <div className="fy-field">
            <label className="fy-label" htmlFor="negocio">
              <span className="fy-label__icon" aria-hidden>🏷️</span> Nombre de tu negocio
            </label>
            <input
              id="negocio"
              className="fy-input"
              value={negocio}
              onChange={(e) => setNegocio(e.target.value)}
              placeholder="Ej. Modas Rosita"
            />
            {errors.negocio && <div className="fy-error">⚠️ {errors.negocio}</div>}
          </div>

          <div className="fy-field">
            <label className="fy-label" htmlFor="rubro">
              <span className="fy-label__icon" aria-hidden>🛍️</span> ¿Qué vendes?
            </label>
            <select
              id="rubro"
              className="fy-select"
              value={rubro}
              onChange={(e) => setRubro(e.target.value as Rubro)}
            >
              <option value="">Elige una opción…</option>
              {RUBROS.map((r) => (
                <option key={r.value} value={r.value}>{r.emoji}  {r.label}</option>
              ))}
            </select>
            {errors.rubro && <div className="fy-error">⚠️ {errors.rubro}</div>}
          </div>

          <div className="fy-field">
            <label className="fy-label" htmlFor="ref">
              <span className="fy-label__icon" aria-hidden>📍</span> ¿Dónde vendes?
            </label>
            <textarea
              id="ref"
              className="fy-textarea"
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
              placeholder="Ej. Frente a la galería Los Andes, cuadra 3"
            />
            <div className="fy-help">Cuéntanos en tus palabras. No necesitas dirección exacta.</div>
            {errors.referencia && <div className="fy-error">⚠️ {errors.referencia}</div>}
          </div>
        </form>

        <div className="fy-cta">
          <button className="fy-btn" onClick={onSubmit}>
            <span className="fy-btn__icon" aria-hidden>✅</span> Guardar y continuar
          </button>
        </div>
      </main>
    </div>
  );
}
