import { PrismaClient } from '@prisma/client';
import AddToCart from '../../../components/AddToCart';

const prisma = new PrismaClient();

async function getProduct(productId) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  return product;
}

export default async function ProductPage({ params }) {
  const productId = parseInt(params.id, 10);
  const product = await getProduct(productId);

  if (!product) {
    return <p>Produto não encontrado</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Preço: R${product.price}</p>
      <p>EAN: {product.ean}</p>
      <p>Estoque: {product.quantity}</p>
      <p>Dimensões: {product.height} x {product.width} x {product.length} cm</p>
      <p>Peso: {product.weight} kg</p>

      {/* Componente para adicionar ao carrinho */}
      <AddToCart product={product} />
    </div>
  );
}
