import React from 'react';
import './style.css';

const About = (): React.ReactElement => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About Us</h1>
        <p className="about-text">
          Welcome to Shop.com! We are dedicated to providing you with the best shopping experience possible. 
          Our mission is to offer high-quality products at affordable prices, ensuring customer satisfaction 
          every step of the way. Thank you for choosing us as your trusted online store.
        </p>
        <p className="about-text">
          Feel free to explore our wide range of products and reach out to us if you have any questions. 
          We are here to help!
        </p>
      </div>
    </div>
  );
};

export default About;