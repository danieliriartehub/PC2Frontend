import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "../components/Header";

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

function Vendedor() {
  // Datos demo — reemplazar con fetch a /licencia, /trabajadores, /negocio
  const estadoLicencia: Estado = "warn";

  return (
    <div className="fy-app">
      <Header />
      <main className="fy-page">
        <h1 className="fy-h1">Hola, Rosita 👋</h1>
        <p className="fy-sub">Estas son tus 3 cosas importantes:</p>

        <div className="fy-cards">
          <article className="fy-card">
            <div className="fy-card__head">
              <div className="fy-card__emoji" aria-hidden>📄</div>
              <div>
                <div className="fy-card__title">Mi licencia</div>
                <Light estado={estadoLicencia} />
              </div>
            </div>
            <Link to="/licencia" className="fy-btn">
              <span className="fy-btn__icon" aria-hidden>👀</span> Ver mi licencia
            </Link>
          </article>

          <article className="fy-card fy-card--green">
            <div className="fy-card__head">
              <div className="fy-card__emoji" aria-hidden style={{ background: "#D9F2E2" }}>👥</div>
              <div>
                <div className="fy-card__title">Mis trabajadores</div>
                <div className="fy-card__sub">Tienes 2 personas registradas</div>
              </div>
            </div>
            <button className="fy-btn fy-btn--ghost">
              <span className="fy-btn__icon" aria-hidden>➕</span> Agregar trabajador
            </button>
          </article>

          <article className="fy-card fy-card--navy">
            <div className="fy-card__head">
              <div className="fy-card__emoji" aria-hidden style={{ background: "#E1E8F3" }}>🧺</div>
              <div>
                <div className="fy-card__title">Mi negocio</div>
                <div className="fy-card__sub">Modas Rosita · Vendo ropa de mujer</div>
              </div>
            </div>
            <button className="fy-btn fy-btn--ghost">
              <span className="fy-btn__icon" aria-hidden>✏️</span> Cambiar mis datos
            </button>
          </article>
        </div>
      </main>
    </div>
  );
}
