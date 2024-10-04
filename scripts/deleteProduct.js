import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteProduct(productId) {
  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: Number(productId) }, // Converte o ID para número
    });
    console.log(`Produto excluído com sucesso:`, deletedProduct);
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
  } finally {
    await prisma.$disconnect(); // Fecha a conexão com o banco de dados
  }
}

// Substitua '1' pelo ID do produto que deseja excluir
deleteProduct(3);
