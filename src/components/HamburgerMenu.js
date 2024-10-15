import React, { useState } from 'react';
import AddColumnForm from './AddColumnForm';

function HamburgerMenu({ addColumn }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <button className="hamburger-icon" onClick={toggleMenu}>☰</button>
      {isOpen && (
        <div className="menu-content">
          <h3>Add New Column</h3>
          <AddColumnForm addColumn={addColumn} />
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
