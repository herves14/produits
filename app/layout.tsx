import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chez house of drink — Boutique de Luxe",
  description:
    "Pagnes raffinés, boissons d’exception et restauration gastronomique",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${inter.className} bg-black text-cream min-h-screen flex flex-col`}
      >
        <Navbar />

        {/* CONTENU DE LA PAGE */}
        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}

