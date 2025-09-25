import React, { useState, useEffect, useRef } from 'react';
import { XIcon } from './icons';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onSearch: (query: string) => void;
    searchQuery: string;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onSearch, searchQuery }) => {
    const [query, setQuery] = useState(searchQuery);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sincroniza o estado local do input com o estado global da busca
    useEffect(() => {
        setQuery(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            inputRef.current?.focus();
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        onSearch(newQuery);
    };

    // Apenas fecha a camada, não limpa a busca.
    const handleOverlayClose = () => {
        onClose();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleOverlayClose();
        }
    };
    
    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center p-4 sm:p-8"
            onClick={handleOverlayClose} // C. Clicar fora
            role="dialog"
            aria-modal="true"
        >
            <div 
                className="relative w-full max-w-2xl mt-24" 
                onClick={(e) => e.stopPropagation()} 
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown} // A. Pressionar Enter
                    placeholder="Buscar por teclado, mouse, headset..."
                    className="w-full bg-gray-800 text-white text-lg sm:text-2xl placeholder-gray-500 border-2 border-gray-700 rounded-lg py-4 px-6 focus:outline-none focus:ring-2 focus:ring-[#00FF3B] focus:border-[#00FF3B] transition-all"
                    aria-label="Campo de busca"
                />
                <button
                    onClick={handleOverlayClose} // B. Clicar no X
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                    aria-label="Fechar busca"
                >
                    <XIcon className="w-8 h-8" />
                </button>
            </div>
        </div>
    );
};

export default SearchOverlay;