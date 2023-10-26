// Card.js
import React from 'react';
import './Card.css';

function Card({ title, anotherComponent:AnotherComponent ,onClick}) {
  return (
    <div className="card">
      <div className="card-title">
        <h2>{title}</h2>
      </div>
      <div className="card-icon">
      </div>
      <button onClick={onClick}><AnotherComponent/></button>
    </div>
  );
}

export default Card;


