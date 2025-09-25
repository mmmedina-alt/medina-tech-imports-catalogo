import React from 'react';
import Hero from '../components/Hero';
import Commitment from '../components/Commitment';
import Catalog from '../components/Catalog';
import type { Product } from '../types';

interface HomePageProps {
  products: Product[];
  onNavigate: (view: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ products, onNavigate }) => {
  const availableProducts = products.filter(p => p.status === 'available');
  const upcomingProducts = products.filter(p => p.status === 'upcoming');

  return (
    <>
      <Hero onNavigate={onNavigate} />
      <section className="bg-gray-900 py-20 px-4 sm:px-8 md:px-16">
        <div className="container mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase">Acesso direto à performance</h2>
             <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
               Navegue pela nossa seleção curada de periféricos de elite, todos em estoque e prontos para elevar o seu setup.
             </p>
          </div>
          <Catalog products={availableProducts} onNavigate={onNavigate} />
        </div>
      </section>

      {upcomingProducts.length > 0 && (
        <section className="bg-black py-20 px-4 sm:px-8 md:px-16 border-t border-gray-800">
          <div className="container mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase">Próximos Lançamentos</h2>
               <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                 Fique de olho nas novidades que estão a caminho para a Medina Tech Imports. A performance do futuro, em breve aqui.
               </p>
            </div>
            {/* Mostra apenas os 3 primeiros como teaser */}
            <Catalog products={upcomingProducts.slice(0, 3)} onNavigate={onNavigate} />
          </div>
        </section>
      )}

      <Commitment />
    </>
  );
};

export default HomePage;