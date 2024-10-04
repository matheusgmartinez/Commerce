import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany(); // Busca todos os produtos
    const uniqueCategories = [...new Set(products.map(product => product.category))]; // Extrai categorias únicas
    return NextResponse.json(uniqueCategories); // Retorna as categorias como JSON
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return NextResponse.error(new Error('Erro ao buscar categorias')); // Retorna erro
  }
}
