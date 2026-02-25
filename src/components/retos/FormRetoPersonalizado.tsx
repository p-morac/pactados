"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  // Datos del reto
  reto_titulo: z.string().min(3, "Dale un nombre al reto"),
  reto_objetivo: z.string().min(10, "Describí el objetivo principal"),
  reto_meta_diaria: z.string().min(5, "¿Qué hay que hacer cada día?"),
  reto_duracion: z.number().min(1, "Mínimo 1 día").max(365, "Máximo 365 días"),
  reto_condiciones: z.string().min(5, "¿Qué pasa si alguien falla?"),
  // Datos del participante
  nombre: z.string().min(2, "Ingresá tu nombre"),
  email: z.string().email("Email no válido"),
  telefono: z
    .string()
    .min(8, "Ingresá tu número de WhatsApp")
    .regex(/^[+\d\s\-()]+$/, "Número no válido"),
  num_participantes: z.number().min(1).max(10),
  nombres_amigos: z.string().optional(),
  mensaje: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full px-4 py-3 rounded-lg text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-[#F5E642] transition-all";
const inputStyle = {
  backgroundColor: "#1A1A1A",
  border: "1px solid #2A2A2A",
  fontFamily: "var(--font-dm-sans)",
};
const labelClass = "block text-sm font-medium mb-2 text-gray-300";

export function FormRetoPersonalizado() {
  const [estado, setEstado] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { num_participantes: 1, reto_duracion: 30 },
  });

  async function onSubmit(data: FormData) {
    setEstado("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/registrar-participante", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reto_slug: "personalizado",
          reto_titulo: data.reto_titulo,
          reto_objetivo: data.reto_objetivo,
          reto_meta_diaria: data.reto_meta_diaria,
          reto_duracion: data.reto_duracion,
          reto_condiciones: data.reto_condiciones,
          nombre: data.nombre,
          email: data.email,
          telefono: data.telefono,
          num_participantes: data.num_participantes,
          nombres_amigos: data.nombres_amigos,
          mensaje: data.mensaje,
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Error al registrarte");
      }

      setEstado("success");
    } catch (err) {
      setEstado("error");
      setErrorMsg(err instanceof Error ? err.message : "Error inesperado");
    }
  }

  if (estado === "success") {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">🚀</div>
        <h3
          className="text-3xl uppercase mb-3"
          style={{ fontFamily: "var(--font-bebas)", color: "#F5E642" }}
        >
          ¡Reto creado!
        </h3>
        <p
          className="text-gray-400"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          En las próximas horas te contactamos para crear el grupo de WhatsApp
          con tus reglas. 💪
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>

      {/* ── SECCIÓN 1: El reto ── */}
      <div>
        <h2
          className="text-2xl uppercase mb-5"
          style={{ fontFamily: "var(--font-bebas)", color: "#F5E642" }}
        >
          1. Tu reto
        </h2>

        <div className="space-y-4">
          <div>
            <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans)" }}>
              Nombre del reto *
            </label>
            <input
              {...register("reto_titulo")}
              placeholder="Ej: 21 días sin azúcar"
              className={inputClass}
              style={inputStyle}
            />
            {errors.reto_titulo && (
              <p className="mt-1 text-sm text-red-500" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {errors.reto_titulo.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans)" }}>
              Objetivo principal *
            </label>
            <textarea
              {...register("reto_objetivo")}
              placeholder="¿Qué querés lograr con este reto?"
              rows={3}
              className={inputClass + " resize-none"}
              style={inputStyle}
            />
            {errors.reto_objetivo && (
              <p className="mt-1 text-sm text-red-500" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {errors.reto_objetivo.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans)" }}>
              Meta diaria *
            </label>
            <input
              {...register("reto_meta_diaria")}
              placeholder="Ej: No comer nada con azúcar agregada"
              className={inputClass}
              style={inputStyle}
            />
            {errors.reto_meta_diaria && (
              <p className="mt-1 text-sm text-red-500" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {errors.reto_meta_diaria.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans)" }}>
              Duración (días) *
            </label>
            <input
              {...register("reto_duracion", { valueAsNumber: true })}
              type="number"
              min={1}
              max={365}
              placeholder="30"
              className={inputClass}
              style={inputStyle}
            />
            {errors.reto_duracion && (
              <p className="mt-1 text-sm text-red-500" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {errors.reto_duracion.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans)" }}>
              ¿Qué pasa si alguien falla? *
            </label>
            <textarea
              {...register("reto_condiciones")}
              placeholder="Ej: Quien falle paga $500 al grupo, o hace 100 sentadillas en vivo"
              rows={3}
              className={inputClass + " resize-none"}
              style={inputStyle}
            />
            {errors.reto_condiciones && (
              <p className="mt-1 text-sm text-red-500" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {errors.reto_condiciones.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #222222" }} />

      {/* ── SECCIÓN 2: Tus datos ── */}
      <div>
        <h2
          className="text-2xl uppercase mb-5"
          style={{ fontFamily: "var(--font-bebas)", color: "#F5E642" }}
        >
          2. Tus datos
        </h2>

        <div className="space-y-4">
          <div>
            <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans)" }}>
              Nombre completo *
            </label>
            <input
              {...register("nombre")}
              placeholder="Tu nombre"
              className={inputClass}
              style={inputStyle}
            />
            {errors.nombre && (
              <p className="mt-1 text-sm text-red-500" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {errors.nombre.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans)" }}>
              Email *
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="tu@email.com"
              className={inputClass}
              style={inputStyle}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans)" }}>
              Número de WhatsApp *
            </label>
            <input
              {...register("telefono")}
              type="tel"
              placeholder="+54 9 11 1234-5678"
              className={inputClass}
              style={inputStyle}
            />
            {errors.telefono && (
              <p className="mt-1 text-sm text-red-500" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {errors.telefono.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans)" }}>
              ¿Cuántas personas participarán? *
            </label>
            <select
              {...register("num_participantes", { valueAsNumber: true })}
              className={inputClass}
              style={inputStyle}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "persona (solo yo)" : "personas"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans)" }}>
              Nombres y números de tus compañeros{" "}
              <span className="text-gray-600">(opcional)</span>
            </label>
            <textarea
              {...register("nombres_amigos")}
              placeholder="Ej: Juan +54 9 11 0000-0000, María +54 9 11 1111-1111"
              rows={3}
              className={inputClass + " resize-none"}
              style={inputStyle}
            />
          </div>

          <div>
            <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans)" }}>
              ¿Por qué querés hacer este reto?{" "}
              <span className="text-gray-600">(opcional)</span>
            </label>
            <textarea
              {...register("mensaje")}
              placeholder="Tu motivación..."
              rows={2}
              className={inputClass + " resize-none"}
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {errorMsg && (
        <div
          className="p-4 rounded-lg text-sm text-red-400"
          style={{ backgroundColor: "#1A0000", border: "1px solid #2A0000", fontFamily: "var(--font-dm-sans)" }}
        >
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={estado === "loading"}
        className="w-full py-4 text-lg font-bold rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
        style={{
          backgroundColor: "#F5E642",
          color: "#0A0A0A",
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        {estado === "loading" ? "Enviando..." : "Crear mi reto →"}
      </button>
    </form>
  );
}
