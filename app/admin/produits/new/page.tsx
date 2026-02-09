"use client";

import { useEffect, useState } from "react";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(setCategories);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("categoryId", categoryId);
    if (image) formData.append("image", image);

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      alert("✅ Produit enregistré avec image");
      setName("");
      setPrice("");
      setCategoryId("");
      setImage(null);
    } else {
      alert("❌ Erreur upload");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom"
        className="w-full p-4 bg-black border border-gold-500/30 rounded-xl"
        required
      />

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Prix"
        className="w-full p-4 bg-black border border-gold-500/30 rounded-xl"
        required
      />

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="w-full p-4 bg-black border border-gold-500/30 rounded-xl"
        required
      >
        <option value="">Catégorie</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />

      <button
        disabled={loading}
        className="w-full py-4 bg-gold-500 text-black rounded-full font-semibold"
      >
        {loading ? "Upload..." : "Enregistrer"}
      </button>
    </form>
  );
}
