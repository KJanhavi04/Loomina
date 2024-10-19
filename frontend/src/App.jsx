import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignupPage from "./pages/Main/SignupPage";
import LoginPage from "./pages/LoginPage";
import UserProfile from "./pages/Main/UserProfile.jsx"
import UserProfile from "./pages/UserProfile.jsx";
import DashboardPage from "./pages/Master/DashboardPage";
import NewSoloStory from "./pages/CreateNew/CreateSoloStory";
import CreateThread from "./pages/CreateNew/CreateThread";
import CreateSpark from "./components/create/CreateSpark";
import StoryPreviewPage from "./components/story/storyPreview.jsx";

import "./App.css";
import StoryPage from "./pages/Main/StoryPage.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-thread" element={<CreateThread />} />
        <Route path="/create-solo" element={<NewSoloStory />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/create-spark" element={<CreateSpark />} />
        <Route path="/story-page" element={<StoryPage />} />

        <Route path="/story-preview" element={<StoryPreviewPage />} />

      </Routes>
    </Router>
  );
};

export default App;
