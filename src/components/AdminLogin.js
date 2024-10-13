import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Hardcoded admin credentials
  const adminCredentials = {
    email: 'sasith@gmail.com',
    password: 'sasith123',
  };

  const onSubmit = (data) => {
    setLoading(true);

    // Check if the entered credentials match the hardcoded admin credentials
    if (data.email === adminCredentials.email && data.password === adminCredentials.password) {
      alert('Admin login successful!');
      // Redirect to admin dashboard
      navigate('/admin-dashboard');
    } else {
      // If credentials do not match, show an error message
      setError('email', { message: 'Invalid admin credentials!' });
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div className="auth-container" style={styles.container}>
        <h2 style={styles.header}>Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          {/* Email Input */}
          <input
            {...register('email', { required: 'Email is required' })}
            placeholder="Admin Email"
            style={styles.input}
            required
          />
          {errors.email && <p style={styles.error}>{errors.email.message}</p>}

          {/* Password Input */}
          <input
            {...register('password', { required: 'Password is required' })}
            type="password"
            placeholder="Password"
            style={styles.input}
            required
          />
          {errors.password && <p style={styles.error}>{errors.password.message}</p>}

          {/* Login Button */}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Styles for the login page
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
    backgroundColor: '#FF6B6B',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
  },
};

export default AdminLogin;
