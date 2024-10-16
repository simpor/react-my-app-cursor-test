import React, { useState, useRef } from 'react';
import Column from './Column';

function KanbanBoard({ columns, setColumns, moveColumn }) {
  const [draggingItem, setDraggingItem] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const draggedItemRef = useRef(null);

  const onDragStart = (item, columnId) => {
    setDraggingItem({ ...item, sourceColumnId: columnId });
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (columnId) => {
    if (draggingItem) {
      moveItem(draggingItem, columnId);
    }
  };

  const moveItem = (item, targetColumnId) => {
    const updatedColumns = columns.map(column => {
      if (column.id === item.sourceColumnId) {
        return {
          ...column,
          items: column.items.filter(i => i.id !== item.id)
        };
      }
      if (column.id === targetColumnId) {
        return {
          ...column,
          items: [...column.items, { ...item, columnId: targetColumnId }]
        };
      }
      return column;
    });
    setColumns(updatedColumns);
    setDraggingItem(null);
  };

  const onTouchStart = (e, item, columnId) => {
    setDraggingItem({ ...item, sourceColumnId: columnId });
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    draggedItemRef.current = e.target;
    e.target.style.opacity = '0.5';
  };

  const onTouchMove = (e) => {
    if (!draggingItem) return;
    
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    
    draggedItemRef.current.style.transform = `translate(${touchX - touchStartX}px, ${touchY - touchStartY}px)`;
  };

  const onTouchEnd = (e, columnId) => {
    if (!draggingItem) return;
    
    draggedItemRef.current.style.opacity = '1';
    draggedItemRef.current.style.transform = 'none';
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const dropTarget = document.elementFromPoint(endX, endY);
    
    const targetColumn = dropTarget.closest('.column');
    if (targetColumn) {
      const targetColumnId = parseInt(targetColumn.dataset.columnId);
      moveItem(draggingItem, targetColumnId);
    }
    
    setDraggingItem(null);
    setTouchStartX(null);
    setTouchStartY(null);
    draggedItemRef.current = null;
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
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          setColumns={setColumns}
          moveColumn={moveColumn}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;
