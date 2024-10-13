import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from './Firebase'; // Import Firebase auth and Firestore
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Firestore for user data
import NavigationBar from './NavigationBar';

function Signup() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const [passwordStrength, setPasswordStrength] = useState(''); // State for password strength
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    // Password strength regex checks
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const mediumPassword = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (strongPassword.test(password)) {
      setPasswordStrength('strong');
    } else if (mediumPassword.test(password)) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('weak');
    }
  };

  const onSubmit = async (data) => {
    try {
      // Create the user with email and password using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Save additional user data (role, department, etc.) to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: data.name,
        email: data.email,
        role: data.role,
        department: data.department,
      });

      alert('Signup successful!');
      navigate('/login'); // Redirect to login after successful signup

    } catch (error) {
      // Handle Firebase errors (such as email already in use, weak password, etc.)
      setError('email', { message: error.message });
    }
  };

  return (
    <div>
      <NavigationBar/>
    <div style={styles.page}>
      <div className="auth-container" style={styles.container}>
        <h2 style={styles.header}>Create Your Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          {/* Name Input */}
          <input
            {...register('name', { required: true })}
            placeholder="Full Name"
            style={styles.input}
          />
          {errors.name && <p style={styles.error}>Name is required</p>}

          {/* Email Input */}
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                message: 'Only Gmail addresses are allowed',
              }
            })}
            placeholder="Email Address"
            style={styles.input}
          />
          {errors.email && <p style={styles.error}>{errors.email.message}</p>}

          {/* Password Input */}
          <input
            {...register('password', {
              required: true,
              minLength: { value: 6, message: 'Password must be at least 6 characters long' },
              onChange: (e) => checkPasswordStrength(e.target.value),
            })}
            type="password"
            placeholder="Password"
            style={styles.input}
          />
          {errors.password && <p style={styles.error}>{errors.password.message}</p>}

          {/* Password Strength Indicator */}
          {passwordStrength && (
            <p style={{
              ...styles.passwordStrength,
              color:
                passwordStrength === 'strong'
                  ? 'green'
                  : passwordStrength === 'medium'
                    ? 'orange'
                    : 'red'
            }}>
              {passwordStrength === 'strong'
                ? 'Strong password'
                : passwordStrength === 'medium'
                  ? 'Medium strength password'
                  : 'Weak password'}
            </p>
          )}

          {/* Role Selection */}
          <select {...register('role', { required: true })} style={styles.select}>
            <option value="">Select Your Role</option>
            <option value="Intern">Intern</option>
            <option value="Academic Staff">Academic Staff</option>
            <option value="Management">Management</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Other">Other</option>
          </select>
          {errors.role && <p style={styles.error}>Role is required</p>}

          {/* Department Selection */}
          <select {...register('department', { required: true })} style={styles.select}>
            <option value="">Select Your Department</option>
            <option value="Academic">Academic</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
            <option value="Other">Other</option>
          </select>
          {errors.department && <p style={styles.error}>Department is required</p>}

          {/* Privacy Policy Checkbox */}
          <div style={styles.checkboxContainer}>
            <label style={styles.label}>
              <input {...register('privacyPolicy', { required: true })} type="checkbox" />
              <span>I accept the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={styles.link}>Privacy Policy</a></span>
            </label>
          </div>
          {errors.privacyPolicy && <p style={styles.error}>You must accept the Privacy Policy</p>}

          {/* Terms and Conditions Checkbox */}
          <div style={styles.checkboxContainer}>
            <label style={styles.label}>
              <input {...register('termsAndConditions', { required: true })} type="checkbox" />
              <span>I accept the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" style={styles.link}>Terms and Conditions</a></span>
            </label>
          </div>
          {errors.termsAndConditions && <p style={styles.error}>You must accept the Terms and Conditions</p>}

          {/* Submit Button */}
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>

        {/* Redirect to Login */}
        <div style={styles.redirect}>
          <p>Already have an account? <Link to="/login" style={styles.link}>Sign in</Link></p>
        </div>
      </div>
    </div>
    </div>
  );
}

// Styles
const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #00B4DB, #0083B0)',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  container: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '450px',
    width: '100%',
    textAlign: 'center',
    overflowY: 'auto',
    maxHeight: '90vh', // Added to ensure form fits and scrolls
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
    transition: 'all 0.3s ease',
  },
  select: {
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#f7f7f7',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  passwordStrength: {
    fontSize: '14px',
    marginTop: '-10px',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  label: {
    margin: 0,
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
    marginLeft: '5px',
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
  redirect: {
    marginTop: '20px',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
  },
};

export default Signup;
