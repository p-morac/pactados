import Link from "next/link";
import { RETOS } from "@/lib/retos-predefinidos";
import { Dificultad } from "@/types";

const dificultadColor: Record<Dificultad, string> = {
  facil: "#22c55e",
  medio: "#F5E642",
  dificil: "#ef4444",
};

const dificultadLabel: Record<Dificultad, string> = {
  facil: "Fácil",
  medio: "Medio",
  dificil: "Difícil",
};

export function RetosDestacados() {
  const destacados = RETOS.slice(0, 3);

  return (
    <section
      className="py-24 px-4"
      style={{ backgroundColor: "#0D0D0D", borderTop: "1px solid #1A1A1A" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
          <div>
            <p
              className="text-sm font-medium mb-3 uppercase tracking-widest"
              style={{ color: "#F5E642", fontFamily: "var(--font-dm-sans)" }}
            >
              Empieza hoy
            </p>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl uppercase"
              style={{ fontFamily: "var(--font-bebas)", color: "#FFFFFF" }}
            >
              Retos disponibles
            </h2>
          </div>
          <Link
            href="/retos"
            className="text-sm font-medium underline underline-offset-4 hover:opacity-80 transition-opacity whitespace-nowrap"
            style={{ color: "#F5E642", fontFamily: "var(--font-dm-sans)" }}
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destacados.map((reto) => (
            <Link
              key={reto.slug}
              href={`/retos/${reto.slug}`}
              className="group relative p-6 rounded-xl border transition-all duration-300 hover:border-[#F5E642] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(245,230,66,0.1)]"
              style={{
                backgroundColor: "#111111",
                borderColor: "#222222",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{reto.emoji}</span>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    color: dificultadColor[reto.dificultad],
                    backgroundColor: `${dificultadColor[reto.dificultad]}15`,
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {dificultadLabel[reto.dificultad]}
                </span>
              </div>

              <h3
                className="text-2xl uppercase mb-2"
                style={{ fontFamily: "var(--font-bebas)", color: "#FFFFFF" }}
              >
                {reto.titulo}
              </h3>
              <p
                className="text-sm text-gray-500 mb-4 line-clamp-2"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {reto.descripcion}
              </p>

              <div className="flex items-center justify-between">
                <span
                  className="text-xs text-gray-600"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {reto.duracion_dias} días
                </span>
                <span
                  className="text-sm font-medium group-hover:text-[#F5E642] transition-colors"
                  style={{
                    color: "#888888",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  Quiero este reto →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
