import React from 'react';
import { FaHeart, FaComment, FaBookmark, FaEllipsisH } from 'react-icons/fa'; // Import necessary icons
import '../../css/sparks/thread_struct.css'; // Import the CSS file
// import React from 'react';
// import { FaHeart, FaComment, FaBookmark, FaEllipsisH } from 'react-icons/fa';
// import './thread_struct.css';


const ThreadStruct = () => {
    return (
      <div className="thread-container">
        {/* Header Section */}
        <div className="thread-header">
          <div className="profile-pic"></div>
          <span className="thread-title">Story Title</span>
          <FaEllipsisH className="options-icon" />
        </div>
  
        {/* Horizontal Divider */}
        <hr className="divider" />
  
        {/* Scrollable Sparks Section */}
        <div className="sparks-section">
          <div className="spark-card">
            <div className="spark-content">
              <p>
                "Once upon a time in a faraway land, there lived a young prince who longed to explore the world beyond his castle walls. He dreamed of discovering new places, meeting strange and wonderful people, and uncovering the mysteries that the kingdom had hidden for centuries. The prince loved to read old maps and listen to stories from travelers who passed by the kingdom's gates, feeding his curiosity about the world outside."
              </p>
            </div>
          </div>
          <div className="spark-card">
            <div className="spark-content">
              <p>
                "One day, the prince ventured into the forbidden forest, where he encountered a wise old woman. She spoke of an ancient secret buried deep within the mountains—a treasure so powerful that it could change the fate of the kingdom forever. However, the journey to find this treasure was fraught with danger, and only those with the purest of hearts could claim it."
              </p>
            </div>
          </div>
          <div className="spark-card">
            <div className="spark-content">
              <p>
                "Determined to find this treasure, the prince set out on a journey, facing trials and tribulations at every turn. Along the way, he made new friends and enemies, learning valuable lessons about courage, loyalty, and the true meaning of power."
              </p>
            </div>
          </div>
          
        </div>
        
  
        {/* Horizontal Divider */}
        <hr className="divider" />
  
        {/* Footer Icons Section */}
        <div className="thread-footer">
          <FaHeart className="footer-icon"  />
          <FaComment className="footer-icon" />
          <FaBookmark className="footer-icon" />
        </div>
      </div>
    );
  };
  
  export default ThreadStruct;
