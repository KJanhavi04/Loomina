import React, { useState } from "react";
import "../../css/create/spark.css";
import { FaPlus, FaStar,FaHeart, FaComment, FaBookmark   } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { MdCancelPresentation, MdStar } from "react-icons/md"; // Import the edit icon
import MasterPage from "../master/Master";

const CreateSpark = () => {
  const [textareas, setTextareas] = useState([{ id: Date.now(), posted: false }]); // Added 'posted' state
  const [currentIndex, setCurrentIndex] = useState(0); // To keep track of the current textarea

  const addTextarea = () => {
    if (textareas[currentIndex].posted) {
      setTextareas([...textareas, { id: Date.now(), posted: false }]);
      setCurrentIndex(textareas.length); // Update current index to the new textarea
    }
  };

  const postSpark = (id) => {
    setTextareas(textareas.map(textarea =>
      textarea.id === id ? { ...textarea, posted: true } : textarea
    ));
  };

  const handleTextareaChange = (index) => {
    setCurrentIndex(index); // Update the current index on textarea change
  };

  return (
    <MasterPage>
      <div className="sparks-container">
        {/* Header */}
        <div className="spark-header">
          <div className="profile">
            <img src="profile-pic-url" alt="Profile" className="profile-pic" />
          </div>
          <input
            type="text"
            placeholder="Thread Title"
            className="spark-header-title"
            disabled
          />
          <BsThreeDots className="spark-header-icon" />
        </div>

        {/* Textareas */}
        <div className="spark-textarea-container">
          {textareas.map((textarea, index) => (
            <div key={textarea.id} className={`spark-textarea ${index > 0 ? 'threaded' : ''} ${textarea.posted ? 'posted' : ''}`}>
              <textarea 
                placeholder="Write your story here..." 
                disabled={textarea.posted} 
                onFocus={() => handleTextareaChange(index)} // Set current index on focus
              />
              {textarea.posted ? (
                <MdStar className="spark-textarea-edit" />
              ) : (
                <button className="spark-textarea-cancel" onClick={() => setTextareas(textareas.filter(t => t.id !== textarea.id))}>
                  <MdCancelPresentation />
                </button>
              )}
              {!textarea.posted && (
                <button className="spark-post" onClick={() => postSpark(textarea.id)}>
                  <FaStar /> Post!
                </button>
              )}
              {textarea.posted && (
                <div className="spark-posted-sections">
                  <div className="spark-actions">
                    <span className="spark-action-icon"><FaHeart className="spark-icon" /> </span>
                    <span className="spark-action-icon"><FaComment className="spark-icon" /> </span>
                    <span className="spark-action-icon"><FaBookmark className="spark-icon" /> </span>
                    <span className="spark-action-icon"><PiDotsThreeOutlineFill className="spark-icon" /> </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add More Button */}
        <div className="spark-components">
          <button 
            className="spark-add-more" 
            onClick={addTextarea} 
            disabled={!textareas[currentIndex].posted} // Disable if current textarea is not posted
          >
            <FaPlus /> Add More
          </button>
        </div>
      </div>
    </MasterPage>
  );
};

export default CreateSpark;
