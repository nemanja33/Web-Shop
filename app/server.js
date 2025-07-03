import http from 'http';
import dotenv from 'dotenv';
import { addNewProduct, deleteProduct, getProductById, getProducts, updateProduct } from './controllers/product.controller.js';

dotenv.config();

const PORT = process.env.PORT;
const API_URL = process.env.API_URL;
// fine by now to get by ID but I want to get by name
const URL_REGEX = new RegExp(`^${API_URL.replace(/\//g, '\\/')}/([a-f0-9-]{36})$`);

// change all to TypeScript
// sa FE treba da dobijem

const productToUpdate = {
  id: 1,
  date: new Date(),
  name: "test",
  description: "test desc",
  category: "test category",
  price: 100,
  image: "http://localhost:5173/src/media/landscape-placeholder.svg",
  rating: {
    rate: 4.5,
    count: 10
  },
  features: ["test feature 1", "test feature 2"],
  variants: [
    {
      color: "red",
      stock: 10
    },
    {
      color: "blue",
      stock: 5
    }
  ]
}

const productToDelete = {
  id: 1,
  date: new Date(),
  name: "test",
  description: "test desc",
  category: "test category",
  price: 100,
  image: "http://localhost:5173/src/media/landscape-placeholder.svg",
  rating: {
    rate: 4.5,
    count: 10
  },
  features: ["test feature 1", "test feature 2"],
  variants: [
    {
      color: "red",
      stock: 10
    },
    {
      color: "blue",
      stock: 5
    }
  ]
}

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (
    method === 'GET' &&
    url === API_URL
  ) {
    getProducts(req, res)
  }



  if (
    method === 'GET' &&
    url.match(URL_REGEX)
  ) {
    const id = url.split('/').pop();
    
    getProductById(req, res, id)
  }

  if (
    method === 'POST' &&
    url === API_URL
  ) {
    let body = '';
  
    req.on('data', (chunk) => {
      body += chunk;
    });
  
    req.on('end', () => {
      try {
        const newProduct = JSON.parse(body);
        addNewProduct(req, res, newProduct);
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }
    });
  }

  if (
    method === 'PUT' &&
    url.match(URL_REGEX)
  ) {
    updateProduct(req, res, productToUpdate)
  }

  if (
    method === 'DELETE' &&
    url.match(URL_REGEX)
  ) {
    deleteProduct(req, res, productToDelete)
  }
})

server.listen(PORT, () => {
  console.log('Server is running');
});