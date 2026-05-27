import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EntrenaConIA — Tu Entrenador Personal con IA",
  description: "Entrena con inteligencia artificial. Planes personalizados de gimnasio, boxeo, pádel, yoga, running y más. La plataforma fitness más avanzada.",
  keywords: "entrenamiento IA, fitness inteligencia artificial, gym AI, padel training, ejercicio personalizado",
  openGraph: {
    title: "EntrenaConIA — Tu Entrenador Personal con IA",
    description: "La plataforma de fitness más avanzada con inteligencia artificial",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.className} min-h-full`}>{children}</body>
    </html>
  );
}
