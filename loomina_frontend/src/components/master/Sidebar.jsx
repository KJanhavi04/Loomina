import React, { useState } from "react";
import "../../css/master/Sidebar.css";
import { FaHome, FaBookmark, FaUserAlt, FaCog, FaBook } from "react-icons/fa";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isReadingListOpen, setIsReadingListOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleReadingList = () => {
    setIsReadingListOpen(!isReadingListOpen);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header" onClick={toggleSidebar}>
        <span className="logo">✨</span>
        {!isCollapsed && <span className="appname">Loomina</span>}
      </div>

      <ul className="menu">
        <li className="menu-item">
          <FaHome className="icon" />
          {!isCollapsed && <span>Dashboard</span>}
        </li>

        <li className="menu-item">
          <FaUserAlt className="icon" />
          {!isCollapsed && <span>Profile</span>}
        </li>

      <hr className="hr-line"/>

        <li className="menu-item">
          <FaBookmark className="icon" />
          {!isCollapsed && <span>Bookmark</span>}
        </li>

        <li className="menu-item" onClick={toggleReadingList}>
          <FaBook className="icon" />
          {!isCollapsed && (
            <>
              <span>Reading List  </span>
              {isReadingListOpen ? <BsChevronUp className="icon-list" /> : <BsChevronDown className="icon-list" />}
            </>
          )}
        </li>

        {!isCollapsed && isReadingListOpen && (
          <ul className="reading-list mind-map">
            <li>
              <div className="story-item">
                <img
                  src="author-pic1.jpg"
                  alt="Author 1"
                  className="author-pic"
                />
                <span>Story Title 1</span>
              </div>
            </li>
            <li>
              <div className="story-item">
                <img
                  src="author-pic2.jpg"
                  alt="Author 2"
                  className="author-pic"
                />
                <span>Story Title 2</span>
              </div>
            </li>
            {/* Add more stories here */}
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
          {!isCollapsed && <span>Settings</span>}

          {/* Floating menu that appears on hover */}
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
    </div>
  );
};

export default Sidebar;
