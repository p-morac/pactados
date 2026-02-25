# PMC – MVP Landing Page

## Objetivo del MVP

Validar la idea lo más rápido posible. La plataforma es una **landing page atractiva** donde los usuarios pueden ver retos disponibles y registrarse en uno. Al registrarse, sus datos se guardan en Supabase y el creador recibe un correo de notificación para gestionar manualmente el grupo de WhatsApp.

**Sin pagos. Sin WhatsApp automático. Sin integraciones externas.**
Todo el valor está en: ¿la gente se registra? ¿quiere participar?

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 14 (App Router) + TypeScript |
| Estilos | Tailwind CSS + shadcn/ui |
| Base de datos | Supabase (PostgreSQL) |
| Email notificaciones | Resend (gratis hasta 3k emails/mes) |
| Deploy | Vercel |

---

## Estructura de Carpetas

```
/src
  /app
    page.tsx                  ← landing principal
    /retos
      page.tsx                ← catálogo de retos
      [id]/page.tsx           ← detalle + form de registro
    /api
      /registrar-participante
        route.ts              ← guarda en Supabase + envía emails
  /components
    /landing
      Hero.tsx
      ComoFunciona.tsx
      RetosDestacados.tsx
      CTA.tsx
    /retos
      RetoCard.tsx
      RetoDetalle.tsx
      FormRegistro.tsx
    /ui                       ← shadcn components
  /lib
    supabase.ts
    resend.ts
    retos-predefinidos.ts     ← data estática de retos
  /types
    index.ts
```

---

## Modelo de Datos (Supabase)

### `retos`
```sql
id            uuid PRIMARY KEY DEFAULT gen_random_uuid()
slug          text UNIQUE NOT NULL        -- 'correr-5km-30dias'
titulo        text NOT NULL
descripcion   text
categoria     text                        -- 'fitness' | 'lectura' | 'estudio' | 'habitos'
duracion_dias int NOT NULL
meta_diaria   text                        -- 'Correr mínimo 5km'
dificultad    text                        -- 'facil' | 'medio' | 'dificil'
emoji         text                        -- '🏃'
activo        boolean DEFAULT true
created_at    timestamptz DEFAULT now()
```

### `participantes` (tabla principal del MVP)
```sql
id                uuid PRIMARY KEY DEFAULT gen_random_uuid()
reto_id           uuid REFERENCES retos(id)
nombre            text NOT NULL
email             text NOT NULL
telefono          text NOT NULL           -- para crear el grupo de WA manualmente
condiciones       text                    -- personalización del usuario
num_participantes int DEFAULT 1           -- cuántos amigos participarán con él
nombres_amigos    text                    -- nombres/teléfonos de los amigos (texto libre)
mensaje           text                    -- motivación o contexto adicional (opcional)
created_at        timestamptz DEFAULT now()
```

---

## Páginas y Contenido

### `/` — Landing Principal

Secciones en orden:

1. **Hero**
   - Headline: *"¿Y si perder dinero te hiciera más disciplinado?"*
   - Sub: La plataforma donde tus metas tienen consecuencias reales
   - CTA: "Ver retos disponibles" → `/retos`

2. **Cómo funciona** (3 pasos)
   - 🎯 Elige un reto o crea el tuyo
   - 👥 Invita a tus amigos y define las reglas
   - 📲 Reciben un grupo de WhatsApp con recordatorios diarios

3. **Retos destacados** (3-4 cards)

4. **Por qué funciona**
   - Compromiso público + consecuencia económica = disciplina real

5. **CTA final** → `/retos`

---

### `/retos` — Catálogo

Grid de cards filtrables por categoría: Todos / Fitness / Lectura / Estudio / Hábitos

Cada card muestra: emoji, título, duración, dificultad, botón "Quiero este reto"

---

### `/retos/[id]` — Detalle + Registro

Descripción completa del reto arriba. Formulario abajo:

```
Nombre completo *
Email *
Número de WhatsApp * (para crear tu grupo)
¿Cuántas personas participarán contigo? * (1-10)
Nombres y números de tus compañeros (texto libre, opcional)
¿Quieres personalizar alguna condición? (opcional)
¿Por qué quieres hacer este reto? (opcional)

[ Quiero unirme al reto ]
```

Al enviar → mensaje de éxito:
> "¡Listo! En las próximas horas recibirás una invitación a tu grupo de WhatsApp. 🚀"

---

## API Route — `/api/registrar-participante`

