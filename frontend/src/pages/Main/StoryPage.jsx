import StoryCard from '../../components/story/storyCard'; // Adjust the path as needed
import MasterPage from '../../components/master/Master';
import '../../css/main/story_page.css'

import React, { useEffect, useState } from 'react';

const StoryPage = () => {
  const [stories, setStories] = useState([]);  // Initialize as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/story/get-stories`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you're using JWT token from localStorage
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching stories.');
        }

        const data = await response.json();
        setStories(data.stories);  // Update with the fetched stories
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <MasterPage>
      <div className="story-page">
        {loading ? (
          <p>Loading stories...</p>
        ) : (
          <div className="story-page-cards">
            {stories.map(story => (
              <StoryCard
                storyId={story.id}
                key={story.id}  // Ensure the key is unique
                coverImage={story.coverImage}  // Ensure this path matches your backend response
                title={story.title}
                synopsis={story.synopsis}
              />
            ))}
          </div>
        )}
      </div>
    </MasterPage>
  );
};

export default StoryPage;
