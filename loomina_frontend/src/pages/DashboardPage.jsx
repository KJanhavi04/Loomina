import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css'; // Assuming you're using CSS for styling

import image1 from '../images/image1.jpeg';
import image2 from '../images/image2.jpeg';
import image3 from '../images/image3.jpeg';

const Dashboard = () => {
  // Dummy data to populate sections dynamically
  const sparks = [
    'Spark 1', 'Spark 2', 'Spark 3', 'Spark 4', 'Spark 5',
    'Spark 1', 'Spark 2', 'Spark 3', 'Spark 4', 'Spark 5',
    'Spark 1', 'Spark 2', 'Spark 3', 'Spark 4', 'Spark 5',
    'Spark 1', 'Spark 2', 'Spark 3', 'Spark 4', 'Spark 5'
  ];

  const trendingThreads = [
    { id: 1, sparks: ['Thread 1 - Spark 1', 'Thread 1 - Spark 2'] },
    { id: 2, sparks: ['Thread 2 - Spark 1', 'Thread 2 - Spark 2'] },
    { id: 3, sparks: ['Thread 3 - Spark 1', 'Thread 3 - Spark 2'] },
    { id: 4, sparks: ['Thread 4 - Spark 1', 'Thread 4 - Spark 2'] },
    { id: 1, sparks: ['Thread 1 - Spark 1', 'Thread 1 - Spark 2'] },
    { id: 2, sparks: ['Thread 2 - Spark 1', 'Thread 2 - Spark 2'] },
    { id: 3, sparks: ['Thread 3 - Spark 1', 'Thread 3 - Spark 2'] },
    { id: 4, sparks: ['Thread 4 - Spark 1', 'Thread 4 - Spark 2'] },
    { id: 1, sparks: ['Thread 1 - Spark 1', 'Thread 1 - Spark 2'] },
    { id: 2, sparks: ['Thread 2 - Spark 1', 'Thread 2 - Spark 2'] },
    { id: 3, sparks: ['Thread 3 - Spark 1', 'Thread 3 - Spark 2'] },
    { id: 4, sparks: ['Thread 4 - Spark 1', 'Thread 4 - Spark 2'] },
    { id: 1, sparks: ['Thread 1 - Spark 1', 'Thread 1 - Spark 2'] },
    { id: 2, sparks: ['Thread 2 - Spark 1', 'Thread 2 - Spark 2'] },
    { id: 3, sparks: ['Thread 3 - Spark 1', 'Thread 3 - Spark 2'] },
    { id: 4, sparks: ['Thread 4 - Spark 1', 'Thread 4 - Spark 2'] },
  ];

  // Slideshow images
  const storyImages = [image1, image2, image3];

  // State to manage current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Effect to change image at intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % storyImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [storyImages.length]);

  return (
    <div className="dashboard">
      {/* Slideshow Section */}
      <div className="slideshow-container">
        <div className="slideshow">
          <div className="slide">
            <img src={storyImages[currentImageIndex]} alt={`Story Image ${currentImageIndex + 1}`} />
          </div>
        </div>

      </div>

      {/* Spark for You Section */}
      <section className="spark-for-you">
        <h2 className="section-title">Spark for You</h2>
        <div className="spark-scroll">
          {sparks.map((spark, index) => (
            <div className="spark" key={index}>
              {spark}
            </div>
          ))}
        </div>
      </section>

      {/* Trending Threads Section */}
      <section className="trending-threads">
        <h2 className="section-title">Trending Threads</h2>
        <div className="trending-scroll">
          {trendingThreads.map((thread) => (
            <div className="thread" key={thread.id}>
              {thread.sparks.map((spark, idx) => (
                <div className="spark-preview" key={idx}>
                  {spark}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
