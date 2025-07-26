// src/Login.js
import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMsg('Logged in successfully!');
      navigate('/dashboard');
    } catch (error) {
      setMsg(`${error.message}`);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setMsg("👋 Logged out!");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br/>
        <button type="submit">Login</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}

export default Login;
