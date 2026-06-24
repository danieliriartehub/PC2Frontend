import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { API_BASE } from "../lib/api";

export const Route = createFileRoute("/vendedor")({
  head: () => ({ meta: [{ title: "Mi negocio · FormalízaYa" }] }),
  component: Vendedor,
});

type Estado = "ok" | "warn" | "bad";

function Light({ estado }: { estado: Estado }) {
  const map = {
    ok:   { cls: "fy-light--ok",   txt: "Vigente" },
    warn: { cls: "fy-light--warn", txt: "Por vencer" },
    bad:  { cls: "fy-light--bad",  txt: "Vencida" },
  } as const;
  const m = map[estado];
  return (
    <span className={`fy-light ${m.cls}`}>
      <span className="fy-light__dot" /> {m.txt}
    </span>
  );
}

interface Negocio {
  id: number;
  nombre_negocio: string;
  tipo: string;
  rubro: string | null;
  estado: string;
  referencia_ubicacion: string | null;
  galeria_nombre: string | null;
  stand_numero: string | null;
}

interface Licencia {
  id: number;
  negocio_id: number;
  numero_licencia: string;
  tipo_licencia: string;
  estado: string;
  fecha_emision: string | null;
  fecha_vencimiento: string | null;
  entidad_emisora: string | null;
}

interface RegistroTributario {
  id: number;
  negocio_id: number;
  ruc: string;
  razon_social: string;
  estado_sunat: string;
}

interface Trabajador {
  id: number;
  negocio_id: number;
  dni: string;
  nombre_completo: string;
  cargo: string | null;
  estado: string;
  tiene_contrato: boolean;
}

interface Dashboard {
  usuario_id: number;
  nombre: string;
  rol: string;
  negocios: Negocio[];
  licencias: Licencia[];
  trabajadores: Trabajador[];
  registro_tributario: RegistroTributario | null;
}

function calcEstadoLicencia(lic: Licencia | null): Estado {
  if (!lic) return "bad";
  if (lic.estado === "vencida" || lic.estado === "anulada") return "bad";
  if (lic.estado === "por_vencer") return "warn";
  if (lic.fecha_vencimiento) {
    const diff = new Date(lic.fecha_vencimiento).getTime() - Date.now();
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (dias <= 0) return "bad";
    if (dias <= 30) return "warn";
  }
  return "ok";
}

