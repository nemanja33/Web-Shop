import React, { useEffect } from 'react'
import type { Card } from '~/components/product-card/types';

const API_URL = import.meta.env.VITE_API_URL;

const useGetSingleProduct = (id: number) => {
  const [product, setProduct] = React.useState<Card>();
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        console.log('Single Product Data:', data);
        
        setProduct(data[0])
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);


  return {
    product,
    loading
  }
}

export default useGetSingleProduct