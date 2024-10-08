// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import UserProfile from './pages/UserProfile';
import LoginPage from './pages/LoginPage';
import './App.css';
import UserProfile from './pages/UserProfile';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
