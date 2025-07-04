import { getAll, getById, addNew, updateItem, deleteItem, serveImages } from '../models/product.model.js';

export async function getProducts(_, res) {
  try {
    const products = await getAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.error('Error fetching products:', error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: 'Failed to fetch products' }));
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
    console.error('Error fetching products:', error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: `Failed to fetch product with id ${id}` }));
  }
}

export async function addNewProduct(_, res, product) {
  try {
    const newProduct = await addNew(product);

    if (!newProduct) {
      throw new Error('Invalid product data');
    }

    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify(product));

  } catch (error) {
    console.error('Error fetching products:', error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: 'Failed to add new product' }));
  }
}

export async function updateProduct(_, res, product) {  
  try {
    const updatedProduct = updateItem(product)
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify(updatedProduct));
  } catch (error) {
    console.error('Error fetching products:', error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: 'Failed to update product' }));
  }
}

export async function deleteProduct(_, res, product) {
  try {
    const deletedProduct = deleteItem(product);
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify(deletedProduct));
  } catch (error) {
    console.error('Error fetching products:', error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: 'Failed to delete product' }));
  }
}

export async function serveStaticImage(_, res, imageName) {
  try {
    const { mimeType, data } = serveImages(imageName);

    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  } catch (error) {
    console.error('Error serving static image:', error.message);

    if (!res.headersSent) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: 'Image not found' }));
    }
  }
}