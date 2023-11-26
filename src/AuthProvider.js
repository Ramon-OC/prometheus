import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('titan_token');

      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        console.log('Usuario decodificado:', decodedToken.sub);

        if (decodedToken.exp > currentTime) {
          setUser(decodedToken.sub);
        } else {
          setUser(null);
          localStorage.removeItem('titan_token');
        }
      } else {
        setUser(null);
      }
    };

    checkToken();
  }, []);

  const login = (token) => {
    localStorage.setItem('titan_token', token);
    const decodedToken = jwtDecode(token);
    setUser(decodedToken.sub);
  };

  const logout = () => {
    localStorage.removeItem('titan_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
