import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgetPass() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
    };

    axios.post('/api/forgot-password', data)
      .then((response) => {
        setMessage(response.data.status);
        navigate('/reset-password'); // Navigate to the reset password page upon success
      })
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.email[0]);
        }
      });
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgetPass;
