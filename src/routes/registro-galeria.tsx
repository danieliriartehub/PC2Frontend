import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "../components/Header";
import { apiPost } from "../lib/api";

export const Route = createFileRoute("/registro-galeria")({
  head: () => ({ meta: [{ title: "Registro galería · FormalízaYa" }] }),
  component: RegistroGaleria,
});

function RegistroGaleria() {
  const router = useRouter();
  const [ruc, setRuc] = useState("");
  const [galeria, setGaleria] = useState("");
  const [stand, setStand] = useState("");
  const [piso, setPiso] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validar() {
    const e: Record<string, string> = {};
    if (!/^\d{11}$/.test(ruc)) e.ruc = "Tu RUC debe tener 11 números";
    if (galeria.trim().length < 2) e.galeria = "Escribe el nombre de la galería";
    if (!stand.trim()) e.stand = "Escribe el número de tu stand";
    if (!piso.trim()) e.piso = "Elige el piso";
    if (pass.length < 4) e.pass = "Tu contraseña debe tener al menos 4 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validar()) return;
    setLoading(true);
    try {
      await apiPost("/negocios-galeria", { ruc, galeria, stand, piso, password: pass }).catch(() => null);
      const resumen = {
        tipo: "galeria" as const,
        items: [
          { label: "RUC", value: ruc },
          { label: "Galería", value: galeria },
          { label: "Stand", value: `Piso ${piso} · Stand ${stand}` },
        ],
        next: "/vendedor",
      };
      sessionStorage.setItem("fy_resumen", JSON.stringify(resumen));
      router.navigate({ to: "/confirmacion" });
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
        <h1 className="fy-h1">Datos de tu galería</h1>
        <p className="fy-sub">Estos datos nos ayudan a encontrar tu negocio.</p>

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
              value={ruc}
              onChange={(e) => setRuc(e.target.value.replace(/\D/g, ""))}
              placeholder="Ej. 20123456789"
            />
            <div className="fy-help">Son los 11 números de tu RUC.</div>
            {errors.ruc && <div className="fy-error">⚠️ {errors.ruc}</div>}
          </div>

          <div className="fy-field">
            <label className="fy-label" htmlFor="gal">
              <span className="fy-label__icon" aria-hidden>🏬</span> Nombre de la galería
            </label>
            <input id="gal" className="fy-input" value={galeria} onChange={(e) => setGaleria(e.target.value)} placeholder="Ej. Galería Los Andes" />
            {errors.galeria && <div className="fy-error">⚠️ {errors.galeria}</div>}
          </div>

          <div className="fy-field">
            <label className="fy-label" htmlFor="stand">
              <span className="fy-label__icon" aria-hidden>🔢</span> Número de stand
            </label>
            <input id="stand" className="fy-input" inputMode="numeric" value={stand} onChange={(e) => setStand(e.target.value)} placeholder="Ej. 214" />
            {errors.stand && <div className="fy-error">⚠️ {errors.stand}</div>}
          </div>

          <div className="fy-field">
            <label className="fy-label" htmlFor="piso">
              <span className="fy-label__icon" aria-hidden>🏢</span> Piso
            </label>
            <select id="piso" className="fy-select" value={piso} onChange={(e) => setPiso(e.target.value)}>
              <option value="">Elige el piso…</option>
              <option value="1">Piso 1</option>
              <option value="2">Piso 2</option>
              <option value="3">Piso 3</option>
              <option value="4">Piso 4</option>
              <option value="5">Piso 5 o más</option>
            </select>
            {errors.piso && <div className="fy-error">⚠️ {errors.piso}</div>}
          </div>

          <div className="fy-field">
            <label className="fy-label" htmlFor="pass">
              <span className="fy-label__icon" aria-hidden>🔒</span> Crea una contraseña
            </label>
            <input
              id="pass"
              className="fy-input"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Mínimo 4 caracteres"
            />
            <div className="fy-help">Úsala la próxima vez que entres.</div>
            {errors.pass && <div className="fy-error">⚠️ {errors.pass}</div>}
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
