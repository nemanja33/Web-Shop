import http from 'http';
import { v4 as uuid } from 'uuid';
// add env variables for be and fe
import { addNewProduct, deleteProduct, getProductById, getProducts, updateProduct } from './controllers/product.controller.js';


const PORT = process.env.PORT || 3000;
const PRODUCTS_URL = '/api/products';
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
// code is ass. investigate and fix it
// change all to TypeScript

const server = http.createServer((req, res) => {
  const { method, url } = req;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (
    method === 'GET' &&
    url === PRODUCTS_URL
  ) {
    getProducts(req, res)
  }

  if (
    method === 'GET' &&
    url.match(/^\/api\/products\/([0-9]+)/)
  ) {
    const id = url.split('/').pop();
    getProductById(req, res, id)
  }
  
  if (
    method === 'POST' &&
    url === PRODUCTS_URL
  ) {
    addNewProduct(req, res, newProduct);
  }

  if (
    method === 'PUT' &&
    url.match(/^\/api\/products\/([0-9]+)/)
  ) {
    updateProduct(req, res, newProduct)
  }

  if (
    method === 'DELETE' &&
    url.match(/^\/api\/products\/([0-9]+)/)
  ) {
    const id = url.split('/').pop();
    deleteProduct(req, res, id)
  }
})

server.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000');
});