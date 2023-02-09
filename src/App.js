import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import PrivateRoute from './components/PrivateRoute.js';
import CreatePost from './pages/CreatePost.js';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import PostPage from './pages/PostPage.js';
import ProfilePage from './pages/ProfilePage.js';
import RegisterPage from './pages/RegisterPage.js';
import { ThemeContext } from './ThemeContext.js';

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <BrowserRouter>
      <div className={`container ${theme}`}>
        <Navbar />
        <div className="main">
          <Routes>
            <Route path="/create" element={<PrivateRoute />}>
              <Route path="/create" element={<CreatePost />} />
            </Route>
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:postId" element={<PostPage />} />
            <Route path="/search/:query?" element={<HomePage />} />
            <Route path="/user/:userId" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
        <div className="footer">All right reserved. @Blog-site.com</div>
      </div>
    </BrowserRouter>
  );
};

export default App;
