import React from 'react'
import { Link } from 'react-router'
import './style.css'
import type { Card } from './types';

const ProductCard = ({
  name,
  category,
  price,
  image,
  description,
  rating
}: Card): React.ReactElement => {
  
  return (
    <Link
        to={`/products/${name.toLowerCase().replaceAll(" ", "-")}`}
        className="product-card">
        <div className="product-card-image-container">
            <img 
                src={image} 
                alt={name} 
                className="product-card-image"
            />
        </div>
        <div className="product-card-content">
            <div className="product-card-category">{category}</div>
            <h3 className="product-card-title">{name}</h3>
            <p className="product-card-description">{description}</p>
            <div className="product-card-price-container">
                <span className="product-card-price">${price.toFixed(2)}</span>
                { rating && (
                    <div className="product-card-rating">
                        <span className="product-card-stars">{"★".repeat(Math.floor(rating.rate))}{"☆".repeat(5 - Math.floor(rating.rate))}</span>
                        <span className="product-card-rating-count">({rating.count})</span>
                    </div>
                )}
            </div>
            <div className="product-card-actions">
                <button className="product-card-btn-primary">Add to Cart</button>
                <button className="product-card-btn-secondary">♡</button>
            </div>
        </div>
    </Link>
  )
}

export default ProductCard