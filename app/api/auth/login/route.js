import { compare } from 'bcryptjs';
import prisma from '../../../../lib/prisma';
import { sign } from 'jsonwebtoken';

export async function POST(req) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

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

  const token = sign({ id: user.id, email: user.email }, 'seu-segredo', { expiresIn: '1h' });

  return new Response(JSON.stringify({ message: 'Login bem-sucedido', token }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
