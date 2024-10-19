import React from 'react';
import StoryCard from '../../components/story/storyCard'; // Adjust the path as needed
import MasterPage from '../../components/master/Master';
import '../../css/main/story_page.css'

const StoryPage = () => {
  // Example stories data
  const stories = [
    {
      id: 1,
      coverImage: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/amazing-stone-path-in-forest-free-image.jpg?w=600&quality=80',
      title: 'The Great Adventure',
      synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Integer et lorem eu elit luctus vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce faucibus libero a ligula interdum, a congue metus hendrerit. Donec sit amet libero non erat varius tincidunt.'
    },
    {
      id: 2,
      coverImage: 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_640.jpg',
      title: 'A Journey Through Time',
      synopsis: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    
    // Add more stories as needed
  ];

  return (
    <MasterPage>
    <div className="story-page">
      
      <div className="story-page-cards">
        {stories.map(story => (
          <StoryCard 
            key={story.id} 
            coverImage={story.coverImage} 
            title={story.title} 
            synopsis={story.synopsis} 
          />
        ))}
      </div>
    </div>
    </MasterPage>
  );
};

export default StoryPage;
