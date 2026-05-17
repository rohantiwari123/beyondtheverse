import React, { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Static state for Light Mode only
  const isDarkMode = false;
  const toggleDarkMode = () => {
    console.warn("Dark mode has been removed from this project.");
  };

  useEffect(() => {
    // Ensure 'dark' class is never present on document element
    const root = window.document.documentElement;
    root.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
