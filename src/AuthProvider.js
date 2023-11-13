// AuthProvider.js
import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const initialState = {
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('titan_token');

    if (token) {
      try {
        const user = jwtDecode(token);
        console.log('Usuario decodificado:', user.sub);
        dispatch({
          type: 'LOGIN',
          payload: user.sub,
        });
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }

    setLoading(false);
  }, []);

  const login = (token) => {
    // Save token to localStorage
    localStorage.setItem('titan_token', token);

    const user = jwtDecode(token);
    dispatch({
      type: 'LOGIN',
      payload: user,
    });
  };

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('titan_token');

    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout,
      }}
    >
      {!loading && children}
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
