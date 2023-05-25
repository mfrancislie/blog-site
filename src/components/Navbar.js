import React, { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${query}`);
  };
  return (
    <div className="header">
      <div className="header-item">
        <a href="/">
          <strong>Awesome Blog</strong>
        </a>
      </div>
      <div className="header-item">
        <form onSubmit={handleSearch}>
          <input
            name="query"
            type="text"
            placeholder="search posts"
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button>Go</button>
        </form>
      </div>
      <div className="header-item">
        <a href="/login">Login</a>
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'light' : 'dark'}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
