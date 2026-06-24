import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Header } from "./Header-BY2QOExE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-MM8Q9-Cq.js
var import_jsx_runtime = require_jsx_runtime();
function Welcome() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fy-app",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "fy-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "fy-welcome",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "fy-welcome__kicker",
							children: "Gamarra · Lima"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "fy-welcome__title",
							children: "Hola, bienvenido 👋"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "fy-welcome__text",
							children: "Formaliza tu negocio en pocos pasos. Toca la opción que mejor te describe."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/registro-ambulante",
					className: "fy-choice fy-choice--primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "fy-choice__icon",
						"aria-hidden": true,
						children: "🧺"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "fy-choice__title",
						children: "Soy vendedor ambulante"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "fy-choice__hint",
						children: "Vendo en la calle o en la vereda"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/registro-galeria",
					className: "fy-choice",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "fy-choice__icon",
						"aria-hidden": true,
						children: "🏬"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "fy-choice__title",
						children: "Tengo un negocio en galería"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "fy-choice__hint",
						children: "Tengo un stand dentro de una galería"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						textAlign: "center",
						marginTop: "2rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "fy-sub",
						style: { marginBottom: "0.5rem" },
						children: "¿Ya tienes una cuenta?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "fy-btn fy-btn--outline",
						style: {
							display: "inline-block",
							width: "auto",
							padding: "0.5rem 1.5rem"
						},
						children: "Iniciar Sesión"
					})]
				})
			]
		})]
	});
}
//#endregion
export { Welcome as component };
