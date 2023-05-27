import Axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';

const PostPage = () => {
  const { postId } = useParams();

  const reducer = (state, action) => {
    switch (action.type) {
      case 'POST_REQUEST':
        return { ...state, loading: true };
      case 'POST_SUCCESS':
        return { ...state, loading: false, post: action.payload, error: '' };
      case 'POST_FAIL':
        return { ...state, loading: false, error: action.payload };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    post: { user: {} },
    error: '',
  });

  const { loading, post, error } = state;

  useEffect(() => {
    const fetchPost = async () => {
      dispatch({ type: 'POST_REQUEST' });
      try {
        const { data } = await Axios.get(`/api/posts/${postId}`);
        const { data: userData } = await Axios.get(`/api/users/${data.userId}`);
        dispatch({
          type: 'POST_SUCCESS',
          payload: { ...data, user: userData },
        });
      } catch (error) {
        dispatch({ type: 'POST_FAIL', payload: error.message });
      }
    };
    fetchPost();
  }, [postId]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="blog">
          <div className="content">
            <Link to="/">Back to posts</Link>
            <div>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          </div>
          <div className="sidebar">
            <ul>
              <h1>{post.user.name} Profile</h1>
              <li>Email: {post.user.email}</li>
              <li>Phone: {post.user.phone}</li>
              <li>Website: {post.user.website}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPage;
