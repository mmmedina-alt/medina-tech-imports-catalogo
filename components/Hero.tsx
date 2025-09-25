import React from 'react';

const Hero = ({ onNavigate }: { onNavigate: (view: string) => void }) => {

  return (
    <section className="bg-gray-900 text-white py-20 px-4 sm:px-8 md:px-16">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight uppercase tracking-wide">
            Performance importada. <br /> Acesso imediato.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl mx-auto md:mx-0">
            A curadoria definitiva em periféricos de alta performance que você não encontra no Brasil. Com estoque local e a pronta entrega.
          </p>
          <a
            onClick={() => onNavigate('catalog')}
            className="cursor-pointer inline-block bg-[#00FF3B] text-black font-bold text-lg py-3 px-8 rounded-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105"
          >
            VER CATÁLOGO
          </a>
        </div>
        <div className="flex justify-center items-center">
            <div className="relative w-80 h-80 md:w-96 md:h-96">
                 <img
                    src="https://i.ibb.co/C5Y4fL0W/Generated-Image-September-15-2025-12-13-AM.webp"
                    alt="Mascote Medina Tech Imports - Guaxinim com armadura roxa"
                    className="rounded-full object-cover w-full h-full shadow-2xl border-8 border-gray-800"
                />
                <div className="absolute inset-0 rounded-full border-4 border-[#00FF3B] animate-pulse"></div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;