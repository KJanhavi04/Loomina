import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaHeart, FaComment } from "react-icons/fa"; // Importing icons
import styles from "../../css/story/storyPreviewPage.module.css"; // Importing the CSS module
import MasterPage from "../master/Master";
 
const StoryPreviewPage = () => {
  const [storyDetails, setStoryDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  const location = useLocation();

  const { storyId } = location.state || {};
  
  useEffect(() => {
    const fetchStoryDetails = async () => {
      const token = localStorage.getItem("token");
 
      try {
        const response = await fetch(`http://localhost:5000/story/${storyId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
 
        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.error || "Error fetching story details");
        }
 
        const result = await response.json();
        setStoryDetails(result);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message); // Update error state
      } finally {
        setLoading(false);
      }
    };
 
    fetchStoryDetails();
  }, [storyId]);
 
  if (loading) {
    return <div className={styles.loadingMessage}>Loading...</div>;
  }
 
  if (error) {
    return (
      <div className={styles.errorMessage}>
        Error loading story details: {error}
      </div>
    ); // Display error message
  }
 
  if (!storyDetails) {
    return <div className={styles.errorMessage}>No story details found.</div>;
  }
 
  return (
    <MasterPage>
      <div className={styles.storyPreviewPage}>
        <h2 className={styles.storyTitle}>{storyDetails.title}</h2>
        {/* Cover Image at the top */}
        <div className={styles.coverImage}>
          {storyDetails.coverImageUrl ? (
            <img src={storyDetails.coverImageUrl} alt="Cover" />
          ) : (
            <p>No cover image available.</p>
          )}
        </div>


        <p className={styles.storySynopsis}>{storyDetails.synopsis}</p>
 
        <div className={styles.tags}>
          <strong>Tags:</strong>
          <ul>
            {storyDetails.tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>
 
        <div className={styles.genres}>
          <strong>Genres:</strong>
          <ul>
            {storyDetails.genre.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
        </div>
 
        {/* Bottom-right icons for comments and likes */}
        <div className={styles.storyInfo}>
          <div className={styles.iconWrapper}>
            <FaHeart className={styles.icon} />
            <span>{storyDetails.numberOfLikes}</span>
          </div>
          <div className={styles.iconWrapper}>
            <FaComment className={styles.icon} />
            <span>{storyDetails.numberOfComments}</span>
          </div>

        </div>
      </div>
    </MasterPage>
  );
};
 
export default StoryPreviewPage;