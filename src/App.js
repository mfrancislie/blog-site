import React, { useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { ThemeContext } from './ThemeContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <BrowserRouter>
      <div className={`container ${theme}`}>
        <Navbar />
        <div className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/search/:query?" element={<HomePage />} />
            <Route path="/user/:userId" element={<HomePage />} />
            <Route path="/post/:postId" element={<PostPage />} />
          </Routes>
        </div>
        <div className="footer">All right reserved. @Blog-site.com</div>
      </div>
    </BrowserRouter>
  );
};

export default App;
