
import { useState, useEffect } from 'react';
import productsData from '../products.json';

// src/types/product.ts
export interface Product {
  id: number;
  name: string;
  price: number | { [size: string]: number };
  image: string;
  images?: { [size: string]: string };
  description: string;
  category: string;
}

export interface CartProduct extends Product {
  quantity: number;
  selectedSize?: string;
}


export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 100);
  }, []);

  const categories = ["Todos", ...Array.from(new Set(products.map(product => product.category)))];

  return {
    products,
    categories,
    loading
  };
};
