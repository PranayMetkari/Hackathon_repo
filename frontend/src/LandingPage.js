// LandingPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // 👈 Add this

function LandingPage() {

   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    setIsLoggedIn(email !== null);

    const handleStorageChange = () => {
      const updatedEmail = localStorage.getItem('userEmail');
      setIsLoggedIn(updatedEmail !== null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="landing-container">
      {/* Navbar */}
    <header className="navbar">
        <div className="logo">Vendors Seva</div>
        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="/supplier-dashboard">Dashboard</a>

          {!isLoggedIn ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" className="register-btn">Register</Link>
            </>
          ) : (
            <>
              <Link to="/supplier-dashboard">Dashboard</Link>
              <button onClick={handleLogout} className="register-btn">Logout</button>
            </>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Join the Supplier Network</h1>
          <p>Connect with thousands of street food vendors and grow your business through our verified platform.</p>
          <Link to="/signup" className="cta-btn">Get Started</Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>Why Join Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Verified Orders</h3>
            <p>Receive real-time orders from nearby vendors.</p>
          </div>
          <div className="feature-card">
            <h3>Geo-Based Discovery</h3>
            <p>Vendors can find your services based on location.</p>
          </div>
          <div className="feature-card">
            <h3>Minimal Communication</h3>
            <p>Orders happen via WhatsApp with minimal friction.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2>About the Platform</h2>
        <p>We're building a structured and smart way for suppliers to connect with food vendors across India, helping improve trust, delivery, and business flow.</p>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="footer-grid">
          <div>
            <h3>Vendors Seva</h3>
            <p>Empowering India's street food network.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Register</Link></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <p>Email: contact@VendorsSeva.in</p>
            <p>Phone: +91-9876543210</p>
          </div>
        </div>
        <p className="copyright">© 2025 Bitlords Team</p>
      </footer>
    </div>
  );
}

export default LandingPage;


