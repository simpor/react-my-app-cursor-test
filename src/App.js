import React, { useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
import HamburgerMenu from './components/HamburgerMenu';
import './App.css';

function App() {
  const [columns, setColumns] = useState([
    { id: 1, title: 'To Do', items: [] },
    { id: 2, title: 'In Progress', items: [] },
    { id: 3, title: 'Done', items: [] },
  ]);

  const addColumn = (title) => {
    const newColumn = {
      id: Date.now(),
      title: title,
      items: [],
    };
    setColumns([...columns, newColumn]);
  };

  const moveColumn = (columnId, direction) => {
    const columnIndex = columns.findIndex(col => col.id === columnId);
    if ((direction === 'left' && columnIndex > 0) || (direction === 'right' && columnIndex < columns.length - 1)) {
      const newColumns = [...columns];
      const temp = newColumns[columnIndex];
      newColumns[columnIndex] = newColumns[columnIndex + (direction === 'left' ? -1 : 1)];
      newColumns[columnIndex + (direction === 'left' ? -1 : 1)] = temp;
      setColumns(newColumns);
    }
  };

  return (
    <div className="App">
      <h1>Kanban Board</h1>
      <HamburgerMenu addColumn={addColumn} />
      <KanbanBoard columns={columns} setColumns={setColumns} moveColumn={moveColumn} />
    </div>
  );
}

export default App;
