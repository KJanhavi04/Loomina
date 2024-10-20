import React from "react";
import { FaHeart, FaComment, FaBookmark, FaEllipsisH } from "react-icons/fa"; // Import necessary icons
import "../../css/sparks/spark_struct.css"; // Import the CSS file

const SparkStruct = ({
  profilePic,
  title,
  content,
  likes,
  comments,
  bookmarks,
  onClick, // Add onClick prop
}) => {
  return (
    <div className="spark-container" onClick={onClick}>
      {/* Header Section */}
      <div className="spark-header">
        <div className="profile-pic">
          <img src={profilePic} alt="Profile" className="profile-img" />
        </div>
        <span className="spark-title">{title}</span>
        <FaEllipsisH className="options-icon" />
      </div>

      {/* Content Section with Image and Text */}
      <div className="spark-content-container">
        {/* Image on the Left */}
        <div className="spark-image">
          <img
            src="https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8ODM1OTg3fHxlbnwwfHx8fHw%3D"
            alt="Spark"
          />
        </div>

        {/* Text Content on the Right */}
        <div className="spark-card">
          <div className="spark-content">
            <p>{content}</p>
          </div>
        </div>
      </div>

      {/* Horizontal Divider */}
      <hr className="divider" />

      {/* Footer Icons Section */}
      <div className="spark-footer">
        <div className="footer-item">
          <FaHeart className="footer-icon" />
          <span className="footer-count">{likes}</span>
        </div>
        <div className="footer-item">
          <FaComment className="footer-icon" />
          <span className="footer-count">{comments}</span>
        </div>
        <div className="footer-item">
          <FaBookmark className="footer-icon" />
          <span className="footer-count">{bookmarks}</span>
        </div>
      </div>
    </div>
  );
};

export default SparkStruct;
