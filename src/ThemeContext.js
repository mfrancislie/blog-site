import React, { createContext, useState } from 'react';

const ThemeContext = createContext();
const IsUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;
const IsTheme = localStorage.getItem('theme')
  ? localStorage.getItem('theme')
  : 'light';

const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState(IsTheme);
  const [user, setUser] = useState(IsUser);
  const [backendAPI, setBackendAPI] = useState(
    'https://jsonplaceholder.typicode.com'
  );
  const toggleBackendAPI = () => {
    setBackendAPI(
      backendAPI === '/api' ? 'https://jsonplaceholder.typicode.com' : '/api'
    );
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  };
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        user,
        setUser,
        backendAPI,
        toggleBackendAPI,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
