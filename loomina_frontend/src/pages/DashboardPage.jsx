import React, { useState } from 'react';
import '../css/Dashboard.css';
import image1 from '../images/image1.jpeg';
import image2 from '../images/image2.jpeg';
import image3 from '../images/image3.jpeg';

const Dashboard = () => {
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
  const [formData, setFormData] = useState({
    title: '',
    prompt: '',
    genre: '',
  });
  const [genres, setGenres] = useState([]);

  // Change image at intervals
  React.useEffect(() => {
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
    setFormData({ title: '', prompt: '', genre: '' });
    setGenres([]);
  };

  // Handle option selection
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeyDown = (event) => {
    if (event.key === ' ') {
      event.preventDefault(); // Prevent default spacebar behavior
      if (formData.genre.trim()) {
        setGenres([...genres, formData.genre.trim()]);
        setFormData({ ...formData, genre: '' }); // Clear the genre input field
      }
    }
  };

  const handleDeleteGenre = (index) => {
    const newGenres = genres.filter((_, i) => i !== index);
    setGenres(newGenres);
  };

  const handleCreateSpark = async () => {
    if (!formData.title || !genres.length) {
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
          threadTitle: formData.title,
          genre: genres, // Send genres as an array
          timestamp: new Date().toISOString(),
          prompt: formData.prompt,
        }),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        console.log('Thread created successfully:', result);
        closeModal();
        window.location.href = '/create-spark';
      } else {
        console.error('Error creating thread:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
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
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Prompt:
                  <textarea
                    name="prompt"
                    placeholder="Enter your prompt"
                    value={formData.prompt}
                    onChange={handleInputChange}
                  ></textarea>
                </label>
                <label>
                  Genre:
                  <input
                    type="text"
                    name="genre"
                    placeholder="Enter genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown} // Add keydown handler
                  />
                </label>
                <div className="genres-tags">
                  {genres.map((genre, index) => (
                    <span key={index} onClick={() => handleDeleteGenre(index)} style={{ margin: '5px', padding: '5px', border: '1px solid #ccc', display: 'inline-block' }}>
                      {genre} &times;
                    </span>
                  ))}
                </div>
                <button onClick={handleCreateSpark}>Create</button>
              </>
            ) : (
              window.location.href = '/solo-writing'
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
