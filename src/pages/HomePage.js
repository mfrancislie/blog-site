import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';

const HomePage = () => {
  const { query, userId } = useParams();
  const reducer = (state, action) => {
    switch (action.type) {
      case 'POSTS_REQUEST':
        return { ...state, loading: true };
      case 'POSTS_SUCCESS':
        return { ...state, loading: false, posts: action.payload, error: '' };
      case 'POSTS_FAIL':
        return { ...state, loading: false, error: action.payload };

      case 'USERS_REQUEST':
        return { ...state, loadingUsers: true };
      case 'USERS_SUCCESS':
        return {
          ...state,
          loadingUsers: false,
          users: action.payload,
          errorUsers: '',
        };
      case 'USER_SUCCESS':
        return {
          ...state,
          loadingUsers: false,
          user: action.payload,
          errorUsers: '',
        };
      case 'USERS_FAIL':
        return { ...state, loadingUsers: false, errorUsers: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    posts: [],
    error: '',
    loadingUsers: false,
    users: [],
    user: {},
    errorUsers: '',
  });
  const { loading, posts, error, loadingUsers, users, errorUsers, user } =
    state;

  const loadPosts = async () => {
    dispatch({ type: 'POSTS_REQUEST' });
    try {
      const { data } = await axios.get(
        userId ? '/api/posts?userId=' + userId : '/api/posts'
      );

      const filteredPost = query
        ? data.filter(
            (x) => x.title.indexOf(query) >= 0 || x.body.indexOf(query) >= 0
          )
        : data;

      dispatch({ type: 'POSTS_SUCCESS', payload: filteredPost });
    } catch (error) {
      dispatch({ type: 'POSTS_FAIL', payload: error.message });
    }
  };

  const loadUsers = async () => {
    dispatch({ type: 'USERS_REQUEST' });
    try {
      const { data } = await axios.get(
        userId ? '/api/users/' + userId : '/api/users'
      );
      dispatch({
        type: userId ? 'USER_SUCCESS' : 'USERS_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({ type: 'USERS_FAIL', payload: error.message });
    }
  };

  useEffect(() => {
    loadPosts();
    loadUsers();
  }, [query, userId]);
  return (
    <div>
      <div className="blog">
        <div className="content">
          <h2>Post</h2>
          {loading ? (
            <div>Loading....</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : posts.length === 0 ? (
            <div>No post found</div>
          ) : (
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <Link to={`/post/${post.id}`}>
                    <h2>{post.title}</h2>
                  </Link>
                  <p>{post.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="sidebar">
          <div>
            {loadingUsers ? (
              <div>Loading...</div>
            ) : errorUsers ? (
              <div>{error}</div>
            ) : users.length === 0 ? (
              <div>No user found</div>
            ) : userId ? (
              <div>
                <div>
                  <h2>{user.name}'s Profile</h2>
                  <div>Email: {user.email}</div>
                  <div>Phone: {user.phone}</div>
                  <div>Website: {user.website}</div>
                </div>
              </div>
            ) : (
              <div>
                <h1>Authors</h1>
                <ul>
                  {users.map((user) => (
                    <li key={user.id}>
                      <Link to={`/user/${user.id}`}>
                        <span>{user.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
