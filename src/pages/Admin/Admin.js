import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import './Admin.css'
import { useDataContext } from '../../context/FetchDeleteData';

function Admin() {
    const {fetchAdmin} = useDataContext();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");
        const match = await fetchAdmin(email,password);
        try{
          if(match){
            navigate("admin")
          }
          else{
            setError("You are not allowed as admin")
          }
          
        }catch (err){
          setError(err.message)
        }
      }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Alert variant="danger">{error.toString()}</Alert>
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
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Admin
