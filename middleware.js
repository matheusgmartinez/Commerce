import { NextResponse } from 'next/server';

export function middleware(req) {
  // Você pode adicionar aqui a lógica para redirecionar ou autenticar o usuário
  // Por exemplo, se o usuário não estiver autenticado, redirecione para a página de login
  const isAuthenticated = !!req.cookies.get('auth'); // Verifique se existe um cookie de autenticação

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}

// Define as rotas que o middleware deve ser aplicado
export const config = {
  matcher: ['/dashboard/:path*'], // Aplica o middleware apenas a rotas que começam com "/dashboard"
};
