import React from 'react';
import '../../css/modals/create_modal.css'; // Importing styles
import { FaAirbnb, FaBook, FaFire, FaTwitch } from 'react-icons/fa';

const CreateModal = ({ onClose }) => {
  const handleCardClick = (path) => {
    // Replace with actual navigation logic
    window.location.href = path;
  };

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content-create" onClick={(e) => e.stopPropagation()}>
        <div className="modal-item" onClick={() => handleCardClick('/create-thread')}>
          <div className="icon-create"> {/* Replace with actual icon */}
            <FaTwitch/>
          </div>
          <div className="text">
            <h3>Create a Thread</h3>
            <p>Create sparks and make your story!!!</p>
          </div>
          <div className="arrow">
            <span>&rarr;</span>
          </div>
        </div>

        <div className="modal-item" onClick={() => handleCardClick('/create-solo')}>
          <div className="icon-create">
            <FaBook/>
          </div>
          <div className="text">
            <h3>Create a Solo Story</h3>
            <p>Write a whole story, and let other explore your imagination!!</p>
          </div>
          <div className="arrow">
            <span>&rarr;</span>
          </div>
        </div>

        <div className="modal-item" onClick={() => handleCardClick('/use-loomai')}>
          <div className="icon-create">
            <FaFire/>
          </div>
          <div className="text">
            <h3>Use LoomAI, your own AI </h3>
            <p>A handy AI assitant which help you get a start to you stroy or spraks!!!</p>
          </div>
          <div className="arrow">
            <span>&rarr;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
