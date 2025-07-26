import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup'; 
import Login from './Login';   
import LandingPage from './LandingPage';
import SupplierDashboard from './SupplierDashboard';
import VendorSignup from './VendorSignup';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        {/* <nav style={{ padding: '10px', borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
          <Link to="/signup" style={{ marginRight: '10px' }}>Signup</Link>
          <Link to="/login">Login</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />  {/* ⬅️ Landing Page */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
           <Route path="/vendor-signup" element={<VendorSignup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
