import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { M as useRouter, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Header-BY2QOExE.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Cabecera de FormalízaYa.
* Props:
*  - showBack: boolean — muestra botón "atrás"
*  - to: string — destino del botón atrás (default: navigate(-1))
*/
function Header({ showBack = false, to }) {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "fy-header",
		children: [
			showBack && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "fy-back",
				"aria-label": "Volver",
				onClick: () => {
					if (to) router.navigate({ to });
					else router.history.back();
				},
				children: "←"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "fy-header__logo",
				"aria-label": "Inicio",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					children: "🧵"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fy-header__text",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fy-header__title",
					children: [
						"Formal",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "accent",
							children: "í"
						}),
						"zaYa"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fy-header__tag",
					children: "Tu negocio, en regla."
				})]
			})
		]
	});
}
//#endregion
export { Header as t };
