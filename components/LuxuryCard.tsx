import Link from "next/link";

type LuxuryCardItem = {
  title: string;
  description: string;
  href: string;
};

const cards: LuxuryCardItem[] = [
  {
    title: "Pagnes",
    description: "Pagnes africains raffinés et éditions exclusives.",
    href: "/produits/pagnes",
  },
  {
    title: "Boissons",
    description: "Boissons raffinées, vins sélectionnés et spiritueux.",
    href: "/produits/boissons",
  },
  {
    title: "Restauration",
    description: "Un service culinaire élégant et savoureux.",
    href: "/produits/restauration",
  },
];

export default function LuxuryCard() {
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
      {cards.map((card) => (
        <Link
          key={card.title}
          href={card.href}
          className="
            group rounded-2xl border border-[#D4AF37]/30 p-6 sm:p-8 md:p-10
            bg-white/5 backdrop-blur-md
            transition-all duration-500
            hover:bg-[#D4AF37]/10 hover:scale-105
          "
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#D4AF37]">
            {card.title}
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            {card.description}
          </p>

          <span className="mt-4 sm:mt-6 inline-block text-sm sm:text-base text-[#D4AF37] group-hover:underline">
            Découvrir →
          </span>
        </Link>
      ))}
    </section>
  );
}