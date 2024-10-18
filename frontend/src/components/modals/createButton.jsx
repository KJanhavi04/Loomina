import React, { useState } from 'react';
import CreateModal from './createModal';
import '../../css/modals/create_button.css'; // Importing styles
import { FaPage4, FaPlus } from 'react-icons/fa';

const CreateButton = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <button className="create-button" onClick={handleClick}>
        <FaPlus/>
      </button>
      {open && <CreateModal onClose={handleClick} />}
    </>
  );
};

export default CreateButton;
