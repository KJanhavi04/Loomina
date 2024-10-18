import React from "react";
import "../../css/modals/explore.css";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { BsChevronRight } from "react-icons/bs";
import ThreadStruct from "../sparks/thread_struct";
import SparkStruct from "../sparks/spark_struct";

const Explore = ({ closeModal }) => {
  return (
    <div className="explore-modal">
      
      <div className="modal-content">
        {/* Close Button */}
        <button className="close-btn" onClick={closeModal}>
          <IoClose />
        </button>

        {/* Search Bar */}
        

        <FaSearch className="search-icon-modal" />
        <input type="text" className="modal-search" placeholder="Search..." />

        {/* Category Buttons */}
        <div className="category-buttons">
          <button className="category-btn">Happy</button>
          <button className="category-btn">Sad</button>
          <button className="category-btn">Fantasy</button>
          <button className="category-btn">Depression</button>
          <button className="category-btn">More...</button>
        </div>

        {/* Content Sections */}
        <div className="content-section">
          {/* <div className="content-column"></div>
          <div className="content-column"></div>
          <div className="content-column"></div>
          <div className="content-column"></div> */}
          <SparkStruct></SparkStruct>
        </div>

       

        {/* Right Arrow */}
        <button className="next-btn">
          <BsChevronRight></BsChevronRight>
        </button>
      </div>
    </div>
  );
};

export default Explore;
