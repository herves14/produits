"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AdminProductForm from "@/components/AdminProductForm";
import toast from "react-hot-toast";
import Image from "next/image";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image?: string | null;
  categoryId: string;
  inStock: boolean;
  featured: boolean;
  category: {
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
}

export default function ProduitsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Charger les produits et catégories
  const loadData = async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/categories"),
      ]);

      if (productsRes.ok && categoriesRes.ok) {
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        setProducts(productsData);
        setCategories(categoriesData);
      }
    } catch (error) {
      toast.error("Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Supprimer un produit
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Supprimer "${name}" ?`)) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Produit supprimé !");
        loadData();
      } else {
        toast.error("Erreur de suppression");
      }
    } catch (error) {
      toast.error("Erreur de suppression");
    }
  };

  // Ouvrir le formulaire de modification
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // Ouvrir le formulaire de création
  const handleNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* HEADER - Responsive */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gold-500">
          Produits ({products.length})
        </h1>

        <motion.button
          onClick={handleNew}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-black text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-gold-500/50 transition-all w-full sm:w-auto justify-center"
        >
          <FaPlus /> Ajouter un produit
        </motion.button>
      </div>

      {/* LISTE DES PRODUITS - Grille responsive */}
      {loading ? (
        <div className="text-center text-gray-400 py-12">
          Chargement...
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          Aucun produit pour le moment
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gold-500/20 overflow-hidden hover:border-gold-500/50 transition-all"
            >
              {/* IMAGE - Hauteur responsive */}
              <div className="relative h-40 sm:h-48 bg-gray-800">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-600 text-sm">
                    Pas d'image
                  </div>
                )}
              </div>

              {/* INFOS - Padding responsive */}
              <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gold-500 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {product.category.name}
                  </p>
                </div>

                {product.description && (
                  <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">
                    {product.description}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <span className="text-lg sm:text-xl font-bold text-white">
                    {product.price.toLocaleString("fr-FR")} FCFA
                  </span>

                  <div className="flex gap-2 flex-wrap">
                    {product.inStock && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                        En stock
                      </span>
                    )}
                    {product.featured && (
                      <span className="px-2 py-1 bg-gold-500/20 text-gold-500 text-xs rounded-full">
                        ⭐ Vedette
                      </span>
                    )}
                  </div>
                </div>

                {/* BOUTONS - Responsive avec icônes + texte adaptatif */}
                <div className="flex gap-2 pt-2">
                  <motion.button
                    onClick={() => handleEdit(product)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors"
                  >
                    <FaEdit /> 
                    <span className="hidden sm:inline">Modifier</span>
                  </motion.button>

                  <motion.button
                    onClick={() => handleDelete(product.id, product.name)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-red-600 hover:bg-red-700 text-white px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors"
                  >
                    <FaTrash /> 
                    <span className="hidden sm:inline">Supprimer</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* FORMULAIRE MODAL */}
      {showForm && (
        <AdminProductForm
          product={editingProduct}
          categories={categories}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          onSuccess={loadData}
        />
      )}
    </div>
  );
}