import React, { useEffect, useState } from 'react';
import '../../css/main/user.css';
import { MdOutlineCreate, MdCreate } from "react-icons/md"; // Icons for edit
import MasterPage from '../../components/master/Master';

const ProfilePage = () => {
  const [profilePic, setProfilePic] = useState(null); // Handle profile picture upload
  const [user, setUser] = useState({ username: "", email: "", password: "", userProfileImage: "" });
  const [isEditing, setIsEditing] = useState({
    username: false,
    email: false,
    password: false,
  });

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/user/user", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setUser({
            username: data.username,
            email: data.email,
            password: "******", // Do not show actual password
            userProfileImage: data.userProfileImage, // Fetch the user's profile image URL or ObjectId
          });
          if (data.userProfileImage) {
            // Set the profile picture if available
            setProfilePic(`http://localhost:5000/user/user/profile-image/${data.userProfileImage}`); // Adjust the URL based on your backend route

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

  // Handle profile picture upload
  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file)); // Preview the selected image
    }

    const formData = new FormData();
    formData.append("userProfileImage", file); // Attach the image file

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/user/user/upload-profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Send the FormData object
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Image uploaded successfully: ", result);
        // After a successful upload, you might want to update the user state to reflect the new profile image
        setUser(prevUser => ({
          ...prevUser,
          userProfileImage: result.ImageId, // Update this according to your response structure
        }));
      } else {
        console.error("Error uploading image: ", result.message);
      }

    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // Handle field editing
  const handleEditClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] })); // Toggle editing
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <MasterPage>
      <div className="profile-container">
        {/* Profile Picture Section */}
        <div className="profile-picture-container">
          <div className="profile-picture">
            {profilePic ? <img src={profilePic} alt="Profile" /> : 'Profile picture'}
          </div>
          <label htmlFor="upload-button" className="upload-icon">
            +
            <input
              type="file"
              id="upload-button"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleProfilePicChange}
            />
          </label>
        </div>

        {/* Form Fields */}
        <form className="profile-form">
          {/* Name Field */}
          <div className="input-field">
            <label>Name</label>
            <input
              type="text"
              value={user.username}
              name="username"
              onChange={handleInputChange}
              disabled={!isEditing.username} // Disable input unless editing
              className={isEditing.username ? "editable" : ""} // Change input style if editable
            />
            <span className="edit-icon" onClick={() => handleEditClick("username")}>
              {isEditing.username ? <MdCreate /> : <MdOutlineCreate />}
            </span>
          </div>

          {/* Email Field */}
          <div className="input-field">
            <label>Email</label>
            <input
              type="email"
              value={user.email}
              name="email"
              onChange={handleInputChange}
              disabled={!isEditing.email} // Disable input unless editing
              className={isEditing.email ? "editable" : ""}
            />
            <span className="edit-icon" onClick={() => handleEditClick("email")}>
              {isEditing.email ? <MdCreate /> : <MdOutlineCreate />}
            </span>
          </div>

          {/* Password Field */}
          <div className="input-field">
            <label>Password</label>
            <input
              type="password"
              value={user.password}
              name="password"
              onChange={handleInputChange}
              disabled={!isEditing.password} // Disable input unless editing
              className={isEditing.password ? "editable" : ""}
            />
            <span className="edit-icon" onClick={() => handleEditClick("password")}>
              {isEditing.password ? <MdCreate /> : <MdOutlineCreate />}
            </span>
          </div>
        </form>

        {/* Reading List Section */}
        <div className="reading-list">
          <h3>Reading List</h3>
          {/* Add backend reading list integration if needed */}
        </div>
      </div>
    </MasterPage>
  );
};

export default ProfilePage;
