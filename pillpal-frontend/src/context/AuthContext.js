import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';  // Correct default import for jwt-decode

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);

        const expirationTime = decoded.exp * 1000;
        if (expirationTime < Date.now()) {
          logout();
        }
      } catch (err) {
        console.error("Invalid token", err);
        logout();
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (err) {
      console.error("Error decoding token:", err);
      setUser(null);
    }
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setCart([]);
    localStorage.removeItem('cart');
  };

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, user, setUser, cart, updateCart }}>
      {children}
    </AuthContext.Provider>
  );
};
