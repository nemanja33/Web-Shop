import React, { useEffect } from 'react'
import type { Card } from '~/components/product-card/types';

const API_URL = import.meta.env.VITE_API_URL;

const useGetAllProducts = () => {
  const [products, setProducts] = React.useState<Card[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();
        setProducts(data)
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return {
    products,
    loading
  }
}

export default useGetAllProducts