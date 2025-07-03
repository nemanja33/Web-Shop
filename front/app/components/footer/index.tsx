import React from 'react';

const Footer = (): React.ReactElement => {
  return (
    <footer className="footer-container">
      <p className="footer-copyright">
        © {new Date().getFullYear()} Shop.com. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;