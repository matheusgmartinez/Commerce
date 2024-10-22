// /components/Header.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar a busca
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  // Função para lidar com a busca
  const handleSearch = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do form
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery}`); // Redireciona para a página de busca
    }
  };

  return (
    <header>
      <h1>Commerce Header</h1>
      <nav>
        <a href="/">Home</a>

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

        {/* Barra de busca */}
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar produtos..."
          />
          <button type="submit">Buscar</button>
        </form>
      </nav>
    </header>
  );
}
