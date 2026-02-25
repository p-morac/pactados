import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pactados – Plataforma de Metas con Consecuencias",
  description:
    "La plataforma donde tus metas tienen consecuencias reales. Elige un reto, invita a tus amigos y demuestra tu disciplina.",
  openGraph: {
    title: "Pactados – Plataforma de Metas con Consecuencias",
    description:
      "¿Y si perder dinero te hiciera más disciplinado? Únete a un reto hoy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" style={{ backgroundColor: "#0A0A0A" }}>
      <body
        className={`${bebasNeue.variable} ${dmSans.variable} antialiased`}
        style={{ backgroundColor: "#0A0A0A", color: "#FFFFFF" }}
      >
        {children}
      </body>
    </html>
  );
}
