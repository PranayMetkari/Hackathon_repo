// src/Login.js
import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMsg('Logged in successfully!');
      setIsLoggedIn(true);
    } catch (error) {
      setMsg(`${error.message}`);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
    setMsg("👋 Logged out!");
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h2>Welcome, {auth.currentUser.email}</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br/>
            <button type="submit">Login</button>
          </form>
        </>
      )}
      <p>{msg}</p>
    </div>
  );
}

export default Login;
