import React from "react";
import { FaHeart, FaComment, FaBookmark, FaEllipsisH } from "react-icons/fa";
import "../../css/sparks/thread_struct.css";

const ThreadStruct = ({ title, profilePic, sparks }) => {
  return (
    <div className="thread-container">
      {/* Header Section */}
      <div className="thread-header">
        <div
          className="profile-pic"
          style={{ backgroundImage: `url(${profilePic})` }}
        ></div>
        <span className="thread-title">{title}</span>
        <FaEllipsisH className="options-icon" />
      </div>

      {/* Horizontal Divider */}
      {/* <hr className="divider" /> */}

      {/* Image */}
      <div className="thread-image">
        <img
          src="https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8ODM1OTg3fHxlbnwwfHx8fHw%3D"
          alt="Spark"
        />
      </div>

      {/* Scrollable Sparks Section */}
      <div className="sparks-section">
        {sparks.map((spark, index) => (
          <div className="spark-card" key={index}>
            <div className="spark-content">
              <p>{spark}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Horizontal Divider */}
      <hr className="divider" />

      {/* Footer Icons Section */}
      <div className="thread-footer">
        <FaHeart className="footer-icon" />
        <FaComment className="footer-icon" />
        <FaBookmark className="footer-icon" />
      </div>
    </div>
  );
};

export default ThreadStruct;
