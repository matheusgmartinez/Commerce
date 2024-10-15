import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { products, shippingData, paymentMethod } = await req.json();

        // Buscar detalhes dos produtos para obter o nome
        const productDetails = await prisma.product.findMany({
            where: {
                id: { in: products.map(p => p.id) },
            },
        });

        const createdOrder = await prisma.$transaction(async (prisma) => {
            const order = await prisma.order.create({
                data: {
                    paymentMethod,
                    shippingData: {
                        create: shippingData,
                    },
                    products: {
                        create: products.map(product => {
                            const productDetail = productDetails.find(p => p.id === product.id); // Encontrar o detalhe do produto
                            return {
                                productId: product.id,
                                productName: productDetail?.name || '', // Pegar o nome do produto
                                quantity: product.quantity,
                                price: product.price,
                            };
                        }),
                    },
                },
            });

            for (const product of products) {
                await prisma.product.update({
                    where: { id: product.id },
                    data: {
                        quantity: {
                            decrement: product.quantity,
                        },
                    },
                });
            }

            return order; // Retornar o pedido criado
        });

        return new Response(JSON.stringify(createdOrder), { status: 201 });
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
