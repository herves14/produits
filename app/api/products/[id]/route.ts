import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

// PUT - Modifier un produit avec upload optionnel
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const categoryId = formData.get("categoryId") as string;
    const inStock = formData.get("inStock") === "true";
    const featured = formData.get("featured") === "true";
    const newImage = formData.get("image") as File | null;

    if (!name || !price || !categoryId) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // Récupérer le produit actuel
    const currentProduct = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!currentProduct) {
      return NextResponse.json(
        { error: "Produit introuvable" },
        { status: 404 }
      );
    }

    let imagePath = currentProduct.image; // Garder l'ancienne image par défaut

    // Si une nouvelle image est uploadée
    if (newImage) {
      // Supprimer l'ancienne image si elle existe
      if (currentProduct.image && currentProduct.image.startsWith("/uploads/")) {
        const oldImagePath = path.join(process.cwd(), "public", currentProduct.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Sauvegarder la nouvelle image
      const bytes = await newImage.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `produit-${Date.now()}-${newImage.name}`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);
      imagePath = `/uploads/${fileName}`;
    }

    // Mettre à jour le produit
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        description: description || null,
        price,
        categoryId,
        image: imagePath,
        inStock,
        featured,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("❌ UPDATE ERROR", error);
    return NextResponse.json(
      { error: "Erreur de modification" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un produit
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produit introuvable" },
        { status: 404 }
      );
    }

    // Supprimer l'image si elle existe
    if (product.image && product.image.startsWith("/uploads/")) {
      const imagePath = path.join(process.cwd(), "public", product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ DELETE ERROR", error);
    return NextResponse.json(
      { error: "Erreur de suppression" },
      { status: 500 }
    );
  }
}