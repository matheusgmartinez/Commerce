// /app/search/page.js
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query'); // Obtém a consulta da barra de busca
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/search?query=${query}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    if (query) {
      fetchProducts();
    }
  }, [query]);

  return (
    <div>
      <h1>Resultados da busca por: {query}</h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <a href={`/product/${product.id}`}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <img src={product.image} alt={product.name} />
                <p>Preço: {product.price}</p>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum produto encontrado.</p>
      )}
    </div>
  );
}
