import React from 'react';
import '../../css/master/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h2>Loomina✨- Weave your imagination with AI</h2>
        </div>
        <div className="footer-right">
          <p><i className="fa fa-map-marker"></i> VIT, mumbai chya pori!</p>
          <p><i className="fa fa-envelope"></i> shrujan@gmail.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <ul className="footer-links">
          <li><a href="#">About</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">Works</a></li>
          <li><a href="#">Support</a></li>
        </ul>
        <p>&copy; Copyright 2024, All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
