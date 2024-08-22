import React from 'react';
import '../../css/master/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h2>Build beautiful landing pages fast using Rareblocks Kit.</h2>
        </div>
        <div className="footer-right">
          <p><i className="fa fa-map-marker"></i> 8502 Preston Rd. Inglewood, Maine 98380, USA</p>
          <p><i className="fa fa-envelope"></i> support@rareblocks.xyz</p>
        </div>
      </div>
      <div className="footer-bottom">
        <ul className="footer-links">
          <li><a href="#">About</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">Works</a></li>
          <li><a href="#">Support</a></li>
        </ul>
        <p>&copy; Copyright 2021, All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
