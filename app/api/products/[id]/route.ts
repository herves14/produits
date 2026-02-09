import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

// PUT - Modifier un produit avec upload optionnel sur Cloudinary
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
      where: { id },
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
      try {
        // Supprimer l'ancienne image de Cloudinary si elle existe
        if (currentProduct.image && currentProduct.image.includes("cloudinary.com")) {
          const publicId = currentProduct.image.split("/").slice(-2).join("/").split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        }

        // Upload la nouvelle image sur Cloudinary
        const bytes = await newImage.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Image = `data:${newImage.type};base64,${buffer.toString("base64")}`;

        const uploadResult = await cloudinary.uploader.upload(base64Image, {
          folder: "products",
          resource_type: "auto",
        });

        imagePath = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("❌ Erreur upload Cloudinary:", uploadError);
        return NextResponse.json(
          { error: "Erreur lors de l'upload de l'image" },
          { status: 500 }
        );
      }
    }

    // Mettre à jour le produit
    const product = await prisma.product.update({
      where: { id },
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

// DELETE - Supprimer un produit et son image sur Cloudinary
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produit introuvable" },
        { status: 404 }
      );
    }

    // Supprimer l'image de Cloudinary si elle existe
    if (product.image && product.image.includes("cloudinary.com")) {
      try {
        const publicId = product.image.split("/").slice(-2).join("/").split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error("❌ Erreur suppression image Cloudinary:", error);
      }
    }

    await prisma.product.delete({
      where: { id },
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
