import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { M as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Header } from "./Header-BY2QOExE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DZHQ0QXK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const router = useRouter();
	const [correo, setCorreo] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [serverError, setServerError] = (0, import_react.useState)("");
	function validar() {
		const e = {};
		if (!correo.includes("@")) e.correo = "Ingresa tu correo";
		if (!password) e.password = "Ingresa tu contraseña";
		setErrors(e);
		return Object.keys(e).length === 0;
	}
	async function onSubmit(ev) {
		ev.preventDefault();
		setServerError("");
		if (!validar()) return;
		setLoading(true);
		try {
			const res = await fetch(`/api/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					correo,
					password
				})
			});
			if (!res.ok) {
				const errData = await res.json().catch(() => ({}));
				throw new Error(errData.detail || "Error al iniciar sesión");
			}
			const data = await res.json();
			sessionStorage.setItem("fy_token", data.access_token);
			router.navigate({ to: "/vendedor" });
		} catch (err) {
			setServerError(err.message);
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fy-app",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
			showBack: true,
			to: "/"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "fy-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "fy-h1",
					children: "Bienvenido de nuevo"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "fy-sub",
					children: "Ingresa para ver tu panel."
				}),
				serverError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fy-error",
					style: { marginBottom: "1rem" },
					children: ["❌ ", serverError]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					noValidate: true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "fy-field",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "fy-label",
									htmlFor: "correo",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "fy-label__icon",
										"aria-hidden": true,
										children: "📧"
									}), " Correo"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "correo",
									className: "fy-input",
									type: "email",
									value: correo,
									onChange: (e) => setCorreo(e.target.value),
									placeholder: "juan@correo.com"
								}),
								errors.correo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "fy-error",
									children: ["⚠️ ", errors.correo]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "fy-field",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "fy-label",
									htmlFor: "password",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "fy-label__icon",
										"aria-hidden": true,
										children: "🔒"
									}), " Contraseña"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "password",
									className: "fy-input",
									type: "password",
									value: password,
									onChange: (e) => setPassword(e.target.value)
								}),
								errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "fy-error",
									children: ["⚠️ ", errors.password]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								textAlign: "right",
								marginBottom: "1.5rem"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "fy-btn fy-btn--outline",
								style: {
									padding: "0.5rem",
									border: "none"
								},
								onClick: () => router.navigate({ to: "/recuperar" }),
								children: "¿Olvidaste tu contraseña?"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fy-cta",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "fy-btn",
								type: "submit",
								disabled: loading,
								children: loading ? "Cargando..." : "Ingresar"
							})
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { Login as component };
