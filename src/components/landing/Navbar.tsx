import Link from "next/link";

export function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
      style={{ backgroundColor: "rgba(10, 10, 10, 0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-3xl uppercase hover:opacity-80 transition-opacity"
          style={{ fontFamily: "var(--font-bebas)", color: "#F5E642" }}
        >
          Pactados
        </Link>
        <Link
          href="/retos"
          className="px-5 py-2 text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: "#F5E642",
            color: "#0A0A0A",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          Ver retos
        </Link>
      </div>
    </nav>
  );
}
