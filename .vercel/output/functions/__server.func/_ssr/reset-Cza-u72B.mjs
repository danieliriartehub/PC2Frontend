import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { M as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Header } from "./Header-BY2QOExE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-Cza-u72B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPassword() {
	const router = useRouter();
	const [correo, setCorreo] = (0, import_react.useState)("");
	const [codigo, setCodigo] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const savedEmail = sessionStorage.getItem("fy_recover_email");
		if (savedEmail) setCorreo(savedEmail);
	}, []);
	async function onSubmit(ev) {
		ev.preventDefault();
		setError("");
		if (codigo.length !== 6) {
			setError("El código debe tener 6 dígitos");
			return;
		}
		if (password.length < 6) {
			setError("La contraseña debe tener al menos 6 caracteres");
			return;
		}
		setLoading(true);
		try {
			const res = await fetch(`/api/auth/reset_password`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					correo,
					codigo,
					new_password: password
				})
			});
			if (!res.ok) {
				const errData = await res.json().catch(() => ({}));
				throw new Error(errData.detail || "Error al restablecer la contraseña");
			}
			sessionStorage.removeItem("fy_recover_email");
			alert("Contraseña actualizada con éxito");
			router.navigate({ to: "/login" });
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fy-app",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
			showBack: true,
			to: "/recuperar"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "fy-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "fy-h1",
					children: "Crea nueva contraseña"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "fy-sub",
					children: "Ingresa el código que te enviamos y tu nueva clave."
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fy-error",
					style: { marginBottom: "1rem" },
					children: ["❌ ", error]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					noValidate: true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "fy-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "fy-label",
								htmlFor: "codigo",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "fy-label__icon",
									"aria-hidden": true,
									children: "🔢"
								}), " Código de 6 dígitos"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "codigo",
								className: "fy-input",
								type: "tel",
								inputMode: "numeric",
								maxLength: 6,
								value: codigo,
								onChange: (e) => setCodigo(e.target.value.replace(/\D/g, "")),
								placeholder: "Ej. 123456"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "fy-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "fy-label",
								htmlFor: "password",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "fy-label__icon",
									"aria-hidden": true,
									children: "🔒"
								}), " Nueva Contraseña"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "password",
								className: "fy-input",
								type: "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "Mínimo 6 caracteres"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fy-cta",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "fy-btn",
								type: "submit",
								disabled: loading,
								children: loading ? "Actualizando..." : "Actualizar contraseña"
							})
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { ResetPassword as component };
