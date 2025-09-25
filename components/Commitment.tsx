import React from 'react';
import { BoxIcon, MagnifyingGlassIcon, ShieldIcon } from './icons';

interface CommitmentCardProps {
    icon: React.ReactNode;
    title: string;
    text: string;
}

const CommitmentCard: React.FC<CommitmentCardProps> = ({ icon, title, text }) => (
    <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 text-center transform hover:-translate-y-2 transition-transform duration-300">
        <div className="mx-auto bg-[#00FF3B] text-black w-16 h-16 rounded-full flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-3 uppercase">{title}</h3>
        <p className="text-gray-400">{text}</p>
    </div>
);

const Commitment = () => {
    return (
        <section className="bg-black py-20 px-4 sm:px-8 md:px-16">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 uppercase">PERFORMANCE SEM COMPLICAÇÃO. A SUA ÚNICA TAREFA É JOGAR.</h2>
                <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">Nossa promessa é simples: os melhores periféricos, com a tranquilidade que você merece.</p>
                <div className="grid md:grid-cols-3 gap-8">
                    <CommitmentCard 
                        icon={<BoxIcon className="w-8 h-8"/>}
                        title="Estoque no Brasil"
                        text="Estoque 100% em território nacional. Isso significa que seu pedido é processado e enviado imediatamente, sem a incerteza e a demora de envios internacionais."
                    />
                    <CommitmentCard 
                        icon={<MagnifyingGlassIcon className="w-8 h-8"/>}
                        title="Curadoria especialista"
                        text="Validamos a performance e autenticidade de cada item. Só entra em nosso catálogo produtos novos, lacrados e que usaríamos em nossos próprios setups."
                    />
                    <CommitmentCard 
                        icon={<ShieldIcon className="w-8 h-8"/>}
                        title="Sem taxas surpresa"
                        text="O preço que você vê é o preço final. Sem preocupações com taxas de importação ou custos ocultos."
                    />
                </div>
            </div>
        </section>
    );
};

export default Commitment;