import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the theme context.
interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

// Create the context.
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * A provider component that manages the application's theme.
 * It persists the theme preference to local storage.
 * @param {ReactNode} children - The child components to be wrapped by the provider.
 */
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Initialize theme from local storage or default to 'light'.
    if (typeof localStorage !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      return (storedTheme as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  // Effect to apply the theme class to the document root element.
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

/**
 * A custom hook to use the ThemeContext.
 * @returns {ThemeContextType} The theme context object.
 */
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeProvider, useTheme };
