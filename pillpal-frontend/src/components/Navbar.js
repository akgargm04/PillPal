// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{
      padding: "1rem",
      backgroundColor: "#343a40", // Dark background
      color: "white",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center"
    }}>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
      <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
      <Link to="/register" style={{ color: "white", textDecoration: "none" }}>Register</Link>
    </nav>
  );
};

export default Navbar;
