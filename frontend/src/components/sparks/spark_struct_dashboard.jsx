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
    <div className="spark-container" onClick={onClick}> {/* Attach onClick to the main container */}
      {/* Header Section */}
      <div className="spark-header">
        <div className="profile-pic">
          <img src={profilePic} alt="Profile" className="profile-img" />
        </div>
        <span className="spark-title">{title}</span>
        <FaEllipsisH className="options-icon" />
      </div>

      <div><img src="https://pixlr.com/images/generator/text-to-image.webp"></img></div>

      {/* Content Section */}
      <div className="spark-card">
        <div className="spark-content">
          <p>{content}</p>
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
