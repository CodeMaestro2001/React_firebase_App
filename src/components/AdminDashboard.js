import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.jpg'; // Import the image from the same directory
import NavigationBar from './NavigationBar';

function AdminDashboard() {
  const navigate = useNavigate();

  // Function to navigate back to the user signup page
  const handleBackToUser = () => {
    navigate('/signup'); // Redirect to the user signup page
  };

  return (
    <div>
      <NavigationBar/>
    <div style={styles.background}>
      <div style={styles.container}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        {/* Other admin functionalities */}

        {/* Back to User Button */}
        <button onClick={handleBackToUser} style={styles.button}>
          Back to User
        </button>
      </div>
    </div>
    </div>
  );
}

// Styles for the Admin Dashboard
const styles = {
  background: {
    backgroundImage: `url(${logo})`, // Use the imported image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Full viewport height
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for content
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
    textAlign: 'center',
  },
  title: {
    color: '#333',
    fontSize: '36px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    fontSize: '16px',
  },
};

export default AdminDashboard;
