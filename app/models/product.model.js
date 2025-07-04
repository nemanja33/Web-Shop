import path from "path";
import { fileURLToPath } from "url";
import fs from 'fs';
import { v4 as uuid } from 'uuid';

// Currently works with FS. Needs to work with a DB at some point
const PRODUCTS_FILE = '../products/products.json';
const IMAGES_FILE = '../products/images/';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __uploads = path.resolve(__dirname, IMAGES_FILE);

console.log(__uploads);


const getProducts = () => {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, PRODUCTS_FILE), 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading file:', err);
    return [];
  }
};

// GET ALL
export function getAll() {
  return new Promise((resolve, reject) => {
    const products = getProducts();
    
    if (!products) {
      reject(new Error('No products found'));
      return
    }
    resolve(products);
  });
}

// GET SINGLE
export function getById(id) {
  return new Promise((resolve, reject) => {
    const products = getProducts();
    const item = products.find(p => p.id === id);
    
    if (!item) {
      reject(new Error('Item not found'));
      return;
    }

    resolve(item);
  })
}

// POST
function saveProductToFile(product) {
  try {
    const products = getProducts();
    product.id = uuid();
    const tempProducts = [...products, product];
    fs.writeFile(path.resolve(__dirname, PRODUCTS_FILE), JSON.stringify(tempProducts), 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
    });
  } catch (error) {
    console.error('Error adding product to file:', error);
    return;
  }
}

export function addNew(newItem) {
  return new Promise((resolve, reject) => {
    if (!newItem) {
      reject(new Error('Invalid data'));
      return;
    }
    saveProductToFile(newItem);
    resolve(newItem);
  })
}

// UPDATE
function updateProductInFile(product) {
  try {
    const products = getProducts();
    
    const productIndex = products.findIndex((p) => p.id === product.id);
    if (productIndex === -1) {
      console.error('Product not found in file');
      return;
    }
    
    products[productIndex] = product;
    
    fs.writeFile(path.resolve(__dirname, PRODUCTS_FILE), JSON.stringify(products, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('Product updated successfully');
    });
  } catch (error) {
    console.error('Error adding product to file:', error);
    return;
  }
}

export function updateItem(product) {
  return new Promise((resolve, reject) => {
    if (!product) {
      reject(new Error('Product not found'));
      return;
    }

    updateProductInFile(product)
    resolve(product);
  })
}

// DELETE
function deleteProductInFile(product) {
  try {
    const products = getProducts();
    const productIndex = products.findIndex((p) => p.id === product.id);
    if (productIndex === -1) {
      console.error('Product not found in file');
      return;
    }

    products.splice(productIndex, 1);
    fs.writeFile(path.resolve(__dirname, PRODUCTS_FILE), JSON.stringify(products, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('Product deleted successfully');
    });
  } catch (error) {
    console.error('Error adding product to file:', error);
    return;
  }
}

export function deleteItem(product) {
  return new Promise((resolve, reject) => {
    if (!product) {
      reject(new Error('Product not found'));
      return;
    }

    deleteProductInFile(product)
    resolve(product);
  })
}

export function serveImages(url) {
  const imageName = url.split('/').pop();
  const imagePath = path.join(__uploads, imageName);

  if (!fs.existsSync(imagePath)) {
    throw new Error(`Image not found: ${imageName}`);
  }

  const ext = path.extname(imagePath).toLowerCase();
  const mimeType = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
  }[ext] || 'application/octet-stream';

  const data = fs.readFileSync(imagePath);
  
  return { mimeType, data };
}