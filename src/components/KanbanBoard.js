import React, { useState } from 'react';
import Column from './Column';

function KanbanBoard({ columns, setColumns, moveColumn }) {
  const [draggingItem, setDraggingItem] = useState(null);

  const onDragStart = (item, columnId) => {
    setDraggingItem({ ...item, sourceColumnId: columnId });
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (columnId) => {
    if (draggingItem) {
      const updatedColumns = columns.map(column => {
        if (column.id === draggingItem.sourceColumnId) {
          return {
            ...column,
            items: column.items.filter(item => item.id !== draggingItem.id)
          };
        }
        if (column.id === columnId) {
          return {
            ...column,
            items: [...column.items, { ...draggingItem, columnId }]
          };
        }
        return column;
      });
      setColumns(updatedColumns);
      setDraggingItem(null);
    }
  };

  return (
    <div className="kanban-board">
      {columns.map(column => (
        <Column
          key={column.id}
          column={column}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
          setColumns={setColumns}
          moveColumn={moveColumn}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;