```typescript
export async function POST(req: Request) {
  const body = await req.json();
  const { reto_id, nombre, email, telefono, condiciones,
          num_participantes, nombres_amigos, mensaje, reto_titulo } = body;

  // 1. Guardar en Supabase
  const { error } = await supabase
    .from("participantes")
    .insert({ reto_id, nombre, email, telefono, condiciones,
              num_participantes, nombres_amigos, mensaje });

  if (error) return Response.json({ error: "Error guardando" }, { status: 500 });

  // 2. Notificación al creador
  await resend.emails.send({
    from: "PMC <notificaciones@tudominio.com>",
    to: process.env.CREATOR_EMAIL!,
    subject: `🎯 Nuevo participante: ${nombre} — ${reto_titulo}`,
    html: `
      <h2>Nuevo registro en PMC</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>WhatsApp:</strong> ${telefono}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Reto:</strong> ${reto_titulo}</p>
      <p><strong>Participantes:</strong> ${num_participantes}</p>
      <p><strong>Amigos:</strong> ${nombres_amigos || 'No especificó'}</p>
      <p><strong>Condiciones custom:</strong> ${condiciones || 'Ninguna'}</p>
      <p><strong>Motivación:</strong> ${mensaje || 'No especificó'}</p>
      <hr/>
      <p>👉 <strong>Acción:</strong> Crear grupo de WhatsApp y añadir a ${telefono}</p>
    `,
  });

  // 3. Confirmación al participante
  await resend.emails.send({
    from: "PMC <notificaciones@tudominio.com>",
    to: email,
    subject: "¡Tu reto está confirmado! 🎯",
    html: `
      <h2>¡Bienvenido, ${nombre}!</h2>
      <p>Te registraste en: <strong>${reto_titulo}</strong></p>
      <p>En las próximas horas recibirás la invitación a tu grupo de WhatsApp 
         donde llevaremos el seguimiento diario.</p>
      <p>Prepárate. 💪</p>
    `,
  });

  return Response.json({ success: true });
}
```

---

## Retos Predefinidos

```typescript
// /lib/retos-predefinidos.ts
export const RETOS = [
  {
    slug: "correr-30-dias",
    titulo: "30 días corriendo",
    emoji: "🏃",
    categoria: "fitness",
    duracion_dias: 30,
    meta_diaria: "Correr mínimo 2km cada día",
    dificultad: "medio",
    descripcion: "Un mes sin saltarte ni un día. Construye el hábito desde cero o lleva tu rutina al siguiente nivel.",
  },
  {
    slug: "leer-un-libro",
    titulo: "Leer 1 libro en 21 días",
    emoji: "📚",
    categoria: "lectura",
    duracion_dias: 21,
    meta_diaria: "Leer mínimo 20 páginas al día",
    dificultad: "facil",
    descripcion: "21 días. 20 páginas diarias. Un libro completo. Simple, verificable, transformador.",
  },
  {
    slug: "estudiar-diario",
    titulo: "Estudiar 1 hora por 30 días",
    emoji: "📖",
    categoria: "estudio",
    duracion_dias: 30,
    meta_diaria: "1 hora de estudio enfocado sin distracciones",
    dificultad: "medio",
    descripcion: "Sin teléfono, sin redes. Solo tú y el tema que quieres dominar.",
  },
  {
    slug: "sin-redes-sociales",
    titulo: "7 días sin redes sociales",
    emoji: "📵",
    categoria: "habitos",
    duracion_dias: 7,
    meta_diaria: "Cero Instagram, TikTok, Twitter/X",
    dificultad: "dificil",
    descripcion: "La semana más difícil que tendrás. Y probablemente la más productiva de tu vida.",
  },
];
```

---

## Diseño Visual

**Concepto**: Urgencia + Energía. No es una app de bienestar suave — es una plataforma de compromiso real.

- **Paleta**: Fondo casi negro `#0A0A0A`, acento amarillo eléctrico `#F5E642`. Texto blanco.
- **Tipografía**: Display bold y condensada (Bebas Neue o Syne) para headlines. DM Sans para body.
- **Mood**: Enérgico, directo. Como un cartel de boxeo.
- **Animaciones**: Entrance animations en hero. Hover states en cards.
- **Mobile-first**: El 90% del tráfico será desde teléfono.

---

## Variables de Entorno

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
CREATOR_EMAIL=tu@email.com
NEXT_PUBLIC_APP_URL=https://tudominio.com
```

---

## SQL — Supabase

```sql
create table retos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  titulo text not null,
  descripcion text,
  categoria text,
  duracion_dias int not null,
  meta_diaria text,
  dificultad text,
  emoji text,
  activo boolean default true,
  created_at timestamptz default now()
);

create table participantes (
  id uuid primary key default gen_random_uuid(),
  reto_id uuid references retos(id),
  nombre text not null,
  email text not null,
  telefono text not null,
  condiciones text,
  num_participantes int default 1,
  nombres_amigos text,
  mensaje text,
  created_at timestamptz default now()
);
```

---

## Checklist de Desarrollo (7 días)

### Día 1-2 — Setup
- [ ] `npx create-next-app@latest pmc --typescript --tailwind --app`
- [ ] `npx shadcn-ui@latest init`
- [ ] `npm install @supabase/supabase-js resend`
- [ ] Crear proyecto Supabase + correr SQL
- [ ] Crear cuenta Resend + verificar dominio
- [ ] Deploy inicial en Vercel + variables de entorno

### Día 3-4 — Landing
- [ ] Hero con headline + CTA
- [ ] Sección "Cómo funciona"
- [ ] Retos destacados (3 cards)
- [ ] Footer

### Día 5 — Catálogo + Detalle
- [ ] `/retos` con grid y filtros por categoría
- [ ] `/retos/[id]` con descripción completa
- [ ] Formulario con validación (react-hook-form + zod)

### Día 6 — Backend
- [ ] API route completa
- [ ] Insert en Supabase
- [ ] Email al creador (Resend)
- [ ] Email de confirmación al usuario

### Día 7 — Polish + Launch
- [ ] Responsive check en móvil
- [ ] Loading states y manejo de errores
- [ ] Prueba end-to-end completa
- [ ] Comparte el link con los primeros 10 usuarios
