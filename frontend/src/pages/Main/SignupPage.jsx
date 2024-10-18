import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/main/Signup.css";

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
  const navigate = useNavigate();

  // Signup state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
    }, 3000);
    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  const handleDotClick = (index) => {
    setCurrentStoryIndex(index);
  };

  // SIGNUP
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const formData = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);
        localStorage.setItem("token", data.token); // Store JWT token
        navigate("/user"); // Navigate to user page
      } else {
        console.log("Signup failed:", data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  // LOGIN
  const handleSubmitLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const formData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token); // Store JWT token
        navigate("/user"); // Navigate to user page
      } else {
        console.log("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
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

          {/* Signup Form */}
          {activeTab === "Signup" && (
            <form className="signup-form" onSubmit={handleSubmit}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
                required
              />
              <input
                value={email}
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="submit-btn"
                style={{ backgroundColor: "#000814" }}
              >
                Create an Account
              </button>
            </form>
          )}

          {/* Login Form */}
          {activeTab === "Login" && (
            <form className="signup-form" onSubmit={handleSubmitLogin}>
              <input
                value={email}
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="submit-btn"
                style={{ backgroundColor: "#000814" }}
              >
                Log in
              </button>
            </form>
          )}

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
