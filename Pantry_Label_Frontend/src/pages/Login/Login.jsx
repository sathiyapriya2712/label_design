import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import authService from '../../services/authService';
import OTPInput from '../../components/OTPInput/OTPInput';
import Loader from '../../components/Loader/Loader';
import { otpTimer } from '../../utils/otpTimer';
import './Login.css';

export const Login = () => {
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = Email input, 2 = OTP input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(0);

  // If already authenticated, redirect to correct starting point
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.profileCompleted) {
        navigate('/dashboard');
      } else {
        navigate('/profile-setup');
      }
    }
  }, [isAuthenticated, user, navigate]);

  // Handle OTP countdown timer
  useEffect(() => {
    let intervalId;
    if (secondsLeft > 0) {
      intervalId = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }
    
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email format.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      await authService.sendOtp(email);
      setStep(2);
      setSecondsLeft(300); // 5-minute countdown (300 seconds)
      setMessage('OTP has been successfully sent to your email.');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter the full 6-digit verification code.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await authService.verifyOtp(email, otp);
      const { user: userData, token } = response.data;
      
      // Save credentials in memory context
      await login(userData, token);
      
      // Navigation is handled in useEffect, but we can also trigger it here
      if (userData.profileCompleted) {
        navigate('/dashboard');
      } else {
        navigate('/profile-setup');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Invalid or expired OTP. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (secondsLeft > 0) return;
    
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await authService.sendOtp(email);
      setSecondsLeft(300); // reset countdown
      setOtp('');
      setMessage('A fresh verification code has been sent to your email.');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      {loading && <Loader fullPage={true} message={step === 1 ? "Sending OTP..." : "Verifying code..."} />}
      
      <div className="login-card-layout">
        <div className="login-card-header">
          <div className="brand-logo-large">🍲</div>
          <h2>Pantry Label Platform</h2>
          <p className="subtitle">
            {step === 1 
              ? "Verify your email with a one-time passcode to get started." 
              : "Enter the 6-digit code sent to your email address."}
          </p>
        </div>

        {error && <div className="login-error-alert">{error}</div>}
        {message && <div className="login-success-alert">{message}</div>}

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="login-form">
            <div className="input-group">
              <label htmlFor="email-input">Email Address</label>
              <input
                id="email-input"
                type="email"
                placeholder="e.g. name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-input-field"
              />
            </div>
            <button type="submit" className="login-submit-btn">
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="login-form">
            <div className="input-group">
              <label>Enter 6-Digit OTP</label>
              <OTPInput value={otp} onChange={setOtp} />
            </div>

            <div className="timer-resend-row">
              <span className="otp-timer-text">
                {secondsLeft > 0 ? `Time remaining: ${otpTimer(secondsLeft)}` : "Code expired"}
              </span>
              <button
                type="button"
                onClick={handleResendOtp}
                className="resend-otp-btn"
                disabled={secondsLeft > 0}
              >
                Resend Code
              </button>
            </div>

            <button type="submit" className="login-submit-btn" disabled={otp.length !== 6}>
              Verify & Login
            </button>
            <button type="button" className="login-back-btn" onClick={() => { setStep(1); setError(''); setMessage(''); }}>
              Back to Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
