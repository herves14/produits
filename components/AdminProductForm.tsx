"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaSave, FaTimes, FaImage } from "react-icons/fa";
import toast from "react-hot-toast";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image?: string | null;
  categoryId: string;
  inStock: boolean;
  featured: boolean;
}

interface AdminProductFormProps {
  product?: Product | null;
  categories: Category[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminProductForm({
  product,
  categories,
  onClose,
  onSuccess,
}: AdminProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price.toString() || "",
    categoryId: product?.categoryId || categories[0]?.id || "",
    inStock: product?.inStock ?? true,
    featured: product?.featured ?? false,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    product?.image || null
  );
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("categoryId", formData.categoryId);
      formDataToSend.append("inStock", formData.inStock.toString());
      formDataToSend.append("featured", formData.featured.toString());

      if (product) {
        formDataToSend.append("id", product.id);
      }

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const url = product ? `/api/products/${product.id}` : "/api/products";
      const method = product ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success(product ? "Produit modifié !" : "Produit créé !");
        onSuccess();
        onClose();
      } else {
        const error = await response.json();
        toast.error(error.error || "Erreur lors de la sauvegarde");
      }
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-black rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 border border-gold-500/20"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gold-500">
            {product ? "Modifier le produit" : "Nouveau produit"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gold-500 transition-colors"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gold-500 font-semibold mb-2">
              Nom du produit *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-gray-900 border border-gold-500/30 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:outline-none transition-colors"
              placeholder="Ex: Pagne Wax Premium"
            />
          </div>

          <div>
            <label className="block text-gold-500 font-semibold mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full bg-gray-900 border border-gold-500/30 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:outline-none transition-colors resize-none"
              placeholder="Description du produit..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gold-500 font-semibold mb-2">
                Prix (FCFA) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full bg-gray-900 border border-gold-500/30 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:outline-none transition-colors"
                placeholder="15000"
              />
            </div>

            <div>
              <label className="block text-gold-500 font-semibold mb-2">
                Catégorie *
              </label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                className="w-full bg-gray-900 border border-gold-500/30 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:outline-none transition-colors"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gold-500 font-semibold mb-2">
              Image du produit
            </label>

            {imagePreview && (
              <div className="mb-4 relative w-full h-48 rounded-lg overflow-hidden border border-gold-500/30">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <label className="flex items-center justify-center gap-2 w-full bg-gray-900 border border-gold-500/30 rounded-lg px-4 py-3 cursor-pointer hover:border-gold-500 transition-colors">
              <FaImage className="text-gold-500" />
              <span className="text-gray-300">
                {imageFile
                  ? imageFile.name
                  : product?.image
                  ? "Changer l'image"
                  : "Choisir une image"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) =>
                  setFormData({ ...formData, inStock: e.target.checked })
                }
                className="w-5 h-5 rounded border-gold-500/30 bg-gray-900 text-gold-500 focus:ring-gold-500"
              />
              <span className="text-gray-300">En stock</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="w-5 h-5 rounded border-gold-500/30 bg-gray-900 text-gold-500 focus:ring-gold-500"
              />
              <span className="text-gray-300">Produit vedette</span>
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-black px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-gold-500/50 transition-all disabled:opacity-50"
            >
              <FaSave /> {loading ? "Enregistrement..." : "Enregistrer"}
            </motion.button>
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Annuler
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}