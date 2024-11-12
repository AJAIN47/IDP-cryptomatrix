import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (username, password) => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    return new Promise((resolve, reject) => {
      if (username === storedUsername && password === storedPassword) {
        setIsLoggedIn(true);
        setUser({ username }); // Assuming you store the user as an object
        resolve();
      } else {
        reject('Invalid username or password');
      }
    });
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('coins');
    setUser(null);
    setIsLoggedIn(false);
  };

  const setUsername = (username) => {
    localStorage.setItem('username', username);
    setUser(username);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, setIsLoggedIn, setUsername, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
