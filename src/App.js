import React, { useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar.js';
import { ThemeContext } from './ThemeContext.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import PostPage from './pages/PostPage.js';
import LoginPage from './pages/LoginPage.js';
import ProfilePage from './pages/ProfilePage.js';
import CreatePostPage from './pages/CreatePostPage.js';
import RegisterPage from './pages/RegisterPage.js';

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
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create" element={<CreatePostPage />} />
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
