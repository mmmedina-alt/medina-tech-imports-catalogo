import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CatalogPage from './pages/CatalogPage';
import AddProductPage from './pages/AddProductPage';
import UpcomingPage from './pages/UpcomingPage';
import type { Product, CartItem, ProductFormData } from './types';
import AnnouncementBar from './components/AnnouncementBar';
import SearchOverlay from './components/SearchOverlay';

import { db, storage } from './firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


function App() {
  const [view, setView] = useState('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          // FIX: Add type assertion to fix "Spread types may only be created from object types" error.
          ...(doc.data() as Omit<Product, 'id'>)
        })) as Product[];
        setProducts(productsList);
      } catch (error) {
        console.error("Erro ao buscar produtos: ", error);
        alert("Falha ao carregar os produtos. Tente recarregar a página.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleNavigate = (targetView: string) => {
    if (view !== 'catalog' || targetView !== 'catalog') {
      setSearchQuery(''); 
    }
    setView(targetView);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    if (product.status === 'upcoming') {
        alert('Este produto ainda não está disponível para compra.');
        return;
    }

    const itemInCart = cartItems.find(item => item.product.id === product.id);
    const quantityInCart = itemInCart ? itemInCart.quantity : 0;
    const availableStock = product.stock - quantityInCart;

    if (quantity > availableStock) {
      alert(`Desculpe, temos apenas ${availableStock} unidade(s) de ${product.name} em estoque.`);
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
    alert(`${quantity}x ${product.name} foi adicionado ao carrinho!`);
  };
  
  const handleAddProduct = async (productData: ProductFormData) => {
    try {
      const imageRef = ref(storage, `products/${Date.now()}-${productData.imageFile.name}`);
      await uploadBytes(imageRef, productData.imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      const galleryImageUrls = await Promise.all(
        productData.galleryFiles.map(async (file) => {
          const galleryImageRef = ref(storage, `products/gallery/${Date.now()}-${file.name}`);
          await uploadBytes(galleryImageRef, file);
          return await getDownloadURL(galleryImageRef);
        })
      );

      const newProduct: Omit<Product, 'id'> = {
        name: productData.name,
        shortDescription: productData.shortDescription,
        longDescription: productData.longDescription,
        price: productData.price,
        specs: productData.specs,
        stock: productData.stock,
        imageUrl: imageUrl,
        galleryImages: galleryImageUrls,
        status: 'available',
        arrivalDate: productData.arrivalDate || undefined
      };

      const docRef = await addDoc(collection(db, "products"), newProduct);

      setProducts(prevProducts => [{ id: docRef.id, ...newProduct }, ...prevProducts]);
      
      alert(`${newProduct.name} foi adicionado ao catálogo com sucesso!`);
      handleNavigate('catalog');

    } catch (error) {
      console.error("Erro ao adicionar produto: ", error);
      alert("Ocorreu um erro ao adicionar o produto. Tente novamente.");
      throw error;
    }
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query && view !== 'catalog') {
      setView('catalog');
    }
  };
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const renderPage = () => {
    if (view === 'cart') {
      return <CartPage 
               items={cartItems} 
               onNavigate={handleNavigate} 
               onRemoveItem={handleRemoveItem}
               onClearCart={handleClearCart}
             />;
    }

    if (view === 'catalog') {
      const availableProducts = products.filter(p => p.status === 'available');
      return <CatalogPage products={availableProducts} onNavigate={handleNavigate} searchQuery={searchQuery} />;
    }
    
    if (view === 'addProduct') {
      return <AddProductPage onAddProduct={handleAddProduct} onNavigate={handleNavigate} />;
    }

    if (view === 'upcoming') {
        const upcomingProducts = products.filter(p => p.status === 'upcoming');
        return <UpcomingPage products={upcomingProducts} onNavigate={handleNavigate} />;
    }

    const product = products.find(p => p.id === view);
    if (product) {
      return <ProductDetailPage 
                product={product} 
                onAddToCart={handleAddToCart} 
                onNavigate={handleNavigate} 
                cartItems={cartItems}
             />;
    }

    return <HomePage products={products} onNavigate={handleNavigate} />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
            <svg className="animate-spin h-10 w-10 text-[#00FF3B] mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-xl font-semibold">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-gray-100">
      <AnnouncementBar />
      <Header 
        cartCount={cartCount} 
        onNavigate={handleNavigate} 
        onSearchClick={() => setIsSearchOpen(true)}
      />
      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
