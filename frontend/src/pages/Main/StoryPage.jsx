import React from 'react';
import StoryCard from '../../components/story/storyCard'; // Adjust the path as needed
import MasterPage from '../../components/master/Master';
import '../../css/main/story_page.css'

const StoryPage = () => {
  // Example stories data
  const stories = [
    {
      id: 1,
      coverImage: 'https://i.ytimg.com/vi/VetwTvPXcKY/sddefault.jpg',
      title: 'The Musical Dagger',
      synopsis: 'Set during the British Raj era, Pandit Bhanu Shankar Shastri (Shankar Mahadevan) is an Indian classical singer living in the princely state of Vishrampur with his daughter Uma Shastri (Mrunmayee Deshpande). During one of his shows at Miraj, Shastri meets another classical singer Khansaheb Aftab Hussain Bareliwale (Sachin Pilgaonkar) and requests him to visit Vishrampur. On Dasara festival, the Maharaja of the state arranges an annual singing competition with the winner to be given the status of royal singer, Haveli (Mansion), and a "Katyar" (dagger). The Maharaja proclaims that the state would pardon one murder if committed by the royal singer with this dagger in self-defense. Shastri is challenged by Khansaheb but wins the competition.'
    },
    {
      id: 2,
      coverImage: 'https://i.ytimg.com/vi/LZzji2mly9M/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBECP-urFW4FSFxs-KjL1GNX57PzQ',
      title: 'Game Of Love',
      synopsis: "A young and penniless general, Dhairyadhar, is refused by the proud Bhamini, a proud heiress. But she soon repents and presents herself disguised as a poor damsel in the wilderness, only to be rescued by Dhairyadhar. Her pride subsides, but his prejudice for the original character remains. This love story is humorously punctuated by the scheming of Bhamini's brother-in-law Vilasdhar, who promotes the cause of Lakshmidhar, a good-for-nothing dandy."
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
