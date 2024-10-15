'use client';

import { useState } from 'react';

function AddToCart({ product }) {
  const [cart, setCart] = useState([]);

  const addToCart = () => {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    setCart(cartItems); // Atualiza o estado para refletir as mudanças
    alert('Produto adicionado ao carrinho');
  };

  return (
    <button onClick={addToCart}>
      Adicionar ao Carrinho
    </button>
  );
}

export default AddToCart;
