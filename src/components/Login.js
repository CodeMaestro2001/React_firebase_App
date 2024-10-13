import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { auth } from './Firebase'; // Import Firebase auth
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import NavigationBar from './NavigationBar';

function Login() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false); // Track loading state
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false); // State to toggle forgot password
  const [emailSent, setEmailSent] = useState(false); // Track if reset email was sent
  const navigate = useNavigate();

  // Handle Login
  const onSubmit = async (data) => {
    if (forgotPasswordMode) {
      // Handle Forgot Password - Send Reset Email
      setLoading(true);
      try {
        await sendPasswordResetEmail(auth, data.email);
        setEmailSent(true);
        setLoading(false);
        alert('Password reset email sent! Please check your email.');
      } catch (error) {
        setError("email", { message: error.message });
        setLoading(false);
      }
    } else {
      // Regular Login
      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
        
        alert('Login successful!');
        navigate('/profile', { state: { user: { email: user.email, uid: user.uid } } }); // Only pass serializable properties
      } catch (error) {
        setError('email', { message: 'Invalid credentials!' });
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <NavigationBar/>
    <div style={styles.page}>
      <div className="auth-container" style={styles.container}>
        <h2 style={styles.header}>{forgotPasswordMode ? 'Reset Password' : 'Login'}</h2>

        {/* Login or Forgot Password Form */}
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <input
            {...register('email', { required: 'Email is required' })}
            placeholder="Email"
            style={styles.input}
            required
          />
          {errors.email && <p style={styles.error}>{errors.email.message}</p>}

          {!forgotPasswordMode && (
            <>
              <input
                {...register('password', { required: 'Password is required' })}
                type="password"
                placeholder="Password"
                style={styles.input}
                required
              />
              {errors.password && <p style={styles.error}>{errors.password.message}</p>}
            </>
          )}

          {/* Submit Button */}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? (forgotPasswordMode ? 'Sending reset email...' : 'Logging in...') : (forgotPasswordMode ? 'Send Reset Email' : 'Login')}
          </button>
        </form>

        {/* Forgot Password Link */}
        {!forgotPasswordMode && (
          <p onClick={() => setForgotPasswordMode(true)} style={styles.forgotPasswordLink}>
            Forgot Password?
          </p>
        )}

        {/* Success message when email is sent */}
        {forgotPasswordMode && emailSent && (
          <p style={styles.successMessage}>
            Reset email sent! Check your inbox to reset your password.
          </p>
        )}
      </div>
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
    background: 'linear-gradient(135deg, #00C6FF, #0072FF)',
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
    backgroundColor: '#007bff',
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
  forgotPasswordLink: {
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
    marginTop: '10px',
  },
  successMessage: {
    color: '#28a745',
    fontSize: '1rem',
  },
};

export default Login;
