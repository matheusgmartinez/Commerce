// app/orders/page.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getOrders() {
  const orders = await prisma.order.findMany({
    include: {
      products: {
        include: {
          order: false, // Não precisamos incluir a ordem aqui
        },
      },
      shippingData: true,
    },
  });
  return orders;
}

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <h1>Meus Pedidos</h1>
      {orders.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID do Pedido</th>
              <th>Nome do Produto</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Endereço</th>
              <th>CEP</th>
              <th>Método de Pagamento</th>
              <th>Data do Pedido</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const orderRow = (
                <tr key={order.id}>
                  <td rowSpan={order.products.length}>{order.id}</td>
                  <td>{order.products[0].productName}</td> {/* Aqui você pode buscar o produto usando productId */}
                  <td>{order.products[0].quantity}</td>
                  <td>R$ {order.products[0].price.toFixed(2)}</td>
                  <td>{order.shippingData.address}</td>
                  <td>{order.shippingData.postalCode}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              );

              const productRows = order.products.slice(1).map((productOrder) => (
                <tr key={`${order.id}-${productOrder.id}`}>
                  <td>{productOrder.productName}</td>
                  <td>{productOrder.quantity}</td>
                  <td>R$ {productOrder.price.toFixed(2)}</td>
                  <td colSpan={5}></td> {/* Deixa as colunas do pedido vazias para não repetir */}
                </tr>
              ));

              return (
                <>
                  {orderRow}
                  {productRows}
                </>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
