import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "../components/Header";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Iniciar Sesión · FormalízaYa" }] }),
  component: Login,
});

function Login() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  function validar() {
    const e: Record<string, string> = {};
    if (!correo.includes("@")) e.correo = "Ingresa tu correo";
    if (!password) e.password = "Ingresa tu contraseña";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setServerError("");
    if (!validar()) return;
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE ?? "https://pc2backend-production.up.railway.app/api"}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || "Error al iniciar sesión");
      }
      const data = await res.json();
      sessionStorage.setItem("fy_token", data.access_token);
      router.navigate({ to: "/vendedor" });
    } catch (err: any) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fy-app">
      <Header showBack to="/" />
      <main className="fy-page">
        <h1 className="fy-h1">Bienvenido de nuevo</h1>
        <p className="fy-sub">Ingresa para ver tu panel.</p>

        {serverError && <div className="fy-error" style={{ marginBottom: '1rem' }}>❌ {serverError}</div>}

        <form onSubmit={onSubmit} noValidate>
          <div className="fy-field">
            <label className="fy-label" htmlFor="correo">
              <span className="fy-label__icon" aria-hidden>📧</span> Correo
            </label>
            <input
              id="correo"
              className="fy-input"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="juan@correo.com"
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
            />
            {errors.password && <div className="fy-error">⚠️ {errors.password}</div>}
          </div>

          <div style={{ textAlign: "right", marginBottom: "1.5rem" }}>
            <button
              type="button"
              className="fy-btn fy-btn--outline"
              style={{ padding: "0.5rem", border: "none" }}
              onClick={() => router.navigate({ to: "/recuperar" })}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <div className="fy-cta">
            <button className="fy-btn" type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Ingresar"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
