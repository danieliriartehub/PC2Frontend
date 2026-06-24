import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { M as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Header } from "./Header-BY2QOExE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recuperar-CYoNWixR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Recuperar() {
	const router = useRouter();
	const [correo, setCorreo] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(false);
	async function onSubmit(ev) {
		ev.preventDefault();
		if (!correo.includes("@")) {
			setError("Ingresa un correo válido");
			return;
		}
		setError("");
		setLoading(true);
		try {
			if (!(await fetch("https://pc2backend-production.up.railway.app/api/auth/recuperar_password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ correo })
			})).ok) throw new Error("Ocurrió un error al intentar recuperar la contraseña");
			setSuccess(true);
			sessionStorage.setItem("fy_recover_email", correo);
			setTimeout(() => {
				router.navigate({ to: "/reset" });
			}, 2e3);
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
			to: "/login"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "fy-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "fy-h1",
					children: "Recuperar contraseña"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "fy-sub",
					children: "Te enviaremos un código de 6 dígitos a tu correo."
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fy-error",
					style: { marginBottom: "1rem" },
					children: ["❌ ", error]
				}),
				success && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fy-error",
					style: {
						marginBottom: "1rem",
						background: "#d4edda",
						color: "#155724",
						border: "1px solid #c3e6cb"
					},
					children: "✅ Código enviado. Revisa tu correo."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					noValidate: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "fy-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "fy-label",
							htmlFor: "correo",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fy-label__icon",
								"aria-hidden": true,
								children: "📧"
							}), " Correo registrado"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "correo",
							className: "fy-input",
							type: "email",
							value: correo,
							onChange: (e) => setCorreo(e.target.value),
							placeholder: "juan@correo.com",
							disabled: success
						})]
					}), !success && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fy-cta",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "fy-btn",
							type: "submit",
							disabled: loading,
							children: loading ? "Enviando..." : "Enviar código"
						})
					})]
				})
			]
		})]
	});
}
//#endregion
export { Recuperar as component };
