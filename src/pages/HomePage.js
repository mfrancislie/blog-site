import Axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';

const HomePage = () => {
  const { query, userId } = useParams();

  const reducer = (state, action) => {
    switch (action.type) {
      // post list
      case 'POSTS_REQUEST':
        return { ...state, loading: true };
      case 'POSTS_SUCCESS':
        return { ...state, loading: false, posts: action.payload, error: '' };
      case 'POSTS_FAIL':
        return { ...state, error: action.payload, loading: false };
      // users list
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
        return { ...state, errorUsers: action.payload, loadingUsers: false };
      default:
        return state;
    }
  };

  //   Initial State
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    posts: [],
    users: [],
    user: {}, // to filter users post
    loadingUsers: false,
    errorUsers: '',
  });

  const { loading, error, posts, loadingUsers, errorUsers, users, user } =
    state;

  const loadPosts = async () => {
    dispatch({ type: 'POSTS_REQUEST' });
    try {
      const { data } = await Axios.get(
        userId
          ? 'https://jsonplaceholder.typicode.com/posts?userId=' + userId
          : 'https://jsonplaceholder.typicode.com/posts'
      );
      // to filterpost search
      const filteredPost = query
        ? data.filter(
            (x) => x.title.indexOf(query) >= 0 || x.body.indexOf(query) >= 0
          )
        : data;

      dispatch({ type: 'POSTS_SUCCESS', payload: filteredPost });
    } catch (err) {
      dispatch({ type: 'POSTS_FAIL', payload: err.message });
    }
  };

  const loadUsers = async () => {
    dispatch({ type: 'USERS_REQUEST' });
    try {
      const { data } = await Axios.get(
        userId
          ? 'https://jsonplaceholder.typicode.com/users/' + userId
          : 'https://jsonplaceholder.typicode.com/users'
      );
      dispatch({
        type: userId ? 'USER_SUCCESS' : 'USERS_SUCCESS',
        payload: data,
      });
    } catch (err) {
      dispatch({ type: 'USERS_FAIL', payload: err.message });
    }
  };

  useEffect(() => {
    loadPosts();
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, userId]);

  return (
    <div className="blog">
      <div className="content">
        <h1>
          {query
            ? `Results for "${query}"`
            : userId
            ? `${user.name}'s Posts`
            : 'Posts'}
        </h1>
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
                <Link to={`/post/${post.id}`}>
                  <h2>{post.title}</h2>
                </Link>

                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* sidebar */}
      <div className="sidebar">
        {loadingUsers ? (
          <div>Loading...</div>
        ) : errorUsers ? (
          <div>Error:{errorUsers}</div>
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
  );
};

export default HomePage;
