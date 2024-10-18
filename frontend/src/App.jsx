// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Main/SignupPage";
import "./App.css";
import UserProfile from "./pages/UserProfile";
// import Dashboard from './pages/DashboardPage';
import Dashboard from "./pages/Main/Dashboard";
import DashboardPage from "./pages/Master/DashboardPage";
import CreateSpark from "./pages/CreateSpark";
import CreateStory from "./pages/CreateStory";
import StoryPreviewPage from "./pages/StoryPreviewPage";
import NewSoloStory from "./pages/CreateNew/CreateSoloStory";
import CreateThread from "./pages/CreateNew/CreateThread";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<SignupPage />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/spark" element={<CreateSpark />} />
          <Route path="/create-spark" element={<CreateSpark />} />
          <Route path="/create-story" element={<CreateStory />} />
          <Route path="/create-thread" element={<CreateThread />} />
          <Route path="/create-solo" element={<NewSoloStory />} />
          <Route path="/story-preview" element={<StoryPreviewPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
