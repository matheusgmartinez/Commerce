'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Função para limpar o carrinho
  const clearCart = () => {
    localStorage.removeItem('cart'); // Remove os itens do localStorage
    setCartItems([]); // Atualiza o estado para um array vazio
  };

  return (
    <div>
      <h1>Carrinho de Compras</h1>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - R$ {item.price} x {item.quantity}
              </li>
            ))}
          </ul>
          <p>Total: R$ {totalPrice.toFixed(2)}</p>

          {/* Botão para ir ao checkout */}
          <button onClick={() => router.push('/checkout')}>Continuar a compra</button>

          {/* Botão para limpar o carrinho */}
          <button onClick={clearCart} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}>
            Limpar Carrinho
          </button>
        </div>
      )}
    </div>
  );
}
