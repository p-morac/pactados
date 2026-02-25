import { createSupabaseClient } from "@/lib/supabase";
import { createResend } from "@/lib/resend";

export async function POST(req: Request) {
  let body: {
    reto_slug: string;
    reto_titulo: string;
    nombre: string;
    email: string;
    telefono: string;
    condiciones?: string;
    num_participantes: number;
    nombres_amigos?: string;
    mensaje?: string;
    // Campos extra para reto personalizado
    reto_objetivo?: string;
    reto_meta_diaria?: string;
    reto_duracion?: number;
    reto_condiciones?: string;
  };

  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const {
    reto_slug,
    reto_titulo,
    nombre,
    email,
    telefono,
    condiciones,
    num_participantes,
    nombres_amigos,
    mensaje,
    reto_objetivo,
    reto_meta_diaria,
    reto_duracion,
    reto_condiciones,
  } = body;

  if (!nombre || !email || !telefono || !reto_slug) {
    return Response.json({ error: "Faltan campos requeridos" }, { status: 400 });
  }

  // 1. Guardar en Supabase
  const supabase = createSupabaseClient();
  const resend = createResend();
  const { error } = await supabase.from("participantes").insert({
    reto_slug,
    nombre,
    email,
    telefono,
    condiciones: reto_condiciones || condiciones || null,
    num_participantes,
    nombres_amigos: nombres_amigos || null,
    mensaje: mensaje || null,
  });

  if (error) {
    console.error("Supabase error:", error);
    return Response.json({ error: "Error guardando el registro" }, { status: 500 });
  }

  const fromEmail = "Pactados <onboarding@resend.dev>";
  const esPersonalizado = reto_slug === "personalizado";

  // 2. Notificación al creador
  await resend.emails.send({
    from: fromEmail,
    to: process.env.CREATOR_EMAIL!,
    subject: `🎯 Nuevo registro: ${nombre} — ${reto_titulo}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #fff; padding: 24px; border-radius: 12px;">
        <h2 style="color: #F5E642; font-size: 24px; margin-bottom: 16px;">
          ${esPersonalizado ? "🛠️ Reto personalizado" : "Nuevo registro en Pactados"}
        </h2>

        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>WhatsApp:</strong> ${telefono}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Reto:</strong> ${reto_titulo}</p>
        <p><strong>Participantes:</strong> ${num_participantes}</p>
        <p><strong>Amigos:</strong> ${nombres_amigos || "No especificó"}</p>
        <p><strong>Motivación:</strong> ${mensaje || "No especificó"}</p>

        ${esPersonalizado ? `
        <hr style="border-color: #333; margin: 16px 0;"/>
        <h3 style="color: #F5E642; margin-bottom: 8px;">Detalles del reto personalizado</h3>
        <p><strong>Objetivo:</strong> ${reto_objetivo || "-"}</p>
        <p><strong>Meta diaria:</strong> ${reto_meta_diaria || "-"}</p>
        <p><strong>Duración:</strong> ${reto_duracion || "-"} días</p>
        <p><strong>Condiciones si falla:</strong> ${reto_condiciones || "-"}</p>
        ` : `
        <p><strong>Condiciones custom:</strong> ${condiciones || "Ninguna"}</p>
        `}

        <hr style="border-color: #222; margin: 20px 0;"/>
        <p style="color: #F5E642;">👉 <strong>Acción:</strong> Crear grupo de WhatsApp y añadir a ${telefono}</p>
      </div>
    `,
  });

  // 3. Confirmación al participante
  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: "¡Tu reto está confirmado! 🎯",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #fff; padding: 24px; border-radius: 12px;">
        <h2 style="color: #F5E642; font-size: 24px; margin-bottom: 16px;">¡Bienvenido, ${nombre}!</h2>
        <p>Te registraste en: <strong style="color: #F5E642;">${reto_titulo}</strong></p>
        <p>En las próximas horas recibirás la invitación a tu grupo de WhatsApp donde llevaremos el seguimiento diario.</p>
        <p style="font-size: 20px; margin-top: 20px;">Prepárate. 💪</p>
      </div>
    `,
  });

  return Response.json({ success: true });
}
