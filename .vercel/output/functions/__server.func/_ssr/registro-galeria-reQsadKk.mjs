import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { M as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Header } from "./Header-BY2QOExE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/registro-galeria-reQsadKk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RUBROS = [
	{
		value: "ropa_mujer",
		label: "Vendo ropa de mujer",
		emoji: "👗"
	},
	{
		value: "ropa_hombre",
		label: "Vendo ropa de hombre",
		emoji: "👔"
	},
	{
		value: "ropa_nino",
		label: "Vendo ropa de niños",
		emoji: "🧒"
	},
	{
		value: "calzado",
		label: "Vendo calzado",
		emoji: "👟"
	},
	{
		value: "accesorios",
		label: "Vendo accesorios",
		emoji: "👜"
	},
	{
		value: "telas",
		label: "Vendo telas",
		emoji: "🧵"
	}
];
function RegistroGaleria() {
	const router = useRouter();
	const [dni, setDni] = (0, import_react.useState)("");
	const [correo, setCorreo] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [negocio, setNegocio] = (0, import_react.useState)("");
	const [rubro, setRubro] = (0, import_react.useState)("");
	const [galeria_nombre, setGaleriaNombre] = (0, import_react.useState)("");
	const [stand_numero, setStandNumero] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [serverError, setServerError] = (0, import_react.useState)("");
	function validar() {
		const e = {};
		if (!/^\d{8}$/.test(dni)) e.dni = "Tu DNI debe tener 8 números";
		if (!correo.includes("@")) e.correo = "Ingresa un correo electrónico válido";
		if (password.length < 6) e.password = "La contraseña debe tener al menos 6 caracteres";
		if (negocio.trim().length < 2) e.negocio = "Escribe el nombre de tu negocio";
		if (!rubro) e.rubro = "Elige qué vendes";
		if (galeria_nombre.trim().length < 2) e.galeria_nombre = "Escribe el nombre de la galería";
		if (!stand_numero.trim()) e.stand_numero = "Escribe el número de stand/puesto";
		setErrors(e);
		return Object.keys(e).length === 0;
	}
	async function onSubmit(ev) {
		ev.preventDefault();
		setServerError("");
		if (!validar()) return;
		setLoading(true);
		try {
			const res = await fetch(`/api/negocios/registrar_galeria`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					dni,
					correo,
					password,
					negocio,
					rubro,
					galeria_nombre,
					stand_numero
				})
			});
			if (!res.ok) {
				const errorData = await res.json().catch(() => ({}));
				throw new Error(errorData.detail || "Ocurrió un error al registrarse");
			}
			const resumen = {
				tipo: "galeria",
				items: [
					{
						label: "DNI",
						value: dni
					},
					{
						label: "Negocio",
						value: negocio
					},
					{
						label: "Rubro",
						value: RUBROS.find((r) => r.value === rubro)?.label ?? ""
					},
					{
						label: "Ubicación",
						value: `${galeria_nombre} - Stand ${stand_numero}`
					}
				],
				next: "/login"
			};
			sessionStorage.setItem("fy_resumen", JSON.stringify(resumen));
			router.navigate({ to: "/confirmacion" });
		} catch (err) {
			setServerError(err.message);
		} finally {
			setLoading(false);
		}
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
						children: "📝"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fy-loading__text",
						children: "Estamos guardando tu información..."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fy-loading__hint",
						children: "No cierres la aplicación, ya casi terminamos."
					})
				]
			})
		})]
	});
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
					children: "Cuéntanos de ti"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "fy-sub",
					children: "Por favor completa estos datos. Es rápido."
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
									htmlFor: "ruc",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "fy-label__icon",
										"aria-hidden": true,
										children: "🧾"
									}), " Tu RUC"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "ruc",
									className: "fy-input",
									type: "tel",
									inputMode: "numeric",
									maxLength: 11,
									value: dni,
									onChange: (e) => setDni(e.target.value.replace(/\D/g, "")),
									placeholder: "Ej. 12345678"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "fy-help",
									children: "Son los 8 números de tu documento."
								}),
								errors.dni && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "fy-error",
									children: ["⚠️ ", errors.dni]
								})
							]
						}),
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
									}), " Tu Correo"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "correo",
									className: "fy-input",
									type: "email",
									value: correo,
									onChange: (e) => setCorreo(e.target.value),
									placeholder: "Ej. juan@correo.com"
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
									onChange: (e) => setPassword(e.target.value),
									placeholder: "Mínimo 6 caracteres"
								}),
								errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "fy-error",
									children: ["⚠️ ", errors.password]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "fy-field",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "fy-label",
									htmlFor: "negocio",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "fy-label__icon",
										"aria-hidden": true,
										children: "🏷️"
									}), " Nombre de tu negocio"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "negocio",
									className: "fy-input",
									value: negocio,
									onChange: (e) => setNegocio(e.target.value),
									placeholder: "Ej. Modas Rosita"
								}),
								errors.negocio && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "fy-error",
									children: ["⚠️ ", errors.negocio]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "fy-field",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "fy-label",
									htmlFor: "rubro",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "fy-label__icon",
										"aria-hidden": true,
										children: "🛍️"
									}), " ¿Qué vendes?"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "rubro",
									className: "fy-select",
									value: rubro,
									onChange: (e) => setRubro(e.target.value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Elige una opción…"
									}), RUBROS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: r.value,
										children: [
											r.emoji,
											"  ",
											r.label
										]
									}, r.value))]
								}),
								errors.rubro && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "fy-error",
									children: ["⚠️ ", errors.rubro]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "fy-field",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "fy-label",
									htmlFor: "gal",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "fy-label__icon",
										"aria-hidden": true,
										children: "🏬"
									}), " Nombre de la galería"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "gal",
									className: "fy-input",
									value: galeria_nombre,
									onChange: (e) => setGaleriaNombre(e.target.value),
									placeholder: "Ej. Galería Los Andes"
								}),
								errors.galeria_nombre && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "fy-error",
									children: ["⚠️ ", errors.galeria_nombre]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "fy-field",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "fy-label",
									htmlFor: "stand",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "fy-label__icon",
										"aria-hidden": true,
										children: "🔢"
									}), " Número de stand"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "stand",
									className: "fy-input",
									inputMode: "numeric",
									value: stand_numero,
									onChange: (e) => setStandNumero(e.target.value),
									placeholder: "Ej. 214"
								}),
								errors.stand_numero && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "fy-error",
									children: ["⚠️ ", errors.stand_numero]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fy-cta",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "fy-btn",
						onClick: onSubmit,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "fy-btn__icon",
							"aria-hidden": true,
							children: "✅"
						}), " Guardar y continuar"]
					})
				})
			]
		})]
	});
}
//#endregion
export { RegistroGaleria as component };
