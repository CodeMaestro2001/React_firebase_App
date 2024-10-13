import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from './Firebase'; // Import Firebase Firestore instance
import { collection, getDocs } from 'firebase/firestore';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.user;
  const category = state?.category;

  // Fetch leaderboard data from Firestore
  const fetchUserDataFromFirestore = useCallback(async () => {
    if (!category) return;
    
    try {
      const leaderboardRef = collection(db, `${category}Leaderboard`);
      const querySnapshot = await getDocs(leaderboardRef);
      const leaderboardData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      
      // Sort by score in descending order
      leaderboardData.sort((a, b) => b.score - a.score);

      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  }, [category]);

  // Fetch data when the component mounts or category changes
  useEffect(() => {
    if (!user || !category) {
      navigate('/login');
      return;
    }

    fetchUserDataFromFirestore(); // Fetch leaderboard data

  }, [user, category, navigate, fetchUserDataFromFirestore]);

  const goToProfile = () => {
    navigate('/profile', { state: { user } });
  };

  const backToQuiz = () => {
    navigate('/quiz-home', { state: { user } });
  };

  // Sort leaderboard by score (descending order)
  const sortedLeaderboard = leaderboard.sort((a, b) => b.score - a.score);

  return (
    <div style={pageStyle}>
      <div className="leaderboard-container" style={containerStyle}>
        <h2 style={titleStyle}>🏆 {category.charAt(0).toUpperCase() + category.slice(1)} Leaderboard</h2>
        <div style={scrollContainerStyle}>
          <div style={gridContainerStyle}>
            {sortedLeaderboard.length > 0 ? (
              sortedLeaderboard.map((entry, index) => (
                <div
                  key={index}
                  style={{ ...cardStyle, borderColor: entry.email === user.email ? '#FFD700' : '#E1E1E1' }}
                >
                  <span style={rankStyle}>{index + 1}.</span>
                  <div>
                    <p style={emailStyle}>{entry.email}</p>
                    <p style={scoreStyle}>Score: {entry.score}</p>
                    {entry.email === user.email && <p style={userTagStyle}>(You)</p>}
                  </div>
                </div>
              ))
            ) : (
              <p>No entries yet for this category.</p>
            )}
          </div>
        </div>
        <button onClick={goToProfile} style={buttonStyle}>Go to Profile</button>
        <button onClick={backToQuiz} style={buttonStyle}>Back to quiz</button>
      </div>
    </div>
  );
}

// Internal CSS with scrollable container
const pageStyle = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #00B4DB, #0083B0)',
  padding: '20px',
  fontFamily: 'Arial, sans-serif'
};

const containerStyle = {
  background: '#FFFFFF',
  border: '1px solid #E1E1E1',
  borderRadius: '12px',
  padding: '30px',
  width: '600px',
  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

const titleStyle = {
  color: '#333',
  marginBottom: '20px',
  fontSize: '24px',
  fontWeight: '600',
};

const scrollContainerStyle = {
  maxHeight: '400px',
  overflowY: 'auto',
  paddingRight: '10px',
};

const gridContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '20px',
};

const cardStyle = {
  background: '#FFF',
  padding: '20px',
  borderRadius: '8px',
  border: '2px solid #E1E1E1',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
  textAlign: 'left',
};

const rankStyle = {
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#4A90E2',
  marginBottom: '10px',
};

const emailStyle = {
  margin: '0',
  fontSize: '16px',
  fontWeight: '500',
  color: '#333',
};

const scoreStyle = {
  margin: '5px 0 10px 0',
  fontSize: '14px',
  color: '#555',
};

const userTagStyle = {
  fontSize: '12px',
  color: '#FFD700',
  fontWeight: 'bold',
};

const buttonStyle = {
  marginTop: '20px',
  padding: '12px 25px',
  fontSize: '16px',
  color: 'white',
  backgroundColor: '#4A90E2',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

export default Leaderboard;
