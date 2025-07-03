import { useState } from 'react'
import type { Card } from '~/components/product-card/types';
const API_URL = import.meta.env.VITE_API_URL;

interface IProduct {
  product: Card;
  loading: boolean;
  error: string | null;
  getProduct: (id: number) => Promise<Card>;
}

const useGetSingleProduct = (): IProduct => {
  const [product, setProduct] = useState<Card>({} as Card);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getProduct = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      setProduct(data);
      setError(null);
      return data;
    } catch (error) {
      console.error('Failed to fetch products', error);
      setError('Failed to fetch products');
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    error,
    product,
    getProduct,
    loading
  }
}

export default useGetSingleProduct