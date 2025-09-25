import React from 'react';
import { PRODUCTS, WHATSAPP_NUMBER } from '../constants';
import type { Product } from '../types';


interface ProductDetailSectionProps {
    product: Product;
    index: number;
    onAddToCart: () => void;
}

const ProductDetailSection: React.FC<ProductDetailSectionProps> = ({ product, index, onAddToCart }) => {
    const whatsappMessage = encodeURIComponent(`Olá! Tenho interesse no ${product.name}.`);
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
    
    const bgColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';

    return (
        <section id={product.id} className={`${bgColor} py-20 px-4 sm:px-8 md:px-16`}>
            <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center px-4">
                    <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="rounded-lg shadow-2xl w-full max-w-md object-cover"
                    />
                </div>
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4">{product.name}</h2>
                    <p className="text-gray-700 mb-6" style={{fontFamily: "'Roboto', sans-serif"}}>{product.longDescription}</p>
                    
                    <h3 className="text-xl font-bold text-[#333333] mb-3">Especificações Técnicas:</h3>
                    <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1" style={{fontFamily: "'Roboto', sans-serif"}}>
                        {product.specs.map((spec, i) => <li key={i}>{spec}</li>)}
                    </ul>

                    <p className="text-4xl font-bold text-[#8A2BE2] mb-8">{product.price}</p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center text-lg bg-[#25D366] text-white font-bold py-4 px-10 rounded-lg hover:bg-[#128C7E] transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
                        >
                            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.398 1.905 6.344l.229.352-1.232 4.493 4.625-1.211.352.215z"/></svg>
                            COMPRAR VIA WHATSAPP
                        </a>
                        <button
                            onClick={onAddToCart}
                            aria-label={`Adicionar ${product.name} ao carrinho`}
                            className="inline-flex items-center justify-center text-lg bg-[#333333] text-white font-bold py-4 px-10 rounded-lg hover:bg-[#555] transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
                        >
                           Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};


const ProductDetail = ({ onAddToCart }: { onAddToCart: () => void }) => {
    return (
        <>
            {PRODUCTS.map((product, index) => (
                <ProductDetailSection key={product.id} product={product} index={index} onAddToCart={onAddToCart} />
            ))}
        </>
    );
};

export default ProductDetail;