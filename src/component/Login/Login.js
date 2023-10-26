import React from 'react'
import { useState } from 'react';
import { useUserAuth } from '../../context/UserAuth';
import { useNavigate } from 'react-router-dom';
import {Alert} from 'react-bootstrap';
import './Login.css'


function Login(props) {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {logIn,userId} = useUserAuth();
    const[error,setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");
        try{
          await logIn(email,password);
          if(props.onLogin){
            props.onLogin(email,password);
          }
          navigate(`${userId}`)
        }catch (err){
          setError(err.message)
        }
      }



  return (
    <div className="login-container">
      <h2>Login</h2>
      <Alert variant="danger">{error}</Alert>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e)=> setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e)=> setPassword(e.target.value)}
          required
        />
        <button className='button1' type="submit">Login</button>
        {props.children}
      </form>
    </div>
  )
}

export default Login
