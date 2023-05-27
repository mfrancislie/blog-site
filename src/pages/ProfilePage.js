import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { ThemeContext } from '../ThemeContext.js';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(ThemeContext);
  const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_REQUEST':
        return { ...state, loading: true };
      case 'UPDATE_SUCCESS':
        return {
          ...state,
          loading: false,
          updatedUser: action.payload,
          error: '',
          success: true,
        };
      case 'UPDATE_FAIL':
        return {
          ...state,
          error: action.payload,
          loading: false,
          success: false,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    updatedUser: null,
    error: '',
    success: false,
  });

  const { loading, updatedUser, error, success } = state;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_REQUEST' });
    try {
      const { data } = await axios.put(`/api/users/${user.id}`, {
        ...user,
        name,
        email,
        password,
        phone,
        website,
      });
      dispatch({ type: 'UPDATE_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'UPDATE_FAIL', payload: error.message });
    }
  };

  useEffect(() => {
    if (updatedUser) {
      setUser(updatedUser);
    } else {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setPhone(user.phone);
      setWebsite(user.website);
    }
  }, [setUser, updatedUser, user]);

  const logoutHandler = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div>
      <h2>{user.name}'s Profile</h2>
      <form className="form" onSubmit={handleUpdate}>
        <div className="form-item">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            placeholder="Enter phone"
            name="phone"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="website">Website:</label>
          <input
            type="text"
            placeholder="Enter website"
            name="website"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label></label>
          <button>Update</button>
        </div>
        <div className="form-item">
          <label></label>
          <button onClick={logoutHandler}>Logout</button>
        </div>

        {loading && (
          <div className="form-item">
            <span>Processing....</span>
          </div>
        )}
        {error && (
          <div className="form-item">
            <span className="error">{error}</span>
          </div>
        )}
        {success && (
          <div className="form-item">
            <span className="success">Updated User Successfully!!</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
