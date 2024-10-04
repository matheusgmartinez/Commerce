import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

async function getProduct(id) {
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });
  return product;
}

export default async function ProductPage({ params }) {
  const { id } = params; // Pega o ID dos parâmetros
  const product = await getProduct(id);

  if (!product) {
    return notFound(); // Retorna uma página 404 se o produto não for encontrado
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} /> {/* Imagem do produto */}
      <p>{product.description}</p>
      <p>Preço: R${product.price.toFixed(2)}</p>
      <p>Categoria: {product.category}</p>
      <p>EAN: {product.ean}</p> {/* EAN */}
      <p>Quantidade em Estoque: {product.quantity}</p> {/* Estoque */}
      <p>Dimensões: {product.height} cm (Altura) x {product.width} cm (Largura) x {product.length} cm (Comprimento)</p> {/* Dimensões */}
      <p>Peso: {product.weight} kg</p> {/* Peso */}
    </div>
  );
}
