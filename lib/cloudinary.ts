import { v2 as cloudinary } from "cloudinary";

// Debug: Afficher les variables d'environnement
console.log("🔍 Cloudinary Config Debug:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "✅ Défini" : "❌ Manquant",
  api_key: process.env.CLOUDINARY_API_KEY ? "✅ Défini" : "❌ Manquant", 
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✅ Défini" : "❌ Manquant",
  cloud_name_value: process.env.CLOUDINARY_CLOUD_NAME,
  api_key_value: process.env.CLOUDINARY_API_KEY,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;
