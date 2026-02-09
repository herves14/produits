import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  // Créer les catégories
  const pagnesCategory = await prisma.category.upsert({
    where: { slug: 'pagnes' },
    update: {},
    create: {
      name: 'Pagnes',
      slug: 'pagnes',
      icon: '👗',
      order: 1,
    },
  });

  const boissonsCategory = await prisma.category.upsert({
    where: { slug: 'boissons' },
    update: {},
    create: {
      name: 'Boissons',
      slug: 'boissons',
      icon: '🍷',
      order: 2,
    },
  });

  const restaurationCategory = await prisma.category.upsert({
    where: { slug: 'restauration' },
    update: {},
    create: {
      name: 'Restauration',
      slug: 'restauration',
      icon: '🍽️',
      order: 3,
    },
  });

  console.log('✅ Catégories créées');

  // Créer des produits de démonstration pour Pagnes
  const pagnesProducts = [
    {
      name: 'Pagne Wax Premium',
      description: 'Magnifique pagne wax avec motifs traditionnels africains',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
      categoryId: pagnesCategory.id,
      inStock: true,
      featured: true,
    },
    {
      name: 'Pagne Kente Royal',
      description: 'Pagne Kente tissé à la main, symbole de richesse',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=500',
      categoryId: pagnesCategory.id,
      inStock: true,
      featured: false,
    },
  ];

  // Créer des produits de démonstration pour Boissons
  const boissonsProducts = [
    {
      name: 'Whisky Johnnie Walker Blue Label',
      description: 'Whisky écossais premium, blend exceptionnel',
      price: 85000,
      image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=500',
      categoryId: boissonsCategory.id,
      inStock: true,
      featured: true,
    },
    {
      name: 'Champagne Moët & Chandon',
      description: 'Champagne français de prestige',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=500',
      categoryId: boissonsCategory.id,
      inStock: true,
      featured: false,
    },
    {
      name: 'Cocktail Mojito Signature',
      description: 'Notre cocktail maison à base de rhum premium',
      price: 5000,
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500',
      categoryId: boissonsCategory.id,
      inStock: true,
      featured: false,
    },
  ];

  // Créer des produits de démonstration pour Restauration
  const restaurationProducts = [
    {
      name: 'Menu Gastronomique 3 Services',
      description: 'Entrée, plat principal et dessert raffinés',
      price: 12000,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500',
      categoryId: restaurationCategory.id,
      inStock: true,
      featured: true,
    },
    {
      name: 'Poulet Yassa Traditionnel',
      description: 'Spécialité africaine avec riz et légumes',
      price: 6500,
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500',
      categoryId: restaurationCategory.id,
      inStock: true,
      featured: false,
    },
  ];

  // Insérer tous les produits
  for (const product of [...pagnesProducts, ...boissonsProducts, ...restaurationProducts]) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('✅ Produits créés');

  // Créer les informations de contact
  await prisma.contact.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      whatsapp: '22961234567',
      email: 'contact@chezamadou.com',
      phone: '22961234567',
      address: 'Abomey-Calavi, Atlantique, Bénin',
      latitude: 6.4489,
      longitude: 2.3537,
    },
  });

  console.log('✅ Informations de contact créées');
  console.log('🎉 Seeding terminé avec succès!');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });