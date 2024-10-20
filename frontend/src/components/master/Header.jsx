import React, { useState } from "react";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import ExploreModal from '../modals/ExploreModal.jsx';
import "../../css/master/header.css";

const Header = () => {
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsLogoutVisible(true);
  };

  const handleMouseLeave = () => {
    setIsLogoutVisible(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsModalOpen(true); // Open modal on pressing Enter
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <header className="header">
      {/* Search Section */}
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search"
          placeholder="Search..."
          onKeyUp={handleSearchKeyPress}
        />
      </div>

      {/* Profile Section */}
      <div
        className="profile"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src="profile-pic-url" alt="Profile" className="profile-pic" />
        <span className="username">Janhavi Karpe</span>

        {isLogoutVisible && (
          <div className="logout-container">
            <FaSignOutAlt className="logout-icon" />
            <span className="logout-text">Log Out</span>
          </div>
        )}
      </div>

      {/* Modal that opens on Enter key */}
      {/* Render the modal component when isModalOpen is true */}
      {isModalOpen && <ExploreModal closeModal={closeModal} />}
    </header>
  );
};

export default Header;
