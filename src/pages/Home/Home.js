import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import your CSS file


function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Quiz App</h1>
      <div className="role-options">
        <div class='shape'>
        <div class='category1'></div>
        <Link to="/student" className="role-link">
          Student
        </Link>
        </div>
        <div class = 'shape'>
        <div class ='category1'></div>
        <Link to="/admin" className="role-link">
          Admin
        </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;