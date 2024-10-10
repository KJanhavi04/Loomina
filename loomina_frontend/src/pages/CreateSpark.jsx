// import React, { useState, useRef, useEffect } from 'react';
// import '../css/CreateSpark.css';

// const CreateSpark = () => {
//   const [showDialog, setShowDialog] = useState(false);
//   const [sparks, setSparks] = useState([]);
//   const [currentSpark, setCurrentSpark] = useState('');
//   const [isBold, setIsBold] = useState(false);
//   const [isItalic, setIsItalic] = useState(false);
//   const [user, setUser] = useState(null); // State to hold user info

//   const dialogRef = useRef(null); // Reference for the dialog box
//   const sparkInputRef = useRef(null); // Reference for the contentEditable spark input

//   // Hardcoded thread title and prompt
//   const threadTitle = "Game of Love";
//   const promptText = "When women denied marrying freedom fighters";

//   // Fetch user details
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await fetch('http://localhost:5000/user', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();
//         if (response.ok) {
//           setUser(data); // Set the user details, including username
//         } else {
//           console.log('Failed to fetch user details:', data.message);
//         }
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     };

//     fetchUser();
//   }, []);

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

//   if (!user) {
//     return <div>Loading...</div>;
//   }

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
//             <img src={'path/to/profile-pic.jpg'} alt="Profile" className="profile-pic" />
//             <span className="username">{user.username}</span>
//           </div>
//           <p className="spark-content" dangerouslySetInnerHTML={{ __html: spark }}></p>
//         </div>
//       ))}

//       {/* Dialog for creating new spark */}
//       {showDialog && (
//         <div className="dialogue-box" ref={dialogRef} tabIndex="-1">
//           <div className="dialogue-header">
//             <img src={'path/to/profile-pic.jpg'} alt="Profile" className="profile-pic" />
//             <span className="username">{user.username}</span>
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
//             className="spark-input" // Use class for styling instead of inline styles
//             ref={sparkInputRef}
//             contentEditable
//             suppressContentEditableWarning
//             onInput={handleInput}
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

// export default CreateSpark;

import React, { useState, useRef, useEffect } from 'react';
import '../css/CreateSpark.css';

const CreateSpark = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [sparks, setSparks] = useState([]);
  const [currentSpark, setCurrentSpark] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [user, setUser] = useState(null); // State to hold user info

  const dialogRef = useRef(null); // Reference for the dialog box
  const sparkInputRef = useRef(null); // Reference for the contentEditable spark input

  // Hardcoded thread title and prompt
  const threadTitle = "Game of Love";
  // const threadId = "hardcoded_threadId"; // Replace with actual thread ID
  const promptText = "When women denied marrying freedom fighters";

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data); // Set the user details, including username
        } else {
          console.log('Failed to fetch user details:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUser();
  }, []);

  const handlePostSpark = async () => {
    if (currentSpark.trim() !== '') {
      try {
        const response = await fetch('http://localhost:5000/spark/create-spark', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token if required
          },
          
          body: JSON.stringify({
            userId: user.id,
            // threadId: threadId, // Make sure you have threadId available in your component
            sparkText: currentSpark,
            timestamp: new Date().toISOString(), // Use the current timestamp
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(userId)
        const data = await response.json();
        console.log(data.message); // Optional: Log the response message
        setSparks([...sparks, currentSpark]); // Update local state
        setCurrentSpark('');
        setShowDialog(false);
      } catch (error) {
        console.error('Error posting spark:', error);
      }
    }
  };
  

  // Toggle bold styling using document.execCommand
  const toggleBold = () => {
    document.execCommand('bold');
    setIsBold(!isBold);
  };

  // Toggle italic styling using document.execCommand
  const toggleItalic = () => {
    document.execCommand('italic');
    setIsItalic(!isItalic);
  };

  // Capture text content when input is modified
  const handleInput = () => {
    setCurrentSpark(sparkInputRef.current.innerHTML);
  };

  // Scroll and focus on the dialogue box when it's opened
  useEffect(() => {
    if (showDialog && dialogRef.current) {
      dialogRef.current.scrollIntoView({ behavior: 'smooth' }); // Scrolls to the dialog box
      dialogRef.current.focus(); // Focuses on the dialog box
    }
  }, [showDialog]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="create-spark-container">
      {/* Hardcoded Thread Title and Prompt */}
      <div className="thread-details">
        <h1 className="thread-title">{threadTitle}</h1>
        <p className="prompt-text">Prompt: {promptText}</p>
      </div>

      {/* Display Sparks */}
      {sparks.map((spark, index) => (
        <div key={index} className="spark-post">
          {/* Profile Picture and Username for each spark */}
          <div className="spark-header">
            <img src={'path/to/profile-pic.jpg'} alt="Profile" className="profile-pic" />
            <span className="username">{user.username}</span>
          </div>
          <p className="spark-content" dangerouslySetInnerHTML={{ __html: spark }}></p>
        </div>
      ))}

      {/* Dialog for creating new spark */}
      {showDialog && (
        <div className="dialogue-box" ref={dialogRef} tabIndex="-1">
          <div className="dialogue-header">
            <img src={'path/to/profile-pic.jpg'} alt="Profile" className="profile-pic" />
            <span className="username">{user.username}</span>
            <button className="close-button" onClick={() => setShowDialog(false)}>
              &times;
            </button>
          </div>
          <div className="toolbar">
            <button className={`toolbar-button ${isBold ? 'active' : ''}`} onClick={toggleBold}>
              B
            </button>
            <button className={`toolbar-button ${isItalic ? 'active' : ''}`} onClick={toggleItalic}>
              I
            </button>
          </div>
          <div
            className="spark-input" // Use class for styling instead of inline styles
            ref={sparkInputRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
          ></div>
          <button className="post-button" onClick={handlePostSpark}>
            Post
          </button>
        </div>
      )}

      {/* Button for adding a new spark */}
      {sparks.length > 0 && (
        <button className="add-spark-button" onClick={() => setShowDialog(true)}>
          <span className="plus-icon">+</span> Add Spark
        </button>
      )}

      {/* Initial "Create Spark" button if no sparks are present */}
      {sparks.length === 0 && (
        <button className="create-spark-button" onClick={() => setShowDialog(true)}>
          Create Spark
        </button>
      )}
    </div>
  );
};

export default CreateSpark;

