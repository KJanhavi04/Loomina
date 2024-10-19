import React from "react";
import "../../css/sparks/trending.css"; // Import the CSS for this component
import { FaRegBookmark } from "react-icons/fa";

const Trending = ({ items }) => {
  return (
    <div className="trending-section">
      {items.map((item, index) => (
        <div key={index} className="trending-item">
          <div className="author-info">
            <img src={item.authorPic} alt="Author" className="author-pic" />
            <div className="author-details">
              <span className="author-name">{item.authorName}</span>
            </div>
          </div>
          <p className="spark-summary">
            {item.summary.length > 200
              ? item.summary.substring(0, 180) + "..."
              : item.summary}
            <span className="show-more"> Show more</span>
          </p>
          <div className="dots-icon">
            <span>
              <FaRegBookmark />
            </span>{" "}
            {/* Placeholder for dots icon */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Trending;
