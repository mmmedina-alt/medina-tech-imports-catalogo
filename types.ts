export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: string;
  imageUrl: string;
  galleryImages?: string[];
  specs: string[];
  stock: number;
  status: 'available' | 'upcoming';
  arrivalDate?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ProductFormData {
  name: string;
  shortDescription: string;
  longDescription: string;
  price: string;
  specs: string[];
  stock: number;
  imageFile: File;
  galleryFiles: File[];
  arrivalDate?: string;
}
