import React from 'react'
import {Link} from 'react-router-dom'
import Login from '../../component/Login/Login'
import { useUserAuth } from '../../context/UserAuth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Student.css'
import { Alert } from 'react-bootstrap'

function Student() {
  const {googleSignin,userId} = useUserAuth();
  const navigate = useNavigate();
  const [error,setError] = useState("");



const handleGoogleSignin = async (e) =>{
    e.preventDefault();
try{
    await googleSignin();
    navigate(`${userId}`);
}catch(err){
    setError(err.message);
}
}
  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Login>
      <button class="google-signup-button" onClick={handleGoogleSignin}>
        <span class="google-icon-wrapper">
            <img class="google-icon" src="./google.png" alt="Google Icon" />
        </span>
        <span class="btn-text">Sign Up with Google</span>
    </button>
        <p>Forgot Password?<Link to="forgot-password" className="signup">Reset Password</Link></p>
        <p>Create an Account?<Link to='signup' className="signup">SignUp</Link></p>
      </Login>
    </div>
  )
}

export default Student
