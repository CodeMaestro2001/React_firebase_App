import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

function ResetPassword() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data) => {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (user && user.email === location.state.email) {
      // Update the user's password in localStorage
      user.password = data.password;
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert('Password reset successful! Please log in with your new password.');
      navigate('/login');
    } else {
      alert('Error resetting password. Please try again.');
    }
  };

  return (
    <div style={styles.page}>
      <div className="auth-container" style={styles.container}>
        <h2 style={styles.header}>Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <input 
            {...register('password')} 
            type="password" 
            placeholder="Enter new password" 
            style={styles.input} 
            required 
          />
          <button type="submit" style={styles.button}>Reset Password</button>
        </form>
      </div>
    </div>
  );
}

// Styles for reset password page
const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #FF7E5F, #FEB47B)',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  container: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  header: {
    marginBottom: '30px',
    color: '#333',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#f7f7f7',
    outline: 'none',
  },
  button: {
    padding: '15px',
    backgroundColor: '#2ECC71',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default ResetPassword;
