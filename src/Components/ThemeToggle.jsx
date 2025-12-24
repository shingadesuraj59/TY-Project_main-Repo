import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useAuth();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-dark-200 hover:bg-gray-300 dark:hover:bg-dark-600 transition-all duration-200"
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-blue-600" />
      )}
    </button>
  );
};

export default ThemeToggle;
