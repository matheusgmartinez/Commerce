import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteAllProducts() {
  try {
    const deletedProducts = await prisma.product.deleteMany(); // Exclui todos os produtos
    console.log(`Produtos excluídos com sucesso: ${deletedProducts.count} produtos removidos.`);
  } catch (error) {
    console.error('Erro ao excluir produtos:', error);
  } finally {
    await prisma.$disconnect(); // Fecha a conexão com o banco de dados
  }
}

// Chama a função para excluir todos os produtos
deleteAllProducts();
