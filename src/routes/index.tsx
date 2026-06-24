import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "../components/Header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FormalízaYa — Tu negocio, en regla." },
      { name: "description", content: "Formaliza tu negocio en Gamarra de forma fácil y rápida." },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  return (
    <div className="fy-app">
      <Header />
      <main className="fy-page">
        <section className="fy-welcome">
          <span className="fy-welcome__kicker">Gamarra · Lima</span>
          <h1 className="fy-welcome__title">Hola, bienvenido 👋</h1>
          <p className="fy-welcome__text">Formaliza tu negocio en pocos pasos. Toca la opción que mejor te describe.</p>
        </section>

        <Link to="/registro-ambulante" className="fy-choice fy-choice--primary">
          <span className="fy-choice__icon" aria-hidden>🧺</span>
          <span>
            <span className="fy-choice__title">Soy vendedor ambulante</span>
            <span className="fy-choice__hint">Vendo en la calle o en la vereda</span>
          </span>
        </Link>

        <Link to="/registro-galeria" className="fy-choice">
          <span className="fy-choice__icon" aria-hidden>🏬</span>
          <span>
            <span className="fy-choice__title">Tengo un negocio en galería</span>
            <span className="fy-choice__hint">Tengo un stand dentro de una galería</span>
          </span>
        </Link>
      </main>
    </div>
  );
}
