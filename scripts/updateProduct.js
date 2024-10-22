import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const productId = 12; // ID do produto que você deseja atualizar
  const newImageUrl = '/products/calça.png'; // A nova URL da imagem

  // Atualizando o produto
  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: { image: newImageUrl }, // Atualiza a URL da imagem
  });

  console.log('Produto atualizado:', updatedProduct);
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
