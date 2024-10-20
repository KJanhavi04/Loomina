import React, { useState } from "react";
import "../../css/master/Sidebar.css";
import CreateModal from "../modals/createModal";
import {
  FaHome,
  FaBookmark,
  FaUserAlt,
  FaCog,
  FaBook,
  FaPlus,
  FaHistory,
  FaBookMedical,
} from "react-icons/fa";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isReadingListOpen, setIsReadingListOpen] = useState(false);
  const [isSparksOpen, setIsSparksOpen] = useState(false);
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleReadingList = () => {
    setIsReadingListOpen(!isReadingListOpen);
  };

  const toggleSparksList = () => {
    setIsSparksOpen(!isSparksOpen);
  };

  const toggleStoriesList = () => {
    setIsStoriesOpen(!isStoriesOpen);
  };

  const handleCardClick = (path) => {
    window.location.href = path;  // Navigation logic
  };

  const handleClickModal = (e) => {
    e.stopPropagation(); // Prevent click from bubbling up and causing a re-render
    setOpen(!open);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header" onClick={toggleSidebar}>
        <span className="logo">✨</span>
        {!isCollapsed && <span className="appname">Loomina</span>}
      </div>

      <ul className="menu">
        <li className="menu-item" onClick={handleClickModal}>
          <FaPlus className="icon" />
          {!isCollapsed && <span className="text-span">Create</span>}
        </li>

        <li className="menu-item" onClick={() => handleCardClick('/')}>
          <FaHome className="icon" />
          {!isCollapsed && <span className="text-span">Dashboard</span>}
        </li>

        <li className="menu-item" onClick={() => handleCardClick('/story-page')}>
          <FaBookMedical className="icon" />
          {!isCollapsed && <span className="text-span">My Story</span>}
        </li>

        <li className="menu-item" onClick={() => handleCardClick('/user')}>
          <FaUserAlt className="icon" />
          {!isCollapsed && <span className="text-span">Profile</span>}
        </li>

        <hr className="hr-line" />

        <li className="menu-item">
          <FaBookmark className="icon" />
          {!isCollapsed && <span className="text-span">Bookmark</span>}
        </li>

        {/* Reading List */}
        <li className="menu-item" onClick={toggleReadingList}>
          <FaBook className="icon" />
          {!isCollapsed && (
            <>
              <span className="text-span">Reading List</span>
              {isReadingListOpen ? <BsChevronUp className="icon-list" /> : <BsChevronDown className="icon-list" />}
            </>
          )}
        </li>

        {!isCollapsed && isReadingListOpen && (
          <ul className="reading-list mind-map">
            {/* Sparks */}
            <li>
              <div className="list-title" onClick={toggleSparksList}>
                <span>Sparks</span>
                {isSparksOpen ? <BsChevronUp className="icon-list" /> : <BsChevronDown className="icon-list" />}
              </div>
              {isSparksOpen && (
                <ul className="sub-list">
                  <li className="story-item">
                    <img src="author-pic1.jpg" alt="Author Spark 1" className="author-pic" />
                    <span>Author Spark 1</span>
                  </li>
                  <li className="story-item">
                    <img src="author-pic2.jpg" alt="Author Spark 2" className="author-pic" />
                    <span>Author Spark 2</span>
                  </li>
                </ul>
              )}
            </li>

            {/* Stories */}
            <li>
              <div className="list-title" onClick={toggleStoriesList}>
                <span>Stories</span>
                {isStoriesOpen ? <BsChevronUp className="icon-list" /> : <BsChevronDown className="icon-list" />}
              </div>
              {isStoriesOpen && (
                <ul className="sub-list">
                  <li className="story-item">
                    <img src="author-pic3.jpg" alt="Author Story 1" className="author-pic" />
                    <span>Author Story 1</span>
                  </li>
                  <li className="story-item">
                    <img src="author-pic4.jpg" alt="Author Story 2" className="author-pic" />
                    <span>Author Story 2</span>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        )}
      </ul>

      <div className="sidebar-footer">
        <div
          className="menu-item settings"
          onMouseEnter={() => setIsSettingsOpen(true)}
          onMouseLeave={() => setIsSettingsOpen(false)}
        >
          <FaCog className="icon" />
          {!isCollapsed && <span className="text-span">Settings</span>}

          {isSettingsOpen && !isCollapsed && (
            <div className="floating-menu">
              <ul>
                <li>Go to Profile</li>
                <li>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Move the modal outside of the menu for better performance */}
      {open && <CreateModal onClose={handleClickModal} />}
    </div>
  );
};

export default Sidebar;
