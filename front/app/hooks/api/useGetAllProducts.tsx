import { useState } from 'react'
import type { Card } from '~/components/product-card/types';

const API_URL = import.meta.env.VITE_API_URL;

interface IProducts {
  products: Card[];
  loading: boolean;
  error: string | null;
  getAll: () => Promise<Card[]>;
}

const useGetAllProducts = (): IProducts => {
  const [products, setProducts] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getAll = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } 
      const data = await response.json();
      setProducts(data)
      setError(null);
      return data
    } catch (error) {
      console.error('Failed to fetch products', error);
      setError('Failed to fetch products');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    products,
    loading,
    getAll
  }
}

export default useGetAllProducts