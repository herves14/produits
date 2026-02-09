"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-[#0B0B0B] px-6 text-center">
      {/* Glow décoratif */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.15),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-4xl"
      >
        <p className="mb-4 tracking-[0.3em] text-sm text-gold-400">
          BOUTIQUE DE LUXE
        </p>

        <h1 className="mb-6 text-5xl font-bold leading-tight text-gold-500 md:text-7xl">
          L’excellence à votre portée
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300">
          Pagnes raffinés, boissons premium et gastronomie d’exception,
          sélectionnés avec exigence.
        </p>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#categories"
          className="inline-block rounded-full bg-gold-500 px-10 py-4 font-semibold text-black transition hover:bg-gold-400"
        >
          Découvrir nos collections
        </motion.a>
      </motion.div>
    </section>
  );
}
