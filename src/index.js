import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App.js';
import { ThemeContextProvider } from './ThemeContext.js';
ReactDOM.render(
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>,
  document.getElementById('root')
);
