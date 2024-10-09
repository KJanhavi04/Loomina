// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import './App.css';
import UserProfile from './pages/UserProfile';
import Dashboard from './pages/DashboardPage';
import CreateSpark from './pages/CreateSpark';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-spark" element={<CreateSpark />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
