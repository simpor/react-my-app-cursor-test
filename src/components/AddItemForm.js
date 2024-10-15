import React, { useState } from 'react';

function AddItemForm({ addItem, onCancel }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addItem(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="fade-in">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter item text"
        autoFocus
      />
      <button type="submit">Add</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default AddItemForm;
