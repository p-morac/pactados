export type Categoria = "fitness" | "lectura" | "estudio" | "habitos";
export type Dificultad = "facil" | "medio" | "dificil";

export interface Reto {
  slug: string;
  titulo: string;
  emoji: string;
  categoria: Categoria;
  duracion_dias: number;
  meta_diaria: string;
  dificultad: Dificultad;
  descripcion: string;
}

export interface Participante {
  reto_id: string;
  nombre: string;
  email: string;
  telefono: string;
  condiciones?: string;
  num_participantes: number;
  nombres_amigos?: string;
  mensaje?: string;
}

export interface RegistroPayload extends Participante {
  reto_titulo: string;
}
