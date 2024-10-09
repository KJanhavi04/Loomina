// // import React, { useState } from 'react';
// import React, { useState, useRef, useEffect } from 'react';
// import '../css/CreateSpark.css';


// const CreateSpark = () => {
//   const [showDialog, setShowDialog] = useState(false);
//   const [sparks, setSparks] = useState([]);
//   const [currentSpark, setCurrentSpark] = useState('');
//   const [isBold, setIsBold] = useState(false);
//   const [isItalic, setIsItalic] = useState(false);
//   const dialogRef = useRef(null); // Reference for the dialog box
//   const sparkInputRef = useRef(null); // Reference for the contentEditable spark input

//   // Hardcoded thread title and prompt
//   const threadTitle = "Game of Love";
//   const promptText = "When women denied marrying freedom fighters";

//   // Hardcoded profile picture and username for the sparks
//   const profilePic = 'path/to/profile-pic.jpg'; // Replace with actual image path
//   const username = 'Username'; // Replace with actual username

//   const handlePostSpark = () => {
//     if (currentSpark.trim() !== '') {
//       setSparks([...sparks, currentSpark]);
//       setCurrentSpark('');
//       setShowDialog(false);
//     }
//   };

//   // Toggle bold styling using document.execCommand
//   const toggleBold = () => {
//     document.execCommand('bold');
//     setIsBold(!isBold);
//   };

//   // Toggle italic styling using document.execCommand
//   const toggleItalic = () => {
//     document.execCommand('italic');
//     setIsItalic(!isItalic);
//   };

//   // Capture text content when input is modified
//   const handleInput = () => {
//     setCurrentSpark(sparkInputRef.current.innerHTML);
//   };

//   // Scroll and focus on the dialogue box when it's opened
//   useEffect(() => {
//     if (showDialog && dialogRef.current) {
//       dialogRef.current.scrollIntoView({ behavior: 'smooth' }); // Scrolls to the dialog box
//       dialogRef.current.focus(); // Focuses on the dialog box
//     }
//   }, [showDialog]);

//   return (
//     <div className="create-spark-container">
//       {/* Hardcoded Thread Title and Prompt */}
//       <div className="thread-details">
//         <h1 className="thread-title">{threadTitle}</h1>
//         <p className="prompt-text">Prompt: {promptText}</p>
//       </div>

//       {/* Display Sparks */}
//       {sparks.map((spark, index) => (
//         <div key={index} className="spark-post">
//           {/* Profile Picture and Username for each spark */}
//           <div className="spark-header">
//             <img src={profilePic} alt="Profile" className="profile-pic" />
//             <span className="username">{username}</span>
//           </div>
//           <p className="spark-content" dangerouslySetInnerHTML={{ __html: spark }}></p>
//         </div>
//       ))}

//       {/* Dialog for creating new spark */}
//       {showDialog && (
//         <div className="dialogue-box" ref={dialogRef} tabIndex="-1">
//           <div className="dialogue-header">
//             <img src={profilePic} alt="Profile" className="profile-pic" />
//             <span className="username">{username}</span>
//             <button className="close-button" onClick={() => setShowDialog(false)}>
//               &times;
//             </button>
//           </div>
//           <div className="toolbar">
//             <button className={`toolbar-button ${isBold ? 'active' : ''}`} onClick={toggleBold}>
//               B
//             </button>
//             <button className={`toolbar-button ${isItalic ? 'active' : ''}`} onClick={toggleItalic}>
//               I
//             </button>
//           </div>
//           <div
//             className="spark-input"
//             ref={sparkInputRef}
//             contentEditable
//             suppressContentEditableWarning
//             onInput={handleInput}
//             style={{
//               minHeight: '100px',
//               backgroundColor: 'white',
//               color: 'black',
//               padding: '10px',
//               borderRadius: '5px',
//               marginBottom: '10px',
//             }}
//           ></div>
//           <button className="post-button" onClick={handlePostSpark}>
//             Post
//           </button>
//         </div>
//       )}

