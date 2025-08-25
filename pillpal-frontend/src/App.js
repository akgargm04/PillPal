import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import PharmacyDashboard from "./pages/PharmacyDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Role-based Protected Routes */}
        <Route element={<PrivateRoute requiredRole="buyer" />}>
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
        </Route>
        <Route element={<PrivateRoute requiredRole="seller" />}>
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
        </Route>
        <Route element={<PrivateRoute requiredRole="pharmacy" />}>
          <Route path="/pharmacy-dashboard" element={<PharmacyDashboard />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
