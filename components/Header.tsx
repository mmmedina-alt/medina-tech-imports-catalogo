import React from 'react';
import { CartIcon, MagnifyingGlassIcon } from './icons';

const Logo = ({ onNavigate }: { onNavigate: (view: string) => void }) => (
    <a onClick={() => onNavigate('home')} className="flex items-center space-x-2 cursor-pointer">
        <img src="https://i.ibb.co/1G6mLXk1/4654b70b-f406-4187-8345-236edbfc9fc6.png" alt="Medina Tech Imports Logo" className="w-10 h-10 rounded-full" />
        <span className="text-xl font-bold text-white hidden sm:inline-block">Medina Tech Imports</span>
    </a>
);


const Header = ({ cartCount, onNavigate, onSearchClick }: { cartCount: number, onNavigate: (view: string) => void, onSearchClick: () => void }) => {

    return (
        <header className="bg-gray-900/80 backdrop-blur-sm py-4 px-4 sm:px-8 md:px-16 sticky top-0 z-40 border-b border-gray-700">
            <div className="container mx-auto flex justify-between items-center">
                {/* Lado Esquerdo: Logo em desktop, botão em mobile */}
                <div className="hidden sm:block">
                    <Logo onNavigate={onNavigate} />
                </div>
                 <div className="sm:hidden flex items-center gap-2">
                    <a 
                        onClick={() => onNavigate('catalog')}
                        className="cursor-pointer inline-block bg-[#00FF3B] text-black font-bold py-2 px-3 rounded-lg hover:bg-opacity-80 transition-colors duration-300 text-xs"
                    >
                        Catálogo
                    </a>
                     <a 
                        onClick={() => onNavigate('upcoming')}
                        className="cursor-pointer inline-block bg-gray-700 text-white font-bold py-2 px-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 text-xs"
                    >
                        Em Breve
                    </a>
                </div>


                {/* Lado Direito */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                     <a 
                        onClick={() => onNavigate('upcoming')}
                        className="cursor-pointer hidden sm:inline-block text-gray-300 font-semibold hover:text-[#00FF3B] transition-colors duration-300"
                    >
                        Próximos Lançamentos
                    </a>
                    <a 
                        onClick={() => onNavigate('catalog')}
                        className="cursor-pointer hidden sm:inline-block bg-[#00FF3B] text-black font-bold py-2 px-4 sm:px-6 rounded-lg hover:bg-opacity-80 transition-colors duration-300 text-sm sm:text-base"
                    >
                        Ver Catálogo
                    </a>
                    <button onClick={onSearchClick} className="cursor-pointer p-1" aria-label="Buscar produtos">
                       <MagnifyingGlassIcon className="w-7 h-7 text-white hover:text-[#00FF3B] transition-colors duration-300" />
                    </button>
                    <a onClick={() => onNavigate('cart')} className="relative cursor-pointer" aria-label={`Carrinho com ${cartCount} itens`}>
                        <CartIcon className={`w-8 h-8 transition-colors duration-300 ${cartCount > 0 ? 'text-[#00FF3B]' : 'text-white'}`} />
                         {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-gray-900">
                                {cartCount}
                            </span>
                        )}
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;