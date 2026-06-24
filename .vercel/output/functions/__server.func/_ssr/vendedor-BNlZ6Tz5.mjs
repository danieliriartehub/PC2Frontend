import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { M as useRouter, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Header } from "./Header-BY2QOExE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vendedor-BNlZ6Tz5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Light({ estado }) {
	const m = {
		ok: {
			cls: "fy-light--ok",
			txt: "Vigente"
		},
		warn: {
			cls: "fy-light--warn",
			txt: "Por vencer"
		},
		bad: {
			cls: "fy-light--bad",
			txt: "Vencida"
		}
	}[estado];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `fy-light ${m.cls}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "fy-light__dot" }),
			" ",
			m.txt
		]
	});
}
function Vendedor() {
	const router = useRouter();
	const [nombre, setNombre] = (0, import_react.useState)("Vendedor");
	(0, import_react.useEffect)(() => {
		if (!sessionStorage.getItem("fy_token")) router.navigate({ to: "/login" });
		const res = sessionStorage.getItem("fy_resumen");
		if (res) try {
			const nom = JSON.parse(res).items.find((i) => i.label === "Negocio")?.value;
			if (nom) setNombre(nom);
		} catch (e) {}
	}, [router]);
	function handleLogout() {
		sessionStorage.removeItem("fy_token");
		sessionStorage.removeItem("fy_resumen");
		router.navigate({ to: "/" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fy-app",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "fy-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "fy-h1",
						children: [
							"Hola, ",
							nombre,
							" 👋"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleLogout,
						className: "fy-btn fy-btn--outline",
						style: {
							padding: "0.4rem 0.8rem",
							fontSize: "0.8rem",
							width: "auto"
						},
						children: "Cerrar Sesión"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "fy-sub",
					children: "Estas son tus 3 cosas importantes:"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fy-cards",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "fy-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "fy-card__head",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "fy-card__emoji",
									"aria-hidden": true,
									children: "📄"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "fy-card__title",
									children: "Mi licencia"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Light, { estado: "warn" })] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/licencia",
								className: "fy-btn",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "fy-btn__icon",
									"aria-hidden": true,
									children: "👀"
								}), " Ver mi licencia"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "fy-card fy-card--green",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "fy-card__head",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "fy-card__emoji",
									"aria-hidden": true,
									style: { background: "#D9F2E2" },
									children: "👥"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "fy-card__title",
									children: "Mis trabajadores"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "fy-card__sub",
									children: "Tienes 2 personas registradas"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "fy-btn fy-btn--ghost",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "fy-btn__icon",
									"aria-hidden": true,
									children: "➕"
								}), " Agregar trabajador"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "fy-card fy-card--navy",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "fy-card__head",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "fy-card__emoji",
									"aria-hidden": true,
									style: { background: "#E1E8F3" },
									children: "🧺"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "fy-card__title",
									children: "Mi negocio"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "fy-card__sub",
									children: "Modas Rosita · Vendo ropa de mujer"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "fy-btn fy-btn--ghost",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "fy-btn__icon",
									"aria-hidden": true,
									children: "✏️"
								}), " Cambiar mis datos"]
							})]
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { Vendedor as component };
