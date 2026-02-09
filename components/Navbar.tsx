"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all ${
        scrolled ? "bg-black/90 backdrop-blur border-b border-gold-700" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        <Link href="/" className="text-gold-500 tracking-wider">
          House of Drink
        </Link>
        <div className="space-x-8 text-sm uppercase tracking-widest text-gray-300">
          <Link href="/produits/pagnes" className="hover:text-gold-400">Pagnes</Link>
          <Link href="/produits/boissons" className="hover:text-gold-400">Boissons</Link>
          <Link href="/produits/restauration" className="hover:text-gold-400">Restauration</Link>
        </div>
      </div>
    </nav>
  );
}