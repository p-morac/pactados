import Link from "next/link";

export function CTA() {
  return (
    <section
      className="py-24 px-4 relative overflow-hidden"
      style={{ backgroundColor: "#F5E642" }}
    >
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-5 mix-blend-multiply" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase leading-none mb-6"
          style={{ fontFamily: "var(--font-bebas)", color: "#0A0A0A" }}
        >
          ¿Listo para comprometerte de verdad?
        </h2>
        <p
          className="text-lg sm:text-xl text-black/70 mb-10 max-w-xl mx-auto"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          No hay atajos. Solo retos, compromiso y resultados.
        </p>
        <Link
          href="/retos"
          className="inline-flex items-center gap-2 px-10 py-5 text-xl font-bold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            backgroundColor: "#0A0A0A",
            color: "#F5E642",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          Ver todos los retos →
        </Link>
      </div>
    </section>
  );
}
