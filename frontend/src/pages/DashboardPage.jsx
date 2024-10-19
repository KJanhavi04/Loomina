import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css';
import image1 from '../images/image1.jpeg';
import image2 from '../images/image2.jpeg';
import image3 from '../images/image3.jpeg';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize the navigation hook
  const sparks = [
    'Spark 1', 'Spark 2', 'Spark 3', 'Spark 4', 'Spark 5',
    // ... more sparks
  ];

  const trendingThreads = [
    { id: 1, sparks: ['Thread 1 - Spark 1', 'Thread 1 - Spark 2'] },
    { id: 2, sparks: ['Thread 2 - Spark 1', 'Thread 2 - Spark 2'] },
    // ... more threads
  ];

  const storyImages = [image1, image2, image3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [sparkFormData, setSparkFormData] = useState({
    title: '',
    prompt: '',
    genre: '',
  });
  const [genres, setGenres] = useState([]);

  // Change image at intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % storyImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [storyImages.length]);

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOption('');
    resetForms();
  };

  const resetForms = () => {
    setSparkFormData({ title: '', prompt: '', genre: '' });
    setGenres([]);
  };

  // Handle form input changes for Spark form
  const handleSparkInputChange = (e) => {
    const { name, value } = e.target;
    setSparkFormData({ ...sparkFormData, [name]: value });
  };

  // Handle genres input for Spark
  const handleSparkGenreKeyDown = (event) => {
    if (event.key === ' ') {
      event.preventDefault();
      if (sparkFormData.genre.trim()) {
        setGenres((prevGenres) => [...prevGenres, sparkFormData.genre.trim()]);
        setSparkFormData({ ...sparkFormData, genre: '' });
      }
    }
  };

  const handleDeleteGenre = (index) => {
    setGenres((prevGenres) => prevGenres.filter((_, i) => i !== index));
  };

  const handleCreateSpark = async () => {

    if (!sparkFormData.title || !genres.length) {
      alert("Title and at least one Genre are required.");
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/thread/create-thread', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          threadTitle: sparkFormData.title,
          genre: genres,                            
          timestamp: new Date().toISOString(),
          prompt: sparkFormData.prompt,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Thread created successfully:', result);
        console.log(result)
        
        closeModal();
        // navigate('/create-spark', {threadId: result.threadId});
        navigate('/create-spark', { state: { threadId: result.threadId } });
        // navigate('/create-spark', { state: { threadId: "670cfeb6205d114ca5d2c27d" } });
      } else {
        console.error('Error creating thread:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    // If "Solo Writing" is selected, redirect to the Create Story page
    if (option === 'Solo Writing') {
      closeModal();  // Close the modal before redirect
      navigate('/create-story');
    }
  };

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

      {/* Create New Story Button */}
      <button className="create-story-btn" onClick={openModal}>
        Create New Story
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {selectedOption === '' ? (
              <>
                <h2>Create New Story</h2>
                <button onClick={() => handleOptionClick('Sparks')}>Sparks</button>
                <button onClick={() => handleOptionClick('Solo Writing')}>Solo Writing</button>
              </>
            ) : selectedOption === 'Sparks' ? (
              <>
                <h2>Create Spark</h2>
                <label>
                  Title:
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter title of the thread"
                    value={sparkFormData.title}
                    onChange={handleSparkInputChange}
                  />
                </label>
                <label>
                  Prompt:
                  <textarea
                    name="prompt"
                    placeholder="Enter your prompt"
                    value={sparkFormData.prompt}
                    onChange={handleSparkInputChange}
                  ></textarea>
                </label>
                <label>
                  Genre:
                  <input
                    type="text"
                    name="genre"
                    placeholder="Enter genre"
                    value={sparkFormData.genre}
                    onChange={handleSparkInputChange}
                    onKeyDown={handleSparkGenreKeyDown}
                  />
                </label>

                <div className="genres">
                  {genres.map((genre, index) => (
                    <span
                      key={index}
                      onClick={() => handleDeleteGenre(index)}
                      style={{ margin: '5px', padding: '5px', border: '1px solid #ccc', display: 'inline-block' }}
                    >
                      {genre} x
                    </span>
                  ))}
                </div>

                <button onClick={handleCreateSpark}>Submit</button>
              </>
            ) : null}
            <button className="modal-close" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
