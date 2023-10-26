import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css'


function Layout(props) {
  return (
      <div className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="head">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="head">
              Admin
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="head">
              Student
            </Link>
          </li>
          {props.children}
        </ul>
    </div>
  );
}

export default Layout;