import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuth';
import { FaBars,FaTimes } from 'react-icons/fa';

import './Layout.css'


function Layout(props) {

  const {isAuthenticated,logOut} = useUserAuth();
  const [click,setClick] = useState(false);
  const navigate = useNavigate();
  
  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await logOut();
      navigate('/student');
    } catch (err) {
      console.log(err.message);
    }
  };

  const toggle=()=>{
    setClick(!click);
  }

  console.log(isAuthenticated);

  return (
      <div className="navbar">
        <div className='navbar_left'>
          <h1>Quiz App</h1>
        </div>
        <ul className={click ? "navbar_right active" : "navbar_right"}>
          <li >
            <Link to="/" className="head">
              Home
            </Link>
          </li>
          <li >
            <Link to="/admin" className="head">
              Admin
            </Link>
          </li>
          <li >
            <Link to="/student" className="head">
              Student
            </Link>
          </li>
          {
            isAuthenticated && <button className="logout-button" onClick={handleLogOut}>
            <Link to="/student" className="logout">Logout</Link>
          </button>
          }
        </ul>
        <div className='menu'>
            {!click ? <FaBars onClick={toggle} size={25} color='white' /> : <FaTimes onClick={toggle} size={25} color='white'/>}
          </div>
          {props.children}
    </div>
  );
}

export default Layout;