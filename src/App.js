import React from 'react';
import './App.css';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="container light">
      <Navbar />
      <div className="main">
        <h1>Posts</h1>
        <ul>
          <li>
            <h2>Post 1</h2>
            <p>post 1 content</p>
          </li>
          <li>
            <h2>Post 2</h2>
            <p>post 2 content</p>
          </li>
        </ul>
      </div>
      <div className="footer">Awesome blog. All rights reserved</div>
    </div>
  );
};

export default App;
