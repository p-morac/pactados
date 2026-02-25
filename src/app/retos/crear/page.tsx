import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FormRetoPersonalizado } from "@/components/retos/FormRetoPersonalizado";

export const metadata = {
  title: "Crea tu reto – Pactados",
  description: "Define tu propio reto con tus reglas y condiciones.",
};

export default function CrearRetoPage() {
  return (
    <main style={{ backgroundColor: "#0A0A0A", minHeight: "100vh" }}>
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-10">
            <a
              href="/retos"
              className="text-sm text-gray-600 hover:text-gray-400 transition-colors"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              ← Todos los retos
            </a>

            <div className="mt-6">
              <div className="text-6xl mb-4">✍️</div>
              <h1
                className="text-6xl sm:text-7xl uppercase leading-none mb-3"
                style={{ fontFamily: "var(--font-bebas)", color: "#FFFFFF" }}
              >
                Crea tu reto
              </h1>
              <p
                className="text-gray-400"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Definí las reglas, el objetivo y las condiciones. Solo vos y
                quienes invités van a ver este reto.
              </p>
            </div>
          </div>

          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: "#111111", border: "1px solid #222222" }}
          >
            <FormRetoPersonalizado />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
