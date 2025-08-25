import React from "react";
import { useAuth } from "../context/AuthContext";  // To access user authentication info

const Profile = () => {
  const { token } = useAuth();  // Get token from context

  return (
    <div>
      <h2>Profile</h2>
      <p>Welcome, you are logged in with token: {token}</p>
    </div>
  );
};

export default Profile;
