import React, { useState } from 'react';
import type { Form } from './types';

const URL = "http://localhost:3000/data"

const AddProduct = (): React.ReactElement => {
  const [ formData, setFormData ] = useState<Form>({
    name: '',
    category: '',
    price: 0,
    description: '',
    rating: 0,
    variants: '',
    image: ''
  });
  const [ features, setFeatures ] = useState<string[]>([]);
  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    // add validation
    const data = {
      ...formData,
      features
    }

    const date = new Date();
    console.log(date.toLocaleTimeString('en-GB'));
    


    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });


      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      alert('product added')
    } catch (error) {
      console.log('Error submitting form:', error);
    }
  }

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = ev.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  const handleFeatures = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    const featureArray = value.split(',').map(feature => feature.trim());
    setFeatures(featureArray);
  }

  return (
    // add hint text to each input field
    // add validation to each input field
    <div className="add-product-container">
      <h1 className="add-product-title">Add New Product</h1>
      <form
        onSubmit={handleSubmit}
        method='post'
        className="add-product-form">
        <div>

          {/* Name */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                autoComplete="on"
                onChange={handleInputChange}/>
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category" className="form-label">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              className="form-input"
              onChange={handleInputChange}/>
          </div>

          {/* Price */}
          <div className="form-group">
            <label htmlFor="price" className="form-label">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              className="form-input" 
              onChange={handleInputChange}/>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea
              id="description"
              name="description"
              className="form-textarea"
              onChange={handleInputChange}
              ></textarea>
          </div>
        </div>
        <div>
          {/* Rating */}
          <div className="form-group">
            <label htmlFor="rating" className="form-label">Rating:</label>
            <input
              type="number"
              id="rating"
              name="rating"
              className="form-input"
              step="0.1"
              min="0"
              max="5" 
              onChange={handleInputChange}/>
          </div>

          {/* Features */}
          <div className="form-group">
            <label htmlFor="features" className="form-label">Features (comma-separated):</label>
            <input
              type="text"
              id="features"
              name="features"
              className="form-input" 
              onChange={handleFeatures}/>
          </div>

          {/* really in JSON format? maybe add input fields with a button to add more */}
          {/* Variants */}
          <div className="form-group">
            <label htmlFor="variants" className="form-label">Variants (JSON format):</label>
            <textarea
              id="variants"
              name="variants"
              className="form-textarea"
              onChange={handleInputChange}
              ></textarea>
          </div>
          <button className="form-submit-button">Add Product</button>
        </div>

        {/* Image */}
        {/* upload image and save it how?? */}
        {/* <div className="form-group">
          <label htmlFor="image" className="form-label">Image URL:</label>
          <input
            type="url"
            id="image"
            name="image"
            className="form-input" 
            onChange={handleInputChange}/>
        </div> */}

      </form>
    </div>
  );
};

export default AddProduct;