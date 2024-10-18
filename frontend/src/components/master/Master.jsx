import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import '../../css/master/master.css';

const MasterPage = ({ children }) => {
  return (
    <><div className="master-page">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-area">
          {children}

        </div>
      </div>
    </div><Footer /></>
  );
};

export default MasterPage;
