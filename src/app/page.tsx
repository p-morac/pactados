import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ComoFunciona } from "@/components/landing/ComoFunciona";
import { RetosDestacados } from "@/components/landing/RetosDestacados";
import { PorQueFunciona } from "@/components/landing/PorQueFunciona";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main style={{ backgroundColor: "#0A0A0A" }}>
      <Navbar />
      <Hero />
      <ComoFunciona />
      <RetosDestacados />
      <PorQueFunciona />
      <CTA />
      <Footer />
    </main>
  );
}
