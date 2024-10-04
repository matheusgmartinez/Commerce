import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Primeiro produto
  const product1 = await prisma.product.create({
    data: {
      name: 'Tênis Esportivo',
      description: 'Um tênis confortável para corridas longas',
      price: 199.99,
      category: 'calçados',
      image: 'url_da_imagem_1.jpg', // Substitua pela URL da imagem
      ean: '1234567890123',
      quantity: 100,
      height: 10.0,
      width: 20.0,
      length: 30.0,
      weight: 0.5,
    },
  });

  // Segundo produto em outra categoria
  const product2 = await prisma.product.create({
    data: {
      name: 'Camiseta Casual',
      description: 'Uma camiseta confortável para o dia a dia',
      price: 49.99,
      category: 'roupas',
      image: 'url_da_imagem_2.jpg', // Substitua pela URL da imagem
      ean: '1234567890124',
      quantity: 100,
      height: 1.0,
      width: 10.0,
      length: 20.0,
      weight: 0.2,
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: 'Calça Casual',
      description: 'Uma calça confortável para o dia a dia',
      price: 99.99,
      category: 'roupas',
      image: 'url_da_imagem_2.jpg', // Substitua pela URL da imagem
      ean: '1234567890125',
      quantity: 100,
      height: 1.0,
      width: 10.0,
      length: 20.0,
      weight: 0.2,
    },
  });

  console.log('Produtos criados:', product1, product2, product3);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
