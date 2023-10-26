import React from 'react'
import { useState } from 'react';
import {Link , useNavigate} from 'react-router-dom'
import './SignUp.css'
import { useUserAuth } from '../../context/UserAuth';
import {Alert} from 'react-bootstrap';
import { db } from '../../firebase';
import { collection, addDoc,getDocs, setDoc,doc } from 'firebase/firestore';

function SignUp() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [userName,setUserName] = useState("");
  const {signUp} = useUserAuth();
  const[error,setError] = useState("");
  const navigate = useNavigate();

  const userDocData = {
    username:userName,
    email:email
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError("");
    if(password !== confirmPassword){
      setError("Password do not match");
      return;
    }
    try{
      const userCredential = await signUp(email,password);
      const userId = userCredential.user.uid;
      const userCollection = collection(db,'users');

      const userDocRef = doc(userCollection,userId);

      await setDoc(userDocRef,userDocData);
      
      navigate("/student")
    }catch (err){
      setError(err.message)
    }
  }
  return (
    <div className="login-container">
      <h2>SignUp</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          name="username"
          placeholder="UserName"
          onChange={(e)=>setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Confirm Password"
          onChange={(e)=>setConfirmPassword(e.target.value)}
          required
        />
        <button className='button1' type="submit" >SignUp</button>
        <br/>
    <p>Already have an account? <Link to="/student" className="signup">Login</Link></p>
      </form>
    </div>
  );
}

export default SignUp
