// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import './App.css';
import UserProfile from './pages/UserProfile';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/user" element={<UserProfile />} />
          {/* Add other routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
