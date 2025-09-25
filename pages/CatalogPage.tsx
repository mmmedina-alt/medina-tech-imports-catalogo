import React from 'react';
import Catalog from '../components/Catalog';
import type { Product } from '../types';

interface CatalogPageProps {
  products: Product[];
  onNavigate: (view: string) => void;
  searchQuery?: string;
}

const CatalogPage: React.FC<CatalogPageProps> = ({ products, onNavigate, searchQuery }) => {
  const availableProducts = products.filter(p => p.status === 'available');

  const pageTitle = !searchQuery ? 'CATÁLOGO DE PRODUTOS' : `Resultados para: "${searchQuery}"`;

  return (
    <div className="bg-gray-900 min-h-screen">
        <div className="container mx-auto py-12 px-4 sm:px-8 md:px-16">
            {!searchQuery && (
                 <a onClick={() => onNavigate('home')} className="cursor-pointer inline-block text-[#00FF3B] font-semibold hover:underline mb-8">
                    &larr; VOLTAR À PÁGINA INICIAL
                </a>
            )}
            <div className="mb-8 text-center sm:text-left border-b border-gray-700 pb-4">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase">{pageTitle}</h1>
            </div>
            <Catalog products={availableProducts} onNavigate={onNavigate} searchQuery={searchQuery} />
        </div>
    </div>
  );
};

export default CatalogPage;