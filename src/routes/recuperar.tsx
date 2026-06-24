import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "../components/Header";

export const Route = createFileRoute("/recuperar")({
  head: () => ({ meta: [{ title: "Recuperar Contraseña · FormalízaYa" }] }),
  component: Recuperar,
});

function Recuperar() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!correo.includes("@")) {
      setError("Ingresa un correo válido");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE ?? "https://pc2backend-production.up.railway.app/api"}/auth/recuperar_password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo }),
      });
      if (!res.ok) {
        throw new Error("Ocurrió un error al intentar recuperar la contraseña");
      }
      setSuccess(true);
      // Guardar temporalmente el correo para la siguiente pantalla
      sessionStorage.setItem("fy_recover_email", correo);
      setTimeout(() => {
        router.navigate({ to: "/reset" });
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fy-app">
      <Header showBack to="/login" />
      <main className="fy-page">
        <h1 className="fy-h1">Recuperar contraseña</h1>
        <p className="fy-sub">Te enviaremos un código de 6 dígitos a tu correo.</p>

        {error && <div className="fy-error" style={{ marginBottom: '1rem' }}>❌ {error}</div>}
        {success && <div className="fy-error" style={{ marginBottom: '1rem', background: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' }}>✅ Código enviado. Revisa tu correo.</div>}

        <form onSubmit={onSubmit} noValidate>
          <div className="fy-field">
            <label className="fy-label" htmlFor="correo">
              <span className="fy-label__icon" aria-hidden>📧</span> Correo registrado
            </label>
            <input
              id="correo"
              className="fy-input"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="juan@correo.com"
              disabled={success}
            />
          </div>

          {!success && (
            <div className="fy-cta">
              <button className="fy-btn" type="submit" disabled={loading}>
                {loading ? "Enviando..." : "Enviar código"}
              </button>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
