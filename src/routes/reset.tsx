import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { API_BASE } from "../lib/api";

export const Route = createFileRoute("/reset")({
  head: () => ({ meta: [{ title: "Nueva Contraseña · FormalízaYa" }] }),
  component: ResetPassword,
});

function ResetPassword() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [codigo, setCodigo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("fy_recover_email");
    if (savedEmail) {
      setCorreo(savedEmail);
    }
  }, []);

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setError("");

    if (codigo.length !== 6) {
      setError("El código debe tener 6 dígitos");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/reset_password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, codigo, new_password: password }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || "Error al restablecer la contraseña");
      }
      
      sessionStorage.removeItem("fy_recover_email");
      alert("Contraseña actualizada con éxito");
      router.navigate({ to: "/login" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fy-app">
      <Header showBack to="/recuperar" />
      <main className="fy-page">
        <h1 className="fy-h1">Crea nueva contraseña</h1>
        <p className="fy-sub">Ingresa el código que te enviamos y tu nueva clave.</p>

        {error && <div className="fy-error" style={{ marginBottom: '1rem' }}>❌ {error}</div>}

        <form onSubmit={onSubmit} noValidate>
          <div className="fy-field">
            <label className="fy-label" htmlFor="codigo">
              <span className="fy-label__icon" aria-hidden>🔢</span> Código de 6 dígitos
            </label>
            <input
              id="codigo"
              className="fy-input"
              type="tel"
              inputMode="numeric"
              maxLength={6}
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ""))}
              placeholder="Ej. 123456"
            />
          </div>

          <div className="fy-field">
            <label className="fy-label" htmlFor="password">
              <span className="fy-label__icon" aria-hidden>🔒</span> Nueva Contraseña
            </label>
            <input
              id="password"
              className="fy-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div className="fy-cta">
            <button className="fy-btn" type="submit" disabled={loading}>
              {loading ? "Actualizando..." : "Actualizar contraseña"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
