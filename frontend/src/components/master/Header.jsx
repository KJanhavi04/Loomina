import React, { useState, useEffect } from "react";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import ExploreModal from '../modals/ExploreModal.jsx';
import "../../css/master/header.css";

const Header = () => {
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/user/user", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if(response.ok){
          setUsername(data.username);

          if(data.userProfileImage) {
            setProfilePic(`http://localhost:5000/user/user/profile-image/${data.userProfileImage}`);
          }
        } else {
          console.log("Failed to fetch user details:", data.message);
          alert("Failed to load user details. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        alert("An error occurred while fetching user details.");
      }
    };
    fetchUser();
  }, []);

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
        {profilePic ? (
          <img src={profilePic} alt="Profile" className="profile-pic" />
        ) : (
          <div className="profile-placeholder">No Image</div>
        )}
        <span className="username">{username || "Guest"}</span>

        {isLogoutVisible && (
          <div className="logout-container">
            <FaSignOutAlt className="logout-icon" />
            <span className="logout-text">Log Out</span>
          </div>
        )}
      </div>

      {/* Modal that opens on Enter key */}
      {isModalOpen && <ExploreModal closeModal={closeModal} />}
    </header>
  );
};

export default Header;
