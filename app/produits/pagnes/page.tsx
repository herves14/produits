import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

export default async function PagnesPage() {
  const products = await prisma.product.findMany({
    where: {
      category: {
        name: "pagnes",
      },
    },
  });

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white px-4 sm:px-6 py-20 sm:py-24">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold-500 text-center mb-12 sm:mb-16">
        Nos Pagnes
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-400">
          Aucun produit disponible pour le moment
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12 max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              image={product.image ?? undefined}
              price={product.price}
            />
          ))}
        </div>
      )}
    </main>
  );
}
