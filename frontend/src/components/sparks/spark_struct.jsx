import React from 'react';
import { FaHeart, FaComment, FaBookmark, FaEllipsisH } from 'react-icons/fa'; // Import necessary icons
import '../../css/sparks/spark_struct.css'; // Import the CSS file
// import React from 'react';
// import { FaHeart, FaComment, FaBookmark, FaEllipsisH } from 'react-icons/fa';
// import './spark_struct.css';


const SparkStruct = () => {
    return (
      <div className="spark-container">
        {/* Header Section */}
        <div className="spark-header">
          <div className="profile-pic"></div>
          <span className="spark-title">Story Title</span>
          <FaEllipsisH className="options-icon" />
        </div>

          <div className="spark-card">
            <div className="spark-content">
              <p>
                "Once upon a time in a faraway land, there lived a young prince who longed to explore the world beyond his castle walls. He dreamed of discovering new places, meeting strange and wonderful people, and uncovering the mysteries that the kingdom had hidden for centuries. The prince loved to read old maps and listen to stories from travelers who passed by the kingdom's gates, feeding his curiosity about the world outside."
              </p>
            </div>
          </div>
          
        
  
        {/* Horizontal Divider */}
        <hr className="divider" />
  
        {/* Footer Icons Section */}
        <div className="spark-footer">
          <FaHeart className="footer-icon"  />
          <FaComment className="footer-icon" />
          <FaBookmark className="footer-icon" />
        </div>
      </div>
    );
  };
  
  export default SparkStruct;
