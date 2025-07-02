import http from 'http';
import { v4 as uuid } from 'uuid';
// add env variables for be and fe
import { addNewProduct, getProductById, getProducts } from './controllers/product.controller.js';


const PORT = process.env.PORT || 3000;
const PRODUCTS_URL = '/api/products';
// code is ass. investigate and fix it

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
    const newProduct = {
      id: uuid(),
      name: "test",
      description: "test desc",
      date: new Date()
    }

    addNewProduct(req, res, newProduct);
  }

  // const parsedURL = new URL(url, `http://${req.headers.host}`);
  // const pathname = parsedURL.pathname;

  // if (method === 'OPTIONS') {
  //   res.writeHead(204, {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  //     'Access-Control-Allow-Headers': 'Content-Type',
  //   });
  //   res.end();
  //   return;
  // }
  
  // if (method === 'GET' && url === '/api/products') {
  //   fs.readFile(DUMMY_DATA, 'utf8', (err, data) => {
  //     if (err) {
  //       res.writeHead(500, { 'Content-Type': 'application/json' });
  //       res.end(JSON.stringify({ error: 'Unable to read data' }));
  //       return;
  //     }
  //     res.writeHead(200, { 'Content-Type': 'application/json' });
  //     res.end(data)
  //   })
  //   return;
  // }

  // if (method === 'GET' && url.match(/^\/api\/products\/([0-9]+)/)) {
  //   const id = url.split('/').pop();
  //   getProductById(req, res, id)
    // getSingleProduct(id)
    //   .then(product => {
    //     res.writeHead(200, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify(product));
    //   })
    //   .catch(error => {
    //     res.writeHead(404, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify({ error: error.message }));
    //   });
  // }
  

  // if (method === 'POST' && pathname === '/data') {
  //   let body = '';
  
  //   req.on('data', (chunk) => {
  //     body += chunk;
  //   });

  
  //   req.on('end', () => {
  //     try {
  //       const newProduct = JSON.parse(body);
  
  //       fs.readFile(DUMMY_DATA, 'utf8', (err, data) => {
  //         if (err) {
  //           res.writeHead(500, { 'Content-Type': 'application/json' });
  //           res.end(JSON.stringify({ error: 'Internal Server Error' }));
  //           return;
  //         }
  
  //         const products = JSON.parse(data || '[]');
  //         products.push(newProduct);
  
  //         fs.writeFile(DUMMY_DATA, JSON.stringify(products, null, 2), (err) => {
  //           if (err) {
  //             res.writeHead(500, { 'Content-Type': 'application/json' });
  //             res.end(JSON.stringify({ error: 'Internal Server Error' }));
  //             return;
  //           }
  
  //           res.writeHead(201, { 'Content-Type': 'application/json' });
  //           res.end(JSON.stringify({ message: 'Product added successfully', product: newProduct }));
  //         });
  //       });
  //     } catch (error) {
  //       res.writeHead(400, { 'Content-Type': 'application/json' });
  //       res.end(JSON.stringify({ error: 'Invalid JSON' }));
  //     }
  //   });
  // }
})

server.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000');
});