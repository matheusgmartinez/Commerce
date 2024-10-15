'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importando useRouter

export default function CheckoutPage() {
    const [step, setStep] = useState(1); // Controla o estado da etapa
    const [shippingData, setShippingData] = useState({
        address: '',
        city: '',
        name: '',
        postalCode: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('');
    const [shippingCost, setShippingCost] = useState(0);

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalProductPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalPrice = totalProductPrice + shippingCost;

    const router = useRouter(); // Inicializando o useRouter

    // Funções para avançar e retroceder nas etapas
    const nextStep = () => {
        if (step === 1) {
            // Validação da primeira etapa
            if (!shippingData.name || !shippingData.address || !shippingData.postalCode) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
        } else if (step === 2) {
            // Validação da segunda etapa
            if (!paymentMethod) {
                alert('Por favor, selecione um método de pagamento.');
                return;
            }
        }
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    // Formulário de envio
    const handleShippingChange = (e) => {
        setShippingData({ ...shippingData, [e.target.name]: e.target.value });
    };

    // Renderização condicional para cada etapa
    return (
        <div>
            <h1>Checkout</h1>
            {step === 1 && (
                <div>
                    <h2>1. Escolha a forma de entrega</h2>
                    <form>
                        <label>
                            Nome:
                            <input type="text" name="name" value={shippingData.name} onChange={handleShippingChange} required />
                        </label>
                        <label>
                            CEP:
                            <input type="text" name="postalCode" value={shippingData.postalCode} onChange={handleShippingChange} required />
                        </label>
                        <label>
                            Endereço:
                            <input type="text" name="address" value={shippingData.address} onChange={handleShippingChange} required />
                        </label>
                    </form>
                    <button onClick={nextStep}>Próximo</button>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h2>2. Escolha como pagar</h2>
                    <label>
                        Selecione o frete:
                        <select onChange={(e) => setShippingCost(Number(e.target.value))} required>
                            <option value="0">Frete grátis</option>
                            <option value="10">Frete rápido - R$ 10,00</option>
                            <option value="20">Frete expresso - R$ 20,00</option>
                        </select>
                    </label>
                    <h3>Métodos de pagamento:</h3>
                    <label>
                        <input type="radio" name="payment" value="cartao" onChange={() => setPaymentMethod('Cartão de Crédito')} />
                        Cartão de Crédito
                    </label>
                    <label>
                        <input type="radio" name="payment" value="pix" onChange={() => setPaymentMethod('Pix')} />
                        Pix
                    </label>
                    <label>
                        <input type="radio" name="payment" value="boleto" onChange={() => setPaymentMethod('Boleto')} />
                        Boleto
                    </label>
                    <div>
                        <button onClick={prevStep}>Voltar</button>
                        <button onClick={nextStep}>Próximo</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div>
                    <h2>3. Confirme a sua compra</h2>
                    <h3>Resumo do pedido:</h3>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id}>
                                {item.name} - R$ {item.price} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <p>Total dos produtos: R$ {totalProductPrice.toFixed(2)}</p>
                    <p>Frete: R$ {shippingCost.toFixed(2)}</p>
                    <p>Preço total: R$ {totalPrice.toFixed(2)}</p>
                    <p>Método de pagamento: {paymentMethod}</p>
                    <div>
                        <button onClick={prevStep}>Voltar</button>
                        <button onClick={async () => {
                            const orderData = {
                                products: cartItems.map(item => ({
                                    id: item.id,
                                    quantity: item.quantity,
                                    price: item.price,
                                })),
                                shippingData: {
                                    name: shippingData.name,
                                    address: shippingData.address,
                                    postalCode: shippingData.postalCode,
                                    city: shippingData.city,
                                },
                                paymentMethod,
                            };

                            const response = await fetch('/api/order', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(orderData),
                            });

                            if (response.ok) {
                                const order = await response.json();
                                alert(`Compra realizada com sucesso! ID do pedido: ${order.id}`);
                                localStorage.removeItem('cart'); // Limpa o carrinho
                                router.push('/'); // Redireciona para a homepage
                            } else {
                                const errorResponse = await response.text(); // Pega a resposta de erro
                                alert('Erro ao confirmar a compra. Tente novamente.');
                            }
                        }}>Confirmar compra</button>
                    </div>
                </div>
            )}
        </div>
    );
}
