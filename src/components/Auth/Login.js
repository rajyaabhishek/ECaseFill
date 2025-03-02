import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa'; // Make sure to install react-icons
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import TextLogo from '../common/TextLogo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/upload');  // Changed from '/consent' to '/upload'
    } catch (error) {
      let errorMessage = '';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        default:
          errorMessage = 'An error occurred. Please try again.';
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/upload');  // Changed from '/consent' to '/upload'
    } catch (error) {
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <TextLogo position="center" />
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleEmailLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in with Email'}
        </button>
      </form>

      <div className="auth-divider">
        <span>or</span>
      </div>

      <button 
        onClick={handleGoogleLogin} 
        className="google-button"
        disabled={isLoading}
      >
        <FaGoogle size={20} />
        {isLoading ? 'Signing in...' : 'Continue with Google'}
      </button>

      <p className="auth-switch">
        New to ECase? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  );
};

export default Login;