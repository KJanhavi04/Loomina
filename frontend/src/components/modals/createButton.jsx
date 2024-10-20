import React, { useState } from 'react';
import CreateModal from './createModal';
import '../../css/modals/create_button.css'; // Importing styles
import { FaAcquisitionsIncorporated, FaEdit, FaPage4, FaPlus } from 'react-icons/fa';
import { IoCreateOutline } from "react-icons/io5";

const CreateButton = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <button className="create-button" onClick={handleClick}>
      <span><IoCreateOutline className='icon-button'/></span>Create
      </button>
      {open && <CreateModal onClose={handleClick} />}
    </>
  );
};

export default CreateButton;
