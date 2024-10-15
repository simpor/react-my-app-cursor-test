import React, { useState } from 'react';
import AddItemForm from './AddItemForm';

function Column({ column, onDragStart, onDragOver, onDrop, setColumns, moveColumn }) {
  const [showAddForm, setShowAddForm] = useState(false);

  const addItem = (text) => {
    const newItem = {
      id: Date.now(),
      text: text,
      columnId: column.id,
    };
    setColumns(prevColumns => prevColumns.map(col => {
      if (col.id === column.id) {
        return { ...col, items: [...col.items, newItem] };
      }
      return col;
    }));
    setShowAddForm(false);
  };

  return (
    <div
      className="column"
      onDragOver={onDragOver}
      onDrop={() => onDrop(column.id)}
    >
      <div className="column-header">
        <button className="column-move-button" onClick={() => moveColumn(column.id, 'left')}>←</button>
        <h2>{column.title}</h2>
        <button className="column-move-button" onClick={() => moveColumn(column.id, 'right')}>→</button>
      </div>
      <div className="column-content">
        {column.items.map(item => (
          <div
            key={item.id}
            className="item fade-in"
            draggable
            onDragStart={() => onDragStart(item, column.id)}
          >
            {item.text}
          </div>
        ))}
      </div>
      {showAddForm ? (
        <AddItemForm addItem={addItem} onCancel={() => setShowAddForm(false)} />
      ) : (
        <button className="add-item-button" onClick={() => setShowAddForm(true)}>+ Add Item</button>
      )}
    </div>
  );
}

export default Column;
