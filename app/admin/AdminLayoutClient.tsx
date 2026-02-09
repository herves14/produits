"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { logoutAction } from "./actions";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0B0B0B] text-white">
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 text-gold-500 text-2xl bg-black/80 p-3 rounded-lg border border-gold-500/20"
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 border-r border-gold-500/20 p-6 flex flex-col
          bg-[#0B0B0B] transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <h1 className="text-2xl font-bold text-gold-500 mb-10 mt-12 lg:mt-0">
          Admin Panel
        </h1>

        <nav className="space-y-4 flex-1">
          <Link
            href="/admin"
            onClick={() => setSidebarOpen(false)}
            className="block hover:text-gold-500 transition"
          >
            📊 Dashboard
          </Link>
          <Link
            href="/admin/produits"
            onClick={() => setSidebarOpen(false)}
            className="block hover:text-gold-500 transition"
          >
            📦 Produits
          </Link>
          <Link
            href="/admin/categories"
            onClick={() => setSidebarOpen(false)}
            className="block hover:text-gold-500 transition"
          >
            🗂️ Catégories
          </Link>
        </nav>

        {/* BOUTON DÉCONNEXION */}
        <form
          action={logoutAction}
          className="mt-auto pt-6 border-t border-gold-500/20"
        >
          <button
            type="submit"
            className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition text-center"
          >
            🚪 Déconnexion
          </button>
        </form>
      </aside>

      {/* OVERLAY MOBILE */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* CONTENT */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10">{children}</main>
    </div>
  );
}


