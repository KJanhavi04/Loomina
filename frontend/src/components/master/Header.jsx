import React from 'react';
import '../../css/master/header.css';

const Header = () => {
  return (
    <header className="header">
      <input type="text" className="search" placeholder="Search..." />
      <div className="profile">
        <img src="profile-pic-url" alt="Profile" className="profile-pic" />
        <span className="username">Tom Cook</span>
      </div>
    </header>
  );
};

export default Header;
