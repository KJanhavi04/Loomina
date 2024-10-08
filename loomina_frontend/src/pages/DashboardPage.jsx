import React from 'react';
import '../css/Dashboard.css'; // Assuming you're using CSS for styling

const Dashboard = () => {
  // Dummy data to populate sections dynamically
  const sparks = ['Spark 1', 'Spark 2', 'Spark 3', 'Spark 4', 'Spark 5'];
  const trendingThreads = [
    { id: 1, sparks: ['Thread 1 - Spark 1', 'Thread 1 - Spark 2'] },
    { id: 2, sparks: ['Thread 2 - Spark 1', 'Thread 2 - Spark 2'] },
    { id: 3, sparks: ['Thread 3 - Spark 1', 'Thread 3 - Spark 2'] },
    { id: 4, sparks: ['Thread 4 - Spark 1', 'Thread 4 - Spark 2'] },
  ];

  return (
    <div className="dashboard">
      {/* Slideshow Section */}
      <div className="slideshow-container">
        <div className="slideshow">
          <div className="slide">Story Image 1</div>
          <div className="slide">Story Image 2</div>
          <div className="slide">Story Image 3</div>
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
