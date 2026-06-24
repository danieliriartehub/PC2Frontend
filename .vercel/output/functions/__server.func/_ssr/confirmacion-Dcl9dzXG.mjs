import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { M as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Header } from "./Header-BY2QOExE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/confirmacion-Dcl9dzXG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Confirmacion() {
	const router = useRouter();
	const [resumen, setResumen] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const raw = sessionStorage.getItem("fy_resumen");
		if (raw) setResumen(JSON.parse(raw));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fy-app",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "fy-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fy-success-hero",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fy-success-check",
							"aria-hidden": true,
							children: "✓"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "fy-success-title",
							children: "¡Ya estás en FormalízaYa!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "fy-success-sub",
							children: "Guardamos tu información correctamente. No perdiste nada."
						})
					]
				}),
				resumen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fy-summary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fy-summary__title",
						children: "Esto fue lo que registramos"
					}), resumen.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "fy-info-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: it.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: it.value })]
					}, it.label))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fy-cta",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "fy-btn",
						onClick: () => router.navigate({ to: resumen?.next ?? "/vendedor" }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "fy-btn__icon",
							"aria-hidden": true,
							children: "🏠"
						}), " Ir a mi negocio"]
					})
				})
			]
		})]
	});
}
//#endregion
export { Confirmacion as component };
