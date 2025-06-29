import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Product Store" },
    { name: "description", content: "Welcome to our Product Store!" },
  ];
}

export default function Home() {
  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1 className="product-list-title">Featured Products</h1>
        <p className="product-list-subtitle">
          Discover our carefully curated selection of premium products
        </p>
      </div>
      
      <div className="product-grid">
        {/* Sample product cards - replace with actual data */}
        <div className="product-card">
          <div className="product-card-image-container">
            <img 
              src="https://via.placeholder.com/300x300" 
              alt="Product 1" 
              className="product-card-image"
            />
            <div className="product-card-badge">New</div>
          </div>
          <div className="product-card-content">
            <div className="product-card-category">Electronics</div>
            <h3 className="product-card-title">Premium Headphones</h3>
            <p className="product-card-description">
              High-quality wireless headphones with noise cancellation
            </p>
            <div className="product-card-price-container">
              <span className="product-card-price">$199.99</span>
              <div className="product-card-rating">
                <span className="product-card-stars">★★★★★</span>
                <span className="product-card-rating-count">(124)</span>
              </div>
            </div>
            <div className="product-card-actions">
              <button className="product-card-btn-primary">Add to Cart</button>
              <button className="product-card-btn-secondary">♡</button>
            </div>
          </div>
        </div>

        <div className="product-card">
          <div className="product-card-image-container">
            <img 
              src="https://via.placeholder.com/300x300" 
              alt="Product 2" 
              className="product-card-image"
            />
            <div className="product-card-sale-badge">-20%</div>
          </div>
          <div className="product-card-content">
            <div className="product-card-category">Fashion</div>
            <h3 className="product-card-title">Designer T-Shirt</h3>
            <p className="product-card-description">
              Comfortable cotton t-shirt with modern design
            </p>
            <div className="product-card-price-container">
              <span className="product-card-price">$39.99</span>
              <span className="product-card-original-price">$49.99</span>
              <div className="product-card-rating">
                <span className="product-card-stars">★★★★☆</span>
                <span className="product-card-rating-count">(89)</span>
              </div>
            </div>
            <div className="product-card-actions">
              <button className="product-card-btn-primary">Add to Cart</button>
              <button className="product-card-btn-secondary">♡</button>
            </div>
          </div>
        </div>

        <div className="product-card">
          <div className="product-card-image-container">
            <img 
              src="https://via.placeholder.com/300x300" 
              alt="Product 3" 
              className="product-card-image"
            />
          </div>
          <div className="product-card-content">
            <div className="product-card-category">Home & Garden</div>
            <h3 className="product-card-title">Smart Plant Sensor</h3>
            <p className="product-card-description">
              Monitor your plants' health with this smart sensor
            </p>
            <div className="product-card-price-container">
              <span className="product-card-price">$29.99</span>
              <div className="product-card-rating">
                <span className="product-card-stars">★★★★★</span>
                <span className="product-card-rating-count">(67)</span>
              </div>
            </div>
            <div className="product-card-actions">
              <button className="product-card-btn-primary">Add to Cart</button>
              <button className="product-card-btn-secondary">♡</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
