import React, { use, useEffect } from 'react';
import { useParams } from 'react-router';
import useGetSingleProduct from '~/app/hooks/api/useGetSingleProduct';

const Product = (): React.ReactElement => {
  const { id } = useParams();
  const { product, loading, error, getProduct } = useGetSingleProduct();

  useEffect(() => {
    if (!product.id) {
      getProduct(id);
    }
  }, [id]);

  if (loading) {
    return <div className="product-item-loading">Loading...</div>;
  }

  if (error) {
    return <div className="product-item-error">Error: {error}</div>;
  }

  if (!product || !product.name) {
    return <div className="product-item-error">Product not found</div>;
  }

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
  );
};

export default Product;