import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react';
import { ThemeContext } from '../ThemeContext.js';

const CreatePost = () => {
  const { user } = useContext(ThemeContext);
  const reducer = (state, action) => {
    switch (action.type) {
      case 'RESET':
        return initial;
      case 'CREATE_REQUEST':
        return { ...state, loading: true };
      case 'CREATE_SUCCESS':
        return {
          ...state,
          createdPost: action.payload,
          error: '',
          loading: false,
          success: true,
        };
      case 'CREATE_FAIL':
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
  const initial = {
    loading: false,
    createdPost: null,
    error: '',
    success: false,
  };
  const [state, dispatch] = useReducer(reducer, initial);
  const { loading, error, success } = state;

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const handleCreatePost = async (e) => {
    e.preventDefault();
    dispatch({ type: 'CREATE_REQUEST' });
    try {
      const { data } = await axios.post('/api/posts', {
        title,
        body,
        userId: user.id,
        id: Math.floor(Math.random() * 10000),
      });
      dispatch({ type: 'CREATE_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'CREATE_FAIL', payload: error.message });
    }
  };
  const reset = () => {
    dispatch({ type: 'RESET' });
  };
  return (
    <div>
      {success ? (
        <div className="form-item">
          <span>
            Post title <strong>{title}</strong> has been created
          </span>
          <button onClick={reset}>Create another</button>
        </div>
      ) : (
        <form onSubmit={handleCreatePost} className="form">
          <div className="form-item">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label htmlFor="title">Body:</label>
            <textarea
              type="text"
              name="body"
              id="body"
              placeholder="Enter description"
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
          <div className="form-item">
            <label></label>
            <button type="submit">Post</button>
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
        </form>
      )}
    </div>
  );
};

export default CreatePost;
