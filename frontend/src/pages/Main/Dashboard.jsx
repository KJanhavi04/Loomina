import React, { useState, useEffect } from "react";
import "../../css/main/dashboard.css";
import image from "../../assets/image.jpg";
import image1 from "../../assets/dark-forest.jpg";
import ThreadStruct from "../../components/sparks/thread_struct";
import SparkStruct from "../../components/sparks/spark_struct";
import Trending from "../../components/sparks/trending"; // Import Trending component

const Dashboard = () => {
  const [images, setImages] = useState([image, image1, image]);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const trendingItems = [
    {
      authorPic: "path/to/author1.jpg", // Update with actual author image paths
      authorName: "Author One",
      summary:
        'This is a longer spark that contains more than 100 words, but only the first part will be displayed here. The remaining part can be viewed by clicking the "Show more" link.',
    },
    {
      authorPic: "path/to/author2.jpg", // Update with actual author image paths
      authorName: "Author Two",
      summary:
        "This is another spark that also exceeds the character limit. It talks about interesting topics that are trending right now.",
    },
  ];

  return (
    <div className="dashboard">
      {/* Top Section */}
      <div className="top-section">
        {/* Full Image Carousel */}
        <div className="image-carousel">
          <img
            src={images[currentImage]}
            alt="Slideshow"
            className="full-image"
          />
          <div className="dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentImage === index ? "active" : ""}`}
              ></span>
            ))}
          </div>
        </div>
        {/* Trending Section */}
        <Trending items={trendingItems} /> {/* Use Trending component here */}
      </div>

      {/* Middle Section (Sparks for you) */}
      <div className="middle-section">
        <div className="sparks-heading">
          <h3>Sparks for you</h3>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <SparkStruct />
        <SparkStruct />

        {/* <div className="arrow-box">
          <button className="arrow-button">
            <span>&#8594;</span>
          </button>
        </div> */}
      </div>

      {/* Middle Section (Threads For You) */}
      <div className="middle-section">
        <div className="sparks-heading">
          <h3>Threads For You</h3>
        </div>
      </div>
      <div className="bottom-section">
        <ThreadStruct />
        <ThreadStruct />
        <ThreadStruct />
      </div>
    </div>
  );
};

export default Dashboard;
