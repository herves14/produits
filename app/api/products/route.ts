import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

// GET - Liste tous les produits
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur de chargement" },
      { status: 500 }
    );
  }
}

// POST - Créer un produit avec upload d'image sur Cloudinary
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const categoryId = formData.get("categoryId") as string;
    const image = formData.get("image") as File | null;

    console.log("📥 Données reçues:", { name, price, categoryId, hasImage: !!image });

    if (!name || !price || !categoryId) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    let imagePath: string | null = null;

    // Upload sur Cloudinary si une image est fournie
    if (image) {
      try {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Image = `data:${image.type};base64,${buffer.toString("base64")}`;

        console.log("📤 Upload vers Cloudinary...");
        
        const uploadResult = await cloudinary.uploader.upload(base64Image, {
          folder: "products",
          resource_type: "auto",
        });

        imagePath = uploadResult.secure_url;
        console.log("✅ Image uploadée:", imagePath);
      } catch (uploadError) {
        console.error("❌ Erreur upload Cloudinary:", uploadError);
        return NextResponse.json(
          { error: "Erreur lors de l'upload de l'image" },
          { status: 500 }
        );
      }
    }

    // Créer le produit dans la base de données
    const product = await prisma.product.create({
      data: {
        name,
        price,
        categoryId,
        image: imagePath,
      },
    });

    console.log("✅ Produit créé:", product);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("❌ ERREUR CRÉATION PRODUIT:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT - Modifier un produit (JSON, sans upload)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const product = await prisma.product.update({
      where: { id: body.id },
      data: {
        name: body.name,
        description: body.description || null,
        price: parseFloat(body.price),
        image: body.image || null,
        categoryId: body.categoryId,
        inStock: body.inStock,
        featured: body.featured,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur de modification" },
      { status: 500 }
    );
  }
}
