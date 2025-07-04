import React, { useState } from 'react';
import useAddNewProduct from '~/app/hooks/api/useAddNewProduct';
import type { Card } from '~/components/product-card/types';
import ProductForm from '~/app/components/product-form';
import { ProductFormSchema } from '~/app/components/product-form/schema';
import { ZodError } from 'zod';

const AddProduct = (): React.ReactElement => {
  const [ formState, setFormState ] = useState<Card>({
    id: '',
    name: '',
    category: '',
    price: 0,
    rating: {
      rate: 0,
      count: 0
    },
    description: '',
    features: [],
    imageUrl: '',
    imageAlt: ''
  });
  const [ features, setFeatures ] = useState<string[]>([]);
  const [ errors, setErrors ] = useState<{[key: string]: string}>({})
  const { loading, addProduct } = useAddNewProduct();

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const finalData = {
      ...formState,
      features: features
    };

    try {
      const validatedData = ProductFormSchema.parse(finalData);
      const formData = new FormData();
    
      // Create a FormData object to handle file uploads
      Object.entries(validatedData).forEach(([key, value]) => {
        if (key === 'imageUrl' && value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((item, i) => formData.append(`${key}[${i}]`, item));
        } else {
          formData.append(key, String(value));
        }
      });
    
      await addProduct(formData);
      window.location.href = '/products';
      setErrors({});
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: typeof errors = {};
        error.errors.forEach(({ path, message }) => {
          const key = path[0] as string;
          fieldErrors[key] = message;
        });
        setErrors(fieldErrors);
      }
    }
  }

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = ev.target;

    if (name === 'imageUrl' && ev.target instanceof HTMLInputElement) {
      const file = ev.target.files?.[0];
      if (!file) return
      setFormState((prevData) => {
        return {
          ...prevData,
          [name]: file
        };
      });
      return;
    }

    if (name === 'price') {
      setFormState((prevData) => {
        return {
          ...prevData,
          [name]: parseFloat(value)
        }
      })

      return
    }

    setFormState((prevData) => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  const handleFeatures = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    const getIndex = Number(name.split('-')[1]);
    setFeatures((prevData) => {
      const updatedFeat = [...prevData];
      updatedFeat[getIndex] = value;
      return updatedFeat;
    });
  }

  return (
    <div className="add-product-container">
      <h1 className="add-product-title">Add New Product</h1>
      <ProductForm
        submit={handleSubmit}
        inputChange={handleInputChange}
        featuresChange={handleFeatures}
        errors={errors}
        buttonDisabled={loading}/>
    </div>
  );
};

export default AddProduct;