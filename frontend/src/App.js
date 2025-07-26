import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup'; 
import Login from './Login';   
import SupplierDashboard from './SupplierDashboard';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/signup" style={{ marginRight: '10px' }}>Signup</Link>
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/supplier-dashboard">Supplier Dashboard</Link>
        </nav>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
