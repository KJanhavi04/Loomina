// #final it has register and login both!!!!
import React, { useState, useEffect } from "react";
import "../css/SignUp.css";

const stories = [
  {
    text: "Once upon a time, in a land filled with magic, a young girl discovered a hidden talent for weaving spells. Her journey led her to uncover the secrets of her family's ancient legacy, and with courage, she changed her destiny.",
    author: "Alice",
  },
  {
    text: "In a bustling city, an artist struggled to find inspiration. One day, a chance encounter with a stray dog sparked a friendship that inspired him to create his most beloved masterpiece, capturing the essence of their bond.",
    author: "Bob",
  },
  {
    text: "A young inventor, driven by curiosity, built a robot that could dream. Together, they embarked on adventures, exploring the wonders of imagination and the beauty of dreams, inspiring others to see the world differently.",
    author: "Charlie",
  },
  {
    text: "During a stormy night, an old sailor shared tales of the sea, weaving stories of adventure, bravery, and the unbreakable bond between friends. Each story painted a picture of a life lived to the fullest, reminding everyone of the magic in storytelling.",
    author: "Diana",
  },
  {
    text: "In a quiet village, a librarian found a dusty book that transported her to enchanted worlds. Each turn of the page was an adventure, and she soon realized that the stories within could change lives, including her own.",
    author: "Evelyn",
  },
];

const Signup = () => {
  const [activeTab, setActiveTab] = useState("Signup");
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
    }, 3000);
    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  const handleDotClick = (index) => {
    setCurrentStoryIndex(index);
  };

  return (
    <div className="outer-space">
      <div className="signup-wrapper">
        {/* Left Section */}
        <div className="left-section">
          <div className="brand-logo">
            <div className="logo">✨</div>
          </div>
          <h1 className="title">Loomina</h1>
          <p className="subtitle">Weave your imagination with AI!</p>
          <div className="testimonial">
            <p className="testimonial-text">
              {stories[currentStoryIndex].text}
            </p>
            <div className="testimonial-author">
              <strong>{stories[currentStoryIndex].author}</strong>
              <p>, Loomina User</p>
            </div>
          </div>
          {/* Dots for navigation */}
          <div className="dots-container">
            {stories.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentStoryIndex === index ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <h2>{activeTab === "Signup" ? "" : ""}</h2>
          <div className="toggle-buttons">
            <button
              className={activeTab === "Signup" ? "active" : ""}
              onClick={() => setActiveTab("Signup")}
              style={{
                backgroundColor: activeTab === "Signup" ? "#000814" : "",
              }}
            >
              Signup
            </button>
            <button
              className={activeTab === "Login" ? "active" : ""}
              onClick={() => setActiveTab("Login")}
              style={{
                backgroundColor: activeTab === "Login" ? "#000814" : "",
              }}
            >
              Login
            </button>
          </div>

          {/* Form */}
          <form
            className={`signup-form ${
              activeTab === "Signup" ? "signup-transition" : "login-transition"
            }`}
          >
            {activeTab === "Signup" && (
              <>
                <input type="text" placeholder="Name" required />
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button
                  type="submit"
                  className="submit-btn"
                  style={{ backgroundColor: "#000814" }}
                >
                  Create an Account
                </button>
              </>
            )}
            {activeTab === "Login" && (
              <>
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button
                  type="submit"
                  className="submit-btn"
                  style={{ backgroundColor: "#000814" }}
                >
                  Log in
                </button>
              </>
            )}
          </form>

          {activeTab === "Signup" ? (
            <p className="login-prompt">
              Already have an account?{" "}
              <a href="#" onClick={() => setActiveTab("Login")}>
                Log in
              </a>
            </p>
          ) : (
            <p className="login-prompt">
              Don't have an account?{" "}
              <a href="#" onClick={() => setActiveTab("Signup")}>
                Sign up
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
