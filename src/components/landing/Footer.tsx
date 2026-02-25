export function Footer() {
  return (
    <footer
      className="py-8 px-4 border-t"
      style={{ backgroundColor: "#0A0A0A", borderColor: "#1A1A1A" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-2xl uppercase"
          style={{ fontFamily: "var(--font-bebas)", color: "#F5E642" }}
        >
          Pactados
        </p>
        <p
          className="text-sm text-gray-600"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Plataforma de Metas con Consecuencias
        </p>
        <p
          className="text-sm text-gray-700"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
