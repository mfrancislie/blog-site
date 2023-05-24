import Axios from 'axios';
import React, { useEffect, useReducer } from 'react';

const HomePage = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'POSTS_REQUEST':
        return { ...state, loading: true };
      case 'POSTS_SUCCESS':
        return { ...state, loading: false, posts: action.payload, error: '' };
      case 'POSTS_FAIL':
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };

  //   Initial State
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    posts: [],
  });

  const { loading, error, posts } = state;

  const loadPosts = async () => {
    dispatch({ type: 'POSTS_REQUEST' });
    try {
      const { data } = await Axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      dispatch({ type: 'POSTS_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'POSTS_FAIL', payload: err.message });
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="blog">
      <div className="content">
        <h1>Posts</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error:{error}</div>
        ) : posts.length === 0 ? (
          <div>No post found</div>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
