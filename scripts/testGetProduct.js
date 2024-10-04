import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testGetProduct(id) {
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });
  console.log(product); // Verifica se o produto foi encontrado
}

const productIdToTest = 4; // Substitua pelo ID que você deseja testar
testGetProduct(productIdToTest)
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
