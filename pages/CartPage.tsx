import React from 'react';
import type { CartItem } from '../types';
import { WHATSAPP_NUMBER } from '../constants';
import { TrashIcon } from '../components/icons';

interface CartPageProps {
  items: CartItem[];
  onNavigate: (view: string) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ items, onNavigate, onRemoveItem, onClearCart }) => {

  const parsePrice = (price: string): number => {
    return parseFloat(price.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  
  const totalPrice = items.reduce((total, item) => {
    const price = parsePrice(item.product.price);
    return total + (price * item.quantity);
  }, 0);


  const getWhatsAppLink = () => {
    const intro = "Olá, Medina Tech Imports!\n\nGostaria de finalizar a compra do meu carrinho. Segue o resumo do pedido:\n\n*Itens:*\n";
    
    const productDetails = items.map(item => {
      const eachLabel = item.quantity > 1 ? ' cada' : '';
      return `- ${item.quantity}x ${item.product.name} (${item.product.price}${eachLabel})`;
    }).join('\n');

    const totalString = `\n\n*Total do Pedido: ${formatCurrency(totalPrice)}*`;
    
    const outro = "\n\nPor favor, me informe os próximos passos para o pagamento.";

    const message = encodeURIComponent(intro + productDetails + totalString + outro);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  };

  return (
    <div className="bg-gray-900 min-h-screen">
        <div className="container mx-auto py-12 px-4 sm:px-8 md:px-16">
            <a onClick={() => onNavigate('catalog')} className="cursor-pointer inline-block text-[#00FF3B] font-semibold hover:underline mb-8">
                &larr; Voltar ao CATÁLOGO
            </a>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-8 border-b border-gray-700 pb-4 uppercase">
                Meu carrinho
            </h1>

            {items.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-400 mb-4">Seu carrinho está vazio.</p>
                    <a onClick={() => onNavigate('catalog')} className="cursor-pointer inline-block bg-[#00FF3B] text-black font-bold text-lg py-3 px-8 rounded-lg hover:bg-opacity-80 transition-colors duration-300">
                        Continuar comprando
                    </a>
                </div>
            ) : (
                <div>
                    <div className="space-y-6">
                        {items.map((item) => (
                            <div key={item.product.id} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg bg-gray-800">
                                <div className="flex items-center gap-4">
                                    <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-cover rounded-md" />
                                    <div>
                                        <h2 className="text-lg font-bold text-white uppercase">{item.product.name}</h2>
                                        <p className="text-gray-400">Quantidade: {item.quantity}</p>
                                        <p className="text-md text-[#00FF3B] font-semibold">{item.product.price}</p>
                                    </div>
                                </div>
                                <button
                                  onClick={() => onRemoveItem(item.product.id)}
                                  className="text-gray-500 hover:text-red-500 transition-colors p-2 rounded-full"
                                  aria-label={`Remover ${item.product.name}`}
                                >
                                  <TrashIcon className="w-6 h-6" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <button
                            onClick={onClearCart}
                            className="font-semibold text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2"
                        >
                            <TrashIcon className="w-5 h-5" />
                            Esvaziar carrinho
                        </button>
                         <a
                            href={getWhatsAppLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center text-lg bg-[#25D366] text-white font-bold py-4 px-10 rounded-lg hover:bg-[#128C7E] transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
                        >
                            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.398 1.905 6.344l.229.352-1.232 4.493 4.625-1.211.352.215z"/></svg>
                            Finalizar compra via WhatsApp
                        </a>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default CartPage;