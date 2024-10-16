//app/api/auth/register/route.js

import { hash } from 'bcryptjs';
import prisma from '../../../../prisma/prisma';

export async function POST(req) {
  const { name, email, password } = await req.json(); // Extraindo os dados do corpo da requisição

  if (!name || !email || !password) {
    return new Response(JSON.stringify({ message: 'Todos os campos são obrigatórios' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify({ message: 'Usuário registrado com sucesso', user }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Erro ao registrar usuário', error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
