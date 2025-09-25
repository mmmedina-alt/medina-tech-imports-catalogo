import React, { useState, useEffect } from 'react';
import { WHATSAPP_NUMBER } from '../constants';
import type { Product, CartItem } from '../types';
import { ChevronDownIcon, MinusIcon, PlusIcon } from '../components/icons';
import { isVideo } from '../utils/mediaUtils';


interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-700">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-5 text-left text-white text-lg font-bold"
                aria-expanded={isOpen}
            >
                {title}
                <ChevronDownIcon className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <div className="py-5 text-gray-400">
                    {children}
                </div>
            </div>
        </div>
    );
};


interface ProductDetailPageProps {
    product: Product;
    onAddToCart: (product: Product, quantity: number) => void;
    onNavigate: (view: string) => void;
    cartItems: CartItem[];
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onAddToCart, onNavigate, cartItems }) => {
    const isUpcoming = product.status === 'upcoming';

    const whatsappPurchaseMessage = encodeURIComponent(`Olá, Medina Tech Imports! Gostaria de comprar o produto: *${product.name}*. Poderia me passar as informações para pagamento e envio?`);
    const whatsappInterestMessage = encodeURIComponent(`Olá, Medina Tech Imports! Tenho interesse no produto *${product.name}* que está para chegar. Gostaria de ser avisado(a) quando estiver disponível!`);
    
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${isUpcoming ? whatsappInterestMessage : whatsappPurchaseMessage}`;
    
    const [selectedImage, setSelectedImage] = useState(product.imageUrl);
    const [quantity, setQuantity] = useState(1);
    
    const allImages = [product.imageUrl, ...(product.galleryImages || [])];
    
    const itemInCart = cartItems.find(item => item.product.id === product.id);
    const quantityInCart = itemInCart ? itemInCart.quantity : 0;
    const remainingStock = product.stock - quantityInCart;

    const handleQuantityChange = (amount: number) => {
        setQuantity(prev => {
            const newQuantity = prev + amount;
            if (newQuantity < 1) return 1;
            if (newQuantity > remainingStock) return remainingStock;
            return newQuantity;
        });
    };

    useEffect(() => {
        if (remainingStock > 0 && !isUpcoming) {
            setQuantity(1);
        } else {
            setQuantity(0);
        }
    }, [remainingStock, isUpcoming]);
    
    useEffect(() => {
        setSelectedImage(product.imageUrl);
    }, [product.imageUrl]);


    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="container mx-auto py-12 px-4 sm:px-8 md:px-16">
                 <a onClick={() => onNavigate(isUpcoming ? 'upcoming' : 'catalog')} className="cursor-pointer inline-block text-[#00FF3B] font-semibold hover:underline mb-8">
                    &larr; Voltar para {isUpcoming ? 'Próximos Lançamentos' : 'Catálogo'}
                </a>
                <section id={product.id} className="py-8">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Image Gallery */}
                        <div className="flex flex-col items-center">
                            {isVideo(selectedImage) ? (
                                <video 
                                    src={selectedImage} 
                                    controls
                                    preload="metadata"
                                    className="rounded-lg shadow-2xl w-full max-w-md object-cover border-4 border-gray-800 mb-4"
                                />
                            ) : (
                                <img 
                                    src={selectedImage} 
                                    alt={product.name}
                                    className="rounded-lg shadow-2xl w-full max-w-md object-cover border-4 border-gray-800 mb-4"
                                />
                            )}
                             {allImages.length > 1 && (
                                <div className="flex flex-wrap justify-center gap-2">
                                    {allImages.map((img, index) => (
                                        <button 
                                            key={index} 
                                            onClick={() => setSelectedImage(img)}
                                            className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors duration-200 ${selectedImage === img ? 'border-[#00FF3B]' : 'border-gray-700 hover:border-gray-500'} relative`}
                                            aria-label={`Ver ${isVideo(img) ? 'vídeo' : 'imagem'} ${index + 1} de ${product.name}`}
                                        >
                                            {isVideo(img) ? (
                                                <>
                                                    <video src={img} className="w-full h-full object-cover" muted preload="metadata" />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M8 5v14l11-7z"/>
                                                        </svg>
                                                    </div>
                                                </>
                                            ) : (
                                                <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* Product Info */}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase mb-4">{product.name}</h1>
                            <p className="text-4xl font-bold text-[#00FF3B] mb-2">{product.price}</p>
                            
                            {isUpcoming && product.arrivalDate && (
                                 <p className="text-yellow-400 mb-6 font-semibold bg-yellow-900/50 border border-yellow-700 rounded-lg p-3 text-center">
                                    Previsão de chegada: {product.arrivalDate}
                                </p>
                            )}

                            {!isUpcoming && remainingStock > 0 && remainingStock <= 5 && (
                                <p className="text-yellow-400 mb-6 font-semibold">
                                    {remainingStock === 1 ? "Última unidade!" : `Apenas ${remainingStock} em estoque!`}
                                </p>
                            )}
                            {!isUpcoming && remainingStock === 0 && (
                                <p className="text-red-500 mb-6 font-bold">Esgotado!</p>
                            )}
                            
                             {/* Quantity Selector */}
                            {!isUpcoming && (
                                <div className="flex items-center gap-4 mb-8">
                                    <label className="text-white font-bold">Quantidade:</label>
                                    <div className="flex items-center border border-gray-700 rounded-lg">
                                        <button onClick={() => handleQuantityChange(-1)} className="p-3 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled={quantity <= 1 || remainingStock === 0}><MinusIcon className="w-5 h-5"/></button>
                                        <span className="px-4 text-lg font-bold w-12 text-center">{quantity}</span>
                                        <button onClick={() => handleQuantityChange(1)} className="p-3 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled={quantity >= remainingStock}><PlusIcon className="w-5 h-5"/></button>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-8">
                                <button
                                    onClick={() => onAddToCart(product, quantity)}
                                    aria-label={`Adicionar ${product.name} ao carrinho`}
                                    className="inline-flex items-center justify-center text-lg bg-[#00FF3B] text-black font-bold py-4 px-10 rounded-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                                    disabled={isUpcoming || remainingStock === 0}
                                >
                                   {isUpcoming ? 'Disponível em Breve' : (remainingStock > 0 ? 'Adicionar ao Carrinho' : 'Esgotado')}
                                </button>
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center text-lg bg-[#25D366] text-white font-bold py-4 px-10 rounded-lg hover:bg-[#128C7E] transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
                                >
                                    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.398 1.905 6.344l.229.352-1.232 4.493 4.625-1.211.352.215z"/></svg>
                                    {isUpcoming ? 'Tenho Interesse!' : 'Comprar via WhatsApp'}
                                </a>
                            </div>

                            {/* ======= BANDEIRAS DE PAGAMENTO ======= */}
                            <div className="mt-8 pt-6 border-t border-gray-700">
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Formas de Pagamento Seguras:</h3>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                                    <img src="https://loud.gg/cdn/shop/t/18/assets/pix.jpg?v=184355694222658424461750971697" alt="Pix" loading="lazy" className="h-7" />
                                    <img src="https://loud.gg/cdn/shop/t/18/assets/visa.jpg?v=102899432276122610211750971699" alt="Visa" loading="lazy" className="h-7" />
                                    <img src="https://loud.gg/cdn/shop/t/18/assets/mastercard.jpg?v=11542870444272966101750971696" alt="Mastercard" loading="lazy" className="h-7" />
                                </div>
                            </div>

                            {/* Accordion */}
                            <div className="space-y-2 mt-8">
                                <AccordionItem title="Descrição Completa">
                                    <p>{product.longDescription}</p>
                                </AccordionItem>
                                <AccordionItem title="Especificações Técnicas">
                                    <ul className="list-disc list-inside space-y-1">
                                        {product.specs.map((spec, i) => <li key={i}>{spec}</li>)}
                                    </ul>
                                </AccordionItem>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProductDetailPage;