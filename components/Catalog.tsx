import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
    product: Product;
    onNavigate: (view: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden flex flex-col h-full group transition-all duration-300 hover:shadow-xl hover:border-[#00FF3B]">
        <div className="relative">
             {product.status === 'upcoming' && (
                <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold uppercase px-3 py-1 rounded-full z-10">
                    Em Breve
                </div>
            )}
            <img 
                src={product.imageUrl} 
                alt={product.name} 
                className={`w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ${product.status === 'upcoming' ? 'filter grayscale group-hover:grayscale-0' : ''}`}
            />
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-white uppercase mb-2">{product.name}</h3>
            <p className="text-gray-400 flex-grow mb-4">{product.shortDescription}</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-auto pt-4 border-t border-gray-700">
                <p className="text-2xl font-bold text-[#00FF3B] mb-4 sm:mb-0">{product.price}</p>
                <a 
                    onClick={() => onNavigate(product.id)}
                    className="cursor-pointer text-center bg-transparent text-[#00FF3B] border-2 border-[#00FF3B] font-semibold py-3 px-6 rounded-lg hover:bg-[#00FF3B] hover:text-black transition-colors duration-300 w-full sm:w-auto"
                >
                    {product.status === 'available' ? 'Ver Detalhes' : 'Saiba Mais'}
                </a>
            </div>
        </div>
    </div>
);


const Catalog = ({ products, onNavigate, searchQuery }: { products: Product[], onNavigate: (view: string) => void, searchQuery?: string }) => {
    const filteredProducts = products.filter(product => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase().trim();
        return (
            product.name.toLowerCase().includes(query) ||
            product.shortDescription.toLowerCase().includes(query) ||
            product.longDescription.toLowerCase().includes(query)
        );
    });

    return (
        <>
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-400 mb-2">Nenhum produto encontrado.</p>
                    <p className="text-gray-500">Tente buscar por outros termos.</p>
                </div>
            )}
        </>
    );
};

export default Catalog;