//app/api/auth/login/route.js

import { compare } from 'bcryptjs';
import prisma from '../../../../prisma/prisma';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: 'Usuário não encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ message: 'Senha incorreta' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Gera o token JWT
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    

    return new Response(
      JSON.stringify({
        message: 'Login bem-sucedido',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Erro ao fazer login:', error); // Loga o erro no console do servidor
    return new Response(JSON.stringify({ message: 'Erro no servidor', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
