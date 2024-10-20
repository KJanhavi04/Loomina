import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import '../../css/story/story_card.css';
import { FaArrowRight, FaHeart } from 'react-icons/fa'; // FontAwesome icons

const StoryCard = ({ coverImage, title, synopsis, storyId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const limitedSynopsis = synopsis.split(' ').slice(0, 60).join(' ');

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCardClick = () => {
    navigate(`/story-preview`, { state: { storyId: storyId} });
  };

  return (
    <div className="story-card" onClick={handleCardClick}>
      <img src={coverImage} alt="Cover" className="story-card-cover" />
      <h2 className="story-card-title">{title}</h2>
      <p className="story-card-synopsis">
        {isExpanded ? synopsis : `${limitedSynopsis}...`}
      </p>
      {synopsis.split(' ').length > 80 && (
        <button className="story-card-toggle" onClick={handleToggle}>
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      )}
      <div className="story-card-actions">
        
        <FaArrowRight className="arrow-icon" />
      </div>
    </div>
  );
};

export default StoryCard;
