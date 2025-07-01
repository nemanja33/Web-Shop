import React from 'react'
import { useParams } from 'react-router'
import products from '~/src/dummy-data.json'
import type { Card } from '~/app/components/product-card/types.ts';
import './style.css'

const Product = (): React.ReactElement => {
  const { name } = useParams()
  const product: Card = products.find((p: Card) => p.name.toLowerCase().replaceAll(" ", "-") === name)

  return (
    <div className="product-item-container">
      <div className="product-item-breadcrumb">
        <a href="/products" className="product-item-breadcrumb-link">Products</a>
        <span className="product-item-breadcrumb-separator">/</span>
        <span>Product {product.name}</span>
      </div>
      
      <div className="product-item-layout">
        <div className="product-gallery">
          <div className="product-gallery-main">
            <img 
              src={product.image} 
              alt="Product" 
              className="product-gallery-main-image"
            />
          </div>
        </div>
        
        <div className="product-info">
          <div className="product-info-category">{product.category}</div>
          <h1 className="product-info-title">{product.name}</h1>
          <div className="product-info-price-container">
            <span className="product-info-price">{product.price}</span>
          </div>
          <p className="product-info-description">
            {product.description}
          </p>
          
          <div className="product-actions">
            <div className="product-actions-buttons">
              <button className="product-btn-add-cart">Add to Cart</button>
              <a href={`/products/${product.name}/edit`} className="product-btn-buy-now">Edit Product</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product