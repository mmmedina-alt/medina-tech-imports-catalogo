import React from 'react';
import Catalog from '../components/Catalog';
import type { Product } from '../types';

interface UpcomingPageProps {
  products: Product[];
  onNavigate: (view: string) => void;
}

const UpcomingPage: React.FC<UpcomingPageProps> = ({ products, onNavigate }) => {
  return (
    <div className="bg-gray-900 min-h-screen">
        <div className="container mx-auto py-12 px-4 sm:px-8 md:px-16">
            <a onClick={() => onNavigate('home')} className="cursor-pointer inline-block text-[#00FF3B] font-semibold hover:underline mb-8">
                &larr; Voltar à Página Inicial
            </a>
            <div className="mb-8 text-center sm:text-left border-b border-gray-700 pb-4">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase">Próximos Lançamentos</h1>
                <p className="text-lg text-gray-400 mt-2">Confira em primeira mão os periféricos que estão a caminho da Medina Tech Imports.</p>
            </div>
            <Catalog products={products} onNavigate={onNavigate} />
        </div>
    </div>
  );
};

export default UpcomingPage;