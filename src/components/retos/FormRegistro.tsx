"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Reto } from "@/types";

const schema = z.object({
  nombre: z.string().min(2, "Ingresa tu nombre completo"),
  email: z.string().email("Email no válido"),
  telefono: z
    .string()
    .min(8, "Ingresa tu número de WhatsApp")
    .regex(/^[+\d\s\-()]+$/, "Número no válido"),
  num_participantes: z.number().min(1, "Mínimo 1").max(10, "Máximo 10"),
  nombres_amigos: z.string().optional(),
  condiciones: z.string().optional(),
  mensaje: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface FormRegistroProps {
  reto: Reto;
}

export function FormRegistro({ reto }: FormRegistroProps) {
  const [estado, setEstado] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { num_participantes: 1 },
  });

  async function onSubmit(data: FormData) {
    setEstado("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/registrar-participante", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          reto_slug: reto.slug,
          reto_titulo: reto.titulo,
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
      <div
        className="rounded-xl p-8 text-center"
        style={{ backgroundColor: "#111111", border: "1px solid #F5E642" }}
      >
        <div className="text-5xl mb-4">🚀</div>
        <h3
          className="text-3xl uppercase mb-3"
          style={{ fontFamily: "var(--font-bebas)", color: "#F5E642" }}
        >
          ¡Estás dentro!
        </h3>
        <p
          className="text-gray-400 leading-relaxed"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          ¡Listo! En las próximas horas recibirás una invitación a tu grupo de
          WhatsApp. Prepárate para el reto. 💪
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
      {/* Nombre */}
      <div>
        <label
          className="block text-sm font-medium mb-2 text-gray-300"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Nombre completo *
        </label>
        <input
          {...register("nombre")}
          placeholder="Tu nombre"
          className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-[#F5E642] transition-all"
          style={{
            backgroundColor: "#1A1A1A",
            border: "1px solid #2A2A2A",
            fontFamily: "var(--font-dm-sans)",
          }}
        />
        {errors.nombre && (
          <p className="mt-1 text-sm text-red-500" style={{ fontFamily: "var(--font-dm-sans)" }}>
            {errors.nombre.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          className="block text-sm font-medium mb-2 text-gray-300"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Email *
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="tu@email.com"
          className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-[#F5E642] transition-all"
          style={{
            backgroundColor: "#1A1A1A",
            border: "1px solid #2A2A2A",
            fontFamily: "var(--font-dm-sans)",
          }}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500" style={{ fontFamily: "var(--font-dm-sans)" }}>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label
          className="block text-sm font-medium mb-2 text-gray-300"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Número de WhatsApp *
        </label>
        <input
          {...register("telefono")}
          type="tel"
          placeholder="+54 9 11 1234-5678"
          className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-[#F5E642] transition-all"
          style={{
            backgroundColor: "#1A1A1A",
            border: "1px solid #2A2A2A",
            fontFamily: "var(--font-dm-sans)",
          }}
        />
        {errors.telefono && (
          <p className="mt-1 text-sm text-red-500" style={{ fontFamily: "var(--font-dm-sans)" }}>
            {errors.telefono.message}
          </p>
        )}
      </div>

      {/* Número de participantes */}
      <div>
        <label
          className="block text-sm font-medium mb-2 text-gray-300"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          ¿Cuántas personas participarán contigo? *
        </label>
        <select
          {...register("num_participantes", { valueAsNumber: true })}
          className="w-full px-4 py-3 rounded-lg text-white outline-none focus:ring-2 focus:ring-[#F5E642] transition-all"
          style={{
            backgroundColor: "#1A1A1A",
            border: "1px solid #2A2A2A",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "persona (solo yo)" : "personas"}
            </option>
          ))}
        </select>
      </div>

      {/* Nombres de amigos */}
      <div>
        <label
          className="block text-sm font-medium mb-2 text-gray-300"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Nombres y números de tus compañeros{" "}
          <span className="text-gray-600">(opcional)</span>
        </label>
        <textarea
          {...register("nombres_amigos")}
          placeholder="Ej: Juan +54 9 11 0000-0000, María +54 9 11 1111-1111"
          rows={3}
          className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-[#F5E642] transition-all resize-none"
          style={{
            backgroundColor: "#1A1A1A",
            border: "1px solid #2A2A2A",
            fontFamily: "var(--font-dm-sans)",
          }}
        />
      </div>

      {/* Condiciones */}
      <div>
        <label
          className="block text-sm font-medium mb-2 text-gray-300"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          ¿Quieres personalizar alguna condición?{" "}
          <span className="text-gray-600">(opcional)</span>
        </label>
        <input
          {...register("condiciones")}
          placeholder="Ej: Si fallo, pago $500 a cada participante"
          className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-[#F5E642] transition-all"
          style={{
            backgroundColor: "#1A1A1A",
            border: "1px solid #2A2A2A",
            fontFamily: "var(--font-dm-sans)",
          }}
        />
      </div>

      {/* Motivación */}
      <div>
        <label
          className="block text-sm font-medium mb-2 text-gray-300"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          ¿Por qué quieres hacer este reto?{" "}
          <span className="text-gray-600">(opcional)</span>
        </label>
        <textarea
          {...register("mensaje")}
          placeholder="Tu motivación..."
          rows={3}
          className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-[#F5E642] transition-all resize-none"
          style={{
            backgroundColor: "#1A1A1A",
            border: "1px solid #2A2A2A",
            fontFamily: "var(--font-dm-sans)",
          }}
        />
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
        {estado === "loading" ? "Registrando..." : "Quiero unirme al reto →"}
      </button>
    </form>
  );
}
