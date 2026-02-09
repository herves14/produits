"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-black/70 backdrop-blur border-b border-gold-500/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
        <Link
          href="/"
          className="text-lg sm:text-xl font-bold tracking-wide text-gold-500"
        >
          House of Drink
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium text-gray-300">
          <Link
            href="/produits/pagnes"
            className="hover:text-gold-500 transition"
          >
            Pagnes
          </Link>
          <Link
            href="/produits/boissons"
            className="hover:text-gold-500 transition"
          >
            Boissons
          </Link>
          <Link
            href="/produits/restauration"
            className="hover:text-gold-500 transition"
          >
            Restauration
          </Link>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gold-500 text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <nav className="md:hidden bg-black/95 border-t border-gold-500/20">
          <div className="flex flex-col space-y-4 p-6">
            <Link
              href="/produits/pagnes"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-gold-500 transition text-lg"
            >
              Pagnes
            </Link>
            <Link
              href="/produits/boissons"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-gold-500 transition text-lg"
            >
              Boissons
            </Link>
            <Link
              href="/produits/restauration"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-gold-500 transition text-lg"
            >
              Restauration
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}