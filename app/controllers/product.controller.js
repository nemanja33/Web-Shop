import { getAllProducts, getSingleProduct } from '../models/product.model.js';


export async function getProducts(req, res) {
  try {
    const products = await getAllProducts();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}


export async function getProductById(req, res, id) {
  try {
    const product = await getSingleProduct(id);

    if (!product) {
      throw new Error('Product not found');
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(product));
  } catch (error) {
    console.log(error);
  }
}