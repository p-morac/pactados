import Link from "next/link";
import { Reto, Dificultad } from "@/types";

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

interface RetoCardProps {
  reto: Reto;
}

export function RetoCard({ reto }: RetoCardProps) {
  return (
    <div
      className="relative p-6 rounded-xl border transition-all duration-300 hover:border-[#F5E642] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(245,230,66,0.08)] flex flex-col"
      style={{ backgroundColor: "#111111", borderColor: "#222222" }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{reto.emoji}</span>
        <span
          className="text-xs font-bold px-3 py-1 rounded-full"
          style={{
            color: dificultadColor[reto.dificultad],
            backgroundColor: `${dificultadColor[reto.dificultad]}20`,
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          {dificultadLabel[reto.dificultad]}
        </span>
      </div>

      <h3
        className="text-2xl uppercase mb-1"
        style={{ fontFamily: "var(--font-bebas)", color: "#FFFFFF" }}
      >
        {reto.titulo}
      </h3>

      <p
        className="text-xs text-gray-600 mb-3"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {reto.duracion_dias} días · {reto.meta_diaria}
      </p>

      <p
        className="text-sm text-gray-400 mb-6 flex-1 leading-relaxed"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {reto.descripcion}
      </p>

      <Link
        href={`/retos/${reto.slug}`}
        className="w-full inline-flex items-center justify-center py-3 text-sm font-bold rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-95"
        style={{
          backgroundColor: "#F5E642",
          color: "#0A0A0A",
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        Quiero este reto →
      </Link>
    </div>
  );
}
