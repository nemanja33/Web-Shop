import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const Basket = (): React.ReactElement => {
  const [ price, setPrice ] = useState(0);
  // add basket items to local storage
  const items = [
    { id: 1, name: 'Product 1', price: 29.99, quantity: 1 },
    { id: 2, name: 'Product 2', price: 49.99, quantity: 1 },
    { id: 3, name: 'Product 3', price: 19.99, quantity: 3 },
  ]; // Example basket items

  useEffect(() => {
    setPrice(items.reduce((total, item) => total + item.price * item.quantity, 0));
  }, []);

  const handleRemoveItem = () => {
    // remove it from local storage
    console.log('Item removed');
  };

  const handleQuantityChange = (item: any) => {
    // ok, kako state da uradim? Redux?
  }

  return (
    <div className="basket-container">
      <h1 className="basket-title">Your Basket</h1>
      <table className="basket-table">
        <thead>
          <tr>
            <th className="basket-table-header">Item</th>
            <th className="basket-table-header">Price</th>
            <th className="basket-table-header">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="basket-table-row">
              <td className="basket-table-cell">
                <Link to={`/product/${item.name}`} className="basket-item-link">
                  {item.name}
                </Link>
              </td>
              <td className="basket-table-cell">${(item.price * item.quantity).toFixed(2)}</td>
              <td className="basket-table-cell">
                <input
                  type="number"
                  min="1"
                  defaultValue={item.quantity}
                  className="basket-quantity-input"
                  onChange={() => handleQuantityChange(item)}
                />
                <button className="basket-remove-button" type='button' onClick={handleRemoveItem}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="basket-total">
        <span>Total:</span>
        <span className="basket-total-price">${price.toFixed(2)}</span>
      </div>
      <p className="basket-checkout-button">Checkout</p>
    </div>
  );
};

export default Basket;