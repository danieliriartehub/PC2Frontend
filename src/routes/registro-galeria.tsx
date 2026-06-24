import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "../components/Header";
import { apiPost, API_BASE } from "../lib/api";

export const Route = createFileRoute("/registro-galeria")({
  head: () => ({ meta: [{ title: "Registro galería · FormalízaYa" }] }),
  component: RegistroGaleria,
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

function RegistroGaleria() {
  const router = useRouter();
  const [dni, setDni] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [negocio, setNegocio] = useState("");
  const [rubro, setRubro] = useState<Rubro>("");
  const [galeria_nombre, setGaleriaNombre] = useState("");
  const [stand_numero, setStandNumero] = useState("");
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
    if (galeria_nombre.trim().length < 2) e.galeria_nombre = "Escribe el nombre de la galería";
    if (!stand_numero.trim()) e.stand_numero = "Escribe el número de stand/puesto";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setServerError("");
    if (!validar()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/negocios/registrar_galeria`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dni, correo, password, negocio, rubro, galeria_nombre, stand_numero }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Ocurrió un error al registrarse");
      }
      const resumen = {
        tipo: "galeria" as const,
        items: [
          { label: "DNI", value: dni },
          { label: "Negocio", value: negocio },
          { label: "Rubro", value: RUBROS.find((r) => r.value === rubro)?.label ?? "" },
          { label: "Ubicación", value: `${galeria_nombre} - Stand ${stand_numero}` },
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
        <h1 className="fy-h1">Cuéntanos de ti</h1>
        <p className="fy-sub">Por favor completa estos datos. Es rápido.</p>

        {serverError && <div className="fy-error" style={{ marginBottom: '1rem' }}>❌ {serverError}</div>}

        <form onSubmit={onSubmit} noValidate>
          <div className="fy-field">
            <label className="fy-label" htmlFor="ruc">
              <span className="fy-label__icon" aria-hidden>🧾</span> Tu RUC
            </label>
            <input
              id="ruc"
              className="fy-input"
              type="tel"
              inputMode="numeric"
              maxLength={11}
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
            <label className="fy-label" htmlFor="gal">
              <span className="fy-label__icon" aria-hidden>🏬</span> Nombre de la galería
            </label>
            <input id="gal" className="fy-input" value={galeria_nombre} onChange={(e) => setGaleriaNombre(e.target.value)} placeholder="Ej. Galería Los Andes" />
            {errors.galeria_nombre && <div className="fy-error">⚠️ {errors.galeria_nombre}</div>}
          </div>

          <div className="fy-field">
            <label className="fy-label" htmlFor="stand">
              <span className="fy-label__icon" aria-hidden>🔢</span> Número de stand
            </label>
            <input id="stand" className="fy-input" inputMode="numeric" value={stand_numero} onChange={(e) => setStandNumero(e.target.value)} placeholder="Ej. 214" />
            {errors.stand_numero && <div className="fy-error">⚠️ {errors.stand_numero}</div>}
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
