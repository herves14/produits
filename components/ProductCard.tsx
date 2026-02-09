"use client";

import Image from "next/image";
import { useState } from "react";
import OrderModal from "./OrderModal";

type Product = {
  name: string;
  image?: string;
  price: number;
};

export default function ProductCard({ name, image, price }: Product) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="group rounded-2xl overflow-hidden bg-white/5 border border-gold-500/20 hover:border-gold-500 transition">
        {/* IMAGE */}
        <div className="relative h-48 sm:h-56 md:h-72">
          <Image
            src={image || "/placeholder.jpg"}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
          />
        </div>

        {/* TEXTE */}
        <div className="p-4 sm:p-6 text-center">
          <h3 className="text-lg sm:text-xl font-semibold text-gold-500">
            {name}
          </h3>

          <p className="mt-2 text-base sm:text-lg text-white font-medium">
            {price.toLocaleString("fr-FR")} FCFA
          </p>

          <button
            onClick={() => setOpen(true)}
            className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gold-500 text-black text-sm sm:text-base font-semibold hover:bg-gold-400 transition w-full sm:w-auto"
          >
            Commander
          </button>
        </div>
      </div>

      {open && <OrderModal onClose={() => setOpen(false)} />}
    </>
  );
}