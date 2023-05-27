import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext.js';

const RegisterPage = () => {
  const { user, setUser } = useContext(ThemeContext);
  const navigate = useNavigate();
  if (user) {
    navigate('/profile');
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'REGISTER_REQUEST':
        return { ...state, loading: true };
      case 'REGISTER_SUCCESS':
        return {
          ...state,
          loading: false,
          loggInUser: action.payload,
          error: '',
        };
      case 'REGISTER_FAIL':
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
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch({ type: 'REGISTER_REQUEST' });
    try {
      const { data } = await axios.post('/api/users', {
        email,
        name,
        password,
        id: Math.floor(Math.random() * 1000000),
      });
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({ type: 'REGISTER_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'REGISTER_FAIL', payload: error.message });
    }
  };

  useEffect(() => {
    if (loggInUser) {
      setUser(loggInUser);
      return navigate('/profile');
    }
  }, [loggInUser, navigate, setUser]);

  return (
    <div>
      <h1>Register User</h1>
      <form onSubmit={handleRegister} className="form">
        <div className="form-item">
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            id="name"
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="form-item">
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            id="email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="form-item">
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            id="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="form-item">
          <label></label>
          <button>Register</button>
        </div>
        {loading && (
          <div className="form-item">
            <label></label>
            <span>Processing...</span>
          </div>
        )}
        {error && (
          <div className="form-item">
            <label></label>
            <span className="error">{error}</span>
          </div>
        )}
        <div className="form-item">
          <label></label>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
