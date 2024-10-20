import React from "react";
import { FaHeart, FaComment, FaBookmark, FaEllipsisH } from "react-icons/fa";
import "../../css/sparks/thread_struct.css";

const ThreadStruct = ({ title, profilePic, sparks, threaddImg }) => {
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
          src={threaddImg}
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
