import React from 'react';
import './NavigationBar.css'; // Link to the CSS file for styles

function NavigationBar() {
  return (
    <nav className="navbar">
      <a href="/" className="nav-logo">MyApp</a>
      <div className="nav-links">
        <a href="/signup">Signup</a>
        <a href="/login">Login</a>
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
        <a href="/source" target="_blank" rel="noopener noreferrer">Source</a>


      </div>
    </nav>
  );
}

export default NavigationBar;
