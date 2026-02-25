"use client";

import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { RetoCard } from "@/components/retos/RetoCard";
import { RETOS } from "@/lib/retos-predefinidos";
import { Categoria } from "@/types";

const categorias: { valor: Categoria | "todos"; label: string }[] = [
  { valor: "todos", label: "Todos" },
  { valor: "fitness", label: "💪 Fitness" },
  { valor: "lectura", label: "📚 Lectura" },
  { valor: "estudio", label: "📖 Estudio" },
  { valor: "habitos", label: "🧠 Hábitos" },
];

export default function RetosPage() {
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria | "todos">("todos");

  const retosFiltrados =
    categoriaActiva === "todos"
      ? RETOS
      : RETOS.filter((r) => r.categoria === categoriaActiva);

  return (
    <main style={{ backgroundColor: "#0A0A0A", minHeight: "100vh" }}>
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p
              className="text-sm font-medium mb-3 uppercase tracking-widest"
              style={{ color: "#F5E642", fontFamily: "var(--font-dm-sans)" }}
            >
              Elige tu desafío
            </p>
            <h1
              className="text-6xl sm:text-7xl md:text-8xl uppercase mb-4"
              style={{ fontFamily: "var(--font-bebas)", color: "#FFFFFF" }}
            >
              Todos los retos
            </h1>
            <p
              className="text-gray-500 max-w-lg mx-auto"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Elige el que más te asuste. Ese es el que necesitas.
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categorias.map((cat) => (
              <button
                key={cat.valor}
                onClick={() => setCategoriaActiva(cat.valor)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor:
                    categoriaActiva === cat.valor ? "#F5E642" : "#1A1A1A",
                  color:
                    categoriaActiva === cat.valor ? "#0A0A0A" : "#888888",
                  border: `1px solid ${categoriaActiva === cat.valor ? "#F5E642" : "#2A2A2A"}`,
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid de retos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {retosFiltrados.map((reto) => (
              <RetoCard key={reto.slug} reto={reto} />
            ))}

            {/* Card: Crea tu reto (siempre visible) */}
            <a
              href="/retos/crear"
              className="relative p-6 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-[#F5E642] hover:-translate-y-1 group min-h-[280px]"
              style={{ borderColor: "#2A2A2A", backgroundColor: "#0D0D0D" }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-200">
                ✍️
              </div>
              <h3
                className="text-2xl uppercase mb-2"
                style={{ fontFamily: "var(--font-bebas)", color: "#FFFFFF" }}
              >
                Crea tu reto
              </h3>
              <p
                className="text-sm text-gray-500 mb-4"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Definí tus propias reglas, objetivos y consecuencias.
              </p>
              <span
                className="text-sm font-medium group-hover:text-[#F5E642] transition-colors"
                style={{ color: "#555555", fontFamily: "var(--font-dm-sans)" }}
              >
                Personalizar →
              </span>
            </a>
          </div>

          {retosFiltrados.length === 0 && (
            <div className="text-center py-20">
              <p
                className="text-gray-600"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                No hay retos en esta categoría todavía.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
