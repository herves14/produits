"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaLock, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        toast.success("Connexion réussie !");
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error || "Identifiants incorrects");
      }
    } catch (error) {
      toast.error("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 w-full max-w-md border border-gold-500/20 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gold-500 mb-2">
            Administration
          </h1>
          <p className="text-gray-400">Connectez-vous pour continuer</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gold-500 font-semibold mb-2">
              Nom d'utilisateur
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-900 border border-gold-500/30 rounded-lg pl-12 pr-4 py-3 text-white focus:border-gold-500 focus:outline-none transition-colors"
                placeholder="admin"
              />
            </div>
          </div>

          <div>
            <label className="block text-gold-500 font-semibold mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900 border border-gold-500/30 rounded-lg pl-12 pr-4 py-3 text-white focus:border-gold-500 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-black px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-gold-500/50 transition-all disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}