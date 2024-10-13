import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';   // Default import
import Login from './components/Login';     // Default import
import Quiz from './components/Quiz';       // Default import
import Leaderboard from './components/Leaderboard'; // Default import
import Profile from './components/Profile'; // Default import
import ForgotPassword from './components/ForgotPassword'; // Default import
import ResetPassword from './components/ResetPassword';   // Default import
import NavigationBar from './components/NavigationBar';   // Default import
import QuizHome from './components/QuizHome';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy'; // Import the component
import Source from './components/Source';
import './assets/styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/navbar" element={<NavigationBar />} />
        <Route path="/quiz-home" element={<QuizHome />} />
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        
        <Route path="/source" element={<Source />} />
      </Routes>
    </Router>
  );
}

export default App;
