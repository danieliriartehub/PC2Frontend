import { Link, useRouter } from "@tanstack/react-router";

/**
 * Cabecera de FormalízaYa.
 * Props:
 *  - showBack: boolean — muestra botón "atrás"
 *  - to: string — destino del botón atrás (default: navigate(-1))
 */
export function Header({ showBack = false, to }: { showBack?: boolean; to?: string }) {
  const router = useRouter();

  return (
    <header className="fy-header">
      {showBack && (
        <button
          className="fy-back"
          aria-label="Volver"
          onClick={() => {
            if (to) router.navigate({ to });
            else router.history.back();
          }}
        >
          ←
        </button>
      )}
      <Link to="/" className="fy-header__logo" aria-label="Inicio">
        <span aria-hidden>🧵</span>
      </Link>
      <div className="fy-header__text">
        <div className="fy-header__title">
          Formal<span className="accent">í</span>zaYa
        </div>
        <div className="fy-header__tag">Tu negocio, en regla.</div>
      </div>
    </header>
  );
}
