import products from "../products/products.json" with { type: "json" }

export function getAllProducts() {
  return new Promise((resolve, reject) => {
    if (!products || !products.length) {
      reject(new Error('No products found'));
      return;
    }
    resolve(products);
  });
}

export function getSingleProduct(id) {
  return new Promise((resolve, reject) => {
    const product = products.filter(p => p.id === Number(id));
    
    if (!product) {
      reject(new Error('Product not found'));
      return;
    }

    resolve(product);
  })
}

export function addProduct(newProduct) {
  return new Promise((resolve, reject) => {
    if (!newProduct) {
      reject(new Error('Invalid product data'));
      return;
    }
    products.push(newProduct);
    resolve(newProduct);
  })
}

export function updateProduct(product) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex(p => p.id === product.id)
    
    if (index === -1) {
      reject(new Error('Product not found'));
      return;
    }
    products[index] = product;
    resolve(product);
  })
}


export function deleteProduct(product) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex(p => p.id === product.id)
    
    if (index === -1) {
      reject(new Error('Product not found'));
      return;
    }

    products.filter(p => p.id !== index)
    resolve(product);
  })
}