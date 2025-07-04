import { useState } from 'react'
import type { Card } from '~/components/product-card/types';
const API_URL = import.meta.env.VITE_API_URL;

const useAddNewProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addProduct = async (newProduct: any) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL, {
        method: 'POST',
        body: newProduct,
      })

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product');
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    addProduct,
    loading,
    error
  }
}

export default useAddNewProduct