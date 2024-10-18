import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/Master/DashboardPage";
import NewSoloStory from "./pages/CreateNew/CreateSoloStory";
import NewThread from "./pages/CreateNew/CreateThread";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-thread" element={<NewThread />} />
        <Route path="/create-solo" element={<NewSoloStory />} />
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
