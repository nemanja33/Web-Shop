import React from 'react';
import logo from '~/src/media/logo.png';
import basket from '~/src/media/basket.png';
import { Link } from 'react-router';

const Header = (): React.ReactElement => {
  const shoppingItems = 0; // Placeholder for shopping items count
  return (
    <header className="header-container">
      <div className="header-content">
        <Link
          to="/"
          className="header-logo">
          <img src={logo} alt="Logo" className="header-logo-image" />
        </Link>

        <nav className="header-nav">
          <ul className="header-nav-list">
            <li className="header-nav-item">
              <Link to="/" className="header-nav-link">
                Home
              </Link>
            </li>
            <li className="header-nav-item">
              <Link to="/products" className="header-nav-link">
                Products
              </Link>
            </li>
            <li className="header-nav-item">
              <Link to="/about" className="header-nav-link">
                About
              </Link>
            </li>
          </ul>
        </nav>

        <form className="header-search">
          <input
            type="text"
            placeholder="Search..."
            className="header-search-input"
            id='search'
            name='search'
          />
          <button className="header-search-button">Search</button>
        </form>

        <Link
          to="/basket"
          className="header-basket">
          <img
            src={basket}
            alt={`Shopping Basket with ${shoppingItems} items`}
            className="header-basket-image"
          />
          <span className="header-basket-count">{shoppingItems}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;