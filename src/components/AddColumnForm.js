import React, { useState } from 'react';

function AddColumnForm({ addColumn }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addColumn(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-column-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter column title"
      />
      <button type="submit">Add Column</button>
    </form>
  );
}

export default AddColumnForm;
