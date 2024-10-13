import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverOtp, setServerOtp] = useState('');
  const navigate = useNavigate();

  const onSubmitEmail = async (data) => {
    setEmail(data.email);
    setLoading(true);

    try {
      // Send the request to the backend to send OTP email
      const response = await axios.post('http://localhost:3001/send-reset-code', { email: data.email });
      const otpFromServer = response.data.otp; // Receive OTP from the server (for demo purposes)
      setServerOtp(otpFromServer);
      alert(`OTP sent to your email: ${data.email}`);
      setEmailSent(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("email", { message: 'Failed to send email. Please try again later.' });
    }
  };

  const onVerifyOtp = async (data) => {
    if (data.resetCode === serverOtp) {
      alert('OTP verified! You can now reset your password.');
      navigate('/reset-password', { state: { email } });
    } else {
      setError("resetCode", { message: 'Invalid OTP. Please try again.' });
    }
  };

  return (
    <div style={styles.page}>
      <div className="auth-container" style={styles.container}>
        <h2 style={styles.header}>Forgot Password</h2>

        {!emailSent ? (
          <form onSubmit={handleSubmit(onSubmitEmail)} style={styles.form}>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address'
                }
              })}
              placeholder="Enter your email"
              style={styles.input}
              onInput={() => clearErrors('email')} // Clear errors on input change
              disabled={loading} // Disable input when loading
            />
            {errors.email && <p style={styles.error}>{errors.email.message}</p>}
            
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onVerifyOtp)} style={styles.form}>
            <input
              {...register('resetCode', {
                required: 'OTP code is required'
              })}
              placeholder="Enter OTP code"
              style={styles.input}
              onInput={() => clearErrors('resetCode')} // Clear errors on input change
              disabled={loading} // Disable input when loading
            />
            {errors.resetCode && <p style={styles.error}>{errors.resetCode.message}</p>}
            
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Verifying OTP...' : 'Verify OTP'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// Styles for forgot password page
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
    marginTop: '-10px',
  },
};

export default ForgotPassword;