//       {/* Button for adding a new spark */}
//       {sparks.length > 0 && (
//         <button className="add-spark-button" onClick={() => setShowDialog(true)}>
//           <span className="plus-icon">+</span> Add Spark
//         </button>
//       )}

//       {/* Initial "Create Spark" button if no sparks are present */}
//       {sparks.length === 0 && (
//         <button className="create-spark-button" onClick={() => setShowDialog(true)}>
//           Create Spark
//         </button>
//       )}
//     </div>
//   );
// };

// export default CreateSpark;import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

import '../css/CreateSpark.css';

const CreateSpark = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [sparkText, setSparkText] = useState('');  // For the new spark text
  const [sparks, setSparks] = useState([]);  // To hold the list of sparks
  const dialogRef = useRef(null); // Reference for the dialog box
  const sparkInputRef = useRef(null); // Reference for the contentEditable spark input

  const threadId = "someThreadId";  // Replace with actual thread ID from backend

  // Hardcoded profile picture and username for the sparks
  const profilePic = 'path/to/profile-pic.jpg'; // Replace with actual image path
  const username = 'Username'; // Replace with actual username

  // Function to handle posting a spark
  const handlePostSpark = async () => {
    if (sparkText.trim() !== '') {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/spark/sparks",  // Updated to include the full URL
          {
            threadId: threadId,
            sparkText: sparkText,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,  // Attach JWT token
            },
          }
        );
  
        // Get the new spark from the response and update state
        const newSpark = {
          sparkId: response.data.sparkId,
          userId: "currentUserId",  // Update with actual user info
          sparkText: sparkText,
        };
  
        setSparks([...sparks, newSpark]);  // Add the new spark to the list
        setSparkText('');  // Clear the text area after posting
        setShowDialog(false);  // Close the dialogue box
  
      } catch (error) {
        console.error("Error posting spark:", error);
      }
    }
  };
  

  // Scroll and focus on the dialogue box when it's opened
  useEffect(() => {
    if (showDialog && dialogRef.current) {
      dialogRef.current.scrollIntoView({ behavior: 'smooth' }); // Scrolls to the dialog box
      dialogRef.current.focus(); // Focuses on the dialog box
    }
  }, [showDialog]);

  return (
    <div className="create-spark-container">
      <div className="thread-details">
        <h1 className="thread-title">Game of Love</h1>
        <p className="prompt-text">Prompt: When women denied marrying freedom fighters</p>
      </div>

      {/* Display Sparks */}
      {sparks.map((spark, index) => (
        <div key={spark.sparkId} className="spark-post">
          <div className="spark-header">
            <img src={profilePic} alt="Profile" className="profile-pic" />
            <span className="username">{username}</span>
          </div>
          <p className="spark-content">{spark.sparkText}</p>
        </div>
      ))}

      {/* Button for adding a new spark */}
      {sparks.length > 0 ? (
        <button className="add-spark-button" onClick={() => setShowDialog(true)}>
          <span className="plus-icon">+</span> Add Spark
        </button>
      ) : (
        <button className="create-spark-button" onClick={() => setShowDialog(true)}>
          Create Spark
        </button>
      )}

      {/* Spark Dialogue Box */}
      {showDialog && (
        <div className="dialogue-box" ref={dialogRef} tabIndex="-1">
          <div className="dialogue-header">
            <img src={profilePic} alt="Profile" className="profile-pic" />
            <span className="username">{username}</span>
            <button className="close-button" onClick={() => setShowDialog(false)}>
              &times;
            </button>
          </div>
          <div
            className="spark-input"
            ref={sparkInputRef}
            contentEditable
            suppressContentEditableWarning
            onInput={() => setSparkText(sparkInputRef.current.innerText)}
            placeholder="What's on your mind?"
          ></div>
          <button className="post-button" onClick={handlePostSpark}>
            Post
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateSpark;
