import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/App.css'; // Assuming you have your styles here

function Home() {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz'); // Navigate to the quiz page
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <Link to="/about-us">About Us</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
        <div className="header-right">
          <button onClick={handleStartQuiz} className="quiz-btn">Add Quiz</button>
          <Link to="/profile" className="profile-icon">
            <img src="/assets/profile-icon.png" alt="Profile" /> {/* Profile icon */}
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="main-content">
        <h1>Welcome to the Cybersecurity Quiz Game!</h1>
        <p>Test your cybersecurity knowledge by taking our quiz!</p>
        <button onClick={handleStartQuiz} className="start-quiz-btn">Start Quiz</button>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Cybersecurity Quiz Game. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
