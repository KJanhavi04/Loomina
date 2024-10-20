import React, { useState, useEffect } from "react";
import "../../css/create/spark.css";
import { FaPlus, FaStar, FaHeart, FaComment, FaBookmark } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { MdCancelPresentation, MdStar } from "react-icons/md";
import MasterPage from "../master/Master";

import { useLocation } from 'react-router-dom';


const CreateSpark = () => {
  const [textareas, setTextareas] = useState([{ id: Date.now(), posted: false, prevSparkId: null, text: "" }]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userId, setUser] = useState(null);

  const [threadTitle, setThreadTitle] = useState("");

  const location = useLocation();
  const { threadId } = location.state || {};

  const token = localStorage.getItem('token');
  const [currSparkId, setCurrSparkId] = useState(null);  // Variable to track the current spark ID

  // Fetch userId on component load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('Token:', token);
        const response = await fetch('http://localhost:5000/user/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data['userId']);
        } else {
          console.log('Failed to fetch user details:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };


    const fetchThread = async () => {
      try {
        const response = await fetch(`http://localhost:5000/thread/threads/${threadId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          const result = await response.json();
          console.error('Error fetching thread:', result.error || 'Unknown error');
          throw new Error(result.error || 'Error fetching thread details');
        }
    
        const result = await response.json();
        console.log('Fetched thread data:', result);
    
        if (result && result.threadTitle) {
          setThreadTitle(result.threadTitle);
        } else {
          console.error('Thread title not found in the response');
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error.message); // Update error state
      }
    };
    

    fetchUser();

    fetchThread();
  }, []);


  const addTextarea = () => {
    if (textareas[currentIndex].posted) {
      const prevSparkId = textareas[currentIndex].id;
      setTextareas([...textareas, { id: Date.now(), posted: false, prevSparkId, text: "" }]);
      setCurrentIndex(textareas.length);
    }
  };

  const postSpark = async (id) => {
    const currentSpark = textareas.find(textarea => textarea.id === id);

    console.log("this id text", textareas.id);

    const sparkData = {
      prevSparkId: currSparkId,
      threadId: threadId,
      userId: userId,
      sparkText: currentSpark.text, // Use actual text from textarea
    };

    try {
      // Call your API to create a new spark
      const response = await fetch('http://localhost:5000/spark/create-spark', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sparkData)
      });
      const result = await response.json();
      console.log("Spark created:", result);

      setCurrSparkId(result['sparkId'])

      // Mark spark as posted after success and set prevSparkId from result
      setTextareas(textareas.map(textarea =>
        textarea.id === id ? { ...textarea, posted: true, prevSparkId: result.prevSparkId } : textarea
      ));
    } catch (error) {
      console.error("Error posting spark:", error);
    }
  };

  const handleTextareaChange = (index, value) => {
    const updatedTextareas = [...textareas];
    updatedTextareas[index].text = value; // Update the text of the textarea
    setTextareas(updatedTextareas);
    setCurrentIndex(index);
  };

  return (
    <MasterPage>
      <div className="sparks-container">
        <div className="spark-header">
          <div className="profile">
            <img src="profile-pic-url" alt="Profile" className="profile-pic" />
          </div>
          <input
            type="text"
            placeholder="Thread Title"
            className="spark-header-title"
            value={threadTitle}
            disabled
          />
          <BsThreeDots className="spark-header-icon" />
        </div>

        <div className="spark-textarea-container">
          {textareas.map((textarea, index) => (
            <div key={textarea.id} className={`spark-textarea ${index > 0 ? 'threaded' : ''} ${textarea.posted ? 'posted' : ''}`}>
              <textarea
                placeholder="Write your story here..."
                disabled={textarea.posted}
                onFocus={() => handleTextareaChange(index)}
                onChange={(e) => handleTextareaChange(index, e.target.value)} // Capture textarea input
                value={textarea.text} // Control textarea value
              />
              {textarea.posted ? (
                <MdStar className="spark-textarea-edit" />
              ) : (
                <button className="spark-textarea-cancel" onClick={() => setTextareas(textareas.filter(t => t.id !== textarea.id))}>
                  <MdCancelPresentation />
                </button>
              )}
              {!textarea.posted && (
                <button className="spark-post" onClick={() => postSpark(textarea.id)}>
                  <FaStar /> Post!
                </button>
              )}
              {textarea.posted && (
                <div className="spark-posted-sections">
                  <div className="spark-actions">
                    <span className="spark-action-icon"><FaHeart className="spark-icon" /></span>
                    <span className="spark-action-icon"><FaComment className="spark-icon" /></span>
                    <span className="spark-action-icon"><FaBookmark className="spark-icon" /></span>
                    <span className="spark-action-icon"><PiDotsThreeOutlineFill className="spark-icon" /></span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="spark-components">
          <button
            className="spark-add-more"
            onClick={addTextarea}
            disabled={!textareas[currentIndex].posted}
          >
            <FaPlus /> Add More
          </button>
        </div>
      </div>
    </MasterPage>
  );
};

export default CreateSpark;
