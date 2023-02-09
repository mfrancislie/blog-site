import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext.js';

const Navbar = () => {
  const { theme, toggleTheme, user } = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${query}`);
  };

  return (
    <div className="header">
      <div className="header-item">
        <NavLink to="/">Awesome Blog site</NavLink>
      </div>
      <div className="header-item">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter Search"
            name="query"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="header-item">
        {user ? (
          <div>
            <NavLink to="/profile">{user.name}</NavLink>{' '}
            <NavLink to="/create">CreatePost</NavLink>{' '}
          </div>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}{' '}
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'light' : 'dark'}
        </button>{' '}
      </div>
    </div>
  );
};

export default Navbar;
