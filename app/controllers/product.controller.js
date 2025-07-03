import { getAll, getById, addNew } from '../models/product.model.js';
import path from "path";
import { fileURLToPath } from "url";
import fs from 'fs';

// Currently works with FS. Needs to work with a DB at some point
const PRODUCTS_FILE = '../products/products.json';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function getProducts(_, res) {
  try {
    const products = await getAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(_, res, id) {
  try {
    const product = await getById(id);

    if (!product) {
      throw new Error('Product not found');
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(product));
  } catch (error) {
    console.log(error);
  }
}

function saveProductToFile(product) {
  let tempProducts = [];
  try {
    fs.readFile(path.resolve(__dirname, PRODUCTS_FILE), 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
      const parsedData = JSON.parse(data)
      tempProducts = [...parsedData, product];
  
      fs.writeFile(path.resolve(__dirname, PRODUCTS_FILE), JSON.stringify(tempProducts), 'utf8', (err) => {
        if (err) {
          console.error('Error saving product:', err);
        }
      });
    });
  } catch (error) {
    console.error('Error adding product to file:', error);
    return;
  }
}

export async function addNewProduct(_, res, product) {
  try {
    const newProduct = await addNew(product);

    if (!newProduct) {
      throw new Error('Invalid product data');
    }

    saveProductToFile(newProduct)

    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify(product));

  } catch (error) {
    console.log(error);
  }
}

function updateProductInFile(product) {
  try {
    fs.readFile(path.resolve(__dirname, PRODUCTS_FILE), 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
      const parsedData = JSON.parse(data);
      const productIndex = parsedData.findIndex((p) => p.id === Number(product.id));
      if (productIndex === -1) {
        console.error('Product not found in file');
        return;
      }
      
      parsedData[productIndex] = product;
      fs.writeFile(path.resolve(__dirname, PRODUCTS_FILE), JSON.stringify(parsedData), 'utf8', (err) => {
        if (err) {
          console.error('Error updating product:', err);
        }
      });
    })
  } catch (error) {
    console.error('Error updating product:', error);
    return;
  }
}

export async function updateProduct(_, res, product) {  
  try {
    updateProductInFile(product)
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end({ message: 'Product updated successfully' });
  } catch (error) {
    console.log(error);
  }
}

function deleteProductInFile(id) {
  try {
    fs.readFile(path.resolve(__dirname, PRODUCTS_FILE), 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
      const parsedData = JSON.parse(data);
      const productIndex = parsedData.findIndex((p) => p.id === Number(id));
      if (productIndex === -1) {
        console.error('Product not found in file');
        return;
      }
      
      parsedData.splice(productIndex, 1);
      fs.writeFile(path.resolve(__dirname, PRODUCTS_FILE), JSON.stringify(parsedData), 'utf8', (err) => {
        if (err) {
          console.error('Error updating product:', err);
        }
      });
    })
  } catch (error) {
    console.error('Error updating product:', error);
    return;
  }
}


export async function deleteProduct(_, res, id) {
  try {
    deleteProductInFile(id)
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end({ message: 'Product deleted successfully' });
  } catch (error) {
    console.log(error);
  }
}