import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup'; 
import Login from './Login';   

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/signup" style={{ marginRight: '10px' }}>Signup</Link>
          <Link to="/login">Login</Link>
        </nav>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
