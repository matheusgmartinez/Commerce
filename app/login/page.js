//app/login/page.js

'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json(); // Agora, os dados do usuário estão na resposta
      const { user, token } = data; // Extraindo os dados do usuário e o token
      localStorage.setItem('user', JSON.stringify(user)); // Salvando os dados do usuário no localStorage
      localStorage.setItem('token', token); // Salvando o token no localStorage, se necessário
    
      // Disparando o evento de login
      window.dispatchEvent(new Event('userLoggedIn'));
    
      router.push('/'); // Redirecionando para a home
    } else {
      console.error('Erro ao fazer login');
    }    
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
