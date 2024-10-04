import { PrismaClient } from '@prisma/client';
import Link from 'next/link'; // Importando o Link do Next.js

const prisma = new PrismaClient();

async function getProducts(category) {
  const products = await prisma.product.findMany({
    where: { category },
  });
  return products;
}

export default async function CategoryPage({ params }) {
  const { category } = params;
  const products = await getProducts(category);

  return (
    <div>
      <h1>Categoria: {category}</h1>
      <div className="product-list"> {/* Contêiner para os cartões de produtos */}
        {products.map((product) => (
          <div className="product-card" key={product.id}> {/* Cada produto em um cartão */}
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Preço: R${product.price.toFixed(2)}</p>
            <Link href={`/product/${product.id}`}>
              Comprar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
