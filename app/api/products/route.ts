import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

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

// POST - Créer un produit avec upload d'image (FormData)
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const categoryId = formData.get("categoryId") as string;
    const image = formData.get("image") as File | null;

    if (!name || !price || !categoryId) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    let imagePath: string | null = null;

    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `produit-${Date.now()}-${image.name}`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);
      imagePath = `/uploads/${fileName}`;
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        categoryId,
        image: imagePath,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("❌ UPLOAD ERROR", error);
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