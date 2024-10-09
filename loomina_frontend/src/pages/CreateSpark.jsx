// import React, { useState } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import '../css/CreateSpark.css';


const CreateSpark = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [sparks, setSparks] = useState([]);
  const [currentSpark, setCurrentSpark] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const dialogRef = useRef(null); // Reference for the dialog box

  const handlePostSpark = () => {
    if (currentSpark.trim() !== '') {
      setSparks([...sparks, currentSpark]);
      setCurrentSpark('');
      setShowDialog(false);
    }
  };

  const toggleBold = () => {
    setIsBold(!isBold);
  };

  const toggleItalic = () => {
    setIsItalic(!isItalic);
  };

  useEffect(() => {
    if (showDialog && dialogRef.current) {
      dialogRef.current.scrollIntoView({ behavior: 'smooth' }); // Scrolls to the dialog box
      dialogRef.current.focus(); // Focuses on the dialog box
    }
  }, [showDialog]);

  return (
    <div className="create-spark-container">
      {sparks.map((spark, index) => (
        <div key={index} className="spark-post">
          <p>{spark}</p>
        </div>
      ))}

      {showDialog && (
        <div className="dialogue-box" ref={dialogRef} tabIndex="-1">
          <div className="dialogue-header">
            <img src="path/to/profile-pic.jpg" alt="Profile" className="profile-pic" />
            <span className="username">Username</span>
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
            className="spark-input"
            contentEditable
            suppressContentEditableWarning
            style={{
              fontWeight: isBold ? 'bold' : 'normal',
              fontStyle: isItalic ? 'italic' : 'normal',
            }}
            onInput={(e) => setCurrentSpark(e.currentTarget.textContent)}
          ></div>
          <button className="post-button" onClick={handlePostSpark}>
            Post
          </button>
        </div>
      )}

      {sparks.length > 0 && (
        <button className="add-spark-button" onClick={() => setShowDialog(true)}>
          <span className="plus-icon">+</span> Add Spark
        </button>
      )}

      {sparks.length === 0 && (
        <button className="create-spark-button" onClick={() => setShowDialog(true)}>
          Create Spark
        </button>
      )}
    </div>
  );
};

export default CreateSpark;
