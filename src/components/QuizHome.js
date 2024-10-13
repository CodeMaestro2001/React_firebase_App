import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from './NavigationBar';



function QuizHome() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const user = state?.user;
  // Function to handle category selection
  const handleCategoryClick = (category) => {
    navigate('/quiz', { state: { user, category } }); // Pass user and category
  };






  return (
    <div>
      <NavigationBar/>
    <div style={quizHomeStyle}>
    

      <h1>Select Your Quiz Category</h1>
      <div style={categoryContainerStyle}>
        <div style={categoryCardStyle} onClick={() => handleCategoryClick('cyberSecurity')}>
          <h3>Password Security</h3>
          
        </div>
        <div style={categoryCardStyle} onClick={() => handleCategoryClick('socialMedia')}>
          <h3>Phishing Awareness</h3>
        </div>
        <div style={categoryCardStyle} onClick={() => handleCategoryClick('general')}>
          <h3>Safe Internet and Email Usage</h3>
        </div>

        <div style={categoryCardStyle} onClick={() => handleCategoryClick('dataprivacy')}>
          <h3>Data Privacy and Protection</h3>
        </div>

        <div style={categoryCardStyle} onClick={() => handleCategoryClick('devicenetwork')}>
          <h3>Device and Network Security</h3>
        </div>
      </div>
    </div>
    </div>
  );
}

// Styles for the quiz home page
const quizHomeStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #00B4DB, #0083B0)',
  color: '#fff',
  textAlign: 'center',
  fontFamily: 'Arial, sans-serif',
};

const categoryContainerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '80%',
  marginTop: '20px',
};

const categoryCardStyle = {
  backgroundColor: '#fff',
  color: '#333',
  padding: '40px',
  borderRadius: '8px',
  width: '250px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  textAlign: 'center',
};

categoryCardStyle[':hover'] = {
  transform: 'scale(1.05)',
};



export default QuizHome;
