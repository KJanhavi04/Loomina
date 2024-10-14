import React from 'react';
import '../../css/master/sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Your Logo</div>
      <ul className="menu">
        <li className="menu-item active">Dashboard</li>
        <li className="menu-item">Team</li>
        <li className="menu-item">Projects</li>
        <li className="menu-item">Calendar</li>
        <li className="menu-item">Documents</li>
        <li className="menu-item">Reports</li>
      </ul>
      <div className="teams">
        <p>Your teams</p>
        <ul>
          <li className="team-item">Heroicons</li>
          <li className="team-item">Tailwind Labs</li>
          <li className="team-item">Workcation</li>
        </ul>
      </div>
      <div className="settings">Settings</div>
    </div>
  );
};

export default Sidebar;
