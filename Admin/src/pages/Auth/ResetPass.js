import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ResetPass() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
    };

    axios
      .post('/api/forgot-password', data)
      .then((response) => {
        setMessage(response.data.status);
      })
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.email[0]);
        }
      });
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      code: code,
      password: password,
      password_confirmation: confirmPassword,
    };

    axios
      .post('/api/reset-password', data)
      .then((response) => {
        setMessage(response.data.message);
        navigate('/login');
      })
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.code[0]);
        }
      });
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {!message && (
        <form onSubmit={handleEmailSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <button type="submit">Send Verification Code</button>
          </div>
        </form>
      )}
      {message && !message.includes('successfully') && (
        <form onSubmit={handleResetSubmit}>
          <div>
            <label htmlFor="code">Verification Code</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={handleCodeChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          <div>
            <button type="submit">Reset Password</button>
          </div>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPass;
