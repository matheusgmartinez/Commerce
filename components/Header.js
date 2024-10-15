'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [user, setUser] = useState(null); // Estado para armazenar o usuário logado
  const [categories, setCategories] = useState([]); // Estado para armazenar as categorias
  const router = useRouter();

  // Checa se o usuário está logado ao carregar o componente
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // Atualiza o estado com o usuário logado
    }

    // Função para buscar categorias dinâmicas da API
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategories(); // Chama a função para buscar as categorias
  }, []);

  // Função para deslogar o usuário
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove o usuário do localStorage
    setUser(null); // Reseta o estado do usuário
    router.push('/login'); // Redireciona para a página de login
  };

  return (
    <header>
      <h1>Commerce Header</h1>
      <nav>
        <a href="/">Home</a>

        {/* Renderiza as categorias dinâmicas */}
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <a key={index} href={`/category/${category}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </a>
          ))
        ) : (
          <span>Carregando categorias...</span>
        )}

        <a href="/cart">Cart</a>

        <a href="/orders">Pedidos</a>

        {/* Verifica se o usuário está logado */}
        {user ? (
          <>
            <span>Bem-vindo, {user.name}</span>
            <button onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </>
        )}
      </nav>
    </header>
  );
}
