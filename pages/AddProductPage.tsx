import React, { useState } from 'react';
import type { ProductFormData } from '../types';

interface AddProductPageProps {
    onAddProduct: (product: ProductFormData) => Promise<void>;
    onNavigate: (view: string) => void;
}

const AddProductPage: React.FC<AddProductPageProps> = ({ onAddProduct, onNavigate }) => {
    const [name, setName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [price, setPrice] = useState('');
    const [specs, setSpecs] = useState('');
    const [stock, setStock] = useState('1');
    const [arrivalDate, setArrivalDate] = useState('');
    
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    
    // States for image previews
    const [imageUrl, setImageUrl] = useState('');
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isGallery: boolean = false) => {
        if (e.target.files && e.target.files.length > 0) {
            if (isGallery) {
                const files = Array.from(e.target.files);
                setGalleryFiles(files);
                const objectUrls = files.map(file => URL.createObjectURL(file));
                setGalleryImages(objectUrls);
            } else {
                const file = e.target.files[0];
                setImageFile(file);
                const objectUrl = URL.createObjectURL(file);
                setImageUrl(objectUrl);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !price || !imageFile) {
            alert('Por favor, preencha pelo menos o Nome, Preço e Imagem Principal.');
            return;
        }
        
        setIsSubmitting(true);
        try {
            await onAddProduct({
                name,
                shortDescription,
                longDescription,
                price,
                specs: specs.split('\n').filter(s => s.trim() !== ''),
                stock: parseInt(stock, 10) || 0,
                arrivalDate: arrivalDate || undefined,
                imageFile,
                galleryFiles,
            });
        } catch (error) {
            console.error("A submissão falhou", error);
            // O alerta de erro já é mostrado na função principal em App.tsx
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass = "w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00FF3B] focus:border-[#00FF3B] transition-all disabled:opacity-50";
    const labelClass = "block text-white font-bold mb-2 uppercase text-sm tracking-wider";

    return (
        <div className="container mx-auto py-12 px-4 sm:px-8 md:px-16">
            <a onClick={() => onNavigate('home')} className="cursor-pointer inline-block text-[#00FF3B] font-semibold hover:underline mb-8">
                &larr; Voltar à Página Inicial
            </a>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-8 uppercase">Adicionar Novo Produto</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                <fieldset disabled={isSubmitting} className="space-y-8">
                    <div>
                        <label htmlFor="name" className={labelClass}>Nome do Produto</label>
                        <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} className={inputClass} required />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                        <div>
                            <label htmlFor="price" className={labelClass}>Preço (Ex: R$ 199,90)</label>
                            <input id="price" type="text" value={price} onChange={e => setPrice(e.target.value)} className={inputClass} required />
                        </div>
                        <div>
                            <label htmlFor="stock" className={labelClass}>Estoque</label>
                            <input id="stock" type="number" value={stock} onChange={e => setStock(e.target.value)} className={inputClass} required min="0" />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="shortDescription" className={labelClass}>Descrição Curta</label>
                        <input id="shortDescription" type="text" value={shortDescription} onChange={e => setShortDescription(e.target.value)} className={inputClass} />
                    </div>

                    <div>
                        <label htmlFor="longDescription" className={labelClass}>Descrição Longa</label>
                        <textarea id="longDescription" value={longDescription} onChange={e => setLongDescription(e.target.value)} className={`${inputClass} h-32`}></textarea>
                    </div>
                    
                    <div>
                        <label htmlFor="specs" className={labelClass}>Especificações (uma por linha)</label>
                        <textarea id="specs" value={specs} onChange={e => setSpecs(e.target.value)} className={`${inputClass} h-32`}></textarea>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                        <div>
                            <label htmlFor="imageUrl" className={labelClass}>Imagem Principal</label>
                            <input id="imageUrl" type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} className="text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#00FF3B] file:text-black hover:file:bg-opacity-80 disabled:opacity-50" required />
                            {imageUrl && <img src={imageUrl} alt="Preview" className="mt-4 rounded-lg w-48 h-48 object-cover border-2 border-gray-700" />}
                        </div>
                        <div>
                            <label htmlFor="galleryImages" className={labelClass}>Imagens da Galeria (até 5)</label>
                            <input id="galleryImages" type="file" accept="image/*" multiple onChange={(e) => handleImageUpload(e, true)} className="text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#00FF3B] file:text-black hover:file:bg-opacity-80 disabled:opacity-50" />
                            {galleryImages.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {galleryImages.map((src, i) => <img key={i} src={src} alt={`Gallery Preview ${i}`} className="rounded-lg w-24 h-24 object-cover border-2 border-gray-700" />)}
                                </div>
                            )}
                        </div>
                    </div>
                 </fieldset>

                <button 
                    type="submit" 
                    className="inline-block bg-[#00FF3B] text-black font-bold text-lg py-3 px-8 rounded-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Adicionando...' : 'Adicionar Produto'}
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;