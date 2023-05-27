import { createContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeContextProvider(props) {
  //  persistent user
  const IsUser = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  //  persistent theme
  const IsTheme = localStorage.getItem('theme')
    ? localStorage.getItem('theme')
    : 'light';

  // persistent back server
  const lsBackendAPI = localStorage.getItem('backendAPI')
    ? localStorage.getItem('backendAPI')
    : 'https://jsonplaceholder.typicode.com';

  const [theme, setTheme] = useState(IsTheme);
  const [user, setUser] = useState(IsUser);
  const [backendAPI, setBackendAPI] = useState(lsBackendAPI);
  const toggleBackendAPI = () => {
    setBackendAPI(
      backendAPI === '/api' ? 'https://jsonplaceholder.typicode.com' : '/api'
    );
    localStorage.setItem(
      'backendAPI',
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
}

export { ThemeContext, ThemeContextProvider };
