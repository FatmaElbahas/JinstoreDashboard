import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';

interface ProductFilters {
  keyword: string;
  categories: string[];
  priceRange: [number, number];
  colors: string[];
}

const PRODUCT_IMAGES = {
  orange: new URL('../assets/Images/orange.svg', import.meta.url).href,
  layes: new URL('../assets/Images/layes.svg', import.meta.url).href,
  scarmblar: new URL('../assets/Images/scarmblar.svg', import.meta.url).href,
  trotaills: new URL('../assets/Images/trotaills.svg', import.meta.url).href,
  pizza: new URL('../assets/Images/pizza.svg', import.meta.url).href,
  protein: new URL('../assets/Images/Protein.svg', import.meta.url).href,
};

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Simply Orange Pulp-Free Juice - 52 fl OZ', price: 499.90, oldPrice: 800, rating: 4, reviews: 25, image: PRODUCT_IMAGES.orange, category: 'beverages', color: 'orange' },
  { id: 2, name: "Lay's Classic Potato Snack Chips, Party Size! 13 oz Bag", price: 1190.90, rating: 4, reviews: 40, image: PRODUCT_IMAGES.layes, category: 'snacks', color: 'lime' },
  { id: 3, name: 'Oscar Mayer Ham & Swiss Melt Scrambles - Jar', price: 1599.00, rating: 5, reviews: 8, image: PRODUCT_IMAGES.scarmblar, category: 'food', color: 'pink' },
  { id: 4, name: 'Large Garden Spinach & Herb Wrap Tortillas - 15oz, 6ct', price: 10.00, rating: 4, reviews: 0, image: PRODUCT_IMAGES.trotaills, category: 'food', color: 'mint' },
  { id: 5, name: 'Great Value Rising Crust Pizza, Supreme', price: 30.00, rating: 4, reviews: 5, image: PRODUCT_IMAGES.pizza, category: 'food', color: 'green' },
  { id: 6, name: 'Real Plant Powered Protein Shake - Double Chocolate', price: 25.00, rating: 4, reviews: 8, image: PRODUCT_IMAGES.protein, category: 'beverages', color: 'blue' },
];

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  getNextId: () => number;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = 'jinstore_products';

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (savedProducts) {
      try {
        return JSON.parse(savedProducts);
      } catch {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const id = Math.max(...products.map(p => p.id), 0) + 1;
    const product: Product = {
      ...newProduct,
      id,
      rating: newProduct.rating || 4,
      reviews: newProduct.reviews || 0,
    };
    
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedProducts));
  };

  const updateProduct = (id: number, updatedProduct: Partial<Product>) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, ...updatedProduct } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id: number) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedProducts));
  };

  const getNextId = () => {
    return Math.max(...products.map(p => p.id), 0) + 1;
  };

  return (
    <ProductsContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getNextId
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
