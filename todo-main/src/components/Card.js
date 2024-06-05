import React from 'react';

function Card({ task }) {
  return (
    <div className={`card ${task.category.toLowerCase()}`}>
      <p>{task.text}</p>
      <div className="card-buttons">
        <button className="close">Close</button>
        <button className="delete">Delete</button>
      </div>
    </div>
  );
}

export default Card;
