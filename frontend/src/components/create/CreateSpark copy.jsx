import React, { useState } from "react";
import "../../css/create/spark.css";
import { FaPlus, FaPen, FaBold, FaItalic, FaAlignLeft, FaListUl, FaStar, FaAlignJustify, FaAlignRight, FaUnderline } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { MdCancelPresentation, MdEdit } from "react-icons/md"; // Import the edit icon
import { FiMessageCircle } from "react-icons/fi"; // Comment icon
import { AiOutlineStar } from "react-icons/ai"; // Bookmark icon
import MasterPage from "../master/Master";

const CreateSpark = () => {
  const [textareas, setTextareas] = useState([{ id: Date.now(), posted: false }]); // Added 'posted' state

  const addTextarea = () => {
    setTextareas([...textareas, { id: Date.now(), posted: false }]);
  };

  const postSpark = (id) => {
    setTextareas(textareas.map(textarea =>
      textarea.id === id ? { ...textarea, posted: true } : textarea
    ));
  };

  return (
    <MasterPage>
      <div className="spark-container">
        {/* Header */}
        <div className="spark-header">
          <div className="profile">
            <img src="profile-pic-url" alt="Profile" className="profile-pic" />
          </div>
          <input
            type="text"
            placeholder="Thread Title"
            className="spark-header-title"
          />
          <BsThreeDots className="spark-header-icon" />
        </div>

        {/* Textareas */}
        <div className="spark-textarea-container">
          {textareas.map((textarea, index) => (
            <div key={textarea.id} className={`spark-textarea ${index > 0 ? 'threaded' : ''} ${textarea.posted ? 'posted' : ''}`}>
              <textarea placeholder="Write your story here..." disabled={textarea.posted} />
              {textarea.posted ? (
                <MdEdit className="spark-textarea-edit" />
              ) : (
                <button className="spark-textarea-cancel" onClick={() => setTextareas(textareas.filter(t => t.id !== textarea.id))}>
                  <MdCancelPresentation />
                </button>
              )}
              {!textarea.posted && (
                <button className="spark-post" onClick={() => postSpark(textarea.id)}>
                  <FaPen /> Post!
                </button>
              )}
              {textarea.posted && (
                <div className="spark-posted-sections">
                  <hr />
                  <div className="spark-actions">
                    <div className="spark-action-icon">
                      <FiMessageCircle /> <span>Comment</span>
                    </div>
                    <div className="spark-action-icon">
                      <AiOutlineStar /> <span>Bookmark</span>
                    </div>
                    <div className="spark-action-icon">
                      <span>Share</span> {/* You can replace this with a share icon if desired */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add More Button */}
        <div className="spark-components">
          <button className="spark-add-more" onClick={addTextarea}>
            <FaPlus /> Add More
          </button>
        </div>
      </div>
    </MasterPage>
  );
};

export default CreateSpark;
