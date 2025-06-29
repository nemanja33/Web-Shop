import React from 'react'
import { useParams } from 'react-router'

const Product = () => {
  const { pid } = useParams()
  
  return (
    <div className="product-item-container">
      {/* This is the main product page content */}
      <div className="product-item-breadcrumb">
        <a href="/products" className="product-item-breadcrumb-link">Products</a>
        <span className="product-item-breadcrumb-separator">/</span>
        <span>Product {pid}</span>
      </div>
      
      <div className="product-item-layout">
        <div className="product-gallery">
          <div className="product-gallery-main">
            <img 
              src="https://via.placeholder.com/600x600" 
              alt="Product" 
              className="product-gallery-main-image"
            />
          </div>
        </div>
        
        <div className="product-info">
          <div className="product-info-category">Electronics</div>
          <h1 className="product-info-title">Sample Product {pid}</h1>
          <div className="product-info-price-container">
            <span className="product-info-price">$199.99</span>
          </div>
          <p className="product-info-description">
            This is a sample product description for product {pid}.
          </p>
          
          <div className="product-actions">
            <div className="product-actions-buttons">
              <button className="product-btn-add-cart">Add to Cart</button>
              <a href={`/products/${pid}/edit`} className="product-btn-buy-now">Edit Product</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product