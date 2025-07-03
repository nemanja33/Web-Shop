import React from 'react'
import ProductCard from '../product-card';
import products from "~/src/dummy-data.json";
import type { Card } from '~/app/components/product-card/types.ts';

const sortedByDate = products.sort((a: Card, b: Card) => {
  const dateA = new Date(a.date + ' ' + a.time);
  const dateB = new Date(b.date + ' ' + b.time);
  return dateB.getTime() - dateA.getTime();
});

const latestThree = sortedByDate.slice(0, 3);

const FeaturedProducts = (): React.ReactElement => {
  return (
    <div className="product-list-container">
      {/* <div className="product-list-header">
        <h1 className="product-list-title">Featured Products</h1>
        <p className="product-list-subtitle">
          Discover our carefully curated selection of premium products
        </p>
      </div>
      
      <div className="product-grid">
        {
          latestThree.map((product: Card) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))
        }
      </div> */}
    </div>
  )
}

export default FeaturedProducts