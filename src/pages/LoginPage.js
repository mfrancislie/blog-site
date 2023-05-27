import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const reducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN_REQUEST':
        return { ...state, loading: true };
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          loading: false,
          loggInUser: action.payload,
          error: '',
        };
      case 'LOGIN_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    loggInUser: null,
    error: '',
  });

  const { loading, loggInUser, error } = state;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const { data } = await axios(
        `https://jsonplaceholder.typicode.com/users?email=${email}&password=${password}`
      );
      if (data.length > 0) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: data[0] });
      } else {
        dispatch({ type: 'LOGIN_FAIL', payload: 'Invalid email or password!' });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL', payload: error.message });
    }
  };

  useEffect(() => {
    if (loggInUser) {
      return navigate('/profile');
    }
  }, [loggInUser, navigate]);

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin} className="form">
        <div className="form-item">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label></label>
          <button>Login Now</button>
        </div>
        {loading && (
          <div className="form-item">
            <span>Processing...</span>
          </div>
        )}
        {error && (
          <div className="form-item">
            <span className="error">{error}</span>
          </div>
        )}
        <div className="form-item">
          <label></label>
          <span>
            New user? <Link to="/register">Register</Link>
          </span>
        </div>
        <div className="form-item">
          <label></label>
          <span>Or use email: Sincere@april.biz password: 123 </span>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
