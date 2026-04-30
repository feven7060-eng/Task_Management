import React, { useState, useEffect } from 'react';
import LoginLayout from './components/LoginLayout';
import { Sun, Moon } from 'lucide-react';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [isDarkMode]);

  return (
    <div className={`app-container ${isDarkMode ? '' : 'light'}`}>
      <div className="theme-toggle">
        <button 
          className={`theme-btn ${!isDarkMode ? 'active' : ''}`}
          onClick={() => setIsDarkMode(false)}
        >
          <Sun size={18} fill={!isDarkMode ? 'currentColor' : 'none'} />
        </button>
        <button 
          className={`theme-btn ${isDarkMode ? 'active' : ''}`}
          onClick={() => setIsDarkMode(true)}
        >
          <Moon size={18} fill={isDarkMode ? 'currentColor' : 'none'} />
        </button>
      </div>
      <LoginLayout />
    </div>
  );
}

export default App;
