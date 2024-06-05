import React, { useState } from 'react';
import './App.css';
import './index.css';
import Card from './components/Card';

const categories = ['All', 'Work', 'Personal', 'Shopping'];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const tasks = [
    { id: 1, category: 'Work', text: 'Finish report' },
    { id: 2, category: 'Personal', text: 'Buy groceries' },
    { id: 3, category: 'Shopping', text: 'Order new shoes' },
  ];

  const filteredTasks = tasks.filter(task => 
    selectedCategory === 'All' || task.category === selectedCategory
  );

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
        <button className="create-task-button">Create Task</button>
      </header>
      <div className="category-container">
        {categories.map(category => (
          <div
            key={category}
            className={`category ${category === selectedCategory ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>
      <div className="container">
        {filteredTasks.map(task => (
          <Card key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default App;
