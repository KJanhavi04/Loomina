import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const StoryPreviewPage = () => {
  const [storyDetails, setStoryDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const { storyId } = location.state || {}; // Assuming storyId is passed in location.state

  useEffect(() => {
    const fetchStoryDetails = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`http://localhost:5000/story/${storyId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.error || 'Error fetching story details');
        }

        const result = await response.json();
        setStoryDetails(result);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message); // Update error state
      } finally {
        setLoading(false);
      }
    };

    fetchStoryDetails();
  }, [storyId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading story details: {error}</div>; // Display error message
  }

  if (!storyDetails) {
    return <div>No story details found.</div>;
  }

  return (
    <div>
      <h2>{storyDetails.title}</h2>
      <p>{storyDetails.synopsis}</p>

      <div>
        <strong>Tags:</strong>
        <ul>
          {storyDetails.tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Genres:</strong>
        <ul>
          {storyDetails.genre.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Cover Image:</strong>
        {storyDetails.coverImageUrl ? (
          <img src={storyDetails.coverImageUrl} alt="Cover" style={{ width: '150px' }} />
        ) : (
          <p>No cover image available.</p>
        )}
      </div>

      <div>
        <strong>Number of Chapters:</strong> {storyDetails.numberOfChapters}
      </div>
      <div>
        <strong>Number of Likes:</strong> {storyDetails.numberOfLikes}
      </div>
    </div>
  );
};

export default StoryPreviewPage;
