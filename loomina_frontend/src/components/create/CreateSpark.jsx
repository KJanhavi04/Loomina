import React, { useState } from "react";
import "../../css/create/spark.css";
import { FaPlus, FaPen, FaBold, FaItalic, FaAlignLeft, FaListUl, FaStar, FaAlignJustify, FaAlignRight, FaUnderline } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { MdCancelPresentation } from "react-icons/md";

const CreateSpark = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [textareas, setTextareas] = useState([{ id: Date.now() }]); // Initial state with one textarea

  const handleInputClick = () => {
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const addTextarea = () => {
    setTextareas([...textareas, { id: Date.now() }]);
  };

  const removeTextarea = (id) => {
    setTextareas(textareas.filter(textarea => textarea.id !== id));
  };

  return (
    <div className="spark-container">
      {/* Header */}
      <div className="spark-header">
        {/* <img src="profile-photo-url" alt="Profile" className="spark-header-icon" /> Updated to profile photo icon */}
        <div className="profile">
        <img src="profile-pic-url" alt="Profile" className="profile-pic" />
      </div>
        <input
          type="text"
          placeholder="Thread Title"
          className={`spark-header-title ${isEditing ? 'editable' : ''}`}
          onClick={handleInputClick}
          onBlur={handleInputBlur}
          autoFocus={isEditing} // Focus input when editable
        />
        <BsThreeDots className="spark-header-icon" />
      </div>

      {/* Textareas */}
      <div className="spark-textarea-container">
        {textareas.map((textarea, index) => (
          <div key={textarea.id} className={`spark-textarea ${index > 0 ? 'threaded' : ''}`}>
            <textarea placeholder="Write your story here..." />
            <button
              className="spark-textarea-cancel"
              onClick={() => removeTextarea(textarea.id)}
            >
              <MdCancelPresentation />
            </button>
          </div>
        ))}
      </div>

      {/* Formatting and Add More */}
      <div className="spark-components">
        <div className="spark-formatting">
          <FaBold />
          <FaItalic />
          <FaUnderline />
          <FaAlignJustify />
          <FaAlignLeft />
          <FaAlignRight />
          <FaListUl />
          {/* Loomina logo */}
          <FaStar />
        </div>
        <button className="spark-add-more" onClick={addTextarea}>
          <FaPlus />
          Add More
        </button>
      </div>

      {/* Post Button */}
      <div className="spark-post">
        <button className="post-button">
          <FaPen />
          Post!
        </button>
      </div>
    </div>
  );
};

export default CreateSpark;
