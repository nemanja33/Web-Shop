import products from "../products/products.json" with { type: "json" }

export function getAll() {
  return new Promise((resolve, reject) => {
    if (!products || !products.length) {
      reject(new Error('No items found'));
      return;
    }
    resolve(products);
  });
}

export function getById(id) {
  return new Promise((resolve, reject) => {
    const item = products.splice(id, 1);
    
    if (!item) {
      reject(new Error('Item not found'));
      return;
    }

    resolve(item);
  })
}

export function addNew(newItem) {
  return new Promise((resolve, reject) => {
    if (!newItem) {
      reject(new Error('Invalid data'));
      return;
    }
    resolve(newItem);
  })
}

export function findById(id) {
  return new Promise((resolve, reject) => {
    const item = products.find(p => p.id === Number(id))
    
    if (!item) {
      reject(new Error('Product not found'));
      return;
    }
    resolve(item);
  })
}
