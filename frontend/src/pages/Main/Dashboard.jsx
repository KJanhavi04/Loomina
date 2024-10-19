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
      authorPic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzOFaaYy7ZgMH3DY7Aq8_BKaUAH5khUl-ubA&s",
      authorName: "Namita Warang",
      summary: "This is an easy small story in English. The moral of this story is no matter how great one becomes, one should never forget one's roots. Just like the mouse girl who, despite being transformed into a human girl, refused to marry the great forces of nature and finally settled for a mouse, a creature who belonged to her roots.",
    },
    {
      authorPic: "https://images.inc.com/uploaded_files/image/1920x1080/getty_516137066_2000179720009280633_314131.jpg",
      authorName: "Shruti Patil",
      summary: "The moral of “The Beauty and the Beast” is that inner traits, such as kindness, should be valued over outside qualities such as wit and appearance. This moral is taught by showing how Beauty admired the Beast's intrinsic qualities and fell in love with him despite his external characteristics.",
    },
  ];

  // Updated thread data with valid story titles
  const threads = [
    {
      title: "The Enchanted Forest",
      profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNQ6V81uURGlbHSJ5IWvuuhuES77P7Xu4oeQ&s",
      sparks: [
        "Once upon a time, in an enchanted forest, there lived a young girl named Elara. She was known for her kindness and bravery. One day, she discovered a hidden path that led to a magical realm.",
        "In this realm, Elara met mystical creatures who needed her help to save their home from an evil sorceress. With courage and determination, she embarked on a quest filled with challenges and adventures.",
        "Through her journey, Elara learned valuable lessons about friendship, trust, and the power of believing in oneself."
      ],
    },
    {
      title: "The Quest for the Lost ",
      profilePic: "https://i0.wp.com/grehlakshmi.com/wp-content/uploads/2022/08/resize-1656478623332995750wildanimalcartooncharacterintheforestscenefreevector.webp?fit=1200%2C675&ssl=1",
      sparks: [
        "In a small village, tales of a lost treasure hidden in the mountains circulated for generations. A brave young boy named Leo decided to uncover the truth behind the legend.",
        "With the guidance of an old map and the support of his friends, Leo set off on an adventure that tested their limits and forged unbreakable bonds.",
        "Along the way, they faced treacherous paths and fierce creatures, but their unwavering spirit led them to uncover not just treasure but the true meaning of courage."
      ],
    },
    {
      title: "The Time Traveler's Dilemma",
      profilePic: "https://cdn.firstcry.com/education/2022/08/12021320/The-Greedy-Dog-Story-With-Moral-For-Kids-696x476.jpg",
      sparks: [
        "In a world where time travel was possible, a scientist named Dr. Amelia found a way to travel back in time to witness historical events.",
        "However, her journey took an unexpected turn when she accidentally altered a crucial moment in history, leading to unforeseen consequences.",
        "Now, Dr. Amelia must navigate through time, making difficult choices to restore the timeline while learning about the impact of her actions."
      ],
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
        <SparkStruct
          profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgeFtkA2Mjt77S9I8ybECREkcFshAnMmUtIA&s"
          title="Alice in the Borderland"
          content="In the story, King Bruce and Spider, we saw how strongly the spider was trying to attain his success. Seeing the spider’s bravery, King Bruce also got encouraged to take one more step forward to get his lost kingdom back. With this story, we have learned that we should try, try, and try hard to achieve our dreams till we succeed."
          likes={120}
          comments={45}
          bookmarks={20}
        />
        <SparkStruct
          profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS72pwMkVvVObNijGWCo-0HzZ1P1M0s28FrBQ&s"
          title="Ali Baba and the Forty Thieves"
          content="This is an amazing short story to read in English. The moral lesson to be learnt here is that we should never bow down to greed. Greed should never be allowed to rule our lives. At some point during the novel, every one of the characters feels guilty about being selfish."
          likes={10}
          comments={5}
          bookmarks={2}
        />
      </div>

      {/* Middle Section (Threads For You) */}
      <div className="middle-section">
        <div className="sparks-heading">
          <h3>Threads For You</h3>
        </div>
      </div>
      <div className="bottom-section">
        {threads.map((thread, index) => (
          <ThreadStruct
            key={index}
            title={thread.title}
            profilePic={thread.profilePic}
            sparks={thread.sparks}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
