import React, { useState } from 'react'

interface IForm {
  submit: (ev: React.FormEvent<HTMLFormElement>) => void;
  inputChange: (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  featuresChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: {
    [key: string]: string;
  };
  buttonDisabled?: boolean;
}

const ProductForm = ({
  submit,
  inputChange,
  featuresChange,
  errors,
  buttonDisabled = false
}: IForm): React.ReactElement => {
  const [numOfFeatures, setNumOfFeatures] = useState(1);

  const addNewFeature = (): void => {
    setNumOfFeatures(prev => prev + 1);
  }

  return (
    <form
      onSubmit={submit}
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
              placeholder='Name'
              onChange={inputChange}/>
          {errors?.name && <span className="form-error">{errors.name}</span>}
        </div>

        {/* Category */}
        {/* Needs to work as features */}
        <div className="form-group">
          <label htmlFor="category" className="form-label">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder='Category'
            className="form-input"
            onChange={inputChange}/>
          {errors?.category && <span className="form-error">{errors.category}</span>}
        </div>

        {/* Price */}
        <div className="form-group">
          <label htmlFor="price" className="form-label">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder='Price'
            className="form-input" 
            onChange={inputChange}/>
          {errors?.price && <span className="form-error">{errors.price}</span>}
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder='Description'
            className="form-textarea"
            onChange={inputChange}
            ></textarea>
          {errors?.description && <span className="form-error">{errors.description}</span>}
        </div>
      </div>
      <div>
        {/* Features */}
        <div className="form-group">
          {Array.from({ length: numOfFeatures }, (_, i) => (
            <div key={i} className="form-group">
              <label htmlFor={`feature-${i}`} className="form-label">Feature {i + 1}:</label>
              <input
                type="text"
                id={`feature-${i}`}
                name={`feature-${i}`}
                className="form-input"
                onChange={featuresChange}
                placeholder={`Feature ${i + 1}`}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addNewFeature}
            className="form-submit-button mt-3 text-xs">Add new feature</button>
          {errors?.features && <span className="form-error">{errors.features}</span>}
        </div>
        {/* Image */}
        {/* upload image and save it how?? */}
        <div className="form-group">
          <label htmlFor="imageUrl" className="form-label">Image</label>
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            onChange={inputChange}
            className="form-upload"/>
          {errors?.imageUrl && <span className="form-error">{errors.imageUrl}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="imageAlt" className="form-label">Image Alt</label>
          <input
            type="text"
            id="imageAlt"
            name="imageAlt"
            className="form-input"
            placeholder='Image Alt'
            onChange={inputChange}/>
          {errors?.imageAlt && <span className="form-error">{errors.imageAlt}</span>}
        </div>
        <button
          className="form-submit-button"
          disabled={buttonDisabled}>
          Add Product</button>
      </div>
    </form>
  )
}

export default ProductForm