function Vendedor() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal trabajador
  const [showAddWorker, setShowAddWorker] = useState(false);
  const [wDni, setWDni] = useState("");
  const [wNombre, setWNombre] = useState("");
  const [wCargo, setWCargo] = useState("");
  const [wLoading, setWLoading] = useState(false);
  const [wError, setWError] = useState("");

  // Modal licencia
  const [showAddLicense, setShowAddLicense] = useState(false);
  const [lTipo, setLTipo] = useState("provisional");
  const [lEntidad, setLEntidad] = useState("Municipalidad");
  const [lLoading, setLLoading] = useState(false);
  const [lError, setLError] = useState("");

  // Modal SUNAT
  const [showAddSunat, setShowAddSunat] = useState(false);
  const [sRuc, setSRuc] = useState("");
  const [sRazon, setSRazon] = useState("");
  const [sLoading, setSLoading] = useState(false);
  const [sError, setSError] = useState("");

  const token = sessionStorage.getItem("fy_token");

  useEffect(() => {
    if (!token) {
      router.navigate({ to: "/login" });
      return;
    }
    fetchDashboard();
  }, [router, token]);

  async function fetchDashboard() {
    try {
      const res = await fetch(`${API_BASE}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        sessionStorage.removeItem("fy_token");
        router.navigate({ to: "/login" });
        return;
      }
      if (!res.ok) throw new Error("Error cargando datos");
      const data = await res.json();
      setDashboard(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("fy_token");
    sessionStorage.removeItem("fy_resumen");
    router.navigate({ to: "/" });
  }

  async function handleAddWorker(ev: React.FormEvent) {
    ev.preventDefault();
    if (!dashboard || dashboard.negocios.length === 0) return;
    setWError("");
    setWLoading(true);
    try {
      const res = await fetch(`${API_BASE}/trabajadores`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          negocio_id: dashboard.negocios[0].id,
          dni: wDni,
          nombre_completo: wNombre,
          cargo: wCargo || null,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Error al agregar trabajador");
      }
      setShowAddWorker(false);
      setWDni(""); setWNombre(""); setWCargo("");
      fetchDashboard(); // Refrescar
    } catch (err: any) {
      setWError(err.message);
    } finally {
      setWLoading(false);
    }
  }

  async function handleRemoveWorker(id: number) {
    if (!confirm("¿Desactivar a este trabajador?")) return;
    try {
      await fetch(`${API_BASE}/trabajadores/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDashboard();
    } catch {}
  }

  async function handleAddLicense(ev: React.FormEvent) {
    ev.preventDefault();
    if (!dashboard || dashboard.negocios.length === 0) return;
    setLError("");
    setLLoading(true);
    try {
      const res = await fetch(`${API_BASE}/licencias`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          negocio_id: dashboard.negocios[0].id,
          tipo_licencia: lTipo,
          entidad_emisora: lEntidad,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Error al solicitar licencia");
      }
      setShowAddLicense(false);
      fetchDashboard();
    } catch (err: any) {
      setLError(err.message);
    } finally {
      setLLoading(false);
    }
  }

  async function handleAddSunat(ev: React.FormEvent) {
    ev.preventDefault();
    if (!dashboard || dashboard.negocios.length === 0) return;
    setSError("");
    setSLoading(true);
    try {
      const res = await fetch(`${API_BASE}/negocios/sunat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          negocio_id: dashboard.negocios[0].id,
          ruc: sRuc,
          razon_social: sRazon,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Error al registrar RUC");
      }
      setShowAddSunat(false);
      fetchDashboard();
    } catch (err: any) {
      setSError(err.message);
    } finally {
      setSLoading(false);
    }
  }

  async function handleToggleContrato(id: number) {
    try {
      await fetch(`${API_BASE}/trabajadores/${id}/contrato`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDashboard();
    } catch {}
  }

  if (loading) {
    return (
      <div className="fy-app">
        <Header />
        <main className="fy-page">
          <div className="fy-loading">
            <div className="fy-loading__emoji" aria-hidden>⏳</div>
            <div className="fy-loading__text">Cargando tu información...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fy-app">
        <Header />
        <main className="fy-page">
          <div className="fy-error" style={{ marginBottom: "1rem" }}>❌ {error}</div>
          <button className="fy-btn" onClick={() => { setError(""); setLoading(true); fetchDashboard(); }}>
            Reintentar
          </button>
        </main>
      </div>
    );
  }

  const negocio = dashboard?.negocios[0];
  const licencia = dashboard?.licencias[0] || null;
  const estadoLicencia = calcEstadoLicencia(licencia);
  const trabajadores = dashboard?.trabajadores || [];

  return (
    <div className="fy-app">
      <Header />
      <main className="fy-page">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 className="fy-h1">Hola, {dashboard?.nombre || "Vendedor"} 👋</h1>
          <button
            onClick={handleLogout}
            className="fy-btn fy-btn--outline"
            style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", width: "auto" }}
          >
            Cerrar Sesión
          </button>
        </div>
        <p className="fy-sub">Estas son tus prioridades de hoy:</p>

        {/* === SEMÁFORO DE FORMALIZACIÓN === */}
        {(() => {
          let score = 0;
          if (estadoLicencia === "ok" || estadoLicencia === "warn") score += 33;
          if (dashboard?.registro_tributario) score += 33;
          const trabajadores = dashboard?.trabajadores || [];
          const conContrato = trabajadores.filter((t) => t.tiene_contrato).length;
          if (trabajadores.length === 0 || conContrato === trabajadores.length) score += 34; // si no tiene trabajadores o todos tienen contrato
          
          let color = score < 50 ? "#e74c3c" : score < 90 ? "#f39c12" : "#2ecc71";
          return (
            <div style={{
              background: "#fff", padding: "1rem", borderRadius: "12px", 
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)", marginBottom: "1.5rem",
              border: `2px solid ${color}`
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <strong style={{ fontSize: "1.1rem" }}>🚦 Nivel de Formalización</strong>
                <span style={{ fontWeight: "bold", color }}>{score}%</span>
              </div>
              <div style={{ background: "#eee", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ background: color, height: "100%", width: `${score}%`, transition: "width 0.5s ease" }} />
              </div>
              <div style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", textAlign: "center" }}>
                <span style={{ color: estadoLicencia === "ok" ? "#2ecc71" : "#e74c3c" }}>1. Licencia</span>
                <span style={{ color: dashboard?.registro_tributario ? "#2ecc71" : "#e74c3c" }}>2. SUNAT</span>
                <span style={{ color: (trabajadores.length === 0 || conContrato === trabajadores.length) ? "#2ecc71" : "#e74c3c" }}>3. Contratos</span>
              </div>
            </div>
          );
        })()}

        <div className="fy-cards">
          {/* === LICENCIA === */}
          <article className="fy-card">
            <div className="fy-card__head">
              <div className="fy-card__emoji" aria-hidden>📄</div>
              <div>
                <div className="fy-card__title">Mi licencia</div>
                {licencia ? (
                  <Light estado={estadoLicencia} />
                ) : (
                  <span style={{ fontSize: "0.8rem", color: "#888" }}>Sin licencia</span>
                )}
              </div>
            </div>
            {licencia ? (
              <Link to="/licencia" className="fy-btn">
                <span className="fy-btn__icon" aria-hidden>👀</span> Ver mi licencia
              </Link>
            ) : (
              <button className="fy-btn" onClick={() => setShowAddLicense(true)}>
                <span className="fy-btn__icon" aria-hidden>📋</span> Solicitar licencia
              </button>
            )}
          </article>

          {/* === TRABAJADORES === */}
          <article className="fy-card fy-card--green">
            <div className="fy-card__head">
              <div className="fy-card__emoji" aria-hidden style={{ background: "#D9F2E2" }}>👥</div>
              <div>
                <div className="fy-card__title">Mis trabajadores</div>
                <div className="fy-card__sub">
                  Tienes {trabajadores.length} persona{trabajadores.length !== 1 ? "s" : ""} registrada{trabajadores.length !== 1 ? "s" : ""}
                </div>
              </div>
            </div>

            {/* Lista de trabajadores */}
            {trabajadores.length > 0 && (
              <div style={{ marginBottom: "0.5rem" }}>
                {trabajadores.map((t) => (
                  <div key={t.id} className="fy-info-row" style={{ fontSize: "0.85rem", flexDirection: "column", alignItems: "flex-start", gap: "0.3rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                      <span>👤 {t.nombre_completo} {t.cargo ? `(${t.cargo})` : ""}</span>
                      <button onClick={() => handleRemoveWorker(t.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#e74c3c" }}>✕</button>
                    </div>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", cursor: "pointer", color: t.tiene_contrato ? "#2ecc71" : "#e74c3c" }}>
                      <input type="checkbox" checked={t.tiene_contrato} onChange={() => handleToggleContrato(t.id)} />
                      {t.tiene_contrato ? "Tiene contrato formal" : "Sin contrato (Riesgo multa)"}
                    </label>
                  </div>
                ))}
              </div>
            )}

            <button className="fy-btn fy-btn--ghost" onClick={() => setShowAddWorker(true)}>
              <span className="fy-btn__icon" aria-hidden>➕</span> Agregar trabajador
            </button>
          </article>

          {/* === SUNAT === */}
          <article className="fy-card" style={{ borderTop: "4px solid #f39c12" }}>
            <div className="fy-card__head">
              <div className="fy-card__emoji" aria-hidden style={{ background: "#fcf3cf" }}>🏛️</div>
              <div>
                <div className="fy-card__title">Registro SUNAT</div>
                {dashboard?.registro_tributario ? (
                  <span style={{ fontSize: "0.8rem", color: "#2ecc71", fontWeight: "bold" }}>RUC Activo</span>
                ) : (
                  <span style={{ fontSize: "0.8rem", color: "#e74c3c", fontWeight: "bold" }}>Falta RUC</span>
                )}
              </div>
            </div>
            {dashboard?.registro_tributario ? (
              <div style={{ fontSize: "0.85rem", background: "#f9f9f9", padding: "0.5rem", borderRadius: "8px" }}>
                <div><strong>RUC:</strong> {dashboard.registro_tributario.ruc}</div>
                <div><strong>Razón:</strong> {dashboard.registro_tributario.razon_social}</div>
              </div>
            ) : (
              <button className="fy-btn" onClick={() => setShowAddSunat(true)} style={{ background: "#f39c12", color: "#fff" }}>
                <span className="fy-btn__icon" aria-hidden>✅</span> Registrar RUC
              </button>
            )}
          </article>

          {/* === MI NEGOCIO === */}
          <article className="fy-card fy-card--navy">
            <div className="fy-card__head">
              <div className="fy-card__emoji" aria-hidden style={{ background: "#E1E8F3" }}>🧺</div>
              <div>
                <div className="fy-card__title">Mi negocio</div>
                <div className="fy-card__sub">
                  {negocio ? `${negocio.nombre_negocio} · ${negocio.rubro || "Sin rubro"}` : "Sin negocio"}
                </div>
              </div>
            </div>
            {negocio && (
              <div style={{ fontSize: "0.85rem", marginTop: "0.3rem", opacity: 0.8 }}>
                {negocio.tipo === "galeria" && negocio.galeria_nombre && (
                  <div>🏬 Galería: {negocio.galeria_nombre} - Stand {negocio.stand_numero}</div>
                )}
                {negocio.referencia_ubicacion && (
                  <div>📍 {negocio.referencia_ubicacion}</div>
                )}
              </div>
            )}
          </article>
        </div>

        {/* === MODAL AGREGAR TRABAJADOR === */}
        {showAddWorker && (
          <div className="fy-modal-overlay" onClick={() => setShowAddWorker(false)}>
            <div className="fy-modal" onClick={(e) => e.stopPropagation()}>
              <h2 style={{ marginBottom: "1rem" }}>➕ Agregar Trabajador</h2>
              {wError && <div className="fy-error" style={{ marginBottom: "0.5rem" }}>❌ {wError}</div>}
              <form onSubmit={handleAddWorker}>
                <div className="fy-field">
                  <label className="fy-label" htmlFor="w-dni">DNI (8 dígitos)</label>
                  <input id="w-dni" className="fy-input" type="tel" inputMode="numeric" maxLength={8}
                    value={wDni} onChange={(e) => setWDni(e.target.value.replace(/\D/g, ""))} required />
                </div>
                <div className="fy-field">
                  <label className="fy-label" htmlFor="w-nombre">Nombre completo</label>
                  <input id="w-nombre" className="fy-input" maxLength={255}
                    value={wNombre} onChange={(e) => setWNombre(e.target.value)} required />
                </div>
                <div className="fy-field">
                  <label className="fy-label" htmlFor="w-cargo">Cargo (opcional)</label>
                  <input id="w-cargo" className="fy-input" maxLength={100}
                    value={wCargo} onChange={(e) => setWCargo(e.target.value)} />
                </div>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                  <button className="fy-btn" type="submit" disabled={wLoading}>
                    {wLoading ? "Guardando..." : "Guardar"}
                  </button>
                  <button className="fy-btn fy-btn--outline" type="button" onClick={() => setShowAddWorker(false)}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* === MODAL SOLICITAR LICENCIA === */}
        {showAddLicense && (
          <div className="fy-modal-overlay" onClick={() => setShowAddLicense(false)}>
            <div className="fy-modal" onClick={(e) => e.stopPropagation()}>
              <h2 style={{ marginBottom: "1rem" }}>📋 Solicitar Licencia</h2>
              {lError && <div className="fy-error" style={{ marginBottom: "0.5rem" }}>❌ {lError}</div>}
              <form onSubmit={handleAddLicense}>
                <div className="fy-field">
                  <label className="fy-label" htmlFor="l-tipo">Tipo de licencia</label>
                  <select id="l-tipo" className="fy-input" value={lTipo} onChange={(e) => setLTipo(e.target.value)}>
                    <option value="provisional">Provisional (1 año)</option>
                    <option value="definitiva">Definitiva (5 años)</option>
                  </select>
                </div>
                <div className="fy-field">
                  <label className="fy-label" htmlFor="l-entidad">Entidad emisora</label>
                  <input id="l-entidad" className="fy-input" maxLength={255}
                    value={lEntidad} onChange={(e) => setLEntidad(e.target.value)} />
                </div>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                  <button className="fy-btn" type="submit" disabled={lLoading}>
                    {lLoading ? "Solicitando..." : "Solicitar"}
                  </button>
                  <button className="fy-btn fy-btn--outline" type="button" onClick={() => setShowAddLicense(false)}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* === MODAL REGISTRAR SUNAT === */}
        {showAddSunat && (
          <div className="fy-modal-overlay" onClick={() => setShowAddSunat(false)}>
            <div className="fy-modal" onClick={(e) => e.stopPropagation()}>
              <h2 style={{ marginBottom: "1rem" }}>🏛️ Registrar en SUNAT</h2>
              <p style={{ fontSize: "0.85rem", marginBottom: "1rem" }}>Registra tu RUC para formalizar tu negocio.</p>
              {sError && <div className="fy-error" style={{ marginBottom: "0.5rem" }}>❌ {sError}</div>}
              <form onSubmit={handleAddSunat}>
                <div className="fy-field">
                  <label className="fy-label" htmlFor="s-ruc">Número de RUC (11 dígitos)</label>
                  <input id="s-ruc" className="fy-input" type="tel" inputMode="numeric" maxLength={11}
                    value={sRuc} onChange={(e) => setSRuc(e.target.value.replace(/\D/g, ""))} required />
                </div>
                <div className="fy-field">
                  <label className="fy-label" htmlFor="s-razon">Razón Social</label>
                  <input id="s-razon" className="fy-input" maxLength={255}
                    value={sRazon} onChange={(e) => setSRazon(e.target.value)} required />
                </div>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                  <button className="fy-btn" style={{ background: "#f39c12", color: "#fff" }} type="submit" disabled={sLoading}>
                    {sLoading ? "Validando..." : "Validar y Guardar"}
                  </button>
                  <button className="fy-btn fy-btn--outline" type="button" onClick={() => setShowAddSunat(false)}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
