import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { M as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Header } from "./Header-BY2QOExE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/licencia-DuYKtcY_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Licencia() {
	const router = useRouter();
	const estado = "warn";
	const dias = 12;
	const vence = "28 de marzo de 2025";
	const numero = "LIC-2024-08812";
	const [loading, setLoading] = (0, import_react.useState)(false);
	function solicitar() {
		setLoading(true);
		setTimeout(() => {
			const resumen = {
				tipo: "ambulante",
				items: [
					{
						label: "Trámite",
						value: "Renovación de licencia"
					},
					{
						label: "Licencia",
						value: numero
					},
					{
						label: "Estado",
						value: "En revisión"
					}
				],
				next: "/vendedor"
			};
			sessionStorage.setItem("fy_resumen", JSON.stringify(resumen));
			router.navigate({ to: "/confirmacion" });
		}, 1100);
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fy-app",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "fy-page",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fy-loading",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fy-loading__emoji",
						"aria-hidden": true,
						children: "📨"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fy-loading__text",
						children: "Estamos enviando tu solicitud..."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fy-loading__hint",
						children: "Espera un momentito por favor."
					})
				]
			})
		})]
	});
	const m = {
		ok: {
			cls: "fy-license-hero--ok",
			icon: "✓",
			title: "Tu licencia está vigente",
			color: "verde"
		},
		warn: {
			cls: "fy-license-hero--warn",
			icon: "⏳",
			title: "Tu licencia está por vencer",
			color: "amarillo"
		},
		bad: {
			cls: "fy-license-hero--bad",
			icon: "✕",
			title: "Tu licencia está vencida",
			color: "rojo"
		}
	}[estado];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fy-app",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
			showBack: true,
			to: "/vendedor"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "fy-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `fy-license-hero ${m.cls}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fy-license-hero__icon",
							"aria-hidden": true,
							children: m.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fy-license-hero__title",
							children: m.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "fy-license-hero__days",
							children: [
								"Faltan ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [dias, " días"] }),
								" para que venza"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fy-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "fy-info-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📄 Número" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: numero })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "fy-info-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📅 Vence el" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: vence })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "fy-info-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🚦 Estado" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Por vencer" })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fy-cta",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "fy-btn",
						onClick: solicitar,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "fy-btn__icon",
							"aria-hidden": true,
							children: "🔄"
						}), " Renovar mi licencia"]
					})
				})
			]
		})]
	});
}
//#endregion
export { Licencia as component };
