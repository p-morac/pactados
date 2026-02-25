const pasos = [
  {
    numero: "01",
    emoji: "🎯",
    titulo: "Elige un reto o crea el tuyo",
    descripcion:
      "Selecciona entre los retos disponibles o propón uno propio. Fitness, lectura, estudio, hábitos — lo que necesites cambiar.",
  },
  {
    numero: "02",
    emoji: "👥",
    titulo: "Invita a tus amigos y define las reglas",
    descripcion:
      "Más participantes = más presión social = más probabilidad de éxito. Define las condiciones y el precio de fallar.",
  },
  {
    numero: "03",
    emoji: "📲",
    titulo: "Grupo de WhatsApp con seguimiento",
    descripcion:
      "Recibirán un grupo de WhatsApp con recordatorios diarios. Transparencia total. Sin escapatoria.",
  },
];

export function ComoFunciona() {
  return (
    <section className="py-24 px-4" style={{ backgroundColor: "#0A0A0A" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-sm font-medium mb-3 uppercase tracking-widest"
            style={{ color: "#F5E642", fontFamily: "var(--font-dm-sans)" }}
          >
            El sistema
          </p>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl uppercase"
            style={{ fontFamily: "var(--font-bebas)", color: "#FFFFFF" }}
          >
            Cómo funciona
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pasos.map((paso) => (
            <div
              key={paso.numero}
              className="relative p-8 rounded-xl border transition-all duration-300 hover:border-[#F5E642] group"
              style={{
                backgroundColor: "#111111",
                borderColor: "#222222",
              }}
            >
              {/* Número de fondo */}
              <div
                className="absolute top-4 right-6 text-8xl font-black opacity-5 select-none"
                style={{ fontFamily: "var(--font-bebas)", color: "#F5E642" }}
              >
                {paso.numero}
              </div>

              <div className="text-4xl mb-4">{paso.emoji}</div>
              <h3
                className="text-2xl mb-3 uppercase"
                style={{ fontFamily: "var(--font-bebas)", color: "#FFFFFF" }}
              >
                {paso.titulo}
              </h3>
              <p
                className="text-gray-400 leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {paso.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
