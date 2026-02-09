"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Empêcher le scroll quand le sidebar est ouvert
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  const menuItems = [
    { href: "/produits/pagnes", label: "Pagnes" },
    { href: "/produits/boissons", label: "Boissons" },
    { href: "/produits/restauration", label: "Restauration" },
  ];

  return (
    <>
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
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-gold-500 transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-gold-500 text-2xl z-50"
            aria-label="Ouvrir le menu"
          >
            <FaBars />
          </button>
        </div>
      </header>

      {/* OVERLAY - Fond sombre cliquable */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* SIDEBAR MOBILE */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-gradient-to-b from-black via-black/95 to-black border-l border-gold-500/30 z-[70] transform transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header du Sidebar */}
        <div className="flex items-center justify-between p-6 border-b border-gold-500/20">
          <h2 className="text-xl font-bold text-gold-500">Menu</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gold-500 text-2xl hover:text-gold-400 transition"
            aria-label="Fermer le menu"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-6 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`group relative text-gray-300 hover:text-gold-500 transition-all text-lg py-3 px-4 rounded-lg hover:bg-gold-500/10 transform hover:translate-x-2 duration-200`}
              style={{ animationDelay: `ms` }}
            >
              <span className="relative z-10">{item.label}</span>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gold-500 group-hover:h-full transition-all duration-200 rounded-r" />
            </Link>
          ))}
        </nav>

        {/* Footer du Sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gold-500/20">
          <p className="text-xs text-gray-500 text-center">
            © 2026 House of Drink
          </p>
        </div>
      </div>
    </>
  );
}
