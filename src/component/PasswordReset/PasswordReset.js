import React from 'react'
import { useState } from 'react';
import { useUserAuth } from '../../context/UserAuth';
import './PasswordReset.css'

function PasswordReset() {
    const {resetPassword} = useUserAuth();
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState(null);

    const handleReset = async () => {
        try{
            await resetPassword(email);
            setMessage("Password reset email sent.Check your inbox.");
        }catch(err){
            setMessage(err.message);
        }
    }
  return (
    <div class="login-container">
      <h2>Password Reset</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleReset}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  )
}

export default PasswordReset
