import React, { useState, useEffect } from 'react';
import { ArrowUpIcon, InstagramIcon } from './icons';

const Footer: React.FC = () => {
    const [isScrollButtonVisible, setScrollButtonVisible] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset > 300) {
            setScrollButtonVisible(true);
        } else {
            setScrollButtonVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <footer className="bg-black text-gray-400 py-12 px-4 sm:px-8 border-t border-gray-800">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Copyright */}
                        <div className="text-center md:text-left">
                            <p className="text-sm">&copy; 2025 Medina Tech Imports - Todos os direitos reservados.</p>
                        </div>
                         {/* Social Links */}
                        <div className="flex items-center space-x-4">
                            <a 
                                href="https://www.instagram.com/medina.techimports/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-gray-400 hover:text-[#00FF3B] transition-colors"
                                aria-label="Siga-nos no Instagram"
                            >
                                <InstagramIcon className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Scroll to Top Button */}
            {isScrollButtonVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-5 right-5 bg-gray-700 hover:bg-[#00FF3B] text-white hover:text-black p-3 rounded-full shadow-lg transition-all duration-300 z-50"
                    aria-label="Voltar ao topo"
                >
                    <ArrowUpIcon className="w-6 h-6" />
                </button>
            )}
        </>
    );
};

export default Footer;