import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the shape of the authentication context state and functions.
interface AuthContextType {
  user: { name: string } | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// Create a context with a default value.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * A provider component that makes authentication state available to child components.
 * It manages a simple user state and provides login/logout functions.
 * @param {ReactNode} children - The child components to be wrapped by the provider.
 */
const AuthProvider = ({ children }: AuthProviderProps) => {
  // Use a state to store the user information.
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulate an initial auth check, like from a token in local storage.
  useEffect(() => {
    // In a real app, you would check for a token and fetch user data here.
    const token = localStorage.getItem('authToken');
    if (token) {
      // Simulate a logged-in user.
      setUser({ name: "John Doe" });
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    // In a real app, this would handle the login logic (e.g., API call).
    // After successful login, you would set a token and user data.
    console.log("User logging in...");
    localStorage.setItem('authToken', 'fake-token-123');
    setUser({ name: "John Doe" });
    setIsLoggedIn(true);
  };

  const logout = () => {
    // In a real app, this would clear the token and user data.
    console.log("User logging out...");
    localStorage.removeItem('authToken');
    setUser(null);
    setIsLoggedIn(false);
  };

  // The value provided by the context to consuming components.
  const value = {
    user,
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * A custom hook to use the AuthContext.
 * @returns {AuthContextType} The authentication context object.
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
