import React from 'react';

const Navbar = () => {
  return (
    <div className="header">
      <div className="header-item">
        <a href="/">
          <strong>Awesome Blog</strong>
        </a>
      </div>
      <div className="header-item">
        <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default Navbar;
