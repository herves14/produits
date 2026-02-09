import Hero from "@/components/Hero";
import LuxuryCard from "@/components/LuxuryCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white">
      
      {/* HERO */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide text-gold-500">
          Présentation Produits
        </h1>

        <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-300">
          Une expérience d’achat raffinée, des produits sélectionnés avec soin
          et un service de restauration d’exception.
        </p>
      </section>

      {/* UNIVERS DE LUXE */}
      <LuxuryCard />
    </main>
  );
}
