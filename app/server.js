import http from 'http';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import { addNewProduct, deleteProduct, getProductById, getProducts, updateProduct } from './controllers/product.controller.js';

dotenv.config();

const PORT = process.env.PORT;
const API_URL = process.env.API_URL;
// fine by now to get by ID but I want to get by name
const URL_REGEX = new RegExp(`^${API_URL.replace(/\//g, '\\/')}/([0-9]+)$`);

// change all to TypeScript
// sa FE treba da dobijem
const newProduct = {
  id: uuid(),
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
    addNewProduct(req, res, newProduct);
  }

  if (
    method === 'PUT' &&
    url.match(URL_REGEX)
  ) {
    updateProduct(req, res, newProduct)
  }

  if (
    method === 'DELETE' &&
    url.match(URL_REGEX)
  ) {
    const id = url.split('/').pop();
    deleteProduct(req, res, id)
  }
})

server.listen(PORT, () => {
  console.log('Server is running');
});