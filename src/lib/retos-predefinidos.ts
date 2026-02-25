import { Reto } from "@/types";

export const RETOS: Reto[] = [
  {
    slug: "correr-30-dias",
    titulo: "30 días corriendo",
    emoji: "🏃",
    categoria: "fitness",
    duracion_dias: 30,
    meta_diaria: "Correr mínimo 2km cada día",
    dificultad: "medio",
    descripcion:
      "Un mes sin saltarte ni un día. Construye el hábito desde cero o lleva tu rutina al siguiente nivel.",
  },
  {
    slug: "leer-un-libro",
    titulo: "Leer 1 libro en 21 días",
    emoji: "📚",
    categoria: "lectura",
    duracion_dias: 21,
    meta_diaria: "Leer mínimo 20 páginas al día",
    dificultad: "facil",
    descripcion:
      "21 días. 20 páginas diarias. Un libro completo. Simple, verificable, transformador.",
  },
  {
    slug: "estudiar-diario",
    titulo: "Estudiar 1 hora por 30 días",
    emoji: "📖",
    categoria: "estudio",
    duracion_dias: 30,
    meta_diaria: "1 hora de estudio enfocado sin distracciones",
    dificultad: "medio",
    descripcion:
      "Sin teléfono, sin redes. Solo tú y el tema que quieres dominar.",
  },
  {
    slug: "sin-redes-sociales",
    titulo: "7 días sin redes sociales",
    emoji: "📵",
    categoria: "habitos",
    duracion_dias: 7,
    meta_diaria: "Cero Instagram, TikTok, Twitter/X",
    dificultad: "dificil",
    descripcion:
      "La semana más difícil que tendrás. Y probablemente la más productiva de tu vida.",
  },
];

export function getRetoPorSlug(slug: string): Reto | undefined {
  return RETOS.find((r) => r.slug === slug);
}
